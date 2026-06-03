"use client";

import { LayoutDashboard, PackageSearch, PenTool, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", icon: LayoutDashboard, label: "Overview" },
    { href: "/admin/orders", icon: PackageSearch, label: "Orders" },
    { href: "/admin/quotes", icon: PenTool, label: "Quotes" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
    <aside className="w-64 bg-white border-r border-border hidden md:flex flex-col">
      <div className="h-20 flex items-center px-6 border-b border-border">
        <Link href="/" className="font-bold text-lg flex items-center gap-2">
          <img src="/swanky-logo.png" alt="Swanky Factory" className="h-8 object-contain" />
        </Link>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive 
                  ? "bg-neutral-100 font-medium text-black" 
                  : "hover:bg-neutral-50 text-neutral-600"
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <button 
          onClick={() => {
            document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 px-3 py-2 w-full hover:bg-red-50 text-red-600 rounded-md text-sm transition-colors text-left"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
    
    {/* Mobile Bottom Navigation Bar */}
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border flex items-center justify-around pb-[env(safe-area-inset-bottom)] z-50">
      {links.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;
        
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center gap-1 py-3 px-2 flex-1 ${
              isActive 
                ? "text-black" 
                : "text-neutral-400"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{link.label}</span>
          </Link>
        );
      })}
    </nav>
    </>
  );
}
