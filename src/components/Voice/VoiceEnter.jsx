import React from "react";
import { startV, stoptV } from "../../utils/speech";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
const VoiceEnter = ({ onChange }) => {
  return (
    <>
      {!!onChange && (
        <>
          <button
            id="start-record-btn"
            onClick={startV}
            title="Start Dictation">
            <FaMicrophone />
          </button>
          <button
            id="stop-record-btn"
            style={{ display: "none" }}
            title="Stop Dictation"
            onClick={() => stoptV(onChange)}>
            <FaMicrophoneSlash />
          </button>
        </>
      )}
    </>
  );
};

export default VoiceEnter;
