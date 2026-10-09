/**
 * 樂器小探索的題目、計分，以及慕尼克課程報名表的預先填入。
 *
 * 報名表選項文字與 entry ID 來自
 * https://docs.google.com/forms/d/1BVAFuk9MY9ZZFkq0ynzz9_6xviKwglAI82fhyklgKgc/viewform
 * 的 FB_PUBLIC_LOAD_DATA_。送出的選項必須與表單原文完全一致。
 */

export const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSeRqZa40SVj5s6a_JjDCwaH0fMW7F7oGojPHA5u0nNGi75zOA/viewform";

export const FORM_ENTRY = {
  age: "1353476259",
  personality: "935150233",
  reason: "1878769903",
  music: "1949528208",
  course: "1084453381",
} as const;

/** 報名項目的原文。木吉他那題在「guitar」與「8y」之間是兩個空白。 */
export const COURSE_LABEL = {
  acoustic: "木吉他 Acoustic guitar  8y以上",
  electric: "電吉他 Electric guitar 6y以上",
  drums: "爵士鼓 Drum sets 3y以上",
  bass: "貝斯 Bass guitar 8y以上",
  piano: "流行鋼琴(鍵盤) piano & keyboard for pop music 3y以上",
  vocal: "歌唱 Vocal 3y以上",
} as const;

export const LINE_TEACHER_URL = "https://lin.ee/93VDR23";

export const SCHOOL = {
  name: "慕尼克音樂",
  campus: "新北板橋校區",
  address: "新北市板橋區中正路325巷47號1樓",
  addressNote: "國光國小對面",
  phoneDisplay: "0939-239-219",
  phoneTel: "+886939239219",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("新北市板橋區中正路325巷47號1樓"),
} as const;

export type AgeId = "under3" | "3-5" | "6-7" | "8-12" | "13plus";
export type PersonalityId =
  | "lively"
  | "shy"
  | "mature"
  | "childlike"
  | "sincere"
  | "clever";
export type PlayId = "hit" | "sing" | "keys" | "strings";
export type HearId = "beat" | "singalong" | "dance" | "quiet";
export type MusicId = "classical" | "mandopop" | "anime" | "kpop" | "rock";
export type ReasonId = "explore" | "relax";
export type InstrumentId = "drums" | "guitar" | "bass" | "vocal" | "piano";

export type Answers = {
  age: AgeId;
  personality: PersonalityId;
  play: PlayId;
  hear: HearId;
  music: MusicId;
  reason: ReasonId;
};

type Option = {
  id: string;
  label: string;
  hint?: string;
};

export type Question = {
  field: keyof Answers;
  title: string;
  image: string;
  alt: string;
  columns: 1 | 2;
  options: Option[];
};

const AGES: { id: AgeId; label: string; formAge: string; years: number }[] = [
  { id: "under3", label: "還不到 3 歲", formAge: "未滿3歲", years: 2 },
  { id: "3-5", label: "3–5 歲", formAge: "3-5歲", years: 4 },
  { id: "6-7", label: "6–7 歲", formAge: "6-7歲", years: 6 },
  { id: "8-12", label: "8–12 歲", formAge: "8-12歲", years: 10 },
  { id: "13plus", label: "13 歲以上", formAge: "13歲以上", years: 13 },
];

const PERSONALITIES: { id: PersonalityId; label: string; form: string }[] = [
  { id: "lively", label: "活潑大方", form: "活潑大方" },
  { id: "shy", label: "害羞內向", form: "害羞內向" },
  { id: "mature", label: "成熟懂事", form: "成熟懂事" },
  { id: "childlike", label: "童心未泯", form: "童心未泯" },
  { id: "sincere", label: "誠懇務實", form: "誠懇務實" },
  { id: "clever", label: "聰明機智", form: "聰明機智" },
];

const PLAYS: { id: PlayId; label: string; hint: string }[] = [
  { id: "hit", label: "敲敲打打", hint: "鼓、節奏、敲東西" },
  { id: "sing", label: "唱歌", hint: "哼歌、跟著旋律" },
  { id: "keys", label: "按按鍵", hint: "鍵盤、按鈕、一格一格" },
  { id: "strings", label: "撥弦", hint: "吉他、撥來撥去" },
];

const HEARS: { id: HearId; label: string }[] = [
  { id: "beat", label: "跟著打拍子" },
  { id: "singalong", label: "跟著唱" },
  { id: "dance", label: "跳來跳去" },
  { id: "quiet", label: "安靜聽" },
];

