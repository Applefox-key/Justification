import React, { useRef } from "react";

import { FiPlus } from "react-icons/fi";

const FileChooseBtn = ({ fileChange }) => {
  const inputFileName = useRef();
  const onHandleChange = (e) => {
    fileChange(e.target.files[0]);
    inputFileName.current.value = "";
  };
  return (
    <button className="input-file" title="Choose file">
      <FiPlus />
      <input
        size="sm"
        ref={inputFileName}
        type="file"
        onChange={onHandleChange}
      />
    </button>
  );
};

export default FileChooseBtn;
