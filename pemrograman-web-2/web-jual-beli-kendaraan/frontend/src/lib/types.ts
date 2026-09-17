export type UserRole = "admin" | "seller" | "buyer";
export type SellerProfileStatus = "pending" | "approved" | "rejected";
export type VehicleStatus = "draft" | "pending_review" | "approved" | "rejected" | "sold";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  seller_profile_status?: SellerProfileStatus | null;
};

export type SellerProfile = {
  id: number;
  user?: User;
  status: SellerProfileStatus;
  ktp_url: string;
  npwp_url: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  rejection_reason: string | null;
  created_at: string;
};

export type Vehicle = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  mileage: number;
  location: string;
  status: VehicleStatus;
  cover_photo_url: string | null;
  seller_name?: string;
};

export type VehiclePhoto = {
  id: number;
  url: string;
};

export type VehicleDocument = {
  id: number;
  type: "stnk" | "bpkb";
  download_url: string;
};

export type VehicleDetail = {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: string;
  mileage: number;
  location: string;
  description: string | null;
  specs: Record<string, string> | null;
  status: VehicleStatus;
  reviewed_by: string | null;
  reviewed_at: string | null;
  rejection_reason: string | null;
  seller?: { id: number; name: string };
  photos?: VehiclePhoto[];
  documents?: VehicleDocument[];
  created_at: string;
};

export type PaymentGateway = "mock" | "xendit";
export type PaymentStatus = "pending" | "paid" | "failed" | "expired";
export type EscrowStatus =
  | "escrow_hold"
  | "serah_terima"
  | "payout_release"
  | "selesai"
  | "dispute"
  | "refunded";

export type TransactionStatusHistoryEntry = {
  id: number;
  from_status: string | null;
  to_status: string;
  actor: string | null;
  note: string | null;
  created_at: string;
};

export type Transaction = {
  id: number;
  vehicle: Vehicle;
  buyer?: { id: number; name: string };
  seller?: { id: number; name: string };
  amount: string;
  payment_gateway: PaymentGateway;
  payment_status: PaymentStatus;
  gateway_reference: string | null;
  gateway_invoice_url: string | null;
  paid_at: string | null;
  expires_at: string | null;
  escrow_status: EscrowStatus | null;
  buyer_confirmed_at: string | null;
  seller_confirmed_at: string | null;
  dispute_reason: string | null;
  disputed_at: string | null;
  dispute_resolution_note: string | null;
  dispute_resolved_at: string | null;
  status_history?: TransactionStatusHistoryEntry[];
  created_at: string;
};

export type Paginated<T> = {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    total: number;
  };
};
