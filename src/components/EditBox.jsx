import React from "react";
import { Button } from "react-bootstrap";
import StrArea from "./StrArea";

const EditBox = ({ el, setEdit, savefn }) => {
  return (
    <div className="editbox-wrap" onClick={() => setEdit(null)}>
      <div className="editbox" onClick={(e) => e.stopPropagation()}>
        <div className="txt-box ">
          <StrArea
            str={el.en}
            his
            actionFn={(handleTxt) => {
              savefn(handleTxt);
            }}
          />
        </div>{" "}
        <Button className="w100" onClick={() => setEdit(null)}>
          BACK
        </Button>
      </div>
    </div>
  );
};

export default EditBox;