const MUSICS: { id: MusicId; label: string; form: string }[] = [
  { id: "classical", label: "古典", form: "古典音樂" },
  {
    id: "mandopop",
    label: "華語流行與獨立樂團",
    form: "華語流行樂語獨立樂團",
  },
  { id: "anime", label: "日系與動漫", form: "日系流行與動漫主題曲" },
  { id: "kpop", label: "Kpop", form: "Kpop 韓國流行音樂" },
  { id: "rock", label: "搖滾與重金屬", form: "搖滾與重金屬" },
];

const REASONS: { id: ReasonId; label: string; hint: string; form: string }[] = [
  {
    id: "explore",
    label: "嘗試多元經驗",
    hint: "想讓孩子多接觸不一樣的事",
    form: "嘗試與累積多元經驗",
  },
  {
    id: "relax",
    label: "興趣與紓壓",
    hint: "因為喜歡，也想有個放心的出口",
    form: "興趣與舒壓",
  },
];

export const QUESTIONS: Question[] = [
  {
    field: "age",
    title: "孩子現在幾歲？",
    image: "/illustrations/q-age.jpg",
    alt: "三個不同身高的孩子，有人拿小鼓、有人拿音符、有人抱著吉他",
    columns: 1,
    options: AGES.map((item) => ({ id: item.id, label: item.label })),
  },
  {
    field: "personality",
    title: "你覺得孩子的個性比較像？",
    image: "/illustrations/q-personality.jpg",
    alt: "同一個孩子揮手打招呼、躲在鼓後面，以及坐著想事情",
    columns: 2,
    options: PERSONALITIES.map((item) => ({ id: item.id, label: item.label })),
  },
  {
    field: "play",
    title: "孩子平時比較喜歡？",
    image: "/illustrations/q-play.jpg",
    alt: "孩子在桌上玩小鼓、麥克風、鍵盤和吉他",
    columns: 1,
    options: PLAYS.map((item) => ({
      id: item.id,
      label: item.label,
      hint: item.hint,
    })),
  },
  {
    field: "hear",
    title: "聽到音樂時，孩子通常會？",
    image: "/illustrations/q-listen.jpg",
    alt: "孩子把耳機掛在脖子上，踏著步子聽歌",
    columns: 2,
    options: HEARS.map((item) => ({ id: item.id, label: item.label })),
  },
  {
    field: "music",
    title: "家裡常聽、孩子也喜歡哪一種？",
    image: "/illustrations/q-music.jpg",
    alt: "小提琴、鋼琴鍵、吉他、小鼓，和窗外的星空",
    columns: 1,
    options: MUSICS.map((item) => ({ id: item.id, label: item.label })),
  },
  {
    field: "reason",
    title: "這次想讓孩子學音樂，比較接近？",
    image: "/illustrations/q-reason.jpg",
    alt: "孩子坐在有植物的房間裡，輕輕摸著鼓，旁邊有吉他和鍵盤",
    columns: 1,
    options: REASONS.map((item) => ({
      id: item.id,
      label: item.label,
      hint: item.hint,
    })),
  },
];

type CourseOption = { form: string; minYears: number };

export const INSTRUMENTS: Record<
  InstrumentId,
  {
    id: InstrumentId;
    name: string;
    blurb: string;
    image: string;
    alt: string;
    courses: CourseOption[];
  }
