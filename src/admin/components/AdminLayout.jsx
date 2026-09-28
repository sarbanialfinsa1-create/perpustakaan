import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">

      <AdminSidebar />

      <div className="ml-64">
        <AdminHeader />

        <main className="p-8">
          {children}
        </main>
      </div>

    </div>
  );
}

export default AdminLayout;