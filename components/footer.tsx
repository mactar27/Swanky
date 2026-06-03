import Link from "next/link";
import { Instagram, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-neutral-200 bg-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Top Section: Logo & Tagline */}
        <div className="mb-12">
          <Link href="/" className="inline-block mb-4">
            <img src="/images.png" alt="Swanky Factory" className="h-10 object-contain" />
          </Link>
          <p className="text-sm text-neutral-500 max-w-sm">
            The premium manufacturer for your streetwear brand.
            <br />
            Quality, precision, and B2B.
          </p>
        </div>

        {/* Middle Section: Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Column 1: Liens Utiles */}
          <div>
            <h4 className="font-bold text-black mb-4 uppercase tracking-wider text-sm">Useful Links</h4>
            <nav className="flex flex-col gap-3 text-sm text-neutral-500">
              <Link href="/catalogue" className="hover:text-black transition-colors">Catalogue</Link>
              <Link href="/devis" className="hover:text-black transition-colors">Custom Quote</Link>
            </nav>
          </div>

          {/* Column 2: Legal */}
          <div>
            <h4 className="font-bold text-black mb-4 uppercase tracking-wider text-sm">Legal</h4>
            <nav className="flex flex-col gap-3 text-sm text-neutral-500">
              <Link href="/cgv" className="hover:text-black transition-colors">Terms of Sale (B2B)</Link>
              <Link href="/faq" className="hover:text-black transition-colors">FAQ & MOQ</Link>
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-bold text-black mb-4 uppercase tracking-wider text-sm">Contact</h4>
            <nav className="flex flex-col gap-3 text-sm text-neutral-500">
              <a href="https://wa.me/201228811446" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-black transition-colors">
                <Phone className="h-4 w-4" /> WhatsApp: +20 12 28811446
              </a>
              <a href="https://www.instagram.com/swankyfactory/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-black transition-colors">
                <Instagram className="h-4 w-4" /> Instagram: @swankyfactory
              </a>
            </nav>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-neutral-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} Swanky Factory. All rights reserved.
          </p>
          <p className="text-xs text-neutral-400 flex items-center gap-1">
            Developed by{" "}
            <a
              href="https://wockytech.xyz"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-black hover:underline"
            >
              WockyTech
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
