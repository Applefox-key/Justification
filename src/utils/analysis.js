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
  console.log(result);

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
  console.log(respEval);
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
  console.log(resArr);
  let justT = resArr.join("");
  if (justT && typeof justT === "string") toJustif({ en: justT });
};

export const recomDim = (evals) => {
  const criteria = [
    "Instructions",
    "Factuality",
    "Language",
    "Coherence",
    "Presentation",
    "Tone",
  ];

  let criteriaAdvantageA = 0; // Количество критериев, где A лучше
  let criteriaAdvantageB = 0; // Количество критериев, где B лучше
  let significantDifference = 0; // Количество критериев с разницей >= 2
  let critCriteriaA = 0;
  let critCriteriaB = 0;
  criteria.forEach((criterion, i) => {
    const diff = evals[`${criterion}_A`] - evals[`${criterion}_B`];
    if (diff > 0) {
      critCriteriaA = i < 3 ? critCriteriaA + 1 : critCriteriaA;
      criteriaAdvantageA++;
    } else if (diff < 0) {
      critCriteriaB = i < 3 ? critCriteriaB + 1 : critCriteriaB;
      criteriaAdvantageB++;
    }

    if (Math.abs(diff) >= 2) {
      significantDifference++;
    }
  });
  const dif = Math.abs(criteriaAdvantageA - criteriaAdvantageB);
  const difCrit = Math.abs(critCriteriaA - critCriteriaB);
  // Если разница минимальна или отсутствует
  if (
    dif === 0
    // ||    Math.abs(criteriaAdvantageA - criteriaAdvantageB) <= 1
  ) {
    return `Equally Good: Both responses are very close in quality. Choose either Response A or Response B based on personal preference.`;
  }
  // Определяем победителя
  const winner = criteriaAdvantageA > criteriaAdvantageB ? "A" : "B";

  if (dif < 3 && difCrit === 1)
    return `Slightly Better: Response ${winner} outperforms in 1–2 criteria.`;
  else if (significantDifference <= 4)
    return `Better: Response ${winner} is stronger in most important criteria.`;
  else
    return `Much Better: Response ${winner} significantly outperforms the other.`;
};
