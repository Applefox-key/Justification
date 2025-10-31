import React, { useState } from "react";
import { defaultDimSets } from "../../constants/dimDefault";
import DmgOneTab from "./DmgOneTab";
import RateLikert from "../Rate/RateLikert";
import RateInformOne from "../Rate/RateInformOne";
import OneTab from "./OneTab";
import DimTab from "./DimTab";
import DmgPrompt from "./DmgPrompt";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
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
  ];
  const nontabArr = [
    {
      short: "DIM",
      title: "DIM",
      content: <DimTab item={editParam.item} fieldFn={editParam.fieldFn} activeTab={activeTab} setAct={setAct} />,
      isOpen: true,
    },

    {
      short: "TMP",
      title: "TEMPLATES",
      content: <SideWordTmp editParam={editParam} />,
      isOpen: true,
    },
  ];
  const renderTabs = {
    Prompt: <DmgPrompt editParam={{ ...editParam, likert }} />,
    // Rate: <PageRate editParam={{ ...editParam, likert }} />,
    // RespTxt: <PageRespTxt editParam={editParam} />,
    Response_A: <DimPageTwoSides response="ResponseA" editParam={{ ...editParam, likert }} />,
    Response_B: <DimPageTwoSides response="ResponseB" editParam={{ ...editParam, likert }} />,
    SBSr: <DimPageTwoSidesSBS editParam={{ ...editParam, likert }} />,
    // SBSJ: <DmgRateByDim item={editParam.item} likert={likert} />,
    Justifs: <JustRew editParam={{ ...editParam, likert }} />,
    Task: <DimTaskAll editParam={{ ...editParam, likert }} />,
  };
  const isPromptNeeded = activeTab.short !== "Prompt" && activeTab.short !== "RespRate";
  return (
    <>
      <MyPortal containerId="portal-sub-menu">
        <div className="dimBoxPage tabs-up">
          <div className="d-flex">
            {tabs.map((tab) => (
              <OneTab
                key={tab.short}
                id={tab.short}
                alwShow={tab.alwaysShow}
                isActive={
                  tab.short === "DIM" ? activeTab && dims.includes(activeTab.short) : activeTab?.short === tab.short
                }
                onClick={() =>
                  setAct({
                    short: tab.short,
                    className: tab.className || "page-work",
                  })
                }
                title={tab.title}>
                {/* {tab.content} */}
              </OneTab>
            ))}
            <OneTab
              id="TMP"
              isActive={editParam.isTemplates}
              onClick={(e) => editParam.setIsTemplates(!editParam.isTemplates)}
              title="⛬"
              xs
            />
          </div>
        </div>
      </MyPortal>
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
      {editParam.isTemplates && (
        <SidePanel>
          <div className="tabs">
            {children}
            {[...tabs, ...nontabArr].map((tab) => (
              <OneTab
                key={tab.short}
                id={tab.short}
                alwShow={tab.alwaysShow}
                isOpen={tab.isOpen}
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
        </SidePanel>
      )}{" "}
      <MyPortal containerId="portal-sub-menu-left">
        <DimAddDetail
          id="addDimName"
          hint="automaticaly add a dimention name to justification"
          title="+ dim name"
          val={editParam.addIssueName}
          setVal={editParam.setAddIssueName}
        />
        {isPromptNeeded && <DimAddDetail id="showPrompt" title="Prompt text" val={showPrompt} setVal={setShowPrompt} />}
      </MyPortal>
    </>
  );
};

export default PageBodyTabs;

{
  /* <div className="tabs">
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
      </div> */
}
