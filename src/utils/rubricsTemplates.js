import { TbChairDirector } from "react-icons/tb";
import { MdReportGmailerrorred, MdVoiceOverOff } from "react-icons/md";
import { FaSpellCheck } from "react-icons/fa";
import { CiSquareRemove } from "react-icons/ci";
import { BiMessageSquareError } from "react-icons/bi";
import { BsGenderAmbiguous } from "react-icons/bs";

export const defaultRubrics = {
  "punctuationQ_createRub": {
    config: {
      title: "тире кавычки-wrong quots",
      icon: `«»`,
      justif: `The response has punctuation issues and uses ""/hyphen instead of  «»/dash`,
      separEx: true,
    },
    0: {
      rubric: "Ответ использует правильную пунктуацию",
      example: `использует кавычки вида «» вместо "".`,
    },
    1: {
      rubric: "The response follows the rules of Russian punctuation",
      example: `uses quotation marks like «», uses dash (as opposed to using "" and hyphen).`,
    },
  },
  "punctuationC_createRub": {
    config: {
      title: "capital letter",
      icon: ":A",
      weight: 5,
      justif: `The response makes orthographic errors and uses a capital letter after a colon: “”`,
      separEx: null,
    },
    0: {
      rubric: "Ответ оформлен без орфографических ошибок",
      example: `использует строчную букву вместо заглавной после двоеточия согласно правилам русского языка`,
    },
    1: {
      rubric:
        "The response follows the Russian orthographic rules (as opposed to using anti-localized orthography",
      example: `such as a capital letter after a colon: “”)`,
    },
  },
  "antiloc_createRub": {
    config: {
      title: "antilocal -instead :",
      icon: <MdReportGmailerrorred />,
      justif: `The response uses anti-localized punctuation: dashes instead of colons: “”`,
      separEx: null,
      weight: 5,
      example: `The response follows Russian punctuation rules (as opposed to using anti-localized punctuation such as `,
    },
    0: {
      rubric: `The response follows Russian punctuation rules (as opposed to using anti-localized punctuation such as`,
      example: `dashes instead of colons: “”)`,
    },
    1: {
      rubric: `The response follows Russian punctuation rules (as opposed to using anti-localized punctuation such as`,
      example: `dashes instead of colons: “”)`,
    },
  },
  "caseGrammar_createRub": {
    config: {
      title: "падеж wrong case",
      icon: <CiSquareRemove />,
      justif: `The response uses incorrect case agreement: “”`,
      separEx: null,
    },
    0: {
      rubric: "Ответ испоьзует неправильный падеж",
      example: `«» вместо «».`,
    },
    1: {
      rubric:
        "The response follows Russian rules of case agreement in Russian (as opposed to using incorrect case agreement, such as",
      example: `“”)`,
    },
  },
  "genderGrammar_createRub": {
    config: {
      title: "согласование по роду wrong gender matching",
      icon: <BiMessageSquareError />,
      justif: `The response uses incorrect gender agreement: “”`,
      separEx: null,
    },
    0: {
      rubric: "Ответ испоьзует неправильное согласование по роду",
      example: `«» вместо «».`,
    },
    1: {
      rubric:
        "The response follows Russian rules of gender agreement in Russian (as opposed to using incorrect gender agreement, such as",
      example: `“”)`,
    },
  },
  "endingGrammar_createRub": {
    config: {
      title: "окончание -wrong ending matching",
      icon: <BiMessageSquareError />,
      justif: `The response uses ending gender agreement: “”`,
      separEx: null,
    },
    0: {
      rubric: "Ответ испоьзует неправильное согласование окончаний",
      example: `«» вместо «».`,
    },
    1: {
      rubric:
        "The response follows Russian rules of ending agreement (as opposed to using incorrect ending agreement, such as",
      example: `“”)`,
    },
  },
  "spellingGrammar_createRub": {
    config: {
      title: "грамматика wrong spelling",
      icon: <FaSpellCheck />,
      justif: `The response uses incorrect spelling: “”`,
      separEx: null,
    },
    0: {
      rubric:
        "Ответ предоставляет грамотно написанный текст без грамматических ошибок",
      example: `«» вместо «».`,
    },
    1: {
      rubric:
        "The response follows Russian spelling rules (as opposed to using incorrect spelling, such as",
      example: `“”)`,
    },
  },
  "unnatural_createRub": {
    config: {
      title: "неестеств. fluency err UNNATURAL ",
      icon: <MdVoiceOverOff />,
      justif: `The response uses unnatural-sounding phrases: “”`,
      separEx: null,
    },
    0: {
      rubric: "Ответ использует фразы естественно звучащие в русском языке",
      example: `«» вместо «».`,
    },
    1: {
      rubric:
        "The response uses natural-sounding phrases in Russian (as opposed to using unnatural-sounding phrases, such as",
      example: `“”)`,
    },
  },
  "griberish_createRub": {
    config: {
      title: "бессмысленные fluency err GRIBERISH",
      icon: <MdVoiceOverOff />,
      justif: `The response uses gibberish, meaningless set of words: “”`,
      separEx: null,
    },
    0: {
      rubric: "Ответ использует фразы имеющие смысл в русском языке",
      example: `«» вместо «».`,
    },
    1: {
      rubric:
        "The response uses phrases that make sense in Russian (as opposed to using gibberish, meaningless set of words, such as",
      example: `“”)`,
    },
  },
  "foreign_createRub": {
    config: {
      title: "иностранные foreign language",
      justif: `The response uses foreign words: “”`,
      icon: <TbChairDirector />,
      separEx: null,
    },
    0: {
      rubric:
        "Ответ написан на русском языке, не используя иностранные слова без необходимости",
      example: `«» вместо «».`,
    },
    1: {
      rubric:
        "The response uses Russian words (as opposed to anti-localized using of English words, such as",
      example: `“”)`,
    },
  },
  "gender_createRub": {
    config: {
      title: "указан пол gender",
      icon: <BsGenderAmbiguous />,
      justif: `The response uses wording indicating the gender of the user: “”`,
      separEx: null,
    },
    0: {
      rubric: "Ответ использует гендерно-нейтральные формулировки.",
      example: `«(а)» вместо «».`,
    },
    1: {
      rubric:
        "The response contains a message written in a gender-neutral language (as opposed to using wording indicating the gender of the user, such as",
      example: `“”)`,
    },
  },
  "madeUp_createRub": {
    config: {
      title: "выдуманные made-up words",
      icon: <MdReportGmailerrorred />,
      justif: `The response uses made-up, meaningless words: “”`,
      separEx: null,
    },
    0: {
      rubric:
        "Ответ использует существующие слова и выражения имеющие смысл в русском языке.",
      example: `«» вместо «».`,
    },
    1: {
      rubric:
        "The response uses existing words that make sense in Russian language, (as opposed to made-up, meaningless words, such as",
      example: `“__”)`,
    },
  },
  "Truth_createRub": {
    config: {
      title: "truthfull info",
      icon: <MdReportGmailerrorred />,
      justif: `The response provids false information: “”`,
      separEx: null,
    },
    0: {
      rubric: "Ответ содержит верную информацию.",
      example: `«» вместо «».`,
    },
    1: {
      rubric:
        "The response provides only truthful information about the _____ (as opposed to providing false information, such as",
      example: `“”)`,
    },
  },
  "Chatbot_createRub": {
    config: {
      title: "chatbot",
      icon: <MdReportGmailerrorred />,
      justif: `The response does not play a role of the __`,
      separEx: null,
      weight: 5,
      example: `The response role plays as the user's boss, such as addressing them `,
    },
    0: {
      rubric: "",
      example: ``,
    },
    1: {
      rubric: "The response role plays as _, such as]",
      example: `addressing them/using phrase “”`,
    },
  },
  "Email_createRub": {
    config: {
      title: "email",
      icon: <MdReportGmailerrorred />,
      separEx: null,
      justif: `The response is not recognizably  written as an email:`,
      weight: 5,
      example: `The response is recognizably written in email, such as including a subject line, a header, a body, and/or a signature`,
    },
    0: {
      rubric: ``,
      example: ``,
    },
    1: {
      rubric: `The response is recognizably written in email, such as including a subject line, a header, a body, and/or a signature`,
      example: ``,
    },
  },
  "meter_createRub": {
    config: {
      title: "meter",
      icon: <MdReportGmailerrorred />,
      separEx: null,
      weight: 5,
      justif: `The response is not written  in iambic pentameter.`,
      example: `The response is written in iambic pentameter.`,
    },
    0: {
      rubric: ``,
      example: ``,
    },
    1: {
      rubric: `The response is written in РАЗМЕР_СТИХА.`,
      example: ``,
    },
  },
  "toneNA_createRub": {
    config: {
      title: "tone NO ISSUES",
      icon: <MdReportGmailerrorred />,
      separEx: null,
      weight: 5,
    },
    0: {
      rubric: ``,
      example: ``,
    },
    1: {
      rubric: `The response consistently responds in __ tone, such as by`,
      example: `“_”, `,
    },
  },
  "toneI_createRub": {
    config: {
      title: "tone ISSUES",
      icon: <MdReportGmailerrorred />,
      separEx: null,
      weight: 5,
      justif: `The response does not consistently respond in __ tone and use phrases like “_”`,
    },
    0: {
      rubric: ``,
      example: ``,
    },
    1: {
      rubric: `The response consistently responds in __ tone, (as opposed to taking __ tone and using such phrases as`,
      example: `“_”) `,
    },
  },
};
export const exampleSeparators = {
  "-1": { title: "none", value: ["", ""], punkt: "" },
  0: {
    title: "For example",
    value: ["Например:", "For example:"],
    punkt: { nameEnd: ".", exEnd: "." },
  },
  1: {
    title: "namely",
    value: ["а именно:", "namely:"],
    punkt: { nameEnd: ",", exEnd: "." },
  },
  2: {
    title: "such as",
    value: ["такие как:", "such as:"],
    punkt: { nameEnd: ",", exEnd: "." },
  },
  3: {
    title: "as opposed to",
    value: ["в отличие от:", "(as opposed to"],
    punkt: { nameEnd: "", exEnd: ")." },
  },
};
