// AdminLayout.jsx
import React from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { Outlet, useLocation } from 'react-router-dom'

const AdminLayout = () => {
    const location = useLocation();
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar container: zero width on small screens so it doesn't block content */}
      {!location.pathname.startsWith('/admin/edit') && <><aside className="w-0 md:w-64 bg-white shadow-md fixed h-screen">
        <AdminSidebar />
      </aside></>}

      {/* Main content */}
      <main className={`flex-1 ${location.pathname.startsWith('/admin/edit') ? "ml-0" : "md:ml-64" } overflow-y-auto bg-gray-50`}>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
