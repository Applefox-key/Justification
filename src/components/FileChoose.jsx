import React, { useRef } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { readXlsFile } from "../utils/readXls";
import { setBackgroundAndSave } from "../utils/localStorage";

const FileChoose = ({ defaultState }) => {
  const inputFileName = useRef();
  const FileChange = async (e) => {
    try {
      const data = await readXlsFile(e.target.files[0]);
      inputFileName.current.value = "";
      console.log(JSON.stringify(data, null, 2));
      defaultState(data);
    } catch (error) {
      inputFileName.current.value = "";

      return;
    }
  };
  return (
    <div>
      <InputGroup className="file-choose">
        <button onClick={() => setBackgroundAndSave(1)}>img</button>
        <Form.Control
          size="sm"
          className="mt-1"
          ref={inputFileName}
          type="file"
          onChange={FileChange}
        />
      </InputGroup>
    </div>
  );
};

export default FileChoose;
