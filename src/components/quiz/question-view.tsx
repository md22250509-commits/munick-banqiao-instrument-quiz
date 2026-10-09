import {
  AgeArt,
  MotiveArt,
  MusicArt,
  PersonalityArt,
  PlayArt,
  ReactionArt,
} from "@/components/illustrations";
import { Button } from "@/components/ui/button";
import {
  ageRanges,
  motives,
  musicStyles,
  personalities,
  playStyles,
  questions,
  reactions,
  type Answers,
} from "@/lib/quiz-data";
import { ChevronLeft } from "lucide-react";

const arts = [
  AgeArt,
  PersonalityArt,
  PlayArt,
  ReactionArt,
  MusicArt,
  MotiveArt,
] as const;

type QuestionViewProps = {
  step: number;
  answers: Partial<Answers>;
  onBack: () => void;
  onSelect: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
};

export function QuestionView({
  step,
  answers,
  onBack,
  onSelect,
}: QuestionViewProps) {
  const question = questions[step];
  const Art = arts[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="flex flex-1 flex-col px-5 pb-8 pt-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-lg"
          className="rounded-full text-[#3C2F2A]"
          onClick={onBack}
          aria-label={step === 0 ? "回到首頁" : "上一題"}
        >
          <ChevronLeft className="size-6" />
        </Button>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#C16A4D]">
            {step + 1} / {questions.length}
          </p>
          <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-[#F0D2B8]">
            <div
              className="h-full rounded-full bg-[#E07A5F] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <Art className="mx-auto mt-4 h-auto w-full max-w-sm" />
      <h2 className="mt-4 text-2xl leading-snug font-black text-[#3C2F2A]">
        {question.title}
      </h2>
      <p className="mt-2 text-base leading-7 text-[#6B5348]">{question.caption}</p>

      <div className="mt-4 flex flex-col gap-3">
        {step === 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {ageRanges.map((option) => (
              <ChoiceButton
                key={option.id}
                selected={answers.age === option.id}
                title={option.label}
                hint={option.hint}
                onClick={() => onSelect("age", option.id)}
              />
            ))}
          </div>
        ) : null}

        {step === 1 ? (
          <div className="grid grid-cols-2 gap-3">
            {personalities.map((option) => (
              <ChoiceButton
                key={option.id}
                selected={answers.personality === option.id}
                title={option.label}
                onClick={() => onSelect("personality", option.id)}
              />
            ))}
          </div>
        ) : null}

        {step === 2
          ? playStyles.map((option) => (
              <ChoiceButton
                key={option.id}
                selected={answers.play === option.id}
                title={option.label}
                hint={option.hint}
                onClick={() => onSelect("play", option.id)}
              />
            ))
          : null}

        {step === 3
          ? reactions.map((option) => (
              <ChoiceButton
                key={option.id}
                selected={answers.reaction === option.id}
                title={option.label}
                onClick={() => onSelect("reaction", option.id)}
              />
            ))
          : null}

        {step === 4
          ? musicStyles.map((option) => (
              <ChoiceButton
                key={option.id}
                selected={answers.music === option.id}
                title={option.label}
                onClick={() => onSelect("music", option.id)}
              />
            ))
          : null}

        {step === 5
          ? motives.map((option) => (
              <ChoiceButton
                key={option.id}
                selected={answers.motive === option.id}
                title={option.label}
                hint={option.hint}
                onClick={() => onSelect("motive", option.id)}
              />
            ))
          : null}
      </div>
    </div>
  );
}

function ChoiceButton({
  selected,
  title,
  hint,
  onClick,
}: {
  selected: boolean;
  title: string;
  hint?: string;
  onClick: () => void;
}) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className={`h-auto min-h-16 w-full whitespace-normal rounded-2xl border-2 px-4 py-3 text-left text-lg leading-7 font-bold ${
        selected
          ? "border-[#E07A5F] bg-[#FFE1D6] text-[#3C2F2A]"
          : "border-[#F0D2B8] bg-white text-[#3C2F2A] hover:bg-[#FFF4EA]"
      }`}
    >
      <span className="flex w-full flex-col items-start">
        <span>{title}</span>
        {hint ? (
          <span className="mt-0.5 text-sm font-medium text-[#8A6E62]">{hint}</span>
        ) : null}
      </span>
    </Button>
  );
}
