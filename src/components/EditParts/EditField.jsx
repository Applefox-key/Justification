import React, { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";

const EditField = ({
  autoFocus,
  isTxt,
  isActive,
  setIsTxt,
  fieldName,
  placeholder,
  fieldVal,
  fieldFn,
  classN,
}) => {
  const ref = useRef(null);

  const handleChange = (e) => {
    e.stopPropagation();
    fieldFn.setNewVal(e.target.value);
  };

  return (
    <>
      {isTxt ? (
        <div
          className={"setIsTxt"}
          onMouseDown={(e) => {
            if (e.button === 1) setIsTxt(!isTxt);
          }}>
          {fieldVal}
        </div>
      ) : (
        <Form.Control
          ref={ref}
          as="textarea"
          id={fieldName}
          autoFocus
          // className={isActive ? "field active-field" : "field"}
          className={"field " + classN}
          onFocus={() => fieldFn.onFocus(ref)}
          rows={1}
          spellCheck
          placeholder={placeholder}
          value={fieldVal}
          onKeyDown={fieldFn.onKeyDown}
          // NumIsteadLetter(handleTxt, setHandleTxt);
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default EditField;
