import { exampleSeparators } from "./rubricsTemplates";

export const defaultEval = {
  score: 0,
  critMinor: 0,
  critMajor: 0,
  nonCritMinor: 0,
  nonCritMajor: 0,
  recomScore: [],
  maxRecom: "",
  allOnes: true,
};
export const labelsVerdict = [
  "A is much better",
  "A is better",
  "A is slightly better",
  "Same",
  "B is slightly better",
  "B is better",
  "B is much better",
];
export const labelsFullVerdict = [
  "A is much better",
  "A is better",
  "A is slightly better",
  "A is negligibly better",
  "Same",
  "B is negligibly better",
  "B is slightly better",
  "B is better",
  "B is much better",
];
export const labelsFullVerdictEdit = [
  "@Response 1 is much better than @Response 2.",
  "@Response 1 is better than @Response 2.",
  "@Response 1 is slightly better than @Response 2.",
  "@Response 1 is negligibly better than @Response 2.",
  "@Response 1 and @Response 2 are the same.",
  "@Response 2 is negligibly better than @Response 1.",
  "@Response 2 is slightly better than @Response 1.",
  "@Response 2 is better than @Response 1.",
  "@Response 2 is much better than @Response 1.",
];
export const labelsFullVerdictRub = [
  "Response 1 is much better than Response 2.",
  "Response 1 is better than Response 2.",
  "Response 1 is slightly better than Response 2.",
  "Response 1 and Response 2 are about the same quality.",
  "Response 2 is slightly better than Response 1.",
  "Response 2 is better than Response 1.",
  "Response 2 is much better than Response 1.",
];
export const labelsVerdictEdit = [
  "@Response 1 is much better than @Response 2.",
  "@Response 1 is better than @Response 2.",
  "@Response 1 is slightly better than @Response 2.",
  "@Response 1 and @Response 2 are the same.",
  "@Response 2 is slightly better than @Response 1.",
  "@Response 2 is better than @Response 1.",
  "@Response 2 is much better than @Response 1.",
];
export const defaultOverAll = {
  respA: defaultEval,
  respB: defaultEval,
};
export const defaultVerdict = {
  result: 0,
  resultNum: 0,
  recom: 0,
};
const evalStat = (resp, criteria) => {
  let criticalScores = criteria.filter((c) => c.isCrit).map((c) => c[resp]);
  let nonCriticalScores = criteria.filter((c) => !c.isCrit).map((c) => c[resp]);
  let critMajor = criticalScores.filter((score) => score === 3).length;
  let critMinor = criticalScores.filter((score) => score === 2).length;
  let nonCritMinor = nonCriticalScores.filter((score) => score === 2).length;
  let nonCritMajor = nonCriticalScores.filter((score) => score === 3).length;
  let allOnes = criteria.every((c) => c[resp] === 1 || c[resp] === 0);
  let criticalOnes = criticalScores.every(
    (score) => score === 1 || score === 0
  );
  let hasNonCriticalAboveOne = nonCriticalScores.some((score) => score > 1);
  return {
    criticalScores,
    nonCriticalScores,
    critMajor,
    critMinor,
    nonCritMinor,
    nonCritMajor,
    allOnes,
    criticalOnes,
    hasNonCriticalAboveOne,
  };
};

