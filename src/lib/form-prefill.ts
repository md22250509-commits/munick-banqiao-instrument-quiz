import {
  ageRanges,
  motives,
  musicStyles,
  personalities,
  type Answers,
  type Instrument,
} from "./quiz-data";

/** Published Google Form id (from the form's viewform page). */
export const FORM_VIEW_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeRqZa40SVj5s6a_JjDCwaH0fMW7F7oGojPHA5u0nNGi75zOA/viewform";

export const formEntries = {
  age: "1353476259",
  personality: "935150233",
  motive: "1878769903",
  music: "1949528208",
  instruments: "1084453381",
} as const;

function append(params: URLSearchParams, entryId: string, value: string) {
  params.append(`entry.${entryId}`, value);
}

export function buildPrefillUrl(answers: Answers, picked: Instrument[]): string {
  const params = new URLSearchParams();
  params.set("usp", "pp_url");

  const age = ageRanges.find((item) => item.id === answers.age);
  const personality = personalities.find(
    (item) => item.id === answers.personality,
  );
  const music = musicStyles.find((item) => item.id === answers.music);
  const motive = motives.find((item) => item.id === answers.motive);

  if (age) append(params, formEntries.age, age.formValue);
  if (personality) append(params, formEntries.personality, personality.formValue);
  if (motive) append(params, formEntries.motive, motive.formValue);
  if (music) append(params, formEntries.music, music.formValue);
  for (const instrument of picked) {
    append(params, formEntries.instruments, instrument.formValue);
  }

  return `${FORM_VIEW_URL}?${params.toString()}`;
}
