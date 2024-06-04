import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import TxtBtns from "./TxtBtns";

const TxtBtnsOverlay = ({ toJustif }) => {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  return (
    <div className="d-flex justify-content-between align-items-center">
      {/* <Button variant="danger" ref={target} onClick={() => setShow(!show)}>
        Click me to see
      </Button>{" "}
      <Overlay target={target.current} show={show} placement="right">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div {...props} className="overlayWrap">
            <TxtBtns toJustif={toJustif} />
          </div>
        )}
      </Overlay> */}{" "}
      <div ref={ref}>
        <Button onClick={handleClick}>frequent</Button>

        <Overlay
          show={show}
          target={target}
          placement="bottom"
          container={ref}
          containerPadding={20}>
          <Popover id="popover-contained">
            {/* <Popover.Header as="h3">Popover bottom</Popover.Header> */}
            {/* <Popover.Body> */}
            <TxtBtns toJustif={toJustif} />
            {/* </Popover.Body> */}
          </Popover>
        </Overlay>
      </div>
      JUSTIFICATION RESULT:
    </div>
  );
};

export default TxtBtnsOverlay;
