import React, { useMemo, useRef, useState } from "react";

import { fromLS, saveArrToHistory } from "../../utils/localStorage";
import { useOutsideClick } from "../../hooks/useOutSideClick";

const HistoryBtn = ({ load, type }) => {
  const [isOpen, setisOpen] = useState(false);
  const [filterV, setFilterV] = useState("");
  const [items, setItems] = useState(() => {
    const storedItems = fromLS("History");
    return storedItems ? storedItems.filter((el) => el.ru === type).map((e) => JSON.parse(e.en)) : [];
  });
  const handleLoad = (oneF, index) => {
    load(oneF, index);
    setisOpen(false);
  };
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
    const newHis = storedItems ? storedItems.filter((el) => el.ru === type).map((e) => JSON.parse(e.en)) : [];
    setItems(newHis);
  };
  const ref = useRef();
  const filteredList = useMemo(() => (!filterV ? items : items.filter((el) => el.name.includes(filterV))), [filterV]);
  useOutsideClick(ref, () => setisOpen(false), isOpen);
  return (
    <>
      <div className="fragmBtn" ref={ref}>
        <button className=" btnToHis hintBtn ms-1" onClick={() => setisOpen(!isOpen)} title="to and from archive">
          History
        </button>
        {isOpen && (
          <div className="archive-box1">
            <div onClick={(e) => e.stopPropagation()}>
              <div className="d-flex w-100">
                <button onClick={refresh}>refresh</button>
                <button onClick={clearItems}>clear</button>
              </div>
              <input
                type="text"
                value={filterV}
                onChange={(e) => {
                  e.stopPropagation();
                  setFilterV(e.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            {filteredList.map((oneF, i) => (
              <div className="one-item" key={i}>
                <div className="d-flex">
                  <button onClick={() => handleLoad(oneF, filteredList.length - i)} className="loadbtn ">
                    LOAD
                  </button>{" "}
                  <button onClick={() => clearItem(i)} className="delbtn ">
                    DELETE
                  </button>
                  <div className="contentbtn ">
                    🔍
                    <div className="save-cont">
                      {oneF.name && (
                        <span className="spanName">
                          {oneF.id}-{oneF.name}
                        </span>
                      )}
                      {oneF.Prompt && <span>{oneF.Prompt}</span>}
                    </div>
                  </div>
                </div>
                <div className="title">
                  {oneF.name ?? oneF.id ?? oneF.taskId ?? "noname-" + (filteredList.length - i)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HistoryBtn;
