import React, { useState } from "react";

import DmgPageReviewBuilder from "./DmgPageReviewBuilder";
import PageJustif from "./PageJustif";
import DmgPageReview from "./DmgPageReview";
import DmgResumeByDim from "./DmgResumeByDim";

const JustRew = ({ editParam }) => {
  const [content, setContent] = useState("Both");

  const contentArr = {
    Justification: <PageJustif editParam={editParam} />,
    Rewiew: <DmgPageReview editParam={{ ...editParam }} />,
    Resume: <DmgResumeByDim item={editParam.item} />,
    Both: <DmgPageReviewBuilder editParam={editParam} />,
  };
  return (
    <div className={`two-sides-wrap`}>
      <div className={`one-side w-100`}>
        <div className="one-side-panel">
          {Object.keys(contentArr).map((field, i) => (
            <button
              className={content === field ? "active-pan" : ""}
              key={i}
              checked={content === field}
              onClick={() => setContent(field)}>
              {field}
              {content === "DMG" && content === field && <div id="portal-dmg-arrow"> </div>}
            </button>
          ))}
        </div>
        <div className={`${content === "Resume" ? "allowScroll" : ""}`}>{contentArr[content]}</div>
      </div>
    </div>
  );
};

export default JustRew;
