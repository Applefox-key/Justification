import React, { useState } from "react";
import OneTabBtn from "./OneTabBtn";
import PageRubPrompt from "./PageRubPrompt";
import RubricatorShort from "./RubricatorShort";
import SummaryRub from "../Rubrics/SummaryRub";
import SummaryRubPage from "./SummaryRubPage";

const RubBodyTabs = ({ editParam }) => {
  const [activeTab, setActiveTab] = useState(null);

  const setAct = (newTab) => {
    editParam.fieldFn.onFocus("NULL");
    setActiveTab(newTab);
  };
  return (
    <>
      <div className="tabs">
        <OneTabBtn {...{ activeTab, setAct, titleID: "Prompt" }} />
        <OneTabBtn {...{ activeTab, setAct, titleID: "Rubricator" }} />
        <OneTabBtn {...{ activeTab, setAct, titleID: "Summary" }} />
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
            countR: editParam.countR,
          }}
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
