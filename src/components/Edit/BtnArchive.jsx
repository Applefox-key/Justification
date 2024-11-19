import React, { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { usePopup } from "../../hooks/usePopup";
import { TfiSave } from "react-icons/tfi";

const BtnArchive = ({ txt, setTxt }) => {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("items");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  // remember quotes from the text
  const saveItems = () => {
    if (txt && !items.includes(txt)) {
      setItems([txt, ...items]);
      setPopup("info has been added to the archive");
    }
  };
  const replacelast = () => {
    const old = [...items];
    old[0] = txt;
    if (txt && !items.includes(txt)) {
      setItems(old);
    }
  };
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);
  //back to the text
  const replaceItems = (item) => {
    setTxt(item);
    // setHandleTxt(newString);
  };
  const clearItems = () => {
    setItems([]);
  };
  const clearItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };
  const setPopup = usePopup();
  console.log(items[0]?.Name);

  return (
    <>
      <div className="fragmBtn">
        <button
          className=" btnToHis hintBtn ms-1"
          onClick={saveItems}
          title="to and from archive">
          <TfiSave />
        </button>
        <div className="archive-box">
          <button
            onClick={replacelast}
            style={{ color: "red", cursor: "pointer" }}>
            replace last
          </button>
          <button
            onClick={clearItems}
            style={{ color: "red", cursor: "pointer" }}>
            clear
          </button>
          {items.map((oneF, i) => (
            <div className="one-item" key={i}>
              <div className="d-flex">
                <button onClick={() => replaceItems(oneF)} className="w-100">
                  SAVE {items.length - i} . . . LOAD
                </button>
                <button onClick={() => clearItem(i)} className="w-25">
                  DELETE
                </button>
              </div>
              <div className="save-cont">
                {oneF.name && <span>{oneF.name}</span>}
                {oneF.Rate && <span>{oneF.Rate}</span>}

                {/* {oneF.R0 && <span>{oneF.name}</span>}
                {oneF.R0 && <span>{oneF.R0}</span>}
                {oneF.R1 && <span>{oneF.R1}</span>}
                {oneF.R2 && <span>{oneF.R2}</span>} */}
                {oneF.R3 && <span>{oneF.R3}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <button
        className="square-btn intense"
        title="replace dash"
        onClick={() => replace("-", "—")}>
        -
      </button>{" "}
      <button
        className="square-btn intense"
        title="replace quotes"
        onClick={replaceQuotes}>
        «»
      </button> */}
    </>
  );
};

export default BtnArchive;
