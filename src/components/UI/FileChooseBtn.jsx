import React, { useRef, useState } from "react";
import { readXlsFile, readXlsFileOne } from "../../utils/readXls";
import { FiPlus } from "react-icons/fi";
import { BiReset } from "react-icons/bi";

const FileChooseBtn = ({ defaultState, onlyFirstSheet = false }) => {
  const [isOpen, setIsopen] = useState(false);
  const inputFileName = useRef();
  const FileChange = async (e) => {
    try {
      const data = onlyFirstSheet
        ? await readXlsFileOne(e.target.files[0])
        : await readXlsFile(e.target.files[0]);
      inputFileName.current.value = "";
      console.log(JSON.stringify(data, null, 2));
      defaultState(data);
      setIsopen(false);
    } catch (error) {
      inputFileName.current.value = "";
      return;
    }
  };
  return (
    // <div className="input-file-wrap">
    <div className="templates-wrap">
      <button onClick={() => setIsopen(!isOpen)}>...</button>
      {isOpen && (
        <div className="templates-menu">
          <button className="input-file" title="Choose file">
            <FiPlus />
            <input
              size="sm"
              ref={inputFileName}
              type="file"
              onChange={FileChange}
            />
          </button>
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
          </button>
        </div>
      )}
    </div>
  );
};

export default FileChooseBtn;
