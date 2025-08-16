import { useCallback, useMemo, useState } from "react";
import { labelsFullVerdictEdit, recomDim } from "../utils/analysis";
import { applyAction } from "../utils/utilStr";

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

  const bestField = useCallback((i) => {
    const result = [];
    if (i > -1 && i < 5) result.push("R1");
    if (i > 3) result.push("R2");
    return result;
  }, []);

  const setNewRate = (e, num) => {
    let v = best.num === num ? -1 : num;
    const rec = best.rec === "" ? recomDim(item.Evals).recom : best.rec;
    setBest(
      v === -1
        ? { num: -1, title: "", fields: [], rec: rec }
        : { num: num, title: rateStr(num), fields: bestField(v), rec: rec }
    );

    setItem({ ...item, likert: num });
  };
  return { setNewRate, titleChoosed, best, setBest };
};
