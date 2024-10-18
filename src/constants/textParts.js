export const textParts = [
  { en: "Responses are about the same.", ru: "", level: "AB" },
  { en: "Response A is slightly better.", ru: "", level: "A" },
  { en: "Response A is better.", ru: "", level: "A" },
  { en: "Response A is much better.", ru: "", level: "A" },
  { en: "Response B is slightly better.", ru: "", level: "B" },
  { en: "Response B is better.", ru: "", level: "B" },
  { en: "Response B is much better.", ru: "", level: "B" },
  { en: "responses", ru: "", level: "AB" },
  { en: "Both responses", ru: "", level: "AB" },
  { en: "Response A", ru: "", level: "A" },
  { en: "Response B", ru: "", level: "B" },
  { en: "So the span is inaccurate.", ru: "", level: "span" },
  { en: "So the span is accurate.", ru: "", level: "span" },
  { en: "According to the Wikipedia,", ru: "", level: "span" },
  {
    en: "Internet research has not yielded results about,",
    ru: "нет результатов",
    level: "span",
  },
  {
    en: "This information relates to common knowledge base. ",
    ru: "",
    level: "span",
  },
  {
    en: "The span is purely conversational. ",
    ru: ` "Спокойной ночи" или "Вам нравится выгодная сделка?"`,
    level: "no_fact",
  },
  {
    en: "The span is a generic disclaimer.",
    ru: " Проконсультируйтесь с врачом, прежде чем принимать решение.",
    level: "no_fact",
  },
  {
    en: "The span contains phrases that structure the response.",
    ru: " фразы, представляющие список, краткое изложение других частей ответа или выводы",
    level: "no_fact",
  },
  {
    en: "The span rephrases the user's input.",
    ru: "Конечно, вот несколько идей для празднования четвертого дня рождения ребенка",
    level: "no_fact",
  },
  {
    en: "The span only contains link.",
    ru: "не должны проверять, существуют ли URL-адреса ",
    level: "no_fact",
  },
  {
    en: "The span only contains creative content.",
    ru: "Жил-был ковбой по имени Джек",
    level: "no_fact",
  },
  {
    en: "The span is a first-person opinion.",
    ru: "Я люблю пирожные...",
    level: "no_fact",
  },
  {
    en: "The span contains general advice without factual information.",
    ru: "",
    level: "no_fact",
  },
  {
    en: " The span doesn't contain factual information.",
    ru: "",
    level: "no_fact",
  },
];

export const mainTmp = `@Response is slightly much better than @Response /@Response 1 and @Response 2 are about the same.
@Response 1
@Response 2
Both`;
