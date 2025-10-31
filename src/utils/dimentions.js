import { defaultDimSets, defaultDimTempl } from "../constants/dimDefault";
import { getSet } from "./localStorage";
import {
  composeByResp,
  composeRateByScores,
  composeRateBothByDim,
  composeRateBothSimple,
  justificationByScores,
  justificationBySentences,
  getResumeByDimTXT,
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
      label: "compose by sentences",
      onClick: () => {
        const res = getResumeByDimTXT(item);
        setItem({
          ...item,
          Justif: res,
        });
      },
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
export const constructDefItem = (sn) => {
  const setName = sn ?? "set2";
  const defAB = defaultDimSets[setName].reduce((acc, { a, b }) => {
    acc[a] = "";
    acc[b] = "";
    return acc;
  }, {});
  const defABE = defaultDimSets[setName].reduce((acc, { a, b }) => {
    acc[a] = 0;
    acc[b] = 0;
    return acc;
  }, {});

  return { ...defaultDimTempl, ...defAB, Evals: { ...defABE }, setName: sn };
};

export const getNewOrParseDmg = (el = null, set = null) => {
  let setN = (el ? el.setName : "") || getSet();
  // if ((setN = "")) setN = getSet();

  const defEl = constructDefItem(setN);
  return el ? { ...defEl, ...JSON.parse(el) } : defEl;
};
