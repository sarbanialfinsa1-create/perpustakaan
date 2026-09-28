import { useMemo, useState } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  Pencil,
  Trash2,
  Eye,
  X,
  Upload,
  CreditCard,
} from "lucide-react";

const initialMembers = [
  {
    id: 1,
    nis: "20260001",
    name: "Ahmad Fauzan",
    className: "XII IPA 1",
    phone: "081234567890",
    status: "Aktif",
    joined: "10 Januari 2026",
  },
  {
    id: 2,
    nis: "20260002",
    name: "Siti Rahma",
    className: "XI IPA 2",
    phone: "081234567891",
    status: "Aktif",
    joined: "11 Januari 2026",
  },
  {
    id: 3,
    nis: "20260003",
    name: "Budi Santoso",
    className: "X IPS 1",
    phone: "081234567892",
    status: "Aktif",
    joined: "12 Januari 2026",
  },
  {
    id: 4,
    nis: "20260004",
    name: "Nur Aisyah",
    className: "XII IPS 2",
    phone: "081234567893",
    status: "Aktif",
    joined: "13 Januari 2026",
  },
  {
    id: 5,
    nis: "20260005",
    name: "Rizky Maulana",
    className: "XI IPA 1",
    phone: "081234567894",
    status: "Nonaktif",
    joined: "14 Januari 2026",
  },
];

const classOptions = [
  "X IPA 1",
  "X IPA 2",
  "X IPS 1",
  "X IPS 2",
  "XI IPA 1",
  "XI IPA 2",
  "XI IPS 1",
  "XI IPS 2",
  "XII IPA 1",
  "XII IPA 2",
  "XII IPS 1",
  "XII IPS 2",
];

