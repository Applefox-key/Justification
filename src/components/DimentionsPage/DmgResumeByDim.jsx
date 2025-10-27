import React, { useEffect, useState } from "react";
import { defaultDimSets } from "../../constants/dimDefault";
import {
  compareTextCategoriesLang,
  compareTextsByParts,
  compareTextsBySentences,
  composeOneDim,
  composeOneDimResume,
  getResumeByDim,
  getVerdictbyOneDim,
} from "../../utils/rates";

const DmgResumeByDim = ({ item, className = "" }) => {
  const [justParts, setJustParts] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const justParts_ = getResumeByDim(item, true);
    setJustParts(justParts_);
  }, [item]);

  return (
    <div className={"JustifTxt " + className}>
      {justParts.length &&
        justParts.map((dim, i) => (
          <>
            {/* <div className="one-dim-resume"> */}
            <div className="menu-accent"> {dim.name}</div>
            <div className="w-100 d-flex">
              <div className="one-dim-resume">
                <div className="header">responseA</div>
                <div className="one-resp-resume" dangerouslySetInnerHTML={{ __html: dim.texta }} />
                <div className="header">responseB</div>
                <div className="one-resp-resume" dangerouslySetInnerHTML={{ __html: dim.textb }} />
              </div>
              <div className="one-dim-resume ">
                <div className="header">🔺Resume</div>
                <div className="header-s">{dim.verdict}</div>

                <div className="one-resp-resume" dangerouslySetInnerHTML={{ __html: dim.resume }} />
              </div>
            </div>
            {/* </div> */}
          </>
        ))}
    </div>
  );
};

export default DmgResumeByDim;
