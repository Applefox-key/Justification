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
          {oneBtn.btns.map((btn, i) => (
            <div className="hot-one" key={i}>
              <button
                className="square-btn hot-sub-btn"
                title={btn.newT}
                onMouseDown={(e) => toJustif(e, btn.newT)}
                onContextMenu={(e) => toJustif(e, btn.newT)}>
                {btn.title || btn.oldT[0]}
              </button>
              {btn.newT.includes("BotModel") && (
                <div>
                  <button
                    className="square-btn hot-sub-btn"
                    title={btn.newT}
                    onMouseDown={(e) => toJustif(e, btn.newT, "A")}
                    onContextMenu={(e) => toJustif(e, btn.newT, "A")}
                    // onClick={(e) => toJustif(e, btn.newT, "A")}
                  >
                    {"Resp A"}
                  </button>{" "}
                  <button
                    className="square-btn hot-sub-btn"
                    title={btn.newT}
                    onMouseDown={(e) => toJustif(e, btn.newT, "B")}
                    onContextMenu={(e) => toJustif(e, btn.newT, "B")}
                    // onClick={(e) => toJustif(e, btn.newT, "B")}
                  >
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
