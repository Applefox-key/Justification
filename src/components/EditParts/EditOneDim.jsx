import React, { useEffect, useState } from "react";
import EditFieldDim from "./EditFieldDim";

const EditOneDim = ({ editParam }) => {
  const { field, setIsTxt, fieldId, isTxt, item, fieldFn, showBody } =
    editParam;
  const [show, setShow] = useState(false);
  const classA = () =>
    "dimField " +
    (!show ? "right-closed" : fieldId === field.a ? "active-field" : "");
  const classB = () =>
    "dimField " +
    (!show ? "right-closed" : fieldId === field.b ? "active-field" : "");
  const classBtn = (field) => {
    console.log(field.a);
    console.log(field.b);
    const a = item.Evals[field.a];
    const b = item.Evals[field.b];
    return !show && ((a >= 1 && a <= 4) || (b >= 1 && b <= 4))
      ? "dim-cp backBl"
      : "dim-cp";
  };
  useEffect(() => {
    if (typeof showBody === "boolean") {
      setShow(showBody);
    }
  }, [showBody]);
  return (
    <>
      <div className={show ? "one-dim" : "one-dim-close"}>
        <EditFieldDim
          // key={i}
          show={show}
          fieldName={field.a}
          placeholder={field.a}
          setIsTxt={setIsTxt}
          scale="right"
          classN={classA()}
          isTxt={isTxt && fieldId === field.a}
          isActive={fieldId === field.a}
          fieldVal={item[field.a]}
          estim={item.Evals[field.a]}
          fieldFn={fieldFn}
        />
        <div className="wrap-cp">
          <button className={classBtn(field)} onClick={() => setShow(!show)}>
            {show ? "-" : "+"}
            {field.short}
          </button>
        </div>
        <EditFieldDim
          scale="left"
          show={show} // key={i}
          fieldName={field.b}
          placeholder={field.b}
          setIsTxt={setIsTxt}
          classN={classB()}
          isTxt={isTxt && fieldId === field.b}
          isActive={fieldId === field.b}
          fieldVal={item[field.b]}
          estim={item.Evals[field.b]}
          fieldFn={fieldFn}
        />
      </div>
    </>
  );
};

export default EditOneDim;
