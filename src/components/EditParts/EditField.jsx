import React, { useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { numIsteadLetter } from "../../utils/utilStr";

const EditField = ({ autoF, fieldName, placeholder, fieldVal, fieldFn }) => {
  const ref = useRef(null);

  const handleChange = (e) => {
    e.stopPropagation();

    fieldFn.setNewVal(e.target.value);
  };
  useEffect(() => {
    if (autoF && ref) fieldFn.onFocus(ref);
  }, []);
  return (
    <Form.Control
      ref={ref}
      as="textarea"
      id={fieldName}
      className={"fit-height w-100"}
      onFocus={() => fieldFn.onFocus(ref)}
      rows={1}
      spellCheck
      placeholder={placeholder}
      value={fieldVal}
      onKeyDown={fieldFn.onKeyDown}
      // NumIsteadLetter(handleTxt, setHandleTxt);

      onChange={handleChange}
    />
  );
};

export default EditField;