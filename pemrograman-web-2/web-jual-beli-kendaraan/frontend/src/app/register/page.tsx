"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { ApiError } from "@/lib/api";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErrors({});
    setFormError(null);

    if (password !== passwordConfirmation) {
      setErrors({ password_confirmation: ["Konfirmasi password tidak cocok."] });
      return;
    }

    setIsSubmitting(true);
    try {
      await register({ name, email, password, password_confirmation: passwordConfirmation, role });
      router.push(role === "seller" ? "/seller/kyc" : "/");
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError && error.errors) {
        setErrors(error.errors);
      } else if (error instanceof ApiError) {
        setFormError(error.message);
      } else {
        setFormError("Terjadi kesalahan tak terduga.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-xl font-semibold text-zinc-900">Daftar Akun</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700">Nama</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Password</label>
          <input
            required
            type="password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
          />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Konfirmasi Password</label>
          <input
            required
            type="password"
            minLength={8}
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm"
          />
          {errors.password_confirmation && (
            <p className="mt-1 text-xs text-red-600">{errors.password_confirmation[0]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700">Daftar sebagai</label>
          <div className="mt-1 flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={role === "buyer"}
                onChange={() => setRole("buyer")}
              />
              Buyer
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={role === "seller"}
                onChange={() => setRole("seller")}
              />
              Seller
            </label>
          </div>
          {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role[0]}</p>}
        </div>

        {formError && <p className="text-sm text-red-600">{formError}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-60"
        >
          {isSubmitting ? "Memproses..." : "Daftar"}
        </button>
      </form>

      <p className="mt-4 text-sm text-zinc-500">
        Sudah punya akun?{" "}
        <Link href="/login" className="font-medium text-zinc-900">
          Masuk
        </Link>
      </p>
    </div>
  );
}