const evalStatHalf = (evalStHalf) => {
  let allOnes =
    evalStHalf.critMinor +
      evalStHalf.critMajor +
      evalStHalf.nonCritMinor +
      evalStHalf.nonCritMajor ===
    0;
  let criticalOnes = evalStHalf.critMinor + evalStHalf.critMajor === 0;
  let hasNonCriticalAboveOne =
    evalStHalf.nonCritMinor + evalStHalf.nonCritMajor !== 0;
  return {
    ...evalStHalf,
    criticalOnes,
    hasNonCriticalAboveOne,
    allOnes,
  };
};
//------------------------------
export const evalOnStat = (evalst) => {
  if (evalst.critMajor > 0)
    return {
      score: 2,
      critMinor: evalst.critMinor,
      critMajor: evalst.critMajor,
      nonCritMinor: evalst.nonCritMinor,
      nonCritMajor: evalst.nonCritMajor,
      recomScore: [1, 2],
      maxRecom: "any",
    };
  if (evalst.critMinor > 0)
    return {
      score: 4,
      critMinor: evalst.critMinor,
      critMajor: evalst.critMajor,
      nonCritMinor: evalst.nonCritMinor,
      nonCritMajor: evalst.nonCritMajor,
      recomScore: [2, 3, 4],
      maxRecom: "better/ slightly better/ same",
    };

  if (evalst.allOnes)
    return {
      score: 5,
      critMinor: evalst.critMinor,
      critMajor: evalst.critMajor,
      nonCritMinor: evalst.nonCritMinor,
      nonCritMajor: evalst.nonCritMajor,
      recomScore: [5],
      maxRecom: "better/ slightly better/ same",
    };
  if (evalst.criticalOnes && evalst.hasNonCriticalAboveOne)
    return {
      score: 4,
      critMinor: evalst.critMinor,
      critMajor: evalst.critMajor,
      nonCritMinor: evalst.nonCritMinor,
      nonCritMajor: evalst.nonCritMajor,
      recomScore: [4],
      maxRecom: "slightly better/ same",
    };

  return {
    score: 3,
    critMinor: evalst.critMinor,
    critMajor: evalst.critMajor,
    nonCritMinor: evalst.nonCritMinor,
    nonCritMajor: evalst.nonCritMajor,
    recomScore: [3],
    maxRecom: "better/ slightly better/ same",
  }; // Default case if none of the above apply
};
//------------------------------
export const evaluate = (resp, criteria) => {
  const evalSt = evalStat(resp, criteria);
  const result = evalOnStat(evalSt);
  return result;
};

