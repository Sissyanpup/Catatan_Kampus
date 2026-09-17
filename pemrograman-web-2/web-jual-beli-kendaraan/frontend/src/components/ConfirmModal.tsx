"use client";

import { useState, type ReactNode } from "react";

type Field = {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
};

type ConfirmModalProps = {
  title: string;
  message: ReactNode;
  fields?: Field[];
  confirmLabel?: string;
  isSubmitting?: boolean;
  onConfirm: (values: Record<string, string>) => void;
  onCancel: () => void;
};

/**
 * In-app replacement for window.confirm/window.prompt. Native dialogs
 * freeze Claude in Chrome's CDP connection permanently (see docs/sprint-log
 * Sprint 3 retro), so every risky admin action collects its confirmation
 * (and any accompanying note/reference) through this modal instead.
 */
export default function ConfirmModal({
  title,
  message,
  fields = [],
  confirmLabel = "Konfirmasi",
  isSubmitting = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onConfirm(values);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-lg border border-border bg-surface-container p-5 shadow-xl">
        <h2 className="font-display text-lg text-on-surface">{title}</h2>
        <div className="mt-2 text-sm text-on-surface-muted">{message}</div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="font-label block text-sm font-medium text-on-surface">
                {field.label}
              </label>
              <input
                type="text"
                required={field.required}
                placeholder={field.placeholder}
                value={values[field.name] ?? ""}
                onChange={(e) => setValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                className="mt-1 block w-full rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-on-surface placeholder:text-on-surface-muted focus:border-primary focus:outline-none"
              />
            </div>
          ))}

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="font-label rounded-md px-3 py-1.5 text-sm font-medium text-on-surface-muted hover:bg-surface-container-high disabled:opacity-60"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="font-label rounded-md bg-primary-container px-3 py-1.5 text-sm font-medium text-on-primary hover:bg-primary disabled:opacity-60"
            >
              {isSubmitting ? "Memproses..." : confirmLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
