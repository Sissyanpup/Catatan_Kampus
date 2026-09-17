"use client";

import { use, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import type { VehicleDetail } from "@/lib/types";
import VehicleForm from "@/components/VehicleForm";

export default function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [vehicle, setVehicle] = useState<VehicleDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiFetch<{ data: VehicleDetail }>(`/api/seller/vehicles/${id}`)
      .then(({ data }) => setVehicle(data))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <p className="text-sm text-zinc-500">Memuat...</p>;
  }

  if (!vehicle) {
    return <p className="text-sm text-red-600">Listing tidak ditemukan.</p>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-zinc-900">Edit Listing Kendaraan</h1>
      <div className="mt-6">
        <VehicleForm vehicleId={vehicle.id} initial={vehicle} />
      </div>
    </div>
  );
}
