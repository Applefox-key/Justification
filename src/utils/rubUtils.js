const negationPhrase = (phrase) => {
  if (!phrase) return "";
  let cleaned = phrase.replace(/^The response\s*/, "");
  const words = cleaned.split(/\s+/);

  if (words.length > 0) {
    let firstWord = words[0];
    // Удаляем последнюю букву, только если это 's' или 'S'
    if (firstWord.endsWith("s") || firstWord.endsWith("S")) {
      firstWord = firstWord.slice(0, -1);
    }
    words[0] = firstWord;
  }
  return words.join(" ");
};
const getSecondLine = (text) => {
  if (!text || !text.includes("\n")) return "";
  const lines = text.split("\n"); // Разбиваем текст по переносам строк
  const secondLine = lines.length > 1 ? lines[1] : ""; // Индексация с нуля — 0 это первая строка
  return secondLine;
};
export const autoJustifRub = (rubricator) => {
  const resultObj = {}; //response:{doenot:[text1,text2], other:[text3,text4]}

  rubricator.forEach((criterion) => {
    [1, 2, 3, 4].forEach((response) => {
      if (criterion[`score${response}`] > 0) {
        let example = criterion[`error${response}`];

        if (example) {
          //example
          //   example = quoteEachLinePlus(example);
          example = ":" + example;
        }
        const secL = getSecondLine(criterion.comment);
        let com = secL ?? negationPhrase(criterion.rubric);
        let comJ = `— ${com}${example}`;
        if (!resultObj[response]) {
          resultObj[response] = { doesNot: [], other: [] };
        }
        if (!secL) {
          //no negative formulation in a comment

          resultObj[response].doesNot.push(comJ);
        } else {
          resultObj[response].other.push(comJ);
        }
      }
    });
  });
  let result = "";
  // Получаем все ключи и приводим к числам
  const keys = Object.keys(resultObj).map(Number);

  keys.forEach((response) => {
    const item = resultObj[response];
    result += `${response}:\n`;
    result += item.doesNot.length ? `The Response ${response} does not: \n ${item.doesNot.join("\n") + "\n"}` : "";
    result += (item.other.length ? `Also: \n ${item.other.join(`\n`)}` : "") + "\n";
  });

  return result.trim();
};
export const autoJustifRub1 = (rubricator) => {
  const resultObj = {}; //response:{doenot:[text1,text2], other:[text3,text4]}
  const resultObjAll = {}; //critNum:{ title:criteria, respErr: [text1,text2]}

  rubricator.forEach((criterion, critNum) => {
    let sc = 0;

    [1, 2, 3, 4].forEach((response) => {
      let s = criterion[`score${response}`];
      if (s > 0 || s === -1) sc++;
    });

    [1, 2, 3, 4].forEach((response) => {
      if (criterion[`score${response}`] > 0) {
        let example = criterion[`error${response}`];

        const secL = getSecondLine(criterion.comment);
        let com = secL ? secL : negationPhrase(criterion.rubric);
        let comJ = `${com}:${example}`;

        //all have the same issue
        if (sc === 4) {
          if (!resultObjAll[critNum])
            resultObjAll[critNum] = {
              title: (!secL ? "does not " : "") + com,
              errors: [],
            };
          if (example) resultObjAll[critNum].errors.push(`Response${response}:${example}`);
        } else {
          //not all have issues
          if (!resultObj[response]) {
            resultObj[response] = { doesNot: [], other: [] };
          }

          if (!secL) {
            //no negative formulation in a comment
            resultObj[response].doesNot.push("— does not " + comJ);
          } else {
            resultObj[response].other.push("— " + comJ);
          }
        }
      }
    });
  });

  let result = "";
  // Получаем все ключи и приводим к числам
  const keys = Object.keys(resultObj).map(Number);

  keys.forEach((response) => {
    const item = resultObj[response];
    result += `🔘The Response${response} \n`;
    result += !!item.doesNot?.length ? `DOES NOT:\n${item.doesNot.join("\n") + "\n"}` : "";
    result += (item.other.length ? `ALSO: \n ${item.other.join(`\n`)}` : "") + "\n";
  });

  if (resultObjAll) {
    const allText = Object.values(resultObjAll).map(
      (oneCrit) => "— " + oneCrit.title + `\n` + oneCrit.errors.join(`\n`)
    );
    result += "\n";
    result += `🔘All responses have same issues:\n${allText.join("")}`;
  }
  return result.trim();
};
