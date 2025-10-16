// import {
//   replaceNum,
//   replaceNum2,
//   replaceWords,
//   replaceWordsInteractions,
// } from "../utils/utilStr";

// export const baseRespName = {
//   "INT": {
//     R1: "Interaction 1",
//     R2: "Interaction 1",
//     fn: replaceWordsInteractions,
//   },
//   "@R": { R1: "@Response 1", R2: "@Response 1", fn: replaceNum },
//   "RAB": { R1: "Response A", R2: "Response B", fn: replaceWords },
//   "R12": { R1: "Response 1", R2: "Response 2", fn: replaceNum2 },
// };

export const replacementsEnding = [
  [["resa", "res1", "respa", "куыф", "отв1", "респ1"], "Response A"],
  [["ress", "рсаа"], "responses"],
  [["rr", "рр"], "response"],

  [["екуы", "tres"], "the response"],
  [["bres"], "Both responses"],
  [["ilf"], "The response has a problem with language fluency"],
  [["ipu"], "The response has a problem with punctuation"],
  [["lf"], "language fluency"],
  [["ozw"], "Otherwise,"],
  [
    ["o5", "о5", "h5", "щ5"],
    "Otherwise, BotModel is fully consistent with the user's prompt. There are no issues.",
  ],
  [["numl"], "The response uses a numbered list unnecessarily."],
  [["куыи", "res2", "отв2", "resb", "респ2"], "Response B"],
  [["tres", "куыз", "отвв"], "the response"],
  [["isss"], "issue"],
  [["mji", "ьош"], "major issue"],
  [["mni", "ьnш"], "major issue"],
  [["--"], "—"],
  [["##"], `“”`],
  [["tns"], `turn1\nturn2\nturn3\nturn4\n`],
  [["trn"], `turn`],
  [
    ["dim", "вшь"],
    `Instruction Following\nLanguage fluency\nCoherence\nFactuality\nPresentation\nTone\n`,
  ],
  [["exx", "прр"], "for example, "],
  [["кк", "йй", "qq"], "«»"],
  [
    ["refr"],
    `It is better to rephrase some fragments in the response since it sounds unnatural (" ").`,
  ],
  [["@@"], `""`],
];
//hot list

// export const hotReplaceJustifSBS = [
//   {
//     oldT: ["Inaccurate"],
//     newT: `Sinse BotModel is more accurate.`,
//     caseSensitive: false,
//     show: true,
//     title: "Inaccurate",
//   },
//   {
//     oldT: ["fact"],
//     newT: `Since BotModel has issues with Factuality.`,
//     caseSensitive: false,
//     show: true,
//     title: "Factuality",
//   },
//   {
//     oldT: ["factna"],
//     newT: `Since the text is the model's reflections on ethical topics there is no unambiguously factually correct and incorrect information here so the rating is chosen as non applicable.`,
//     caseSensitive: false,
//     show: true,
//     title: "Fact_NA",
//   },
//   {
//     oldT: ["instrF"],
//     newT: `The user asked for _, but BotModel recommended/provided _ . This does not follow the prompt's instructions.`,
//     caseSensitive: false,
//     show: true,
//     title: "Not follow",
//   },
//   {
//     oldT: ["lfluency"],
//     newT: `BotModel includes awkward phrasing like "_" which sounds unnatural. This should be corrected to "_"`,
//     caseSensitive: false,
//     show: true,
//     title: "LFluency",
//   },
//   {
//     oldT: ["cohj"],
//     newT: `BotModel jumps from _ to unrelated topics, making it difficult to follow. Clarifying these transitions would improve coherence.`,
//     caseSensitive: false,
//     show: true,
//     title: "Coherence",
//   },
//   {
//     oldT: ["present"],
//     newT: `BotModel provides a lot of information but lacks structure. Adding
// bullet points or bolding key details would improve readability`,
//     caseSensitive: false,
//     show: true,
//     title: "Presentation",
//   },
//   {
//     oldT: ["tonej"],
//     newT: `BotModel has The tone is too casual/formal for this formal/casual query. Adjusting to a more
// professional/casual tone would make it more appropriate.`,
//     caseSensitive: false,
//     show: true,
//     title: "Tone",
//   },
// ];

