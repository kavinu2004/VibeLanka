import { Fraunces, DM_Mono, Familjen_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const familjenGrotesk = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-familjen",
  display: "swap",
});

export const metadata = {
  title: "Vibe Lanka — The bay, tonight.",
  description:
    "A local-first map of where Sri Lanka actually is right now. Live updates direct from the venue. Built by Sri Lanka. For the world.",
  metadataBase: new URL("https://vibelanka.com"),
  openGraph: {
    title: "Vibe Lanka — The bay, tonight.",
    description:
      "Live map of Sri Lanka's south coast. Bars, cafés, community gatherings — updated in real time from the venue.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport = {
  themeColor: "#FAF7F2",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmMono.variable} ${familjenGrotesk.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
