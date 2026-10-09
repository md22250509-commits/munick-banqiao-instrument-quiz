import {
  instruments,
  type Answers,
  type Instrument,
  type InstrumentCategory,
  type InstrumentId,
} from "./quiz-data";

const categories: InstrumentCategory[] = [
  "drums",
  "guitar",
  "bass",
  "vocal",
  "piano",
];

function emptyScores(): Record<InstrumentCategory, number> {
  return { drums: 0, guitar: 0, bass: 0, vocal: 0, piano: 0 };
}

export function recommendInstruments(answers: Answers): Instrument[] {
  const score = emptyScores();
  let acoustic = 0;
  let electric = 0;

  const add = (partial: Partial<Record<InstrumentCategory, number>>) => {
    for (const [key, value] of Object.entries(partial) as [
      InstrumentCategory,
      number,
    ][]) {
      score[key] += value;
    }
  };

  switch (answers.play) {
    case "knock":
      add({ drums: 5, bass: 1 });
      break;
    case "sing":
      add({ vocal: 5, piano: 1, guitar: 1 });
      break;
    case "keys":
      add({ piano: 5 });
      break;
    case "strum":
      add({ guitar: 5, bass: 3 });
      acoustic += 1;
      electric += 1;
      break;
  }

  switch (answers.reaction) {
    case "beat":
      add({ drums: 4, bass: 3 });
      break;
    case "singalong":
      add({ vocal: 4, piano: 2, guitar: 1 });
      acoustic += 1;
      break;
    case "dance":
      add({ drums: 3, guitar: 2, vocal: 2 });
      electric += 2;
      break;
    case "listen":
      add({ piano: 4, guitar: 2, bass: 2 });
      acoustic += 2;
      break;
  }

  switch (answers.personality) {
    case "lively":
      add({ drums: 3, vocal: 2, guitar: 2 });
      electric += 2;
      break;
    case "shy":
      add({ piano: 3, guitar: 2, bass: 2 });
      acoustic += 2;
      break;
    case "mature":
      add({ piano: 2, bass: 3, guitar: 2 });
      acoustic += 1;
      break;
    case "childlike":
      add({ drums: 2, piano: 2, vocal: 2 });
      break;
    case "sincere":
      add({ bass: 3, guitar: 2, piano: 2 });
      acoustic += 2;
      break;
    case "clever":
      add({ piano: 3, bass: 2, guitar: 2 });
      electric += 1;
      break;
  }

  switch (answers.music) {
    case "classical":
      add({ piano: 4, guitar: 2 });
      acoustic += 3;
      break;
    case "mandopop":
      add({ vocal: 3, piano: 3, guitar: 2 });
      acoustic += 2;
      break;
    case "anime":
      add({ piano: 3, vocal: 3, guitar: 2 });
      electric += 1;
      break;
    case "kpop":
      add({ vocal: 4, piano: 2, guitar: 2 });
      electric += 2;
      break;
    case "rock":
      add({ guitar: 4, drums: 3, bass: 3 });
      electric += 4;
      break;
  }

  if (answers.motive === "explore") {
    add({ drums: 1, vocal: 1, guitar: 1 });
  } else {
    add({ piano: 2, bass: 1, guitar: 1 });
    acoustic += 1;
  }

  switch (answers.age) {
    case "3-5":
      add({ bass: -3, guitar: -1, drums: 1, piano: 1, vocal: 1 });
      acoustic -= 2;
      electric -= 1;
      break;
    case "6-8":
      add({ bass: -2 });
      acoustic -= 1;
      break;
    case "13+":
      add({ guitar: 1, bass: 1 });
      electric += 1;
      break;
    default:
      break;
  }

  const ranked = [...categories].sort((a, b) => {
    if (score[b] !== score[a]) return score[b] - score[a];
    return categories.indexOf(a) - categories.indexOf(b);
  });

  const picked: InstrumentCategory[] = [ranked[0], ranked[1]];
  const third = ranked[2];
  const closeToSecond = score[third] >= score[ranked[1]] - 2;
  const stillWarm = score[third] >= Math.max(2, score[ranked[0]] * 0.45);
  if (closeToSecond || stillWarm) {
    picked.push(third);
  }

  const guitarId: InstrumentId =
    electric > acoustic ? "guitar-electric" : "guitar-acoustic";

  const categoryToId: Record<InstrumentCategory, InstrumentId> = {
    drums: "drums",
    guitar: guitarId,
    bass: "bass",
    vocal: "vocal",
    piano: "piano",
  };

  return picked.map((category) => instruments[categoryToId[category]]);
}
