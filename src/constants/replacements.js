export const baseRespName = {
  "INT": { R1: "Interaction 1", R2: "Interaction 1" },
  "@R": { R1: "@Response 1", R2: "@Response 1" },
  "RAB": { R1: "Response A", R2: "Response B" },
};

export const replacementsEnding = [
  [["resa", "respa", "куыф", "отв1", "респ1"], "Response A"],
  [["ress"], "responses"],
  [["bres"], "Both responses"],
  [["num"], "The response uses a numbered list unnecessarily."],
  [["куыи", "отв2", "resb", "респ2"], "Response B"],
  [["resp"], "Response"],
  [["iss"], "issue"],
  [["--"], "—"],
  [["кк", "rr", "qq"], "«»"],
  [
    ["refr"],
    `It is better to rephrase some fragments in the response since it sounds unnatural (" ").`,
  ],
];
//hot list
export const autoreplaceFormat = [
  {
    oldT: ["num"],
    newT: `BotModel uses a numbered list unnecessarily`,
    caseSensitive: false,
    show: true,
    title: "num list",
  },
  {
    oldT: ["numbul"],
    newT: `BotModel uses a numbered list instead of a bulleted list`,
    caseSensitive: false,
    show: true,
    title: "num instead bull",
  },
  {
    oldT: ["listru"],
    newT: `The list should be reformatted, to avoid unnecessary punctuation marks.`,
    caseSensitive: false,
    show: true,
    title: "list rules",
  },

  {
    oldT: ["bolding"],
    newT: `BotModel could be improved by bolding the main points of the text.`,
    caseSensitive: false,
    show: true,
    title: "bolding",
  },
  {
    oldT: ["listA"],
    newT: `The list must be rearranged in accordance with the rules of the Russian language, after the colon should be a small letter. Although you may have noticed a capital letter after the colon in the instructions, this is correct  for the English language, not for Russian.`,
    caseSensitive: false,
    show: true,
    title: ": Aa",
  },
];
export const hotReplaceTone = [
  {
    oldT: ["robotic"],
    newT: `BotModel sounds a bit chat-boty. For example, it is uses a phrase like ""`,
    caseSensitive: false,
    show: true,
    title: "robo",
  },
  {
    oldT: ["preachy"],
    newT: `BotModel sounds slightly preachy. For example, it is uses a phrase like ""`,
    caseSensitive: false,
    show: true,
    title: "preachy",
  },
  {
    oldT: ["you"],
    newT: `BotModel sounds impolite, it uses the pronoun "ты" when addressing the user, in Russian it is better to use "вы".`,
    caseSensitive: false,
    show: true,
    title: "ты-вы",
  },
  {
    oldT: ["imperative"],
    newT: `BotModel sounds impolite, it uses the imperative mood ("").`,
    caseSensitive: false,
    show: true,
    title: "imperative!",
  },
  {
    oldT: ["pleasantries"],
    newT: `BotModel contains pleasantries in intro outro.`,
    caseSensitive: false,
    show: true,
    title: "pleasantries",
  },
  {
    oldT: ["unnatural"],
    newT: `Some phrases in BotModel sound unnatural ("").`,
    caseSensitive: false,
    show: true,
    title: "unnatural",
  },
  {
    oldT: ["formal"],
    newT: `Bot Model is written in a rather formal style, and  is better to add warmth. For example, it is uses a phrase like ""`,
    caseSensitive: false,
    show: true,
    title: "formal",
  },
  {
    oldT: ["Exclamation"],
    newT: `Exclamation marks need to be removed.`,
    caseSensitive: false,
    show: true,
    title: "!",
  },
  {
    oldT: ["introP"],
    newT: `According to the instructions, the response must contain a friendly intro and outro, they should be added.`,
    caseSensitive: false,
    show: true,
    title: "add intro/outro",
  },
  {
    oldT: ["intro"],
    newT: `The introduction and conclusion should be rewritten in a friendly tone, avoiding pleasantries.`,
    caseSensitive: false,
    show: true,
    title: "rewrite intro/outro",
  },
];
export const hotReplaceIssues = [
  {
    oldT: ["truth"],
    newT: `BotModel has issues with truthfulness.`,
    caseSensitive: false,
    show: true,
    title: "Truthfulness",
  },
  {
    oldT: ["fact"],
    newT: `BotModel has issues with Factuality.`,
    caseSensitive: false,
    show: true,
    title: "Factuality",
  },
  {
    oldT: ["instr"],
    newT: `BotModel does not follow  the instructions.`,
    caseSensitive: false,
    show: true,
    title: "Instructions",
  },
  {
    oldT: ["present"],
    newT: `BotModel has issues with Presentation.`,
    caseSensitive: false,
    show: true,
    title: "Presentation",
  },
  {
    oldT: ["fluency"],
    newT: `BotModel has issues with Language Fluency.`,
    caseSensitive: false,
    show: true,
    title: "Fluency",
  },
];
export const hotReplaceJustif = [
  {
    oldT: ["Inaccurate"],
    newT: `BotModel inaccurately claims that __ when in fact it's _. Correcting this fact inproves the accuracy of the response.`,
    caseSensitive: false,
    show: true,
    title: "Inaccurate",
  },
  {
    oldT: ["fact"],
    newT: `BotModel has issues with Factuality.`,
    caseSensitive: false,
    show: true,
    title: "Factuality",
  },
  {
    oldT: ["instrF"],
    newT: `The user asked for _, but BotModel recommended/provided _ . This does not follow the prompt's instructions.`,
    caseSensitive: false,
    show: true,
    title: "Not follow",
  },
  {
    oldT: ["lfluency"],
    newT: `BotModel includes awkward phrasing like "_" which sounds unnatural. This should be corrected to "_"`,
    caseSensitive: false,
    show: true,
    title: "LFluency",
  },
  {
    oldT: ["cohj"],
    newT: `BotModel jumps from _ to unrelated topics, making it difficult to follow. Clarifying these transitions would improve coherence.`,
    caseSensitive: false,
    show: true,
    title: "Coherence",
  },
  {
    oldT: ["present"],
    newT: `BotModel provides a lot of information but lacks structure. Adding
bullet points or bolding key details would improve readability`,
    caseSensitive: false,
    show: true,
    title: "Presentation",
  },
  {
    oldT: ["tonej"],
    newT: `BotModel has The tone is too casual/formal for this formal/casual query. Adjusting to a more
professional/casual tone would make it more appropriate.`,
    caseSensitive: false,
    show: true,
    title: "Tone",
  },
];
export const hotReplaceSuggestion = [
  {
    oldT: ["rephrase"],
    newT: `It is better to rephrase some fragments in BotModel ("").`,
    caseSensitive: false,
    show: true,
    title: "rephrase",
  },
  {
    oldT: ["need"],
    newT: `It is need to be `,
    caseSensitive: false,
    show: true,
    title: "need",
  },
  {
    oldT: ["should"],
    newT: `It's should be ""`,
    caseSensitive: false,
    show: true,
    title: "should",
  },
  {
    oldT: ["better"],
    newT: `It is better to in BotModel ("").`,
    caseSensitive: false,
    show: true,
    title: "better",
  },
];
export const hotReplaceTmp = [
  {
    oldT: ["sbs"],
    newT: `Response is slightly much better than Response /@Response 1 and @Response 2 are about the same.
@Response 1
@Response 2
Both`,
    caseSensitive: false,
    show: true,
    title: "SBS",
  },
  {
    oldT: ["turns"],
    newT: `Prompt:

    Turn1:

    Turn2:

    Turn3:

    Turn4:
    `,
    caseSensitive: false,
    show: true,
    title: "TURNS",
  },
  {
    oldT: ["dim"],
    newT: `BotModel does not follow user's instruction.

   BotModel has issues with language fluency.

   BotModel has issues with coherence.

   BotModel is not accurate.

   BotModel has issues with presentation.

   BotModel has issues with tone.

    `,
    caseSensitive: false,
    show: true,
    title: "DIMENTIONS",
  },
  {
    oldT: ["dims"],
    newT: `IF LF C F P T `,
    caseSensitive: false,
    show: true,
    title: "dim short",
  },
  {
    oldT: ["turns"],
    newT: `For comparison @Response 1: ;@Response 2: `,
    caseSensitive: false,
    show: true,
    title: "comparison",
  },
  {
    oldT: ["example"],
    newT: `For example, `,
    caseSensitive: false,
    show: true,
    title: "example",
  },
];
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
export const autoreplaceGrammar = [
  {
    oldT: ["dash"],
    newT: `In BotModel the hyphen should be replaced with a dash.`,
    caseSensitive: false,
    show: true,
    title: "—",
  },
  {
    oldT: ["quotes"],
    newT: `In BotModel the quotation marks should be replaced with «».`,
    caseSensitive: false,
    show: true,
    title: "« »",
  },
  {
    oldT: ["quotesDash"],
    newT: `In BotModel the quotation marks should be replaced with «», and the hyphen should be replaced with a dash`,
    caseSensitive: false,
    show: true,
    title: "« » —",
  },
  {
    oldT: ["comma"],
    newT: `The comma after " " is unnecessary`,
    caseSensitive: false,
    show: true,
    title: "comma",
  },
  {
    oldT: ["matching"],
    newT: `BotModel uses incorrect word matching in Russian " " instead of " "`,
    caseSensitive: false,
    show: true,
    title: "word matching",
  },
  {
    oldT: ["gramer"],
    newT: `BotModel contains grammatical errors, for example " " instead of " ".`,
    caseSensitive: false,
    show: true,
    title: "gram err",
  },
  {
    oldT: ["repet"],
    newT: `BotModel contains The phrase that is often repeated, for example " ".`,
    caseSensitive: false,
    show: true,
    title: "repetition",
  },
  {
    oldT: ["unnatp"],
    newT: `The phrase "_" in BotModel sounds unnatural. It should be "_".`,
    caseSensitive: false,
    show: true,
    title: "unnat.phrase",
  },
  {
    oldT: ["another"],
    newT: `BotModel contains phrases written in another language (not Russian) " ".`,
    caseSensitive: false,
    show: true,
    title: "foreign",
  },
  {
    oldT: ["colo"],
    newT: `By the rules of the Russian language, after the colon should be a lowercase letter.`,
    caseSensitive: false,
    show: true,
    title: ":A",
  },
  {
    oldT: ["coloT"],
    newT: `No colon is needed after the title.`,
    caseSensitive: false,
    show: true,
    title: "A:",
  },
  {
    oldT: ["coloTL"],
    newT: `it is better to end the paragraph before the list with a period, not a colon.`,
    caseSensitive: false,
    show: true,
    title: "A:123",
  },
  {
    oldT: ["punker"],
    newT: `BotModel contains punctuation errors, for example .`,
    caseSensitive: false,
    show: true,
    title: "punkt err",
  },
];
export const hotReplaceRewiew = [
  {
    oldT: ["disagree"],
    newT: `I disagree with the choice of the best answer.`,
    caseSensitive: false,
    show: true,
    title: "disagree",
  },
  {
    oldT: ["constraints"],
    newT: `There is an insufficient number of constraints in the prompt`,
    caseSensitive: false,
    show: true,
    title: "constraints",
  },
  {
    oldT: ["constraints"],
    newT: `The introduction and conclusion have been finalized.`,
    caseSensitive: false,
    show: true,
    title: "redo itro outro",
  },
  {
    oldT: ["formal"],
    newT: `According to the instructions, phrases with emotional overtones (exclamation marks) such as " " are considered pleasantries.`,
    caseSensitive: false,
    show: true,
    title: "pleasantries",
  },
  {
    oldT: ["bothg"],
    newT: `Both responses are good enough. According to the instructions, in the first turn, at least one Response must Be really bad, for example in terms of fact or following instructions, but a bad presentation is not enough to consider a Response As bad. Therefore, the task was redone.`,
    caseSensitive: false,
    show: true,
    title: "both good",
  },
];
export const hotreplaceSuggest = [
  {
    oldT: ["robotic"],
    newT: `The Response sounds a bit robotic.`,
    caseSensitive: false,
    show: true,
    title: "robo",
  },
  {
    oldT: ["bolding"],
    newT: `The Response could be improved by bolding the main points of the text.`,
    caseSensitive: false,
    show: true,
    title: "bolding",
  },
  {
    oldT: ["you"],
    newT: `The response sounds impolite, it uses the address "ты", in Russian it is better to use "вы".`,
    caseSensitive: true,
    show: true,
    title: "ты-вы",
  },
  {
    oldT: ["imperative"],
    newT: `The response sounds impolite, it uses the imperative mood ("").`,
    caseSensitive: false,
    show: true,
    title: "imperative!",
  },
  {
    oldT: ["pleasantries"],
    newT: `The response contains pleasantries in intro outro.`,
    caseSensitive: false,
    show: true,
    title: "pleasantries",
  },
  {
    oldT: ["unnatural"],
    newT: `Some phrases in @Response sound unnatural ("").`,
    caseSensitive: false,
    show: true,
    title: "unnatural",
  },
  {
    oldT: ["rephrase"],
    newT: `It is better to rephrase some fragments in @Response ("").`,
    caseSensitive: false,
    show: true,
    title: "rephrase",
  },
  {
    oldT: ["formal"],
    newT: `The response is written in a rather formal style, it is needed to add warmth.`,
    caseSensitive: false,
    show: true,
    title: "formal",
  },
  {
    oldT: ["need"],
    newT: `It is need to be `,
    caseSensitive: false,
    show: true,
    title: "need",
  },
  {
    oldT: ["should"],
    newT: `It's should be ""`,
    caseSensitive: false,
    show: true,
    title: "should",
  },
];
const autoReplaceToModels = [
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
const autoReplaceExamples = [
  {
    oldT: [" e1 ", " п1 "],
    newT: `EXAMPLE_A`,
    caseSensitive: false,
    show: true,
  },

  {
    oldT: ["e2 ", "п2 "],
    newT: `EXAMPLE_B`,
    caseSensitive: false,
    show: true,
  },
];
const autoReplaceInstead = [
  {
    oldT: ["уд1", "em1"],
    newT: ` There is a wrong accent in BotModela: `,
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["уд2", "em2"],
    newT: ` There is a wrong accent in BotModelb: `,
    caseSensitive: false,
    show: true,
  },
];
const autoReplaceQuestionnaire = [
  {
    oldT: ["рои1", "rq1"],
    newT: `The question in the questionnaire of BotModela"" marked YES NO, because`,
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["рои2", "rq2"],
    newT: `The question in the questionnaire of BotModelb "" marked YES NO, because`,
    caseSensitive: false,
    show: true,
  },
];
export const autoReplaceEval = [
  {
    oldT: ["=="],
    newT: "BotModels are about the same.",
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["12+++"],
    newT: "BotModelais much better than BotModelb.",
    caseSensitive: false,
    show: true,
  },

  {
    oldT: ["21+++"],
    newT: "BotModelb is much better than BotModela.",
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["12++"],
    newT: "BotModelais better than BotModelb.",
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["21++"],
    newT: "BotModelb is better than BotModela.",
    caseSensitive: false,
    show: true,
  },

  {
    oldT: ["21+"],
    newT: "BotModelb is slightly better than BotModela.",
    caseSensitive: false,
    show: true,
  },

  {
    oldT: ["12+"],
    newT: "BotModelais slightly better than BotModelb.",
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["1+++"],
    newT: "BotModelais much better.",
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["2+++"],
    newT: "BotModelb is much better.",
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["1++"],
    newT: "BotModelais better.",
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["2++"],
    newT: "BotModelb is better.",
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["1+"],
    newT: "BotModelais slightly better.",
    caseSensitive: false,
    show: true,
  },

  {
    oldT: ["2+"],
    newT: "BotModelb is slightly better.",
    caseSensitive: false,
    show: true,
  },
];
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
    oldT: ["respondent "],
    newT: "response ",
    caseSensitive: false,
  },
];
export const replacementsGeneral = [
  ...autoReplaceToModels,
  ...autoreplaceNum,
  ...autoReplaceExamples,
  ...autoReplaceInstead,
  ...autoReplaceQuestionnaire,
  ...autoReplaceEval,
  ...autoReplaceModels,
  ...autoReplaceWords,
  ...autoReplaceToModels,
];
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
  {
    oldT: ["@@"],
    newT: "@",
    caseSensitive: false,
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
    oldT: [" точка"],
    newT: `.`,
    caseSensitive: false,
    show: true,
  },
];
