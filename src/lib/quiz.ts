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

export type AgeId = "pre" | "g1" | "g23" | "g46" | "junior";
export type WishId = "self" | "family";
export type PersonalityId =
  | "lively"
  | "shy"
  | "mature"
  | "childlike"
  | "sincere"
  | "clever";
export type HearId = "beat" | "singalong" | "dance" | "quiet";
export type MusicId = "classical" | "mandopop" | "anime" | "kpop" | "rock";
export type ReasonId = "explore" | "relax";
export type InstrumentId = "drums" | "piano" | "vocal" | "acoustic" | "bass" | "electric";
export type StyleId = "energy" | "spatial" | "expressive" | "steady" | "cool";

export type Answers = {
  age: AgeId;
  personality: PersonalityId[];
  hear: HearId[];
  music: MusicId[];
  reason: ReasonId[];
  wish: WishId[];
  style: StyleId[];
};

export const DRUMS_NOTE =
  "其實我們覺得每個孩子都很適合從爵士鼓開始，因為一切都從節奏開始。";

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
  multiple: boolean;
  options: Option[];
};

const AGES: {
  id: AgeId;
  label: string;
  formAge: string;
  years: number;
  grade: number;
}[] = [
  { id: "pre", label: "還沒上小學", formAge: "未上小學", years: 5, grade: 0 },
  { id: "g1", label: "一年級", formAge: "一年級", years: 7, grade: 1 },
  { id: "g23", label: "二、三年級", formAge: "二、三年級", years: 9, grade: 2 },
  { id: "g46", label: "四年級到六年級", formAge: "四年級到六年級", years: 11, grade: 4 },
  { id: "junior", label: "國中以上", formAge: "國中以上", years: 13, grade: 7 },
];

const STRING_OBSERVATION =
  "建議二、三年級以上，最小大概一年級。孩子要很有想法、很有主見，是真的自己想彈。";

export const STYLES: {
  id: StyleId;
  label: string;
  hint: string;
  daily: string;
  fits: InstrumentId[];
  analysis: string;
}[] = [
  {
    id: "energy",
    label: "動態與肢體能量型",
    hint: "體力旺盛、手腳停不下來、喜歡跑跳與球類運動",
    daily: "體力旺盛、手腳停不下來、喜歡跑跳與球類運動。",
    fits: ["drums"],
    analysis:
      "這類孩子需要具備即時物理反饋、高能量釋放的管道。爵士鼓講求四肢協調與大肌肉帶動小肌肉的節奏感，不需要先背大量音符就能透過「打擊與發聲」立刻獲得強烈正向回饋，最能接住精力充沛的孩子。",
  },
  {
    id: "spatial",
    label: "空間邏輯與建構型",
    hint: "喜歡樂高、積木、拼圖，在意細節與對稱",
    daily: "喜歡拼樂高、積木、拼圖，著迷於機械結構、軌道車，或是畫畫時很在意細節與對稱。",
    fits: ["piano"],
    analysis:
      "鍵盤樂器在視覺上是線性且邏輯極為對稱的（白鍵與黑鍵的高低音排列清晰可見）。這類孩子善於理解空間分佈與規則，鋼琴的雙手配合、多聲部結構與樂理視覺化，會讓他們像在「組裝結構」一樣享受建構音樂的樂趣。",
  },
  {
    id: "expressive",
    label: "表達欲與情緒抒發型",
    hint: "說話表情豐富、喜歡模仿台詞或角色扮演",
    daily: "說話聲音表情豐富、喜歡模仿台詞、情感細膩或享受角色扮演。",
    fits: ["vocal", "acoustic"],
    analysis:
      "這類孩子習慣把「自己」當作共鳴箱來傳遞感受。人聲是最直接的抒發，而弦樂彈唱（如好入門的烏克麗麗或木吉他）能提供自彈自唱的完整感，樂器直接抱在懷裡產生共鳴，容易讓他們把情緒直接轉化為音樂表達。",
  },
  {
    id: "steady",
    label: "團隊協作與沉穩觀察型",
    hint: "善於傾聽、不搶風頭，做事專注沉穩",
    daily: "善於傾聽、在團體中不搶風頭但不可或缺、做事專注沉穩",
    fits: ["bass"],
    analysis:
      "貝斯與低音弦樂器是樂曲的骨幹，負責黏合鼓的節奏與旋律的和聲。心思細膩、懂得在背後支撐大局、享受「低調卻掌控全場氣氛」的孩子，往往能在低音樂器中找到極大的安全感與自我價值。",
  },
  {
    id: "cool",
    label: "帥氣個性與自我展現型",
    hint: "喜歡動漫熱血歌，享受被注目和酷感",
    daily: "喜歡動漫熱血主題曲、喜歡展現個人風格、享受被注目、對有「酷感」的事物特別著迷。",
    fits: ["electric"],
    analysis:
      "電吉他音色變化極多（破音、效果器變化多元），視覺張力與 Solo 表現力極強。對自我風格鮮明、需要舞台感與酷炫氛圍的孩子來說，電吉他的帥氣度與即興空間能帶來無可取代的吸引力。",
  },
];

