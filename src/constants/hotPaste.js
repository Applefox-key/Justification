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
export const autoreplaceGrammar = [
  {
    title: "MU",
    newT: `— made-up words:\u00A0`,
    bold: true,
  },
  {
    title: "made-up",
    newT: "The response uses made-up words, for example",
  },
  {
    newT: `BotModel contains The phrase that is often repeated, for example "".`,

    title: "repetition",
  },

  {
    newT: `— unnatural phrases:\u00A0`,
    title: "UN",
    bold: true,
  },
  {
    newT: `The phrase "_" in BotModel sounds unnatural. It should be "". It is better to use "".`,
    title: "unnat ➰",
  },
  {
    newT: `Some phrases in BotModel sound unnatural: `,
    title: "unnat ➿",
  },
  {
    newT: `A lot of phrases in BotModel sound unnatural: `,
    title: "unnat ♾️",
  },

  {
    newT: `BotModel sounds a bit chat-boty. For example, it is uses a phrase like ""`,
    title: "robo",
  },

  {
    newT: `— foreign language:\u00A0`,
    title: "FR",
    bold: true,
  },
  {
    newT: `BotModel contains phrases written in another language (not Russian) "".`,
    title: "foreign",
  },
  {
    newT: `BotModel contains phrases written in English "".`,
    title: "Engl",
  },

  {
    newT: `— misspelled words:\u00A0`,
    title: "SP",
    bold: true,
  },
  {
    newT: `— grammatical errors:\u00A0`,
    title: "GR",
    bold: true,
  },
  {
    newT: `BotModel contains grammatical errors, for example: "", "".`,
    title: "GR err",
  },
  {
    newT: `BotModel contains grammatical errors, for example "" instead of "".`,
    title: "GR inst",
  },
  {
    newT: `— punctuation errors: `,
    title: "punkt",
  },
  {
    newT: `BotModel contains punctuation errors, for example .`,
    title: "punkt err",
  },

  {
    newT: `— incorrect word matching:\u00A0`,
    title: "WM",
    bold: true,
  },
  {
    newT: `— incorrect word agreement: `,
    title: "WA",
  },
  {
    newT: `BotModel uses incorrect word matching in Russian. For example: "", "".`,
    title: "word matching",
  },
  {
    newT: `BotModel uses incorrect word matching in Russian "" instead of ""`,
    title: "WM inst",
  },

  {
    newT: `— wrong quotation marks (should be «»)`,
    title: "«»s",
    bold: true,
  },
  {
    newT: `In BotModel the quotation marks should be replaced with «».`,
    title: "«»",
  },
  {
    newT: `— the hyphen is used insteаd of a dash;`,
    title: "—",
    bold: true,
  },
  {
    newT: `In BotModel the hyphen should be replaced with a dash.`,
    title: "—L",
  },
  {
    newT: `In BotModel the quotation marks should be replaced with «», and the hyphen should be replaced with a dash`,
    title: "« » —",
  },
  {
    newT: `The comma after " " is unnecessary`,
    title: "comma",
  },

  {
    newT: `— uppercase after the colon (should be lowercase letter)`,
    title: ":A",
    bold: true,
  },
  {
    newT: `BotModel uses uppercase after the colon. In this case, by the rules of the Russian language, after the colon should be a lowercase letter.`,
    title: ":A__",
  },
  {
    newT: `No colon is needed after the title`,
    title: "A:",
  },
  {
    newT: `it is better to end the paragraph before the list with a period, not a colon.`,
    title: "A:123",
  },
  {
    newT: `The letter "ё" is inconsistently used`,
    title: "ё",
    bold: true,
  },
  {
    newT: `— wrong preposition:\u00A0`,
    title: "в-во",
    bold: true,
  },
  {
    title: "ALLs",
    newT: `— foreign language:\u00A0
           — incorrect word matching:\u00A0
           — made-up words:\u00A0
           — misspelled words:\u00A0
           — unnatural phrases:\u00A0
          `,
    bold: true,
  },
  {
    title: "ALL",
    newT: `— made-up words:

           — unnatural phrases: 

           — foreign language: 
           
           — misspelled words: 

           — grammatical errors: 
           
           — incorrect word matching: 

           — wrong quotation marks (should be «»)

          — BotModel uses uppercase after the colon, it should be a lowercase letter
          `,
    // bold: true,
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
export const autoreplaceLocal = [
  {
    title: "❌ pov",
    newT: "The response over-explains details that a local can easily understand",
  },

  {
    title: "❌ Local",
    newT: "The response provides information related to another locale",
  },
  {
    title: "❌ Events",
    newT: "The response includes unrelevant generic festivals, holidays, or seasonal events",
  },
  {
    title: "too details",
    newT: "The response should use details that a local would understand easily and are a local norm",
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
  { name: "LOCAL", btns: autoreplaceLocal },
];
export const hotJustifInstruction = [
  {
    title: "not follow",
    newT: "The response does not follow the format, length, tone, exclusions, or other constraints explicitly mentioned in the prompt.",
  },
  {
    title: "SP RU",
    newT: "The response does not meet the system prompt, because it does not conform with the Russian language standard.",
  },
  {
    title: "SP RU2",
    newT: "The system prompt is also failed since the response is useless and does not conform with the Russian language standard.",
  },
  {
    title: "SP RU 3",
    newT: "Since the response is useless and does not conform with the Russian language standard, the system prompt has also failed ",
  },
  {
    title: "SP AS",
    newT: "The system prompt is also failed since the model is not useful as an assistant, and the response is useless",
  },
  {
    title: "SP AS2",
    newT: "Since the response is useless, and the model is not useful as an assistant, the system prompt has also failed.",
  },
  {
    title: "SP AS3",
    newT: "Since the model is not useful as an assistant, the system prompt has also failed.",
    bold: true,
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
  { title: "failed", newT: "The model has failed the task because ", bold: true },
  {
    title: "not use some info",
    newT: "The model did not use some information provided by the user in any way.",
  },
  {
    title: "not useful",
    bold: true,
    newT: "The response is not useful to the user because ",
  },
  {
    title: "not truth",
    bold: true,
    newT: "The response will not be useful to the user because not all the information in it corresponds to reality. ",
  },
  {
    title: "role",
    newT: "The model fails to take on the role of ______ because",
  },
  {
    newT: `due to numerous localization errors, the response cannot be used as a blog post/business letter/`,
    title: "localization errors",
  },
];
export const hotJustifTruth = [
  {
    title: "inaccurately claims",
    newT: "The response inaccurately claims that __ when in fact it's _.",
  },
  {
    title: "pretends",
    newT: "The response is not truthful, because it pretends that the text has been rewritten and changed, however, no requested changes have actually been made.",
  },
  {
    title: "pretends suitable",
    newT: "The response misleads the user by pretending to provide a suitable answer.",
  },
  {
    title: "advices",
    newT: "The model gives/provides completely unrealistic/strange/poor advices/ideas such as",
  },
  {
    title: "inaccurate",
    newT: "The response is inaccurate.",
  },
  {
    title: "not follow instr",
    newT: "The text is supposed to follow all user instructions, but it doesn't.",
  },
  {
    title: "fabricated ref",
    newT: "The response included fabricated details (_), which were not in the reference text.",
  },
  {
    title: "adding",
    newT: "The model adds fictitious information: although the user did not indicate that ___, the model ___.",
  },
  {
    title: "adding2",
    newT: "The model adds fictitious information and ____, although the user did not indicate/mentione that ___.",
  },
  {
    title: "does not correspond",
    newT: " The response will not be useful to the user because not all the information in it corresponds to reality and reference text.",
  },

  {
    title: "core requirement",
    newT: "The model does not state the core requirement in the response, so it is assumed that the response meets all the requirements of the request, but this is not the case.",
  },
  {
    title: "core accuracy",
    newT: "Core requirement accuracy is also broken. ",
  },
  {
    title: "time",
    newT: "Since the task is time-sensitive, and, the model provides inaccurate data without a cut-off date, the score will be reduced to major.",
  },
  {
    newT: `due to numerous localization errors, the response cannot be used as a blog post/business letter/`,
    title: "localization errors",
  },
];
export const hotJustifLength = [
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
    title: "short-long2",
    newT: `Since none of __ provided by the model are suitable, the response is both long and short. Since the lack of information has already been penalized by other dimensions, the response is a bit long. `,
  },
  {
    title: "pleasantries",
    newT: "The response contains pleasantries (last/first paragraph/sentence).",
  },
  {
    title: "not all info is used",
    newT: "The model does not use all the information provided by the user in the prompt.",
  },
  {
    title: "already evaluated",
    newT: `Since this error has already been evaluated in other dimensions, "too verbose/short (minor/major) issue" score is selected.`,
  },
];
export const hotJustifTone = [
  {
    newT: `BotModel provides a lot of information but lacks structure. Adding bullet points or bolding key details would improve readability`,
    title: "Presentation",
  },
  {
    newT: `There was no need to use a bulleted list inside a numbered list for just one item.`,
    title: "bulleted 1",
  },
  {
    newT: `It contains phrases that are too complex for the target audience.`,
    title: "too complex",
  },
  {
    newT: `The tone is completely inappropriate. Instead of being formal, the nonsensical word choices make it sound absurd and unprofessional.`,
    title: "unprofessional",
  },
  {
    newT: `The user also asked for an official style. Although the model tries, the text as a whole does not look official.`,
    title: "not official",
  },
  {
    newT: `The response is too official: it uses the pronoun “вы” when addressing the user. In Russia, “ты” is more often used when addressing a _`,
    title: "too official вы",
  },
  {
    newT: `The phrases used are unusual for the specified character`,
    title: "phrases (chatbot)",
  },
  {
    newT: `The tone used is unusual for the specified character`,
    title: "tone (chatbot)",
  },
  {
    newT: `due to numerous localization errors, the response cannot be used as a blog post`,
    title: "localization errors",
  },
  {
    newT: `The writing style does not match what is expected`,
    title: "writing style",
  },
];
export const hotJustifHarmf = [
  {
    newT: `BotModel recommends using platforms whose activities are prohibited by law in the country (Instagram, Facebook)`,
    title: "platforms",
  },
];