function Anggota() {
  const [members, setMembers] = useState(initialMembers);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");

  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const [selectedMember, setSelectedMember] = useState(null);

  const [form, setForm] = useState({
    nis: "",
    name: "",
    className: "",
    phone: "",
    status: "Aktif",
  });

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const keyword = search.toLowerCase();

      const searchMatch =
        member.name.toLowerCase().includes(keyword) ||
        member.nis.toLowerCase().includes(keyword);

      const classMatch =
        classFilter === "Semua" ||
        member.className === classFilter;

      const statusMatch =
        statusFilter === "Semua" ||
        member.status === statusFilter;

      return searchMatch && classMatch && statusMatch;
    });
  }, [members, search, classFilter, statusFilter]);

  const totalMembers = members.length;

  const activeMembers = members.filter(
    (member) => member.status === "Aktif"
  ).length;

  const inactiveMembers = members.filter(
    (member) => member.status === "Nonaktif"
  ).length;

  const openAddModal = () => {
    setSelectedMember(null);

    setForm({
      nis: "",
      name: "",
      className: "",
      phone: "",
      status: "Aktif",
    });

    setShowModal(true);
  };

  const openEditModal = (member) => {
    setSelectedMember(member);

    setForm({
      nis: member.nis,
      name: member.name,
      className: member.className,
      phone: member.phone,
      status: member.status,
    });

    setShowModal(true);
  };

  const openDetail = (member) => {
    setSelectedMember(member);
    setShowDetail(true);
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

    if (!form.nis || !form.name || !form.className) {
      alert("NIS, nama, dan kelas wajib diisi.");
      return;
    }

    if (selectedMember) {
      setMembers((prev) =>
        prev.map((member) =>
          member.id === selectedMember.id
            ? {
              ...member,
              ...form,
            }
            : member
        )
      );
    } else {
      const newMember = {
        id: Date.now(),
        ...form,
        joined: new Date().toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      };

      setMembers((prev) => [newMember, ...prev]);
    }

    setShowModal(false);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Apakah kamu yakin ingin menghapus anggota ini?"
    );

    if (!confirmDelete) return;

    setMembers((prev) =>
      prev.filter((member) => member.id !== id)
    );
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Anggota Perpustakaan
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Kelola data siswa yang terdaftar sebagai anggota
            perpustakaan.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Upload size={18} />
            Import Excel/CSV
          </button>

          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Tambah Anggota
          </button>

        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Anggota
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalMembers}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Users size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Anggota Aktif
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {activeMembers}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Anggota Nonaktif
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-600">
            {inactiveMembers}
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
              placeholder="Cari NIS atau nama siswa..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* Kelas */}
          <div className="flex items-center gap-2">

            <Filter
              size={17}
              className="text-slate-400"
            />

            <select
              value={classFilter}
              onChange={(e) =>
                setClassFilter(e.target.value)
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="Semua">
                Semua Kelas
              </option>

              {classOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

          </div>

          {/* Status */}
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

            <option value="Aktif">
              Aktif
            </option>

            <option value="Nonaktif">
              Nonaktif
            </option>
          </select>

        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px] text-left">

            <thead className="border-b border-slate-200 bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Anggota
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  NIS
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Kelas
                </th>

                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  No. HP
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

              {filteredMembers.length > 0 ? (

                filteredMembers.map((member) => (

                  <tr
                    key={member.id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* Nama */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                          {member.name.charAt(0)}
                        </div>

                        <div>

                          <p className="font-semibold text-slate-900">
                            {member.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            Bergabung {member.joined}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* NIS */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {member.nis}
                    </td>

                    {/* Kelas */}
                    <td className="px-6 py-4">

                      <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">
                        {member.className}
                      </span>

                    </td>

                    {/* HP */}
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {member.phone}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${member.status === "Aktif"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                          }`}
                      >
                        {member.status}
                      </span>

                    </td>

                    {/* Aksi */}
                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-1">

                        <button
                          onClick={() => openDetail(member)}
                          title="Detail"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600"
                        >
                          <Eye size={17} />
                        </button>

                        <button
                          onClick={() => openEditModal(member)}
                          title="Edit"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => handleDelete(member.id)}
                          title="Hapus"
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    className="px-6 py-16 text-center"
                  >

                    <Users
                      size={40}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 font-medium text-slate-700">
                      Anggota tidak ditemukan
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Coba gunakan pencarian atau filter lain.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>
      </div>

      {/* Modal Tambah / Edit */}
      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  {selectedMember
                    ? "Edit Anggota"
                    : "Tambah Anggota"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Masukkan data siswa dengan lengkap.
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

                {/* NIS */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    NIS
                  </label>

                  <input
                    name="nis"
                    value={form.nis}
                    onChange={handleChange}
                    placeholder="Masukkan NIS"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* Nama */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Nama Lengkap
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nama lengkap siswa"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* Kelas */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Kelas
                  </label>

                  <select
                    name="className"
                    value={form.className}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="">
                      Pilih kelas
                    </option>

                    {classOptions.map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}

                  </select>

                </div>

                {/* No HP */}
                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Nomor HP
                  </label>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* Status */}
                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >

                    <option value="Aktif">
                      Aktif
                    </option>

                    <option value="Nonaktif">
                      Nonaktif
                    </option>

                  </select>

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
                  {selectedMember
                    ? "Simpan Perubahan"
                    : "Tambah Anggota"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* Modal Detail */}
      {showDetail && selectedMember && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Detail Anggota
                </h2>

                <p className="text-sm text-slate-500">
                  Informasi anggota perpustakaan
                </p>
              </div>

              <button
                onClick={() => setShowDetail(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-6">

              <div className="flex flex-col items-center">

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
                  {selectedMember.name.charAt(0)}
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {selectedMember.name}
                </h3>

                <span className="mt-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {selectedMember.status}
                </span>

              </div>

              <div className="mt-6 space-y-4">

                <DetailRow
                  label="NIS"
                  value={selectedMember.nis}
                />

                <DetailRow
                  label="Kelas"
                  value={selectedMember.className}
                />

                <DetailRow
                  label="Nomor HP"
                  value={selectedMember.phone}
                />

                <DetailRow
                  label="Terdaftar"
                  value={selectedMember.joined}
                />

              </div>

              <button
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <CreditCard size={18} />
                Lihat Kartu Perpustakaan
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3">
      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-right text-sm font-medium text-slate-900">
        {value}
      </span>
    </div>
  );
}

export default Anggota;