import React, { useState } from "react";
import { Form } from "react-bootstrap";

const TextChecker = () => {
  const [text, setText] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState([]);

  const checkText = () => {
    const doubleSpacesRegex = / {2,}/g;
    const quotesRegex = /"(.*?)"/g; // Найти кавычки и текст между ними
    const dashesRegex = /(\S+)\s*-\s*(\S+)/g; // Найти дефис и слова вокруг него

    const foundErrors = [];

    // Проверка на двойные пробелы
    const doubleSpacesMatches = text.match(doubleSpacesRegex);
    if (doubleSpacesMatches) {
      foundErrors.push({
        type: "double-space",
        matches: doubleSpacesMatches,
      });
    }

    // Проверка на кавычки
    const quotesMatches = [];
    let quoteMatch;
    while ((quoteMatch = quotesRegex.exec(text)) !== null) {
      quotesMatches.push(quoteMatch[0]); // Полная строка с кавычками
    }
    if (quotesMatches.length > 0) {
      foundErrors.push({
        type: "quote",
        matches: quotesMatches,
      });
    }

    // Проверка на дефисы
    const dashesMatches = [];
    let dashMatch;
    while ((dashMatch = dashesRegex.exec(text)) !== null) {
      dashesMatches.push(dashMatch[0]); // Полная строка с дефисом
    }
    if (dashesMatches.length > 0) {
      foundErrors.push({
        type: "dash",
        matches: dashesMatches,
      });
    }

    setErrors(foundErrors.length > 0 ? foundErrors : ["ошибок нет"]);
    showErrors(foundErrors);
  };

  const showErrors = (foundErrors) => {
    let message = "";
    if (foundErrors.length === 0) {
      message = "Ошибок нет";
    } else {
      message = foundErrors
        .map((error) => {
          const matchesList = error.matches.join(", ");
          return `Найдены ${
            error.type === "double-space"
              ? "двойные пробелы"
              : error.type === "quote"
              ? "кавычки"
              : "дефисы"
          }: ${matchesList}`;
        })
        .join("\n");
    }

    alert(message);
  };

  return (
    <div className="w-100 h-100">
      {" "}
      <Form.Control
        as="textarea"
        className={"fit-height w-100"}
        rows={1}
        spellCheck
        placeholder="input text for checking..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {/* <textarea
        value={text}
        className={"fit-height w-100"}
        onChange={(e) => setText(e.target.value)}
        // rows="10"
        // cols="50"
        rows={1}
        placeholder="Введите текст для проверки..."
      /> */}
      <br />
      <button onClick={checkText}>Проверить текст</button>
    </div>
  );
};

export default TextChecker;
