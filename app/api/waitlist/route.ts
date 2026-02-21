import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const cleanEmail = String(email || "").trim().toLowerCase();

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.from("waitlist").insert([{ email: cleanEmail }]);

    // If email already exists, treat as success for user experience
    if (error) {
      const msg = (error.message || "").toLowerCase();
      if (msg.includes("duplicate") || msg.includes("unique")) {
        return NextResponse.json({
          ok: true,
          message: "You’re already on the list. We’ll notify you first.",
        });
      }

      return NextResponse.json(
        { ok: false, message: "Could not save your email. Try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Success. You’re on the list. We’ll notify you first.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}