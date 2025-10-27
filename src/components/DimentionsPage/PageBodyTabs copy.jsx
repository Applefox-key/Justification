import React, { useState } from "react";
import { defaultDimSets } from "../../constants/dimDefault";
import DmgOneTab from "./DmgOneTab";
import PageJustif from "./PageJustif";
import PageRate from "./PageRate";

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
import PageRespTxt from "./PageRespTxt";
import DimTaskAll from "./DimTaskAll";
import PageRespRate from "./PageRespRate";
import DimAddDetail from "./DimAddDetail";
import MyPortal from "../UI/MyPortal/MyPortal";

import SideWordTmp from "./SideWordTmp";
import DimPageTwoSides from "./DimPageTwoSides";

const PageBodyTabs = ({ editParam, likert, children }) => {
  const [activeTab, setActiveTab] = useState({
    short: "SBS",
    className: "page-work",
  });
  const [showPrompt, setShowPrompt] = useState(false);
  const setAct = (newTab) => {
    editParam.fieldFn.onFocus("NULL");
    setActiveTab(newTab);
  };
  const dims = defaultDimSets[editParam.item.setName].map((field) => field.short);
  const tabs = [
    {
      short: "tbPrompt",
      title: (
        <>
          <IoChatboxEllipsesOutline /> Prompt 🔷
        </>
      ),
      alwaysShow: true,
      // content: <HidenText text={editParam.item.Prompt} />,
      // content: <HidenText>18</HidenText>,
    },
    {
      short: "RespTxt",
      title: "RESPONSES TEXT",
      // content: <RateInform item={editParam.item} />,
    },
    {
      short: "Response_A",
      title: "Model A",
      alwaysShow: true,
      className: "page-work noScroll",
      content: <RateInformOne item={editParam.item} resp="a" />,
    },
    {
      short: "tbResponse_A",
      title: "Model A",
      alwaysShow: true,
      content: <RateInformOne item={editParam.item} resp="a" />,
    },
    {
      short: "tbResponse_B",
      title: "Model B",
      alwaysShow: true,
      content: <RateInformOne item={editParam.item} resp="b" />,
    },

    {
      short: "SBS",
      title: "SIDE by SIDE 🔷",
      content: null,
      className: "page-work",
    },
    {
      short: "Rate",
      title: "RATES",
      // content: <RateInform item={editParam.item} />,
    },
    {
      short: "Justif",
      title: "JUSTIFICATIONS 🔷",
      content: <RateLikert num={editParam.item.likert} callback={likert.setNewRate} />,
      className: "page-work noScroll",
    },

    {
      short: "Review",
      title: "REVIEW",
      content: null,
    },
    {
      short: "DIM",
      title: "DIM",
      content: <DimTab item={editParam.item} fieldFn={editParam.fieldFn} activeTab={activeTab} setAct={setAct} />,
    },
    // {
    //   short: "SBSJ",
    //   title: "COMPARE SBS",
    //   content: null,
    // },
    // {
    //   short: "Review_builder",
    //   title: "REVIEW BUILDER",
    //   content: null,
    //   className: "page-work noScroll",
    // },
    {
      short: "RespRate",
      title: "Resp & RATE",
      // content: <RateInform item={editParam.item} />,
    },
    {
      short: "Task",
      title: "REVIEW TASK",
      content: null,
    },
    {
      short: "TMP",
      title: "TEMPLATES",
      content: <SideWordTmp editParam={editParam} />,
    },
  ];
  const renderTabs = {
    tbPrompt: <DmgPrompt editParam={{ ...editParam, likert }} />,
    Rate: <PageRate editParam={{ ...editParam, likert }} />,
    RespTxt: <PageRespTxt editParam={editParam} />,
    RespRate: <PageRespRate editParam={editParam} />,
    Review: <DmgPageReview editParam={{ ...editParam, likert }} />,
    Review_builder: <DmgPageReviewBuilder editParam={{ ...editParam, likert }} />,
    SBSJ: <DmgRateByDim item={editParam.item} likert={likert} />,
    Response_A: <DimPageTwoSides resp="a" setAct={setAct} editParam={{ ...editParam, likert }} />,
    tbResponse_A: (
      <DmgOneResponse
        editParam={{
          ...editParam,
          field: activeTab,
          setAct,
          activeTab: "tbResponse_A",
        }}
        dimArr={defaultDimSets[editParam.item.setName]}
        resp="a"
      />
    ),
    tbResponse_B: (
      <DmgOneResponse
        editParam={{
          ...editParam,
          field: activeTab,
          setAct,
          activeTab: "tbResponse_B",
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
    Task: <DimTaskAll editParam={{ ...editParam, likert }} />,
  };
  const isPromptNeeded = activeTab.short !== "Prompt" && activeTab.short !== "RespRate";
  return (
    <>
      {/* <div className="block-left"> */}
      <MyPortal containerId="portal-on-tabs">
        {isPromptNeeded && (
          <DimAddDetail id="showPrompt" title="Show Prompt text" val={showPrompt} setVal={setShowPrompt} isBtn />
        )}
      </MyPortal>
      <div className="w-100">
        {isPromptNeeded && showPrompt && (
          <>
            <div className="menu-accent ">Prompt</div>
            <div className={"respDim-footer half-p"}>{editParam.item["Prompt"]}</div>
          </>
        )}
        <div className="d-flex w-100">
          <div id="portal-dmg-page-colon" />
          <div className="page-work-wrap">
            <div id="portal-dmg-page-row" />
            <div
              className={`${activeTab?.className || "page-work"} ${showPrompt && isPromptNeeded ? "mh-50" : ""}`}
              id="page-dim">
              {activeTab && renderTabs[activeTab.short]
                ? renderTabs[activeTab.short]
                : activeTab && (
                    <DmgOneTab
                      showBody={true}
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
        </div>
      </div>
      {/* </div> */}
      <div className="tabs">
        {children}
        {tabs.map((tab) => (
          <OneTab
            key={tab.short}
            id={tab.short}
            alwShow={tab.alwaysShow}
            isActive={
              tab.short === "DIM" ? activeTab && dims.includes(activeTab.short) : activeTab?.short === tab.short
            }
            onClick={
              tab.short === "DIM" || tab.short === "TMP"
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
