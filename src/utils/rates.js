import { defaultDimSets } from "../constants/dimDefault";
import { recomDim } from "./analysis";
import { applyAction, replaceByArr, wrapCommonpartsInSpan } from "./utilStr";
const minDiv = `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;
const minDivShort = `➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖`;
// export const rateIcons = ["⚪", "🔴", "🔴", "🟡", "🟢", "🟢"];
export const rateIcons = ["✖️", "🔴", "🔴", "🟡", "🟢", "🟢"];
export const rateColorClasses = ["", "red-border", "red-border", "orange-border", "green-border", "green-border"];
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

export const compareTextsBySentences = (text1, text2, formatText = false) => {
  const splitToSentences = (text) =>
    text
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);

  const sentences1 = splitToSentences(text1);
  const sentences2 = splitToSentences(text2);

  const normalize = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();

  const norm1 = sentences1.map(normalize);
  const norm2 = sentences2.map(normalize);

  const set2 = new Set(norm2);
  const set1 = new Set(norm1);

  // --- определяем общие ---
  const common = [];
  norm1.forEach((s, i) => {
    if (set2.has(s)) common.push(sentences1[i]);
  });
  console.log(common);
  let textForm1 = "";
  let textForm2 = "";
  if (formatText) {
    textForm1 = wrapCommonpartsInSpan(text1, common);
    textForm2 = wrapCommonpartsInSpan(text2, common);
  }
  // --- добавляем примеры в общий блок ---
  const exampleStarters = ["for example", "for instance", "such as"];
  const startsWithExample = (s) => exampleStarters.some((p) => normalize(s).startsWith(p));

  const commonWithExamples = common.map((commonSentence) => {
    const idx1 = sentences1.findIndex((s) => normalize(s) === normalize(commonSentence));
    const idx2 = sentences2.findIndex((s) => normalize(s) === normalize(commonSentence));

    const next1 = sentences1[idx1 + 1];
    const next2 = sentences2[idx2 + 1];

    let ex1 = next1 && startsWithExample(next1) ? next1 : null;
    let ex2 = next2 && startsWithExample(next2) ? next2 : null;

    const replacements = [
      { oldT: ["the response is"], newT: "both responses are", caseSensitive: true },
      { oldT: ["the model is"], newT: "both models are", caseSensitive: true },
      { oldT: ["the answer is"], newT: "both answers are", caseSensitive: true },
      { oldT: ["the response"], newT: "both responses", caseSensitive: true },
      { oldT: ["the model"], newT: "both models", caseSensitive: true },
      { oldT: ["the answer"], newT: "both answers", caseSensitive: true },
      { oldT: ["The response is"], newT: "Both responses are", caseSensitive: true },
      { oldT: ["The model is"], newT: "Both models are", caseSensitive: true },
      { oldT: ["The answer is"], newT: "Both answers are", caseSensitive: true },
      { oldT: ["The response"], newT: "Both responses", caseSensitive: true },
      { oldT: ["The model"], newT: "Both models", caseSensitive: true },
      { oldT: ["The answer"], newT: "Both answers", caseSensitive: true },
    ];
    let commonForm = commonSentence;
    if (formatText) {
      commonForm = wrapCommonpartsInSpan(commonSentence, common);
    }
    const commonSentenceNormalize = replaceByArr(replacements, commonForm);

    ex1 = !ex1
      ? ""
      : ex1
          .replace(/\bfor example,\b/gi, "")
          .replace(/\bfor example\b/gi, "")
          .replace(/\bfor instance,\b/gi, "")
          .replace(/\bfor instance\b/gi, "");
    ex2 = !ex2
      ? ""
      : ex2
          .replace(/\bfor example,\b/gi, "")
          .replace(/\bfor example\b/gi, "")
          .replace(/\bfor instance,\b/gi, "")
          .replace(/\bfor instance\b/gi, "");
    if (ex1 || ex2) {
      return `${commonSentenceNormalize} For example:\n   → @1 ${ex1 || "(нет примера)"}\n   → @2${
        ex2 || "(нет примера)"
      }`;
    }
    return commonSentenceNormalize;
  });

  // --- исключаем "for example..." из уникальных ---
  const isExampleSentence = (s) => startsWithExample(s);

  const unique1 = sentences1.filter((s) => !set2.has(normalize(s)) && !isExampleSentence(s));
  const unique2 = sentences2.filter((s) => !set1.has(normalize(s)) && !isExampleSentence(s));

  // --- форматируем вывод ---
  const formatTextBullet = (arr) => arr.join("\n▪️");

  let result = "";
  if (commonWithExamples.length) result += "@BOTH RESPONSES:\n▪️" + commonWithExamples.join("\n▪️") + "\n";
  if (unique1.length) result += "@1:\n▪️" + formatTextBullet(unique1) + "\n";
  if (unique2.length) result += "@2:\n▪️" + formatTextBullet(unique2);

  return !formatText ? result : { resume: result, text1: textForm1, text2: textForm2 };
};
export const compareTextCategoriesLang = (text1, text2) => {
  // Функция для извлечения всех частей от "—" до ":" из текста
  const extractParts = (text) => {
    return Array.from(
      text.matchAll(/—\s*([^:;]+)(?=[:;]|$)/g) // ищем до двоеточия, точки с запятой или конца текста
    ).map((m) => m[1].trim());
  };

  const parts1 = extractParts(text1);
  const parts2 = extractParts(text2);

  // Общие
  const common = parts1.filter((x) => parts2.includes(x));

  // Уникальные
  const unique1 = parts1.filter((x) => !parts2.includes(x));
  const unique2 = parts2.filter((x) => !parts1.includes(x));

  // Возвращаем строки

  let result = "";
  if (common.length) result += "Both responses use " + common.join(", ");
  if (unique1.length) result += ". @1 uses " + unique1.join(", ");
  if (unique2.length) result += ". @2 uses " + unique2.join(", ");
  return result;
};
export const compareTextsByParts = (text1, text2) => {
  // Функция разбивает текст на строки и выделяет часть до и после двоеточия
  const splitToParts = (text) =>
    text
      .split("\n")
      .map((line) => {
        const match = line.match(/^\s*[-–—]?\s*(.+?):\s*(.*)$/); // до и после двоеточия
        if (!match) return null;
        return { before: match[1].trim(), after: match[2].trim() };
      })
      .filter(Boolean);

  const parts1 = splitToParts(text1);
  const parts2 = splitToParts(text2);

  // Нормализуем для сравнения
  const normalize = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();

  const norm1 = parts1.map((p) => normalize(p.before));
  const norm2 = parts2.map((p) => normalize(p.before));

  const set2 = new Set(norm2);
  const common = [];
  const unique1 = [];
  const unique2 = [];
  const ex1 = [];
  const ex2 = [];

  // Сравнение для первого текста
  norm1.forEach((s, i) => {
    if (set2.has(s)) {
      common.push(parts1[i].before);
      if (parts1[i].after) ex1.push(parts1[i].after);
    } else {
      unique1.push(parts1[i].before);
      if (parts1[i].after) ex1.push(parts1[i].after);
    }
  });

  // Для второго текста
  const set1 = new Set(norm1);
  parts2.forEach((p, i) => {
    if (!set1.has(norm2[i])) {
      unique2.push(p.before);
      if (p.after) ex2.push(p.after);
    } else if (p.after) {
      ex2.push(p.after);
    }
  });

  // Формирование результата
  let result = "";
  if (common.length) result += "Both responses use " + common.join(", ");
  if (unique1.length) result += "@1 uses " + unique1.join(", ");
  if (unique2.length) result += "@2 uses " + unique2.join(", ");
  if (ex1 || ex2) {
    result += `\nFor example, \n`;
    if (ex1.length) result += "@1 " + ex1.join(" ") + "\n";
    if (ex2.length) result += "@2 " + ex2.join(" ");
  }

  return result;
};
export const getVerdictbyOneDim = (ea, eb, dim) => {
  let verdict = "";
  if (ea > eb) {
    verdict = `Response A ${dim.better ?? "is better at " + dim.name}.`;
    verdict += ea < 5 ? `It has fewer errors ` : `It has no issues.`;
    verdict += `Response B ${dim.worth ?? "is worth at " + dim.name}.`;
  } else if (eb > ea) {
    verdict = `Response B ${dim.better ?? "is better at " + dim.name}.`;
    verdict += eb < 5 ? `  It has fewer errors.\n}` : `It has no issues with`;
    verdict += `Response A ${dim.worth ?? "is worth at " + dim.name}.`;
  } else if (ea === 5) {
    // оба идеальные
    verdict = `Both responses have no issues`;
    return verdict;
  } else {
    verdict = `Both responses have issues with ${dim.name}.`;
  }
  return verdict;
};

export const getResumeByDim = (item, formatResults = false) => {
  let mainResult = defaultDimSets[item.setName].map((dim, i) => {
    const name = dim.name;
    let texta = item[dim.a];
    let textb = item[dim.b];
    let resume = "";
    if (dim.isLang) resume = compareTextsByParts(texta, textb);
    else {
      let res = compareTextsBySentences(texta, textb, formatResults);
      if (formatResults) {
        resume = res.resume;
        texta = res.text1;
        textb = res.text2;
      } else resume = res;
    }
    const verdict = getVerdictbyOneDim(item.Evals[dim.a], item.Evals[dim.b], dim);
    return { name, texta, textb, resume, verdict };
  });
  return mainResult;
};
export const getResumeByDimTXT = (item, formatResults = false) => {
  let tmpResult = getResumeByDim(item, formatResults);

  let mainResult = tmpResult.map((dim) => ["🔘" + dim.name, dim.verdict, "🔺RESUME", dim.resume].join("\n"));

  return mainResult.join("\n\n");
};

export const composeRateBothByDim = (param) => {
  const { item, setItem, fieldId, best, setresult = null, action = null } = param;

  const divider = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

  const dividerMain = `⚌⚌⚌⚌⚌⚌⚌⚌⚌\n`;
  let resultByDim = [];
  const recom = recomDim(item.Evals, item.setName && defaultDimSets[item.setName]).recom;
  let rateStrDim = `${recom}\n${best.title ? best.title : `Rate is unset`}\n${dividerMain}`;
  defaultDimSets[item.setName].forEach((elAb) => {
    const ea = item.Evals[elAb.a];
    const eb = item.Evals[elAb.b];
    const resume = elAb.isLang
      ? compareTextCategoriesLang(item[elAb.a], item[elAb.b])
      : compareTextsBySentences(item[elAb.a], item[elAb.b]);
    let resDim = [];
    if (ea > eb) {
      resDim.push(`1️⃣👍Response A ${elAb.better ?? "is better at " + elAb.name}.`);

      resDim.push(
        ea < 5
          ? `  It has fewer errors with ${elAb.name}.\n▪️${formatTextBullet(item[elAb.a])}`
          : `▪️It has no issues with ${elAb.name}`
      );

      // if (ea < 5) {
      //   resDim.push(`It has fewer errors with ${elAb.name}.`);
      //   resDim.push(`▪️${formatText(item[elAb.a])}`);
      // } else resDim.push(`\n1️⃣👍Response A has no issues with ${elAb.name}`);

      resDim.push(`2️⃣👎Response B ${elAb.worth ?? "is worth at " + elAb.name}.`);
      resDim.push(`▪️${formatTextBullet(item[elAb.b])}`);
      // resDim.push("\n");
    } else if (eb > ea) {
      resDim.push(`2️⃣👍Response B ${elAb.better ?? "is better at " + elAb.name}.`);
      resDim.push(
        eb < 5
          ? `  It has fewer errors with ${elAb.name}.\n▪️${formatTextBullet(item[elAb.b])}`
          : `▪️It has no issues with ${elAb.name}`
      );
      resDim.push(`1️⃣👎Response A ${elAb.worth ?? "is worth at " + elAb.name}.`);
      // resDim.push(dividerS);
      resDim.push(`▪️${formatTextBullet(item[elAb.a])}`);
      // resDim.push(`\n`);
    } else if (ea === 5) {
      // оба идеальные
      resDim.push(`▪️Both responses have no issues.`);
      resultByDim.push({ dim: elAb, just: resDim.join("\n") });
      rateStrDim += `\n${divider}\n🔘${elAb.name.toUpperCase()}: ${resDim.join("\n")}`;
      return;
    } else {
      resDim.push(
        `Both responses have issues with ${elAb.name};\n` +
          `1️⃣👎Response A: \n▪️${formatTextBullet(item[elAb.a])};\n` +
          `2️⃣👎Response B: \n▪️${formatTextBullet(item[elAb.b])}`
      );
    }
    resultByDim.push({ dim: elAb, just: resDim.join("\n") });
    // rateStrDim += `
    //   ${divider} ${elAb.name.toUpperCase()}🔘${divider}${resDim.join("\n")}`;
    rateStrDim += `\n${minDivShort}\n🔘${elAb.name.toUpperCase()}\n${minDivShort}\n${resDim.join("\n")}`;
    if (action !== null) rateStrDim = applyAction(rateStrDim, action, true);
  });
  if (setItem)
    setItem({
      ...item,
      [fieldId]: `${rateStrDim}\n  `,
    });
  if (setresult !== null) setresult(resultByDim);
};