//autorepl
export const autoreplaceNum = [
  {
    oldT: ["num1"],
    newT: `BotModelauses a numbered list unnecessarily`,
    caseSensitive: false,
    show: true,
    title: "1",
  },
  {
    oldT: ["numb1"],
    newT: `BotModelauses a numbered list instead of a bulleted list`,
    caseSensitive: false,
    show: true,
    title: "1->b",
  },
  {
    oldT: ["num2"],
    newT: `BotModelb uses a numbered list unnecessarily`,
    caseSensitive: false,
    show: true,
    title: "2",
  },
  {
    oldT: ["numb2"],
    newT: `BotModelb uses a numbered list instead of a bulleted list`,
    caseSensitive: false,
    show: true,
    title: "2->b",
  },
  {
    oldT: ["num0"],
    newT: `BotModels use a numbered list unnecessarily`,
    caseSensitive: false,
    show: true,
    title: "both",
  },
  {
    oldT: ["numb0"],
    newT: `BotModels use a numbered list instead of a bulleted list`,
    caseSensitive: false,
    show: true,
    title: "both->b",
  },
];

// export const autoreplaceLoc = [
//   {
//     oldT: ["if-"],
//     newT: `BotModel  follows instructions worse and therefore has problems with truthfulness, length, structure and tone.`,
//     caseSensitive: false,
//     show: true,
//     title: "if-",
//   },
//   {
//     oldT: ["if+"],
//     newT: `BotModel  follows instructions better and therefore has fewer problems with truthfulness, length, structure and tone.`,
//     caseSensitive: false,
//     show: true,
//     title: "if+",
//   },
//   {
//     oldT: ["2if-"],
//     newT: `Both responses do not follow instructions well and therefore has problems with truthfulness, length, structure and tone.`,
//     caseSensitive: false,
//     show: true,
//     title: "2if-",
//   },
// ];

// export const autoreplaceGrammar = [
//   {
//     oldT: ["robo"],
//     newT: `BotModel sounds a bit chat-boty. For example, it is uses a phrase like ""`,
//     caseSensitive: false,
//     show: true,
//     title: "robo",
//   },
//   {
//     oldT: ["another"],
//     newT: `BotModel contains phrases written in another language (not Russian) " ".`,
//     caseSensitive: false,
//     show: true,
//     title: "foreign",
//   },
//   {
//     oldT: ["repet"],
//     newT: `BotModel contains The phrase that is often repeated, for example " ".`,
//     caseSensitive: false,
//     show: true,
//     title: "repetition",
//   },
//   {
//     oldT: ["unnatural"],
//     newT: `Some phrases in BotModel sound unnatural ("").`,
//     caseSensitive: false,
//     show: true,
//     title: "unnatural",
//   },
//   {
//     oldT: ["unnatp"],
//     newT: `The phrase "_" in BotModel sounds unnatural. It should be "_".`,
//     caseSensitive: false,
//     show: true,
//     title: "unnat.phrase",
//   },

//   {
//     oldT: ["gramar"],
//     newT: `BotModel contains grammatical errors, for example " " instead of " ".`,
//     caseSensitive: false,
//     show: true,
//     title: "gram err",
//   },
//   {
//     oldT: ["matching"],
//     newT: `BotModel uses incorrect word matching in Russian " " instead of " "`,
//     caseSensitive: false,
//     show: true,
//     title: "word matching",
//   },

//   {
//     oldT: ["punker"],
//     newT: `BotModel contains punctuation errors, for example .`,
//     caseSensitive: false,
//     show: true,
//     title: "punkt err",
//   },
//   {
//     oldT: ["dash"],
//     newT: `In BotModel the hyphen should be replaced with a dash.`,
//     caseSensitive: false,
//     show: true,
//     title: "—",
//   },
//   {
//     oldT: ["quotes"],
//     newT: `In BotModel the quotation marks should be replaced with «».`,
//     caseSensitive: false,
//     show: true,
//     title: "« »",
//   },
//   {
//     oldT: ["quotesDash"],
//     newT: `In BotModel the quotation marks should be replaced with «», and the hyphen should be replaced with a dash`,
//     caseSensitive: false,
//     show: true,
//     title: "« » —",
//   },
//   {
//     oldT: ["comma"],
//     newT: `The comma after " " is unnecessary`,
//     caseSensitive: false,
//     show: true,
//     title: "comma",
//   },

