import React, { useRef } from "react";
import { readXlsFile, readXlsFileOne } from "../../utils/readXls";
import { FiPlus } from "react-icons/fi";
import { BiReset } from "react-icons/bi";

const FileChooseBtn = ({ defaultState, onlyFirstSheet = false }) => {
  const inputFileName = useRef();
  const FileChange = async (e) => {
    try {
      const data = onlyFirstSheet
        ? await readXlsFileOne(e.target.files[0])
        : await readXlsFile(e.target.files[0]);
      inputFileName.current.value = "";
      console.log(JSON.stringify(data, null, 2));
      defaultState(data);
    } catch (error) {
      inputFileName.current.value = "";
      return;
    }
  };
  return (
    <div className="input-file-wrap">
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
          const userConfirmed = window.confirm("Do you want to reset files?");
          if (!userConfirmed) return;
          defaultState(null);
        }}>
        <BiReset title="RESET" />
      </button>
    </div>
  );
};

export default FileChooseBtn;
