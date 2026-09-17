import type { PaymentStatus } from "@/lib/types";
import Badge, { type BadgeTone } from "./Badge";

const LABELS: Record<PaymentStatus, string> = {
  pending: "Menunggu Pembayaran",
  paid: "Lunas",
  failed: "Gagal",
  expired: "Kedaluwarsa",
};

const TONES: Record<PaymentStatus, BadgeTone> = {
  pending: "warning",
  paid: "success",
  failed: "danger",
  expired: "neutral",
};

export default function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return <Badge tone={TONES[status]}>{LABELS[status]}</Badge>;
}
