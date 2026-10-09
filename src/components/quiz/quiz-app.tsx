"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Landing } from "@/components/quiz/landing";
import { QuestionView } from "@/components/quiz/question-view";
import { SiteFooter } from "@/components/quiz/site-footer";
import { questions, type Answers } from "@/lib/quiz-data";
import { resultPath } from "@/lib/result-params";

export function QuizApp() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const selectionSeq = useRef(0);

  const finish = (next: Answers) => {
    router.push(resultPath(next));
  };

  const onSelect = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    const seq = ++selectionSeq.current;
    window.setTimeout(() => {
      if (seq !== selectionSeq.current) return;
      if (step < questions.length - 1) {
        setStep((current) => current + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      finish(next as Answers);
    }, 160);
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-[#FFF4E8]">
      {!started ? (
        <>
          <Landing onStart={() => setStarted(true)} />
          <SiteFooter />
        </>
      ) : (
        <QuestionView
          step={step}
          answers={answers}
          onBack={() => {
            selectionSeq.current += 1;
            if (step === 0) {
              setStarted(false);
              return;
            }
            setStep((current) => current - 1);
          }}
          onSelect={onSelect}
        />
      )}
    </div>
  );
}
