import React, { useEffect, useState } from "react";
import { LuArchive } from "react-icons/lu";

const BtnArchive = ({ txt, setTxt }) => {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("items");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  // remember quotes from the text
  const saveItems = () => {
    if (txt && !items.includes(txt)) {
      setItems([...items, txt]);
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
  return (
    <>
      <div className="fragmBtn">
        <button
          className="square-btn ms-1"
          // disabled={!items.length}
          onClick={saveItems}
          title="to and from archive">
          <LuArchive />
        </button>
        <div className="archive-box">
          <button
            onClick={clearItems}
            style={{ color: "red", cursor: "pointer" }}>
            clear
          </button>
          {items.map((oneF, i) => (
            <div className="one-item" key={i}>
              <button onClick={() => clearItem(i)} className="w-100">
                #{i} DELETE
              </button>
              <button onClick={() => replaceItems(oneF)}>
                {oneF.R0 && <span>{oneF.R0}</span>}
                {oneF.R1 && <span>{oneF.R1}</span>}
                {oneF.R2 && <span>{oneF.R2}</span>}
                {oneF.R3 && <span>{oneF.R3}</span>}
              </button>
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
