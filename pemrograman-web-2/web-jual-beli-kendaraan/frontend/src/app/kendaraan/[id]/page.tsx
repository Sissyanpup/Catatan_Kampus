import Image from "next/image";
import { notFound } from "next/navigation";
import { API_URL } from "@/lib/api";
import { formatRupiah } from "@/lib/format";
import type { VehicleDetail } from "@/lib/types";
import CheckoutWidget from "@/components/CheckoutWidget";

async function getVehicle(id: string): Promise<VehicleDetail | null> {
  const response = await fetch(`${API_URL}/api/vehicles/${id}`, { cache: "no-store" });
  if (!response.ok) return null;
  const { data } = await response.json();
  return data;
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicle(id);

  if (!vehicle) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {vehicle.photos && vehicle.photos.length > 0 ? (
          vehicle.photos.map((photo, index) => (
            <div key={photo.id} className="relative aspect-video w-full overflow-hidden rounded-lg bg-surface-container-high">
              <Image
                src={photo.url}
                alt={`${vehicle.brand} ${vehicle.model}`}
                fill
                sizes="(min-width: 640px) 33vw, 50vw"
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))
        ) : (
          <div className="col-span-full aspect-video w-full rounded-lg bg-surface-container-high" />
        )}
      </div>

      <h1 className="mt-6 text-2xl font-semibold text-on-surface">
        {vehicle.brand} {vehicle.model} {vehicle.year}
      </h1>
      <p className="mt-1 text-2xl font-bold text-on-surface">{formatRupiah(vehicle.price)}</p>
      <p className="mt-1 text-sm text-on-surface-muted">
        {vehicle.mileage.toLocaleString("id-ID")} km &middot; {vehicle.location}
      </p>

      {vehicle.description && (
        <p className="mt-4 whitespace-pre-line text-sm text-on-surface">{vehicle.description}</p>
      )}

      {vehicle.specs && Object.keys(vehicle.specs).length > 0 && (
        <dl className="mt-6 grid grid-cols-2 gap-3 rounded-lg border border-border bg-surface-container p-4 sm:grid-cols-3">
          {Object.entries(vehicle.specs).map(([key, value]) => (
            <div key={key}>
              <dt className="text-xs uppercase text-on-surface-muted">{key}</dt>
              <dd className="text-sm text-on-surface">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {vehicle.seller && (
        <p className="mt-6 text-sm text-on-surface-muted">
          Dijual oleh <span className="font-medium text-on-surface">{vehicle.seller.name}</span>
        </p>
      )}

      {vehicle.status === "approved" && <CheckoutWidget vehicleId={vehicle.id} price={vehicle.price} />}
    </div>
  );
}
