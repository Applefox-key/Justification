import React, { useRef, useState } from "react";

import { useOutsideClick } from "../../hooks/useOutSideClick";

//btnsArray [groupName:"", btns:[{btnName:"",BtnCallBack:()=>{}}]]

const MenuBtnsWrap = ({ btnsArr, alwaysOpen }) => {
  const [isOpen, setIsOpen] = useState(null);
  const [isAlwaysOpen, setIsAlwaysOpen] = useState(alwaysOpen);
  const refBox = useRef(null);
  useOutsideClick(refBox, () => setIsOpen(null));

  const onHandleCLick = (e, btn) => {
    e.stopPropagation();
    btn.onClick();
  };

  return (
    <div className="hot " ref={refBox}>
      <button
        className="square-btn hotBtnGr bit-intense"
        onClick={(e) => {
          setIsAlwaysOpen(!isAlwaysOpen);
        }}>
        {`>`}
      </button>
      {btnsArr.map((oneBtn, gi) => (
        <div className="hot-menu" key={gi}>
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
                    className="square-btn hot-menu-btn"
                    title={btn.title}
                    onMouseDown={(e) => onHandleCLick(e, btn)}
                    onContextMenu={(e) => onHandleCLick(e, btn)}>
                    {btn.label}
                  </button>
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
  /* <OneHotBtn
          key={btni}
          oneBtn={oneBtn}
          toJustif={onHandleCLick}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        /> */
}
