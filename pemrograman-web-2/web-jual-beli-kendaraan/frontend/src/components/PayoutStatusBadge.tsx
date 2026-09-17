import type { PayoutStatus } from "@/lib/types";

const LABELS: Record<PayoutStatus, string> = {
  pending: "Payout Diproses",
  paid: "Dana Dicairkan",
  failed: "Payout Gagal",
};

const COLORS: Record<PayoutStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  paid: "bg-emerald-100 text-emerald-800",
  failed: "bg-red-100 text-red-800",
};

export default function PayoutStatusBadge({ status }: { status: PayoutStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${COLORS[status]}`}>
      {LABELS[status]}
    </span>
  );
}