export const evaluateHalf = (evalh) => {
  const evalSt = evalStatHalf(evalh);
  const result = evalOnStat(evalSt);
  return result;
};
export const evaluateResponses = (criteria) => {
  return {
    respA: evaluate("respA", criteria),
    respB: evaluate("respB", criteria),
  };
};
const analysisOverall = (respA, respB) => {
  let difference = Math.abs(respA.score - respB.score);
  // Если разница в оценках 0, сравниваем по критическим параметрам
  if (difference === 0) return null;
  let comparisonResult, comparisonResultNum;
  if (difference === 1)
    if (respB.score < respA.score) {
      comparisonResult = " Response A is slightly better";
      comparisonResultNum = 3;
    } else {
      comparisonResult = " Response B is slightly better";
      comparisonResultNum = 5;
    }
  if (difference === 2)
    if (respB.score < respA.score) {
      comparisonResult = " Response A is better";
      comparisonResultNum = 2;
    } else {
      comparisonResult = " Response B is better";
      comparisonResultNum = 6;
    }
  if (difference === 3)
    if (respB.score < respA.score) {
      comparisonResult = "Response A is much better";
      comparisonResultNum = 1;
    } else {
      comparisonResult = " Response B is much better";
      comparisonResultNum = 7;
    }
  return {
    result: comparisonResult,
    resultNum: comparisonResultNum,
    recom: "same/ slightly better/ better/ much better",
    recomNum: [1, 2, 3, 4, 5, 6, 7],
  };
};
const analysisCriter = (respA, respB) => {
  let comparisonResult, comparisonResultNum, comparisonRecom, recomNum;
  comparisonResult = "";
  comparisonResultNum = 0;
  recomNum = 0;
  comparisonRecom = "";

  //major CRIT in one or both
  if (!!respA.critMajor || !!respB.critMajor) {
    //major CRIT -- major CRIT  SAME/Slightly better   BOTH
    if (!!respA.critMajor && !!respB.critMajor) {
      comparisonResult = "Responses are the same.";
      comparisonResultNum = 4;
      comparisonRecom = "SAME/Slightly better";
      recomNum = [3, 4, 5];
    }
    //A major CRIT - B minor CRIT  SAME/Slightly better ONEA
    else if (!!respA.critMajor && !respB.critMajor && !!respB.critMinor) {
      // SAME/A Slightly better
      comparisonResult = "Responses are the same.";
      comparisonResultNum = 4;
      comparisonRecom = "SAME/A Slightly better";
      recomNum = [3, 4];
    }
    //B major CRIT - A minor CRIT  SAME/Slightly better ONEB
    else if (!!respB.critMajor && !respA.critMajor && !!respA.critMinor) {
      // SAME/B Slightly better
      comparisonResult = "Responses are the same.";
      comparisonResultNum = 4;
      comparisonRecom = "SAME/B Slightly better";
      recomNum = [4, 5];
    }

    //A major CRIT --B NO ISSUES
    else if (!!respA.critMajor && !respB.critMajor && !respB.critMinor) {
      // B Much better
      comparisonResult = "Response B is much better";
      comparisonResultNum = 7;
      comparisonRecom = "B Much better";
      recomNum = [7];
    }
    //B major CRIT --A NO ISSUES
    else if (!!respB.critMajor && !respA.critMajor && !respA.critMinor) {
      // A Much better
      comparisonResult = "Response A is much better";
      comparisonResultNum = 1;
      comparisonRecom = "A Much better";
      recomNum = [1];
    }
  }
  //no major CRIT: minor CRIT in one or both
  else if (!!respA.critMinor || !!respB.critMinor) {
    //minor CRIT -- minor CRIT BOTH
    if (!!respA.critMinor && !!respB.critMinor) {
      //SAME/Slightly better   BOTH
      comparisonResult = "Responses are the same.";
      comparisonResultNum = 4;
      comparisonRecom = "SAME/Slightly better ";
      recomNum = [3, 4, 5];
    } //A minor CRIT  - B NO ISSUES  better ONEB
    else if (!!respA.critMinor && !respB.critMinor) {
      // B better
      comparisonResult = "Response B is better";
      comparisonResultNum = 6;
      comparisonRecom = "B better";
      recomNum = [6];
    }
    //B minor CRIT  - A NO ISSUES  better ONEA
    else if (!!respB.critMinor && !respA.critMinor) {
      // A better
      comparisonResult = "Response A is better";
      comparisonResultNum = 2;
      comparisonRecom = "A better";
      recomNum = [2];
    }
  }
  //no CRIT:
  // major noncrit in one or both
  else if (!!respA.nonCritMajor || !!respB.nonCritMajor) {
    //major -- NO ISSUES
    // A major -- B NO ISSUES  B Slightly better
    if (!!respA.nonCritMajor && !respB.nonCritMajor) {
      // B Slightly better
      comparisonResult = "Response B is slightly better";
      comparisonResultNum = 5;
      comparisonRecom = "B slightly better";
      recomNum = [5];
    } // B major -- A NO ISSUES  A Slightly better
    else if (!!respB.nonCritMajor && !respA.nonCritMajor) {
      // A Slightly better
      comparisonResult = "Response A is slightly better";
      comparisonResultNum = 3;
      comparisonRecom = "Response A is slightly better";
      recomNum = [3];
    }
    //minor -- major  SAME
    // minor -- NO ISSUES  SAME
    comparisonResult = "Responses are the same.";
    comparisonResultNum = 4;
    comparisonRecom = "same";
    recomNum = [4];
    // SAME
  }
  return {
    result: comparisonResult,
    resultNum: comparisonResultNum,
    recom: comparisonRecom,
    recomNum: recomNum,
  };
};

export const compareResponses = (evaluation) => {
  const { respA, respB } = evaluation;

  if (!respA.score && !respB.score)
    return {
      result: "",
      resultNum: 0,
      recom: "",
    };

  let result = analysisOverall(respA, respB);
  if (result !== null) return result;

  result = analysisCriter(respA, respB);

  return result.resultNum !== 0
    ? result
    : {
        recom: "SAME/Slightly better",
        recomNum: (3)[(3, 4, 5)],
        result: "Responses are the same.",
        resultNum: 4,
      };
};

