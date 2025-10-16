import React, { useState } from "react";

import { fromLS, saveArrToHistory } from "../../utils/localStorage";

const HistoryBtn = ({ load, type }) => {
  const [items, setItems] = useState(() => {
    const storedItems = fromLS("History");
    return storedItems
      ? storedItems.filter((el) => el.ru === type).map((e) => JSON.parse(e.en))
      : [];
  });

  const clearItems = () => {
    saveArrToHistory(
      items.map((el) => {
        const handleTxt = JSON.stringify(el);
        return { en: handleTxt, ru: "DIM" };
      })
    );
    setItems([]);
  };
  const clearItem = (index) => {
    if (window.confirm("Delete save?")) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };
  const refresh = () => {
    const storedItems = fromLS("History");
    const newHis = storedItems
      ? storedItems.filter((el) => el.ru === type).map((e) => JSON.parse(e.en))
      : [];
    setItems(newHis);
  };

  return (
    <>
      <div className="fragmBtn">
        <button
          className=" btnToHis hintBtn ms-1"
          // onClick={saveItems}
          title="to and from archive">
          History
        </button>
        <div className="archive-box">
          <div className="d-flex w-100">
            <button onClick={refresh}>refresh</button>
            <button onClick={clearItems}>clear</button>
          </div>

          {items.map((oneF, i) => (
            <div className="one-item" key={i}>
              <div className="d-flex">
                <button
                  onClick={() => load(oneF, items.length - i)}
                  className="loadbtn ">
                  LOAD
                </button>{" "}
                <button onClick={() => clearItem(i)} className="delbtn ">
                  DELETE
                </button>
              </div>
              <div className="title">
                {oneF.name
                  ? oneF.name
                  : oneF.id
                  ? oneF.id
                  : oneF.taskId
                  ? oneF.taskId
                  : "noname-" + (items.length - i)}
              </div>

              <div className="save-cont">
                {oneF.name && (
                  <span className="spanName">
                    {oneF.id}-{oneF.name}
                  </span>
                )}
                {oneF.prompt && <span>{oneF.prompt}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HistoryBtn;
