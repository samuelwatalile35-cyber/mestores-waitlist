"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const year = useMemo(() => new Date().getFullYear(), []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setMessage(data?.message || "Could not join. Try again.");
        return;
      }

      setStatus("success");
      setMessage(data?.message || "You're in. We'll notify you first.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <main className="min-h-dvh bg-[#0A0A0A] text-white flex flex-col">

      {/* ── TICKER ── */}
      <div className="overflow-hidden border-b border-white/5 h-8 flex items-center bg-white">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...Array(2)].map((_, i) =>
            ["Verified Brands", "Authentic Products", "Secure Delivery", "Buyer Protection", "Zambia's Trust Platform"].map((item) => (
              <span key={`${i}-${item}`} className="inline-flex items-center gap-4 px-6">
                <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#0A0A0A]">{item}</span>
                <span className="text-[#CCCCCC]">·</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── HERO ── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-[#0A0A0A] px-6 pt-14 pb-12 relative overflow-hidden"
      >
        {/* Decorative circles */}
        <div className="absolute right-[-60px] top-[-60px] w-[260px] h-[260px] rounded-full border border-white/[0.04] pointer-events-none" />
        <div className="absolute right-[-100px] top-[-100px] w-[380px] h-[380px] rounded-full border border-white/[0.025] pointer-events-none" />

        {/* Logo */}
        <div className="mb-10">
          <span className="font-serif text-2xl font-black tracking-tight text-white">Mestores</span>
        </div>

        <p className="text-[10px] font-bold tracking-[3px] uppercase text-white/30 mb-4 flex items-center gap-2">
          <span className="inline-block w-4 h-px bg-white/25" />
          Early Access
        </p>

        <h1 className="font-serif text-[clamp(3rem,10vw,5rem)] font-black leading-[0.93] tracking-[-2px] mb-4">
          Discover<br />
          <em className="not-italic font-bold text-white/45">verified</em><br />
          brands.
        </h1>

        <p className="text-sm text-white/40 leading-relaxed max-w-[300px]">
          Mestores is Zambia's trust-first commerce platform. Every brand is reviewed, approved, and warehoused before you can buy.
        </p>
      </motion.section>

      {/* ── SIGNUP CARD ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        className="mx-4 mb-4 rounded-[4px] overflow-hidden"
      >
        {/* Card header */}
        <div className="bg-[#0A0A0A] border border-white/8 px-5 py-3">
          <p className="text-[10px] font-bold tracking-[2px] uppercase text-white/40">Join the waitlist</p>
        </div>

        {/* Card body */}
        <div className="bg-white px-5 py-5">
          <p className="text-sm font-bold text-[#0A0A0A] mb-1">
            Get early access to trusted online shopping
          </p>
          <p className="text-xs text-[#888888] mb-5 leading-relaxed">
            Be among the first to shop verified brands on Mestores when we launch.
          </p>

          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold tracking-[2px] uppercase text-[#888888]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="border border-[#E8E8E8] rounded-[4px] px-4 py-3 text-sm text-[#0A0A0A] bg-[#F5F4F0] outline-none focus:border-[#0A0A0A] placeholder:text-[#CCCCCC] transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#0A0A0A] text-white text-sm font-bold py-3 rounded-[8px] disabled:opacity-40 transition-opacity"
            >
              {status === "loading" ? "Joining…" : "Get Early Access"}
            </button>
          </form>

          {message && (
            <p className={`mt-3 text-xs font-semibold ${status === "success" ? "text-[#10B981]" : "text-[#EF4444]"}`}>
              {status === "success" ? "✓ " : "✕ "}{message}
            </p>
          )}

          <p className="mt-3 text-[11px] text-[#AAAAAA]">
            No spam. No hidden fees. Unsubscribe anytime.
          </p>
        </div>
      </motion.section>

      {/* ── TRUST BADGES ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mx-4 mb-4 bg-[#0A0A0A] border border-white/[0.06] rounded-[4px] px-5 py-4"
      >
        <p className="text-[10px] font-bold tracking-[2px] uppercase text-white/30 mb-3">Why Mestores</p>
        <div className="flex flex-col gap-2">
          {[
            { label: "Verified Brands", desc: "Every brand is reviewed and approved before listing." },
            { label: "Warehoused Stock", desc: "Products are stored and dispatched by Mestores." },
            { label: "Escrow Payments", desc: "Your money is held until delivery is confirmed." },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 py-2 border-b border-white/[0.05] last:border-0">
              <div className="w-1 h-1 rounded-full bg-white/30 mt-[6px] flex-shrink-0" />
              <div>
                <p className="text-xs font-700 text-white/80 font-bold">{item.label}</p>
                <p className="text-xs text-white/35 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── FOOTER ── */}
      <footer className="mt-auto px-6 py-6 border-t border-white/[0.06]">
        <p className="font-serif text-lg font-black text-white/60 mb-1">Mestores</p>
        <p className="text-[11px] text-white/25 tracking-[1px] uppercase">
          © {year} Mestores · Built for trust-first commerce in Zambia.
        </p>
      </footer>

    </main>
  );
}