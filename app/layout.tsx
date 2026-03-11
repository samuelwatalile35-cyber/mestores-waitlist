import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Mestores | Trusted Online Shopping in Zambia",
  description:
    "Join the Mestores waitlist. Shop verified brands with secure handling and trusted delivery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black antialiased">
        {children}
      </body>
    </html>
  );
}

export { playfair };