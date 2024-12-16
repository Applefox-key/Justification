import React from "react";
import EditFieldDim from "./EditFieldDim";
import { arrAB } from "../../constants/textParts";
import EditOneDim from "./EditOneDim";

const EditDimBody = ({ editParam }) => {
  return (
    <>
      <div className="respDim w-100">
        {arrAB.map((field, i) => (
          <EditOneDim editParam={{ ...editParam, field }} key={i} />
        ))}
      </div>
    </>
  );
};

export default EditDimBody;
