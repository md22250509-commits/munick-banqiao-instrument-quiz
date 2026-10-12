import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  COURSE_LABEL,
  DRUMS_NOTE,
  INSTRUMENTS,
  QUESTIONS,
  STYLES,
  buildPrefillUrl,
  coursesFor,
  parseAnswers,
  recommend,
  toQuery,
} from "./quiz.ts";
import type { Answers } from "./quiz.ts";

const ALL_AGES = ["pre", "g1", "g23", "g46", "junior"] as const;
const ALL_PERSONALITIES = ["lively", "shy", "mature", "childlike", "sincere", "clever"] as const;
const ALL_HEARS = ["beat", "singalong", "dance", "quiet"] as const;
const ALL_MUSICS = ["classical", "mandopop", "anime", "kpop", "rock"] as const;
const ALL_REASONS = ["explore", "relax"] as const;
const ALL_WISHES = ["self", "family"] as const;
const ALL_STYLES = ["energy", "spatial", "expressive", "steady", "cool"] as const;

function answers(partial: Answers): Answers {
  return partial;
}

describe("questions", () => {
  it("no longer asks what the child usually likes to do", () => {
    assert.equal(QUESTIONS.length, 7);
    assert.equal(
      QUESTIONS.some((question) => question.title.includes("平時比較喜歡")),
      false,
    );
    assert.deepEqual(
      QUESTIONS.map((question) => question.field),
      ["age", "personality", "style", "hear", "music", "reason", "wish"],
    );
  });
});

