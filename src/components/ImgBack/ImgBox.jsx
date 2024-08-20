import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Draggable from "react-draggable";
import { IoIosClose, IoIosImages } from "react-icons/io";
import { currentBack } from "../../utils/localStorage";
import { imgCount } from "../../constants/images";
import OneImg from "./OneImg";

const ImgBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [curImg, setCurImg] = useState(currentBack());
  const images = Array.from({ length: imgCount }, (_, i) => i);

  return (
    <>
      <IoIosImages onClick={() => setIsOpen(true)} />
      {isOpen && (
        <div className="module-wrap">
          <div className="editbox-wrap">
            <Draggable handle=".handle">
              <div className="editbox" onClick={(e) => e.stopPropagation()}>
                <div className="handle">
                  IMG
                  <Button className="btn-back" onClick={() => setIsOpen(false)}>
                    <IoIosClose />
                  </Button>
                </div>
                {images.length === imgCount ? (
                  <div className="image-grid">
                    {images.map((image, index) => (
                      <OneImg
                        index={index}
                        setCurImg={setCurImg}
                        curImg={curImg}
                      />
                    ))}
                  </div>
                ) : (
                  <Spinner animation="grow" variant="secondary" />
                )}
              </div>
            </Draggable>
          </div>
        </div>
      )}
    </>
  );
};

export default ImgBox;