export const createJustifSheema = (respEval, verdict, toJustif) => {
  //both[no min maj] a b
  const levParts = [
    " no issues with ",
    " some problems with ",
    " major problems with ",
  ];
  const respParts = ["Both responses have", "Response A has", "Response B has"];
  const exampleParts = [
    ". Response A: EXAMPLE_A. Response B: EXAMPLE_B. ",
    ": EXAMPLE_A. ",
    ": EXAMPLE_B. ",
  ];
  const resAr = [
    [[], [], []],
    [[], [], []],
    [[], [], []],
  ];

  respEval.forEach((criteria) => {
    //both
    if (criteria.respA === criteria.respB && criteria.respA !== 0) {
      resAr[0][criteria.respA - 1].push(criteria.name);
    }
    //A
    else {
      if (criteria.respA !== 0) {
        resAr[1][criteria.respA - 1].push(criteria.name);
      }
      //A
      if (criteria.respB !== 0) {
        resAr[2][criteria.respB - 1].push(criteria.name);
      }
    }
  });

  //both
  let resArr = [];
  resAr.forEach((resp, ri) => {
    resp.forEach((lev, li) => {
      let rowL = "";
      lev.forEach((crit, ci) => {
        if (li === 0)
          rowL =
            (ci === 0 ? respParts[ri] + levParts[li] : "") +
            crit +
            (ci === lev.length - 1 ? ". " : ", ");
        else rowL = respParts[ri] + levParts[li] + crit + exampleParts[ri];
        resArr.push(rowL);
      });
    });
  });

  let part = verdict.result;
  if (part) resArr.push(part + ".");

  let justT = resArr.join("");
  if (justT && typeof justT === "string") toJustif({ en: justT });
};

// export const recomDim1 = (evals) => {
//   const criteria = [
//     "Instructions",
//     "Factuality",
//     "Language",
//     "Coherence",
//     "Presentation",
//     "Tone",
//   ];

//   const rate = {
//     a: { scoreCrit: 0, scoreNonCrit: 0, dimCrit: 0, dimNonCrit: 0 },
//     b: { scoreCrit: 0, scoreNonCrit: 0, dimCrit: 0, dimNonCrit: 0 },
//   };
//   let criteriaAdvantageA = 0; // Количество критериев, где A лучше
//   let criteriaAdvantageB = 0; // Количество критериев, где B лучше
//   let significantDifference = 0; // Количество критериев с разницей >= 2
//   let critCriteriaA = 0;
//   let critCriteriaB = 0;

//   criteria.forEach((criterion, i) => {
//     const diff = evals[`${criterion}_A`] - evals[`${criterion}_B`];
//     if (diff > 0) {
//       critCriteriaA = i < 3 ? critCriteriaA + 1 : critCriteriaA;
//       criteriaAdvantageA++;
//     } else if (diff < 0) {
//       critCriteriaB = i < 3 ? critCriteriaB + 1 : critCriteriaB;
//       criteriaAdvantageB++;
//     }
//     if (Math.abs(diff) >= 2) {
//       significantDifference++;
//     }
//   });
//   const dif = Math.abs(criteriaAdvantageA - criteriaAdvantageB);
//   const difCrit = Math.abs(critCriteriaA - critCriteriaB);
//   // Если разница минимальна или отсутствует
//   if (dif === 0 && difCrit === 0)
//     return `Equally Good: Both responses are very close in quality. Choose either Response A or Response B based on personal preference.`;

