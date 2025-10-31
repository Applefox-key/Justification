import React, { useState } from "react";

import DmgPageReviewBuilder from "./DmgPageReviewBuilder";
import PageJustif from "./PageJustif";
import DmgPageReview from "./DmgPageReview";
import DmgResumeByDim from "./DmgResumeByDim";
import MyPortal from "../UI/MyPortal/MyPortal";
import RateInformOne from "../Rate/RateInformOne";

const JustRew = ({ editParam }) => {
  const [content, setContent] = useState("Resume");

  const contentArr = {
    Both: <DmgPageReviewBuilder editParam={editParam} />,
    Justification: <PageJustif editParam={editParam} />,
    Rewiew: <DmgPageReview editParam={{ ...editParam }} />,
    Resume: <DmgResumeByDim item={editParam.item} />,
  };
  return (
    <div className={`two-sides-wrap`}>
      <MyPortal containerId="portal-sub-menu-left">
        <RateInformOne item={editParam.item} />
      </MyPortal>
      <div className={`one-side w-100`}>
        <div className="one-side-panel">
          {Object.keys(contentArr).map((field, i) => (
            <button
              className={content === field ? "active-pan" : ""}
              key={i}
              checked={content === field}
              onClick={() => setContent(field)}>
              {field}
              {content === "Resume" && content === field && <div id="portal-res-arrow"> </div>}
            </button>
          ))}
        </div>
        <div className={`${content === "Resume" ? "allowScroll" : ""}`}>{contentArr[content]}</div>
      </div>
    </div>
  );
};

export default JustRew;