//   {
//     oldT: ["colo"],
//     newT: `By the rules of the Russian language, after the colon should be a lowercase letter.`,
//     caseSensitive: false,
//     show: true,
//     title: ":A",
//   },
//   {
//     oldT: ["coloT"],
//     newT: `No colon is needed after the title.`,
//     caseSensitive: false,
//     show: true,
//     title: "A:",
//   },
//   {
//     oldT: ["coloTL"],
//     newT: `it is better to end the paragraph before the list with a period, not a colon.`,
//     caseSensitive: false,
//     show: true,
//     title: "A:123",
//   },
// ];

// export const evals_c = [
//   {
//     newT: `BotModel has some localization issues.`,
//     title: "LC|",
//     newT: `BotModel has some localization issues.`,
//     title: "LC|",
//   },
// ];

// export const hotreplaceSuggest = [
//   {
//     oldT: ["robotic"],
//     newT: `The Response sounds a bit robotic.`,
//     caseSensitive: false,
//     show: true,
//     title: "robo",
//   },
//   {
//     oldT: ["bolding"],
//     newT: `The Response could be improved by bolding the main points of the text.`,
//     caseSensitive: false,
//     show: true,
//     title: "bolding",
//   },
//   {
//     oldT: ["you"],
//     newT: `The response sounds impolite, it uses the address "ты", in Russian it is better to use "вы".`,
//     caseSensitive: true,
//     show: true,
//     title: "ты-вы",
//   },
//   {
//     oldT: ["imperative"],
//     newT: `The response sounds impolite, it uses the imperative mood ("").`,
//     caseSensitive: false,
//     show: true,
//     title: "imperative!",
//   },
//   {
//     oldT: ["pleasantries"],
//     newT: `The response contains pleasantries in intro outro.`,
//     caseSensitive: false,
//     show: true,
//     title: "pleasantries",
//   },
//   {
//     oldT: ["unnatural"],
//     newT: `Some phrases in @Response sound unnatural ("").`,
//     caseSensitive: false,
//     show: true,
//     title: "unnatural",
//   },
//   {
//     oldT: ["rephrase"],
//     newT: `It is better to rephrase some fragments in @Response ("").`,
//     caseSensitive: false,
//     show: true,
//     title: "rephrase",
//   },
//   {
//     oldT: ["formal"],
//     newT: `The response is written in a rather formal style, it is needed to add warmth.`,
//     caseSensitive: false,
//     show: true,
//     title: "formal",
//   },
//   {
//     oldT: ["need"],
//     newT: `It is need to be `,
//     caseSensitive: false,
//     show: true,
//     title: "need",
//   },
//   {
//     oldT: ["should"],
//     newT: `It's should be ""`,
//     caseSensitive: false,
//     show: true,
//     title: "should",
//   },
// ];
export const autoReplaceToModels = [
  {
    oldT: [
      "@response a",
      "@1",
      "р1",
      "response один",
      "r1",
      "в1",
      "и1",
      "о1",
      "р1",
      "a1",
      "ответ1",
      "Ответ а",
      "Ответ a",
      "ответ 1",
      "ответ один",
      "ответа один",
      "ответа 1",
      "первый ответ",
      "answer 1",
      "answer1",
      "answer A",
      "answerA",
      "@response 1",
      "@response 1",
      "@response one",
      "response a",
      "response 1",
      "response one",
      "interation a",
      "interation 1",
      "interation one",
      "intention a",
      "intention 1",
      "intention one",
      "interaction a",
      "interaction 1",
      "interaction one",
      " 1 ",
    ],
    newT: "BotModela",
    caseSensitive: false,
  },
  {
    oldT: [
      "response два",
      "в2",
      "a2",
      "@2",
      "р2",
      "r2",
      "р2",
      "о2",
      "р2",
      "Ответ b",
      "Ответ б",
      "answer 2",
      "answer2",
      "answer B",
      "answerB",
      "ответ2",
      "ответ 2",
      "ответ два",
      "ответа два",
      "ответа 2",
      "второй ответ",
      "@response b",
      "@response 2",
      "@response2",
      "@response two",
      "response b",
      "response 2",
      "response two",
      "interation b",
      "interation 1",
      "interation two",
      "intention b",
      "intention 2",
      "intention two",
      "interaction b",
      "interaction 2",
      "interaction two",
      " 2 ",
    ],
    newT: "BotModelb",
    caseSensitive: false,
  },
  {
    oldT: ["Responses"],
    newT: "BotModels",
    caseSensitive: true,
  },
  {
    oldT: ["в0", "i0", "a0", "interactions"],
    newT: "BotModels",
    caseSensitive: false,
  },
];
// const autoReplaceExamples = [
//   {
//     oldT: [" e1 ", " п1 "],
//     newT: `EXAMPLE_A`,
//     caseSensitive: false,
//     show: true,
//   },

