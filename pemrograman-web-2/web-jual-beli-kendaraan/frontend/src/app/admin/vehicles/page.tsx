"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { formatRupiah } from "@/lib/format";
import type { Paginated, Vehicle, VehicleDetail } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionError, setActionError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [detail, setDetail] = useState<VehicleDetail | null>(null);

  async function loadVehicles() {
    setIsLoading(true);
    const { data } = await apiFetch<Paginated<Vehicle>>("/api/admin/vehicles");
    setVehicles(data);
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    loadVehicles();
  }, []);

  async function toggleDetail(id: number) {
    if (expandedId === id) {
      setExpandedId(null);
      setDetail(null);
      return;
    }

    setExpandedId(id);
    setDetail(null);
    const { data } = await apiFetch<{ data: VehicleDetail }>(`/api/admin/vehicles/${id}`);
    setDetail(data);
  }

  async function handleApprove(id: number) {
    if (!window.confirm("Setujui listing ini agar tayang di katalog publik?")) return;

    setActionError(null);
    try {
      await apiFetch(`/api/admin/vehicles/${id}`, { method: "PATCH", body: { status: "approved" } });
      setExpandedId(null);
      await loadVehicles();
    } catch {
      setActionError("Gagal menyetujui listing.");
    }
  }

  async function handleReject(id: number) {
    const reason = window.prompt("Alasan penolakan listing:");
    if (!reason) return;

    setActionError(null);
    try {
      await apiFetch(`/api/admin/vehicles/${id}`, {
        method: "PATCH",
        body: { status: "rejected", rejection_reason: reason },
      });
      setExpandedId(null);
      await loadVehicles();
    } catch {
      setActionError("Gagal menolak listing.");
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Review Listing Kendaraan</h1>

      {actionError && <p className="mt-3 text-sm text-red-600">{actionError}</p>}

      {isLoading ? (
        <p className="mt-6 text-sm text-zinc-500">Memuat...</p>
      ) : vehicles.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-500">Tidak ada listing pending review.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="rounded-lg border border-zinc-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-900">
                    {vehicle.brand} {vehicle.model} {vehicle.year}
                  </p>
                  <p className="text-sm text-zinc-500">
                    {formatRupiah(vehicle.price)} &middot; {vehicle.seller_name}
                  </p>
                </div>
                <StatusBadge status={vehicle.status} />
              </div>

              <button
                onClick={() => toggleDetail(vehicle.id)}
                className="mt-3 text-sm text-zinc-700 underline"
              >
                {expandedId === vehicle.id ? "Sembunyikan detail" : "Lihat detail & dokumen"}
              </button>

              {expandedId === vehicle.id && (
                <div className="mt-3 rounded-md bg-zinc-50 p-3 text-sm">
                  {!detail ? (
                    <p className="text-zinc-500">Memuat detail...</p>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <p className="text-zinc-600">{detail.description}</p>
                      <div className="flex gap-4">
                        {detail.documents?.map((doc) => (
                          <a
                            key={doc.id}
                            href={doc.download_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-700 underline"
                          >
                            Lihat {doc.type.toUpperCase()}
                          </a>
                        ))}
                        {(!detail.documents || detail.documents.length === 0) && (
                          <span className="text-zinc-400">Belum ada dokumen diunggah.</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleApprove(vehicle.id)}
                  className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-500"
                >
                  Setujui
                </button>
                <button
                  onClick={() => handleReject(vehicle.id)}
                  className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-500"
                >
                  Tolak
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
