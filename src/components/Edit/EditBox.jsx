import React from "react";
import { Button } from "react-bootstrap";
import StrAreaEdit from "./StrAreaEdit";
import Draggable from "react-draggable";
import BoxSizeBtn from "../UI/BoxSizeBtn";
import { FiXSquare } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";

const EditBox = ({ el, setEdit, savefn }) => {
  return (
    <div className="module-wrap">
      {/* <div className="editbox-wrap" onClick={() => setEdit(null)}> */}

      <div className="editbox-wrap">
        <Draggable handle=".handle">
          {/* <ResizableBox width={200} height={200} >
            <div> */}
          <div className="editbox" onClick={(e) => e.stopPropagation()}>
            <div className="handle">
              EDIT COMMENT
              <div>
                {" "}
                <BoxSizeBtn />
                <Button className="btn-back" onClick={() => setEdit(null)}>
                  {/* ❌ */}
                  <IoIosClose />
                </Button>
              </div>
            </div>{" "}
            <div className="txt-box ">
              <StrAreaEdit str={el.en} actionFn={savefn} />
            </div>
          </div>
          {/* </div>{" "}
          </ResizableBox> */}
        </Draggable>{" "}
      </div>
    </div>
  );
};

export default EditBox;