//   // Определяем победителя
//   const winner = criteriaAdvantageA > criteriaAdvantageB ? "A" : "B";
//   if (difCrit === 0 && dif < 3)
//     return `Slightly Better: Response ${winner} outperforms in 1–2 criteria.`;
//   if (dif > 2 && difCrit < 2)
//     return `Better: Response ${winner}  outperforms in more then 2 criteria.`;
//   if (dif > 2 && difCrit > 1 && dif < 6)
//     return `Better: Response ${winner} is stronger in most important criteria.`;
//   else
//     return `Much Better: Response ${winner} significantly outperforms another response.`;
// };
export const recomDim = (evals, critSet) => {
  try {
    let ev = { ...evals };
    delete ev.Rate;
    if (Object.values(ev).some((value) => value === 0))
      return { recom: "", detales: "" };
    const criteria = !critSet
      ? [
          { id: "Instructions", isCrit: true },
          { id: "Factuality", isCrit: true },
          { id: "Language", isCrit: true },
          { id: "Coherence", isCrit: false },
          { id: "Presentation", isCrit: false },
          { id: "Tone", isCrit: false },
        ]
      : critSet.map((el) => {
          return { id: el.id, isCrit: el.isCrit };
        });

    const rate = {
      A: { scoreCrit: 0, scoreNonCrit: 0, dimCrit: 0, dimNonCrit: 0 },
      B: { scoreCrit: 0, scoreNonCrit: 0, dimCrit: 0, dimNonCrit: 0 },
    };
    criteria.forEach((criterion, i) => {
      const dif = evals[`${criterion.id}_A`] - evals[`${criterion.id}_B`];
      rate.A[`score${criterion.isCrit ? "Crit" : "NonCrit"}`] +=
        evals[`${criterion.id}_A`];
      rate.B[`score${criterion.isCrit ? "Crit" : "NonCrit"}`] +=
        evals[`${criterion.id}_B`];

      if (dif !== 0) {
        const win = dif > 0 ? "A" : "B";

        rate[win][i < 2 || i === 3 ? "dimCrit" : "dimNonCrit"] += 1;
      }
    });
    rate.A.avScore = ((rate.A.scoreCrit + rate.A.scoreNonCrit) / 6).toFixed(2);
    rate.B.avScore = ((rate.B.scoreCrit + rate.B.scoreNonCrit) / 6).toFixed(2);
    rate.A.avScoreCr = (rate.A.scoreCrit / 3).toFixed(2);
    rate.B.avScoreCr = (rate.B.scoreCrit / 3).toFixed(2);
    rate.winCrit =
      rate.A.dimCrit === rate.B.dimCrit
        ? null
        : rate.A.dimCrit > rate.B.dimCrit
        ? "A"
        : "B";
    rate.winScore =
      rate.A.avScore === rate.B.avScore
        ? null
        : rate.A.avScore > rate.B.avScore
        ? "A"
        : "B";
    rate.winNonCrit =
      rate.A.dimNonCrit === rate.B.dimNonCrit
        ? null
        : rate.A.dimNonCrit > rate.B.dimNonCrit
        ? "A"
        : "B";

    rate.difCrit = Math.abs(rate.A.dimCrit - rate.B.dimCrit);
    rate.difNonCrit = Math.abs(rate.A.dimNonCrit - rate.B.dimNonCrit);

    let anRecom = "";
    if (rate.winCrit === null && rate.winNonCrit === null) {
      if (rate.winScore === null)
        anRecom = `EQUALLY GOOD/BAD: Both responses are very close in quality. Choose either Response A or Response B based on personal preference. (rec#0)`;
      else
        anRecom = `SLIGHTLY BETTER: Response ${rate.winScore} has higher average score. (rec#2)`;
    } else if (rate.difCrit !== 0) {
      if (rate.difCrit === 1)
        if (rate.winCrit === rate.winNonCrit || rate.winNonCrit === null)
          if (rate.difCrit + rate.difNonCrit < 3)
            if (Math.abs(rate.A.avScoreCr - rate.B.avScoreCr) >= 1)
              anRecom = `BETTER: Response ${rate.winCrit} significantly outperforms in 1 important criteria. (rec#3_1)`;
            else
              anRecom = `SLIGHTLY BETTER: Response ${rate.winCrit} outperforms in 1–2 criteria. (rec#3)`;
          else if (
            parseFloat(rate[rate.winCrit].avScore) === 5 &&
            parseFloat(rate[rate.winCrit === "A" ? "B" : "A"].avScore) <= 3
          )
            anRecom = `MUCH BETTER: Response ${rate.winCrit} significantly outperforms the other. (rec#4)`;
          else
            anRecom = `BETTER: Response ${rate.winCrit}  outperforms in more then 2 criteria. (rec#5)`;
        //winners a and b
        else {
          anRecom = `SLIGHTLY BETTER: Response ${rate.winCrit} outperforms in 1 important criteria while another response better in non important. (rec#6)`;
        }
      else if (
        (rate.winCrit === rate.winNonCrit || rate.winNonCrit === null) &&
        rate.difCrit === 2 &&
        Math.abs(rate.A.avScoreCr - rate.B.avScoreCr) >= 1
      )
        anRecom = `BETTER: Response ${rate.winCrit} significantly outperforms in 2 important criteria. (rec#3_0)`;
      else if (
        rate.difCrit + rate.difNonCrit <= 2 &&
        Math.abs(rate.A.avScoreCr - rate.B.avScoreCr) < 1
      )
        anRecom = `SLIGHTLY BETTER: Response ${rate.winCrit} outperforms in 1–2 criteria. (rec#3_2)`;
      else if (rate.winCrit === rate.winNonCrit || rate.winNonCrit === null) {
        if (
          parseFloat(rate[rate.winCrit].avScore) === 5 &&
          parseFloat(rate[rate.winCrit === "A" ? "B" : "A"].avScore) <= 3
        )
          anRecom = `MUCH BETTER: Response ${rate.winCrit} significantly outperforms the other. (rec#7)`;
        else
          anRecom = `BETTER: Response ${rate.winCrit}  outperforms in more then 2 criteria. (rec#8)`;
      } //winners a and b
      //better non crit win 1 crit but lose 2 crit
      else if (
        rate.winNonCrit !== null &&
        rate[rate.winNonCrit]?.dimCrit !== 0
      ) {
        anRecom = `SLIGHTLY BETTER: Response ${rate.winCrit} outperforms in 2 important criteria but it is worth in other, also another response better in one important criteria. (rec#9)`;
      }
      //better noncrit only non crit
      else
        anRecom = `BETTER: Response ${rate.winCrit}  is stronger in most important criteria. (rec#10)`;
      ///crit dif is null
    } else if (rate.difNonCrit < 3)
      anRecom = `SLIGHTLY BETTER: Response ${rate.winNonCrit} outperforms in 1–2 criteria. (rec#11)`;
    else
      anRecom = `BETTER: Response ${rate.winNonCrit} outperforms in more than 2 criteria. (rec#12)`;

    const avCritA = (rate.A.scoreCrit / 3).toFixed(2);
    const avNonCritA = (rate.A.scoreNonCrit / 3).toFixed(2);
    const avCritB = (rate.B.scoreCrit / 3).toFixed(2);
    const avNonCritB = (rate.B.scoreNonCrit / 3).toFixed(2);
    const detales = `Total scores: \nA ${
      rate.A.scoreNonCrit + rate.A.scoreCrit
    } ( crit: ${rate.A.scoreCrit} other: ${rate.A.scoreNonCrit} )
  B ${rate.B.scoreNonCrit + rate.B.scoreCrit} ( crit: ${
      rate.B.scoreCrit
    } other: ${rate.B.scoreNonCrit} )
    \nAverage rate:
   A ${rate.A.avScore} ( crit: ${avCritA} other: ${avNonCritA} )
   B ${rate.B.avScore} ( crit: ${avCritB} other: ${avNonCritB} )
   \nBetter dimentions:
   A ${rate.A.dimNonCrit + rate.A.dimCrit} ( crit: ${rate.A.dimCrit} other: ${
      rate.A.dimNonCrit
    } )
   B ${rate.B.dimNonCrit + rate.B.dimCrit} ( crit: ${rate.B.dimCrit} other: ${
      rate.B.dimNonCrit
    } )`;

    return { recom: anRecom, detales: detales };
  } catch (error) {
    return { recom: "", detales: "" };
  }
};

