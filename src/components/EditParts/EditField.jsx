import React, { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { replaceEndings } from "../../utils/utilStr";
import { replacementsEnding } from "../../constants/replacements";

const EditField = ({
  autoFocus,
  isTxt,
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
    const repl = replaceEndings(e.target.value, replacementsEnding);
    fieldFn.setNewVal(repl);
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
          autoFocus={autoFocus}
          className={"field " + classN}
          onFocus={() => fieldFn.onFocus(ref)}
          rows={1}
          spellCheck
          placeholder={placeholder}
          value={fieldVal}
          onKeyDown={fieldFn.onKeyDown}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default EditField;
