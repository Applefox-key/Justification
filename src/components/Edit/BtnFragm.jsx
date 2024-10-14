import React, { useState } from "react";
import { BsChatQuote } from "react-icons/bs";
import { replaceText } from "../../utils/utilStr";

const BtnFragm = ({ handleTxt, setHandleTxt }) => {
  const [fragments, setFragments] = useState([]);
  const replace = (oldV, newV) => {
    const newVal = replaceText(handleTxt, oldV, newV);
    setHandleTxt(newVal);
  };
  // remember quotes from the text
  const extractFragments = () => {
    const matches = handleTxt.match(/["«]([^"»]*)["»]/g);
    if (matches) {
      const cleanedMatches = matches.map((match) =>
        match.replace(/["«»]/g, "")
      );
      setFragments(cleanedMatches);
    } else {
      setFragments([]);
    }
  };

  //back to the text
  const replaceFragments = () => {
    let index = 0;
    const newString = handleTxt.replace(/["«]([^"]*)["»]/g, () => {
      return `"${fragments[index++] || ""}"`;
    });
    setHandleTxt(newString);
  };
  const replaceQuotes = () => {
    let isOpening = true;

    const newVal = handleTxt.replace(/"/g, () => {
      if (isOpening) {
        isOpening = false;
        return "«";
      } else {
        isOpening = true;
        return "»";
      }
    });
    setHandleTxt(newVal);
  };
  return (
    <>
      <button
        className="square-btn intense upside-down"
        title="copy fragments in quotation marks"
        onClick={extractFragments}>
        <BsChatQuote />
      </button>
      <button
        className="square-btn intense"
        title="paste fragments in quotation marks"
        onClick={replaceFragments}>
        <BsChatQuote />
      </button>
      <button
        className="square-btn intense"
        title="replace dash"
        onClick={() => replace("-", "—")}>
        -
      </button>{" "}
      <button
        className="square-btn intense"
        title="replace quotes"
        onClick={replaceQuotes}>
        «»
      </button>
    </>
  );
};

export default BtnFragm;
