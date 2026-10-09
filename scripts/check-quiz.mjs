import { recommendInstruments } from "../src/lib/recommend.ts";
import { buildPrefillUrl } from "../src/lib/form-prefill.ts";
import { parseResultParams, resultPath } from "../src/lib/result-params.ts";

const sample = {
  age: "6-8",
  personality: "lively",
  play: "knock",
  reaction: "beat",
  music: "rock",
  motive: "explore",
};

const picked = recommendInstruments(sample);
if (picked.length < 2 || picked.length > 3) {
  throw new Error(`expected 2-3 instruments, got ${picked.length}`);
}

const url = buildPrefillUrl(sample, picked);
for (const instrument of picked) {
  if (!url.includes(encodeURIComponent(instrument.formValue).replace(/%20/g, "+")) &&
      !url.includes(encodeURIComponent(instrument.formValue))) {
    throw new Error(`missing instrument in prefill: ${instrument.formValue}\n${url}`);
  }
}

if (!url.includes("entry.935150233") || !url.includes("entry.1084453381")) {
  throw new Error("missing form entry ids");
}

const path = resultPath(sample);
const params = Object.fromEntries(new URLSearchParams(path.split("?")[1]));
const parsed = parseResultParams(params);
if (!parsed || parsed.personality !== "lively") {
  throw new Error("result params roundtrip failed");
}

console.log("ok", picked.map((item) => item.name).join("、"));
console.log(url);
