import { defaultDimSets } from "../constants/textParts";
import { applyAction } from "./utilStr";
const minDiv = `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;
const minDivShort = `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;
// export const rateIcons = ["⚪", "🔴", "🔴", "🟡", "🟢", "🟢"];
export const rateIcons = ["✖️", "🔴", "🔴", "🟡", "🟢", "🟢"];
export const rateColorClasses = [
  "",
  "red-border",
  "red-border",
  "orange-border",
  "green-border",
  "green-border",
];
const formatTextBullet = (txt) => {
  if (!txt) return "";
  return txt
    .split(/\r?\n/) // разбиваем по переводам строк
    .filter((line) => line.trim() !== "") // убираем пустые
    .join("\n▪️"); // собираем обратно с маркером
};
export const compose = (item, setItem, fieldId, r) => {
  const response = r === 1 ? "a" : "b";
  const newArr = defaultDimSets[item.setName]
    .filter((it) => item[it[response]] && item[it[response]] !== "OK")
    .map((el) => {
      const rate = item.Evals[el[response]];
      return `${rateIcons[rate]} ${el.name}: ${item[el[response]]}`;
    });
  if (setItem && fieldId) setItem({ ...item, [fieldId]: newArr.join(`\n`) });
  else return newArr.join(`\n`);
};

export const composeRateBothByDim = (param) => {
  const {
    item,
    setItem,
    fieldId,
    best,
    setresult = null,
    action = null,
  } = param;

  const divider = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

  const dividerMain = `⚌⚌⚌⚌⚌⚌⚌⚌⚌\n`;

  let resultByDim = [];
  let rateStrDim =
    (best.title ? best.title : "Rate is unset") + `\n` + dividerMain;
  defaultDimSets[item.setName].forEach((elAb) => {
    const ea = item.Evals[elAb.a];
    const eb = item.Evals[elAb.b];

    let resDim = [];
    if (ea > eb) {
      resDim.push(
        `1️⃣👍Response A ${elAb.better ?? "is better at " + elAb.name}.`
      );

      resDim.push(
        ea < 5
          ? `  It has fewer errors with ${elAb.name}.\n▪️${formatTextBullet(
              item[elAb.a]
            )}`
          : `▪️It has no issues with ${elAb.name}`
      );

      // if (ea < 5) {
      //   resDim.push(`It has fewer errors with ${elAb.name}.`);
      //   resDim.push(`▪️${formatText(item[elAb.a])}`);
      // } else resDim.push(`\n1️⃣👍Response A has no issues with ${elAb.name}`);

      resDim.push(
        `2️⃣👎Response B ${elAb.worth ?? "is worth at " + elAb.name}.`
      );
      resDim.push(`▪️${formatTextBullet(item[elAb.b])}`);
      // resDim.push("\n");
    } else if (eb > ea) {
      resDim.push(
        `2️⃣👍Response B ${elAb.better ?? "is better at " + elAb.name}.`
      );
      resDim.push(
        eb < 5
          ? `  It has fewer errors with ${elAb.name}.\n▪️${formatTextBullet(
              item[elAb.b]
            )}`
          : `▪️It has no issues with ${elAb.name}`
      );
      resDim.push(
        `1️⃣👎Response A ${elAb.worth ?? "is worth at " + elAb.name}.`
      );
      // resDim.push(dividerS);
      resDim.push(`▪️${formatTextBullet(item[elAb.a])}`);
      // resDim.push(`\n`);
    } else if (ea === 5) {
      // оба идеальные
      resDim.push(`▪️Both responses have no issues.`);
      resultByDim.push({ dim: elAb, just: resDim.join("\n") });
      rateStrDim += `\n${divider}\n🔘${elAb.name.toUpperCase()}: ${resDim.join(
        "\n"
      )}`;
      return;
    } else {
      resDim.push(
        `Both responses have issues with ${elAb.name};\n` +
          `1️⃣👎Response A: \n▪️${formatTextBullet(item[elAb.a])};\n` +
          `2️⃣👎Response B: \n▪️${formatTextBullet(item[elAb.b])}`,
        divider
      );
    }
    resultByDim.push({ dim: elAb, just: resDim.join("\n") });
    // rateStrDim += `
    //   ${divider} ${elAb.name.toUpperCase()}🔘${divider}${resDim.join("\n")}`;
    rateStrDim += `\n${divider}\n🔘${elAb.name.toUpperCase()}\n${divider}\n${resDim.join(
      "\n"
    )}`;
    if (action !== null) rateStrDim = applyAction(rateStrDim, action, true);
  });
  if (setItem)
    setItem({
      ...item,
      [fieldId]: `${rateStrDim}\n  `,
    });
  if (setresult !== null) setresult(resultByDim);
};

