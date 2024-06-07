import React from "react";
// import StarIcon from "@mui/icons-material/Star";
import { FaRegStar, FaStar } from "react-icons/fa";

const Raiting = ({ value, setValue, title, recom }) => {
  const labels = ["Very Bad", "Bad", "Ok", "Good", "Excellent"];

  return (
    <>
      <div className="d-flex pb-1">
        {labels.map((el, i) =>
          i === value - 1 ? (
            <FaStar className="rate-star1" onClick={() => setValue(0)} />
          ) : (
            <FaRegStar className="rate-star0" onClick={() => setValue(i + 1)} />
          )
        )}
      </div>
      {title}
      {/* {labels[value - 1]} */}
      <span className="span-result">{labels[value - 1]}</span>
      {!!recom && <div className="recom">{recom}</div>}
    </>
  );
};

export default Raiting;