export const composeOneDimResume = (elAb, item) => {
  const ea = item.Evals[elAb.a];
  const eb = item.Evals[elAb.b];
  let block;

  if (ea > eb) {
    // A лучше
    block = [`🔘${elAb.name.toUpperCase()}: 🅰️👑`];
    block.push(`Response A ${elAb.better ?? "is better at " + elAb.name}.`);

    if (ea < 5) {
      block.push(`🔲Response A has fewer errors in ${elAb.name}:`);
      block.push(`▪️${formatTextBullet(item[elAb.a])}`);
    } else block.push(`\n🔲Response A has no errors with ${elAb.name}`);
    block.push(`🔲Response B ${elAb.worth ?? "is worse at " + elAb.name}:`);
    block.push(`▪️${formatTextBullet(item[elAb.b])}`);

    // block.push(dividerS);
    // dimTxtA.push(block.join(`\n`));
  } else if (eb > ea) {
    block = [`🔘${elAb.name.toUpperCase()}: 🅱️👑`];
    block.push(`Response B ${elAb.better ?? "is better at " + elAb.name}.`);

    if (eb < 5) {
      block.push(`🔲Response B has fewer errors in ${elAb.name}:`);
      block.push(`▪️${formatTextBullet(item[elAb.b])}`);
    } else block.push(`\n🔲Response B has no errors (${elAb.name})`);
    block.push(`🔲Response A ${elAb.worth ?? "is worse at " + elAb.name}:`);
    block.push(`▪️${formatTextBullet(item[elAb.a])}`);

    // dimTxtB.push(block.join(`\n`));
  } else {
    // равные
    if (ea === 5) {
      // без проблем — копим просто список имён измерений
      // dimTxtSameNoIssues.push(`🔘${elAb.name.toUpperCase()}`);
    } else {
      let block = [`🔘${elAb.name}: Both responses have issues with ${elAb.name}.`];

      block.push(`🔲Response A:\n▪️${formatTextBullet(item[elAb.a])}`);
      block.push(`🔲Response B:\n▪️${formatTextBullet(item[elAb.b])}`);
      block.push(minDivShort);

      // dimTxtSame.push(block.join("\n"));
    }
  }
  return block ? block.join(`\n`) : "";
};

