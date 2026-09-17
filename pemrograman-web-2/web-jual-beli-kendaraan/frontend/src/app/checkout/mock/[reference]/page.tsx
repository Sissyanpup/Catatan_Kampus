"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ApiError, apiFetch } from "@/lib/api";
import { formatRupiah } from "@/lib/format";
import type { Transaction } from "@/lib/types";
import PaymentStatusBadge from "@/components/PaymentStatusBadge";

export default function MockPaymentPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = use(params);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadTransaction() {
    try {
      const { data } = await apiFetch<{ data: Transaction }>(`/api/payments/mock/${reference}`);
      setTransaction(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Gagal memuat invoice simulasi.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    loadTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  async function handleAction(action: "pay" | "fail") {
    setIsSubmitting(true);
    setError(null);
    try {
      const { data } = await apiFetch<{ data: Transaction }>(`/api/payments/mock/${reference}/${action}`, {
        method: "POST",
      });
      setTransaction(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Gagal memproses pembayaran simulasi.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <div className="mx-auto max-w-md px-4 py-10 text-sm text-zinc-500">Memuat...</div>;
  }

  if (error && !transaction) {
    return (
      <div className="mx-auto max-w-md px-4 py-10">
        <p className="text-sm text-red-600">{error}</p>
        <Link href="/login" className="mt-4 inline-block text-sm text-zinc-600 underline">
          Masuk untuk melanjutkan
        </Link>
      </div>
    );
  }

  if (!transaction) return null;

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-lg border border-zinc-200 bg-white p-6">
        <p className="text-xs uppercase tracking-wide text-zinc-400">Simulasi Invoice (Offline)</p>
        <h1 className="mt-1 text-lg font-semibold text-zinc-900">
          {transaction.vehicle.brand} {transaction.vehicle.model} {transaction.vehicle.year}
        </h1>
        <p className="mt-3 text-2xl font-bold text-zinc-900">{formatRupiah(transaction.amount)}</p>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-zinc-500">Status:</span>
          <PaymentStatusBadge status={transaction.payment_status} />
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Halaman ini menggantikan halaman checkout Xendit asli karena proyek berjalan tanpa akses internet. Tombol
          di bawah mengubah status transaksi secara langsung, seperti yang seharusnya dilakukan pembayaran nyata.
        </p>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        {transaction.payment_status === "pending" ? (
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => handleAction("pay")}
              disabled={isSubmitting}
              className="flex-1 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-60"
            >
              Bayar Sekarang
            </button>
            <button
              onClick={() => handleAction("fail")}
              disabled={isSubmitting}
              className="flex-1 rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
            >
              Gagalkan
            </button>
          </div>
        ) : (
          <Link
            href="/buyer/transactions"
            className="mt-6 block rounded-md bg-zinc-900 px-4 py-2 text-center text-sm font-medium text-white hover:bg-zinc-700"
          >
            Kembali ke Transaksi Saya
          </Link>
        )}
      </div>
    </div>
  );
}
