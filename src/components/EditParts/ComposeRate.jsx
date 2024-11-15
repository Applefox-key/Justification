import React from "react";
import { Button } from "react-bootstrap";
import { FaArrowCircleDown } from "react-icons/fa";
import { TbCircleLetterAFilled, TbCircleLetterBFilled } from "react-icons/tb";

const ComposeRate = ({ compose, clear, best }) => {
  console.log(best.num);

  return (
    <div className="d-flex align-items-center">
      {(best.num === -1 || best.num === 4) && (
        <>
          <Button
            className="btn-back square-btn"
            onClick={() => compose(1)}
            title=" small or big field for the reason">
            <TbCircleLetterAFilled />
          </Button>
          JUSTIFICATION
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
          title=" small or big field for the reason">
          JUSTIFICATION <TbCircleLetterAFilled />
        </Button>
      )}
      {best.num > 4 && (
        <Button
          className="btn-back square-btn  btn-dim"
          onClick={() => compose(2)}
          title=" small or big field for the reason">
          JUSTIFICATION <TbCircleLetterBFilled />
        </Button>
      )}
    </div>
  );
};

export default ComposeRate;
