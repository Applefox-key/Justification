import React, { useRef, useState } from "react";
import EditFieldDmg from "../Dimentions/EditFieldDmg";
import RateBoxes from "../Rate/RateBoxes";
import { getActionButtons } from "../../utils/dimentions";
import DmgRateByDim from "./DmgRateByDim";
import { getCursorPosById } from "../../utils/DOMfn";
import DimAddDetail from "./DimAddDetail";
import DmgResumeByDim from "./DmgResumeByDim";

const DmgPageReviewBuilder = ({ editParam }) => {
  const { setIsTxt, item, fieldFn, fieldId, isTxt, setItem, likert, action } = editParam;
  const [showFormTxt, setShowFormTxt] = useState(false);
  const posRev = useRef();
  const setByDim = () => {
    setShowFormTxt(!showFormTxt);
  };
  const updateReview = (text) => {
    const pos = posRev.current;
    const newVal = item.review.slice(0, pos) + text + item.review.slice(pos);
    // fieldFn.setNewValF(item.review + " " + text, "review");
    fieldFn.setNewValF(newVal, "review");
  };

  const getAndPaste = (e) => {
    e.stopPropagation();

    const selectedText = window.getSelection().toString().trim();
    if (selectedText) updateReview(selectedText);
  };

  const actionButtons = getActionButtons({ item, setItem, likert, action });
  const onContextMenu = (e) => {
    e.preventDefault();
    getAndPaste(e);
  };
  const onBlurRew = () => {
    const pos = getCursorPosById("review");
    posRev.current = pos.start;
  };
  return (
    <div className="respDim-footer dmgrew barTask">
      <div className="task-rev-build-body">
        <div className="menu-accent">
          <RateBoxes likert={likert} choosed={item.likert} nospan />
          <div>
            {actionButtons.map(({ label, onClick }) => (
              <button key={label} onClick={onClick}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* <DmgRateByDim item={item} likert={likert} className="partly-height" /> */}
        {showFormTxt ? (
          <DmgResumeByDim item={item} likert={likert} className="partly-height" />
        ) : (
          <EditFieldDmg
            key="Justif"
            fieldName="Justif"
            placeholder="Justif"
            setIsTxt={setIsTxt}
            onContextMenu={onContextMenu}
            classN={
              (fieldId === "Justif" ? "dimField active-field" : "dimField") +
              (likert.best.fields.includes("Justif") ? " best-field" : "")
            }
            isTxt={isTxt && fieldId === "Justif"}
            isActive={fieldId === "Justif"}
            fieldVal={item.Justif}
            fieldFn={fieldFn}
          />
        )}
      </div>

      <div className="task-rev-build-body">
        <div className="menu-accent">
          <div>
            <button onClick={getAndPaste}>add</button>
            <button onClick={() => updateReview("@1:")}>@1</button>
            <button onClick={() => updateReview("@2:")}>@2</button>
          </div>
          <DimAddDetail id="showForm" title="show by dim" val={showFormTxt} setVal={setByDim} />
        </div>

        <EditFieldDmg
          key="review"
          fieldName="review"
          placeholder="review"
          setIsTxt={setIsTxt}
          className="dimField"
          isTxt={isTxt && fieldId === "review"}
          isActive={fieldId === "review"}
          fieldVal={item.review}
          fieldFn={fieldFn}
          onBlur={onBlurRew}
        />
      </div>
    </div>
  );
};

export default DmgPageReviewBuilder;
