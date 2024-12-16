import React from "react";
import { Button } from "react-bootstrap";

import { TbCircleLetterAFilled, TbCircleLetterBFilled } from "react-icons/tb";

const ComposeRate = ({ compose, clear, best, show, setShow }) => {
  return (
    <div className="composeRate">
      {(best.num === -1 || best.num === 4) && (
        <>
          <Button
            className="btn-back square-btn"
            onClick={() => compose(1)}
            title=" small or big field for the reason">
            <TbCircleLetterAFilled />
          </Button>
          {/* JUSTIFICATION */}
          <Button
            className="btn-back square-btn"
            onClick={() => compose(2)}
            title=" small or big field for the reason">
            <TbCircleLetterBFilled />{" "}
          </Button>
        </>
      )}
      {best.num > -1 && best.num < 4 && (
        <Button
          className="btn-back square-btn  btn-dim"
          onClick={() => compose(1)}
          title=" justification for Response A">
          <TbCircleLetterAFilled />
        </Button>
      )}
      {best.num > 4 && (
        <Button
          className="btn-back square-btn  btn-dim"
          onClick={() => compose(2)}
          title=" justification for Response B">
          <TbCircleLetterBFilled />
        </Button>
      )}
    </div>
  );
};

export default ComposeRate;
