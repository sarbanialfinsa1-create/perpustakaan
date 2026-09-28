import { useState } from "react";
import { Menu, X, User } from "lucide-react";

// PERUBAHAN 1: Mengimpor gambar logo dari path yang Anda berikan.
// Pastikan path relatif ini ('../assets/image/logobiru.png') sesuai dengan struktur folder Anda jika komponen Header berada di dalam folder components.
import logoBiru from "../assets/image/logobiru.png";

const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Informasi Perpustakaan", href: "#informasi" },
  { label: "Katalog Buku", href: "#katalog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Beranda");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100">
      <div className="container-page flex h-[72px] items-center justify-between">
        {/* Logo */}
        {/* PERUBAHAN 2: Menambahkan gap-[19px] untuk mengatur jarak logo dengan nama logo persis 19 */}
        <a href="#beranda" className="flex items-center gap-[19px] shrink-0">
          {/* PERUBAHAN 3: Mengganti SVG dengan tag <img> untuk memanggil file logobiru.png */}
          <img
            src={logoBiru}
            alt="Logo Simpus Satak"
            className="h-10 w-auto object-contain" // h-10 menyesuaikan tinggi logo, w-auto menjaga proporsi aslinya
          />

          <div className="leading-tight">
            {/* PERUBAHAN 4: Nama SIMPUS SATAK menggunakan font-['Poppins'] font-bold (Poppins bold), text-[20px] (ukuran 20), dan text-[#0B2960] (warna #0B2960) */}
            <p className="font-['Poppins'] font-bold text-[#0B2960] tracking-wide text-[20px]">
              SIMPUS SATAK
            </p>
            {/* PERUBAHAN 5: Subtitle menggunakan font-['Poppins'] font-normal (Poppins reguler), text-[10px] (ukuran 10), dan text-[#0B2960] (warna #0B2960) */}
            <p className="font-['Poppins'] font-normal text-[10px] text-[#0B2960]">
              Sistem Informasi & Manajemen Perpustakaan
            </p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.label)}
              // PERUBAHAN 6: Menu navigasi menggunakan font-['Inter'] font-bold (Inter bold) dan text-[20px] (ukuran 20).
              // Warna teks dasar diubah ke #0B2960 agar senada, dan warna aktif mengikuti warna tombol (#0B78E3).
              className={`relative text-[20px] font-['Inter'] font-bold pb-1 transition-colors ${
                active === link.label
                  ? "text-[#0B78E3]"
                  : "text-[#0B2960] hover:text-[#0B78E3]"
              }`}
            >
              {link.label}
              {active === link.label && (
                <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-[#0B78E3] rounded-full" />
              )}
            </a>
          ))}
        </nav>

        {/* Login button */}
        {/* PERUBAHAN 7: 
            - w-[133px] h-[40px] (ukuran w=133 h=40)
            - bg-[#0B78E3] (warna tombol #0B78E3)
            - rounded-[12px] (Saya beri estimasi border radius. Jika di Figma tertulis "mixed" (misal: 10px 10px 0 0), Anda bisa menggantinya menjadi class spesifik seperti 'rounded-tl-lg rounded-tr-lg', dsb.)
            - text-[18px] font-['Inter'] font-bold (Login menggunakan font inter bold ukuran 18)
        */}
        <button
          type="button"
          className="hidden md:inline-flex items-center justify-center gap-2 w-[133px] h-[40px] rounded-[12px] bg-[#0B78E3] text-[18px] font-['Inter'] font-bold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
        >
          <User className="h-5 w-5" />
          Login
        </button>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-[#0B2960]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu (opsional, sudah disesuaikan juga warna dan ukurannya) */}
      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="container-page flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setActive(link.label);
                  setOpen(false);
                }}
                className={`rounded-lg px-3 py-2.5 text-[18px] font-['Inter'] font-bold ${
                  active === link.label
                    ? "bg-blue-50 text-[#0B78E3]"
                    : "text-[#0B2960]"
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className="mt-2 inline-flex items-center justify-center gap-2 w-full h-[40px] rounded-[12px] bg-[#0B78E3] text-[18px] font-['Inter'] font-bold text-white"
            >
              <User className="h-5 w-5" />
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
