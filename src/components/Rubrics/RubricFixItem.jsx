import { useState, useRef } from "react";
import { usePopper } from "react-popper";

function RubricFixItem({ criteria, index, el, fieldFn, editEl, edit }) {
  const [tooltipContent, setTooltipContent] = useState("");
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
    modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
  });
  const scaleSm = { "-1": "NA", 0: "No", 1: "Mn", 2: "Mj" };
  const onClick = (e, value, index) => {
    e.stopPropagation();

    if (e.button === 2) return;
    const newV = value + 1 > 2 ? -1 : value + 1;
    fieldFn.setNewVal(newV, "score" + el + "-" + index);
  };
  const handleContextMenu = (e, i, val) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.button === 2 && val > 0) {
      fieldFn.setDefRef();
      const fname = "error" + el + "-" + i + "-C" + (i + 1);
      const tel = document.getElementById(fname);
      if (tel) {
        tel.focus();
        return;
      }
      edit(i, el);
      return;
    }
  };
  return (
    <>
      <div
        className="rub-color-box"
        onClick={(e) => e.stopPropagation()}
        ref={setReferenceElement}
        onMouseEnter={() =>
          setTooltipContent(index + 1 + ") " + criteria.rubric)
        }
        onMouseLeave={() => setTooltipContent("")}
        // datacont={criteria["error" + el]}
        datarub={index + 1 + ") " + criteria.rubric}>
        <button
          onContextMenu={(e) =>
            handleContextMenu(e, index, criteria["score" + el])
          }
          onClick={(e) => {
            onClick(e, criteria["score" + el], index);
          }}
          className={
            "rubBtnScore rubB" +
            criteria["score" + el] +
            (criteria["score" + el] < 1
              ? " hideBtn"
              : criteria["score" + el] > 0 && !criteria["error" + el]
              ? " nojust"
              : "") +
            (editEl &&
            editEl.fieldName === "error" + el &&
            editEl.crit === index
              ? " isAc"
              : "")
          }>
          {scaleSm[criteria["score" + el]]}
        </button>
        <span className="numi">{index + 1}</span>
      </div>{" "}
      {tooltipContent && referenceElement === document.activeElement && (
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
          className="rub-tooltip">
          {tooltipContent}
        </div>
      )}
    </>
  );
}
export default RubricFixItem;
{
  /* <Fragment key={index}>
          <div
            className="rub-color-box"
            onClick={(e) => e.stopPropagation()}
            datacont={criteria["error" + el]}
            datarub={index + 1 + ") " + criteria.rubric}>
            <button
              onContextMenu={(e) =>
                handleContextMenu(e, index, criteria["score" + el])
              }
              onClick={(e) => {
                onClick(e, criteria["score" + el], index);
              }}
              className={
                "rubBtnScore rubB" +
                criteria["score" + el] +
                (criteria["score" + el] < 1
                  ? " hideBtn"
                  : criteria["score" + el] > 0 && !criteria["error" + el]
                  ? " nojust"
                  : "") +
                (editEl &&
                editEl.fieldName === "error" + el &&
                editEl.crit === index
                  ? " isAc"
                  : "")
              }>
              {scaleSm[criteria["score" + el]]}
            </button>
            <span className="numi">{index + 1}</span>
          </div>
        </Fragment> */
}
