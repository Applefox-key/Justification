import { useRef } from "react";
import Draggable from "react-draggable";
import { RiDragMoveFill } from "react-icons/ri";
import FlowerBtn from "../EditBtns/FlowerBtn";
import BtnFontSize from "../EditBtns/BtnFontSize";

const EditDragable = ({
  children,
  closeModal,
  title,
  crit,
  fieldId,
  fieldFn,
  critEr,
  comment,
}) => {
  const ref = useRef(null);

  return (
    <>
      <Draggable handle=".handle1" defaultPosition={{ x: 750, y: 54 }}>
        <div ref={ref} className={"rub-drag"}>
          <div className="rub-drag-box">
            <div className="handle1 handle1After ">
              <div className="field-name-voice ">{title}</div>
              <button
                className="btn-back"
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}>
                x
              </button>
            </div>

            <div className="modal-rub">
              <span> {crit}</span>
              <span className="comment"> {comment}</span>
              {children}
              <div className="handle1 hbottom1">
                <div className="form-btn">
                  <FlowerBtn
                    className="rubBtn"
                    fieldId={fieldId}
                    fieldFn={fieldFn}
                    type={"guillemet"} //«»
                  />
                  <FlowerBtn
                    className="rubBtn"
                    fieldId={fieldId}
                    fieldFn={fieldFn}
                    type={`straight`} //""
                  />
                  <FlowerBtn
                    className="rubBtn"
                    fieldId={fieldId}
                    fieldFn={fieldFn}
                  />
                  <BtnFontSize nameV="--font-size-edit" />{" "}
                </div>{" "}
                <RiDragMoveFill />
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
};

export default EditDragable;