> = {
  drums: {
    id: "drums",
    name: "爵士鼓",
    blurb: "節奏一出來，整個人就亮了。敲下去的那一下，常常是孩子最開心的時刻。",
    image: "/illustrations/inst-drums.jpg",
    alt: "孩子坐在爵士鼓前面，高舉鼓棒笑著",
    courses: [{ form: COURSE_LABEL.drums, minYears: 3 }],
  },
  guitar: {
    id: "guitar",
    name: "吉他（木吉他／電吉他）",
    blurb:
      "一首歌可以在手裡慢慢長出來。木吉他溫柔，電吉他有勁，兩種都可以先摸摸看。",
    image: "/illustrations/inst-guitar.jpg",
    alt: "孩子抱著木吉他，旁邊靠著一把電吉他",
    courses: [
      { form: COURSE_LABEL.acoustic, minYears: 8 },
      { form: COURSE_LABEL.electric, minYears: 6 },
    ],
  },
  bass: {
    id: "bass",
    name: "Bass 電貝斯",
    blurb: "聲音低調，卻把整首歌撐住。喜歡把事情做穩的孩子，常常會愛上這個角色。",
    image: "/illustrations/inst-bass.jpg",
    alt: "孩子抱著電貝斯，安靜地笑",
    courses: [{ form: COURSE_LABEL.bass, minYears: 8 }],
  },
  vocal: {
    id: "vocal",
    name: "歌唱",
    blurb: "用自己的聲音說故事。不用先會樂器，開口唱，就是開始。",
    image: "/illustrations/inst-vocal.jpg",
    alt: "孩子拿著麥克風開心地唱歌，周圍有音符和愛心",
    courses: [{ form: COURSE_LABEL.vocal, minYears: 3 }],
  },
  piano: {
    id: "piano",
    name: "鋼琴（流行鋼琴）",
    blurb: "一個人也能把一首歌彈完整。按下去就有聲音，很適合邊玩邊找感覺。",
    image: "/illustrations/inst-piano.jpg",
    alt: "孩子坐在彩色鍵盤前，雙手按著琴鍵",
    courses: [{ form: COURSE_LABEL.piano, minYears: 3 }],
  },
};

const INSTRUMENT_IDS = Object.keys(INSTRUMENTS) as InstrumentId[];

const TIE_ORDER: InstrumentId[] = ["piano", "vocal", "guitar", "drums", "bass"];

function byId<T extends { id: string }>(list: T[], id: string): T {
  const found = list.find((item) => item.id === id);
  if (!found) {
    throw new Error(`Unknown id: ${id}`);
  }
  return found;
}

export function ageProfile(id: AgeId) {
  return byId(AGES, id);
}

function add(scores: Record<InstrumentId, number>, partial: Partial<Record<InstrumentId, number>>) {
  for (const id of INSTRUMENT_IDS) {
    scores[id] += partial[id] ?? 0;
  }
}

export function recommend(answers: Answers): InstrumentId[] {
  const scores = {
    drums: 0,
    guitar: 0,
    bass: 0,
    vocal: 0,
    piano: 0,
  };

  const play: Record<PlayId, Partial<Record<InstrumentId, number>>> = {
    hit: { drums: 6, piano: 1 },
    sing: { vocal: 6, piano: 1, guitar: 1 },
    keys: { piano: 6, vocal: 1 },
    strings: { guitar: 5, bass: 4 },
  };
  const hear: Record<HearId, Partial<Record<InstrumentId, number>>> = {
    beat: { drums: 3, bass: 2 },
    singalong: { vocal: 3, piano: 1, guitar: 1 },
    dance: { drums: 2, vocal: 2, guitar: 1 },
    quiet: { piano: 3, guitar: 2, bass: 1 },
  };
  const personality: Record<PersonalityId, Partial<Record<InstrumentId, number>>> = {
    lively: { drums: 2, vocal: 2, guitar: 1 },
    shy: { piano: 2, guitar: 2, bass: 1 },
    mature: { piano: 2, bass: 2, guitar: 1 },
    childlike: { drums: 2, vocal: 2, piano: 1 },
    sincere: { bass: 2, piano: 2, guitar: 1 },
    clever: { piano: 2, guitar: 2, bass: 1, vocal: 1 },
  };
  const music: Record<MusicId, Partial<Record<InstrumentId, number>>> = {
    classical: { piano: 3, guitar: 2, vocal: 1 },
    mandopop: { guitar: 2, vocal: 2, piano: 2 },
    anime: { vocal: 2, piano: 2, guitar: 1 },
    kpop: { vocal: 3, piano: 2, drums: 1 },
    rock: { drums: 3, guitar: 3, bass: 2 },
  };
  const reason: Record<ReasonId, Partial<Record<InstrumentId, number>>> = {
    explore: { drums: 1, bass: 1, guitar: 1 },
    relax: { piano: 2, guitar: 2, vocal: 1 },
  };

  add(scores, play[answers.play]);
  add(scores, hear[answers.hear]);
  add(scores, personality[answers.personality]);
  add(scores, music[answers.music]);
  add(scores, reason[answers.reason]);

  const years = ageProfile(answers.age).years;
  const suggestedStart: Record<InstrumentId, number> = {
    drums: 3,
    vocal: 3,
    piano: 3,
    guitar: 6,
    bass: 8,
  };
  for (const id of INSTRUMENT_IDS) {
    if (years < suggestedStart[id]) {
      scores[id] -= (suggestedStart[id] - years) * 1.5;
    }
  }

  const ranked = [...INSTRUMENT_IDS].sort(
    (a, b) => scores[b] - scores[a] || TIE_ORDER.indexOf(a) - TIE_ORDER.indexOf(b),
  );
  const third = ranked[2];
  const second = ranked[1];
  if (scores[third] >= scores[second] - 2) {
    return ranked.slice(0, 3);
  }
  return ranked.slice(0, 2);
}

