'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { type Locale } from '@/lib/translations';
import { Globe, ChevronDown } from 'lucide-react';

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ar', label: 'العربية', flag: '🇪🇬' },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-black transition-colors px-2 py-1.5 rounded-md hover:bg-neutral-100"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span>{current.flag} {current.code.toUpperCase()}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-white border border-neutral-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => { setLocale(lang.code); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-neutral-50 transition-colors ${
                locale === lang.code ? 'font-bold text-black bg-neutral-50' : 'text-neutral-600'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
              {locale === lang.code && (
                <span className="ml-auto text-xs bg-black text-white px-1.5 py-0.5 rounded">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
