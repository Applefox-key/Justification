import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { getHistory } from "../../utils/localStorage";

const DownloadBtn = ({ list, setCurrBtn }) => {
  const [textFile, settextFile] = useState(null);
  const createFile = () => {
    if (list.length === 0) {
      window.alert("there is nothing for loading");
      return;
    }
    const content = list.map((el) => el.en).join("\n\n");

    const data = new Blob([content], { type: "text/plain" });
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    settextFile(window.URL.createObjectURL(data));
  };
  const dt = new Date();

  return (
    <div className="d-flex">
      {!!textFile && (
        <a
          download={"History" + dt.toLocaleDateString()}
          href={textFile}
          className="fs-4 ">
          🡇 Download
        </a>
      )}
      <Button
        // className="fs-4 menuBtn w-50"
        className="sheetsXls-item z0"
        size="lg"
        variant="outline-black"
        // disabled={!contentList}
        onClick={() => {
          createFile();
        }}>
        💾Create file for download
      </Button>
      <Button
        // className="fs-4 menuBtn w-50"
        className="sheetsXls-item z0"
        size="lg"
        variant="outline-black"
        // disabled={!contentList}
        onClick={() => {
          const userConfirmed = window.confirm(
            "Do you want to clear your history?"
          );
          if (!userConfirmed) return;
          localStorage.removeItem("History");
          setCurrBtn(getHistory());
        }}>
        Clear
      </Button>
    </div>
  );
};

export default DownloadBtn;
