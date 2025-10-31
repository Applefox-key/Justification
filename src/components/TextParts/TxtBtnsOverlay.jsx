import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import TemplatesBox from "./TemplatesBox";

const TxtBtnsOverlay = ({ toJustif, edit = false }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <>
      <div ref={ref} className={edit ? "mr" : "w19"}>
        <Button onClick={handleClick} className={edit ? "w100 " : "w-100"}>
          templates
        </Button>
        <Overlay show={show} target={target} placement={edit ? "left" : "bottom"} container={ref} containerPadding={20}>
          <Popover id={edit ? "popover-containedR" : "popover-contained"}>
            <TemplatesBox toJustif={toJustif} edit={edit} />
          </Popover>
        </Overlay>
      </div>
      <div className="hover-target">COMMENT:</div>
    </>
  );
};

export default TxtBtnsOverlay;
