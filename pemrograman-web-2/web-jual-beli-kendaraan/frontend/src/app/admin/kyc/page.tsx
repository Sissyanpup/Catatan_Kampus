"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { Paginated, SellerProfile } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";

export default function AdminKycPage() {
  const [profiles, setProfiles] = useState<SellerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionError, setActionError] = useState<string | null>(null);

  async function loadProfiles() {
    setIsLoading(true);
    const { data } = await apiFetch<Paginated<SellerProfile>>("/api/admin/kyc");
    setProfiles(data);
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    loadProfiles();
  }, []);

  async function handleApprove(id: number) {
    if (!window.confirm("Setujui KYC seller ini?")) return;

    setActionError(null);
    try {
      await apiFetch(`/api/admin/kyc/${id}`, { method: "PATCH", body: { status: "approved" } });
      await loadProfiles();
    } catch {
      setActionError("Gagal menyetujui KYC.");
    }
  }

  async function handleReject(id: number) {
    const reason = window.prompt("Alasan penolakan KYC:");
    if (!reason) return;

    setActionError(null);
    try {
      await apiFetch(`/api/admin/kyc/${id}`, {
        method: "PATCH",
        body: { status: "rejected", rejection_reason: reason },
      });
      await loadProfiles();
    } catch {
      setActionError("Gagal menolak KYC.");
    }
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Review KYC Seller</h1>

      {actionError && <p className="mt-3 text-sm text-red-600">{actionError}</p>}

      {isLoading ? (
        <p className="mt-6 text-sm text-zinc-500">Memuat...</p>
      ) : profiles.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-500">Tidak ada pengajuan KYC pending.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {profiles.map((profile) => (
            <div key={profile.id} className="rounded-lg border border-zinc-200 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-zinc-900">{profile.user?.name}</p>
                  <p className="text-sm text-zinc-500">{profile.user?.email}</p>
                </div>
                <StatusBadge status={profile.status} />
              </div>

              <div className="mt-3 flex gap-4 text-sm">
                <a href={profile.ktp_url} target="_blank" rel="noreferrer" className="text-zinc-700 underline">
                  Lihat KTP
                </a>
                {profile.npwp_url && (
                  <a href={profile.npwp_url} target="_blank" rel="noreferrer" className="text-zinc-700 underline">
                    Lihat NPWP
                  </a>
                )}
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleApprove(profile.id)}
                  className="rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-emerald-500"
                >
                  Setujui
                </button>
                <button
                  onClick={() => handleReject(profile.id)}
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
