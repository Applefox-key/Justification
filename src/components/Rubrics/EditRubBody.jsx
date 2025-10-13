import React from "react";
import EditOneRub from "./EditOneRub";

const EditRubBody = ({ editParam, simpleMode }) => {
  return (
    <>
      <div className="respRub">
        {editParam.item.rubricator.map((criteria, index) => (
          <EditOneRub
            simpleMode={simpleMode}
            editParam={{ ...editParam, criteria, index }}
            key={index}
          />
        ))}
      </div>
    </>
  );
};

export default EditRubBody;
