"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ApiError, apiFetch } from "@/lib/api";
import { formatDate, formatRupiah } from "@/lib/format";
import type { Transaction } from "@/lib/types";
import PaymentStatusBadge from "@/components/PaymentStatusBadge";
import EscrowStatusBadge from "@/components/EscrowStatusBadge";
import TransactionStatusHistory from "@/components/TransactionStatusHistory";
import ConfirmModal from "@/components/ConfirmModal";

export default function SellerTransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disputeReason, setDisputeReason] = useState("");
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [showConfirmHandover, setShowConfirmHandover] = useState(false);

  async function loadTransaction() {
    try {
      const { data } = await apiFetch<{ data: Transaction }>(`/api/seller/transactions/${id}`);
      setTransaction(data);
    } catch {
      setError("Transaksi tidak ditemukan.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    loadTransaction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleConfirmHandover() {
    setIsSubmitting(true);
    setError(null);
    try {
      const { data } = await apiFetch<{ data: Transaction }>(
        `/api/seller/transactions/${id}/confirm-handover`,
        { method: "POST" }
      );
      setTransaction(data);
      setShowConfirmHandover(false);
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmitDispute(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const { data } = await apiFetch<{ data: Transaction }>(`/api/seller/transactions/${id}/dispute`, {
        method: "POST",
        body: { reason: disputeReason },
      });
      setTransaction(data);
      setShowDisputeForm(false);
      setDisputeReason("");
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <p className="text-sm text-zinc-500">Memuat...</p>;
  }

  if (error && !transaction) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (!transaction) {
    return <p className="text-sm text-red-600">Transaksi tidak ditemukan.</p>;
  }

  const canConfirmHandover = transaction.escrow_status === "escrow_hold" && !transaction.seller_confirmed_at;
  const canDispute = transaction.escrow_status === "escrow_hold" || transaction.escrow_status === "serah_terima";

  return (
    <div>
      <Link href="/seller/transactions" className="text-sm text-zinc-500 hover:text-zinc-800">
        &larr; Kembali ke Transaksi Penjualan
      </Link>

      <div className="mt-4 rounded-lg border border-zinc-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-zinc-900">
            {transaction.vehicle.brand} {transaction.vehicle.model} {transaction.vehicle.year}
          </h1>
          <div className="flex flex-col items-end gap-1">
            <PaymentStatusBadge status={transaction.payment_status} />
            {transaction.escrow_status && <EscrowStatusBadge status={transaction.escrow_status} />}
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs uppercase text-zinc-400">Jumlah DP</dt>
            <dd className="text-zinc-800">{formatRupiah(transaction.amount)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-zinc-400">Dibuat</dt>
            <dd className="text-zinc-800">{formatDate(transaction.created_at)}</dd>
          </div>
          {transaction.paid_at && (
            <div>
              <dt className="text-xs uppercase text-zinc-400">Dibayar Buyer</dt>
              <dd className="text-zinc-800">{formatDate(transaction.paid_at)}</dd>
            </div>
          )}
          {transaction.buyer_confirmed_at && (
            <div>
              <dt className="text-xs uppercase text-zinc-400">Buyer Konfirmasi Terima</dt>
              <dd className="text-zinc-800">{formatDate(transaction.buyer_confirmed_at)}</dd>
            </div>
          )}
          {transaction.seller_confirmed_at && (
            <div>
              <dt className="text-xs uppercase text-zinc-400">Anda Konfirmasi Serahkan</dt>
              <dd className="text-zinc-800">{formatDate(transaction.seller_confirmed_at)}</dd>
            </div>
          )}
        </dl>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        {(canConfirmHandover || canDispute) && (
          <div className="mt-6 flex flex-wrap gap-3 border-t border-zinc-100 pt-4">
            {canConfirmHandover && (
              <button
                onClick={() => setShowConfirmHandover(true)}
                disabled={isSubmitting}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-60"
              >
                Konfirmasi Sudah Menyerahkan Kendaraan
              </button>
            )}
            {canDispute && !showDisputeForm && (
              <button
                onClick={() => setShowDisputeForm(true)}
                className="rounded-md border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              >
                Laporkan Ketidaksesuaian
              </button>
            )}
          </div>
        )}

        {showDisputeForm && (
          <form onSubmit={handleSubmitDispute} className="mt-4 rounded-md border border-red-200 bg-red-50 p-4">
            <label className="block text-sm font-medium text-zinc-800">Jelaskan ketidaksesuaian</label>
            <textarea
              required
              maxLength={1000}
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-md border border-zinc-300 p-2 text-sm"
              placeholder="Contoh: buyer belum melunasi sisa pembayaran di luar sistem."
            />
            <div className="mt-3 flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-60"
              >
                Kirim Laporan
              </button>
              <button
                type="button"
                onClick={() => setShowDisputeForm(false)}
                className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Batal
              </button>
            </div>
          </form>
        )}

        {transaction.escrow_status === "dispute" && transaction.dispute_reason && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <p className="font-medium">Sengketa sedang ditinjau admin</p>
            <p className="mt-1">{transaction.dispute_reason}</p>
          </div>
        )}
      </div>

      {transaction.status_history && transaction.status_history.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-zinc-900">Riwayat Status Escrow</h2>
          <div className="mt-3">
            <TransactionStatusHistory entries={transaction.status_history} />
          </div>
        </div>
      )}

      {showConfirmHandover && (
        <ConfirmModal
          title="Konfirmasi Serah Terima"
          message="Konfirmasi bahwa Anda sudah menyerahkan kendaraan secara fisik ke buyer?"
          confirmLabel="Konfirmasi"
          isSubmitting={isSubmitting}
          onConfirm={handleConfirmHandover}
          onCancel={() => setShowConfirmHandover(false)}
        />
      )}
    </div>
  );
}
