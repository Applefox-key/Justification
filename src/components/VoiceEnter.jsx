import React from "react";
import { startV, stoptV } from "../utils/speech";
const VoiceEnter = () => {
  return (
    <>
      {/*  <div className="textarea-box  mb-2 yourNote voice-wrap">
      <textarea id="textarea" placeholder="Start dictating..."></textarea> */}
      <button id="start-record-btn" onClick={startV}>
        Start Dictation
      </button>
      <button id="stop-record-btn" style={{ display: "none" }} onClick={stoptV}>
        Stop Dictation
      </button>

      {/* </div> */}
    </>
  );
};

export default VoiceEnter;
