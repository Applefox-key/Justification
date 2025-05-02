import React, { useState } from "react";
import { readXlsFile, readXlsFileOne } from "../../utils/readXls";
import { BiReset } from "react-icons/bi";
import FileChooseBtn from "./FileChooseBtn";

const FileChooseMenu = ({ defaultState, onlyFirstSheet = false }) => {
  const [isOpen, setIsopen] = useState(false);
  // const inputFileName = useRef();
  const fileChange = async (file) => {
    try {
      const data = onlyFirstSheet
        ? await readXlsFileOne(file)
        : await readXlsFile(file);

      defaultState(data);
      setIsopen(false);
    } catch (error) {
      return;
    }
  };
  return (
    // <div className="input-file-wrap">
    <div className="templates-wrap">
      <button onClick={() => setIsopen(!isOpen)}>...</button>
      {isOpen && (
        <div className="templates-menu">
          <FileChooseBtn fileChange={fileChange} />
          <button
            title="RESET"
            className="reset-btn"
            onClick={() => {
              const userConfirmed = window.confirm(
                "Do you want to reset files?"
              );
              if (!userConfirmed) return;
              defaultState(null);
              setIsopen(false);
            }}>
            <BiReset title="RESET" />
            {/* RESET */}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileChooseMenu;
