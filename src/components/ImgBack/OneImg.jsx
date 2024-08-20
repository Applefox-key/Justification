import React, { useState } from "react";
import { setBackgroundAndSave } from "../../utils/localStorage";
import { Spinner } from "react-bootstrap";

const OneImg = ({ index, curImg, setCurImg }) => {
  const [isLoaded, setIsLoaed] = useState(false);
  const handleImageLoaded = () => {
    setIsLoaed(true);
  };

  return (
    <>
      {!isLoaded && <Spinner animation="grow" variant="secondary" />}
      <img
        key={index}
        src={require(`../../img/img${index}.jpg`)}
        alt={`img${index}`}
        style={!isLoaded ? { display: "none" } : {}}
        onLoad={handleImageLoaded}
        onError={handleImageLoaded}
        onClick={() => {
          setBackgroundAndSave(index);
          setCurImg(index);
        }}
        className={"img-prev" + (curImg === index ? " current-img" : "")}
      />
    </>
  );
};

export default OneImg;
