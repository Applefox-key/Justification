import React from "react";

import { defaultDimSets } from "../../constants/dimDefault";

import EditOneDmg from "./EditOneDmg";

const EditDmgBody = ({ editParam }) => {
  return (
    <>
      <div className="respDim w-100">
        {defaultDimSets[editParam.item.setName].map((field, i) => (
          <EditOneDmg editParam={{ ...editParam, field }} key={i} />
        ))}
      </div>
    </>
  );
};

export default EditDmgBody;
