// import { Search, BookOpen } from "lucide-react";
// import { useState } from "react";

// // Import asset gambar dari folder src/assets/image/
// import heroImage from "../assets/image/ASSET CG 2.png";

// export default function Hero() {
//   // State untuk menyimpan input pencarian
//   const [searchQuery, setSearchQuery] = useState("");

//   // Handler untuk aksi pencarian buku
//   const handleSearch = (e) => {
//     e.preventDefault();

//     // Auto-scroll ke section dengan id 'katalog' secara halus (smooth)
//     document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" });

//     // Mengirim event pencarian global
//     window.dispatchEvent(
//       new CustomEvent("simpus-search", { detail: searchQuery }),
//     );
//   };

//   return (
//     <section
//       id="beranda"
//       className="relative flex min-h-screen w-full overflow-hidden font-poppins"
//     >
//       {/* --- BAGIAN 1: GAMBAR LATAR BELAKANG ASLI (PENUH TANPA OVERLAY) --- */}
//       <div className="absolute inset-0 z-0 h-full w-full">
//         <img
//           src={heroImage}
//           alt="Latar Belakang Perpustakaan Simpus Satak"
//           className="h-full w-full object-cover object-center"
//         />
//       </div>

//       {/* --- BAGIAN 2: KONTEN TEKS & FORM PENCARIAN --- */}
//       <div className="container relative z-20 mx-auto flex items-center px-4 py-24 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
//           <div className="lg:col-span-7 xl:col-span-6">
//             {/* Sub-heading / Tagline Atas */}
//             <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#60759A]">
//               SELAMAT DATANG DI
//             </p>

//             {/* Judul Utama */}
//             <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#102E68] sm:text-4xl md:text-5xl lg:text-[3.2rem] lg:leading-tight">
//               SIMPUS SATAK
//             </h1>

//             {/* Sub-judul */}
//             <p className="mt-1 text-lg font-semibold text-[#102E68] sm:text-xl">
//               Sistem Informasi & Manajemen Perpustakaan
//             </p>

//             {/* Deskripsi Singkat */}
//             <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#60759A] sm:text-base">
//               Mudah Mencari, Cepat meminjam, <br className="hidden sm:inline" />
//               dan selalu terhubung dengan koneksi terbaik{" "}
//               <br className="hidden sm:inline" />
//               untuk mendukung ilmu dan masa depan Anda.
//             </p>

//             {/* ========================================================================= */}
//             {/* PERUBAHAN UTAMA: TOMBOL PENCARIAN & KATALOG SESUAI DESAIN DESAIN UI */}
//             {/* ========================================================================= */}
//             <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
//               {/* Form Input / Tombol Cari Buku */}
//               <form
//                 onSubmit={handleSearch}
//                 className="flex w-full items-center sm:w-auto"
//               >
//                 {/* PERUBAHAN 1: Tombol 'Cari Buku' dengan background warna #0B78E3 */}
//                 <button
//                   type="submit"
//                   style={{ backgroundColor: "#0B78E3" }}
//                   className="inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-2.5 text-sm font-medium text-white shadow-md transition hover:opacity-90 active:scale-[0.98] sm:w-auto"
//                 >
//                   <Search className="h-4 w-20 text-white" />
//                   <span>Cari Buku</span>
//                 </button>
//               </form>

//               {/* PERUBAHAN 2: Tombol 'Lihat Katalog' dengan background #FFFFFF dan stroke/border #0B78E3 */}
//               <a
//                 href="#katalog"
//                 style={{ backgroundColor: "#FFFFFF", borderColor: "#0B78E3" }}
//                 className="inline-flex items-center justify-center gap-2.5 rounded-full border px-6 py-2.5 text-sm font-medium shadow-sm transition hover:bg-slate-50 active:scale-[0.98]"
//               >
//                 <BookOpen className="h-4 w-20" style={{ color: "#0B78E3" }} />
//                 <span style={{ color: "#0B78E3" }}>Lihat Katalog</span>
//               </a>
//             </div>
//             {/* ========================================================================= */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { Search, BookOpen } from "lucide-react";
import { useState } from "react";

