import { useMemo, useState } from "react";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  X,
} from "lucide-react";

const initialBooks = [
  {
    id: 1,
    title: "Algoritma dan Pemrograman",
    isbn: "978-602-1234-01-1",
    author: "Ahmad Fauzan",
    category: "Informatika",
    ddc: "005.1",
    shelf: "A-01",
    stock: 5,
    available: 5,
    status: "Tersedia",
  },
  {
    id: 2,
    title: "Matematika Dasar",
    isbn: "978-602-1234-02-8",
    author: "Budi Santoso",
    category: "Matematika",
    ddc: "510",
    shelf: "B-02",
    stock: 4,
    available: 2,
    status: "Dipinjam",
  },
  {
    id: 3,
    title: "Bahasa Indonesia",
    isbn: "978-602-1234-03-5",
    author: "Siti Rahma",
    category: "Bahasa",
    ddc: "410",
    shelf: "C-01",
    stock: 6,
    available: 6,
    status: "Tersedia",
  },
  {
    id: 4,
    title: "Dasar-Dasar Fisika",
    isbn: "978-602-1234-04-2",
    author: "Nur Aisyah",
    category: "Fisika",
    ddc: "530",
    shelf: "D-03",
    stock: 3,
    available: 0,
    status: "Dipinjam",
  },
  {
    id: 5,
    title: "Ilmu Pengetahuan Alam",
    isbn: "978-602-1234-05-9",
    author: "Rizky Maulana",
    category: "Sains",
    ddc: "500",
    shelf: "E-01",
    stock: 4,
    available: 0,
    status: "Rusak",
  },
];

function Buku() {
  const [books, setBooks] = useState(initialBooks);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [status, setStatus] = useState("Semua");

  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [form, setForm] = useState({
    title: "",
    isbn: "",
    author: "",
    category: "",
    ddc: "",
    shelf: "",
    stock: "",
  });

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const searchMatch =
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.isbn.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase());

      const categoryMatch =
        category === "Semua" || book.category === category;

      const statusMatch =
        status === "Semua" || book.status === status;

      return searchMatch && categoryMatch && statusMatch;
    });
  }, [books, search, category, status]);

  const openAddModal = () => {
    setSelectedBook(null);

    setForm({
      title: "",
      isbn: "",
      author: "",
      category: "",
      ddc: "",
      shelf: "",
      stock: "",
    });

    setShowModal(true);
  };

  const openEditModal = (book) => {
    setSelectedBook(book);

    setForm({
      title: book.title,
      isbn: book.isbn,
      author: book.author,
      category: book.category,
      ddc: book.ddc,
      shelf: book.shelf,
      stock: book.stock,
    });

    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.isbn || !form.author) {
      alert("Judul, ISBN, dan penulis wajib diisi.");
      return;
    }

    if (selectedBook) {
      setBooks((prev) =>
        prev.map((book) =>
          book.id === selectedBook.id
            ? {
              ...book,
              ...form,
              stock: Number(form.stock) || 0,
            }
            : book
        )
      );
    } else {
      const newBook = {
        id: Date.now(),
        ...form,
        stock: Number(form.stock) || 0,
        available: Number(form.stock) || 0,
        status: "Tersedia",
      };

      setBooks((prev) => [newBook, ...prev]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus buku ini?"
    );

    if (!confirmDelete) return;

    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const getStatusStyle = (book) => {
    if (book.status === "Tersedia") {
      return "bg-emerald-50 text-emerald-700";
    }

    if (book.status === "Dipinjam") {
      return "bg-blue-50 text-blue-700";
    }

    if (book.status === "Rusak") {
      return "bg-orange-50 text-orange-700";
    }

    return "bg-red-50 text-red-700";
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Koleksi Buku
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Kelola koleksi dan stok buku perpustakaan.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Tambah Buku
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Judul
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {books.length}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Eksemplar
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {books.reduce((total, book) => total + Number(book.stock), 0)}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Tersedia
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {books.reduce(
              (total, book) => total + Number(book.available),
              0
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Dipinjam
          </p>

          <p className="mt-2 text-2xl font-bold text-blue-600">
            {books.reduce(
              (total, book) =>
                total + (Number(book.stock) - Number(book.available)),
              0
            )}
          </p>
        </div>

      </div>

      {/* Filter */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul, ISBN, atau penulis..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Category */}
          <div className="flex items-center gap-2">
            <Filter size={17} className="text-slate-400" />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="Semua">Semua Kategori</option>
              <option value="Informatika">Informatika</option>
              <option value="Matematika">Matematika</option>
              <option value="Bahasa">Bahasa</option>
              <option value="Fisika">Fisika</option>
              <option value="Sains">Sains</option>
            </select>
          </div>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="Semua">Semua Status</option>
            <option value="Tersedia">Tersedia</option>
            <option value="Dipinjam">Dipinjam</option>
            <option value="Rusak">Rusak</option>
            <option value="Hilang">Hilang</option>
          </select>

        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px] text-left">

            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Buku
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  ISBN
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Penulis
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Kategori
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Rak
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Stok
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

              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="transition hover:bg-slate-50"
                  >

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <BookOpen size={20} />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {book.title}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            DDC {book.ddc}
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {book.isbn}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {book.author}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {book.category}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                        {book.shelf}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {book.available} / {book.stock}
                        </p>

                        <p className="text-xs text-slate-400">
                          tersedia
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                          book
                        )}`}
                      >
                        {book.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-1">

                        <button
                          title="Detail"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          title="Edit"
                          onClick={() => openEditModal(book)}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          title="Hapus"
                          onClick={() => handleDelete(book.id)}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={17} />
                        </button>

                        <button
                          title="Lainnya"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                        >
                          <MoreVertical size={17} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-16 text-center"
                  >
                    <BookOpen
                      size={40}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 font-medium text-slate-700">
                      Buku tidak ditemukan
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Coba gunakan kata pencarian atau filter lain.
                    </p>
                  </td>
                </tr>
              )}

            </tbody>
          </table>

        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {selectedBook ? "Edit Buku" : "Tambah Buku"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Lengkapi informasi buku perpustakaan.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>

              <div className="grid gap-5 p-6 md:grid-cols-2">

                {/* Judul */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Judul Buku
                  </label>

                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Masukkan judul buku"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* ISBN */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    ISBN
                  </label>

                  <input
                    name="isbn"
                    value={form.isbn}
                    onChange={handleChange}
                    placeholder="978-..."
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Penulis */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Penulis
                  </label>

                  <input
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="Nama penulis"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Kategori */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Kategori
                  </label>

                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">Pilih kategori</option>
                    <option value="Informatika">Informatika</option>
                    <option value="Matematika">Matematika</option>
                    <option value="Bahasa">Bahasa</option>
                    <option value="Fisika">Fisika</option>
                    <option value="Sains">Sains</option>
                  </select>
                </div>

                {/* DDC */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Kategori DDC
                  </label>

                  <input
                    name="ddc"
                    value={form.ddc}
                    onChange={handleChange}
                    placeholder="Contoh: 005.1"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Rak */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Rak
                  </label>

                  <input
                    name="shelf"
                    value={form.shelf}
                    onChange={handleChange}
                    placeholder="Contoh: A-01"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Stok */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Jumlah Stok
                  </label>

                  <input
                    type="number"
                    min="0"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="Contoh: 5"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {selectedBook ? "Simpan Perubahan" : "Tambah Buku"}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default Buku;