import React, { useRef } from "react";
import { startV, stoptV } from "../../utils/speech";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { useOutsideClick } from "../../hooks/useOutSideClick";
const VoiceEnter = ({ onChange }) => {
  const btnRef = useRef();
  const startBtn = useRef();
  const stopBtn = useRef();
  // useOutsideClick(btnRef, () => {
  //   if (startBtn.current.style.display === "none") {
  //     stoptV(onChange);
  //     startBtn.current.style.display = "inline";
  //     stopBtn.current.style.display = "none";
  //   }
  // });
  return (
    <>
      {!!onChange && (
        <div ref={btnRef}>
          <button
            ref={startBtn}
            id="start-record-btn"
            onClick={startV}
            title="Start Dictation">
            <FaMicrophone />
          </button>
          <button
            ref={stopBtn}
            id="stop-record-btn"
            style={{ display: "none" }}
            title="Stop Dictation"
            onClick={() => stoptV(onChange)}>
            <FaMicrophoneSlash />
          </button>
        </div>
      )}
    </>
  );
};

export default VoiceEnter;
