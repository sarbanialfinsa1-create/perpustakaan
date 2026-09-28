import { BookOpen, Clock, Laptop, Users } from 'lucide-react'

const FEATURES = [
  {
    icon: BookOpen,
    bg: 'bg-brand-soft',
    iconColor: 'text-brand',
    title: 'Koleksi Lengkap',
    desc: 'Ribuan buku dari berbagai tema dan kategori',
  },
  {
    icon: Clock,
    bg: 'bg-teal-50',
    iconColor: 'text-teal-accent',
    title: 'Peminjaman Mudah',
    desc: 'Proses cepat dan praktis dengan sistem terintegrasi',
  },
  {
    icon: Laptop,
    bg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    title: 'Akses Informasi',
    desc: 'Cek ketersediaan buku, riwayat peminjaman, dan informasi perpustakaan lainnya.',
  },
  {
    icon: Users,
    bg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Untuk Semua',
    desc: 'Siswa, guru, dan seluruh civitas sekolah',
  },
]

export default function Features() {
  return (
    <section id="informasi" className="bg-white py-16" >
      <div className="container-page grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-slate-200">
        {FEATURES.map(({ icon: Icon, bg, iconColor, title, desc }) => (
          <div key={title} className="flex flex-col items-center px-4 text-center">
            <span className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${bg}`}>
              <Icon className={`h-7 w-7 ${iconColor}`} strokeWidth={2} />
            </span>
            <h3 className="text-lg font-bold text-navy-900">{title}</h3>
            <p className="mt-2 max-w-[220px] text-sm text-slate-copy">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
