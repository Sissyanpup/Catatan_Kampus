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
      <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-4 text-sm text-zinc-600">
        <Link href="/login" className="text-zinc-900 underline">
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
    <form onSubmit={handleSubmit} className="mt-6 space-y-3 rounded-lg border border-zinc-200 bg-white p-4">
      <h2 className="text-sm font-medium text-zinc-800">Ajukan Pembayaran DP</h2>

      <div>
        <label className="block text-sm font-medium text-zinc-700">Jumlah DP (min. 10% harga)</label>
        <input
          type="number"
          min={minDp}
          max={Number(price)}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-zinc-400">Minimal {formatRupiah(minDp)}</p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-60"
      >
        {isSubmitting ? "Memproses..." : "Bayar DP Sekarang"}
      </button>
    </form>
  );
}
