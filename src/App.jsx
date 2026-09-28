import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Landing = lazy(() => import('./pages/Landing.jsx'))

// Admin / Pustakawan
const AdminLayout = lazy(() => import('./admin/components/AdminLayout.jsx'))

const Dashboard = lazy(() => import('./admin/Pages/Dashboard.jsx'))
const Buku = lazy(() => import('./admin/Pages/Buku.jsx'))
const Anggota = lazy(() => import('./admin/Pages/Anggota.jsx'))
const Sirkulasi = lazy(() => import('./admin/Pages/Sirkulasi.jsx'))
const Denda = lazy(() => import('./admin/Pages/Denda.jsx'))
const Laporan = lazy(() => import('./admin/Pages/Laporan.jsx'))
const Pengaturan = lazy(() => import('./admin/Pages/Pengaturan.jsx'))

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Memuat...
        </div>
      }
    >
      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Admin / Pustakawan */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/buku"
          element={
            <AdminLayout>
              <Buku />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/anggota"
          element={
            <AdminLayout>
              <Anggota />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/sirkulasi"
          element={
            <AdminLayout>
              <Sirkulasi />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/denda"
          element={
            <AdminLayout>
              <Denda />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/laporan"
          element={
            <AdminLayout>
              <Laporan />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/pengaturan"
          element={
            <AdminLayout>
              <Pengaturan />
            </AdminLayout>
          }
        />

      </Routes>
    </Suspense>
  )
}