//   {
//     oldT: ["e2 ", "п2 "],
//     newT: `EXAMPLE_B`,
//     caseSensitive: false,
//     show: true,
//   },
// ];
// const autoReplaceInstead = [
//   {
//     oldT: ["уд1", "em1"],
//     newT: ` There is a wrong accent in BotModela: `,
//     caseSensitive: false,
//     show: true,
//   },
//   {
//     oldT: ["уд2", "em2"],
//     newT: ` There is a wrong accent in BotModelb: `,
//     caseSensitive: false,
//     show: true,
//   },
// ];
// const autoReplaceQuestionnaire = [
//   {
//     oldT: ["рои1", "rq1"],
//     newT: `The question in the questionnaire of BotModela"" marked YES NO, because`,
//     caseSensitive: false,
//     show: true,
//   },
//   {
//     oldT: ["рои2", "rq2"],
//     newT: `The question in the questionnaire of BotModelb "" marked YES NO, because`,
//     caseSensitive: false,
//     show: true,
//   },
// ];
// export const autoReplaceEval = [
//   {
//     oldT: ["=="],
//     newT: "BotModels are about the same.",
//     caseSensitive: false,
//     show: true,
//   },
//   {
//     oldT: ["12+++"],
//     newT: "BotModelais much better than BotModelb.",
//     caseSensitive: false,
//     show: true,
//   },

//   {
//     oldT: ["21+++"],
//     newT: "BotModelb is much better than BotModela.",
//     caseSensitive: false,
//     show: true,
//   },
//   {
//     oldT: ["12++"],
//     newT: "BotModelais better than BotModelb.",
//     caseSensitive: false,
//     show: true,
//   },
//   {
//     oldT: ["21++"],
//     newT: "BotModelb is better than BotModela.",
//     caseSensitive: false,
//     show: true,
//   },

//   {
//     oldT: ["21+"],
//     newT: "BotModelb is slightly better than BotModela.",
//     caseSensitive: false,
//     show: true,
//   },

//   {
//     oldT: ["12+"],
//     newT: "BotModelais slightly better than BotModelb.",
//     caseSensitive: false,
//     show: true,
//   },
//   {
//     oldT: ["1+++"],
//     newT: "BotModelais much better.",
//     caseSensitive: false,
//     show: true,
//   },
//   {
//     oldT: ["2+++"],
//     newT: "BotModelb is much better.",
//     caseSensitive: false,
//     show: true,
//   },
//   {
//     oldT: ["1++"],
//     newT: "BotModelais better.",
//     caseSensitive: false,
//     show: true,
//   },
//   {
//     oldT: ["2++"],
//     newT: "BotModelb is better.",
//     caseSensitive: false,
//     show: true,
//   },
//   {
//     oldT: ["1+"],
//     newT: "BotModelais slightly better.",
//     caseSensitive: false,
//     show: true,
//   },

