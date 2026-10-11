import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  COURSE_LABEL,
  DRUMS_NOTE,
  INSTRUMENTS,
  buildPrefillUrl,
  coursesFor,
  parseAnswers,
  recommend,
  toQuery,
} from "./quiz.ts";
import type { Answers } from "./quiz.ts";

const ALL_AGES = ["pre", "g1", "g23", "g46", "junior"] as const;
const ALL_PERSONALITIES = ["lively", "shy", "mature", "childlike", "sincere", "clever"] as const;
const ALL_PLAYS = ["hit", "sing", "keys", "strings"] as const;
const ALL_HEARS = ["beat", "singalong", "dance", "quiet"] as const;
const ALL_MUSICS = ["classical", "mandopop", "anime", "kpop", "rock"] as const;
const ALL_REASONS = ["explore", "relax"] as const;
const ALL_WISHES = ["self", "family"] as const;

function answers(partial: Answers): Answers {
  return partial;
}

describe("recommend", () => {
  it("always includes drums last, and returns two or three instruments", () => {
    for (const age of ALL_AGES) {
      for (const personality of ALL_PERSONALITIES) {
        for (const play of ALL_PLAYS) {
          for (const hear of ALL_HEARS) {
            for (const music of ALL_MUSICS) {
              for (const reason of ALL_REASONS) {
                for (const wish of ALL_WISHES) {
                  const picks = recommend(
                    answers({ age, personality, play, hear, music, reason, wish }),
                  );
                  assert.ok(picks.length === 2 || picks.length === 3);
                  assert.equal(new Set(picks).size, picks.length);
                  assert.equal(picks.at(-1), "drums");
                  const guitarAllowed = age !== "pre" && wish === "self";
                  if (!guitarAllowed) {
                    assert.equal(picks.includes("guitar"), false);
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  it("puts piano ahead of drums when a preschooler likes keys and classical music", () => {
    const picks = recommend(
      answers({
        age: "pre",
        personality: "shy",
        play: "keys",
        hear: "quiet",
        music: "classical",
        reason: "relax",
        wish: "self",
      }),
    );
    assert.equal(picks[0], "piano");
    assert.equal(picks.includes("guitar"), false);
    assert.equal(picks.at(-1), "drums");
  });

  it("recommends guitar for a first grader who wants to play strings themselves", () => {
    const picks = recommend(
      answers({
        age: "g1",
        personality: "clever",
        play: "strings",
        hear: "quiet",
        music: "mandopop",
        reason: "explore",
        wish: "self",
      }),
    );
    assert.equal(picks[0], "guitar");
    assert.equal(picks.at(-1), "drums");
  });

  it("includes guitar and bass when an older child who wants to learn loves rock and strings", () => {
    const picks = recommend(
      answers({
        age: "g46",
        personality: "lively",
        play: "strings",
        hear: "beat",
        music: "rock",
        reason: "explore",
        wish: "self",
      }),
    );
    assert.deepEqual(picks, ["guitar", "bass", "drums"]);
  });

  it("swaps guitar for singing when the grade is too young", () => {
    const picks = recommend(
      answers({
        age: "pre",
        personality: "lively",
        play: "strings",
        hear: "beat",
        music: "rock",
        reason: "explore",
        wish: "self",
      }),
    );
    assert.deepEqual(picks, ["vocal", "drums"]);
  });

  it("does not recommend guitar when the family wants the child to try, even in junior high", () => {
    const picks = recommend(
      answers({
        age: "junior",
        personality: "mature",
        play: "strings",
        hear: "quiet",
        music: "classical",
        reason: "relax",
        wish: "family",
      }),
    );
    assert.equal(picks.includes("guitar"), false);
    assert.ok(picks.includes("vocal"));
    assert.equal(picks.at(-1), "drums");
  });

  it("prioritizes singing and pop piano when the child likes to sing", () => {
    const picks = recommend(
      answers({
        age: "junior",
        personality: "lively",
        play: "sing",
        hear: "dance",
        music: "rock",
        reason: "explore",
        wish: "self",
      }),
    );
    assert.deepEqual(picks, ["vocal", "piano", "drums"]);
  });

  it("prioritizes singing and pop piano when the child sings along, even if they also like strings", () => {
    const picks = recommend(
      answers({
        age: "g23",
        personality: "clever",
        play: "strings",
        hear: "singalong",
        music: "mandopop",
        reason: "relax",
        wish: "self",
      }),
    );
    assert.deepEqual(picks, ["vocal", "piano", "drums"]);
  });
});

describe("teacher notes", () => {
  it("keeps the observation copy and the drums sentence exactly", () => {
    assert.equal(
      INSTRUMENTS.drums.observation,
      "平常喜歡敲敲打打，看到別人打鼓的影片眼睛會一直盯著看的孩子很適合。",
    );
    assert.equal(
      INSTRUMENTS.guitar.observation,
      "建議二、三年級以上，最小大概一年級。孩子要很有想法、很有主見，是真的自己想彈。",
    );
    assert.equal(
      INSTRUMENTS.vocal.observation,
      "適合平常喜歡唱歌、對旋律比較敏感的孩子。",
    );
    assert.equal(INSTRUMENTS.piano.observation, INSTRUMENTS.vocal.observation);
    assert.equal(
      INSTRUMENTS.bass.observation,
      "喜歡聽歌時跟著低音搖頭、願意在團裡默默撐場的孩子。",
    );
    assert.equal(
      DRUMS_NOTE,
      "其實我們覺得每個孩子都很適合從爵士鼓開始，因為一切都從節奏開始。",
    );
  });
});

describe("form prefill", () => {
  it("checks both guitars once the child is 8 or older", () => {
    assert.deepEqual(coursesFor(["guitar"], 10), [
      COURSE_LABEL.acoustic,
      COURSE_LABEL.electric,
    ]);
  });

  it("checks only electric guitar between 6 and 7", () => {
    assert.deepEqual(coursesFor(["guitar"], 6), [COURSE_LABEL.electric]);
  });

  it("still tells the teacher about guitar when the child is younger than 6", () => {
    assert.deepEqual(coursesFor(["guitar"], 4), [COURSE_LABEL.electric]);
  });

  it("uses the form's exact option text, including the double space and ampersand", () => {
    const sample = answers({
      age: "g23",
      personality: "lively",
      play: "strings",
      hear: "quiet",
      music: "mandopop",
      reason: "relax",
      wish: "self",
    });
    const url = new URL(buildPrefillUrl(sample, ["guitar", "piano", "vocal"]));
    assert.equal(url.searchParams.get("usp"), "pp_url");
    assert.equal(url.searchParams.get("entry.1353476259"), "二、三年級");
    assert.equal(url.searchParams.get("entry.935150233"), "活潑大方");
    assert.equal(url.searchParams.get("entry.1878769903"), "興趣與舒壓");
    assert.equal(url.searchParams.get("entry.1949528208"), "華語流行樂語獨立樂團");
    assert.deepEqual(url.searchParams.getAll("entry.1084453381"), [
      COURSE_LABEL.acoustic,
      COURSE_LABEL.electric,
      COURSE_LABEL.piano,
      COURSE_LABEL.vocal,
    ]);
    assert.equal(COURSE_LABEL.acoustic, "木吉他 Acoustic guitar  8y以上");
    assert.match(url.toString(), /%26|&/);
    assert.equal(url.searchParams.getAll("entry.1084453381")[2]?.includes("&"), true);
    assert.doesNotMatch(url.toString(), /免費/);
  });
});

describe("shareable result url", () => {
  it("round-trips a full answer set", () => {
    const sample = answers({
      age: "g1",
      personality: "clever",
      play: "sing",
      hear: "dance",
      music: "kpop",
      reason: "explore",
      wish: "self",
    });
    const query = toQuery(sample);
    const params = Object.fromEntries(new URLSearchParams(query));
    assert.deepEqual(parseAnswers(params), sample);
  });

  it("rejects a broken link", () => {
    assert.equal(parseAnswers({ a: "g1", p: "lively" }), null);
  });
});