//rubrics
export const summariseRub = (item, i = null, ovr = false) => {
  const countRub = item.rubricator.length;
  const isAdd = "start";
  const result = {
    score1: { mn: 0, mj: 0, just: "", ovr: "" },
    score2: { mn: 0, mj: 0, just: "", ovr: "" },
    score3: { mn: 0, mj: 0, just: "", ovr: "" },
    score4: { mn: 0, mj: 0, just: "", ovr: "" },
  };

  const oneSummary = (ind) => {
    item.rubricator.forEach((item, numR) => {
      if (item["score" + ind] !== 0) {
        let j = item["error" + ind].trim();
        if (!j.endsWith(".")) j += ".";
        const jtxt = j.charAt(0).toUpperCase() + j.slice(1) + "\n\n";
        if (ovr) {
          result["score" + ind].ovr += jtxt;
          return;
        }

        if (item["score" + ind] === 1) result["score" + ind].mn++;
        else result["score" + ind].mj++;
        const txt_n = window.location.hostname === "localhost" ? "#" : ".";

        result["score" + ind].just +=
          (isAdd === "start"
            ? `Crit${txt_n} ${numR + 1} (${
                item["score" + ind] === 1 ? "minor" : "major"
              } issue): `
            : "") + jtxt;
      }
    });
    if (ovr) {
      newV["overall" + ind] = result["score" + ind].ovr;
      return newV;
    }
    const mnp = Math.round((100 * result["score" + ind].mn) / countRub);
    const mjp = Math.round((100 * result["score" + ind].mj) / countRub);
    let est = 5;
    if (mnp > 74 || mjp > 50) est = 1;
    else if (mnp > 49 || mjp > 24) est = 2;
    else if (mnp > 24 || mjp > 0) est = 3;
    else if (mnp > 0) est = 4;

    newV["eval" + ind] = est;
    newV["stat" + ind] =
      "MINOR- " + (mnp ? mnp : 0) + "% MAJOR- " + (mjp ? mjp : 0) + "%";
    newV["justif" + ind] = result["score" + ind].just;
  };
  const newV = { ...item };
  if (i !== null && i < 5) oneSummary(i);
  else if (i === null)
    [1, 2, 3, 4].forEach((ind) => {
      oneSummary(ind);
    });

  return newV;
};
export const sumJustificationRub = (item) => {
  const oneSummary = (ind) => {
    let res = "";
    item.rubricator.forEach((item, numR) => {
      if (item["score" + ind] > 0) {
        let j = item["error" + ind].trim();
        if (!j.endsWith(".")) j += ".";
        const jtxt = j.charAt(0).toUpperCase() + j.slice(1);

        if (jtxt) res += jtxt + "\n\n";
      }
    });
    return res;
  };

  let newV = "";

  [1, 2, 3, 4].forEach((ind) => {
    const r = oneSummary(ind);

    if (r) newV = `${newV} RESPONSE ${ind}:\n${r} \n`;
  });

  return newV;
};

