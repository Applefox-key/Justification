import React, { useEffect, useState } from "react";

import { getResumeByDim } from "../../utils/rates";
import TaskPart from "./TaskPart";
import { VscTriangleRight } from "react-icons/vsc";
import MyPortal from "../UI/MyPortal/MyPortal";

const DmgResumeByDim = ({ item, className = "" }) => {
  const [justParts, setJustParts] = useState([]);
  const [showBody, setShowBody] = useState(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const justParts_ = getResumeByDim(item, true);
    setJustParts(justParts_);
  }, [item]);

  return (
    <div className={"JustifTxt " + className}>
      <MyPortal containerId="portal-res-arrow">
        <VscTriangleRight onClick={() => setShowBody(!showBody)} className={!showBody ? " " : "arr-down"} />
      </MyPortal>
      {justParts.length &&
        justParts.map((dim, i) => (
          <>
            <TaskPart
              title={
                <div className="d-flex w-100 justify-content-between">
                  <span>{dim.name}</span> <span className="span-xs">{dim.verdict}</span>
                </div>
              }
              defaultShow={showBody ? dim.verdict !== "Both responses have no issues" : showBody}>
              <div className="w-100 d-flex">
                <div className="one-dim-resume">
                  <div className="header">
                    responseA <span>{dim.name}</span>{" "}
                  </div>
                  <div className="one-resp-resume" dangerouslySetInnerHTML={{ __html: dim.texta }} />
                  <div className="header">
                    responseB <span>{dim.name}</span>
                  </div>
                  <div className="one-resp-resume" dangerouslySetInnerHTML={{ __html: dim.textb }} />
                </div>{" "}
                <div className="one-dim-resume ">
                  <div className="header pink">
                    🔺Resume <span>{dim.name}</span>
                  </div>
                  <div className="header-s pink">{dim.verdict}</div>

                  <div className="one-resp-resume" dangerouslySetInnerHTML={{ __html: dim.resume }} />
                </div>{" "}
              </div>
            </TaskPart>
          </>
        ))}
    </div>
  );
};

export default DmgResumeByDim;
