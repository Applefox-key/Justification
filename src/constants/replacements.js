export const autoreplaceNum = [
  {
    oldT: ["num1"],
    newT: `BotModel A uses a numbered list unnecessarily`,
    caseSensitive: false,
    show: true,
    title: "1",
  },
  {
    oldT: ["numb1"],
    newT: `BotModel A uses a numbered list instead of a bulleted list`,
    caseSensitive: false,
    show: true,
    title: "1->b",
  },
  {
    oldT: ["num2"],
    newT: `BotModel B uses a numbered list unnecessarily`,
    caseSensitive: false,
    show: true,
    title: "2",
  },
  {
    oldT: ["numb2"],
    newT: `BotModel B uses a numbered list instead of a bulleted list`,
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
export const autoreplaceDash = [
  {
    oldT: ["dash1"],
    newT: `In BotModel A  the hyphen should be replaced with a dash.`,
    caseSensitive: false,
    show: true,
    title: "-1",
  },
  {
    oldT: ["dash2"],
    newT: `In BotModel B  the hyphen should be replaced with a dash.`,
    caseSensitive: false,
    show: true,
    title: "-2",
  },
  {
    oldT: ["dash2"],
    newT: `In both responses the hyphen should be replaced with a dash.`,
    caseSensitive: false,
    show: true,
    title: "-both",
  },
  {
    oldT: ["quotes1"],
    newT: `In BotModel A the quotation marks should be replaced with «».`,
    caseSensitive: false,
    show: true,
    title: "«1»",
  },
  {
    oldT: ["quotes2"],
    newT: `In BotModel B the quotation marks should be replaced with «».`,
    caseSensitive: false,
    show: true,
    title: "«2»",
  },
  {
    oldT: ["quotes1"],
    newT: `In both responses the quotation marks should be replaced with «».`,
    caseSensitive: false,
    show: true,
    title: "«both» ",
  },
  {
    oldT: ["dash1"],
    newT: `In BotModel A  the hyphen should be replaced with a dash and the quotation marks should be replaced with «».`,
    caseSensitive: false,
    show: true,
    title: "-«1»",
  },
  {
    oldT: ["dash1"],
    newT: `In BotModel B  the hyphen should be replaced with a dash and the quotation marks should be replaced with «».`,
    caseSensitive: false,
    show: true,
    title: "-«2»",
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
    caseSensitive: false,
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
      "ответ1",
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
    newT: "BotModel A",
    caseSensitive: false,
  },
  {
    oldT: [
      "response два",
      "в2",
      "@2",
      "р2",
      "r2",
      "р2",
      "о2",
      "р2",
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
    newT: "BotModel B",
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
    newT: ` There is a wrong accent in BotModel A: `,
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["уд2", "em2"],
    newT: ` There is a wrong accent in BotModel B: `,
    caseSensitive: false,
    show: true,
  },
];
const autoReplaceQuestionnaire = [
  {
    oldT: ["рои1", "rq1"],
    newT: `The question in the questionnaire of BotModel A "" marked YES NO, because`,
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["рои2", "rq2"],
    newT: `The question in the questionnaire of BotModel B "" marked YES NO, because`,
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
    newT: "BotModel A is much better than BotModel B.",
    caseSensitive: false,
    show: true,
  },

  {
    oldT: ["21+++"],
    newT: "BotModel B is much better than BotModel A.",
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["12++"],
    newT: "BotModel A is better than BotModel B.",
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["21++"],
    newT: "BotModel B is better than BotModel A.",
    caseSensitive: false,
    show: true,
  },

  {
    oldT: ["21+"],
    newT: "BotModel B is slightly better than BotModel A.",
    caseSensitive: false,
    show: true,
  },

  {
    oldT: ["12+"],
    newT: "BotModel A is slightly better than BotModel B.",
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["1+++"],
    newT: "BotModel A is much better.",
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["2+++"],
    newT: "BotModel B is much better.",
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["1++"],
    newT: "BotModel A is better.",
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["2++"],
    newT: "BotModel B is better.",
    caseSensitive: false,
    show: true,
  },
  {
    oldT: ["1+"],
    newT: "BotModel A is slightly better.",
    caseSensitive: false,
    show: true,
  },

  {
    oldT: ["2+"],
    newT: "BotModel B is slightly better.",
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
    newT: "the model in BotModel A",
    caseSensitive: false,
  },
  {
    oldT: ["m2 ", "м2 "],
    newT: "the model in BotModel B",
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
  { oldT: ["BotModel"], newT: "Interaction", caseSensitive: false },
  { oldT: ["the answer"], newT: "response", caseSensitive: false },
  { oldT: ["Responses"], newT: "Interactions", caseSensitive: true },
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
  { oldT: ["BotModel"], newT: "Response", caseSensitive: false },
  { oldT: ["the answer"], newT: "response", caseSensitive: false },
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
  { oldT: ["BotModel A"], newT: "@Response 1", caseSensitive: false },
  { oldT: ["BotModel B"], newT: "@Response 2", caseSensitive: false },
  { oldT: ["BotModels"], newT: "Responses", caseSensitive: false },
  { oldT: ["the answer"], newT: "response", caseSensitive: false },
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
