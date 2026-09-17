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
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="font-display text-xl tracking-wide text-primary"
        >
          AuraMotors
        </Link>

        <nav className="font-label flex items-center gap-4 text-sm">
          {!isLoading && !user && (
            <>
              <Link href="/login" className="text-on-surface-muted hover:text-on-surface">
                Masuk
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-primary-container px-3 py-1.5 font-medium text-on-primary hover:bg-primary"
              >
                Daftar
              </Link>
            </>
          )}

          {!isLoading && user?.role === "seller" && (
            <>
              <Link href="/seller/kyc" className="text-on-surface-muted hover:text-on-surface">
                KYC
              </Link>
              <Link href="/seller/vehicles" className="text-on-surface-muted hover:text-on-surface">
                Listing Saya
              </Link>
              <Link href="/seller/transactions" className="text-on-surface-muted hover:text-on-surface">
                Transaksi Penjualan
              </Link>
            </>
          )}

          {!isLoading && user?.role === "buyer" && (
            <Link href="/buyer/transactions" className="text-on-surface-muted hover:text-on-surface">
              Transaksi Saya
            </Link>
          )}

          {!isLoading && user?.role === "admin" && (
            <>
              <Link href="/admin/kyc" className="text-on-surface-muted hover:text-on-surface">
                Review KYC
              </Link>
              <Link href="/admin/vehicles" className="text-on-surface-muted hover:text-on-surface">
                Review Listing
              </Link>
              <Link href="/admin/transactions" className="text-on-surface-muted hover:text-on-surface">
                Escrow & Transaksi
              </Link>
              <Link href="/admin/payouts" className="text-on-surface-muted hover:text-on-surface">
                Rekonsiliasi Payout
              </Link>
            </>
          )}

          {!isLoading && user && (
            <>
              <span className="text-tertiary">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-on-surface-muted hover:text-on-surface"
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
