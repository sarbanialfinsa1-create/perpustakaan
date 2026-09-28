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
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 pl-16 pr-4 md:px-8 backdrop-blur gap-2 md:gap-4">

      {/* Search */}
      <div className="relative w-full max-w-[200px] sm:max-w-xs md:w-96">
        <Search
          size={18}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Cari..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 sm:py-3 pl-9 sm:pl-11 pr-3 text-xs sm:text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-5">

        {/* Notification */}
        <button className="relative rounded-xl p-2 sm:p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
          <Bell size={21} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-2 sm:pl-5">

          {/* Avatar */}
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700 text-sm sm:text-base">
            {profileName.charAt(0).toUpperCase()}
          </div>

          <div className="hidden sm:block">
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