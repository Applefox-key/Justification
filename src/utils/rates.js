import { defaultDimSets } from "../constants/textParts";
import { recomDim } from "./analysis";

export const rateIcons = ["⚪", "🔴", "🔴", "🟡", "🟢", "🟢"];

export const compose = (item, setItem, fieldId, r) => {
  const response = r === 1 ? "a" : "b";
  const newArr = defaultDimSets[item.setName]
    .filter((it) => item[it[response]] && item[it[response]] !== "OK")
    .map((el) => {
      const rate = item.Evals[el[response]];
      return `${rateIcons[rate]} ${el.name}: ${item[el[response]]}`;
    });
  setItem({ ...item, [fieldId]: newArr.join(`\n`) });
};

export const composeRateBoth = (
  item,
  setItem,
  fieldId,
  best,
  isFull = false
) => {
  const rateStr = best.title;

  let dimTxtAPros = "";
  let dimTxtBPros = "";
  let dimTxtACons = "";
  let dimTxtBCons = "";
  let dimTxtSame = "";
  let dimTxtSameNoIssues = "";
  defaultDimSets[item.setName].forEach((elAb) => {
    const ea = item.Evals[elAb.a];
    const eb = item.Evals[elAb.b];
    if (ea > eb) {
      dimTxtAPros += `➕Response A ${
        elAb.better ?? "is better at " + elAb.name
      }.\n`;
      dimTxtBCons += `➖Response B ${
        elAb.worth ?? "is worth at" + " " + elAb.name
      }.\n`;

      dimTxtBCons += isFull
        ? `▪️${item[elAb.b]}${
            ea < 5 ? " Response A has fewer errors. ▪️" + item[elAb.a] : ""
          }\n`
        : `\n`;
    }
    if (eb > ea) {
      dimTxtBPros += `➕Response B  ${
        elAb.better ?? "is better at " + elAb.name
      }.\n`;
      dimTxtACons += `➖Response A  ${
        elAb.worth ?? "is worth at" + " " + elAb.name
      }.\n`;
      dimTxtACons += isFull
        ? `▪️ ${item[elAb.a]}${
            eb < 5 ? " Response B has fewer errors. ▪️" + item[elAb.b] : ""
          }\n`
        : `\n`;
    }

    if (eb === ea) {
      if (eb === 5) {
        if (isFull)
          dimTxtSameNoIssues += dimTxtSameNoIssues
            ? ", "
            : `Both responses have no issues at ${elAb.name}`;
        else
          dimTxtSameNoIssues +=
            (dimTxtSameNoIssues ? ", " : `Both responses have no issues at `) +
            elAb.name;
      } else if (isFull) {
        dimTxtSame += `Both responses has issues with ➡️${
          elAb.name
        };\n1️⃣Response A:▪️${item[elAb.a]};\n2️⃣Response B: ▪️${
          item[elAb.b]
        })\n\n`;
      } else
        dimTxtSame +=
          (dimTxtSame !== "" ? ", " : "Responses are the same at ") + elAb.name;
    }
  });

  const rateStrDim =
    "🅰️RESPONSE A" +
    "\n" +
    dimTxtAPros +
    "\n" +
    dimTxtACons +
    "\n" +
    "🅱️RESPONSE B" +
    "\n" +
    dimTxtBPros +
    "\n" +
    dimTxtBCons +
    "\n" +
    "🆎❌SAME SCORES ISSUES" +
    "\n" +
    dimTxtSame +
    "\n" +
    "🆎✅SAME SCORES NO ISSUES" +
    "\n" +
    dimTxtSameNoIssues;

  setItem({
    ...item,
    [fieldId]: `${rateStr}\n${rateStrDim}\n ${item.Rate} `,
  });
};