export const composeRateByScores = (param) => {
  const { item, setItem, fieldId, best, setresult = null, isFull = false, action = null } = param;
  const dividerS = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
  const divider = `⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌⚌`;
  const recom = recomDim(item.Evals, item.setName && defaultDimSets[item.setName]).recom;
  const rateStr = `${recom}\n${best.title ? best.title : "Rate is unset"}\n`;
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
        let block = [`🔘${elAb.name}: Both responses have issues with ${elAb.name}.`];
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
  if (setresult !== null) setresult([A.join("\n"), B.join("\n"), IssueSame.join("\n"), NoIssueSame.join("\n")]);
};
export const composeByResp = (param) => {
  const { item, setItem, fieldId, best } = param;

  // (item, setItem, fieldId, best) => {
  const recom = recomDim(item.Evals, item.setName && defaultDimSets[item.setName]).recom;
  const rateStr = `${recom}\n${best ? best.title : "Rate is unset"}`;
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
const composeOneDim = (param, bestResp, score, noExamples = false) => {
  const { dim, errA, errB } = param;
  let compbyString = "";
  // const formatText = (txt) => (txt ? txt.replace(/\r?\n/g, "\n▪️") : "");
  if (noExamples) {
    if (dim.isLang) compbyString = compareTextCategoriesLang(param.errA, param.errB);
    else compbyString = compareTextsBySentences(param.errA, param.errB);
    // console.log(dim.name);
    // console.log(compbyString);
  }
  if (bestResp === 0) {
    let block = [`🔘${dim.name.toUpperCase()} `];

    // block.push(minDivShort);
    block.push(`Both responses have issues with ${dim.name}.`);
    if (!noExamples) {
      block.push(`Response A:\n▪️${formatTextBullet(errA)}`);
      block.push(`Response B:\n▪️${formatTextBullet(errB)}`);
    } else if (compbyString) block.push("\n🔺RESUME: " + compbyString);
    block.push(minDivShort);
    // block.push(`\n`);
    return block.join(`\n`);
  }

  let respBest = bestResp === 1 ? { name: "Response A", err: errA } : { name: "Response B", err: errB };
  let respWorse = bestResp === 2 ? { name: "Response A", err: errA } : { name: "Response B", err: errB };
  let block = [];

  const betterTxt = score < 5 ? "has fewer errors with" : "has no errors with";
  block.push(minDivShort);
  block.push(`🔘${dim.name.toUpperCase()}`);
  block.push(minDivShort);

  block.push(
    `${respBest.name} ${betterTxt} ${dim.name}, while ${respWorse.name} ${dim.worth ?? "is worse at " + dim.name}:`
  );
  // if (score < 5)
  if (!noExamples) {
    block.push(`\n⭐EXAMPLES`);
    block.push(`(${respBest.name}:\n▪️${formatTextBullet(respBest.err)})`);
    block.push(`(${respWorse.name}:\n▪️${formatTextBullet(respWorse.err)})`);
  } else if (compbyString) block.push("\n🔺RESUME: " + compbyString);
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
        `\n${symb1}➕  Despite the fact that RESPONSE ${title1}} worse at ${dim2Better.join(
          ", "
        )}, it is still better since it wins in ${dim1Better.join(", ")}\n${minDiv}\n`
      );
    // else parts.push(`\nRESPONSE${symb1}➕ RESPONSE ${title1} BETTER in ${dim1Better.join(", ")}\n${minDiv}\n`);
    else parts.push(`\nRESPONSE${symb1} IS BETTER IN ${dim1Better.join(", ")}\n${minDiv}\n`);
    //Despite the fact that his localization is slightly worse, he follows the instructions better.
    parts.push(dimTxt1.join("\n"));
  }
  if (dimTxt2.length) {
    parts.push(`\n${symb2}➕ RESPONSE ${title2} BETTER in ${dim2Better.join(", ")}\n${minDiv}`);
    parts.push(dimTxt2.join("\n"));
  }
};

