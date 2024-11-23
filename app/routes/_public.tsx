import { Outlet } from "@remix-run/react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/Footer";

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}