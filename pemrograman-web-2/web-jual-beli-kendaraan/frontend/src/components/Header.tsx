"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function Header() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-zinc-900">
          AuraMotors
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          {!isLoading && !user && (
            <>
              <Link href="/login" className="text-zinc-600 hover:text-zinc-900">
                Masuk
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-zinc-900 px-3 py-1.5 text-white hover:bg-zinc-700"
              >
                Daftar
              </Link>
            </>
          )}

          {!isLoading && user?.role === "seller" && (
            <>
              <Link href="/seller/kyc" className="text-zinc-600 hover:text-zinc-900">
                KYC
              </Link>
              <Link href="/seller/vehicles" className="text-zinc-600 hover:text-zinc-900">
                Listing Saya
              </Link>
              <Link href="/seller/transactions" className="text-zinc-600 hover:text-zinc-900">
                Transaksi Penjualan
              </Link>
            </>
          )}

          {!isLoading && user?.role === "buyer" && (
            <Link href="/buyer/transactions" className="text-zinc-600 hover:text-zinc-900">
              Transaksi Saya
            </Link>
          )}

          {!isLoading && user?.role === "admin" && (
            <>
              <Link href="/admin/kyc" className="text-zinc-600 hover:text-zinc-900">
                Review KYC
              </Link>
              <Link href="/admin/vehicles" className="text-zinc-600 hover:text-zinc-900">
                Review Listing
              </Link>
              <Link href="/admin/transactions" className="text-zinc-600 hover:text-zinc-900">
                Escrow & Transaksi
              </Link>
              <Link href="/admin/payouts" className="text-zinc-600 hover:text-zinc-900">
                Rekonsiliasi Payout
              </Link>
            </>
          )}

          {!isLoading && user && (
            <>
              <span className="text-zinc-400">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-zinc-600 hover:text-zinc-900"
              >
                Keluar
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
