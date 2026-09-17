"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ApiError, apiFetch, toFormData } from "@/lib/api";
import type { SellerProfile } from "@/lib/types";
import StatusBadge from "@/components/StatusBadge";
import { useAuth } from "@/contexts/auth-context";

export default function SellerKycPage() {
  const { refresh } = useAuth();
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ktp, setKtp] = useState<File | null>(null);
  const [npwp, setNpwp] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccountHolderName, setBankAccountHolderName] = useState("");
  const [bankErrors, setBankErrors] = useState<Record<string, string[]>>({});
  const [bankFormError, setBankFormError] = useState<string | null>(null);
  const [bankSuccess, setBankSuccess] = useState(false);
  const [isSavingBank, setIsSavingBank] = useState(false);

  async function loadProfile() {
    try {
      const { data } = await apiFetch<{ data: SellerProfile }>("/api/seller/kyc");
      setProfile(data);
      setBankName(data.bank_name ?? "");
      setBankAccountNumber(data.bank_account_number ?? "");
      setBankAccountHolderName(data.bank_account_holder_name ?? "");
    } catch (error) {
      if (!(error instanceof ApiError && error.status === 404)) {
        setFormError("Gagal memuat status KYC.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleBankSubmit(event: FormEvent) {
    event.preventDefault();
    setBankErrors({});
    setBankFormError(null);
    setBankSuccess(false);

    setIsSavingBank(true);
    try {
      const { data } = await apiFetch<{ data: SellerProfile }>("/api/seller/bank-account", {
        method: "PUT",
        body: {
          bank_name: bankName,
          bank_account_number: bankAccountNumber,
          bank_account_holder_name: bankAccountHolderName,
        },
      });
      setProfile(data);
      setBankSuccess(true);
    } catch (error) {
      if (error instanceof ApiError && error.errors) {
        setBankErrors(error.errors);
      } else if (error instanceof ApiError) {
        setBankFormError(error.message);
      }
    } finally {
      setIsSavingBank(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch on mount
    loadProfile();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrors({});
    setFormError(null);

    if (!profile && !ktp) {
      setErrors({ ktp: ["Foto KTP wajib diunggah."] });
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = toFormData({ ktp, npwp });
      const { data } = await apiFetch<{ data: SellerProfile }>("/api/seller/kyc", {
        method: profile ? "PUT" : "POST",
        body: formData,
      });
      setProfile(data);
      setKtp(null);
      setNpwp(null);
      await refresh();
    } catch (error) {
      if (error instanceof ApiError && error.errors) {
        setErrors(error.errors);
      } else if (error instanceof ApiError) {
        setFormError(error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return <p className="text-sm text-zinc-500">Memuat...</p>;
  }

  const canSubmit = !profile || profile.status !== "approved";

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Verifikasi KYC</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Wajib disetujui admin sebelum kamu bisa membuat listing kendaraan.
      </p>

      {profile && (
        <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500">Status:</span>
            <StatusBadge status={profile.status} />
          </div>
          {profile.status === "rejected" && profile.rejection_reason && (
            <p className="mt-2 text-sm text-red-600">Alasan ditolak: {profile.rejection_reason}</p>
          )}
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
        </div>
      )}

      {canSubmit && (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg border border-zinc-200 bg-white p-4">
          <h2 className="text-sm font-medium text-zinc-800">
            {profile ? "Ajukan Ulang Dokumen" : "Unggah Dokumen"}
          </h2>

          <div>
            <label className="block text-sm font-medium text-zinc-700">Foto KTP</label>
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              onChange={(e) => setKtp(e.target.files?.[0] ?? null)}
              className="mt-1 block w-full text-sm"
            />
            {errors.ktp && <p className="mt-1 text-xs text-red-600">{errors.ktp[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700">Foto NPWP (opsional, untuk dealer)</label>
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              onChange={(e) => setNpwp(e.target.files?.[0] ?? null)}
              className="mt-1 block w-full text-sm"
            />
            {errors.npwp && <p className="mt-1 text-xs text-red-600">{errors.npwp[0]}</p>}
          </div>

          {formError && <p className="text-sm text-red-600">{formError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-60"
          >
            {isSubmitting ? "Mengunggah..." : "Kirim"}
          </button>
        </form>
      )}

      {profile && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-zinc-900">Rekening Bank untuk Payout</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Dana hasil penjualan akan ditransfer admin ke rekening ini setelah serah-terima dikonfirmasi. Bisa
            diperbarui kapan pun, tidak memerlukan review ulang KYC.
          </p>

          <form onSubmit={handleBankSubmit} className="mt-4 space-y-4 rounded-lg border border-zinc-200 bg-white p-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700">Nama Bank</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="mis. BCA"
                className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-1.5 text-sm"
              />
              {bankErrors.bank_name && <p className="mt-1 text-xs text-red-600">{bankErrors.bank_name[0]}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700">Nomor Rekening</label>
              <input
                type="text"
                value={bankAccountNumber}
                onChange={(e) => setBankAccountNumber(e.target.value)}
                className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-1.5 text-sm"
              />
              {bankErrors.bank_account_number && (
                <p className="mt-1 text-xs text-red-600">{bankErrors.bank_account_number[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700">Nama Pemilik Rekening</label>
              <input
                type="text"
                value={bankAccountHolderName}
                onChange={(e) => setBankAccountHolderName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-1.5 text-sm"
              />
              {bankErrors.bank_account_holder_name && (
                <p className="mt-1 text-xs text-red-600">{bankErrors.bank_account_holder_name[0]}</p>
              )}
            </div>

            {bankFormError && <p className="text-sm text-red-600">{bankFormError}</p>}
            {bankSuccess && <p className="text-sm text-emerald-600">Rekening bank tersimpan.</p>}

            <button
              type="submit"
              disabled={isSavingBank}
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-60"
            >
              {isSavingBank ? "Menyimpan..." : "Simpan Rekening"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
