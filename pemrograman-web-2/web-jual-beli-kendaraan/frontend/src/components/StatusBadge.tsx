const LABELS: Record<string, string> = {
  draft: "Draft",
  pending_review: "Menunggu Review",
  pending: "Menunggu Review",
  approved: "Disetujui",
  rejected: "Ditolak",
  sold: "Terjual",
};

const COLORS: Record<string, string> = {
  draft: "bg-zinc-100 text-zinc-700",
  pending_review: "bg-amber-100 text-amber-800",
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
  sold: "bg-blue-100 text-blue-800",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        COLORS[status] ?? "bg-zinc-100 text-zinc-700"
      }`}
    >
      {LABELS[status] ?? status}
    </span>
  );
}
