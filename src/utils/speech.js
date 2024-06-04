const textarea = document.getElementById("voice");
const startBtn = document.getElementById("start-record-btn");
const stopBtn = document.getElementById("stop-record-btn");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "ru-RU";

export const startV = () => {
  recognition.start();
  startBtn.style.display = "none";
  stopBtn.style.display = "block";
};
export const stoptV = () => {
  recognition.stop();
  startBtn.style.display = "block";
  stopBtn.style.display = "none";
};
recognition.onresult = (event) => {
  let interimTranscript = "";
  let finalTranscript = "";

  for (let i = 0; i < event.results.length; i++) {
    const transcript = event.results[i][0].transcript;
    if (event.results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interimTranscript += transcript;
    }
  }

  textarea.value = finalTranscript + interimTranscript;
};

recognition.onerror = (event) => {
  console.error("Speech recognition error detected: " + event.error);
};
