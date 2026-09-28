import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">

      <AdminSidebar />

      {/* Pada mobile: ml-0 (tanpa margin)
          Pada layar laptop/desktop (md ke atas): ml-64 (memberi ruang untuk sidebar) */}
      <div className="ml-0 md:ml-64 transition-all duration-300">
        <AdminHeader />

        {/* Padding disesuaikan: p-4 di HP, p-8 di desktop */}
        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>

    </div>
  );
}

export default AdminLayout;