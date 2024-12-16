// const fs = require("fs");

export const getTxtFile = async (file) => {
  if (!file) throw new Error("no file selected");

  if (file.type !== "text/plain") throw new Error("wrong file type");
  const text = await file.text();

  return text;
};
