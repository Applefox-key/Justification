import React from "react";
// import StarIcon from "@mui/icons-material/Star";
import { FaRegStar, FaStar } from "react-icons/fa";

const Rating = ({ value, setValue, title, recom, recomScore }) => {
  const labels = ["Very Bad", "Bad", "Ok", "Good", "Excellent"];
  const setClassName = (i) => {
    let cl = `rate-star0`;

    if (!!recomScore && !!recomScore.length && recomScore.includes(i + 1))
      cl += ` rate-recom`;
    return cl;
  };
  return (
    <>
      <div className="d-flex pb-1">
        {labels.map((el, i) =>
          i === value - 1 ? (
            <FaStar className="rate-star1" onClick={() => setValue(0)} />
          ) : (
            <FaRegStar
              className={setClassName(i)}
              onClick={() => setValue(i + 1)}
            />
          )
        )}
      </div>
      {title}
      <span className="span-result">{labels[value - 1]}</span>
      {!!recom && <div className="recom">{recom}</div>}
    </>
  );
};

export default Rating;
