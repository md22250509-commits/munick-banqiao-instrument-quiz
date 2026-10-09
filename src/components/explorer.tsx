"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ClassClip } from "@/components/class-clip";
import { SiteFooter } from "@/components/site-footer";
import { classClips } from "@/lib/clips";
import { cn } from "@/lib/utils";
import {
  INSTRUMENTS,
  LINE_TEACHER_URL,
  QUESTIONS,
  SCHOOL,
  ageProfile,
  buildPrefillUrl,
  facebookShareUrl,
  hasQuizParams,
  lineShareUrl,
  needsAgeNote,
  parseAnswers,
  recommend,
  toQuery,
  type Answers,
} from "@/lib/quiz";

export function Explorer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const query = searchParams.toString();
  const fromUrl = parseAnswers(params);
  const brokenLink = !fromUrl && hasQuizParams(params);

  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<Partial<Answers>>({});
  const [pending, setPending] = useState<string | null>(null);
  const lock = useRef(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [query, stepIndex, started]);

  if (fromUrl) {
    return (
      <Result
        answers={fromUrl}
        onAgain={() => {
          setStarted(false);
          setStepIndex(0);
          setDraft({});
          setPending(null);
          router.push("/");
        }}
      />
    );
  }

  if (!started) {
    return (
      <Shell>
        <Intro brokenLink={brokenLink} onStart={() => setStarted(true)} />
      </Shell>
    );
  }

  const question = QUESTIONS[stepIndex];
  const selected = pending ?? draft[question.field];

  function choose(id: string) {
    if (lock.current) {
      return;
    }
    const next = { ...draft, [question.field]: id };
    setDraft(next);
    setPending(id);
    const isLast = stepIndex === QUESTIONS.length - 1;
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220;
    lock.current = true;
    window.setTimeout(() => {
      if (isLast && isComplete(next)) {
        router.push(toQuery(next));
      } else if (!isLast) {
        setStepIndex((index) => index + 1);
      }
      setPending(null);
      lock.current = false;
    }, delay);
  }

  return (
    <Shell>
      <div className="mt-4">
        <Button
          type="button"
          variant="ghost"
          className="h-11 px-2 text-base font-bold text-[#7A645B]"
          onClick={() => {
            if (stepIndex === 0) {
              setStarted(false);
              return;
            }
            setPending(null);
            setStepIndex((index) => index - 1);
          }}
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
          上一題
        </Button>
        <p className="mt-2 text-base font-bold text-[#E15B48]">
          第 {stepIndex + 1} 題，共 {QUESTIONS.length} 題
        </p>
        <div
          className="mt-2 flex gap-1.5"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={QUESTIONS.length}
          aria-valuenow={stepIndex + 1}
          aria-label="作答進度"
        >
          {QUESTIONS.map((item, index) => (
            <span
              key={item.field}
              className={cn(
                "h-2 flex-1 rounded-full",
                index <= stepIndex ? "bg-[#E15B48]" : "bg-[#F0D9C8]",
              )}
            />
          ))}
        </div>
        <figure className="relative mt-4 aspect-[5/3] overflow-hidden rounded-[1.75rem] bg-[#F6E4D2]">
          <Image
            src={question.image}
            alt={question.alt}
            fill
            priority={stepIndex === 0}
            sizes="(max-width: 32rem) 100vw, 32rem"
            className="object-cover"
          />
        </figure>
        <h1 className="mt-4 text-[1.75rem] leading-snug font-black">{question.title}</h1>
        <p className="mt-1 text-lg text-[#7A645B]">選最接近的就好。</p>
        <div
          className={cn(
            "mt-4 grid gap-3",
            question.columns === 2 ? "grid-cols-2" : "grid-cols-1",
          )}
        >
          {question.options.map((option) => {
            const active = selected === option.id;
            return (
              <Button
                key={option.id}
                type="button"
                variant="outline"
                aria-pressed={active}
                onClick={() => choose(option.id)}
                className={cn(
                  "h-auto min-h-16 w-full justify-start rounded-3xl px-4 py-3 text-left whitespace-normal",
                  active && "border-primary bg-[#FFF1D6] ring-2 ring-primary",
                )}
              >
                <span className="flex flex-col items-start gap-0.5">
                  <span className="text-xl leading-snug font-black">{option.label}</span>
                  {option.hint ? (
                    <span className="text-base font-medium text-[#7A645B]">{option.hint}</span>
                  ) : null}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}

function Intro({
  brokenLink,
  onStart,
}: {
  brokenLink: boolean;
  onStart: () => void;
}) {
  return (
    <div className="mt-5">
      {brokenLink ? (
        <p className="mb-4 rounded-2xl bg-[#FFF1D6] px-4 py-3 text-lg leading-relaxed" role="status">
          這份連結少了一點內容，我們從頭再看一次。
        </p>
      ) : null}
      <figure className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] bg-[#F6E4D2]">
        <Image
          src="/illustrations/hero-room.jpg"
          alt="溫暖的音樂教室，有爵士鼓、木吉他、電吉他、貝斯、麥克風和鍵盤"
          fill
          priority
          sizes="(max-width: 32rem) 100vw, 32rem"
          className="object-cover"
        />
      </figure>
      <h1 className="mt-5 text-[2rem] leading-tight font-black">孩子適合什麼樂器？</h1>
      <p className="mt-3 text-lg leading-relaxed">
        不是幫孩子下定論。六個小問題，大約一分鐘，先找找他可能玩得開心的方向。
      </p>
      <Button
        type="button"
        className="mt-6 h-16 w-full rounded-full text-xl font-black"
        onClick={onStart}
      >
        開始看看
      </Button>
    </div>
  );
}

function Result({
  answers,
  onAgain,
}: {
  answers: Answers;
  onAgain: () => void;
}) {
  const picks = recommend(answers);
  const formUrl = buildPrefillUrl(answers, picks);
  const showAgeNote = needsAgeNote(picks, ageProfile(answers.age).years);

  return (
    <Shell>
      <div className="mt-5">
        <p className="text-base font-bold text-[#E15B48]">探索結果</p>
        <h1 className="mt-1 text-[2rem] leading-tight font-black">你家孩子可能會喜歡</h1>
        <ul className="mt-5 flex flex-col gap-5">
          {picks.map((id) => {
            const instrument = INSTRUMENTS[id];
            return (
              <li key={id} className="rounded-[1.75rem] bg-white p-4 shadow-sm ring-1 ring-[#F0D9C8]">
                <figure className="relative aspect-[5/3] overflow-hidden rounded-2xl bg-[#F6E4D2]">
                  <Image
                    src={instrument.image}
                    alt={instrument.alt}
                    fill
                    sizes="(max-width: 32rem) 100vw, 32rem"
                    className="object-cover"
                  />
                </figure>
                <h2 className="mt-4 text-2xl font-black">{instrument.name}</h2>
                <p className="mt-2 text-lg leading-relaxed">{instrument.blurb}</p>
                <div className="mt-4">
                  <ClassClip
                    src={classClips[id]}
                    poster={instrument.image}
                    label={instrument.name}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 rounded-[1.75rem] bg-[#FFF1D6] px-5 py-4 text-lg leading-relaxed font-medium">
          孩子真正的興趣，摸過樂器才知道。歡迎預約課程，老師會先讓他試這幾種。
        </p>
        {showAgeNote ? (
          <p className="mt-3 text-base leading-relaxed text-[#7A645B]">
            報名表上有的課寫了建議年齡。老師會先看孩子的狀況，再一起決定怎麼試。
          </p>
        ) : null}
        <div className="mt-5 flex flex-col gap-3">
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-16 w-full rounded-full text-xl font-black shadow-[0_10px_24px_rgba(225,91,72,0.28)]",
            )}
          >
            預約課程
          </a>
          <p className="text-center text-base leading-relaxed text-[#7A645B]">
            性格、喜歡的音樂、想學的原因，還有想先試的樂器，已經帶進報名表。姓名和電話再補上就好。
          </p>
          <a
            href={LINE_TEACHER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-14 w-full rounded-full border-[#06C755] bg-white text-lg font-black text-[#128A3E]",
            )}
          >
            用 LINE 問老師
          </a>
        </div>
        <div className="mt-8">
          <p className="text-lg font-black">把結果傳給家人</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-14 rounded-full bg-[#06C755] text-base font-black text-white hover:bg-[#05b34c]"
              onClick={() => {
                window.open(lineShareUrl(window.location.href, picks), "_blank", "noopener,noreferrer");
              }}
            >
              分享到 LINE
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-14 rounded-full bg-[#1877F2] text-base font-black text-white hover:bg-[#166fe0]"
              onClick={() => {
                window.open(facebookShareUrl(window.location.href), "_blank", "noopener,noreferrer");
              }}
            >
              分享到 FB
            </Button>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="mt-4 h-12 w-full text-lg font-bold text-[#7A645B]"
          onClick={onAgain}
        >
          再看一次
        </Button>
        <p className="mt-2 text-center text-base leading-relaxed text-[#7A645B]">
          這個小探索只留在你的手機上，我們不會在這裡留下姓名或電話。
        </p>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
      <header>
        <p className="text-sm font-black tracking-wide text-[#E15B48]">{SCHOOL.name}</p>
        <p className="text-base font-medium text-[#7A645B]">{SCHOOL.campus}</p>
      </header>
      <div>{children}</div>
      <SiteFooter />
    </main>
  );
}

function isComplete(draft: Partial<Answers>): draft is Answers {
  return QUESTIONS.every((question) => Boolean(draft[question.field]));
}
