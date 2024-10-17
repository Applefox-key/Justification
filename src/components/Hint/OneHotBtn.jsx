import React from "react";

const OneHotBtn = ({ oneBtn, toJustif, isOpen, setIsOpen }) => {
  return (
    <div className="hot-menu">
      <button
        className="square-btn hotBtnGr intense"
        key={oneBtn.name}
        onClick={() => setIsOpen(isOpen === oneBtn.name ? null : oneBtn.name)}>
        {oneBtn.name}
      </button>

      {isOpen === oneBtn.name && (
        <div className="hot-sum">
          {oneBtn.btns.map((btn) => (
            <button
              className="square-btn hot-sub-btn"
              title={btn.newT}
              onClick={() => {
                if (btn.action) btn.action();
                else toJustif(btn.newT);
                // setIsOpen(null);
              }}>
              {btn.title || btn.oldT[0]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OneHotBtn;
