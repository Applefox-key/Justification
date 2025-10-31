import { replaceByArr, wrapCommonpartsInSpan } from "./utilStr";

//find and highlight common phrases
export const highlightCommonPhrases = (text1, text2, MIN_PHRASE_LEN = 5) => {
  const words1 = text1.split(/\s+/);
  const words2 = text2.split(/\s+/);

  const normalize = (w) => w.toLowerCase().replace(/[^\w]/g, "");
  const lower1 = words1.map(normalize);
  const lower2 = words2.map(normalize);

  // const MIN_PHRASE_LEN = 3;
  const commonPhrases = new Set();

  // перебор всех возможных стартовых позиций
  for (let i = 0; i < lower1.length; i++) {
    for (let j = 0; j < lower2.length; j++) {
      if (lower1[i] === lower2[j] && lower1[i]) {
        let k = 0;
        while (lower1[i + k] && lower2[j + k] && lower1[i + k] === lower2[j + k]) {
          k++;
        }

        if (k >= MIN_PHRASE_LEN) {
          const phrase = words1.slice(i, i + k).join(" ");
          commonPhrases.add(phrase);
          // ⤵ продолжаем поиск со следующего слова (не пропускаем весь блок)
        }
      }
    }
  }

  // Подсвечиваем все найденные фразы
  let highlighted1 = text1;
  let highlighted2 = text2;

  // Чтобы не ломался HTML при повторных заменах — сортируем по длине (длинные сначала)
  const sortedPhrases = Array.from(commonPhrases).sort((a, b) => b.length - a.length);

  for (const phrase of sortedPhrases) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "gi");

    highlighted1 = highlighted1.replace(regex, (m) => `<span class="highlight-wording">${m}</span>`);
    highlighted2 = highlighted2.replace(regex, (m) => `<span class="highlight-wording">${m}</span>`);
  }
  let highlighted1A = highlighted1.split("\n");
  let highlighted2A = highlighted2.split("\n");
  highlighted1 = highlighted1A.join("\n▪️");
  highlighted2 = highlighted2A.join("\n▪️");

  return { highlighted1, highlighted2 };
};

//find and highlight common sentances with examples
export const compareTextsBySentences = (text1, text2, formatText = null) => {
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

  // const [unique1, unique2] = [unique1_, unique2_];
  let unique1_ = unique1;
  let unique2_ = unique2;
  if (formatText) {
    // let highlightedPhrases = highlightUniquePhrases(unique1.join("\n"), unique2.join("\n"));
    let highlightedPhrases = highlightCommonPhrases(unique1.join("\n"), unique2.join("\n"));
    console.log(highlightedPhrases);
    unique1_ = highlightedPhrases.highlighted1;
    unique2_ = highlightedPhrases.highlighted2;
  } else {
    const formatTextBullet = (arr) => arr.join("\n▪️");
    unique1_ = formatTextBullet(unique1);
    unique2_ = formatTextBullet(unique2);
  }
  // const unique1_ = highlightedPhrases.highlighted1;
  // const unique2_ = highlightedPhrases.highlighted2;

  // --- форматируем вывод ---

  let result = "";
  if (commonWithExamples.length) result += "🔰@BOTH RESPONSES:\n▪️" + commonWithExamples.join("\n▪️") + "\n";
  if (unique1.length) result += "@1:\n▪️" + unique1_ + "\n";
  if (unique2.length) result += "@2:\n▪️" + unique2_;
  // if (unique1.length) result += "@1:\n▪️" + formatTextBullet(unique1) + "\n";
  // if (unique2.length) result += "@2:\n▪️" + formatTextBullet(unique2);

  return !formatText ? result : { resume: result, text1: textForm1, text2: textForm2 };
};

//only lang resume without examples
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

// lang resume with examples
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
  if (unique1.length) result += "@1 uses " + unique1.join(", ") + "; ";
  if (unique2.length) result += "@2 uses " + unique2.join(", ") + ". ";
  if (common.length) result += "Both responses use " + common.join(", ") + ". ";
  if (ex1 || ex2) {
    result += `For example, \n`;
    if (ex1.length) result += "@1: " + ex1.join(" ").replace(/[;]/g, ",") + "\n";
    if (ex2.length) result += "@2: " + ex2.join(" ").replace(/[;]/g, ",");
  }

  return result;
};

//find and highlight unique phrases
// export const highlightUniquePhrases = (text1, text2, MIN_PHRASE_LEN = 2) => {
//   const words1 = text1.split(/\s+/);
//   const words2 = text2.split(/\s+/);

//   const normalize = (w) => w.toLowerCase().replace(/[^\w]/g, "");
//   const lower1 = words1.map(normalize);
//   const lower2 = words2.map(normalize);

//   const commonPhrases = new Set();

