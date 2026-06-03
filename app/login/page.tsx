"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.href = "/admin";
      } else {
        setError(true);
        setLoading(false);
      }
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <ScrollReveal delay={0} className="w-full max-w-md">
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <img src="/swanky-logo.png" alt="Swanky Factory" className="h-10 object-contain" />
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-neutral-500 text-sm mt-2">Protected industrial area. Authorized personnel only.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1 flex items-center gap-2">
                <Lock className="h-4 w-4" /> Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full h-11 px-4 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-black ${
                  error ? "border-red-500 bg-red-50" : "border-neutral-300"
                }`}
                required
              />
              {error && <p className="text-red-500 text-xs mt-2">Incorrect password.</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-black text-white font-semibold rounded-md hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center gap-1 mt-6">
          <p className="text-center text-xs text-neutral-400">
            &copy; {new Date().getFullYear()} Swanky Factory. All rights reserved.
          </p>
          <p className="text-center text-xs text-neutral-400 flex items-center justify-center gap-1">
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
      </ScrollReveal>
    </div>
  );
}