// Import asset gambar dari folder src/assets/image/
import heroImage from "../assets/image/ASSET CG 2.png";

export default function Hero() {
  // State untuk menyimpan input pencarian
  const [searchQuery, setSearchQuery] = useState("");

  // Handler untuk aksi pencarian buku
  const handleSearch = (e) => {
    e.preventDefault();

    // Auto-scroll ke section dengan id 'katalog' secara halus (smooth)
    document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" });

    // Mengirim event pencarian global
    window.dispatchEvent(
      new CustomEvent("simpus-search", { detail: searchQuery }),
    );
  };

  return (
    <section
      id="beranda"
      className="relative flex min-h-screen w-full overflow-hidden font-poppins"
    >
      {/* --- BAGIAN 1: GAMBAR LATAR BELAKANG ASLI (PENUH TANPA OVERLAY) --- */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <img
          src={heroImage}
          alt="Latar Belakang Perpustakaan Simpus Satak"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* --- BAGIAN 2: KONTEN TEKS & FORM PENCARIAN --- */}
      <div className="container relative z-20 mx-auto flex items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 xl:col-span-7">
            {/* 1. TAGLINE ATAS */}
            {/* Perubahan: text-[20px], font-bold, tracking-[0.25em] (25% letter spacing) */}
            <p className="text-[20px] font-bold uppercase tracking-[0.25em] text-[#60759A]">
              SELAMAT DATANG DI
            </p>

            {/* 2. JUDUL UTAMA */}
            {/* Perubahan: text-[52px], font-bold, tracking-[0.25em] (25% letter spacing), leading-tight */}
            <h1 className="mt-2 text-[52px] font-bold tracking-[0.25em] text-[#102E68] leading-tight">
              SIMPUS SATAK
            </h1>

            {/* 3. SUB-JUDUL */}
            {/* Perubahan: text-[26px], font-semibold, tracking-normal (0% letter spacing) */}
            <p className="mt-1 text-[26px] font-semibold tracking-normal text-[#102E68]">
              Sistem Informasi & Manajemen Perpustakaan
            </p>

            {/* 4. DESKRIPSI SINGKAT */}
            {/* Perubahan: text-[20px], font-semibold, tracking-normal (0% letter spacing) */}
            <p className="mt-4 max-w-2xl text-[20px] font-semibold leading-relaxed tracking-normal text-[#60759A]">
              Mudah Mencari, Cepat meminjam, <br className="hidden sm:inline" />
              dan selalu terhubung dengan koneksi terbaik{" "}
              <br className="hidden sm:inline" />
              untuk mendukung ilmu dan masa depan Anda.
            </p>

            {/* ========================================================================= */}
            {/* TOMBOL PENCARIAN & KATALOG */}
            {/* ========================================================================= */}
            <div className="mt-8 flex flex-col gap-14 sm:flex-row sm:items-center">
              {/* Form Input / Tombol Cari Buku */}
              <form
                onSubmit={handleSearch}
                className="flex w-full items-center sm:w-auto"
              >
                <button
                  type="submit"
                  style={{ backgroundColor: "#0B78E3" }}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-2.5 text-sm font-medium text-white shadow-md transition hover:opacity-90 active:scale-[0.98] sm:w-auto"
                >
                  <Search className="h-4 w-4 text-white" />
                  <span>Cari Buku</span>
                </button>
              </form>

              {/* Tombol 'Lihat Katalog' */}
              <a
                href="#katalog"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#0B78E3" }}
                className="inline-flex items-center justify-center gap-2.5 rounded-full border px-6 py-2.5 text-sm font-medium shadow-sm transition hover:bg-slate-50 active:scale-[0.98]"
              >
                <BookOpen className="h-4 w-4" style={{ color: "#0B78E3" }} />
                <span style={{ color: "#0B78E3" }}>Lihat Katalog</span>
              </a>
            </div>
            {/* ========================================================================= */}
          </div>
        </div>
      </div>
    </section>
  );
}
