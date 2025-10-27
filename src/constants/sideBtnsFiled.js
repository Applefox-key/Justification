import { GrBlockQuote } from "react-icons/gr";
import { PiBracketsRoundBold } from "react-icons/pi";
import { BsList } from "react-icons/bs";
import { LuListTree } from "react-icons/lu";
import { RxLetterCaseCapitalize, RxLetterCaseLowercase, RxLetterCaseUppercase } from "react-icons/rx";
import { TbSlashes } from "react-icons/tb";
import { BiSolidEraser } from "react-icons/bi";

/**
 * for SideBtnsFiled
 */
const wordsList1 = [
  "Additionally, ",
  "In addition, ",
  "Although",
  "For example: ",
  "For example, ",
  "However, ",
  "Otherwise, ",
];
const wordsListPart2 = [
  { title: "The response", label: "The response", bold: true },
  {
    label: "system prompt (both)",
    title:
      "Since responses are useless, and both models are not useful as an assistant, the system prompt has also failed.",
    bold: true,
  },
  {
    label: "faild (both)",
    title: "Both models have failed the task because ",
    bold: true,
  },
  {
    label: "literate",
    title:
      "responses cannot be used without significant refinement. Since the text is intended for ________, it is expected that it will be literate However, both responses contain grammatical errors and unnatural phrases. ",
    bold: true,
  },
  {
    label: "it affects",
    title: "it affects the localization, instruction following, truthfulness, length, tone and writing style ",
  },
  {
    title: `They use made-up and misspelled words, unnatural phrases, foreign language, incorrect word matching, grammatical errors, wrong quotation marks (should be «»), the response uses uppercase after the colon, For example,`,
    label: "They use",
  },
];

export const sideBtnsData = ({ applyAction, replace, replaceQU, pasteToText }) => {
  //simple paste to the text - btn words
  const wordsListPart1 = wordsList1.map((el) => ({
    title: el,
    RightClickCopy: true,
    label: el,
    onClick: () => pasteToText(el),
  }));
  //verbal wording

  const mainBtns = [
    {
      groupName: "Replace",
      grLabel: "R",
      btns: [
        { title: "replace dash", label: "-", onClick: () => replace("-", "—") },
        { title: "replace quotes1", label: "«»", onClick: () => replaceQU("guillemet") },
        { title: "replace quotes2", label: <GrBlockQuote />, bold: true, onClick: () => replaceQU("straight") },
        { title: "replace quotes3", label: `""`, onClick: () => replaceQU("straight"), bold: true },
      ],
    },
    {
      groupName: "Add",
      grLabel: "+",
      btns: [
        {
          title: "add quotation2 for selection",
          label: "«»",
          onClick: () => applyAction("quotation2", true),
          bold: true,
        },
        { title: "add quotation for selection", label: `""`, onClick: () => applyAction("quotation", true) },
        { title: "to “” for selection", label: <GrBlockQuote />, onClick: () => applyAction("quotation3", true) },
        {
          title: "add staples for selection",
          label: <PiBracketsRoundBold />,
          onClick: () => applyAction("staples", true),
          bold: true,
        },
      ],
    },
    {
      groupName: "List",
      btns: [
        {
          title: "add quotation to every line",
          label: (
            <>
              "<BsList />
            </>
          ),
          onClick: () => applyAction("quotationL", true),
        },
        {
          title: "paste text and add quotation to every line +,",
          label: (
            <>
              "<BsList />
              ,"
            </>
          ),
          onClick: () => applyAction("quotationLP0", true),
        },
        {
          title: "paste text and add quotation to every line +,",
          label: (
            <>
              txt:"
              <BsList />
            </>
          ),
          onClick: () => applyAction("quotationLP", true),
        },
        {
          title: `add quotation to every line with the text and remove ENTER`,
          label: <LuListTree />,
          bold: true,
          onClick: () => applyAction("transformAll", true),
        },
        {
          title: `add quotation to every pair line with the text "instead of"`,
          label: <>INS</>,
          onClick: () => applyAction("quotationLI", true),
        },
        {
          title: `add quotation to every line with the text "it is better to use"`,
          label: <>Bett</>,
          onClick: () => applyAction("quotationLB", true),
        },
        {
          title: `add quotation to every odd line and join with even line using — "`,
          label: <> —</>,
          onClick: () => applyAction("linePairD", true),
        },
        {
          title: "add ;/. to each line of selection",
          label: ";.",
          bold: true,
          onClick: () => applyAction("lineEnding", true),
        },
      ],
    },
    {
      groupName: "Case",
      btns: [
        {
          title: "Uppercase first letter Alt+Q",
          label: <RxLetterCaseCapitalize />,
          onClick: () => applyAction("upFirst"),
        },
        {
          title: "Lowercase Alt+A",
          label: <RxLetterCaseLowercase />,
          onClick: () => applyAction("down"),
        },
        {
          title: "Uppercase",
          label: <RxLetterCaseUppercase />,
          onClick: () => applyAction("up"),
        },
      ],
    },
    {
      groupName: "Selection",
      btns: [
        {
          title: "accent selection",
          label: <TbSlashes />,
          onClick: () => applyAction("accent"),
        },
        {
          title: "delete selection",
          label: <BiSolidEraser />,
          onClick: () => applyAction("delSel"),
        },
      ],
    },
  ];

  const btnsArr = [
    {
      groupName: "HOT",
      btns: [
        ...mainBtns.flatMap((gr) => gr.btns.filter((btn) => btn.bold).map((btn) => ({ ...btn, grLabel: gr.grLabel }))),
        {
          title: "Adding a words",
          label: "words",
          onClick: () => applyAction("upFirst"),
          subList: [
            ...wordsListPart1,
            ...wordsListPart2.map((el) => ({
              ...el,
              RightClickCopy: true,
              onClick: () => pasteToText(el.title),
            })),
          ],
        },
      ],
    },
    ...mainBtns,
  ];

  return btnsArr;
};
export const wordBtnsData = ({ pasteToText }) => {
  //simple paste to the text - btn words
  const wordsListPart1 = wordsList1.map((el) => ({
    title: el,
    RightClickCopy: true,
    label: el,
    onClick: () => pasteToText(el),
  }));
  //verbal wording

  const btnsArr = [
    ...wordsListPart1,
    ...wordsListPart2.map((el) => ({
      ...el,
      RightClickCopy: true,
      onClick: () => pasteToText(el.title),
    })),
  ];

  return btnsArr;
};
