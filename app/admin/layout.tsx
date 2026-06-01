import { LayoutDashboard, PackageSearch, PenTool, Settings, LogOut } from "lucide-react";
import Link from "next/link";

import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-[calc(5rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] bg-white border-b border-border flex items-center px-8 gap-4">
          <h1 className="text-xl font-bold">Factory Administration</h1>
        </header>
        <div className="p-8 pb-24 md:pb-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
