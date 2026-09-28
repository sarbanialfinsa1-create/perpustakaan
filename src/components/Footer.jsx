// import { Instagram, Facebook, Mail } from "lucide-react";
// export default function Footer() {
//   return (
//     <footer id="informasi" className="bg-navy-900 py-10 text-white">
//       <div className="container-page flex flex-col items-center justify-between gap-6 sm:flex-row">
//         <div className="flex items-center gap-4">
//           <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10">
//             <svg viewBox="0 0 40 40" className="h-6 w-6" aria-hidden="true">
//               <path
//                 d="M8 30V10c0-1.2 1-2 2-2h9v24H10c-1 0-2-.8-2-2z"
//                 fill="#14B8A6"
//               />
//               <path
//                 d="M32 30V10c0-1.2-1-2-2-2h-9v24h9c1 0 2-.8 2-2z"
//                 fill="#3B82D6"
//               />
//             </svg>
//           </span>
//           <div>
//             <p className="font-extrabold tracking-wide">SIMPUS SATAK</p>
//             <p className="text-xs text-white/70">
//               Sistem Informasi & Manajemen Perpustakaan
//             </p>
//           </div>
//         </div>

//         <p className="hidden max-w-xs text-center text-sm italic text-white/70 sm:block">
//           Membaca hari ini, memperluas masa depan.
//         </p>

//         <div className="flex items-center gap-4">
//           <SocialIcon href="#" label="Instagram">
//             <Instagram className="h-4 w-4" />
//           </SocialIcon>
//           <SocialIcon href="#" label="Facebook">
//             <Facebook className="h-4 w-4" />
//           </SocialIcon>
//           <SocialIcon href="mailto:info@simpus-satak.sch.id" label="Email">
//             <Mail className="h-4 w-4" />
//           </SocialIcon>
//         </div>
//       </div>

//       <div className="container-page mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/50">
//         © {new Date().getFullYear()} SIMPUS SATAK. Seluruh hak cipta dilindungi.
//       </div>
//     </footer>
//   );
// }

// function SocialIcon({ href, label, children }) {
//   return (
//     <a
//       href={href}
//       aria-label={label}
//       className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
//     >
//       {children}
//     </a>
//   );
// }

import { Instagram, Facebook, Mail } from "lucide-react";

// Import logo dari folder assets
import logoBiru from "../assets/image/logobiru.png";

export default function Footer() {
  return (
    <footer
      id="informasi"
      className="bg-navy-900 py-10 text-white font-poppins"
    >
      <div className="container-page flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-4">
          {/* BAGIAN LOGO (Diubah menjadi w-[112px] dan h-[68px]) */}
          <div className="flex h-[68px] w-[112px] items-center justify-center overflow-hidden">
            <img
              src={logoBiru}
              alt="Logo SIMPUS SATAK"
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            {/* Judul Logo: Poppins Bold, Ukuran 20px, Warna #FFFFFF */}
            <p className="text-[20px] font-bold text-[#FFFFFF] leading-tight">
              SIMPUS SATAK
            </p>

            {/* Sub-judul: Poppins Regular, Ukuran 10px, Warna #FFFFFF */}
            <p className="text-[10px] font-normal text-[#FFFFFF] leading-tight mt-1">
              Sistem Informasi & Manajemen Perpustakaan
            </p>
          </div>
        </div>

        <p className="hidden max-w-xs text-center text-sm italic text-white/70 sm:block">
          Membaca hari ini, memperluas masa depan.
        </p>

        <div className="flex items-center gap-4">
          <SocialIcon href="#" label="Instagram">
            <Instagram className="h-4 w-4" />
          </SocialIcon>
          <SocialIcon href="#" label="Facebook">
            <Facebook className="h-4 w-4" />
          </SocialIcon>
          <SocialIcon href="mailto:info@simpus-satak.sch.id" label="Email">
            <Mail className="h-4 w-4" />
          </SocialIcon>
        </div>
      </div>

      <div className="container-page mt-8 border-t border-white/10 pt-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} SIMPUS SATAK. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
    >
      {children}
    </a>
  );
}
