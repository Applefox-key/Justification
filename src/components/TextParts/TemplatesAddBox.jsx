import React, { useState } from "react";

import { Form } from "react-bootstrap";

const TemplatesAddBox = ({ addDefaultState, levels }) => {
  const [addItem1, setAddItem1] = useState("");
  const [addItem2, setAddItem2] = useState("");
  const [addItem0, setAddItem0] = useState("");

  const handleClick = (e) => {
    addDefaultState(addItem0, addItem1, addItem2);
  };

  return (
    <>
      <button className="tmp-add-btn" onClick={handleClick}>
        add
      </button>
      <Form.Control
        as="input"
        list="group-options"
        className="tmp-add-text0"
        placeholder="group"
        value={addItem0}
        onChange={(e) => setAddItem0(e.target.value)}
      />
      <datalist id="group-options">
        {levels.map((option, idx) => (
          <option value={option} key={idx} />
        ))}
      </datalist>
      <Form.Control
        as="textarea"
        autoFocus
        className={"tmp-add-text"}
        rows={1}
        spellCheck
        placeholder={"text1"}
        value={addItem1}
        onChange={(e) => setAddItem1(e.target.value)}
        // onKeyDown={fieldFn.onKeyDown}
        // onChange={handleChange}
      />{" "}
      <Form.Control
        as="textarea"
        autoFocus
        // className={"fieldRub"}
        rows={1}
        spellCheck
        placeholder={"text2"}
        value={addItem2}
        onChange={(e) => setAddItem2(e.target.value)}
        // onKeyDown={fieldFn.onKeyDown}
        // onChange={handleChange}
      />
    </>
  );
};

export default TemplatesAddBox;
