import React from "react";

import DropDownBtnsList2 from "../UI/DropDownBtnsList2";

const OneRubMenuWrap = ({ criteria, fieldFn, index, version }) => {
  const handleClickEnd = (e, el) => {
    e.stopPropagation();
    fieldFn.setNewVal(`${el} ${criteria.rubric}`, "rubric-" + index);
  };
  const handleClickStart = (e, el) => {
    e.stopPropagation();
    fieldFn.setNewVal(`${criteria.rubric} ${el}`, "rubric-" + index);
  };

  const btnsArr =
    version === 0
      ? [
          {
            groupName: "ADD RU",
            btns: ["использует", "предлагает", "содержит"].map((el) => {
              return {
                title: `Ответ ${el}...${criteria.rubric}`,
                label: el,
                onClick: (e) => handleClickEnd(e, `Ответ ${el}`),
              };
            }),
          },
        ]
      : [
          {
            groupName: "The response",
            btns: [
              "maintains",
              "uses",
              "contains",
              "mentions",
              "provides",
              "includes",
              "focus on",
            ].map((el) => {
              return {
                title: `The response ${el}...${criteria.rubric}`,
                label: el,
                onClick: (e) => handleClickEnd(e, `The response ${el}`),
              };
            }),
          },
          {
            groupName: "As oppoused",
            btns: [
              "as opoused to, for example ",
              "as opposed to incorrect punctuation (…)",
            ].map((el) => {
              return {
                title: `${criteria.rubric}... ${el} `,
                label: el,
                onClick: (e) => handleClickStart(e, el),
              };
            }),
          },
        ];

  return (
    <div className="sidebtns-box-field" onClick={(e) => e.stopPropagation()}>
      {/* <MenuBtnsWrap btnsArr={btnsArr} /> */}

      <DropDownBtnsList2 title="Response ..." className="respB">
        <>
          {btnsArr.map((gr) => (
            <>
              {gr.groupName}
              {gr.btns.map((el) => (
                <button
                  key={el}
                  // className=" btn-rub-add"
                  onClick={(e) => el.onClick(e)}
                  // onContextMenu={(e) => handleContextMenu(e, el)}
                  title={`${el.title}`}>
                  {el.label}
                </button>
              ))}
            </>
          ))}
        </>
      </DropDownBtnsList2>
    </div>
  );
};

export default OneRubMenuWrap;
