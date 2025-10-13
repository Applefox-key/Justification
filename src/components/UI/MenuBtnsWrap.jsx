import React, { useRef, useState } from "react";
import { useRightClickCopy } from "../../hooks/useRightClickCopy";

//btnsArray [groupName:"", btns:[{btnName:"",BtnCallBack:()=>{}}]]

const MenuBtnsWrap = ({ btnsArr, alwaysOpen, defaultOpen = null }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isAlwaysOpen, setIsAlwaysOpen] = useState(alwaysOpen);
  const refBox = useRef(null);

  // useOutsideClick(refBox, () => setIsOpen(null));
  const onContextMenuClick = useRightClickCopy();
  const onHandleCLick = (e, btn) => {
    let b = e.button;
    e.stopPropagation();
    if (b === 2 && btn.RightClickCopy) onContextMenuClick(e, btn.title);
    else if (btn.onClick) btn.onClick(e);
  };

  return (
    <div className="hot " ref={refBox}>
      <button
        className="square-btn hotBtnGr bit-intense"
        onClick={(e) => {
          e.stopPropagation();
          setIsAlwaysOpen(!isAlwaysOpen);
        }}>
        {`>`}
      </button>
      {btnsArr.map((oneBtn, gi) => (
        <div className="hot-menu flex-row" key={oneBtn.groupName}>
          <button
            className="square-btn hotBtnGr bit-intense"
            key={oneBtn.groupName}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(isOpen === oneBtn.groupName ? null : oneBtn.groupName);
            }}>
            {oneBtn.groupName}
          </button>

          {(isAlwaysOpen || isOpen === oneBtn.groupName) && (
            <div className="hot-sum">
              {oneBtn.btns.map((btn, i) => (
                <div className="hot-one" key={i}>
                  <button
                    key={oneBtn.groupName + i}
                    className={`square-btn hot-menu-btn  ${
                      btn?.bold ? " colorBtn" : ""
                    }`}
                    title={btn.title}
                    onMouseDown={(e) => onHandleCLick(e, btn)}
                    onContextMenu={(e) => onHandleCLick(e, btn)}>
                    {btn.label}
                  </button>
                  {btn.subList && (
                    <div>
                      {btn.subList.map((subBtn, j) => (
                        <button
                          key={"sb" + j}
                          className={`square-btn hot-menu-btn  ${
                            subBtn?.bold ? " colorBtn" : ""
                          }`}
                          title={subBtn.title}
                          onMouseDown={(e) => onHandleCLick(e, subBtn)}
                          onContextMenu={(e) => onHandleCLick(e, subBtn)}>
                          {subBtn.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuBtnsWrap;
{
  /* <button
                        className="square-btn hot-sub-btn"
                        title={btn.newT}
                        onMouseDown={(e) => toJustif(e, btn.newT, "A")}
                        onContextMenu={(e) => toJustif(e, btn.newT, "A")}>
                        {"Resp A"}
                      </button>{" "}
                      <button
                        className="square-btn hot-sub-btn"
                        title={btn.newT}
                        onMouseDown={(e) => toJustif(e, btn.newT, "B")}
                        onContextMenu={(e) => toJustif(e, btn.newT, "B")}>
                        {"Resp B"}
                      </button>{" "} */
}
