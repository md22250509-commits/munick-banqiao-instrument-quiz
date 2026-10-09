import {
  ageRanges,
  motives,
  musicStyles,
  personalities,
  playStyles,
  reactions,
  type Answers,
} from "./quiz-data";

function isAge(value: string): value is Answers["age"] {
  return ageRanges.some((item) => item.id === value);
}
function isPersonality(value: string): value is Answers["personality"] {
  return personalities.some((item) => item.id === value);
}
function isPlay(value: string): value is Answers["play"] {
  return playStyles.some((item) => item.id === value);
}
function isReaction(value: string): value is Answers["reaction"] {
  return reactions.some((item) => item.id === value);
}
function isMusic(value: string): value is Answers["music"] {
  return musicStyles.some((item) => item.id === value);
}
function isMotive(value: string): value is Answers["motive"] {
  return motives.some((item) => item.id === value);
}

export function answersToSearchParams(answers: Answers): URLSearchParams {
  const params = new URLSearchParams();
  params.set("a", answers.age);
  params.set("p", answers.personality);
  params.set("h", answers.play);
  params.set("r", answers.reaction);
  params.set("m", answers.music);
  params.set("g", answers.motive);
  return params;
}

export function resultPath(answers: Answers): string {
  return `/result?${answersToSearchParams(answers).toString()}`;
}

export function parseResultParams(
  searchParams: Record<string, string | string[] | undefined>,
): Answers | null {
  const read = (key: string) => {
    const value = searchParams[key];
    return Array.isArray(value) ? value[0] : value;
  };

  const age = read("a");
  const personality = read("p");
  const play = read("h");
  const reaction = read("r");
  const music = read("m");
  const motive = read("g");

  if (
    !age ||
    !personality ||
    !play ||
    !reaction ||
    !music ||
    !motive ||
    !isAge(age) ||
    !isPersonality(personality) ||
    !isPlay(play) ||
    !isReaction(reaction) ||
    !isMusic(music) ||
    !isMotive(motive)
  ) {
    return null;
  }

  return { age, personality, play, reaction, music, motive };
}

export function answersSummary(answers: Answers): string {
  const age = ageRanges.find((item) => item.id === answers.age)?.label;
  const personality = personalities.find(
    (item) => item.id === answers.personality,
  )?.label;
  const music = musicStyles.find((item) => item.id === answers.music)?.label;
  return [age, personality, music].filter(Boolean).join(" · ");
}
