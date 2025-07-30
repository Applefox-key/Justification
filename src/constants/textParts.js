export const textParts = [
  { en: "Responses are about the same.", ru: "", level: "AB", note: "" },
  { en: "Response A is slightly better.", ru: "", level: "A", note: "" },
  { en: "Response A is better.", ru: "", level: "A", note: "" },
  { en: "Response A is much better.", ru: "", level: "A", note: "" },
  { en: "Response B is slightly better.", ru: "", level: "B", note: "" },
  { en: "Response B is better.", ru: "", level: "B", note: "" },
  { en: "Response B is much better.", ru: "", level: "B", note: "" },
  { en: "responses", ru: "", level: "AB", note: "" },
  { en: "Both responses", ru: "", level: "AB", note: "" },
  { en: "Response A", ru: "", level: "A", note: "" },
  { en: "Response B", ru: "", level: "B", note: "" },
  { en: "So the span is inaccurate.", ru: "", level: "span", note: "" },
  { en: "So the span is accurate.", ru: "", level: "span", note: "" },
  { en: "According to the Wikipedia,", ru: "", level: "span", note: "" },
  {
    en: "Internet research has not yielded results about,",
    ru: "нет результатов",
    level: "span",
    note: "",
  },
  {
    en: "This information relates to common knowledge base. ",
    ru: "",
    level: "span",
    note: "",
  },
  {
    en: "The span is purely conversational. ",
    ru: ` "Спокойной ночи" или "Вам нравится выгодная сделка?"`,
    level: "no_fact",
    note: "",
  },
  {
    en: "The span is a generic disclaimer.",
    ru: " Проконсультируйтесь с врачом, прежде чем принимать решение.",
    level: "no_fact",
    note: "",
  },
  {
    en: "The span contains phrases that structure the response.",
    ru: " фразы, представляющие список, краткое изложение других частей ответа или выводы",
    level: "no_fact",
    note: "",
  },
  {
    en: "The span rephrases the user's input.",
    ru: "Конечно, вот несколько идей для празднования четвертого дня рождения ребенка",
    level: "no_fact",
    note: "",
  },
  {
    en: "The span only contains link.",
    ru: "не должны проверять, существуют ли URL-адреса ",
    level: "no_fact",
    note: "",
  },
  {
    en: "The span only contains creative content.",
    ru: "Жил-был ковбой по имени Джек",
    level: "no_fact",
    note: "",
  },
  {
    en: "The span is a first-person opinion.",
    ru: "Я люблю пирожные...",
    level: "no_fact",
    note: "",
  },
  {
    en: "The span contains general advice without factual information.",
    ru: "",
    level: "no_fact",
    note: "",
  },
  {
    en: " The span doesn't contain factual information.",
    ru: "",
    level: "no_fact",
    note: "",
  },
];

export const mainTmp = `@Response is slightly much better than @Response /@Response 1 and @Response 2 are about the same.
@Response 1
@Response 2
Both`;