export const composeRateByScores = (param) => {
  const {
    item,
    setItem,
    fieldId,
    best,
    setresult = null,
    isFull = false,
    action = null,
  } = param;
  const dividerS = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
  const divider = `⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌`;

  const rateStr = (best.title ? best.title : "Rate is unset") + `\n`;
  const A = [];
  const B = [];
  const IssueSame = [];
  const NoIssueSame = [];
  // const formatText = (txt) => (txt ? txt.replace(/\r?\n/g, "\n▪️") : "");

  let dimTxtA = []; // A лучше
  let dimTxtB = []; // B лучше
  let dimTxtSame = []; // одинаковые, но есть ошибки
  let dimTxtSameNoIssues = []; // одинаковые без ошибок

  defaultDimSets[item.setName].forEach((elAb) => {
    const ea = item.Evals[elAb.a];
    const eb = item.Evals[elAb.b];

    if (ea > eb) {
      // A лучше
      let block = [`🔘${elAb.name.toUpperCase()}: 🅰️👑`];
      block.push(`Response A ${elAb.better ?? "is better at " + elAb.name}.`);
      if (isFull) {
        if (ea < 5) {
          block.push(`🔲Response A has fewer errors in ${elAb.name}:`);
          block.push(`▪️${formatTextBullet(item[elAb.a])}`);
        } else block.push(`\n🔲Response A has no errors with ${elAb.name}`);
        block.push(`🔲Response B ${elAb.worth ?? "is worse at " + elAb.name}:`);
        block.push(`▪️${formatTextBullet(item[elAb.b])}`);
      }
      block.push(dividerS);
      dimTxtA.push(block.join(`\n`));
    } else if (eb > ea) {
      let block = [`🔘${elAb.name.toUpperCase()}: 🅱️👑`];
      block.push(`Response B ${elAb.better ?? "is better at " + elAb.name}.`);
      if (isFull) {
        if (eb < 5) {
          block.push(`🔲Response B has fewer errors in ${elAb.name}:`);
          block.push(`▪️${formatTextBullet(item[elAb.b])}`);
        } else block.push(`\n🔲Response B has no errors (${elAb.name})`);
        block.push(`🔲Response A ${elAb.worth ?? "is worse at " + elAb.name}:`);
        block.push(`▪️${formatTextBullet(item[elAb.a])}`);
      }
      block.push(dividerS);
      dimTxtB.push(block.join(`\n`));
    } else {
      // равные
      if (ea === 5) {
        // без проблем — копим просто список имён измерений
        dimTxtSameNoIssues.push(`🔘${elAb.name.toUpperCase()}`);
      } else {
        let block = [
          `🔘${elAb.name}: Both responses have issues with ${elAb.name}.`,
        ];
        if (isFull) {
          block.push(`🔲Response A:\n▪️${formatTextBullet(item[elAb.a])}`);
          block.push(`🔲Response B:\n▪️${formatTextBullet(item[elAb.b])}`);
          block.push(minDivShort);
        }
        dimTxtSame.push(block.join("\n"));
      }
    }
  });

  // Собираем секции корректно, без оператора запятая
  const parts = [""]; // ведущий перенос
  if (dimTxtA.length) {
    parts.push(divider, "🅰️ RESPONSE A BETTER", divider, dimTxtA.join("\n"));
    A.push(divider, "🅰️ RESPONSE A BETTER", divider, dimTxtA.join("\n"));
    // parts.push(dividerS);
  }
  if (dimTxtB.length) {
    parts.push(
      divider,
      "🅱️ RESPONSE B BETTER",
      divider,
      dimTxtB.join("\n")
      // dividerMain
    );
    B.push(divider, "🅱️ RESPONSE B BETTER", divider, dimTxtB.join("\n"));
    // parts.push(dividerS);
  }
  if (dimTxtSame.length) {
    parts.push("\n🆎 ❌ SAME SCORES ISSUES", divider, dimTxtSame.join("\n"));
    IssueSame.push("\n🆎 ❌ SAME SCORES ISSUES", dimTxtSame.join("\n"));
    // parts.push(dividerS);
  }
  if (dimTxtSameNoIssues.length) {
    parts.push(
      "\n🆎 ✅ SAME SCORES NO ISSUES",
      divider,
      "🔲Both responses have no issues with " + dimTxtSameNoIssues.join(", ")
    );
    // parts.push(dividerS);
    NoIssueSame.push(
      divider,
      "🆎 ✅ SAME SCORES NO ISSUES",
      divider,
      "🔲Both responses have no issues with " + dimTxtSameNoIssues.join(", ")
    );
  }

  let rateStrDim = parts.join("\n");
  if (action !== null) rateStrDim = applyAction(rateStrDim, action, true);
  setItem({
    ...item,
    [fieldId]: `${rateStr}\n${rateStrDim}\n ${item.Rate} `,
  });
  if (setresult !== null)
    setresult([
      A.join("\n"),
      B.join("\n"),
      IssueSame.join("\n"),
      NoIssueSame.join("\n"),
    ]);
};
export const composeByResp = (param) => {
  const { item, setItem, fieldId, best } = param;

  // (item, setItem, fieldId, best) => {
  const rateStr = best ? best.title : "Rate is unset";
  const one = compose(item, null, "", 1);
  const two = compose(item, null, "", 2);
  const divider = `\n━━━━━━━━━━━━━\n`;
  const result = `${rateStr}${divider}RESPONSE 1\n ${one}${divider}RESPONSE 2\n ${two}`;

  if (fieldId && setItem)
    setItem({
      ...item,
      [fieldId]: result,
    });
  else return result;
};
const removeEmptyLines = (txt) =>
  txt
    ? txt
        .split(/\r?\n/) // разбиваем на строки
        .filter((line) => line.trim() !== "") // оставляем только непустые
        .join("\n") // собираем обратно
    : "";
