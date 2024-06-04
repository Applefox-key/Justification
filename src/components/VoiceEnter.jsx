import React from "react";
import { startV, stoptV } from "../utils/speech";
const VoiceEnter = ({ onChange }) => {
  return (
    <>
      {/*  <div className="textarea-box  mb-2 yourNote voice-wrap">
      <textarea id="textarea" placeholder="Start dictating..."></textarea> */}
      {!!onChange && (
        <>
          <button id="start-record-btn" onClick={startV}>
            Start Dictation
          </button>
          <button
            id="stop-record-btn"
            style={{ display: "none" }}
            onClick={() => stoptV(onChange)}>
            Stop Dictation
          </button>
        </>
      )}

      {/* </div> */}
    </>
  );
};

export default VoiceEnter;