const WISHES: { id: WishId; label: string; hint: string }[] = [
  {
    id: "self",
    label: "孩子自己主動想學",
    hint: "是他開口說想彈、想唱",
  },
  {
    id: "family",
    label: "家長想讓他試試看",
    hint: "我們覺得可以先接觸看看",
  },
];

const PERSONALITIES: { id: PersonalityId; label: string; form: string }[] = [
  { id: "lively", label: "活潑大方", form: "活潑大方" },
  { id: "shy", label: "害羞內向", form: "害羞內向" },
  { id: "mature", label: "成熟懂事", form: "成熟懂事" },
  { id: "childlike", label: "童心未泯", form: "童心未泯" },
  { id: "sincere", label: "誠懇務實", form: "誠懇務實" },
  { id: "clever", label: "聰明機智", form: "聰明機智" },
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
    title: "孩子現在幾年級？",
    image: "/illustrations/q-age.jpg",
    alt: "三個不同身高的孩子，有人拿小鼓、有人拿音符、有人抱著吉他",
    columns: 1,
    multiple: false,
    options: AGES.map((item) => ({ id: item.id, label: item.label })),
  },
  {
    field: "personality",
    title: "你覺得孩子的個性比較像？",
    image: "/illustrations/q-personality.jpg",
    alt: "同一個孩子揮手打招呼、躲在鼓後面，以及坐著想事情",
    columns: 2,
    multiple: true,
    options: PERSONALITIES.map((item) => ({ id: item.id, label: item.label })),
  },
  {
    field: "style",
    title: "孩子平常比較像哪一種？",
    image: "/illustrations/q-personality.jpg",
    alt: "孩子在跑跳、拼積木、唱歌，以及安靜看著大家",
    columns: 1,
    multiple: true,
    options: STYLES.map((item) => ({
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
    multiple: true,
    options: HEARS.map((item) => ({ id: item.id, label: item.label })),
  },
  {
    field: "music",
    title: "家裡常聽、孩子也喜歡哪一種？",
    image: "/illustrations/q-music.jpg",
    alt: "小提琴、鋼琴鍵、吉他、小鼓，和窗外的星空",
    columns: 1,
    multiple: true,
    options: MUSICS.map((item) => ({ id: item.id, label: item.label })),
  },
  {
    field: "reason",
    title: "這次想讓孩子學音樂，比較接近？",
    image: "/illustrations/q-reason.jpg",
    alt: "孩子坐在有植物的房間裡，輕輕摸著鼓，旁邊有吉他和鍵盤",
    columns: 1,
    multiple: true,
    options: REASONS.map((item) => ({
      id: item.id,
      label: item.label,
      hint: item.hint,
    })),
  },
  {
    field: "wish",
    title: "這次學音樂，是誰比較想？",
    image: "/illustrations/q-reason.jpg",
    alt: "孩子坐在有植物的房間裡，自己伸手去摸樂器",
    columns: 1,
    multiple: true,
    options: WISHES.map((item) => ({
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
    observation: string;
    image: string;
    alt: string;
    courses: CourseOption[];
  }
> = {
  drums: {
    id: "drums",
    name: "爵士鼓",
    blurb: "節奏一出來，整個人就亮了。敲下去的那一下，常常是孩子最開心的時刻。",
    observation: "平常喜歡敲敲打打，看到別人打鼓的影片眼睛會一直盯著看的孩子很適合。",
    image: "/illustrations/inst-drums.jpg",
    alt: "孩子坐在爵士鼓前面，高舉鼓棒笑著",
    courses: [{ form: COURSE_LABEL.drums, minYears: 3 }],
  },
  acoustic: {
    id: "acoustic",
    name: "木吉他",
    blurb: "抱在懷裡就會響。一首歌可以邊唱邊彈，慢慢長出來。",
    observation: STRING_OBSERVATION,
    image: "/illustrations/inst-guitar.jpg",
    alt: "孩子抱著木吉他",
    courses: [{ form: COURSE_LABEL.acoustic, minYears: 8 }],
  },
  electric: {
    id: "electric",
    name: "電吉他",
    blurb: "音色可以很溫柔，也可以很有勁。想展現自己的時候，它很有舞台感。",
    observation: STRING_OBSERVATION,
    image: "/illustrations/inst-guitar.jpg",
    alt: "孩子站在電吉他旁邊",
    courses: [{ form: COURSE_LABEL.electric, minYears: 6 }],
  },
  bass: {
    id: "bass",
    name: "電貝斯",
    blurb: "聲音低調，卻把整首歌黏在一起。不搶旋律，卻讓大家站得住。",
    observation: STRING_OBSERVATION,
    image: "/illustrations/inst-bass.jpg",
    alt: "孩子抱著電貝斯，安靜地笑",
    courses: [{ form: COURSE_LABEL.bass, minYears: 8 }],
  },
  vocal: {
    id: "vocal",
    name: "歌唱",
    blurb: "用自己的聲音說故事。不用先會樂器，開口唱，就是開始。",
    observation: "適合平常喜歡唱歌、對旋律比較敏感的孩子。",
    image: "/illustrations/inst-vocal.jpg",
    alt: "孩子拿著麥克風開心地唱歌，周圍有音符和愛心",
    courses: [{ form: COURSE_LABEL.vocal, minYears: 3 }],
  },
  piano: {
    id: "piano",
    name: "鋼琴（流行鋼琴）",
    blurb: "一個人也能把一首歌彈完整。按下去就有聲音，很適合邊玩邊找感覺。",
    observation: "適合平常喜歡唱歌、對旋律比較敏感的孩子。",
    image: "/illustrations/inst-piano.jpg",
    alt: "孩子坐在彩色鍵盤前，雙手按著琴鍵",
    courses: [{ form: COURSE_LABEL.piano, minYears: 3 }],
  },
};

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

export function styleProfile(id: StyleId) {
  return byId(STYLES, id);
}

/** 聽到音樂會跟著唱，算對旋律敏感。複選裡有這項就算。 */
export function likesMelody(answers: Answers): boolean {
  return answers.hear.includes("singalong");
}

/** 木吉他、電吉他、電貝斯只看兩個條件：一年級以上，而且孩子自己想學。 */
export function allowGuitar(answers: Answers): boolean {
  return ageProfile(answers.age).grade >= 1 && answers.wish.includes("self");
}

const STRING_IDS = new Set<InstrumentId>(["acoustic", "electric", "bass"]);

/** 聽到音樂會跟著打拍子，爵士鼓排第一。複選裡有這項就算。 */
export function prefersRhythm(answers: Answers): boolean {
  return answers.hear.includes("beat");
}

export function recommend(answers: Answers): InstrumentId[] {
  const guitarOk = allowGuitar(answers);
  const others: InstrumentId[] = [];

  if (likesMelody(answers)) {
    others.push("vocal", "piano");
  }

  for (const styleId of answers.style) {
    for (const id of styleProfile(styleId).fits) {
      if (STRING_IDS.has(id) && !guitarOk) {
        continue;
      }
      if (id !== "drums" && !others.includes(id)) {
        others.push(id);
      }
    }
  }

  if (others.length === 0) {
    const calm = answers.hear.includes("quiet") || answers.music.includes("classical");
    others.push(calm ? "piano" : "vocal");
  }

  return prefersRhythm(answers) ? ["drums", ...others] : [...others, "drums"];
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
  for (const id of answers.personality) {
    params.append(`entry.${FORM_ENTRY.personality}`, byId(PERSONALITIES, id).form);
  }
  for (const id of answers.reason) {
    params.append(`entry.${FORM_ENTRY.reason}`, byId(REASONS, id).form);
  }
  for (const id of answers.music) {
    params.append(`entry.${FORM_ENTRY.music}`, byId(MUSICS, id).form);
  }
  for (const course of coursesFor(picks, ageProfile(answers.age).years)) {
    params.append(`entry.${FORM_ENTRY.course}`, course);
  }
  return `${FORM_ACTION}?${params.toString()}`;
}

const QUERY_KEYS = {
  age: "a",
  personality: "p",
  hear: "h",
  music: "m",
  reason: "r",
  wish: "w",
  style: "s",
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

function manyIds<T extends { id: string }>(
  list: T[],
  value: string | string[] | undefined,
): T["id"][] | null {
  const raw = value === undefined ? [] : Array.isArray(value) ? value : [value];
  if (raw.length === 0) {
    return null;
  }
  const ids: T["id"][] = [];
  for (const item of raw) {
    if (!isId(list, item)) {
      return null;
    }
    if (!ids.includes(item)) {
      ids.push(item);
    }
  }
  return ids;
}

export function parseAnswers(
  sp: Record<string, string | string[] | undefined>,
): Answers | null {
  const age = first(sp[QUERY_KEYS.age]);
  const personality = manyIds(PERSONALITIES, sp[QUERY_KEYS.personality]);
  const hear = manyIds(HEARS, sp[QUERY_KEYS.hear]);
  const music = manyIds(MUSICS, sp[QUERY_KEYS.music]);
  const reason = manyIds(REASONS, sp[QUERY_KEYS.reason]);
  const wish = manyIds(WISHES, sp[QUERY_KEYS.wish]);
  const style = manyIds(STYLES, sp[QUERY_KEYS.style]);
  if (
    !isId(AGES, age) ||
    !personality ||
    !hear ||
    !music ||
    !reason ||
    !wish ||
    !style
  ) {
    return null;
  }
  return { age, personality, hear, music, reason, wish, style };
}

export function hasQuizParams(sp: Record<string, string | string[] | undefined>): boolean {
  return Object.values(QUERY_KEYS).some((key) => first(sp[key]));
}

export function toQuery(answers: Answers): string {
  const params = new URLSearchParams();
  params.set(QUERY_KEYS.age, answers.age);
  for (const id of answers.personality) params.append(QUERY_KEYS.personality, id);
  for (const id of answers.hear) params.append(QUERY_KEYS.hear, id);
  for (const id of answers.music) params.append(QUERY_KEYS.music, id);
  for (const id of answers.reason) params.append(QUERY_KEYS.reason, id);
  for (const id of answers.wish) params.append(QUERY_KEYS.wish, id);
  for (const id of answers.style) params.append(QUERY_KEYS.style, id);
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
