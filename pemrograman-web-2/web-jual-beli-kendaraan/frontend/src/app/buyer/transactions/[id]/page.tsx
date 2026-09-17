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

export default function BuyerTransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disputeReason, setDisputeReason] = useState("");
  const [showDisputeForm, setShowDisputeForm] = useState(false);
  const [showConfirmHandover, setShowConfirmHandover] = useState(false);

  async function loadTransaction() {
    try {
      const { data } = await apiFetch<{ data: Transaction }>(`/api/buyer/transactions/${id}`);
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

  async function handleRefreshStatus() {
    setIsRefreshing(true);
    try {
      const { data } = await apiFetch<{ data: Transaction }>(
        `/api/buyer/transactions/${id}/refresh-status`,
        { method: "POST" }
      );
      setTransaction(data);
    } catch (err) {
      if (err instanceof ApiError) setError(err.message);
    } finally {
      setIsRefreshing(false);
    }
  }

  async function handleConfirmHandover() {
    setIsSubmitting(true);
    setError(null);
    try {
      const { data } = await apiFetch<{ data: Transaction }>(
        `/api/buyer/transactions/${id}/confirm-handover`,
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
      const { data } = await apiFetch<{ data: Transaction }>(`/api/buyer/transactions/${id}/dispute`, {
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
    return <p className="text-sm text-on-surface-muted">Memuat...</p>;
  }

  if (error && !transaction) {
    return <p className="text-sm text-error">{error}</p>;
  }

  if (!transaction) {
    return <p className="text-sm text-error">Transaksi tidak ditemukan.</p>;
  }

  const canConfirmHandover = transaction.escrow_status === "escrow_hold" && !transaction.buyer_confirmed_at;
  const canDispute = transaction.escrow_status === "escrow_hold" || transaction.escrow_status === "serah_terima";

  return (
    <div>
      <Link href="/buyer/transactions" className="text-sm text-on-surface-muted hover:text-on-surface">
        &larr; Kembali ke Transaksi Saya
      </Link>

      <div className="mt-4 rounded-lg border border-border bg-surface-container p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-on-surface">
            {transaction.vehicle.brand} {transaction.vehicle.model} {transaction.vehicle.year}
          </h1>
          <div className="flex flex-col items-end gap-1">
            <PaymentStatusBadge status={transaction.payment_status} />
            {transaction.escrow_status && <EscrowStatusBadge status={transaction.escrow_status} />}
          </div>
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs uppercase text-on-surface-muted">Jumlah DP</dt>
            <dd className="text-on-surface">{formatRupiah(transaction.amount)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-on-surface-muted">Metode Pembayaran</dt>
            <dd className="text-on-surface">{transaction.payment_gateway === "mock" ? "Simulasi (Offline)" : "Xendit"}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-on-surface-muted">Dibuat</dt>
            <dd className="text-on-surface">{formatDate(transaction.created_at)}</dd>
          </div>
          {transaction.paid_at && (
            <div>
              <dt className="text-xs uppercase text-on-surface-muted">Dibayar</dt>
              <dd className="text-on-surface">{formatDate(transaction.paid_at)}</dd>
            </div>
          )}
          {transaction.buyer_confirmed_at && (
            <div>
              <dt className="text-xs uppercase text-on-surface-muted">Anda Konfirmasi Terima</dt>
              <dd className="text-on-surface">{formatDate(transaction.buyer_confirmed_at)}</dd>
            </div>
          )}
          {transaction.seller_confirmed_at && (
            <div>
              <dt className="text-xs uppercase text-on-surface-muted">Penjual Konfirmasi Serahkan</dt>
              <dd className="text-on-surface">{formatDate(transaction.seller_confirmed_at)}</dd>
            </div>
          )}
        </dl>

        {error && <p className="mt-3 text-sm text-error">{error}</p>}

        {transaction.payment_status === "pending" && (
          <div className="mt-6 flex flex-wrap gap-3">
            {transaction.gateway_invoice_url && (
              <a
                href={transaction.gateway_invoice_url}
                className="rounded-md bg-primary-container px-4 py-2 text-sm font-medium text-on-primary hover:bg-primary"
              >
                Lanjutkan Pembayaran
              </a>
            )}
            <button
              onClick={handleRefreshStatus}
              disabled={isRefreshing}
              className="rounded-md border border-border px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-high disabled:opacity-60"
            >
              {isRefreshing ? "Mengecek..." : "Cek Status Pembayaran"}
            </button>
          </div>
        )}

        {(canConfirmHandover || canDispute) && (
          <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-4">
            {canConfirmHandover && (
              <button
                onClick={() => setShowConfirmHandover(true)}
                disabled={isSubmitting}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-60"
              >
                Konfirmasi Sudah Terima Kendaraan
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
            <label className="block text-sm font-medium text-on-surface">Jelaskan ketidaksesuaian</label>
            <textarea
              required
              maxLength={1000}
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-md border border-border p-2 text-sm bg-surface text-on-surface placeholder:text-on-surface-muted focus:border-primary focus:outline-none"
              placeholder="Contoh: kondisi kendaraan tidak sesuai deskripsi listing."
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
                className="rounded-md border border-border px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-high"
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

        {transaction.escrow_status === "refunded" && transaction.dispute_resolution_note && (
          <div className="mt-4 rounded-md border border-border bg-surface-container-high p-4 text-sm text-on-surface">
            <p className="font-medium">Dana dikembalikan</p>
            <p className="mt-1">{transaction.dispute_resolution_note}</p>
          </div>
        )}
      </div>

      {transaction.status_history && transaction.status_history.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-on-surface">Riwayat Status Escrow</h2>
          <div className="mt-3">
            <TransactionStatusHistory entries={transaction.status_history} />
          </div>
        </div>
      )}

      {showConfirmHandover && (
        <ConfirmModal
          title="Konfirmasi Terima Kendaraan"
          message="Konfirmasi bahwa Anda sudah menerima kendaraan secara fisik?"
          confirmLabel="Konfirmasi"
          isSubmitting={isSubmitting}
          onConfirm={handleConfirmHandover}
          onCancel={() => setShowConfirmHandover(false)}
        />
      )}
    </div>
  );
}
