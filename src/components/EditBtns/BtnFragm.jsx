import React, { useState } from "react";
import { BsChatQuote } from "react-icons/bs";
import { countQuote } from "../../utils/utilStr";
import { usePopup } from "../../hooks/usePopup";

const BtnFragm = ({ handleTxt, setHandleTxt }) => {
  const [fragments, setFragments] = useState([]);
  const setPopup = usePopup();
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
    const countQ = countQuote(handleTxt);
    if (countQ !== 2 * fragments.length) {
      setPopup("the number of quotes does not match");
      return;
    }
    let index = 0;
    const newString = handleTxt.replace(/["«]([^"]*)["»]/g, () => {
      return `"${fragments[index++] || ""}"`;
    });
    setHandleTxt(newString);
  };
  const replaceFragmentsD = () => {
    const countQ = countQuote(handleTxt);
    if (countQ !== 2 * fragments.length) {
      setPopup("the number of quotes does not match");
      return;
    }

    let index = 0;
    const newString = handleTxt.replace(/["«]([^"»]*)["»]/g, (match, expr) => {
      return `"${fragments[index++].trim() || ""}" (${expr})`;
    });

    setHandleTxt(newString);
  };
  return (
    <>
      <button
        className="btnToHis hintBtn  upside-down"
        title="copy fragments in quotation marks"
        onClick={extractFragments}>
        <BsChatQuote />
      </button>

      <div className="fragmBtn">
        <button
          className="square-btn "
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

      <div className="fragmBtn">
        <button
          className="square-btn "
          disabled={!fragments.length}
          title="paste fragments in quotation marks"
          onClick={replaceFragmentsD}>
          <BsChatQuote />
        </button>
        <div className="fragments-box">
          {fragments.map(
            (oneF, i) =>
              oneF && (
                <span>
                  {oneF}({oneF})
                </span>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default BtnFragm;
