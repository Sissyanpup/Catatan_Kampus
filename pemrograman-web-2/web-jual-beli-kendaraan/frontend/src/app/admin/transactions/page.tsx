"use client";

import { useEffect, useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";
import { formatDate, formatRupiah } from "@/lib/format";
import type { Paginated, Transaction } from "@/lib/types";
import PaymentStatusBadge from "@/components/PaymentStatusBadge";
import EscrowStatusBadge from "@/components/EscrowStatusBadge";
import TransactionStatusHistory from "@/components/TransactionStatusHistory";

const FILTERS: { value: string; label: string }[] = [
  { value: "", label: "Semua" },
  { value: "escrow_hold", label: "Dana Ditahan" },
  { value: "serah_terima", label: "Serah Terima" },
  { value: "payout_release", label: "Payout Disetujui" },
  { value: "selesai", label: "Selesai" },
  { value: "dispute", label: "Sengketa" },
  { value: "refunded", label: "Dikembalikan" },
];

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [detail, setDetail] = useState<Transaction | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadTransactions() {
    setIsLoading(true);
    const query = filter ? `?escrow_status=${filter}` : "";
    const { data } = await apiFetch<Paginated<Transaction>>(`/api/admin/transactions${query}`);
    setTransactions(data);
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- refetch when filter changes
    loadTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  async function toggleDetail(id: number) {
    if (expandedId === id) {
      setExpandedId(null);
      setDetail(null);
      return;
    }

    setExpandedId(id);
    setDetail(null);
    const { data } = await apiFetch<{ data: Transaction }>(`/api/admin/transactions/${id}`);
    setDetail(data);
  }

  async function refreshDetail(id: number) {
    const { data } = await apiFetch<{ data: Transaction }>(`/api/admin/transactions/${id}`);
    setDetail(data);
    await loadTransactions();
  }

  async function handleAction(id: number, action: "approve-handover" | "approve-payout" | "mark-completed", confirmMessage: string) {
    if (!window.confirm(confirmMessage)) return;

    setActionError(null);
    setIsSubmitting(true);
    try {
      await apiFetch(`/api/admin/transactions/${id}/${action}`, { method: "POST" });
      await refreshDetail(id);
    } catch (err) {
      if (err instanceof ApiError) setActionError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResolveDispute(id: number, resolution: "refund" | "resume") {
    const confirmMessage =
      resolution === "refund"
        ? "Kembalikan dana ke buyer dan buka kembali listing kendaraan?"
        : "Lanjutkan transaksi ke status sebelum sengketa?";
    if (!window.confirm(confirmMessage)) return;

    const note = window.prompt("Catatan penyelesaian (opsional):") ?? undefined;

    setActionError(null);
    setIsSubmitting(true);
    try {
      await apiFetch(`/api/admin/transactions/${id}/resolve-dispute`, {
        method: "POST",
        body: { resolution, note },
      });
      await refreshDetail(id);
    } catch (err) {
      if (err instanceof ApiError) setActionError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Dashboard Escrow & Transaksi</h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              filter === item.value ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {actionError && <p className="mt-3 text-sm text-red-600">{actionError}</p>}

      {isLoading ? (
        <p className="mt-6 text-sm text-zinc-500">Memuat...</p>
      ) : transactions.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-500">Tidak ada transaksi pada kategori ini.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="rounded-lg border border-zinc-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-900">
                    {transaction.vehicle.brand} {transaction.vehicle.model} {transaction.vehicle.year}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {formatRupiah(transaction.amount)} &middot; {transaction.buyer?.name} → {transaction.seller?.name}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <PaymentStatusBadge status={transaction.payment_status} />
                  {transaction.escrow_status && <EscrowStatusBadge status={transaction.escrow_status} />}
                </div>
              </div>

              <button onClick={() => toggleDetail(transaction.id)} className="mt-3 text-sm text-zinc-700 underline">
                {expandedId === transaction.id ? "Sembunyikan detail" : "Lihat detail & aksi"}
              </button>

              {expandedId === transaction.id && (
                <div className="mt-3 rounded-md bg-zinc-50 p-3 text-sm">
                  {!detail ? (
                    <p className="text-zinc-500">Memuat detail...</p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <dl className="grid grid-cols-2 gap-3">
                        <div>
                          <dt className="text-xs uppercase text-zinc-400">Buyer Konfirmasi Terima</dt>
                          <dd className="text-zinc-800">
                            {detail.buyer_confirmed_at ? formatDate(detail.buyer_confirmed_at) : "Belum"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs uppercase text-zinc-400">Seller Konfirmasi Serahkan</dt>
                          <dd className="text-zinc-800">
                            {detail.seller_confirmed_at ? formatDate(detail.seller_confirmed_at) : "Belum"}
                          </dd>
                        </div>
                        {detail.dispute_reason && (
                          <div className="col-span-2">
                            <dt className="text-xs uppercase text-zinc-400">Alasan Sengketa</dt>
                            <dd className="text-red-700">{detail.dispute_reason}</dd>
                          </div>
                        )}
                      </dl>

                      <div className="flex flex-wrap gap-2">
                        {detail.escrow_status === "escrow_hold" && (
                          <button
                            disabled={isSubmitting}
                            onClick={() =>
                              handleAction(
                                detail.id,
                                "approve-handover",
                                "Setujui transisi ke status serah-terima?"
                              )
                            }
                            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-60"
                          >
                            Setujui Serah Terima
                          </button>
                        )}
                        {detail.escrow_status === "serah_terima" && (
                          <button
                            disabled={isSubmitting}
                            onClick={() =>
                              handleAction(detail.id, "approve-payout", "Setujui pelepasan dana ke penjual?")
                            }
                            className="rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-500 disabled:opacity-60"
                          >
                            Setujui Payout Release
                          </button>
                        )}
                        {detail.escrow_status === "payout_release" && (
                          <button
                            disabled={isSubmitting}
                            onClick={() => handleAction(detail.id, "mark-completed", "Tandai transaksi ini selesai?")}
                            className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-60"
                          >
                            Tandai Selesai
                          </button>
                        )}
                        {detail.escrow_status === "dispute" && (
                          <>
                            <button
                              disabled={isSubmitting}
                              onClick={() => handleResolveDispute(detail.id, "resume")}
                              className="rounded-md bg-zinc-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-600 disabled:opacity-60"
                            >
                              Lanjutkan Transaksi
                            </button>
                            <button
                              disabled={isSubmitting}
                              onClick={() => handleResolveDispute(detail.id, "refund")}
                              className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-500 disabled:opacity-60"
                            >
                              Kembalikan Dana (Refund)
                            </button>
                          </>
                        )}
                      </div>

                      {detail.status_history && (
                        <div>
                          <p className="mb-2 text-xs font-semibold uppercase text-zinc-400">Riwayat Status</p>
                          <TransactionStatusHistory entries={detail.status_history} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