export const justificationByScores = (param) => {
  const { item, setItem, fieldId, best, setresult = null, action = null } = param;

  let dimABetter = [];
  let dimBBetter = [];
  let dimSameErr = [];

  const A = [];
  const B = [];
  const IssueSame = [];
  const NoIssueSame = [];
  // const formatText = (txt) => (txt ? txt.replace(/\r?\n/g, "\n▪️") : "");
  // const dividerM = "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
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
    let compbyString = "";

    // if (elAb.isLang) compbyString = compareTextCategoriesLang(param.errA, param.errB);
    // else compbyString = compareTextsBySentences(param.errA, param.errB);
    if (ea > eb) {
      dimABetter.push(elAb.name);
      if (compbyString) dimABetter.push("\n" + compbyString);
      let res = composeOneDim(param, 1, ea);
      dimTxtA.push(res);
    } else if (eb > ea) {
      dimBBetter.push(elAb.name);
      if (compbyString) dimBBetter.push("\n" + compbyString);
      let res = composeOneDim(param, 2, eb);
      dimTxtB.push(res);
    } else if (ea === 5) {
      dimTxtSameNoIssues.push(`${elAb.name}`);
    } else {
      dimSameErr.push(elAb.name);
      if (compbyString) dimSameErr.push("\n" + compbyString);
      let res = composeOneDim(param, 0, ea);
      dimTxtSame.push(res);
    }
  });
  // let rateStr = (best.title ? best.title : "Rate is unset") + `\n`;
  // Собираем секции корректно, без оператора запятая
  const recom = recomDim(item.Evals, item.setName && defaultDimSets[item.setName]).recom;
  const parts = [`${recom}\n${best.title ? best.title : "Rate is unset"}`]; // ведущий перенос

  if (best.num === 5) {
    //same
    parts.push(`Both responses are the same in quality`);
    if (dimTxtA.length) parts.push(dimTxtA.join("\n"));
    if (dimTxtB.length) parts.push(dimTxtB.join("\n"));
  } else if (best.num < 5) {
    compOneR(1, dimTxtA, dimABetter, dimTxtB, dimBBetter, parts);
  } else {
    compOneR(2, dimTxtB, dimBBetter, dimTxtA, dimABetter, parts);
  }

  if (dimTxtSame.length) {
    const otherw = dimABetter.length && dimBBetter.length ? "Otherwise, both" : "Both";
    parts.push(`\n 🅾️🟰 ${otherw} responses have issues with ${dimSameErr.join(", ")}`);
    parts.push(minDiv);
    parts.push(`${dimTxtSame.join("\n")}`);
  }

  const rateStrDim = action === null ? parts.join("\n") : applyAction(parts.join("\n"), action, true);

  setItem({
    ...item,
    [fieldId]: `${rateStrDim}\n ${item.Rate} `,
  });
  if (setresult !== null) setresult([A.join("\n"), B.join("\n"), IssueSame.join("\n"), NoIssueSame.join("\n")]);
};
export const justificationBySentences = (param) => {
  const { item, setItem, fieldId, best, setresult = null, action = null } = param;

  let dimABetter = [];
  let dimSentences = [];
  let dimBBetter = [];
  let dimSameErr = [];

  const A = [];
  const B = [];
  const IssueSame = [];
  const NoIssueSame = [];
  // const formatText = (txt) => (txt ? txt.replace(/\r?\n/g, "\n▪️") : "");
  // const dividerM = "\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
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
      // if (compbyString) dimTxtA.push("\n🔺" + compbyString);
      let res = composeOneDim(param, 1, ea, true);
      dimTxtA.push(res);
    } else if (eb > ea) {
      dimBBetter.push(elAb.name);
      // if (compbyString) dimTxtB.push("\n🔺" + compbyString);
      let res = composeOneDim(param, 2, eb, true);
      dimTxtB.push(res);
    } else if (ea === 5) {
      dimTxtSameNoIssues.push(`${elAb.name}`);
    } else {
      dimSameErr.push(elAb.name);
      // if (compbyString) dimTxtSame.push("\n🔺" + compbyString);
      let res = composeOneDim(param, 0, ea, true);
      dimTxtSame.push(res);
    }
  });
  // let rateStr = (best.title ? best.title : "Rate is unset") + `\n`;
  // Собираем секции корректно, без оператора запятая
  const recom = recomDim(item.Evals, item.setName && defaultDimSets[item.setName]).recom;
  const parts = [`${recom}\n${best.title ? best.title : "Rate is unset"}`]; // ведущий перенос

  if (best.num === 5) {
    //same
    parts.push(`Both responses are the same in quality`);
    if (dimTxtA.length) parts.push(dimTxtA.join("\n"));
    if (dimTxtB.length) parts.push(dimTxtB.join("\n"));
  } else if (best.num < 5) {
    compOneR(1, dimTxtA, dimABetter, dimTxtB, dimBBetter, parts);
  } else {
    compOneR(2, dimTxtB, dimBBetter, dimTxtA, dimABetter, parts);
  }

  if (dimTxtSame.length) {
    const otherw = dimABetter.length && dimBBetter.length ? "Otherwise, both" : "Both";
    parts.push(`\n 🅾️🟰 ${otherw} responses have issues with ${dimSameErr.join(", ")}`);

    parts.push(minDiv);
    parts.push(`${dimTxtSame.join("\n")}`);
  }

  const rateStrDim = action === null ? parts.join("\n") : applyAction(parts.join("\n"), action, true);

  setItem({
    ...item,
    [fieldId]: `${rateStrDim}\n ${item.Rate} `,
  });
  if (setresult !== null) setresult([A.join("\n"), B.join("\n"), IssueSame.join("\n"), NoIssueSame.join("\n")]);
};
export const composeRates = (param) => {
  const { item, setItem, fieldId, best } = param;
  const recom = recomDim(item.Evals, item.setName && defaultDimSets[item.setName]).recom;
  const rateStr = `${recom}\n${best ? best.title : "Rate is unset"}`;

  let dimTxtA = "because ";
  let dimTxtB = "because ";
  defaultDimSets[item.setName].forEach((elAb) => {
    const ea = item.Evals[elAb.a];
    const eb = item.Evals[elAb.b];
    if (ea > eb) dimTxtA += "Response A " + elAb.better + "\n";
    if (eb > ea) dimTxtB += "Response B " + elAb.better + "\n";
  });

  const rateStrDim = best.num === 4 ? dimTxtA + " " + dimTxtB : best.num < 4 ? dimTxtA : dimTxtB;
  if (fieldId && setItem)
    setItem({
      ...item,
      [fieldId]: `${rateStr}\n${rateStrDim}\n ${item.Rate} `,
    });
  else return `${rateStr}\n${rateStrDim}\n ${item.Rate} `;
};

export const composeRateBothSimple = (param) => {
  const { item, setItem, fieldId, best, action } = param;
  const recom = recomDim(item.Evals, item.setName && defaultDimSets[item.setName]).recom;
  const rateStr = `${recom}\n${best ? best.title : "Rate is unset"}`;
  let dimTxtA = "";
  let dimTxtB = "";
  let dimTxtSame = "Responses are the same at ";
  defaultDimSets[item.setName].forEach((elAb) => {
    const ea = item.Evals[elAb.a];
    const eb = item.Evals[elAb.b];
    if (ea > eb) dimTxtA += "Response A " + elAb.better + ".\n";
    if (eb > ea) dimTxtB += "Response B " + elAb.better + ".\n";
    if (eb === ea) dimTxtSame += (dimTxtSame !== "Responses are the same at " ? ", " : "") + elAb.name;
  });
  dimTxtSame = dimTxtSame !== "Responses are the same at " ? dimTxtSame + "." : "";
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
