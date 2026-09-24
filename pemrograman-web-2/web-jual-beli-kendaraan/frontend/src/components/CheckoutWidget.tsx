"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ApiError, apiFetch } from "@/lib/api";
import { formatRupiah } from "@/lib/format";
import type { Transaction } from "@/lib/types";
import { useAuth } from "@/contexts/auth-context";
import Badge from "@/components/Badge";

const ESCROW_STEPS = [
  "Dana Anda ditahan di rekening escrow platform, belum diteruskan ke penjual.",
  "Serah terima kendaraan dikonfirmasi kedua pihak, lalu diverifikasi admin.",
  "Setelah verifikasi selesai, dana baru dicairkan (payout) ke penjual.",
];

export default function CheckoutWidget({ vehicleId, price }: { vehicleId: number; price: string }) {
  const { user, isLoading } = useAuth();
  const minDp = Math.ceil(Number(price) * 0.1);
  const [amount, setAmount] = useState(minDp);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isLoading) return null;

  if (!user) {
    return (
      <div className="mt-6 rounded-lg border border-border bg-surface-container p-4 text-sm text-on-surface-muted
                      transition-colors duration-200 hover:border-border/80">
        <Link href="/login" className="font-medium text-on-surface transition-colors duration-150 hover:text-primary">
          Masuk
        </Link>{" "}
        sebagai pembeli untuk mengajukan DP kendaraan ini.
      </div>
    );
  }

  if (user.role !== "buyer") {
    return null;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { data } = await apiFetch<{ data: Transaction }>(`/api/buyer/vehicles/${vehicleId}/checkout`, {
        method: "POST",
        body: { amount },
      });

      if (data.gateway_invoice_url) {
        window.location.href = data.gateway_invoice_url;
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.errors?.amount?.[0] ?? err.message);
      }
      setIsSubmitting(false);
    }
  }

  const sisaPelunasan = Math.max(Number(price) - amount, 0);

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-lg border border-border bg-surface-container p-5
                 transition-[border-color] duration-200 hover:border-border/80"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-base font-medium text-on-surface">
          Alokasi & Pembayaran Escrow
        </h2>
        <Badge tone="success">Dana Aman</Badge>
      </div>

      <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-on-surface-muted">Harga Unit</dt>
          <dd className="text-on-surface">{formatRupiah(Number(price))}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-on-surface-muted">DP Minimum (10%)</dt>
          <dd className="text-on-surface">{formatRupiah(minDp)}</dd>
        </div>
        <div className="flex items-center justify-between font-medium">
          <dt className="text-on-surface">Sisa Pelunasan Setelah DP</dt>
          <dd className="text-on-surface">{formatRupiah(sisaPelunasan)}</dd>
        </div>
      </dl>

      <div className="mt-4">
        <label className="block text-sm font-medium text-on-surface" htmlFor="checkout-amount">
          Jumlah DP yang diajukan
        </label>
        <input
          id="checkout-amount"
          type="number"
          min={minDp}
          max={Number(price)}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="input-field mt-1.5"
        />
        <p className="mt-1 text-xs text-on-surface-muted">Minimal {formatRupiah(minDp)}</p>
      </div>

      {error && (
        <p className="mt-3 text-sm text-error animate-fade-in" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold mt-4 w-full rounded-md px-4 py-2.5 text-sm"
      >
        {isSubmitting ? "Memproses..." : "Bayar DP Sekarang"}
      </button>

      <ol className="mt-5 space-y-2 border-t border-border pt-4">
        {ESCROW_STEPS.map((step, index) => (
          <li key={step} className="flex gap-2 text-xs text-on-surface-muted">
            <span className="font-label shrink-0 font-medium text-primary">{index + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </form>
  );
}
