import { useCallback, useMemo, useState } from "react";
import { labelsFullVerdictEdit, recomDim } from "../utils/analysis";
import { applyAction } from "../utils/utilStr";
import { defaultDimSets } from "../constants/dimDefault";
import { sAlert } from "../utils/alert";

export const useRateLikert = (rateInput) => {
  const { action, item, setItem } = rateInput;

  const rateStr = useCallback(
    (i) => (i > -1 ? applyAction(labelsFullVerdictEdit[i], action) : ""),
    [action]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const titleChoosed = useMemo(
    () => rateStr(item.likert),
    [item.likert, rateStr]
  );
  const [best, setBest] = useState({
    num: item.likert,
    title: labelsFullVerdictEdit[item.likert],
    fields: [],
    rec: "",
  });

  // useEffect(() => {
  //   setBest({
  //     num: item.likert,
  //     title: labelsFullVerdictEdit[item.likert],
  //     fields: [],
  //     rec: "",
  //   });
  // }, [item.likert]);

  const bestField = useCallback((i) => {
    const result = [];
    if (i > -1 && i < 5) result.push("R1");
    if (i > 3) result.push("R2");
    return result;
  }, []);

  const getRecomendation = (evals = null, byBtn = null) => {
    const isEvent =
      evals && typeof evals === "object" && "preventDefault" in evals;
    const ev = isEvent ? item.Evals : evals || item.Evals;

    const rec = recomDim(
      ev,
      item.setName && defaultDimSets[item.setName]
    ).recom;

    setBest({ ...best, rec });
    if (rec && byBtn)
      sAlert({
        title: "Recomendation ",
        text: rec,
      });
  };

  const setNewRate = (e, num) => {
    let v = best.num === num ? -1 : num;
    // const rec =
    //   v === -1
    //     ? recomDim(item.Evals, item.setName && defaultDimSets[item.setName])
    //         .recom
    //     : "";
    setBest(
      v === -1
        ? { num: -1, title: "", fields: [], rec: "" }
        : { ...best, num: num, title: rateStr(num), fields: bestField(v) }
    );

    setItem({ ...item, likert: v });
  };

  return { setNewRate, titleChoosed, best, setBest, getRecomendation };
};
