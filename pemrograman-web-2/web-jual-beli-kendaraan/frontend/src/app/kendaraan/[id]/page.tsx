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
          vehicle.photos.map((photo) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={photo.id}
              src={photo.url}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="aspect-video w-full rounded-lg object-cover"
            />
          ))
        ) : (
          <div className="col-span-full aspect-video w-full rounded-lg bg-zinc-100" />
        )}
      </div>

      <h1 className="mt-6 text-2xl font-semibold text-zinc-900">
        {vehicle.brand} {vehicle.model} {vehicle.year}
      </h1>
      <p className="mt-1 text-2xl font-bold text-zinc-900">{formatRupiah(vehicle.price)}</p>
      <p className="mt-1 text-sm text-zinc-500">
        {vehicle.mileage.toLocaleString("id-ID")} km &middot; {vehicle.location}
      </p>

      {vehicle.description && (
        <p className="mt-4 whitespace-pre-line text-sm text-zinc-700">{vehicle.description}</p>
      )}

      {vehicle.specs && Object.keys(vehicle.specs).length > 0 && (
        <dl className="mt-6 grid grid-cols-2 gap-3 rounded-lg border border-zinc-200 bg-white p-4 sm:grid-cols-3">
          {Object.entries(vehicle.specs).map(([key, value]) => (
            <div key={key}>
              <dt className="text-xs uppercase text-zinc-400">{key}</dt>
              <dd className="text-sm text-zinc-800">{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {vehicle.seller && (
        <p className="mt-6 text-sm text-zinc-500">
          Dijual oleh <span className="font-medium text-zinc-800">{vehicle.seller.name}</span>
        </p>
      )}

      {vehicle.status === "approved" && <CheckoutWidget vehicleId={vehicle.id} price={vehicle.price} />}
    </div>
  );
}
