import React, { useState } from "react";
import OneTabBtn from "./OneTabBtn";
import PageRubPrompt from "./PageRubPrompt";
import RubricatorShort from "./RubricatorShort";
import SummaryRubPage from "./SummaryRubPage";
import RubJustifSBS from "./RubJustifSBS";
import OnlyRubScores from "./OnlyRubScores";

const RubBodyTabs = ({ editParam, children }) => {
  const [activeTab, setActiveTab] = useState({ short: "Prompt" });

  const setAct = (newTab) => {
    editParam.fieldFn.onFocus("NULL");
    setActiveTab(newTab);
  };
  return (
    <>
      <div className="tabs justify-content-between">
        {children}
        <div className="d-flex">
          <OneTabBtn {...{ activeTab, setAct, titleID: "Prompt" }} />
          <OneTabBtn {...{ activeTab, setAct, titleID: "Rubricator" }} />
          <OneTabBtn {...{ activeTab, setAct, titleID: "Scores" }} />
          <OneTabBtn {...{ activeTab, setAct, titleID: "Justification SBS" }} />
          <OneTabBtn {...{ activeTab, setAct, titleID: "Justification" }} />
          <OneTabBtn {...{ activeTab, setAct, titleID: "Overall" }} />
          <OneTabBtn {...{ activeTab, setAct, titleID: "Links" }} />
          <OneTabBtn {...{ activeTab, setAct, titleID: "Summary" }} />
        </div>
      </div>
      {activeTab && activeTab.short === "Prompt" ? (
        <PageRubPrompt
          editParam={{
            ...editParam,
          }}
        />
      ) : activeTab && activeTab.short === "Rubricator" ? (
        <RubricatorShort
          editParam={{
            item: editParam.item,
            setItem: editParam.setItem,
            fieldFn: editParam.fieldFn,
            fieldId: editParam.fieldId,
            // countR: editParam.countR,
          }}
        />
      ) : activeTab && activeTab.short === "Scores" ? (
        <OnlyRubScores
          editParam={{
            item: editParam.item,
            setItem: editParam.setItem,
            fieldFn: editParam.fieldFn,
            fieldId: editParam.fieldId,
            // countR: editParam.countR,
          }}
        />
      ) : activeTab && activeTab.short === "Justification SBS" ? (
        <RubJustifSBS
          fieldFn={editParam.fieldFn}
          item={editParam.item}
          fieldId={editParam.fieldId}
          editParam={{
            ...editParam,
          }}
          nameShowOnly={activeTab.short}
        />
      ) : activeTab && activeTab.short !== "Summary" ? (
        <SummaryRubPage
          editParam={{
            ...editParam,
          }}
          nameShowOnly={activeTab.short}
        />
      ) : activeTab && activeTab.short === "Summary" ? (
        <SummaryRubPage
          editParam={{
            ...editParam,
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default RubBodyTabs;