//   {
//     oldT: ["2+"],
//     newT: "BotModelb is slightly better.",
//     caseSensitive: false,
//     show: true,
//   },
// ];
const autoReplaceModels = [
  {
    oldT: ["22"],
    newT: `both BotModels`,
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["m1 ", "м1 "],
    newT: "the model in BotModela",
    caseSensitive: false,
  },
  {
    oldT: ["m2 ", "м2 "],
    newT: "the model in BotModelb",
    caseSensitive: false,
    show: true,
  },
];
const autoReplaceWords = [
  {
    oldT: ["согласна"],
    newT: "согласно",
    caseSensitive: false,
  },
  {
    oldT: ["russian"],
    newT: "Russian",
    caseSensitive: true,
  },
  {
    oldT: ["спам", "спан"],
    newT: "span",
    caseSensitive: false,
  },

  {
    oldT: ["википедия"],
    newT: "Википедия",
    caseSensitive: true,
  },
  {
    oldT: ["википедии"],
    newT: "Википедии",
    caseSensitive: true,
  },
  {
    oldT: ["respondent"],
    newT: "response ",
    caseSensitive: false,
  },
];
export const replacementsGeneral = [
  ...autoReplaceToModels,
  ...autoreplaceNum,
  // ...autoReplaceExamples,
  // ...autoReplaceInstead,
  // ...autoReplaceQuestionnaire,
  // ...autoReplaceEval,
  ...autoReplaceModels,
  ...autoReplaceWords,
  ...autoReplaceToModels,
];
//replacement for special responses names type
export const replacementsInteractions = [
  { oldT: ["BotModela"], newT: "Interaction A", caseSensitive: false },
  { oldT: ["BotModelb"], newT: "Interaction B", caseSensitive: false },
  { oldT: ["the answer"], newT: "response", caseSensitive: false },
  { oldT: ["Responses"], newT: "Interactions", caseSensitive: true },
  { oldT: ["Botmodel"], newT: "Interaction", caseSensitive: true },
  {
    oldT: ["answers"],
    newT: "responses",
    caseSensitive: true,
  },
  {
    oldT: ["Answers"],
    newT: "Responses",
    caseSensitive: true,
  },
];
export const replacementsResponses = [
  { oldT: ["BotModela"], newT: "Response A", caseSensitive: false },
  { oldT: ["BotModelb"], newT: "Response B", caseSensitive: false },
  { oldT: ["BotModel, botmodel"], newT: "The Response", caseSensitive: false },
  {
    oldT: ["the answer", "Botmodel"],
    newT: "the response",
    caseSensitive: false,
  },
  {
    oldT: ["answers"],
    newT: "responses",
    caseSensitive: true,
  },
  {
    oldT: ["Answers"],
    newT: "Responses",
    caseSensitive: true,
  },
];
export const replacementsResponsesNum = [
  { oldT: ["BotModela"], newT: "@Response 1", caseSensitive: false },
  { oldT: ["BotModelb"], newT: "@Response 2", caseSensitive: false },
  { oldT: ["BotModels"], newT: "Responses", caseSensitive: false },
  { oldT: ["BotModel"], newT: "the response", caseSensitive: false },
  {
    oldT: ["the answer", "Botmodel"],
    newT: "the response",
    caseSensitive: false,
  },
  {
    oldT: ["answers"],
    newT: "responses",
    caseSensitive: true,
  },
  {
    oldT: ["Answers"],
    newT: "Responses",
    caseSensitive: true,
  },
  {
    oldT: ["@@"],
    newT: "@",
    caseSensitive: false,
  },
];
export const replacementsResponsesNumShort = [
  { oldT: ["BotModela"], newT: "@R1", caseSensitive: false },
  { oldT: ["BotModelb"], newT: "@R2", caseSensitive: false },
  { oldT: ["BotModels"], newT: "Responses", caseSensitive: false },
  { oldT: ["BotModel"], newT: "the response", caseSensitive: false },
  {
    oldT: ["the answer", "Botmodel"],
    newT: "the response",
    caseSensitive: false,
  },
  {
    oldT: ["answers"],
    newT: "responses",
    caseSensitive: true,
  },
  {
    oldT: ["Answers"],
    newT: "Responses",
    caseSensitive: true,
  },
  {
    oldT: ["@@"],
    newT: "@",
    caseSensitive: false,
  },
];
export const replacementsResponsesNum2 = [
  { oldT: ["BotModela"], newT: "Response 1", caseSensitive: false },
  { oldT: ["BotModelb"], newT: "Response 2", caseSensitive: false },
  { oldT: ["BotModels"], newT: "Responses", caseSensitive: false },
  { oldT: ["BotModel"], newT: "The response", caseSensitive: false },
  {
    oldT: ["the answer", "Botmodel"],
    newT: "the response",
    caseSensitive: false,
  },
  {
    oldT: ["answers"],
    newT: "responses",
    caseSensitive: true,
  },
  {
    oldT: ["Answers"],
    newT: "Responses",
    caseSensitive: true,
  },
];
export const replacementsPunctuation = [
  {
    oldT: [" запятая"],
    newT: `,`,
    caseSensitive: false,
    show: true,
  },
  {
    oldT: [" к1", " k1"],
    newT: `"`,
    caseSensitive: false,
    show: true,
  },
  {
    oldT: [" к2", " k2"],
    newT: `"`,
    caseSensitive: false,
    show: true,
  },
  {
    oldT: [" точка"],
    newT: `.`,
    caseSensitive: false,
    show: true,
  },
  {
    oldT: [" кавычка"],
    newT: `"`,
    caseSensitive: false,
    show: true,
  },
];
