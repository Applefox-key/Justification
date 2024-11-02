import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

import { useOutsideClick } from "../../hooks/useOutSideClick";
import { stopV, startV } from "../../utils/voice";

const VoiceBtns = ({ textRef, stopBtn, startBtn, disable }) => {
  const langArr = useMemo(() => ["en", "ru", "pl", "ua"], []);
  const [lang, setLang] = useState("ru");
  const btnRef = useRef(null);

  const onClick = () => {
    if (stopBtn.current.style.display === "none") {
      startV(textRef, lang || "");
      stopBtn.current.style.display = "inline";
      startBtn.current.style.display = "none";
    } else if (startBtn.current.style.display === "none") {
      stopV(textRef);
      startBtn.current.style.display = "inline";
      stopBtn.current.style.display = "none";
    }
  };

  useEffect(() => {
    stopBtn.current.style.display = "none";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useOutsideClick(btnRef, () => {
    if (startBtn.current.style.display === "none") {
      stopV(textRef);
      startBtn.current.style.display = "inline";
      stopBtn.current.style.display = "none";
    }
  });
  const nextLang = () => {
    setLang(lang === 2 ? 0 : lang + 1);
  };
  return (
    <div
      ref={btnRef}
      className={disable ? "voice-mainBox voice-hide" : "voice-mainBox"}>
      <div className={"voice-wrap"}>
        <div className="langs">
          {langArr.map((el, i) => (
            <p
              key={i}
              onClick={() => setLang(el)}
              className={"langEl" + (lang === el)}>
              {el}
            </p>
          ))}
        </div>
        <button
          ref={stopBtn}
          id="stop-record-btn"
          title="Stop Dictation"
          onClick={onClick}
          onMouseDown={(e) => {
            if (e.button === 1) nextLang();
          }}>
          <FaMicrophoneSlash />
        </button>
        <button
          ref={startBtn}
          id="start-record-btn"
          onClick={onClick}
          title="Start Dictation">
          <FaMicrophone />
        </button>
      </div>
    </div>
  );
};

export default VoiceBtns;
