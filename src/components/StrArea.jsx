import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { saveToHistory } from "../utils/localStorage";

const StrArea = ({ str = "", actionFn, his, placeholder = "" }) => {
  const [handleTxt, setHandleTxt] = useState(str);
  return (
    <>
      {" "}
      {his && (
        <Button
          className="btnToHis"
          onClick={(e) => saveToHistory({ en: handleTxt, ru: "" })}>
          save to history
        </Button>
      )}
      <Button onClick={() => setHandleTxt("")}>🗑️</Button>
      <Form.Control
        as="textarea"
        className={his ? "fit-height " : ""}
        rows={1}
        placeholder={placeholder}
        value={handleTxt}
        onChange={(e) => {
          e.stopPropagation();
          setHandleTxt(e.target.value);
        }}
      />
      {!!actionFn && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            actionFn(handleTxt);
          }}>
          OK
        </Button>
      )}
    </>
  );
};

export default StrArea;
