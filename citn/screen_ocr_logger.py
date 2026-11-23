"""
screen_ocr_logger.py
Pilih area layar -> OCR berkala -> setiap kali teks berubah, tambahkan ke file .md

Instalasi:
  1. Install Tesseract OCR
     - Windows : https://github.com/UB-Mannheim/tesseract/wiki  (centang bahasa "Indonesian" saat install)
     - Linux   : sudo apt install tesseract-ocr tesseract-ocr-ind
     - macOS   : brew install tesseract tesseract-lang
  2. pip install mss pillow pytesseract

Pemakaian:
  python screen_ocr_logger.py                       # output ke modul.md
  python screen_ocr_logger.py -o bab1.md -i 1.5     # cek tiap 1.5 detik
  python screen_ocr_logger.py --lang eng            # kalau teksnya bahasa Inggris saja

  Seret mouse untuk memilih area, Esc untuk batal. Ctrl+C di terminal untuk berhenti.
  Lalu tinggal klik "Next" / scroll di modulnya; tiap halaman baru otomatis tercatat.
"""

import argparse
import ctypes
import datetime
import difflib
import hashlib
import sys
import time
import tkinter as tk

import mss
import pytesseract
from PIL import Image, ImageOps

# Kalau Windows tidak menemukan tesseract, buka komentar baris ini:
# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


def make_dpi_aware():
    """Supaya koordinat mouse cocok dengan piksel asli di layar ber-scaling (125%, 150%, dst)."""
    if sys.platform == "win32":
        try:
            ctypes.windll.shcore.SetProcessDpiAwareness(2)
        except Exception:
            try:
                ctypes.windll.user32.SetProcessDPIAware()
            except Exception:
                pass


def select_area():
    """Overlay transparan layar penuh; seret untuk memilih kotak. Return dict untuk mss, atau None."""
    root = tk.Tk()
    root.attributes("-fullscreen", True)
    root.attributes("-topmost", True)
    root.attributes("-alpha", 0.3)
    canvas = tk.Canvas(root, cursor="cross", bg="gray20", highlightthickness=0)
    canvas.pack(fill="both", expand=True)
    s = {"rect": None, "result": None}

    def down(e):
        s["x0"], s["y0"], s["cx"], s["cy"] = e.x_root, e.y_root, e.x, e.y
        s["rect"] = canvas.create_rectangle(e.x, e.y, e.x, e.y, outline="red", width=2)

    def move(e):
        if s["rect"]:
            canvas.coords(s["rect"], s["cx"], s["cy"], e.x, e.y)

    def up(e):
        x0, y0, x1, y1 = s["x0"], s["y0"], e.x_root, e.y_root
        w, h = abs(x1 - x0), abs(y1 - y0)
        if w > 10 and h > 10:
            s["result"] = {"left": min(x0, x1), "top": min(y0, y1), "width": w, "height": h}
        root.destroy()

    canvas.bind("<ButtonPress-1>", down)
    canvas.bind("<B1-Motion>", move)
    canvas.bind("<ButtonRelease-1>", up)
    root.bind("<Escape>", lambda e: root.destroy())
    root.mainloop()
    return s["result"]


def ocr(img, lang):
    g = ImageOps.grayscale(img)
    g = g.resize((g.width * 2, g.height * 2), Image.LANCZOS)  # perbesar = OCR lebih akurat
    text = pytesseract.image_to_string(g, lang=lang, config="--psm 6")
    lines = [ln.rstrip() for ln in text.splitlines()]
    # buang baris kosong berlebih
    out, blank = [], False
    for ln in lines:
        if ln.strip():
            out.append(ln)
            blank = False
        elif not blank:
            out.append("")
            blank = True
    return "\n".join(out).strip()


def main():
    ap = argparse.ArgumentParser(description="OCR area layar dan catat perubahan teks ke Markdown")
    ap.add_argument("-o", "--output", default="modul.md")
    ap.add_argument("-i", "--interval", type=float, default=1.0, help="detik antar pengecekan")
    ap.add_argument("--lang", default="ind+eng", help="bahasa tesseract, mis. ind, eng, ind+eng")
    ap.add_argument("--threshold", type=float, default=0.90,
                    help="kemiripan (0-1) di atas nilai ini dianggap teks yang sama")
    args = ap.parse_args()

    make_dpi_aware()
    area = select_area()
    if not area:
        print("Dibatalkan.")
        return
    print(f"Area: {area}\nMencatat ke {args.output} — Ctrl+C untuk berhenti.")

    last_img_hash = None
    stable_hash = None
    last_text = ""
    seen = set()
    page = 0

    with mss.mss() as sct, open(args.output, "a", encoding="utf-8") as f:
        try:
            while True:
                shot = sct.grab(area)
                h = hashlib.md5(shot.rgb).hexdigest()

                # Tunggu gambar diam 1 siklus (hindari menangkap animasi transisi/scroll setengah jalan)
                if h != last_img_hash:
                    last_img_hash = h
                    time.sleep(args.interval)
                    continue
                if h == stable_hash:
                    time.sleep(args.interval)
                    continue
                stable_hash = h

                img = Image.frombytes("RGB", shot.size, shot.rgb)
                text = ocr(img, args.lang)
                key = hashlib.md5(" ".join(text.split()).encode()).hexdigest()

                if text and key not in seen and \
                        difflib.SequenceMatcher(None, last_text, text).ratio() < args.threshold:
                    page += 1
                    seen.add(key)
                    last_text = text
                    ts = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    f.write(f"\n## Bagian {page}\n<!-- {ts} -->\n\n{text}\n\n")
                    f.flush()
                    print(f"[{ts}] Bagian {page} tercatat ({len(text)} karakter)")

                time.sleep(args.interval)
        except KeyboardInterrupt:
            print(f"\nSelesai. {page} bagian tersimpan di {args.output}")


if __name__ == "__main__":
    main()
