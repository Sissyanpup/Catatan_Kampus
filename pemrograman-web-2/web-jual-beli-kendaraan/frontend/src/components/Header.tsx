"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import ConfirmModal from "@/components/ConfirmModal";

export default function Header() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") setMenuOpen(false); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  function handleLogout() {
    setMenuOpen(false);
    setShowLogoutConfirm(true);
  }

  async function confirmLogout() {
    setShowLogoutConfirm(false);
    await logout();
    router.push("/");
    router.refresh();
  }

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-border/60 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="font-display text-xl tracking-wide text-primary transition-[letter-spacing,opacity] duration-300 hover:tracking-widest hover:opacity-90"
        >
          AuraMotors
        </Link>

        {/* ── Desktop navigation (≥1024px) ── */}
        <nav className="hidden lg:flex font-label items-center gap-5 text-sm" aria-label="Navigasi utama">
          {!isLoading && !user && (
            <>
              <Link href="/login" className="nav-link">Masuk</Link>
              <Link href="/register" className="btn-gold rounded-md px-3 py-1.5 text-sm font-medium">
                Daftar
              </Link>
            </>
          )}
          {!isLoading && user?.role === "seller" && (
            <>
              <Link href="/seller/kyc" className="nav-link">KYC</Link>
              <Link href="/seller/vehicles" className="nav-link">Listing Saya</Link>
              <Link href="/seller/transactions" className="nav-link">Transaksi Penjualan</Link>
            </>
          )}
          {!isLoading && user?.role === "buyer" && (
            <Link href="/buyer/transactions" className="nav-link">Transaksi Saya</Link>
          )}
          {!isLoading && user?.role === "admin" && (
            <>
              <Link href="/admin/kyc" className="nav-link">Review KYC</Link>
              <Link href="/admin/vehicles" className="nav-link">Review Listing</Link>
              <Link href="/admin/transactions" className="nav-link">Escrow & Transaksi</Link>
              <Link href="/admin/payouts" className="nav-link">Rekonsiliasi Payout</Link>
            </>
          )}
          {!isLoading && user && (
            <>
              {/* Separator tipis pemisah nav role vs user */}
              <span className="h-4 w-px bg-border/60" aria-hidden />
              <span className="text-sm text-tertiary">{user.name}</span>
              <Link href="/profil" className="nav-link">Profil</Link>
              <button
                onClick={handleLogout}
                className="nav-link cursor-pointer border-0 bg-transparent p-0"
              >
                Keluar
              </button>
            </>
          )}
        </nav>

        {/* ── Hamburger (mobile + tablet, <1024px) ── */}
        <button
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-md text-on-surface-muted
                     transition-colors duration-150 hover:bg-surface-container hover:text-on-surface"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Tutup menu" : "Buka menu navigasi"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
        >
          {/* 3 lines → X animation */}
          <div className="relative h-[18px] w-[18px]" aria-hidden>
            <span
              className={`absolute inset-x-0 h-px origin-center bg-current transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                menuOpen ? "top-[9px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute inset-x-0 top-[9px] h-px bg-current transition-all duration-200 ${
                menuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
              }`}
            />
            <span
              className={`absolute inset-x-0 h-px origin-center bg-current transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                menuOpen ? "top-[9px] -rotate-45" : "bottom-0"
              }`}
            />
          </div>
        </button>
      </div>

      {/* ── Mobile + tablet nav dropdown (<1024px) ── */}
      {menuOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-border/60 bg-surface animate-fade-in"
        >
          <nav className="mx-auto max-w-6xl px-4 py-1" aria-label="Navigasi mobile">
            {/* User info */}
            {!isLoading && user && (
              <div className="border-b border-border/50 py-3">
                <p className="text-xs uppercase tracking-wider text-on-surface-muted">Masuk sebagai</p>
                <p className="mt-0.5 text-sm font-medium text-tertiary">{user.name}</p>
              </div>
            )}

            {/* Nav links (role-based + Profil untuk user yang login) */}
            <div className="flex flex-col divide-y divide-border/30">
              {!isLoading && !user && (
                <>
                  <Link href="/login" className="py-3.5 text-sm font-medium text-on-surface-muted transition-colors hover:text-on-surface">
                    Masuk
                  </Link>
                  <Link href="/register" className="py-3.5 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                    Daftar Akun
                  </Link>
                </>
              )}
              {!isLoading && user?.role === "seller" && (
                <>
                  <Link href="/seller/kyc" className="py-3.5 text-sm text-on-surface-muted transition-colors hover:text-on-surface">KYC</Link>
                  <Link href="/seller/vehicles" className="py-3.5 text-sm text-on-surface-muted transition-colors hover:text-on-surface">Listing Saya</Link>
                  <Link href="/seller/transactions" className="py-3.5 text-sm text-on-surface-muted transition-colors hover:text-on-surface">Transaksi Penjualan</Link>
                </>
              )}
              {!isLoading && user?.role === "buyer" && (
                <Link href="/buyer/transactions" className="py-3.5 text-sm text-on-surface-muted transition-colors hover:text-on-surface">
                  Transaksi Saya
                </Link>
              )}
              {!isLoading && user?.role === "admin" && (
                <>
                  <Link href="/admin/kyc" className="py-3.5 text-sm text-on-surface-muted transition-colors hover:text-on-surface">Review KYC</Link>
                  <Link href="/admin/vehicles" className="py-3.5 text-sm text-on-surface-muted transition-colors hover:text-on-surface">Review Listing</Link>
                  <Link href="/admin/transactions" className="py-3.5 text-sm text-on-surface-muted transition-colors hover:text-on-surface">Escrow & Transaksi</Link>
                  <Link href="/admin/payouts" className="py-3.5 text-sm text-on-surface-muted transition-colors hover:text-on-surface">Rekonsiliasi Payout</Link>
                </>
              )}
              {/* Profil — setara dengan menu navigasi lainnya */}
              {!isLoading && user && (
                <Link href="/profil" className="py-3.5 text-sm text-on-surface-muted transition-colors hover:text-on-surface">
                  Profil
                </Link>
              )}
            </div>

            {/* Keluar — dipisah sendiri di bawah, jelas sebagai aksi keluar */}
            {!isLoading && user && (
              <div className="border-t border-border/50 py-3">
                <button
                  onClick={handleLogout}
                  className="text-sm text-on-surface-muted transition-colors hover:text-error"
                >
                  Keluar
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>

    {showLogoutConfirm && (
      <ConfirmModal
        title="Keluar dari AuraMotors?"
        message="Kamu akan keluar dari sesi ini. Pastikan tidak ada proses yang sedang berjalan."
        confirmLabel="Ya, Keluar"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    )}
    </>
  );
}
