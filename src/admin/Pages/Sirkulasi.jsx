import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Plus,
  Search,
  UserRound,
  X,
} from "lucide-react";

const initialTransactions = [
  {
    id: 1,
    memberName: "Ahmad Fauzan",
    nis: "20260001",
    bookTitle: "Algoritma dan Pemrograman",
    isbn: "978-602-1234-01-1",
    borrowDate: "2026-09-20",
    dueDate: "2026-09-27",
    returnDate: null,
    status: "Dipinjam",
    extension: 0,
  },
  {
    id: 2,
    memberName: "Siti Rahma",
    nis: "20260002",
    bookTitle: "Bahasa Indonesia",
    isbn: "978-602-1234-03-5",
    borrowDate: "2026-09-15",
    dueDate: "2026-09-22",
    returnDate: null,
    status: "Terlambat",
    extension: 0,
  },
  {
    id: 3,
    memberName: "Budi Santoso",
    nis: "20260003",
    bookTitle: "Matematika Dasar",
    isbn: "978-602-1234-02-8",
    borrowDate: "2026-09-10",
    dueDate: "2026-09-17",
    returnDate: "2026-09-17",
    status: "Dikembalikan",
    extension: 0,
  },
  {
    id: 4,
    memberName: "Nur Aisyah",
    nis: "20260004",
    bookTitle: "Dasar-Dasar Fisika",
    isbn: "978-602-1234-04-2",
    borrowDate: "2026-09-23",
    dueDate: "2026-09-30",
    returnDate: null,
    status: "Dipinjam",
    extension: 0,
  },
];

const members = [
  {
    nis: "20260001",
    name: "Ahmad Fauzan",
  },
  {
    nis: "20260002",
    name: "Siti Rahma",
  },
  {
    nis: "20260003",
    name: "Budi Santoso",
  },
  {
    nis: "20260004",
    name: "Nur Aisyah",
  },
  {
    nis: "20260005",
    name: "Rizky Maulana",
  },
];

const books = [
  {
    id: 1,
    title: "Algoritma dan Pemrograman",
    isbn: "978-602-1234-01-1",
    stock: 5,
    available: 5,
  },
  {
    id: 2,
    title: "Matematika Dasar",
    isbn: "978-602-1234-02-8",
    stock: 4,
    available: 2,
  },
  {
    id: 3,
    title: "Bahasa Indonesia",
    isbn: "978-602-1234-03-5",
    stock: 6,
    available: 6,
  },
  {
    id: 4,
    title: "Dasar-Dasar Fisika",
    isbn: "978-602-1234-04-2",
    stock: 3,
    available: 2,
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
  if (!date) return "-";

  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "id-ID",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function calculateLateDays(dueDate) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(`${dueDate}T00:00:00`);

  const difference = today.getTime() - due.getTime();

  if (difference <= 0) return 0;

  return Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );
}

function calculateFine(dueDate, finePerDay) {
  return calculateLateDays(dueDate) * finePerDay;
}

