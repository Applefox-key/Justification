import React, { useRef } from "react";
import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { readXlsFile } from "../utils/readXls";

const FileLib = ({ files, setJustparts }) => {
  const [fileContent, setFileContent] = useState();
  const inputFileName = useRef();
  const FileChange = async (e) => {
    try {
      //   readXlsFile(e.target.files[0], setFileContent);

      const data = await readXlsFile(e.target.files[0]);
      console.log(JSON.stringify(data, null, 2));
      setJustparts([...files, data]);
      // Выводим результат
    } catch (error) {
      inputFileName.current.value = "";

      return;
    }
  };
  return (
    <div>
      <InputGroup className="w-75">
        <Form.Control
          size="lg"
          className="mt-1"
          ref={inputFileName}
          type="file"
          onChange={FileChange}
        />{" "}
        <button onClick={() => setJustparts([])}>default</button>
      </InputGroup>{" "}
    </div>
  );
};

export default FileLib;
