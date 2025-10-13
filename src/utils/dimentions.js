import {
  composeByResp,
  composeRateByScores,
  composeRateBothByDim,
  composeRateBothSimple,
  justificationByScores,
} from "./rates";

export const getActionButtons = (param) => {
  const { item, setItem, likert, action = "", setJustParts = null } = param;
  return [
    {
      label: "get hint",
      onClick: () => likert.getRecomendation(item.evals, true),
    },
    {
      label: "short justification",
      onClick: () =>
        composeRateBothSimple({
          item,
          setItem,
          fieldId: "Justif",
          best: likert.best,
          action,
        }),
    },
    {
      label: "compose Rates",
      onClick: () =>
        // composeRates({
        justificationByScores({
          item,
          setItem,
          fieldId: "Justif",
          best: likert.best,
          action,
        }),
    },

    {
      label: "By dimentions",

      onClick: () =>
        composeRateBothByDim({
          item,
          setItem,
          fieldId: "Justif",
          best: likert.best,
          action,
        }),
    },
    {
      label: "By scores",
      onClick: () =>
        composeRateByScores({
          item,
          setItem,
          fieldId: "Justif",
          best: likert.best,
          setresult: setJustParts,
          isFull: true,
          action,
        }),
    },
    {
      label: "by Responses",
      // onClick: () => composeByResp(item, setItem, "Justif", likert.best),
      onClick: () =>
        composeByResp({
          item,
          setItem,
          fieldId: "Justif",
          best: likert.best,
          action,
        }),
    },
  ];
};
