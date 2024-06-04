import React from "react";

const List = ({ list, isOnHover = false }) => {
  return (
    <>
      {!!list.length && (
        <div className={isOnHover ? "list-wrap showOnHover " : "list-wrap"}>
          {list &&
            list.map((el, i) => (
              <div
                key={i}
                className={isOnHover ? "hint-item pt-3" : "hint-item"}>
                <div className={isOnHover ? "level" : ""}>{el.en}</div>
                <div className="ru">{el.ru}</div>
              </div>
            ))}
          HINT
        </div>
      )}
    </>
  );
};

export default List;
