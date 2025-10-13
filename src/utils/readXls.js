import { getRubricName } from "./analysis";

const { read, utils, writeFile } = require("xlsx");

export const readXlsFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: "array" });

      const sheetNames = workbook.SheetNames;
      const result = [];

      sheetNames.forEach((sheetName) => {
        const sheetData = utils.sheet_to_json(workbook.Sheets[sheetName], {
          header: 1,
        });

        if (sheetData.length === 0) {
          return;
        }
        const sheetObj = {
          name: sheetName,
          hint: [],
          items: [],
          levels: [],
        };
        for (let i = 1; i < sheetData.length; i++) {
          const row = sheetData[i];
          if (row[0] || row[1] || row[2]) {
            const lev = row[2] || null;
            if (lev !== null && !sheetObj.levels.includes(lev))
              sheetObj.levels.push(lev);
            const item = {
              en: row[0] || null,
              ru: row[1] || null,
              level: lev,
            };

            sheetObj.items.push(item);
          }
          if (row[3] || row[4]) {
            const hint = {
              en: row[3] || null,
              ru: row[4] || null,
            };
            sheetObj.hint.push(hint);
          }
        }

        result.push(sheetObj);
      });

      resolve({ name: file.name, hint: "", items: result });
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
export const readXlsFileOne = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: "array" });

      const sheetNames = workbook.SheetNames;

      const result = [];
      sheetNames.forEach((sheetName) => {
        const sheetData = utils.sheet_to_json(workbook.Sheets[sheetName], {
          header: 1,
        });

        if (sheetData.length === 0) {
          return;
        }

        for (let i = 1; i < sheetData.length; i++) {
          const row = sheetData[i];
          if (row[0] || row[1] || row[2]) {
            const lev = row[2] || null;
            const note = row[3] || null;
            const item = {
              en: row[0] || null,
              ru: row[1] || null,
              level: lev,
              note: note,
            };

            result.push(item);
          }
        }
      });

      resolve({ name: file.name, hint: "", items: result });
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};
export const rubEx = (item) => {
  const sheetData = [
    ["Промпт", item.prompt],
    [
      "Rubricator",
      "1",
      "2",
      "3",
      "4",
      "error1",
      "error2",
      "error3",
      "error4",
      "",
      "Rubric",
      "example",
      "exExample",
    ],
    ...item.rubricator.map((el) => [
      getRubricName(el, item.version, ["name", "separator", "example"]),
      el.score1,
      el.score2,
      el.score3,
      el.score4,
      el.error1,
      el.error2,
      el.error3,
      el.error4,
      "",
      el.rubric,
      el.example,
      el.exExample,
    ]),

    ["", "", "", "", "", item.stat1, item.stat2, item.stat3, item.stat4],
    ["", "", "", "", "", item.eval1, item.eval2, item.eval3, item.eval4],
    [
      "",
      "",
      "",
      "",
      "",
      item.justif1,
      item.justif2,
      item.justif3,
      item.justif4,
    ],
    // [("", "Eval1", "justif1")],
    // ["1", item.eval1, item.justif1],
    // ["2", item.eval2, item.justif2],
    // ["3", item.eval3, item.justif3],
    // ["4", item.eval4, item.justif4],
  ];

  // Создание листа и книги Excel
  const worksheet = utils.aoa_to_sheet(sheetData);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Rubric Data");

  // Сохранение файла
  writeFile(workbook, "RubricData+" + (item.id ? item.id : "") + ".xlsx");
};
