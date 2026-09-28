import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  Wallet,
  CheckCircle2,
  Clock3,
  Banknote,
  X,
} from "lucide-react";

const initialFines = [
  {
    id: 1,
    member: "Siti Rahma",
    nis: "20260002",
    book: "Bahasa Indonesia",
    dueDate: "2026-09-22",
    returnDate: "-",
    lateDays: 4,
    fine: 4000,
    status: "Belum Dibayar",
  },
  {
    id: 2,
    member: "Ahmad Fauzan",
    nis: "20260001",
    book: "Algoritma dan Pemrograman",
    dueDate: "2026-09-08",
    returnDate: "2026-09-12",
    lateDays: 4,
    fine: 4000,
    status: "Sudah Dibayar",
  },
  {
    id: 3,
    member: "Budi Santoso",
    nis: "20260003",
    book: "Matematika Dasar",
    dueDate: "2026-08-27",
    returnDate: "2026-09-01",
    lateDays: 5,
    fine: 5000,
    status: "Belum Dibayar",
  },
  {
    id: 4,
    member: "Nur Aisyah",
    nis: "20260004",
    book: "Dasar-Dasar Fisika",
    dueDate: "2026-08-17",
    returnDate: "2026-08-20",
    lateDays: 3,
    fine: 3000,
    status: "Sudah Dibayar",
  },
];

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(date) {
  if (!date || date === "-") return "-";

  return new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function calculateFine(lateDays, finePerDay) {
  return lateDays * finePerDay;
}

export default function Denda() {
  const [fines, setFines] = useState(initialFines);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");

  const [selectedFine, setSelectedFine] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Tunai");

  // =========================================================
  // TAMBAHAN: MENGAMBIL PENGATURAN DENDA DARI PENGATURAN
  // =========================================================
  const [finePerDay, setFinePerDay] = useState(1000);

  useEffect(() => {
    const loadFineSettings = () => {
      try {
        const savedFine = localStorage.getItem(
          "perpustakaan_fine_settings"
        );

        if (savedFine) {
          const fineData = JSON.parse(savedFine);

          setFinePerDay(
            Number(fineData.finePerDay) || 1000
          );
        } else {
          setFinePerDay(1000);
        }
      } catch (error) {
        console.error(
          "Gagal membaca pengaturan denda:",
          error
        );

        setFinePerDay(1000);
      }
    };

    loadFineSettings();

    window.addEventListener(
      "profileUpdated",
      loadFineSettings
    );

    return () => {
      window.removeEventListener(
        "profileUpdated",
        loadFineSettings
      );
    };
  }, []);

  const stats = useMemo(() => {
    const total = fines.reduce(
      (sum, item) =>
        sum + calculateFine(item.lateDays, finePerDay),
      0
    );

    const unpaid = fines
      .filter((item) => item.status === "Belum Dibayar")
      .reduce(
        (sum, item) =>
          sum + calculateFine(item.lateDays, finePerDay),
        0
      );

    const paid = fines
      .filter((item) => item.status === "Sudah Dibayar")
      .reduce(
        (sum, item) =>
          sum + calculateFine(item.lateDays, finePerDay),
        0
      );

    return {
      total,
      unpaid,
      paid,
      count: fines.length,
    };
  }, [fines, finePerDay]);

  const filteredFines = useMemo(() => {
    return fines.filter((item) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        item.member.toLowerCase().includes(keyword) ||
        item.nis.toLowerCase().includes(keyword) ||
        item.book.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "Semua Status" ||
        item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [fines, search, statusFilter]);

  const openPaymentModal = (fine) => {
    setSelectedFine(fine);
    setPaymentMethod("Tunai");
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setSelectedFine(null);
    setShowPaymentModal(false);
  };

  const confirmPayment = () => {
    if (!selectedFine) return;

    setFines((current) =>
      current.map((item) =>
        item.id === selectedFine.id
          ? {
            ...item,
            status: "Sudah Dibayar",
          }
          : item
      )
    );

    closePaymentModal();
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Denda</h1>
        <p className="mt-1 text-sm text-slate-500">
          Kelola dan pantau pembayaran denda keterlambatan buku.
        </p>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Denda
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {formatRupiah(stats.total)}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Wallet size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Belum Dibayar
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {formatRupiah(stats.unpaid)}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <Clock3 size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Sudah Dibayar
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {formatRupiah(stats.paid)}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <CheckCircle2 size={22} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Tarif per Hari
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                {formatRupiah(finePerDay)}
              </h3>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Banknote size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* FILTER */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, NIS, atau judul buku..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="relative w-full lg:w-48">
            <Filter
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            >
              <option>Semua Status</option>
              <option>Belum Dibayar</option>
              <option>Sudah Dibayar</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="min-w-[150px] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Anggota
                </th>

                <th className="min-w-[180px] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Buku
                </th>

                <th className="min-w-[120px] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Jatuh Tempo
                </th>

                <th className="min-w-[135px] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Dikembalikan
                </th>

                <th className="min-w-[110px] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Terlambat
                </th>

                <th className="min-w-[140px] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Denda
                </th>

                <th className="min-w-[140px] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="min-w-[100px] px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredFines.length > 0 ? (
                filteredFines.map((fine) => (
                  <tr
                    key={fine.id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* ANGGOTA */}
                    <td className="px-6 py-4 align-middle">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {fine.member}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          NIS {fine.nis}
                        </p>
                      </div>
                    </td>

                    {/* BUKU */}
                    <td className="px-6 py-4 align-middle">
                      <p className="max-w-[190px] whitespace-normal text-sm font-medium leading-5 text-slate-800">
                        {fine.book}
                      </p>
                    </td>

                    {/* JATUH TEMPO */}
                    <td className="px-6 py-4 align-middle">
                      <span className="text-sm text-slate-700">
                        {formatDate(fine.dueDate)}
                      </span>
                    </td>

                    {/* DIKEMBALIKAN */}
                    <td className="px-6 py-4 align-middle">
                      <span className="text-sm text-slate-700">
                        {formatDate(fine.returnDate)}
                      </span>
                    </td>

                    {/* TERLAMBAT */}
                    <td className="px-6 py-4 align-middle">
                      <span className="text-sm font-semibold text-slate-800">
                        {fine.lateDays} hari
                      </span>
                    </td>

                    {/* DENDA */}
                    <td className="px-6 py-4 align-middle">
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {formatRupiah(
                            calculateFine(
                              fine.lateDays,
                              finePerDay
                            )
                          )}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {fine.lateDays} ×{" "}
                          {formatRupiah(finePerDay)}
                        </p>
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4 align-middle">
                      {fine.status === "Sudah Dibayar" ? (
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-green-500" />

                          <span className="text-sm font-medium text-slate-800">
                            Sudah Dibayar
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-slate-400" />

                          <span className="text-sm font-medium text-slate-800">
                            Belum Dibayar
                          </span>
                        </div>
                      )}
                    </td>

                    {/* AKSI */}
                    <td className="px-6 py-4 align-middle">
                      {fine.status === "Belum Dibayar" ? (
                        <button
                          onClick={() => openPaymentModal(fine)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700"
                          title="Bayar Denda"
                        >
                          <Wallet size={17} />
                        </button>
                      ) : (
                        <span className="whitespace-nowrap text-sm text-slate-400">
                          Selesai
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    Data denda tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {showPaymentModal && selectedFine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Pembayaran Denda
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Konfirmasi pembayaran denda anggota.
                </p>
              </div>

              <button
                onClick={closePaymentModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="space-y-5 p-6">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Nama Anggota
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {selectedFine.member}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-slate-500">NIS</span>

                  <span className="text-sm font-medium text-slate-700">
                    {selectedFine.nis}
                  </span>
                </div>

                <div className="mt-3 flex items-start justify-between gap-4">
                  <span className="text-sm text-slate-500">Buku</span>

                  <span className="text-right text-sm font-medium text-slate-700">
                    {selectedFine.book}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Keterlambatan
                  </span>

                  <span className="text-sm font-medium text-slate-700">
                    {selectedFine.lateDays} hari
                  </span>
                </div>

                <div className="mt-4 border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">
                      Total Denda
                    </span>

                    <span className="text-lg font-bold text-slate-900">
                      {formatRupiah(
                        calculateFine(
                          selectedFine.lateDays,
                          finePerDay
                        )
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* PAYMENT METHOD */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-slate-700">
                  Metode Pembayaran
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {["Tunai", "Transfer", "QRIS"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${paymentMethod === method
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                        }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
              <button
                onClick={closePaymentModal}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Batal
              </button>

              <button
                onClick={confirmPayment}
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Konfirmasi Pembayaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}