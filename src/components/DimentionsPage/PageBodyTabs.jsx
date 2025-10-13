import React, { useState } from "react";
import { defaultDimSets } from "../../constants/textParts";
import DmgOneTab from "./DmgOneTab";
import PageJustif from "./PageJustif";
import PageRate from "./PageRate";
import RateInform from "../Rate/RateInform";
import RateLikert from "../Rate/RateLikert";

import DmgOneResponse from "./DmgOneResponse";
import RateInformOne from "../Rate/RateInformOne";
import OneTab from "./OneTab";
import DimTab from "./DimTab";
import DmgPageReview from "./DmgPageReview";
import DmgPageReviewBuilder from "./DmgPageReviewBuilder";
import DmgTwoResponses from "./DmgTwoResponses";
import DmgRateByDim from "./DmgRateByDim";
import DmgPrompt from "./DmgPrompt";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

import HidenText from "../UI/HidenText";

const PageBodyTabs = ({ editParam, likert, children }) => {
  const [activeTab, setActiveTab] = useState({
    short: "SBS",
    className: "page-work",
  });

  const setAct = (newTab) => {
    editParam.fieldFn.onFocus("NULL");
    setActiveTab(newTab);
  };
  const dims = defaultDimSets[editParam.item.setName].map(
    (field) => field.short
  );
  const tabs = [
    {
      short: "Prompt",
      title: (
        <>
          <IoChatboxEllipsesOutline /> Prompt
        </>
      ),
      content: <HidenText text={editParam.item.Prompt} />,
      // content: <HidenText>18</HidenText>,
    },
    {
      short: "Response_A",
      title: "Response A",
      content: <RateInformOne item={editParam.item} resp="a" />,
    },
    {
      short: "Response_B",
      title: "Response B",
      content: <RateInformOne item={editParam.item} resp="b" />,
    },
    {
      short: "Rate",
      title: "RATE",
      // content: <RateInform item={editParam.item} />,
    },
    {
      short: "SBS",
      title: "SIDE by SIDE",
      content: <></>,
      className: "page-work",
    },
    {
      short: "Justif",
      title: "JUSTIFICATIONS",
      content: (
        <RateLikert num={editParam.item.likert} callback={likert.setNewRate} />
      ),
      className: "page-work noScroll",
    },

    {
      short: "Review",
      title: "REVIEW",
      content: <></>,
    },
    {
      short: "DIM",
      title: "DIM",
      content: (
        <DimTab
          item={editParam.item}
          fieldFn={editParam.fieldFn}
          activeTab={activeTab}
          setAct={setAct}
        />
      ),
    },
    {
      short: "SBSJ",
      title: "COMPARE SBS",
      content: <></>,
    },
    {
      short: "Review_builder",
      title: "REVIEW BUILDER",
      content: <></>,
      className: "page-work noScroll",
    },
  ];
  const renderTabs = {
    Prompt: <DmgPrompt editParam={{ ...editParam, likert }} />,
    Rate: <PageRate editParam={{ ...editParam, likert }} />,
    Review: <DmgPageReview editParam={{ ...editParam, likert }} />,
    Review_builder: (
      <DmgPageReviewBuilder editParam={{ ...editParam, likert }} />
    ),
    SBSJ: <DmgRateByDim item={editParam.item} likert={likert} />,
    Response_A: (
      <DmgOneResponse
        editParam={{
          ...editParam,
          field: activeTab,
          setAct,
          activeTab: "Response_A",
        }}
        dimArr={defaultDimSets[editParam.item.setName]}
        resp="a"
      />
    ),
    Response_B: (
      <DmgOneResponse
        editParam={{
          ...editParam,
          field: activeTab,
          setAct,
          activeTab: "Response_B",
        }}
        dimArr={defaultDimSets[editParam.item.setName]}
        resp="b"
      />
    ),
    SBS: (
      <DmgTwoResponses
        editParam={{
          ...editParam,
          field: activeTab,
          setAct,
          activeTab: "SBS",
        }}
        dimArr={defaultDimSets[editParam.item.setName]}
      />
    ),
    Justif: <PageJustif editParam={{ ...editParam, likert }} />,
  };
  return (
    <>
      <div id="portal-dmg-page-colon" />{" "}
      <div className="page-work-wrap">
        <div id="portal-dmg-page-row" />
        <div className={activeTab?.className || "page-work"} id="page-dim">
          {activeTab && renderTabs[activeTab.short]
            ? renderTabs[activeTab.short]
            : activeTab && (
                <DmgOneTab
                  editParam={{
                    ...editParam,
                    field: activeTab,
                    setAct,
                    activeTab: activeTab.short,
                  }}
                />
              )}
        </div>
      </div>
      <div className="tabs">
        {children}
        {tabs.map((tab) => (
          <OneTab
            key={tab.short}
            isActive={
              tab.short === "DIM"
                ? activeTab && dims.includes(activeTab.short)
                : activeTab?.short === tab.short
            }
            onClick={
              tab.short === "DIM"
                ? null
                : () =>
                    setAct({
                      short: tab.short,
                      className: tab.className || "page-work",
                    })
            }
            title={tab.title}>
            {tab.content}
          </OneTab>
        ))}

        {/* <OneTab
          isActive={activeTab && dims.includes(activeTab.short)}
          onClick={null}
          title="Dimentions">
          <DimTab
            item={editParam.item}
            fieldFn={editParam.fieldFn}
            activeTab={activeTab}
            setAct={setAct}
          />
        </OneTab> */}
      </div>{" "}
    </>
  );
};

export default PageBodyTabs;
