import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navigasi Pindah Ke Atas */}
      <AdminHeader />
      
      {/* Konten Utama Dibawahnya */}
      <main className="container mx-auto">
        <Outlet />
      </main>
    </div>
  );
}