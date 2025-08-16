import { fromLS, getSet } from "../utils/localStorage";

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
      worth: "is less localized",
      justif: [
        {
          title: "Unlocalized",
          newT: "The response provides information related to another locale",
        },
        {
          title: "Non-local Perspective",
          newT: "The response over-explains details that a local can easily understand",
        },
        {
          title: "Local norms",
          newT: "The response should use details that a local would understand easily and are a local norm",
        },
        {
          title: "Local Locations",
          newT: "The response provides information related to another locale",
        },
        {
          title: "Local Events",
          newT: "The response includes unrelevant generic festivals, holidays, or seasonal events",
        },
        {
          newT: `BotModel contains phrases written in another language (not Russian) "".`,

          title: "foreign",
        },
        {
          newT: `BotModel contains The phrase that is often repeated, for example "".`,

          title: "repetition",
        },
        {
          newT: `Some phrases in BotModel sound unnatural: `,
          title: "unnat ♾️",
        },
        {
          newT: `The phrase "_" in BotModel sounds unnatural. It should be "".`,
          title: "unnat ➀",
        },

        {
          newT: `BotModel sounds a bit chat-boty. For example, it is uses a phrase like ""`,
          title: "robo",
        },
        {
          newT: `BotModel contains phrases written in another language (not Russian) "".`,
          title: "foreign",
        },
        {
          newT: `BotModel contains The phrase that is often repeated, for example "".`,
          title: "repetition",
        },

        {
          oldT: ["gramar"],
          newT: `BotModel contains grammatical errors, for example "" instead of "".`,
          caseSensitive: false,
          show: true,
          title: "gram err",
        },
        {
          newT: `BotModel contains punctuation errors, for example .`,
          title: "punkt err",
        },
        {
          newT: `BotModel uses incorrect word matching in Russian "" instead of ""`,
          title: "word matching",
        },

        {
          newT: `BotModel  In the response the quotation marks should be replaced with «».`,
          title: "«»",
        },
        {
          newT: `In BotModel the hyphen should be replaced with a dash.`,
          title: "—",
        },
        {
          oldT: ["quotesDash"],
          newT: `In BotModel the quotation marks should be replaced with «», and the hyphen should be replaced with a dash`,
          caseSensitive: false,
          show: true,
          title: "« » —",
        },
        {
          newT: `The comma after " " is unnecessary`,
          title: "comma",
        },
        {
          newT: `BotModel uses uppercase after the colon. In this case, by the rules of the Russian language, after the colon should be a lowercase letter.`,
          title: ":A",
        },
        {
          newT: `No colon is needed after the title.`,
          title: "A:",
        },
        {
          newT: `it is better to end the paragraph before the list with a period, not a colon.`,
          title: "A:123",
        },
        {
          newT: `The letter "ё" is inconsistently used`,
          title: "ё",
        },
      ],
    },
    {
      a: "Instructions_A",
      b: "Instructions_B",
      name: "Instruction following",
      short: "IF",
      better: "is better at following instructions",
      worth: "follows instructions worse",
      justif: [
        {
          title: "not follow",
          newT: "The response does not follow the format, length, tone, exclusions, or other constraints explicitly mentioned in the prompt.",
        },
        {
          title: "extra facts",
          newT: "The extra facts the model added are unhelpful.",
        },
        {
          title: "constraints ignore",
          newT: "The response ignores or violates key constraints in the prompt, making it unhelpful to the user.",
        },
        {
          title: "user asked",
          newT: " The user asked for _, but the response recommended/provided _. This does not follow the prompt's instructions.",
        },
        { title: "failed", newT: "The model has failed in its task because " },
        {
          title: "not use some info",
          newT: "The model did not use some information provided by the user in any way.",
        },
      ],
    },
    {
      a: "Truthfulness_A",
      b: "Truthfulness_B",
      name: "Truthfulness",
      short: "TR",
      better: "is more accurate",
      worth: "is less accurate",
      justif: [
        {
          title: "inaccurately claims",
          newT: "The response inaccurately claims that __ when in fact it's _.",
        },
      ],
    },

    {
      a: "Length_A",
      b: "Length_B",
      name: "Response Length",
      short: "RL",
      better: `is more dainty/short/long/ has long pleasantries that shift focus away from the answer`,
      worth: `is less dainty/short/long/ has long pleasantries that shift focus away from the answer`,
      justif: [
        {
          title: "too detailed",
          newT: "The response is either overly detailed",
        },
        {
          title: "unrelated details",
          newT: "A response includes unrelated details:",
        },
        {
          title: "long pleasantries",
          newT: "The response contains long pleasantries that lead to lack of focus on the answer.",
        },
        {
          title: "rephrases",
          newT: "The response rephrases the same ideas.",
        },
        {
          title: "unrelated opinions",
          newT: "Adding suggestions, opinions, or unrelated information",
        },
        { title: "short", newT: "The response is too short. " },
        { title: "long", newT: "The response is too long." },
        {
          title: "short-long",
          newT: `The response is too long and short at the same time. 
          It is too short since there is little useful information in the response.
          It is too long since it contains unnecessary unuseful details.`,
        },

        {
          title: "pleasantries",
          newT: "The response contains pleasantries (last/first paragraph/sentence).",
        },
        {
          title: "not all info is used",
          newT: "The model does not use all the information provided by the user in the prompt.",
        },
      ],
    },
    {
      a: "Harmless_A",
      b: "Harmless_B",
      name: "Harmless",
      short: "H",
      better: "has no safety issue",
      worth: "has safety issue",
      justif: [],
    },
    {
      a: "Structure_WritingStyle_Tone_A",
      b: "Structure_WritingStyle_Tone_B",
      name: "Structure, Writing Style & Tone",
      short: "SWT",
      better: `is more organized/uses a more appropriate tone/ideas are better presented/text is better read because of successful formatting`,
      worth: `is less organized/uses a less appropriate tone/ideas are worth presented/the text is less readable due to poor formatting.`,
      justif: [
        {
          newT: `BotModel provides a lot of information but lacks structure. Adding bullet points or bolding key details would improve readability`,
          title: "Presentation",
        },
        {
          newT: `BotModel provides a lot of information but lacks structure. Adding bullet points or bolding key details would improve readability`,
          title: "Presentation",
        },
      ],
    },
  ],
};

export const defaultDimTempl = {
  Rate: "",
  Justif: "",
  id: "",
  name: "",
  RateA: "",
  RateB: "",
  likert: -1,
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
  likert: 0,
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
  likert: 0,
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
  let setN = (el ? el.setName : "") || getSet();
  // if ((setN = "")) setN = getSet();

  const defEl = constructDefItem(setN);
  return el ? { ...defEl, ...JSON.parse(el) } : defEl;
};