//format=null (all fields) OR array with needed field names ["name","separator","example"]
// format: null - text, 1-"separator 2-all

// export const getRubricName = (criteria, getTxt = false, version = 0, formatText=) => {

export const getRubricName = (criteria, version = 0, format = []) => {
  let name =
    criteria.rubric.charAt(0).toUpperCase() +
    criteria.rubric.slice(1).trimEnd();
  // if (!name.endsWith(".")) name += ".";
  let formatText = !format.length;
  if (!criteria.example && formatText)
    return name.endsWith(".") ? name : name + ".";

  //example
  let exa = "";
  const example = criteria.example.trimEnd();
  exa = example.charAt(0).toLowerCase() + example.slice(1);

  //separator

  let exSep = exampleSeparators[Number(criteria.exExample)];
  let sepVal = exSep.value[version];
  if (sepVal) {
    name =
      name.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]$/, "") +
      exSep.punkt.nameEnd;
    exa =
      exa.replace(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]$/, "") +
      exSep.punkt.exEnd;
  }
  // if (sepVal && !name.endsWith(exSep.punkt)) name += exSep.punkt;
  // if (exa && exSep.punkt === " (") exa += ")";
  // if (exa && !exa.endsWith(".")) exa += ".";
  // console.log(criteria);
  // console.log(sepVal);

  // exaSeparator = `${criteria.exExample === null ? "" : sepVal} `;

  if (formatText) return `${name} ${sepVal} ${exa}`;

  let formatName =
    format.includes("name") || format.includes("all") ? (
      <mark>
        <b>{name}</b> <br />
      </mark>
    ) : (
      <>{name + " "}</>
    );

  let formatSeparator =
    sepVal && (format.includes("separator") || format.includes("all")) ? (
      <i className="separatorEx">{sepVal} </i>
    ) : (
      <>{sepVal + " "}</>
    );
  let formatExample =
    format.includes("example") || format.includes("all") ? (
      <i>{exa}</i>
    ) : (
      <>{exa}</>
    );
  return (
    <>
      {formatName}
      {formatSeparator}
      {formatExample}
    </>
  );
};

export const detectHeightRub = (isShown, isShowBoth, isMax = false) => {
  if (!isShown) return " h-0";
  if (isShowBoth) return isMax ? " maxh-50" : " h-50";
  else return isMax ? "maxh-90" : "h-88 auto-over";
};
