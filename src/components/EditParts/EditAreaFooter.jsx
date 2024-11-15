import React from "react";
import { Button } from "react-bootstrap";
import VoiceDragable from "../Voice/VoiceDragable";
import { voiceToEdit } from "../../utils/utilStr";
import { RiDragMoveFill } from "react-icons/ri";

const EditAreaFooter = ({ editParam }) => {
  const { toHist, setIsCheckerMode, item, fieldFn, fieldId, onOK } = editParam;
  return (
    <div className="d-flex mt-11 w-100">
      <Button
        className="edit100 m-0 me-2"
        onClick={() => {
          toHist();
          setIsCheckerMode(true);
        }}>
        Check text
      </Button>
      <Button className="edit100 m-0" onClick={onOK}>
        OK
      </Button>{" "}
      <VoiceDragable
        nameF={fieldId}
        toJustif={(txt) => {
          voiceToEdit(txt, item[fieldId], fieldFn.setNewVal, fieldId);
        }}
      />{" "}
      <div className="handle hbottom">
        <RiDragMoveFill />
      </div>
    </div>
  );
};

export default EditAreaFooter;
