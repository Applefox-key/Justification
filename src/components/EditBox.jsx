import React from "react";
import { Button } from "react-bootstrap";
import StrAreaEdit from "./StrAreaEdit";

const EditBox = ({ el, setEdit, savefn }) => {
  return (
    <div className="module-wrap">
      {/* <div className="editbox-wrap" onClick={() => setEdit(null)}> */}
      <div className="editbox-wrap">
        <div className="editbox" onClick={(e) => e.stopPropagation()}>
          <div className="txt-box ">
            <StrAreaEdit
              str={el.en}
              actionFn={(handleTxt) => {
                savefn(handleTxt);
              }}
            />
          </div>
          <Button className="btn-back" onClick={() => setEdit(null)}>
            ❌
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditBox;