// const composeOneDim = (bestResp, dim, score, errBest, errWorse) => {
const composeOneDim = (param, bestResp, score) => {
  const { dim, errA, errB } = param;
  // const formatText = (txt) => (txt ? txt.replace(/\r?\n/g, "\n▪️") : "");

  if (bestResp === 0) {
    let block = [
      `🔘${dim.name.toUpperCase()}\nBoth responses have issues with ${
        dim.name
      }.`,
    ];
    block.push(`Response A:\n▪️${formatTextBullet(errA)}`);
    block.push(`Response B:\n▪️${formatTextBullet(errB)}`);
    block.push(minDivShort);
    // block.push(`\n`);
    return block.join(`\n`);
  }

  let respBest =
    bestResp === 1
      ? { name: "Response A", err: errA }
      : { name: "Response B", err: errB };
  let respWorse =
    bestResp === 2
      ? { name: "Response A", err: errA }
      : { name: "Response B", err: errB };
  let block = [];

  const betterTxt = score < 5 ? "has fewer errors with" : "has no errors with";
  block.push(`🔘${dim.name.toUpperCase()}`);
  block.push(
    `${respBest.name} ${betterTxt} ${dim.name}, while ${respWorse.name} ${
      dim.worth ?? "is worse at " + dim.name
    }:`
  );
  // if (score < 5)
  block.push(`\n⭐EXAMPLES`);
  block.push(`(${respBest.name}:\n▪️${formatTextBullet(respBest.err)})`);
  block.push(`(${respWorse.name}:\n▪️${formatTextBullet(respWorse.err)})`);
  // block.push(`\n`);
  return block.join(`\n`);
};

