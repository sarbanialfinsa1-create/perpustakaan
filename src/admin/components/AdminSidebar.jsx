import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  ArrowLeftRight,
  Wallet,
  BarChart3,
  Settings,
  Library,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    title: "Koleksi Buku",
    icon: BookOpen,
    path: "/admin/buku",
  },
  {
    title: "Anggota",
    icon: Users,
    path: "/admin/anggota",
  },
  {
    title: "Sirkulasi",
    icon: ArrowLeftRight,
    path: "/admin/sirkulasi",
  },
  {
    title: "Denda",
    icon: Wallet,
    path: "/admin/denda",
  },
  {
    title: "Laporan",
    icon: BarChart3,
    path: "/admin/laporan",
  },
  {
    title: "Pengaturan",
    icon: Settings,
    path: "/admin/pengaturan",
  },
];

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // =========================
  // NAMA PROFIL
  // =========================
  const [profileName, setProfileName] = useState(() => {
    const savedProfile = localStorage.getItem(
      "perpustakaan_profile"
    );

    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);

        return profile.name || "Pustakawan";
      } catch {
        return "Pustakawan";
      }
    }

    return "Pustakawan";
  });

  // =========================
  // UPDATE NAMA SAAT PROFIL BERUBAH
  // =========================
  useEffect(() => {
    const updateProfile = () => {
      const savedProfile = localStorage.getItem(
        "perpustakaan_profile"
      );

      if (savedProfile) {
        try {
          const profile = JSON.parse(savedProfile);

          setProfileName(
            profile.name || "Pustakawan"
          );
        } catch {
          setProfileName("Pustakawan");
        }
      }
    };

    window.addEventListener(
      "profileUpdated",
      updateProfile
    );

    return () => {
      window.removeEventListener(
        "profileUpdated",
        updateProfile
      );
    };
  }, []);

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">

      {/* Logo */}
      <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <img
            src="/src/assets/image/logobiru.png"
            alt="Logo SIMPUS SATAK"
            className="h-full w-full object-contain"
          />
        </div>

        <div>
          <h1 className="text-lg font-bold text-slate-900">
            SIMPUS SATAK
          </h1>

          <p className="text-xs text-slate-500">
            Perpustakaan Sekolah
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Menu Utama
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            item.path === "/admin"
              ? location.pathname === "/admin"
              : location.pathname.startsWith(item.path);

          return (
            <button
              key={item.title}
              onClick={() => navigate(item.path)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${active
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
            >
              <Icon size={19} />

              <span>{item.title}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">
            Login sebagai
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-900">
            {profileName}
          </p>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;