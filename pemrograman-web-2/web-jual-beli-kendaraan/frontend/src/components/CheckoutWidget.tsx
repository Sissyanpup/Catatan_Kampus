"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ApiError, apiFetch } from "@/lib/api";
import { formatRupiah } from "@/lib/format";
import type { Transaction } from "@/lib/types";
import { useAuth } from "@/contexts/auth-context";

export default function CheckoutWidget({ vehicleId, price }: { vehicleId: number; price: string }) {
  const { user, isLoading } = useAuth();
  const minDp = Math.ceil(Number(price) * 0.1);
  const [amount, setAmount] = useState(minDp);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isLoading) return null;

  if (!user) {
    return (
      <div className="mt-6 rounded-lg border border-border bg-surface-container p-4 text-sm text-on-surface-muted">
        <Link href="/login" className="text-on-surface underline">
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

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-3 rounded-lg border border-border bg-surface-container p-4">
      <h2 className="text-sm font-medium text-on-surface">Ajukan Pembayaran DP</h2>

      <div>
        <label className="block text-sm font-medium text-on-surface">Jumlah DP (min. 10% harga)</label>
        <input
          type="number"
          min={minDp}
          max={Number(price)}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm bg-surface text-on-surface placeholder:text-on-surface-muted focus:border-primary focus:outline-none"
        />
        <p className="mt-1 text-xs text-on-surface-muted">Minimal {formatRupiah(minDp)}</p>
      </div>

      {error && <p className="text-sm text-error">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-primary-container px-4 py-2 text-sm font-medium text-on-primary hover:bg-primary disabled:opacity-60"
      >
        {isSubmitting ? "Memproses..." : "Bayar DP Sekarang"}
      </button>
    </form>
  );
}
