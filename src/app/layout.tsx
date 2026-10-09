import type { Metadata, Viewport } from "next";
import { Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import { school } from "@/lib/quiz-data";
import { getSiteUrl } from "@/lib/site-url";

const notoSansTc = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto",
  display: "swap",
});

const title = `孩子適合什麼樂器？｜${school.name}${school.campus}`;
const description =
  "給家長的一分鐘探索：看看孩子可能會喜歡爵士鼓、吉他、貝斯、歌唱或流行鋼琴。不是下定論，摸過樂器才知道。";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title,
  description,
  applicationName: `${school.name}${school.campus}`,
  openGraph: {
    title,
    description,
    locale: "zh_TW",
    type: "website",
    siteName: `${school.name}${school.campus}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFF4E8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant" className={`${notoSansTc.variable} ${notoSansTc.className} h-full`}>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
