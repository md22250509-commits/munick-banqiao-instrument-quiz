import type { Metadata, Viewport } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
  variable: "--font-noto",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:43123";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "孩子適合什麼樂器？｜慕尼克音樂板橋",
    template: "%s",
  },
  description:
    "八個小問題，大約一分鐘。幫家長找找孩子可能會喜歡的樂器，再預約慕尼克音樂新北板橋校區的課程。",
  openGraph: {
    siteName: "慕尼克音樂 · 新北板橋校區",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "/illustrations/hero-room.jpg",
        width: 960,
        height: 540,
        alt: "慕尼克音樂板橋的教室，有爵士鼓、木吉他、電吉他、貝斯、麥克風和鍵盤",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFF6EC",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant" className={`${noto.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