/** 年齡還小、但仍然想先讓老師知道的方向，表單上會勾建議年齡較低的那一項。 */
export function coursesFor(picks: InstrumentId[], years: number): string[] {
  const labels: string[] = [];
  for (const id of picks) {
    const courses = INSTRUMENTS[id].courses;
    const eligible = courses.filter((course) => years >= course.minYears);
    const chosen =
      eligible.length > 0
        ? eligible
        : [courses.reduce((lowest, course) => (course.minYears < lowest.minYears ? course : lowest))];
    for (const course of chosen) {
      labels.push(course.form);
    }
  }
  return labels;
}

export function needsAgeNote(picks: InstrumentId[], years: number): boolean {
  return picks.some((id) => {
    const earliest = Math.min(...INSTRUMENTS[id].courses.map((course) => course.minYears));
    return years < earliest;
  });
}

export function buildPrefillUrl(answers: Answers, picks: InstrumentId[]): string {
  const params = new URLSearchParams();
  params.set("usp", "pp_url");
  params.append(`entry.${FORM_ENTRY.age}`, ageProfile(answers.age).formAge);
  params.append(
    `entry.${FORM_ENTRY.personality}`,
    byId(PERSONALITIES, answers.personality).form,
  );
  params.append(`entry.${FORM_ENTRY.reason}`, byId(REASONS, answers.reason).form);
  params.append(`entry.${FORM_ENTRY.music}`, byId(MUSICS, answers.music).form);
  for (const course of coursesFor(picks, ageProfile(answers.age).years)) {
    params.append(`entry.${FORM_ENTRY.course}`, course);
  }
  return `${FORM_ACTION}?${params.toString()}`;
}

const QUERY_KEYS = {
  age: "a",
  personality: "p",
  play: "t",
  hear: "h",
  music: "m",
  reason: "r",
} as const;

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

function isId<T extends { id: string }>(list: T[], value: string | undefined): value is T["id"] {
  return Boolean(value && list.some((item) => item.id === value));
}

export function parseAnswers(
  sp: Record<string, string | string[] | undefined>,
): Answers | null {
  const age = first(sp[QUERY_KEYS.age]);
  const personality = first(sp[QUERY_KEYS.personality]);
  const play = first(sp[QUERY_KEYS.play]);
  const hear = first(sp[QUERY_KEYS.hear]);
  const music = first(sp[QUERY_KEYS.music]);
  const reason = first(sp[QUERY_KEYS.reason]);
  if (
    !isId(AGES, age) ||
    !isId(PERSONALITIES, personality) ||
    !isId(PLAYS, play) ||
    !isId(HEARS, hear) ||
    !isId(MUSICS, music) ||
    !isId(REASONS, reason)
  ) {
    return null;
  }
  return { age, personality, play, hear, music, reason };
}

export function hasQuizParams(sp: Record<string, string | string[] | undefined>): boolean {
  return Object.values(QUERY_KEYS).some((key) => first(sp[key]));
}

export function toQuery(answers: Answers): string {
  const params = new URLSearchParams();
  params.set(QUERY_KEYS.age, answers.age);
  params.set(QUERY_KEYS.personality, answers.personality);
  params.set(QUERY_KEYS.play, answers.play);
  params.set(QUERY_KEYS.hear, answers.hear);
  params.set(QUERY_KEYS.music, answers.music);
  params.set(QUERY_KEYS.reason, answers.reason);
  return `?${params.toString()}`;
}

export function shareText(picks: InstrumentId[]): string {
  const names = picks.map((id) => INSTRUMENTS[id].name).join("、");
  return `孩子可能會喜歡${names}。慕尼克音樂板橋的小探索，摸過樂器才知道。`;
}

export function lineShareUrl(pageUrl: string, picks: InstrumentId[]): string {
  const params = new URLSearchParams({
    url: pageUrl,
    text: shareText(picks),
  });
  return `https://social-plugins.line.me/lineit/share?${params.toString()}`;
}

export function facebookShareUrl(pageUrl: string): string {
  const params = new URLSearchParams({ u: pageUrl });
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
}
