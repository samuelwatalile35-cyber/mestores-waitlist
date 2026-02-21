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
      setMessage(data?.message || "You’re in. We’ll notify you first.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <main className="min-h-dvh bg-white text-black">
      <div className="mx-auto max-w-md px-5 py-4">

        {/* Header */}
        <header className="flex justify-center pt-2">
          <h2 className="text-[2.75rem] font-black tracking-tight leading-none">
            Mestores
          </h2>
        </header>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-4"
        >
          <h1 className="mt-4 text-4xl font-black leading-[1.05] tracking-tight">
            Shop online,
            <br />
            with certainty.
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-black/70">
            Verified sellers. Real products. Structured delivery.
            No guessing. No gambling.
          </p>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap gap-2">
            {["Verified brands", "Secure handling", "Trusted delivery"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-black/5 px-3 py-1 text-xs font-medium text-black/70"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Main Signup Card */}
        <motion.section
          id="join"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
          className="mt-8 rounded-3xl border border-black/5 bg-black/[0.02] p-6"
        >
          <p className="text-sm font-semibold">
            Get early access to trusted online shopping
          </p>

          <p className="mt-1 text-xs text-black/60">
            Be among the first to shop verified brands on Mestores.
          </p>

          <p className="mt-2 text-xs font-medium text-black/70">
            Used by people who value certainty
          </p>

          <form onSubmit={onSubmit} className="mt-4 flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-black/10 px-3 py-2 text-sm outline-none focus:border-black/30 bg-white"
              required
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {status === "loading" ? "Joining…" : "Access"}
            </button>
          </form>

          {message && (
            <p
              className={`mt-2 text-xs font-semibold ${
                status === "success" ? "text-black" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <p className="mt-2 text-xs text-black/50">
            No spam. No hidden fees. Unsubscribe anytime.
          </p>
        </motion.section>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-black/40">
          © {year} Mestores. Built for trust-first commerce in Zambia.
        </footer>

      </div>
    </main>
  );
}