export const defaultDimSets = {
  set1: [
    {
      a: "Instructions_A",
      b: "Instructions_B",
      name: "Instruction following",
      short: "IF",
      better: "is better at following instructions",
    },
    {
      a: "Factuality_A",
      b: "Factuality_B",
      name: "Factuality",
      short: "F",
      better: "is more accurate",
    },
    {
      a: "Language_A",
      b: "Language_B",
      name: "Language fluency",
      short: "LF",
      better: "is better in fluency",
    },
    {
      a: "Coherence_A",
      b: "Coherence_B",
      name: "Coherence",
      short: "C",
      better: "is more coherent",
    },
    {
      a: "Presentation_A",
      b: "Presentation_B",
      name: "Presentation",
      short: "P",
      better: "has better presentation",
    },
    {
      a: "Tone_A",
      b: "Tone_B",
      name: "Tone",
      short: "T",
      better: "has a more appropriate tone",
    },
  ],
  set2: [
    {
      a: "Localization_A",
      b: "Localization_B",
      name: "Localization fluency",
      short: "LC",
      better: "is better in localization",
    },
    {
      a: "Instructions_A",
      b: "Instructions_B",
      name: "Instruction following",
      short: "IF",
      better: "is better at following instructions",
    },
    {
      a: "Truthfulness_A",
      b: "Truthfulness_B",
      name: "Truthfulness",
      short: "TR",
      better: "is more accurate",
    },

    {
      a: "Length_A",
      b: "Length_B",
      name: "Response Length",
      short: "RL",
      better: `is more dainty/short/long/ has long pleasantries that shift focus away from the answer`,
    },
    {
      a: "Harmless_A",
      b: "Harmless_B",
      name: "Harmless",
      short: "H",
      better: "has no safety issue",
    },
    {
      a: "Structure_WritingStyle_Tone_A",
      b: "Structure_WritingStyle_Tone_B",
      name: "Structure, Writing Style & Tone",
      short: "SWT",
      better: `is more organized/uses a more appropriate tone/ideas are better presented/text is better read because of successful formatting`,
    },
  ],
};
export const defaultDimTempl = {
  Rate: "",
  Justif: "",
  id: "",
  name: "",
};
export const defaultDim = {
  Instructions_A: "",
  Factuality_A: "",
  Coherence_A: "",
  Language_A: "",
  Presentation_A: "",
  Tone_A: "",
  Instructions_B: "",
  Language_B: "",
  Factuality_B: "",
  Coherence_B: "",
  Presentation_B: "",
  Tone_B: "",
  Rate: "",
  Justif: "",
  id: "",
  name: "",
  Evals: {
    Instructions_A: 0,
    Factuality_A: 0,
    Coherence_A: 0,
    Language_A: 0,
    Presentation_A: 0,
    Tone_A: 0,
    Instructions_B: 0,
    Language_B: 0,
    Factuality_B: 0,
    Coherence_B: 0,
    Presentation_B: 0,
    Tone_B: 0,
    Rate: 0,
  },
  review: "",
};
export const defaultDmg = {
  Instructions_A: "",
  Factuality_A: "",
  Coherence_A: "",
  Language_A: "",
  Presentation_A: "",
  Tone_A: "",
  Instructions_B: "",
  Language_B: "",
  Factuality_B: "",
  Coherence_B: "",
  Presentation_B: "",
  Tone_B: "",
  Rate: "",
  Justif: "",
  id: "",
  name: "",
  Evals: {
    Instructions_A: 0,
    Factuality_A: 0,
    Coherence_A: 0,
    Language_A: 0,
    Presentation_A: 0,
    Tone_A: 0,
    Instructions_B: 0,
    Language_B: 0,
    Factuality_B: 0,
    Coherence_B: 0,
    Presentation_B: 0,
    Tone_B: 0,
    Rate: 0,
  },
  review: "",
};
export const defaultRubricator = {
  rubric: "",
  example: "",
  exExample: false,
  score1: -1,
  score2: -1,
  score3: -1,
  score4: -1,
  error1: "",
  error2: "",
  error3: "",
  error4: "",
};
export const defaultRubJust = {
  taskId: "",
  rubricator: [],
  links: [],
  prompt: "",
  eval1: "",
  eval2: "",
  eval3: "",
  eval4: "",
  stat1: "",
  stat2: "",
  stat3: "",
  stat4: "",
  justif1: "",
  justif2: "",
  justif3: "",
  justif4: "",
  link1: "",
  link2: "",
  link3: "",
  link4: "",
  overall1: "",
  overall2: "",
  overall3: "",
  overall4: "",
  justifSBS: "",
};

//   Instructions_A: 0,
//   Factuality_A: 0,
//   Coherence_A: 0,
//   Language_A: 0,
//   Presentation_A: 0,
//   Tone_A: 0,
//   Instructions_B: 0,
//   Language_B: 0,
//   Factuality_B: 0,
//   Coherence_B: 0,
//   Presentation_B: 0,
//   Tone_B: 0,
//   Rate: 0,
//   Justif: 0,
// };
export const arrAB = [
  {
    a: "Instructions_A",
    b: "Instructions_B",
    name: "Instruction following",
    short: "IF",
    better: "is better at following instructions",
  },
  {
    a: "Factuality_A",
    b: "Factuality_B",
    name: "Factuality",
    short: "F",
    better: "is more accurate",
  },
  {
    a: "Language_A",
    b: "Language_B",
    name: "Language fluency",
    short: "LF",
    better: "is better in fluency",
  },
  {
    a: "Coherence_A",
    b: "Coherence_B",
    name: "Coherence",
    short: "C",
    better: "is more coherent",
  },
  {
    a: "Presentation_A",
    b: "Presentation_B",
    name: "Presentation",
    short: "P",
    better: "has better presentation",
  },
  {
    a: "Tone_A",
    b: "Tone_B",
    name: "Tone",
    short: "T",
    better: "has a more appropriate tone",
  },
];

export const constructDefItem = (sn) => {
  const setName = sn ? sn : "set2";
  const defAB = defaultDimSets[setName].reduce((acc, { a, b }) => {
    acc[a] = "";
    acc[b] = "";
    return acc;
  }, {});
  const defABE = defaultDimSets[setName].reduce((acc, { a, b }) => {
    acc[a] = 0;
    acc[b] = 0;
    return acc;
  }, {});

  return { ...defaultDimTempl, ...defAB, Evals: { ...defABE }, setName: sn };
};

export const getNewOrParseDmg = (el = null) => {
  const setN = (el ? el.setName : "") || "set1";
  const defEl = constructDefItem(setN);
  return el ? { ...defEl, ...JSON.parse(el) } : defEl;
};
