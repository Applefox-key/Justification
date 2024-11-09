const { read, utils } = require("xlsx");

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
