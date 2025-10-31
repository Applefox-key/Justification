import React, { useState } from "react";
import { defaultDimSets } from "../../constants/dimDefault";
import DmgOneTab from "./DmgOneTab";

import PageRate from "./PageRate";

import RateLikert from "../Rate/RateLikert";

import RateInformOne from "../Rate/RateInformOne";
import OneTab from "./OneTab";
import DimTab from "./DimTab";

import DmgRateByDim from "./DmgRateByDim";
import DmgPrompt from "./DmgPrompt";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import PageRespTxt from "./PageRespTxt";
import DimTaskAll from "./DimTaskAll";

import DimAddDetail from "./DimAddDetail";
import MyPortal from "../UI/MyPortal/MyPortal";

import SideWordTmp from "./SideWordTmp";
import DimPageTwoSides from "./DimPageTwoSides";
import DimPageTwoSidesSBS from "./DimPageTwoSidesSBS";
import JustRew from "./JustRew";
import WinDragable from "./WinDragable";

import SidePanel from "../TextParts/SidePanel";

const PageBodyTabs = ({ editParam, likert, children }) => {
  const [activeTab, setActiveTab] = useState({
    short: "Prompt",
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
      short: "Prompt",
      title: (
        <>
          <IoChatboxEllipsesOutline /> Prompt 🔷
        </>
      ),
      alwaysShow: true,
    },

    {
      short: "Response_A",
      title: "Model A",
      alwaysShow: true,
      className: "page-work noScroll",
      content: <RateInformOne item={editParam.item} resp="a" />,
    },
    {
      short: "Response_B",
      title: "Model B",
      alwaysShow: true,
      className: "page-work noScroll",
      content: <RateInformOne item={editParam.item} resp="b" />,
    },
    {
      short: "SBSr",
      title: "SIDE by SIDE 🔷",
      content: null,
      className: "page-work noScroll",
    },

    {
      short: "Justifs",
      title: "SUMMARY 🔷",
      content: <RateLikert num={editParam.item.likert} callback={likert.setNewRate} />,
      className: "page-work noScroll",
    },

    {
      short: "Task",
      title: "All TASK",
      content: null,
    },
    {
      short: "DIM",
      title: "DIM",
      content: <DimTab item={editParam.item} fieldFn={editParam.fieldFn} activeTab={activeTab} setAct={setAct} />,
    },

    {
      short: "TMP",
      title: "TEMPLATES",
      content: <SideWordTmp editParam={editParam} />,
    },
  ];
  const tmpArr = [
    {
      short: "DIM",
      title: "DIM",
      content: <DimTab item={editParam.item} fieldFn={editParam.fieldFn} activeTab={activeTab} setAct={setAct} />,
    },

    {
      short: "TMP",
      title: "TEMPLATES",
      content: <SideWordTmp editParam={editParam} />,
    },
  ];
  const renderTabs = {
    Prompt: <DmgPrompt editParam={{ ...editParam, likert }} />,
    Rate: <PageRate editParam={{ ...editParam, likert }} />,
    RespTxt: <PageRespTxt editParam={editParam} />,
    // RespRate: <PageRespRate editParam={editParam} />,
    // Review: <DmgPageReview editParam={{ ...editParam, likert }} />,
    // Review_builder: <DmgPageReviewBuilder editParam={{ ...editParam, likert }} />,
    SBSJ: <DmgRateByDim item={editParam.item} likert={likert} />,
    Response_A: <DimPageTwoSides response="ResponseA" editParam={{ ...editParam, likert }} />,
    Response_B: <DimPageTwoSides response="ResponseB" editParam={{ ...editParam, likert }} />,
    SBSr: <DimPageTwoSidesSBS editParam={{ ...editParam, likert }} />,

    // Justif: <PageJustif editParam={{ ...editParam, likert }} />,
    Justifs: <JustRew editParam={{ ...editParam, likert }} />,
    Task: <DimTaskAll editParam={{ ...editParam, likert }} />,
  };
  const isPromptNeeded = activeTab.short !== "Prompt" && activeTab.short !== "RespRate";
  return (
    <>
      <MyPortal containerId="portal-sub-menu-left">
        {isPromptNeeded && (
          <DimAddDetail id="showPrompt" title="Prompt text" val={showPrompt} setVal={setShowPrompt} isBtn />
        )}
      </MyPortal>
      {editParam.isTemplates && (
        <SidePanel>
          <div className="tabs">
            {children}
            {tmpArr.map((tab) => (
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
          </div>
        </SidePanel>
      )}
      <div className="w-100">
        {isPromptNeeded && showPrompt && (
          <WinDragable title="prompt" close={() => setShowPrompt(false)}>
            {editParam.item["Prompt"]}
          </WinDragable>
        )}
        <div className="d-flex w-100">
          <div id="portal-dmg-page-colon" />
          <div className="page-work-wrap">
            <div id="portal-dmg-page-row" />
            <div className={`${activeTab?.className || "page-work"} `} id="page-dim">
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
      </div>
    </>
  );
};

export default PageBodyTabs;
