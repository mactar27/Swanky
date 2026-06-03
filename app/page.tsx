'use client';

import Link from "next/link";
import { ArrowRight, Package, PenTool, TrendingDown, Star } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/components/LanguageProvider";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      
      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative flex flex-col items-center justify-center min-h-[90vh] text-center px-4 overflow-hidden bg-black text-white">
          
          {/* 1. Background Video */}
          <video 
            src="/swanky.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-35 z-0"
          />

          {/* 2. Foreground Content */}
          <div className="relative z-10 flex flex-col items-center">
            
            {/* Logo */}
            <div className="animate-hero-logo mb-10 w-[260px] md:w-[400px] lg:w-[480px]">
              <img 
                src="/swanky-logo.png" 
                alt="Swanky Factory Logo" 
                className="w-full h-auto object-contain invert drop-shadow-2xl"
              />
            </div>

            {/* Tagline */}
            <h1 className="animate-hero-tagline text-sm md:text-base uppercase tracking-[0.3em] text-neutral-300 max-w-2xl mb-12 drop-shadow-lg">
              {t.hero.tagline}
            </h1>

            {/* CTA buttons */}
            <div className="animate-hero-cta flex flex-col sm:flex-row gap-4">
              <Link href="/catalogue" className="px-8 py-3.5 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-neutral-200 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] hover:tracking-[0.15em]">
                {t.hero.viewCatalog}
              </Link>
              <Link href="/devis" className="px-8 py-3.5 border border-white text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:tracking-[0.15em] bg-black/20 backdrop-blur-sm">
                {t.hero.createQuote}
              </Link>
            </div>

          </div>
        </section>

        {/* ── FEATURES — Scroll Reveal (staggered) ── */}
        <section className="py-20 bg-neutral-50 border-y border-neutral-200">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-3">

              <ScrollReveal delay={0}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-black text-white rounded-full">
                    <Package className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">{t.features.blanks}</h3>
                  <p className="text-neutral-600">{t.features.blanksDesc}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-black text-white rounded-full">
                    <PenTool className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">{t.features.customization}</h3>
                  <p className="text-neutral-600">{t.features.customizationDesc}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-black text-white rounded-full">
                    <TrendingDown className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">{t.features.pricing}</h3>
                  <p className="text-neutral-600">{t.features.pricingDesc}</p>
                </div>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* ── BEST SELLERS — Scroll Reveal ── */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollReveal>
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight">{t.bestSellers.title}</h2>
                  <p className="text-neutral-500 mt-2">{t.bestSellers.subtitle}</p>
                </div>
                <Link href="/catalogue" className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-black/70">
                  {t.bestSellers.viewAll} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { ...t.bestSellers.products[0], img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=600&h=800" },
                { ...t.bestSellers.products[1], img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600&h=800" },
                { ...t.bestSellers.products[2], img: "https://images.unsplash.com/photo-1489987707023-afc82478163a?auto=format&fit=crop&q=80&w=600&h=800" },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 120}>
                  <div className="group relative rounded-xl border border-neutral-200 bg-white text-black overflow-hidden hover:border-black/50 hover:scale-[1.02] transition-all duration-300">
                    <div className="aspect-[3/4] w-full bg-neutral-100 relative overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-neutral-400 group-hover:text-black text-sm mt-1 transition-colors duration-300">{item.price}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF — Scroll Reveal ── */}
        <section className="py-24 bg-neutral-50 text-black border-t border-neutral-200 text-center">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollReveal>
              <h2 className="text-3xl font-bold tracking-tight mb-12">{t.social.title}</h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 mb-16">
                <div className="text-2xl font-black uppercase tracking-widest">Aesthetix</div>
                <div className="text-2xl font-black uppercase tracking-widest">Lumina</div>
                <div className="text-2xl font-black uppercase tracking-widest">Noir.</div>
                <div className="text-2xl font-black uppercase tracking-widest">VZNRY</div>
              </div>
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-3 text-left">
              {t.social.reviews.map((review, i) => (
                <ScrollReveal key={i} delay={i * 150}>
                  <div className="bg-white border border-neutral-200 p-6 rounded-xl shadow-sm h-full">
                    <div className="flex gap-1 mb-4 text-black">
                      {[...Array(5)].map((_, j) => <Star key={j} fill="currentColor" className="w-5 h-5" />)}
                    </div>
                    <p className="text-neutral-700 italic mb-4">&quot;{review.quote}&quot;</p>
                    <p className="font-medium text-black">— {review.author}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
