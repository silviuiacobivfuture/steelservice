import { Outlet } from "@remix-run/react";
import AdminSidebar from "@/components/admin/Sidebar";
import MobileSidebar from "@/components/admin/MobileSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      {/* Mobile header */}
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 lg:hidden">
        <MobileSidebar />
        <div className="flex flex-1 justify-end gap-x-4">
          {/* Add any additional header content here */}
        </div>
      </div>

      {/* Main content */}
      <main className="lg:pl-72">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}