import React, { useState } from "react";
import { BsChatQuote } from "react-icons/bs";

const BtnFragm = ({ handleTxt, setHandleTxt }) => {
  const [fragments, setFragments] = useState([]);

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

  return (
    <>
      <button
        className="square-btn intense upside-down"
        title="copy fragments in quotation marks"
        onClick={extractFragments}>
        <BsChatQuote />
      </button>
      <div className="fragmBtn">
        <button
          className="square-btn intense"
          disabled={!fragments.length}
          title="paste fragments in quotation marks"
          onClick={replaceFragments}>
          <BsChatQuote />
        </button>
        <div className="fragments-box">
          {fragments.map((oneF, i) => (
            <span>{oneF}</span>
          ))}
        </div>
      </div>
      {/* <button
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
      </button> */}
    </>
  );
};

export default BtnFragm;
