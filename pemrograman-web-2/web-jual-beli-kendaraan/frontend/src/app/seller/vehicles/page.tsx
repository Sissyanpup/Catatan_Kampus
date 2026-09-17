"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { formatRupiah } from "@/lib/format";
import type { Paginated, Vehicle } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";

export default function SellerVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionError, setActionError] = useState<string | null>(null);

  async function loadVehicles() {
    setIsLoading(true);
    const { data } = await apiFetch<Paginated<Vehicle>>("/api/seller/vehicles");
    setVehicles(data);
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    loadVehicles();
  }, []);

  async function handleDelete(id: number) {
    if (!window.confirm("Hapus listing ini? Tindakan tidak bisa dibatalkan.")) return;

    setActionError(null);
    try {
      await apiFetch(`/api/seller/vehicles/${id}`, { method: "DELETE" });
      await loadVehicles();
    } catch {
      setActionError("Gagal menghapus listing.");
    }
  }

  async function handleSubmitForReview(id: number) {
    if (!window.confirm("Ajukan listing ini untuk direview admin?")) return;

    setActionError(null);
    try {
      await apiFetch(`/api/seller/vehicles/${id}/submit-for-review`, { method: "POST" });
      await loadVehicles();
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Gagal mengajukan listing untuk review."
      );
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-zinc-900">Listing Saya</h1>
        <Link
          href="/seller/vehicles/new"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          + Tambah Listing
        </Link>
      </div>

      {actionError && <p className="mt-3 text-sm text-red-600">{actionError}</p>}

      {isLoading ? (
        <p className="mt-6 text-sm text-zinc-500">Memuat...</p>
      ) : vehicles.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-500">Belum ada listing. Klik &ldquo;Tambah Listing&rdquo; untuk mulai.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-lg border border-zinc-200 bg-white">
          <table className="min-w-full divide-y divide-zinc-200 text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-zinc-500">
                <th className="px-4 py-3">Kendaraan</th>
                <th className="px-4 py-3">Harga</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="px-4 py-3">
                    {vehicle.brand} {vehicle.model} {vehicle.year}
                  </td>
                  <td className="px-4 py-3">{formatRupiah(vehicle.price)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={vehicle.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-3">
                      {(vehicle.status === "draft" || vehicle.status === "rejected") && (
                        <>
                          <Link
                            href={`/seller/vehicles/${vehicle.id}/edit`}
                            className="text-zinc-700 underline"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleSubmitForReview(vehicle.id)}
                            className="text-emerald-700 underline"
                          >
                            Ajukan Review
                          </button>
                          <button
                            onClick={() => handleDelete(vehicle.id)}
                            className="text-red-600 underline"
                          >
                            Hapus
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
