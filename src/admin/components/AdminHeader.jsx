import { useEffect, useState } from "react";
import { Bell, Search } from "lucide-react";

function AdminHeader() {
  // =========================
  // AMBIL NAMA PROFIL
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
  // UPDATE KETIKA PROFIL BERUBAH
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
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-8 backdrop-blur">

      {/* Search */}
      <div className="relative w-96">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Cari buku, anggota, transaksi..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Notification */}
        <button className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
          <Bell size={21} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-5">

          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
            {profileName.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">
              {profileName}
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>

        </div>
      </div>
    </header>
  );
}

export default AdminHeader;