const compOneR = (numR, dimTxt1, dim1Better, dimTxt2, dim2Better, parts) => {
  let symb1 = "";
  let title1 = "";
  let symb2 = "";
  let title2 = "";

  if (numR === 1) {
    symb1 = "🅰️";
    title1 = "A";
    symb2 = "🅱️";
    title2 = "B";
  } else {
    symb2 = "🅰️";
    title2 = "A";
    symb1 = "🅱️";
    title1 = "B";
  }

  if (dimTxt1.length) {
    if (dimTxt2.length)
      parts.push(
        `\n${symb1}➕\n Despite the fact that RESPONSE ${title1}} worse at ${dim2Better.join(
          ", "
        )}, it is still better since it wins in ${dim1Better.join(
          ", "
        )}\n${minDiv}\n`
      );
    else
      parts.push(
        `\n${symb1}➕\n RESPONSE ${title1} BETTER in ${dim1Better.join(
          ", "
        )}\n${minDiv}\n`
      );
    //Despite the fact that his localization is slightly worse, he follows the instructions better.
    parts.push(dimTxt1.join("\n"));
  }
  if (dimTxt2.length) {
    parts.push(
      `\n${symb2}➕\n RESPONSE ${title2} BETTER in ${dim2Better.join(
        ", "
      )}\n${minDiv}`
    );
    parts.push(dimTxt2.join("\n"));
  }
};

export const justificationByScores = (param) => {
  const {
    item,
    setItem,
    fieldId,
    best,
    setresult = null,
    action = null,
  } = param;

  let dimABetter = [];
  let dimBBetter = [];
  let dimSameErr = [];

  const A = [];
  const B = [];
  const IssueSame = [];
  const NoIssueSame = [];
  // const formatText = (txt) => (txt ? txt.replace(/\r?\n/g, "\n▪️") : "");
  const dividerM = "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
  let dimTxtA = []; // A лучше
  let dimTxtB = []; // B лучше
  let dimTxtSame = []; // одинаковые, но есть ошибки
  let dimTxtSameNoIssues = []; // одинаковые без ошибок

  defaultDimSets[item.setName].forEach((elAb) => {
    const ea = item.Evals[elAb.a];
    const eb = item.Evals[elAb.b];
    const param = {
      dim: elAb,
      errA: removeEmptyLines(item[elAb.a]),
      errB: removeEmptyLines(item[elAb.b]),
    };

    if (ea > eb) {
      dimABetter.push(elAb.name);
      let res = composeOneDim(param, 1, ea);
      dimTxtA.push(res);
    } else if (eb > ea) {
      dimBBetter.push(elAb.name);
      let res = composeOneDim(param, 2, eb);
      dimTxtB.push(res);
    } else if (ea === 5) {
      dimTxtSameNoIssues.push(`${elAb.name}`);
    } else {
      dimSameErr.push(elAb.name);
      let res = composeOneDim(param, 0, ea);
      dimTxtSame.push(res);
    }
  });
  // let rateStr = (best.title ? best.title : "Rate is unset") + `\n`;
  // Собираем секции корректно, без оператора запятая
  const parts = [best.title ? best.title : "Rate is unset"]; // ведущий перенос

  if (best.num === 5) {
    //same
    parts.push(`Both responses are the same in quality`);
    if (dimTxtA.length) parts.push(dimTxtA.join("\n"));
    if (dimTxtB.length) parts.push(dimTxtB.join("\n"));
  } else if (best.num < 5) {
    compOneR(1, dimTxtA, dimABetter, dimTxtB, dimBBetter, parts);

    // if (dimTxtA.length) {
    //   if (dimTxtB.length)
    //     parts.push(
    //       `\n🅰️➕\n Despite the fact that RESPONSE A worse at ${dimBBetter.join(
    //         ", "
    //       )}, it is still better since it wins in 🟢${dimABetter.join(
    //         ", "
    //       )}\n${minDiv}\n`
    //     );
    //   else
    //     parts.push(
    //       `\n🅰️➕\n RESPONSE A BETTER in ${dimABetter.join(", ")}\n${minDiv}\n`
    //     );
    //   //Despite the fact that his localization is slightly worse, he follows the instructions better.
    //   parts.push(dimTxtA.join("\n"));
    // }
    // if (dimTxtB.length) {
    //   parts.push(
    //     `\n🅱️➕\n RESPONSE B BETTER in 🟢${dimBBetter.join(", ")}\n${minDiv}`
    //   );
    //   parts.push(dimTxtB.join("\n"));
    // }
  } else {
    compOneR(2, dimTxtB, dimBBetter, dimTxtA, dimABetter, parts);
    // if (dimTxtB.length) {
    //   if (dimABetter.length)
    //     parts.push(
    //       `\n🅱️➕\n Despite the fact that RESPONSE B is worse at 🔴${dimABetter.join(
    //         ", "
    //       )}, it is still better since it wins in ${dimBBetter.join(
    //         ", "
    //       )}${minDiv}\n`
    //     );
    //   else
    //     parts.push(
    //       `\n🅱️➕\n RESPONSE B BETTER in 🟢${dimBBetter.join(", ")}${minDiv}`
    //     );
    //   parts.push(dimTxtB.join("\n"));
    // }
    // if (dimTxtA.length) {
    //   parts.push(`\n🅰️➕\n RESPONSE A BETTER in ${dimABetter.join(", ")}`);
    //   parts.push(dimTxtA.join("\n"));
    // }
  }

  if (dimTxtSame.length) {
    parts.push(
      `\n 🅾️🟰\n Otherwise both responses have issues with ${dimSameErr.join(
        ", "
      )}`
    );
    parts.push(minDiv);
    parts.push(`${dimTxtSame.join("\n")}`);
  }

  const rateStrDim =
    action === null
      ? parts.join("\n")
      : applyAction(parts.join("\n"), action, true);

  setItem({
    ...item,
    [fieldId]: `${rateStrDim}\n ${item.Rate} `,
  });
  if (setresult !== null)
    setresult([
      A.join("\n"),
      B.join("\n"),
      IssueSame.join("\n"),
      NoIssueSame.join("\n"),
    ]);
};
export const composeRates = (param) => {
  const { item, setItem, fieldId, best } = param;
  const rateStr = best ? best.title : "Rate is unset";

  let dimTxtA = "because ";
  let dimTxtB = "because ";
  defaultDimSets[item.setName].forEach((elAb) => {
    const ea = item.Evals[elAb.a];
    const eb = item.Evals[elAb.b];
    if (ea > eb) dimTxtA += "Response A " + elAb.better + "\n";
    if (eb > ea) dimTxtB += "Response B " + elAb.better + "\n";
  });

  const rateStrDim =
    best.num === 4 ? dimTxtA + " " + dimTxtB : best.num < 4 ? dimTxtA : dimTxtB;
  if (fieldId && setItem)
    setItem({
      ...item,
      [fieldId]: `${rateStr}\n${rateStrDim}\n ${item.Rate} `,
    });
  else return `${rateStr}\n${rateStrDim}\n ${item.Rate} `;
};

