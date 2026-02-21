import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mestores | Trusted Online Shopping in Zambia",
  description:
    "Join the Mestores waitlist. Shop verified brands with secure handling and trusted delivery.",
  keywords: [
    "Mestores",
    "Online shopping Zambia",
    "Ecommerce Zambia",
    "Trusted online shopping",
    "Buy online Zambia",
  ],
  openGraph: {
    title: "Mestores | Trusted Online Shopping",
    description:
      "Join the Mestores waitlist and shop with certainty in Zambia.",
    url: "https://mestores.online",
    siteName: "Mestores",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Mestores",
      },
    ],
    locale: "en_ZM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mestores | Trusted Online Shopping",
    description:
      "Join the Mestores waitlist and shop with confidence in Zambia.",
    images: ["/images/logo.png"],
  },
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