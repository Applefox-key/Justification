import React from "react";

const List = ({ list }) => {
  return (
    <div className="list-wrap">
      {list &&
        list.map((el, i) => (
          <div key={i} className="current-item hint">
            <div>{el.en}</div>
            <div className="ru">{el.ru}</div>
          </div>
        ))}
      HINT
    </div>
  );
};

export default List;