function Sirkulasi() {
  const [transactions, setTransactions] = useState(
    initialTransactions
  );

  const [finePerDay, setFinePerDay] = useState(1000);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");

  const [showBorrowModal, setShowBorrowModal] =
    useState(false);

  const [showReturnModal, setShowReturnModal] =
    useState(false);

  const [selectedTransaction, setSelectedTransaction] =
    useState(null);

  const [borrowForm, setBorrowForm] = useState({
    memberNis: "",
    bookId: "",
    borrowDate: new Date()
      .toISOString()
      .split("T")[0],
  });

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

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const keyword = search.toLowerCase();

      const searchMatch =
        transaction.memberName
          .toLowerCase()
          .includes(keyword) ||
        transaction.nis
          .toLowerCase()
          .includes(keyword) ||
        transaction.bookTitle
          .toLowerCase()
          .includes(keyword) ||
        transaction.isbn
          .toLowerCase()
          .includes(keyword);

      const statusMatch =
        statusFilter === "Semua" ||
        transaction.status === statusFilter;

      return searchMatch && statusMatch;
    });
  }, [transactions, search, statusFilter]);

  const activeTransactions = transactions.filter(
    (transaction) =>
      transaction.status === "Dipinjam" ||
      transaction.status === "Terlambat"
  );

  const returnedTransactions = transactions.filter(
    (transaction) =>
      transaction.status === "Dikembalikan"
  );

  const lateTransactions = transactions.filter(
    (transaction) =>
      transaction.status === "Terlambat"
  );

  const totalFine = lateTransactions.reduce(
    (total, transaction) =>
      total +
      calculateFine(
        transaction.dueDate,
        finePerDay
      ),
    0
  );

  const getMemberLoanCount = (nis) => {
    return transactions.filter(
      (transaction) =>
        transaction.nis === nis &&
        (transaction.status === "Dipinjam" ||
          transaction.status === "Terlambat")
    ).length;
  };

  const handleBorrowChange = (e) => {
    const { name, value } = e.target;

    setBorrowForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openBorrowModal = () => {
    setBorrowForm({
      memberNis: "",
      bookId: "",
      borrowDate: new Date()
        .toISOString()
        .split("T")[0],
    });

    setShowBorrowModal(true);
  };

  const handleBorrow = (e) => {
    e.preventDefault();

    if (
      !borrowForm.memberNis ||
      !borrowForm.bookId ||
      !borrowForm.borrowDate
    ) {
      alert("Anggota, buku, dan tanggal wajib dipilih.");
      return;
    }

    const member = members.find(
      (item) => item.nis === borrowForm.memberNis
    );

    const book = books.find(
      (item) =>
        String(item.id) === String(borrowForm.bookId)
    );

    if (!member || !book) return;

    const loanCount = getMemberLoanCount(
      member.nis
    );

    if (loanCount >= 3) {
      alert(
        "Anggota sudah mencapai batas maksimal 3 buku yang sedang dipinjam."
      );
      return;
    }

    if (book.available <= 0) {
      alert("Buku tersebut sedang tidak tersedia.");
      return;
    }

    const borrowDate = new Date(
      `${borrowForm.borrowDate}T00:00:00`
    );

    const dueDate = new Date(borrowDate);

    dueDate.setDate(dueDate.getDate() + 7);

    const dueDateString = dueDate
      .toISOString()
      .split("T")[0];

    const newTransaction = {
      id: Date.now(),
      memberName: member.name,
      nis: member.nis,
      bookTitle: book.title,
      isbn: book.isbn,
      borrowDate: borrowForm.borrowDate,
      dueDate: dueDateString,
      returnDate: null,
      status: "Dipinjam",
      extension: 0,
    };

    setTransactions((prev) => [
      newTransaction,
      ...prev,
    ]);

    setShowBorrowModal(false);
  };

  const openReturnModal = (transaction) => {
    setSelectedTransaction(transaction);
    setShowReturnModal(true);
  };

  const handleReturn = () => {
    if (!selectedTransaction) return;

    const today = new Date()
      .toISOString()
      .split("T")[0];

    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === selectedTransaction.id
          ? {
            ...transaction,
            returnDate: today,
            status: "Dikembalikan",
          }
          : transaction
      )
    );

    setShowReturnModal(false);
    setSelectedTransaction(null);
  };

  const handleExtend = (transaction) => {
    if (transaction.extension >= 1) {
      alert(
        "Transaksi ini sudah pernah diperpanjang."
      );
      return;
    }

    if (
      transaction.status !== "Dipinjam"
    ) {
      alert(
        "Hanya transaksi yang masih aktif yang dapat diperpanjang."
      );
      return;
    }

    const newDueDate = new Date(
      `${transaction.dueDate}T00:00:00`
    );

    newDueDate.setDate(
      newDueDate.getDate() + 7
    );

    const newDueDateString = newDueDate
      .toISOString()
      .split("T")[0];

    setTransactions((prev) =>
      prev.map((item) =>
        item.id === transaction.id
          ? {
            ...item,
            dueDate: newDueDateString,
            extension: 1,
          }
          : item
      )
    );
  };

  const getStatusStyle = (status) => {
    if (status === "Dipinjam") {
      return "bg-blue-50 text-blue-700";
    }

    if (status === "Terlambat") {
      return "bg-red-50 text-red-700";
    }

    return "bg-emerald-50 text-emerald-700";
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Sirkulasi
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Kelola peminjaman dan pengembalian buku
            perpustakaan.
          </p>
        </div>

        <button
          onClick={openBorrowModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Peminjaman Baru
        </button>

      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Sedang Dipinjam
              </p>

              <p className="mt-2 text-2xl font-bold text-blue-600">
                {activeTransactions.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ArrowUpFromLine size={21} />
            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Terlambat
              </p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {lateTransactions.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Clock3 size={21} />
            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Dikembalikan
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {returnedTransactions.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={21} />
            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Estimasi Denda
              </p>

              <p className="mt-2 text-2xl font-bold text-orange-600">
                {formatRupiah(totalFine)}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <CalendarDays size={21} />
            </div>

          </div>

        </div>

      </div>

      {/* Search and Filter */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Cari nama anggota, NIS, atau judul buku..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="Semua">
              Semua Status
            </option>

            <option value="Dipinjam">
              Dipinjam
            </option>

            <option value="Terlambat">
              Terlambat
            </option>

            <option value="Dikembalikan">
              Dikembalikan
            </option>
          </select>

        </div>

      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1100px] text-left">

            <thead className="border-b border-slate-200 bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Anggota
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Buku
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Tanggal Pinjam
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Jatuh Tempo
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Denda
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Aksi
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredTransactions.length > 0 ? (

                filteredTransactions.map(
                  (transaction) => {

                    const lateDays =
                      transaction.status ===
                        "Terlambat"
                        ? calculateLateDays(
                          transaction.dueDate
                        )
                        : 0;

                    const fine =
                      lateDays *
                      finePerDay;

                    return (
                      <tr
                        key={transaction.id}
                        className="transition hover:bg-slate-50"
                      >

                        {/* Anggota */}
                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                              <UserRound size={18} />
                            </div>

                            <div>

                              <p className="font-semibold text-slate-900">
                                {
                                  transaction.memberName
                                }
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                NIS{" "}
                                {
                                  transaction.nis
                                }
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* Buku */}
                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                              <BookOpen size={18} />
                            </div>

                            <div>

                              <p className="max-w-[240px] font-medium text-slate-900">
                                {
                                  transaction.bookTitle
                                }
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                {
                                  transaction.isbn
                                }
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* Pinjam */}
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {
                            formatDate(
                              transaction.borrowDate
                            )
                          }
                        </td>

                        {/* Jatuh tempo */}
                        <td className="px-6 py-4">

                          <p className="text-sm font-medium text-slate-700">
                            {
                              formatDate(
                                transaction.dueDate
                              )
                            }
                          </p>

                          {transaction.extension >
                            0 && (
                              <p className="mt-1 text-xs text-blue-600">
                                Diperpanjang 1x
                              </p>
                            )}

                        </td>

                        {/* Denda */}
                        <td className="px-6 py-4">

                          {fine > 0 ? (
                            <div>
                              <p className="font-semibold text-red-600">
                                {formatRupiah(
                                  fine
                                )}
                              </p>

                              <p className="text-xs text-slate-400">
                                {lateDays} hari
                              </p>
                            </div>
                          ) : (
                            <span className="text-sm text-slate-400">
                              -
                            </span>
                          )}

                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">

                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                              transaction.status
                            )}`}
                          >
                            {
                              transaction.status
                            }
                          </span>

                        </td>

                        {/* Aksi */}
                        <td className="px-6 py-4">

                          <div className="flex justify-end gap-2">

                            {(
                              transaction.status ===
                              "Dipinjam" ||
                              transaction.status ===
                              "Terlambat"
                            ) && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleExtend(
                                        transaction
                                      )
                                    }
                                    className="rounded-lg border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                                  >
                                    Perpanjang
                                  </button>

                                  <button
                                    onClick={() =>
                                      openReturnModal(
                                        transaction
                                      )
                                    }
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                                  >
                                    <ArrowDownToLine
                                      size={14}
                                    />
                                    Kembalikan
                                  </button>
                                </>
                              )}

                            {transaction.status ===
                              "Dikembalikan" && (
                                <span className="text-xs text-slate-400">
                                  {formatDate(
                                    transaction.returnDate
                                  )}
                                </span>
                              )}

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="px-6 py-16 text-center"
                  >

                    <BookOpen
                      size={40}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 font-medium text-slate-700">
                      Transaksi tidak ditemukan
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Coba gunakan pencarian atau filter
                      lain.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Modal Peminjaman */}
      {showBorrowModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Peminjaman Baru
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Maksimal 3 buku untuk setiap anggota.
                </p>
              </div>

              <button
                onClick={() =>
                  setShowBorrowModal(false)
                }
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={handleBorrow}>

              <div className="space-y-5 p-6">

                {/* Anggota */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Anggota
                  </label>

                  <select
                    name="memberNis"
                    value={borrowForm.memberNis}
                    onChange={handleBorrowChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="">
                      Pilih anggota
                    </option>

                    {members.map((member) => (
                      <option
                        key={member.nis}
                        value={member.nis}
                      >
                        {member.name} —{" "}
                        {member.nis}
                      </option>
                    ))}

                  </select>

                </div>

                {/* Buku */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Buku
                  </label>

                  <select
                    name="bookId"
                    value={borrowForm.bookId}
                    onChange={handleBorrowChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="">
                      Pilih buku
                    </option>

                    {books.map((book) => (
                      <option
                        key={book.id}
                        value={book.id}
                        disabled={
                          book.available <= 0
                        }
                      >
                        {book.title} — tersedia{" "}
                        {book.available}
                      </option>
                    ))}

                  </select>

                </div>

                {/* Tanggal */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Tanggal Peminjaman
                  </label>

                  <input
                    type="date"
                    name="borrowDate"
                    value={borrowForm.borrowDate}
                    onChange={handleBorrowChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                <div className="rounded-xl bg-blue-50 p-4">

                  <div className="flex gap-3">

                    <CalendarDays
                      size={20}
                      className="shrink-0 text-blue-600"
                    />

                    <div>

                      <p className="text-sm font-semibold text-blue-800">
                        Masa peminjaman
                      </p>

                      <p className="mt-1 text-xs leading-5 text-blue-700">
                        Buku memiliki batas waktu
                        peminjaman selama 7 hari.
                        Perpanjangan dapat dilakukan
                        satu kali.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">

                <button
                  type="button"
                  onClick={() =>
                    setShowBorrowModal(false)
                  }
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Proses Peminjaman
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* Modal Pengembalian */}
      {showReturnModal &&
        selectedTransaction && (

          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Pengembalian Buku
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Konfirmasi pengembalian buku.
                  </p>
                </div>

                <button
                  onClick={() =>
                    setShowReturnModal(false)
                  }
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>

              </div>

              <div className="space-y-5 p-6">

                <div className="rounded-xl bg-slate-50 p-4">

                  <p className="text-xs text-slate-400">
                    Anggota
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {
                      selectedTransaction.memberName
                    }
                  </p>

                  <p className="mt-3 text-xs text-slate-400">
                    Buku
                  </p>

                  <p className="mt-1 font-semibold text-slate-900">
                    {
                      selectedTransaction.bookTitle
                    }
                  </p>

                </div>

                <div className="grid grid-cols-2 gap-3">

                  <div className="rounded-xl border border-slate-200 p-4">

                    <p className="text-xs text-slate-400">
                      Jatuh Tempo
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {formatDate(
                        selectedTransaction.dueDate
                      )}
                    </p>

                  </div>

                  <div className="rounded-xl border border-slate-200 p-4">

                    <p className="text-xs text-slate-400">
                      Keterlambatan
                    </p>

                    <p className="mt-1 text-sm font-semibold text-red-600">
                      {calculateLateDays(
                        selectedTransaction.dueDate
                      )}{" "}
                      hari
                    </p>

                  </div>

                </div>

                <div className="rounded-xl bg-orange-50 p-4">

                  <p className="text-sm font-medium text-orange-800">
                    Denda
                  </p>

                  <p className="mt-1 text-xl font-bold text-orange-700">
                    {formatRupiah(
                      calculateFine(
                        selectedTransaction.dueDate,
                        finePerDay
                      )
                    )}
                  </p>

                  <p className="mt-1 text-xs text-orange-600">
                    {formatRupiah(finePerDay)} per hari keterlambatan
                  </p>

                </div>

              </div>

              <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">

                <button
                  onClick={() =>
                    setShowReturnModal(false)
                  }
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>

                <button
                  onClick={handleReturn}
                  className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Konfirmasi Pengembalian
                </button>

              </div>

            </div>

          </div>
        )}

    </div>
  );
}

export default Sirkulasi;