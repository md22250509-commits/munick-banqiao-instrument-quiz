import type { Metadata } from "next";
import { Suspense } from "react";
import { Explorer } from "@/components/explorer";
import { INSTRUMENTS, parseAnswers, recommend } from "@/lib/quiz";

export async function generateMetadata({
  searchParams,
}: PageProps<"/">): Promise<Metadata> {
  const answers = parseAnswers(await searchParams);
  if (!answers) {
    return {
      title: "孩子適合什麼樂器？｜慕尼克音樂板橋",
      description:
        "六個小問題，大約一分鐘。幫家長找找孩子可能會喜歡的樂器，再預約慕尼克音樂新北板橋校區的課程。",
    };
  }
  const names = recommend(answers).map((id) => INSTRUMENTS[id].name);
  const title = `可能會喜歡${names.join("、")}｜慕尼克音樂板橋`;
  const description = `你家孩子可能會喜歡${names.join("、")}。孩子真正的興趣，摸過樂器才知道。歡迎預約板橋校區的課程。`;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<Opening />}>
      <Explorer />
    </Suspense>
  );
}

function Opening() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg items-center justify-center px-6">
      <p className="text-2xl font-bold text-[#3A2A24]">正在打開小探索…</p>
    </main>
  );
}
