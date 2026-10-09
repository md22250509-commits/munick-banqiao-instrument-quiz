export const school = {
  name: "慕尼克音樂",
  campus: "新北板橋校區",
  address: "新北市板橋區中正路325巷47號1樓（國光國小對面）",
  phoneDisplay: "0939-239-219",
  phoneTel: "0939239219",
  mapsUrl:
    "https://maps.google.com/?q=%E6%96%B0%E5%8C%97%E5%B8%82%E6%9D%BF%E6%A9%8B%E5%8D%80%E4%B8%AD%E6%AD%A3%E8%B7%AF325%E5%B7%B747%E8%99%9F1%E6%A8%93",
  lineUrl: "https://lin.ee/93VDR23",
} as const;

export const ageRanges = [
  { id: "3-5", label: "3–5 歲", hint: "學齡前", formValue: "3-5歲" },
  { id: "6-8", label: "6–8 歲", hint: "國小低年級", formValue: "6-8歲" },
  { id: "9-12", label: "9–12 歲", hint: "國小中高年級", formValue: "9-12歲" },
  { id: "13+", label: "13 歲以上", hint: "國中以上", formValue: "13歲以上" },
] as const;

export type AgeRangeId = (typeof ageRanges)[number]["id"];

export const personalities = [
  { id: "lively", label: "活潑大方", formValue: "活潑大方" },
  { id: "shy", label: "害羞內向", formValue: "害羞內向" },
  { id: "mature", label: "成熟懂事", formValue: "成熟懂事" },
  { id: "childlike", label: "童心未泯", formValue: "童心未泯" },
  { id: "sincere", label: "誠懇務實", formValue: "誠懇務實" },
  { id: "clever", label: "聰明機智", formValue: "聰明機智" },
] as const;

export type PersonalityId = (typeof personalities)[number]["id"];

export const playStyles = [
  { id: "knock", label: "喜歡敲敲打打", hint: "打節奏、動手腳" },
  { id: "sing", label: "喜歡唱歌", hint: "哼歌、跟著唱" },
  { id: "keys", label: "喜歡按按鍵", hint: "按鈕、鍵盤" },
  { id: "strum", label: "喜歡撥弦", hint: "撥一撥、彈一彈" },
] as const;

export type PlayStyleId = (typeof playStyles)[number]["id"];

export const reactions = [
  { id: "beat", label: "跟著打拍子" },
  { id: "singalong", label: "跟著唱" },
  { id: "dance", label: "跳來跳去" },
  { id: "listen", label: "安靜聽" },
] as const;

export type ReactionId = (typeof reactions)[number]["id"];

/** Quiz labels follow the brief; formValue matches the Google Form option text exactly. */
export const musicStyles = [
  { id: "classical", label: "古典", formValue: "古典音樂" },
  {
    id: "mandopop",
    label: "華語流行與獨立樂團",
    formValue: "華語流行樂語獨立樂團",
  },
  { id: "anime", label: "日系與動漫", formValue: "日系流行與動漫主題曲" },
  { id: "kpop", label: "Kpop", formValue: "Kpop 韓國流行音樂" },
  { id: "rock", label: "搖滾與重金屬", formValue: "搖滾與重金屬" },
] as const;

export type MusicStyleId = (typeof musicStyles)[number]["id"];

export const motives = [
  {
    id: "explore",
    label: "嘗試多元經驗",
    hint: "想讓孩子多接觸、多試試看",
    formValue: "嘗試與累積多元經驗",
  },
  {
    id: "relax",
    label: "興趣與紓壓",
    hint: "想有一個開心、可以放鬆的興趣",
    formValue: "興趣與舒壓",
  },
] as const;

export type MotiveId = (typeof motives)[number]["id"];

export type InstrumentId =
  | "drums"
  | "guitar-acoustic"
  | "guitar-electric"
  | "bass"
  | "vocal"
  | "piano";

export type InstrumentCategory =
  | "drums"
  | "guitar"
  | "bass"
  | "vocal"
  | "piano";

export type Instrument = {
  id: InstrumentId;
  category: InstrumentCategory;
  name: string;
  formValue: string;
  blurb: string;
};

export const instruments: Record<InstrumentId, Instrument> = {
  drums: {
    id: "drums",
    category: "drums",
    name: "爵士鼓",
    formValue: "爵士鼓 Drum sets 3y以上",
    blurb:
      "手腳一起動、拍子清楚，很適合喜歡敲敲打打、聽到音樂就想跟上節奏的孩子。",
  },
  "guitar-acoustic": {
    id: "guitar-acoustic",
    category: "guitar",
    name: "吉他（木吉他）",
    formValue: "木吉他 Acoustic guitar  8y以上",
    blurb:
      "抱著琴、輕輕撥弦，像把心裡的話慢慢唱出來。適合喜歡靠近音樂、也喜歡安靜的孩子。",
  },
  "guitar-electric": {
    id: "guitar-electric",
    category: "guitar",
    name: "吉他（電吉他）",
    formValue: "電吉他 Electric guitar 6y以上",
    blurb:
      "按下效果器、聲音一下子變大，很適合喜歡搖滾、想發出自己聲音的孩子。",
  },
  bass: {
    id: "bass",
    category: "bass",
    name: "Bass 電貝斯",
    formValue: "貝斯 Bass guitar 8y以上",
    blurb:
      "站在歌曲最穩的地方，用低音托住整首歌。適合踏實、喜歡節奏與震動感的孩子。",
  },
  vocal: {
    id: "vocal",
    category: "vocal",
    name: "歌唱",
    formValue: "歌唱 Vocal 3y以上",
    blurb:
      "用自己的聲音當樂器，跟著喜歡的歌一起唱。適合愛哼歌、也喜歡被聽見的孩子。",
  },
  piano: {
    id: "piano",
    category: "piano",
    name: "鋼琴（流行鋼琴）",
    formValue: "流行鋼琴(鍵盤) piano & keyboard for pop music 3y以上",
    blurb:
      "黑白鍵一按就有和聲，流行歌、動漫歌都能彈。適合喜歡按按鍵、慢慢玩出旋律的孩子。",
  },
};

export type Answers = {
  age: AgeRangeId;
  personality: PersonalityId;
  play: PlayStyleId;
  reaction: ReactionId;
  music: MusicStyleId;
  motive: MotiveId;
};

export const questions = [
  {
    id: "age",
    title: "孩子今年幾歲？",
    caption: "先告訴我們大概的年紀，老師會用適合他的方式帶。",
  },
  {
    id: "personality",
    title: "他的個性比較像？",
    caption: "選最接近的就好，沒有標準答案。",
  },
  {
    id: "play",
    title: "平時他比較喜歡？",
    caption: "想想他玩的時候，手會先做什麼。",
  },
  {
    id: "reaction",
    title: "聽到音樂會？",
    caption: "在車上、在家裡，他最常怎麼跟著音樂？",
  },
  {
    id: "music",
    title: "他喜歡哪種音樂？",
    caption: "選現在最常聽、最有感覺的就好。",
  },
  {
    id: "motive",
    title: "想學音樂，最主要是因為？",
    caption: "家長的心意我們會一起放在心上。",
  },
] as const;
