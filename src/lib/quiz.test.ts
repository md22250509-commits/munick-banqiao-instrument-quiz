import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  COURSE_LABEL,
  buildPrefillUrl,
  coursesFor,
  parseAnswers,
  recommend,
  toQuery,
} from "./quiz.ts";
import type { Answers } from "./quiz.ts";

const ALL_AGES = ["under3", "3-5", "6-7", "8-12", "13plus"] as const;
const ALL_PERSONALITIES = ["lively", "shy", "mature", "childlike", "sincere", "clever"] as const;
const ALL_PLAYS = ["hit", "sing", "keys", "strings"] as const;
const ALL_HEARS = ["beat", "singalong", "dance", "quiet"] as const;
const ALL_MUSICS = ["classical", "mandopop", "anime", "kpop", "rock"] as const;
const ALL_REASONS = ["explore", "relax"] as const;

function answers(partial: Answers): Answers {
  return partial;
}

describe("recommend", () => {
  it("always returns two or three different instruments", () => {
    for (const age of ALL_AGES) {
      for (const personality of ALL_PERSONALITIES) {
        for (const play of ALL_PLAYS) {
          for (const hear of ALL_HEARS) {
            for (const music of ALL_MUSICS) {
              for (const reason of ALL_REASONS) {
                const picks = recommend(
                  answers({ age, personality, play, hear, music, reason }),
                );
                assert.ok(picks.length === 2 || picks.length === 3);
                assert.equal(new Set(picks).size, picks.length);
              }
            }
          }
        }
      }
    }
  });

  it("puts piano first when a younger child likes keys, quiet listening, and classical music", () => {
    const picks = recommend(
      answers({
        age: "3-5",
        personality: "shy",
        play: "keys",
        hear: "quiet",
        music: "classical",
        reason: "relax",
      }),
    );
    assert.equal(picks[0], "piano");
    assert.ok(picks.includes("guitar"));
    assert.ok(picks.length === 2 || picks.length === 3);
  });

  it("leans toward drums for a child who hits things and loves rock", () => {
    const picks = recommend(
      answers({
        age: "8-12",
        personality: "lively",
        play: "hit",
        hear: "beat",
        music: "rock",
        reason: "explore",
      }),
    );
    assert.equal(picks[0], "drums");
    assert.ok(picks.includes("guitar"));
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
      age: "8-12",
      personality: "lively",
      play: "strings",
      hear: "quiet",
      music: "mandopop",
      reason: "relax",
    });
    const url = new URL(buildPrefillUrl(sample, ["guitar", "piano", "vocal"]));
    assert.equal(url.searchParams.get("usp"), "pp_url");
    assert.equal(url.searchParams.get("entry.1353476259"), "8-12歲");
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
      age: "6-7",
      personality: "clever",
      play: "sing",
      hear: "dance",
      music: "kpop",
      reason: "explore",
    });
    const query = toQuery(sample);
    const params = Object.fromEntries(new URLSearchParams(query));
    assert.deepEqual(parseAnswers(params), sample);
  });

  it("rejects a broken link", () => {
    assert.equal(parseAnswers({ a: "6-7", p: "lively" }), null);
  });
});