//   // --- 1. Находим общие фразы ---
//   for (let i = 0; i < lower1.length; i++) {
//     for (let j = 0; j < lower2.length; j++) {
//       if (lower1[i] === lower2[j] && lower1[i]) {
//         let k = 0;
//         while (lower1[i + k] && lower2[j + k] && lower1[i + k] === lower2[j + k]) {
//           k++;
//         }
//         if (k >= MIN_PHRASE_LEN) {
//           const phrase = words1.slice(i, i + k).join(" ");
//           commonPhrases.add(phrase);
//         }
//       }
//     }
//   }

//   // --- 2. Формируем regex для всех общих фраз ---
//   const sortedPhrases = Array.from(commonPhrases).sort((a, b) => b.length - a.length);
//   const regexList = sortedPhrases.map((p) => new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"));

//   // --- 3. Функция для подсветки уникальных ---
//   const highlightUniques = (text) => {
//     let highlighted = "";
//     let lastIndex = 0;

//     // Находим все совпадения общих фраз
//     const matches = [];
//     regexList.forEach((regex) => {
//       let match;
//       while ((match = regex.exec(text)) !== null) {
//         matches.push({ start: match.index, end: regex.lastIndex });
//       }
//     });

//     // Сортируем и объединяем пересекающиеся диапазоны
//     matches.sort((a, b) => a.start - b.start);
//     const merged = [];
//     for (const m of matches) {
//       if (!merged.length || m.start > merged[merged.length - 1].end) {
//         merged.push({ ...m });
//       } else {
//         merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, m.end);
//       }
//     }

//     // Собираем строку с подсветкой уникальных участков
//     merged.forEach(({ start, end }) => {
//       const uniquePart = text.slice(lastIndex, start);
//       if (uniquePart.trim()) {
//         highlighted += `<span class="highlight-wording">${uniquePart}</span>`;
//       }
//       highlighted += text.slice(start, end); // общий кусок остаётся без подсветки
//       lastIndex = end;
//     });

//     // Хвост (после последнего общего участка)
//     const tail = text.slice(lastIndex);
//     if (tail.trim()) {
//       highlighted += `<span class="highlight-wording">${tail}</span>`;
//     }

//     return highlighted;
//   };

//   // --- 4. Подсвечиваем ---
//   const highlighted1 = highlightUniques(text1);
//   const highlighted2 = highlightUniques(text2);

//   return { highlighted1, highlighted2 };
// };

//find all
// export const highlightUniquePhrasesCom = (text1, text2, MIN_PHRASE_LEN = 2) => {
//   const words1 = text1.split(/\s+/);
//   const words2 = text2.split(/\s+/);

//   const normalize = (w) => w.toLowerCase().replace(/[^\w]/g, "");
//   const lower1 = words1.map(normalize);
//   const lower2 = words2.map(normalize);

//   const commonPhrases = new Set();

//   // --- 1. Находим общие фразы ---
//   for (let i = 0; i < lower1.length; i++) {
//     for (let j = 0; j < lower2.length; j++) {
//       if (lower1[i] === lower2[j] && lower1[i]) {
//         let k = 0;
//         while (lower1[i + k] && lower2[j + k] && lower1[i + k] === lower2[j + k]) {
//           k++;
//         }
//         if (k >= MIN_PHRASE_LEN) {
//           const phrase = words1.slice(i, i + k).join(" ");
//           commonPhrases.add(phrase);
//         }
//       }
//     }
//   }

//   // --- 2. Формируем regex для всех общих фраз ---
//   const sortedPhrases = Array.from(commonPhrases).sort((a, b) => b.length - a.length);
//   const regexList = sortedPhrases.map((p) => new RegExp(p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"));

//   // --- 3. Функция для подсветки ---
//   const highlightText = (text) => {
//     let highlighted = "";
//     let lastIndex = 0;

//     // Находим все совпадения общих фраз
//     const matches = [];
//     regexList.forEach((regex) => {
//       let match;
//       while ((match = regex.exec(text)) !== null) {
//         matches.push({ start: match.index, end: regex.lastIndex });
//       }
//     });

//     // Сортируем и объединяем пересекающиеся диапазоны
//     matches.sort((a, b) => a.start - b.start);
//     const merged = [];
//     for (const m of matches) {
//       if (!merged.length || m.start > merged[merged.length - 1].end) {
//         merged.push({ ...m });
//       } else {
//         merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, m.end);
//       }
//     }

//     // Собираем строку с подсветкой и для уникальных, и для общих участков
//     merged.forEach(({ start, end }) => {
//       const uniquePart = text.slice(lastIndex, start);
//       if (uniquePart.trim()) {
//         highlighted += `<span class="highlight-wording">${uniquePart}</span>`;
//       }

//       const commonPart = text.slice(start, end);
//       highlighted += `<span class="common-wording">${commonPart}</span>`;

//       lastIndex = end;
//     });

//     // Хвост (после последнего общего участка)
//     const tail = text.slice(lastIndex);
//     if (tail.trim()) {
//       highlighted += `<span class="highlight-wording">${tail}</span>`;
//     }

//     return highlighted;
//   };

//   // --- 4. Применяем подсветку ---
//   const highlighted1 = highlightText(text1);
//   const highlighted2 = highlightText(text2);

//   return { highlighted1, highlighted2 };
// };
