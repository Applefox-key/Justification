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
    oldT: ["formal"],
    newT: `BotModel is written in a rather formal style, and  is better to add warmth. For example, it is uses a phrase like ""`,
    caseSensitive: false,
    show: true,
    title: "formal",
  },
  {
    oldT: ["pleasantries"],
    newT: `BotModel contains pleasantries in intro and outro.`,
    caseSensitive: false,
    show: true,
    title: "pleasantries",
  },
  {
    oldT: ["Exclamation"],
    newT: `BotModel contains unnecessary exclamation marks.`,
    caseSensitive: false,
    show: true,
    title: "!",
  },
  {
    oldT: ["ExclamationRem"],
    newT: `Exclamation marks need to be removed.`,
    caseSensitive: false,
    show: true,
    title: "x!",
  },
  {
    oldT: ["introP"],
    newT: `BotModel lacks a friendly introduction and conclusion, they should be added.`,
    caseSensitive: false,
    show: true,
    title: "add intro/outro",
  },
  {
    oldT: ["introP"],
    newT: `A friendly intro and outro should be added.`,
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
    oldT: ["factna"],
    newT: `Since the text is the model's reflections on ethical topics there is no unambiguously factually correct and incorrect information here so the rating is chosen as non applicable.`,
    caseSensitive: false,
    show: true,
    title: "Fact_NA",
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
export const hotReplaceJustifSBS = [
  {
    oldT: ["Inaccurate"],
    newT: `Sinse BotModel is more accurate.`,
    caseSensitive: false,
    show: true,
    title: "Inaccurate",
  },
  {
    oldT: ["fact"],
    newT: `Since BotModel has issues with Factuality.`,
    caseSensitive: false,
    show: true,
    title: "Factuality",
  },
  {
    oldT: ["factna"],
    newT: `Since the text is the model's reflections on ethical topics there is no unambiguously factually correct and incorrect information here so the rating is chosen as non applicable.`,
    caseSensitive: false,
    show: true,
    title: "Fact_NA",
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
  {
    oldT: ["chat"],
    newT: `это правда? если нет - то напиши где ошибка, но не предлагай улучшить или дополнить, если факты верны`,
    caseSensitive: false,
    show: true,
    title: "chat",
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
    oldT: ["robo"],
    newT: `BotModel sounds a bit chat-boty. For example, it is uses a phrase like ""`,
    caseSensitive: false,
    show: true,
    title: "robo",
  },
  {
    oldT: ["another"],
    newT: `BotModel contains phrases written in another language (not Russian) " ".`,
    caseSensitive: false,
    show: true,
    title: "foreign",
  },
  {
    oldT: ["repet"],
    newT: `BotModel contains The phrase that is often repeated, for example " ".`,
    caseSensitive: false,
    show: true,
    title: "repetition",
  },
  {
    oldT: ["unnatural"],
    newT: `Some phrases in BotModel sound unnatural ("").`,
    caseSensitive: false,
    show: true,
    title: "unnatural",
  },
  {
    oldT: ["unnatp"],
    newT: `The phrase "_" in BotModel sounds unnatural. It should be "_".`,
    caseSensitive: false,
    show: true,
    title: "unnat.phrase",
  },

  {
    oldT: ["gramar"],
    newT: `BotModel contains grammatical errors, for example " " instead of " ".`,
    caseSensitive: false,
    show: true,
    title: "gram err",
  },
  {
    oldT: ["matching"],
    newT: `BotModel uses incorrect word matching in Russian " " instead of " "`,
    caseSensitive: false,
    show: true,
    title: "word matching",
  },

  {
    oldT: ["punker"],
    newT: `BotModel contains punctuation errors, for example .`,
    caseSensitive: false,
    show: true,
    title: "punkt err",
  },
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
];
export const autoreplaceRub = [
  {
    oldT: ["robo"],
    newT: `BotModel sounds a bit chat-boty. For example, it is uses a phrase like ""`,
    caseSensitive: false,
    show: true,
    title: "robo",
  },
  {
    oldT: ["eval5"],
    newT: `BotModel is fully consistent with the user's prompt. There are no issues.`,
    caseSensitive: false,
    show: true,
    title: "5",
  },
  {
    oldT: ["lfi"],
    newT: `BotModel has some language fluency issues.`,
    caseSensitive: false,
    show: true,
    title: "LFi",
  },
  {
    oldT: ["another"],
    newT: `BotModel contains phrases written in another language (not Russian): " ".`,
    caseSensitive: false,
    show: true,
    title: "foreign",
  },

  {
    oldT: ["unnatural"],
    newT: `Some phrases in BotModel sound unnatural:`,
    caseSensitive: false,
    show: true,
    title: "unnat",
  },
  {
    oldT: ["unnatp"],
    newT: `The phrase "_" in BotModel sounds unnatural. It should be "_".`,
    caseSensitive: false,
    show: true,
    title: "unnat-1",
  },

  {
    oldT: ["gramer"],
    newT: `BotModel contains grammatical errors, for example " " instead of " ".`,
    caseSensitive: false,
    show: true,
    title: "gram err",
  },
  {
    oldT: ["matching"],
    newT: `BotModel uses incorrect word matching in Russian " " instead of " "`,
    caseSensitive: false,
    show: true,
    title: "word matching",
  },

  {
    oldT: ["punker"],
    newT: `BotModel contains punctuation errors, for example .`,
    caseSensitive: false,
    show: true,
    title: "punkt err",
  },
  {
    oldT: ["orter"],
    newT: `BotModel contains orthography errors, for example .`,
    caseSensitive: false,
    show: true,
    title: "ort err",
  },
  {
    oldT: ["punort"],
    newT: `BotModel contains punctuation and orthography errors.`,
    caseSensitive: false,
    show: true,
    title: "PO",
  },
  // {
  //   oldT: ["orter"],
  //   newT: `BotModel contains orthography errors, for example .`,
  //   caseSensitive: false,
  //   show: true,
  //   title: "ort err",
  // },
  {
    oldT: ["dash"],
    newT: `BotModel uses a hyphen instead of a dash.`,
    caseSensitive: false,
    show: true,
    title: "—",
  },
  {
    oldT: ["quotes"],
    newT: `BotModel uses quotation marks "" instead of «».`,
    caseSensitive: false,
    show: true,
    title: "« »",
  },
  {
    oldT: ["quotes2"],
    newT: `BotModel uses quotation marks "" instead of «» and '' instead of "".`,
    caseSensitive: false,
    show: true,
    title: `«»""`,
  },
  {
    oldT: ["quotesDash"],
    newT: `In BotModel the quotation marks "" instead of «», and the hyphen instead of a dash`,
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
    oldT: ["colo"],
    newT: `BotModel uses uppercase after the colon (for example, “ …”). In this case, by the rules of the Russian language, after the colon should be a lowercase letter.`,
    caseSensitive: false,
    show: true,
    title: ":A",
  },
  {
    oldT: ["coloT"],
    newT: `BotModel uses colon after the titles. No colon is needed after the title by the rules of the Russian language.`,
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
    oldT: ["coml"],
    newT: `The lists are formatted incorrectly in the response. According to the rules of the Russian language, a comma, a semicolon, or a period is placed after the elements of the list.`,
    caseSensitive: false,
    show: true,
    title: "-.;,",
  },
  {
    oldT: ["comlr"],
    newT: `In this case, since the list items do not represent a sentence, it is better to write them with a small letter and use a comma for all but the last item — use a period for it.`,
    caseSensitive: false,
    show: true,
    title: `-a,-b.`,
  },
  {
    oldT: ["qp"],
    newT: `The period at the end of sentences should be placed outside the closing bracket according to the rules of the Russian language.`,
    caseSensitive: false,
    show: true,
    title: `).`,
  },
  {
    oldT: ["qp"],
    newT: `The period at the end of sentences should be placed outside the closing quotation mark according to the rules of the Russian language.`,
    caseSensitive: false,
    show: true,
    title: `».`,
  },
];
// export const evals_c = [
//   {
//     newT: `BotModel has some localization issues.`,
//     title: "LC|",
//     newT: `BotModel has some localization issues.`,
//     title: "LC|",
//   },
// ];
export const autoreplaceLoc = [
  {
    oldT: ["loc"],
    newT: `BotModel has some localization issues.`,
    caseSensitive: false,
    show: true,
    title: "LC|",
  },
  {
    oldT: ["robo"],
    newT: `BotModel sounds a bit chat-boty. For example, it is uses a phrase like ""`,
    caseSensitive: false,
    show: true,
    title: "LC_robo",
  },
  {
    oldT: ["mach"],
    newT: `BotModel sounds like machine translation. For example, it is uses a phrase like ""`,
    caseSensitive: false,
    show: true,
    title: "LC_mach",
  },
  {
    oldT: ["nos"],
    newT: `A lot of sentences don't make sense in BotModel. For example: `,
    caseSensitive: false,
    show: true,
    title: "LC_sence",
  },
  {
    oldT: ["another"],
    newT: `BotModel contains phrases written in another language (not Russian): " ".`,
    caseSensitive: false,
    show: true,
    title: "LC_foreign",
  },

  {
    oldT: ["unnatural"],
    newT: `Some phrases in BotModel sound unnatural:`,
    caseSensitive: false,
    show: true,
    title: "LC_un",
  },
  {
    oldT: ["unnatp"],
    newT: `The phrase "_" in BotModel sounds unnatural. It should be "_".`,
    caseSensitive: false,
    show: true,
    title: "LC_un-1",
  },

  {
    oldT: ["pron"],
    newT: `BotModel sounds impolite, it uses the pronoun "ты" when addressing the user, in Russian it is better to use "вы". For example: `,
    caseSensitive: false,
    show: true,
    title: "LC_ТЫ",
  },
  {
    oldT: ["gramer"],
    newT: `BotModel contains grammatical errors, for example " " instead of " ".`,
    caseSensitive: false,
    show: true,
    title: "LC_gram err",
  },
  {
    oldT: ["matching"],
    newT: `BotModel uses incorrect word matching in Russian " " instead of " "`,
    caseSensitive: false,
    show: true,
    title: "LC_w-match",
  },

  {
    oldT: ["IFI"],
    newT: `BotModel has instruction following issues.`,
    caseSensitive: false,
    show: true,
    title: "IF",
  },
  {
    oldT: ["if1"],
    newT: `Since BotModel consists of meaningless phrases, the instruction is not executed. For example: `,
    caseSensitive: false,
    show: true,
    title: "IF_sence",
  },
  {
    oldT: ["if2"],
    newT: `The tone of BotModel does not match the request - the instructions are violated: .`,
    caseSensitive: false,
    show: true,
    title: "IF_tone",
  },
  {
    oldT: ["tr1"],
    newT: `Since BotModel consists of meaningless phrases, it does not contain the exact information that the user needs.`,
    caseSensitive: false,
    show: true,
    title: "TR_sence",
  },
  {
    oldT: ["lg1"],
    newT: `BotModel is too long because it contains unnecessary information that the user did not request`,
    caseSensitive: false,
    show: true,
    title: "Lg_long",
  },
  {
    oldT: ["lg1"],
    newT: `BotModel is too long because it contains unnecessary pleasantries, for example: `,
    caseSensitive: false,
    show: true,
    title: "Lg_long_pl",
  },
  {
    oldT: ["lg2"],
    newT: `Since there is no truthful information in BotModel, it is rated as too short.`,
    caseSensitive: false,
    show: true,
    title: "Lg_short_Tr",
  },
  {
    oldT: ["st1"],
    newT: `BotModel is poorly designed.`,
    caseSensitive: false,
    show: true,
    title: "st_poor",
  },
  {
    oldT: ["st2"],
    newT: `There is no division into paragraphs in BotModel.`,
    caseSensitive: false,
    show: true,
    title: "st_nodiv",
  },
  {
    oldT: ["st3"],
    newT: `BotModel does not use lists, although they would significantly improve the perception of information. `,
    caseSensitive: false,
    show: true,
    title: "st_nolist",
  },
  {
    oldT: ["st4"],
    newT: `BotModel is written in a tone that does not suit the task: it is too formal/caual/unnatural.`,
    caseSensitive: false,
    show: true,
    title: "st_tone",
  },
  {
    oldT: ["punker"],
    newT: `BotModel contains punctuation errors, for example: `,
    caseSensitive: false,
    show: true,
    title: "punkt err",
  },
  {
    oldT: ["dash"],
    newT: `BotModel uses a hyphen instead of a dash.`,
    caseSensitive: false,
    show: true,
    title: "—",
  },
  {
    oldT: ["quotes"],
    newT: `BotModel uses quotation marks "" instead of «».`,
    caseSensitive: false,
    show: true,
    title: "« »",
  },
  {
    oldT: ["quotes2"],
    newT: `BotModel uses quotation marks "" instead of «» and '' instead of "".`,
    caseSensitive: false,
    show: true,
    title: `«»""`,
  },
  {
    oldT: ["quotesDash"],
    newT: `In BotModel the quotation marks "" instead of «», and the hyphen instead of a dash`,
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
    oldT: ["colo"],
    newT: `BotModel uses uppercase after the colon (for example, “ …”). In this case, by the rules of the Russian language, after the colon should be a lowercase letter.`,
    caseSensitive: false,
    show: true,
    title: ":A",
  },
  {
    oldT: ["coloT"],
    newT: `BotModel uses colon after the titles. No colon is needed after the title by the rules of the Russian language.`,
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
    oldT: ["coml"],
    newT: `The lists are formatted incorrectly in the response. According to the rules of the Russian language, a comma, a semicolon, or a period is placed after the elements of the list.`,
    caseSensitive: false,
    show: true,
    title: "-.;,",
  },
  {
    oldT: ["comlr"],
    newT: `In this case, since the list items do not represent a sentence, it is better to write them with a small letter and use a comma for all but the last item — use a period for it.`,
    caseSensitive: false,
    show: true,
    title: `-a,-b.`,
  },
  {
    oldT: ["qp"],
    newT: `The period at the end of sentences should be placed outside the closing bracket according to the rules of the Russian language.`,
    caseSensitive: false,
    show: true,
    title: `).`,
  },
  {
    oldT: ["qp"],
    newT: `The period at the end of sentences should be placed outside the closing quotation mark according to the rules of the Russian language.`,
    caseSensitive: false,
    show: true,
    title: `».`,
  },
];
export const hotReplaceRewiew = [
  {
    oldT: ["lower"],
    newT: `The score for _ has been reduced, the justification has been supplemented.`,
    caseSensitive: false,
    show: true,
    title: "lower",
  },
  {
    oldT: ["dimi"],
    newT: `Instruction Following`,
    caseSensitive: false,
    show: true,
    title: "IF",
  },
  {
    oldT: ["dimf"],
    newT: `Factuality`,
    caseSensitive: false,
    show: true,
    title: "F",
  },
  {
    oldT: ["diml"],
    newT: `Language fluency`,
    caseSensitive: false,
    show: true,
    title: "LF",
  },
  {
    oldT: ["dimc"],
    newT: `Coherence`,
    caseSensitive: false,
    show: true,
    title: "C",
  },
  {
    oldT: ["dimp"],
    newT: `Presentation`,
    caseSensitive: false,
    show: true,
    title: "P",
  },
  {
    oldT: ["dimt"],
    newT: `Tone`,
    caseSensitive: false,
    show: true,
    title: "T",
  },
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

export const hotbtnsArrDef = [
  { name: "FORMAT", btns: autoreplaceFormat },
  { name: "TONE", btns: hotReplaceTone },
  { name: "GRAMMAR", btns: autoreplaceGrammar },
  { name: "JUSTIFICATION", btns: hotReplaceJustif },
  { name: "ISSUES", btns: hotReplaceIssues },
  { name: "ADVICE", btns: hotReplaceSuggestion },
  { name: "TEMPLATES", btns: hotReplaceTmp },
  { name: "REVIEW", btns: hotReplaceRewiew },
  { name: "RUBRICS", btns: autoreplaceRub },
  { name: "LOCAL", btns: autoreplaceLoc },
];
