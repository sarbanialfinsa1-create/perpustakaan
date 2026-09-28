import {
  BookOpen,
  Users,
  ArrowLeftRight,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

const statistics = [
  {
    title: "Total Buku",
    value: "1.245",
    description: "+12 buku bulan ini",
    icon: BookOpen,
  },
  {
    title: "Total Anggota",
    value: "328",
    description: "+24 anggota baru",
    icon: Users,
  },
  {
    title: "Buku Dipinjam",
    value: "87",
    description: "Hari ini",
    icon: ArrowLeftRight,
  },
  {
    title: "Terlambat",
    value: "12",
    description: "Perlu ditindaklanjuti",
    icon: AlertCircle,
  },
];

function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Kelola aktivitas perpustakaan sekolah dengan mudah.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    {item.value}
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={21} />
                </div>

              </div>

              <p className="mt-4 text-xs text-slate-500">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="grid gap-6 xl:grid-cols-3">

        {/* Chart Placeholder */}
        <div className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Statistik Peminjaman
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Aktivitas peminjaman buku
              </p>
            </div>

            <TrendingUp className="text-blue-600" size={22} />
          </div>

          <div className="mt-8 flex h-64 items-end justify-between gap-4">

            {[45, 65, 50, 80, 60, 90, 72].map((height, index) => (
              <div
                key={index}
                className="flex flex-1 flex-col items-center gap-3"
              >
                <div
                  className="w-full max-w-12 rounded-t-lg bg-blue-500 transition hover:bg-blue-600"
                  style={{
                    height: `${height}%`,
                  }}
                />

                <span className="text-xs text-slate-400">
                  {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][index]}
                </span>
              </div>
            ))}

          </div>
        </div>

        {/* Activity */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div>
            <h2 className="font-semibold text-slate-900">
              Aktivitas Terbaru
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Aktivitas perpustakaan hari ini
            </p>
          </div>

          <div className="mt-6 space-y-5">

            <Activity
              name="Ahmad Fauzan"
              action="meminjam buku"
              book="Algoritma Pemrograman"
              time="5 menit lalu"
            />

            <Activity
              name="Siti Rahma"
              action="mengembalikan buku"
              book="Matematika Dasar"
              time="18 menit lalu"
            />

            <Activity
              name="Budi Santoso"
              action="membayar denda"
              book="Rp5.000"
              time="32 menit lalu"
            />

            <Activity
              name="Nur Aisyah"
              action="meminjam buku"
              book="Bahasa Indonesia"
              time="1 jam lalu"
            />

          </div>
        </div>

      </div>
    </div>
  );
}

function Activity({ name, action, book, time }) {
  return (
    <div className="flex gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
        {name.charAt(0)}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-slate-900">
            {name}
          </span>{" "}
          {action}
        </p>

        <p className="truncate text-xs text-slate-500">
          {book}
        </p>

        <p className="mt-1 text-[11px] text-slate-400">
          {time}
        </p>
      </div>

    </div>
  );
}

export default Dashboard;