import Link from "next/link";
import { API_URL } from "@/lib/api";
import { formatRupiah } from "@/lib/format";
import type { Paginated, Vehicle } from "@/lib/types";

type SearchParams = {
  brand?: string;
  year_min?: string;
  year_max?: string;
  price_min?: string;
  price_max?: string;
  location?: string;
  page?: string;
};

async function getCatalog(searchParams: SearchParams): Promise<Paginated<Vehicle>> {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (value) query.set(key, value);
  }

  const response = await fetch(`${API_URL}/api/vehicles?${query.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return { data: [], meta: { current_page: 1, last_page: 1, total: 0 } };
  }

  return response.json();
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const catalog = await getCatalog(params);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-zinc-900">Katalog Kendaraan</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Semua listing sudah diverifikasi dokumen STNK/BPKB oleh admin.
      </p>

      <form method="GET" className="mt-6 grid grid-cols-2 gap-3 rounded-lg border border-zinc-200 bg-white p-4 sm:grid-cols-3 md:grid-cols-6">
        <input
          name="brand"
          defaultValue={params.brand}
          placeholder="Merek"
          className="col-span-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
        <input
          name="location"
          defaultValue={params.location}
          placeholder="Lokasi"
          className="col-span-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
        <input
          name="year_min"
          defaultValue={params.year_min}
          placeholder="Tahun min"
          type="number"
          className="col-span-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
        <input
          name="year_max"
          defaultValue={params.year_max}
          placeholder="Tahun max"
          type="number"
          className="col-span-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
        <input
          name="price_min"
          defaultValue={params.price_min}
          placeholder="Harga min"
          type="number"
          className="col-span-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
        <input
          name="price_max"
          defaultValue={params.price_max}
          placeholder="Harga max"
          type="number"
          className="col-span-1 rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="col-span-2 rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700 sm:col-span-1"
        >
          Filter
        </button>
      </form>

      {catalog.data.length === 0 ? (
        <p className="mt-10 text-center text-sm text-zinc-500">
          Belum ada listing yang cocok dengan filter ini.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {catalog.data.map((vehicle) => (
            <Link
              key={vehicle.id}
              href={`/kendaraan/${vehicle.id}`}
              className="overflow-hidden rounded-lg border border-zinc-200 bg-white transition hover:shadow-md"
            >
              <div className="aspect-video w-full bg-zinc-100">
                {vehicle.cover_photo_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={vehicle.cover_photo_url}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="font-medium text-zinc-900">
                  {vehicle.brand} {vehicle.model} {vehicle.year}
                </h2>
                <p className="mt-1 text-lg font-semibold text-zinc-900">
                  {formatRupiah(vehicle.price)}
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  {vehicle.mileage.toLocaleString("id-ID")} km &middot; {vehicle.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
