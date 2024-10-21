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
            <div className="hot-one">
              <button
                className="square-btn hot-sub-btn"
                title={btn.newT}
                onClick={() => toJustif(btn.newT)}>
                {btn.title || btn.oldT[0]}
              </button>
              {btn.newT.includes("BotModel") && (
                <div>
                  <button
                    className="square-btn hot-sub-btn"
                    title={btn.newT}
                    onClick={() => toJustif(btn.newT, "A")}>
                    {"Resp A"}
                  </button>{" "}
                  <button
                    className="square-btn hot-sub-btn"
                    title={btn.newT}
                    onClick={() => toJustif(btn.newT, "B")}>
                    {"Resp B"}
                  </button>{" "}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OneHotBtn;
