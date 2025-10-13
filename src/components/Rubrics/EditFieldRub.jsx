import React from "react";

import ScalableInput from "../EditBtns/ScalableInput";

const EditFieldRub = ({
  fieldName,
  classN = "",
  fieldFn,
  classF = "",
  scale = null,
  show = true,
  small = null,
  ...props
}) => {
  console.log(props);
  console.log(fieldFn);

  return (
    <div
      className={`field-box ${classF || ""}${
        !show ? " field-close-" + scale || "" : ""
      }`}>
      <>
        <ScalableInput
          fieldFn={fieldFn}
          className={"fieldRub " + (small ? "dimFieldSmall " : "") + classN}
          btnCount={2}
          id={fieldName}
          fieldName={fieldName}
          rows={1}
          onKeyDown={fieldFn.onKeyDown}
          onChange={(val) => fieldFn.setNewVal(val, fieldName)}
          {...props}
        />
      </>
    </div>
  );
};

export default EditFieldRub;
