'use client';

import Link from "next/link";
import { ShoppingBag, PenTool, LayoutDashboard } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/components/LanguageProvider";

export function Navbar() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-20 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 mr-8">
          <img src="/swanky-logo.png" alt="Swanky Factory" className="h-10 object-contain" />
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link
            href="/catalogue"
            className="flex items-center gap-2 transition-colors hover:text-black text-neutral-500"
          >
            <ShoppingBag className="h-4 w-4" />
            {t.nav.catalogue}
          </Link>
          <Link
            href="/devis"
            className="flex items-center gap-2 transition-colors hover:text-black text-neutral-500"
          >
            <PenTool className="h-4 w-4" />
            {t.nav.quote}
          </Link>
          <Link
            href="/usine"
            className="transition-colors hover:text-black text-neutral-500"
          >
            {t.nav.factory}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
          >
            <LayoutDashboard className="h-4 w-4" />
            {t.nav.admin}
          </Link>
        </div>
      </div>
    </header>
  );
}