export const composeRateBothSimple = (param) => {
  const { item, setItem, fieldId, best, action } = param;
  const rateStr = best ? best.title : "Rate is unset";
  let dimTxtA = "";
  let dimTxtB = "";
  let dimTxtSame = "Responses are the same at ";
  defaultDimSets[item.setName].forEach((elAb) => {
    const ea = item.Evals[elAb.a];
    const eb = item.Evals[elAb.b];
    if (ea > eb) dimTxtA += "Response A " + elAb.better + ".\n";
    if (eb > ea) dimTxtB += "Response B " + elAb.better + ".\n";
    if (eb === ea)
      dimTxtSame +=
        (dimTxtSame !== "Responses are the same at " ? ", " : "") + elAb.name;
  });
  dimTxtSame =
    dimTxtSame !== "Responses are the same at " ? dimTxtSame + "." : "";
  // const rateStrDim_ = dimTxtA + "\n" + dimTxtB + "\n" + dimTxtSame;
  const rateStrDim =
    action === null
      ? dimTxtA + "\n" + dimTxtB + "\n" + dimTxtSame
      : applyAction(dimTxtA + "\n" + dimTxtB + "\n" + dimTxtSame, action, true);

  if (fieldId && setItem)
    setItem({
      ...item,
      [fieldId]: `${rateStr}\n${rateStrDim}\n ${item.Rate} `,
    });
  else return `${rateStr}\n${rateStrDim}\n ${item.Rate}`;
};
