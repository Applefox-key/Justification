const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "ru-RU";
export const textareaM = document.getElementById("voice");
export const startBtnM = document.getElementById("start-record-btn");
export const stopBtnM = document.getElementById("stop-record-btn");

export const startV = () => {
  const startBtn = startBtnM
    ? startBtnM
    : document.getElementById("start-record-btn");
  const stopBtn = stopBtnM
    ? stopBtnM
    : document.getElementById("stop-record-btn");
  if (!startBtn) return;
  recognition.start();
  startBtn.style.display = "none";
  stopBtn.style.display = "block";
};

export const stoptV = (onchange) => {
  const startBtn = startBtnM
    ? startBtnM
    : document.getElementById("start-record-btn");
  const stopBtn = stopBtnM
    ? stopBtnM
    : document.getElementById("stop-record-btn");
  const textarea = textareaM ? textareaM : document.getElementById("voice");
  recognition.stop();
  startBtn.style.display = "block";
  stopBtn.style.display = "none";

  if (textarea.value) onchange(textarea.value);
};
recognition.onresult = (event) => {
  let interimTranscript = "";
  let finalTranscript = "";
  const textarea = textareaM ? textareaM : document.getElementById("voice");
  for (let i = 0; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript += transcript;
    }
  }
  if (textarea) textarea.value = finalTranscript + interimTranscript;
};

recognition.onerror = (event) => {
  console.error("Speech recognition error detected: " + event.error);
};

export const startOrStopV = (onchange) => {
  const startBtn = startBtnM
    ? startBtnM
    : document.getElementById("start-record-btn");
  const stopBtn = stopBtnM
    ? stopBtnM
    : document.getElementById("stop-record-btn");

  if (stopBtn.style.display === "none") startV();
  else if (startBtn.style.display === "none") stoptV(onchange);
};