describe("recommend", () => {
  it("keeps drums, rhythm order, melody, and the string-instrument gate", () => {
    for (const age of ALL_AGES) {
      for (const personality of ALL_PERSONALITIES) {
        for (const hear of ALL_HEARS) {
          for (const music of ALL_MUSICS) {
            for (const reason of ALL_REASONS) {
              for (const wish of ALL_WISHES) {
                for (const style of ALL_STYLES) {
                  const picks = recommend(
                    answers({ age, personality, hear, music, reason, wish, style }),
                  );
                  assert.ok(picks.length >= 2 && picks.length <= 4);
                  assert.equal(new Set(picks).size, picks.length);
                  assert.ok(picks.includes("drums"));
                  const stringsOk = age !== "pre" && wish === "self";
                  for (const id of ["acoustic", "electric", "bass"] as const) {
                    if (!stringsOk) assert.equal(picks.includes(id), false);
                  }
                  if (style === "expressive" && stringsOk) assert.ok(picks.includes("acoustic"));
                  if (style === "steady" && stringsOk) assert.ok(picks.includes("bass"));
                  if (style === "cool" && stringsOk) assert.ok(picks.includes("electric"));
                  if (style === "energy" || style === "spatial") {
                    assert.equal(picks.includes("acoustic"), false);
                    assert.equal(picks.includes("electric"), false);
                    assert.equal(picks.includes("bass"), false);
                  }
                  if (hear === "beat") assert.equal(picks[0], "drums");
                  else assert.equal(picks.at(-1), "drums");
                  if (hear === "singalong") {
                    assert.ok(picks.indexOf("vocal") >= 0);
                    assert.ok(picks.indexOf("vocal") < picks.indexOf("piano"));
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  it("puts drums first for an energetic child who keeps the beat", () => {
    const picks = recommend(
      answers({
        age: "g23",
        personality: "lively",
        hear: "beat",
        music: "rock",
        reason: "explore",
        wish: "self",
        style: "energy",
      }),
    );
    assert.equal(picks[0], "drums");
    assert.equal(picks.includes("acoustic"), false);
    assert.equal(picks.includes("electric"), false);
    assert.equal(picks.includes("bass"), false);
  });

  it("puts drums last when an energetic child does not keep the beat", () => {
    const picks = recommend(
      answers({
        age: "g23",
        personality: "lively",
        hear: "dance",
        music: "rock",
        reason: "explore",
        wish: "self",
        style: "energy",
      }),
    );
    assert.equal(picks.at(-1), "drums");
    assert.notEqual(picks[0], "drums");
  });

  it("matches a spatial child with piano", () => {
    const picks = recommend(
      answers({
        age: "g1",
        personality: "clever",
        hear: "quiet",
        music: "classical",
        reason: "relax",
        wish: "self",
        style: "spatial",
      }),
    );
    assert.deepEqual(picks, ["piano", "drums"]);
  });

  it("matches an expressive child who wants to learn with singing and acoustic guitar", () => {
    const picks = recommend(
      answers({
        age: "g23",
        personality: "lively",
        hear: "quiet",
        music: "mandopop",
        reason: "explore",
        wish: "self",
        style: "expressive",
      }),
    );
    assert.deepEqual(picks, ["vocal", "acoustic", "drums"]);
    assert.deepEqual(coursesFor(picks, 9), [
      COURSE_LABEL.vocal,
      COURSE_LABEL.acoustic,
      COURSE_LABEL.drums,
    ]);
  });

  it("holds acoustic guitar when the expressive child is too young", () => {
    const picks = recommend(
      answers({
        age: "pre",
        personality: "lively",
        hear: "dance",
        music: "kpop",
        reason: "explore",
        wish: "self",
        style: "expressive",
      }),
    );
    assert.deepEqual(picks, ["vocal", "drums"]);
    assert.equal(picks.includes("acoustic"), false);
  });

  it("matches a steady child with electric bass only when both gates pass", () => {
    const allowed = recommend(
      answers({
        age: "g46",
        personality: "sincere",
        hear: "quiet",
        music: "classical",
        reason: "relax",
        wish: "self",
        style: "steady",
      }),
    );
    assert.deepEqual(allowed, ["bass", "drums"]);
    const family = recommend(
      answers({
        age: "junior",
        personality: "mature",
        hear: "quiet",
        music: "classical",
        reason: "relax",
        wish: "family",
        style: "steady",
      }),
    );
    assert.equal(family.includes("bass"), false);
    assert.equal(family.at(-1), "drums");
  });

  it("matches a cool child with electric guitar, and puts drums first when they keep the beat", () => {
    const picks = recommend(
      answers({
        age: "junior",
        personality: "lively",
        hear: "beat",
        music: "rock",
        reason: "explore",
        wish: "self",
        style: "cool",
      }),
    );
    assert.deepEqual(picks, ["drums", "electric"]);
    assert.ok(coursesFor(picks, 13).includes(COURSE_LABEL.electric));
  });

  it("prioritizes singing and pop piano, then adds the style instrument", () => {
    const picks = recommend(
      answers({
        age: "g1",
        personality: "lively",
        hear: "singalong",
        music: "kpop",
        reason: "explore",
        wish: "self",
        style: "cool",
      }),
    );
    assert.deepEqual(picks, ["vocal", "piano", "electric", "drums"]);
  });
});

describe("teacher notes", () => {
  it("keeps the observation copy and the drums sentence exactly", () => {
    assert.equal(
      INSTRUMENTS.drums.observation,
      "平常喜歡敲敲打打，看到別人打鼓的影片眼睛會一直盯著看的孩子很適合。",
    );
    assert.equal(
      INSTRUMENTS.acoustic.observation,
      "建議二、三年級以上，最小大概一年級。孩子要很有想法、很有主見，是真的自己想彈。",
    );
    assert.equal(INSTRUMENTS.electric.observation, INSTRUMENTS.acoustic.observation);
    assert.equal(INSTRUMENTS.bass.observation, INSTRUMENTS.acoustic.observation);
    assert.equal(STYLES.find((item) => item.id === "energy")?.analysis.includes("即時物理反饋"), true);
    assert.equal(STYLES.find((item) => item.id === "spatial")?.fits[0], "piano");
    assert.deepEqual(STYLES.find((item) => item.id === "expressive")?.fits, ["vocal", "acoustic"]);
    assert.equal(STYLES.find((item) => item.id === "steady")?.fits[0], "bass");
    assert.equal(STYLES.find((item) => item.id === "cool")?.fits[0], "electric");
    const notes = Object.values(INSTRUMENTS)
      .map((item) => `${item.name}\n${item.observation}`)
      .join("\n");
    assert.equal(notes.includes("跟著低音搖頭"), false);
    assert.equal(notes.includes("默默撐場"), false);
    assert.equal(
      INSTRUMENTS.vocal.observation,
      "適合平常喜歡唱歌、對旋律比較敏感的孩子。",
    );
    assert.equal(INSTRUMENTS.piano.observation, INSTRUMENTS.vocal.observation);
    assert.equal(
      DRUMS_NOTE,
      "其實我們覺得每個孩子都很適合從爵士鼓開始，因為一切都從節奏開始。",
    );
  });
});

describe("form prefill", () => {
  it("checks acoustic guitar and bass once the child is 8 or older", () => {
    assert.deepEqual(coursesFor(["acoustic", "bass"], 10), [
      COURSE_LABEL.acoustic,
      COURSE_LABEL.bass,
    ]);
  });

  it("checks only electric guitar between 6 and 7", () => {
    assert.deepEqual(coursesFor(["electric"], 6), [COURSE_LABEL.electric]);
  });

  it("still tells the teacher about electric guitar when the child is younger than 6", () => {
    assert.deepEqual(coursesFor(["electric"], 4), [COURSE_LABEL.electric]);
  });

  it("uses the form's exact option text, including the double space and ampersand", () => {
    const sample = answers({
      age: "g23",
      personality: "lively",
      hear: "quiet",
      music: "mandopop",
      reason: "relax",
      wish: "self",
      style: "expressive",
    });
    const url = new URL(buildPrefillUrl(sample, ["acoustic", "piano", "vocal"]));
    assert.equal(url.searchParams.get("usp"), "pp_url");
    assert.equal(url.searchParams.get("entry.1353476259"), "二、三年級");
    assert.equal(url.searchParams.get("entry.935150233"), "活潑大方");
    assert.equal(url.searchParams.get("entry.1878769903"), "興趣與舒壓");
    assert.equal(url.searchParams.get("entry.1949528208"), "華語流行樂語獨立樂團");
    assert.deepEqual(url.searchParams.getAll("entry.1084453381"), [
      COURSE_LABEL.acoustic,
      COURSE_LABEL.piano,
      COURSE_LABEL.vocal,
    ]);
    assert.equal(COURSE_LABEL.acoustic, "木吉他 Acoustic guitar  8y以上");
    assert.match(url.toString(), /%26|&/);
    assert.equal(
      url.searchParams.getAll("entry.1084453381").some((value) => value.includes("&")),
      true,
    );
    assert.doesNotMatch(url.toString(), /免費/);
  });
});

describe("shareable result url", () => {
  it("round-trips a full answer set", () => {
    const sample = answers({
      age: "g1",
      personality: "clever",
      hear: "dance",
      music: "kpop",
      reason: "explore",
      wish: "self",
      style: "cool",
    });
    const query = toQuery(sample);
    const params = Object.fromEntries(new URLSearchParams(query));
    assert.deepEqual(parseAnswers(params), sample);
  });

  it("rejects a broken link", () => {
    assert.equal(parseAnswers({ a: "g1", p: "lively" }), null);
  });
});
