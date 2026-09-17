import type { EscrowStatus } from "@/lib/types";

const LABELS: Record<EscrowStatus, string> = {
  escrow_hold: "Dana Ditahan (Escrow)",
  serah_terima: "Serah Terima Dikonfirmasi",
  payout_release: "Payout Disetujui",
  selesai: "Selesai",
  dispute: "Sengketa",
  refunded: "Dana Dikembalikan",
};

const COLORS: Record<EscrowStatus, string> = {
  escrow_hold: "bg-blue-100 text-blue-800",
  serah_terima: "bg-indigo-100 text-indigo-800",
  payout_release: "bg-purple-100 text-purple-800",
  selesai: "bg-emerald-100 text-emerald-800",
  dispute: "bg-red-100 text-red-800",
  refunded: "bg-zinc-100 text-zinc-700",
};

export default function EscrowStatusBadge({ status }: { status: EscrowStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${COLORS[status]}`}>
      {LABELS[status]}
    </span>
  );
}
