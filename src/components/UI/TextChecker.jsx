import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { highlightedCheckedText } from "../../utils/utilStr";

const TextChecker = ({ close }) => {
  const [text, setText] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState([]);

  const checkText = () => {
    if (!text) return;
    const doubleSpacesRegex = / {2,}/g;
    const quotesRegex = /"(.*?)"/g; // Найти кавычки и текст между ними
    const dashesRegex = /(\S+)\s*[-–]\s*(\S+)/g; // Найти дефис и слова вокруг него

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
    if (foundErrors.length > 0) {
      setErrors(foundErrors);
    } else alert("ошибок нет");
  };

  return (
    <div className="w-100 h-100">
      {errors.length > 0 ? (
        <div
          className={"setIsTxt-check"}
          onMouseDown={(e) => {
            if (e.button === 1) setErrors([]);
          }}>
          {highlightedCheckedText(text)}
        </div>
      ) : (
        <div className="d-flex w-100 h-100">
          <Form.Control
            as="textarea"
            className={"fit-height w-100"}
            rows={1}
            spellCheck
            placeholder="input text for checking..."
            value={text}
            onMouseDown={(e) => {
              if (e.button !== 1) return;
              if (errors.length > 0) setErrors([]);
              else checkText();
            }}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
      )}

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
      {errors.length > 0 ? (
        <button onClick={() => setErrors([])}>Показать текст</button>
      ) : (
        <button onClick={checkText}>Проверить текст</button>
      )}
      <button onClick={close}>Вернуться к обоснованию</button>
    </div>
  );
};

export default TextChecker;
