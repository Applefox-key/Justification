export const defaultEval = {
  score: 0,
  critMinor: 0,
  critMajor: 0,
  nonCritMinor: 0,
  nonCritMajor: 0,
  recomScore: [],
  maxRecom: "",
};
export const labelsVerdict = [
  "A much better",
  "A better",
  "A slightly better",
  "Same",
  "B slightly better",
  "B better",
  "B much better",
];
export const evaluate = (resp, criteria) => {
  let criticalScores = criteria.filter((c) => c.isCrit).map((c) => c[resp]);
  let nonCriticalScores = criteria.filter((c) => !c.isCrit).map((c) => c[resp]);

  let critMajor = criticalScores.filter((score) => score === 3).length;
  let critMinor = criticalScores.filter((score) => score === 2).length;
  let nonCritMinor = nonCriticalScores.filter((score) => score === 2).length;
  let nonCritMajor = nonCriticalScores.filter((score) => score === 3).length;

  if (critMajor > 0)
    return {
      score: 2,
      critMinor,
      critMajor,
      nonCritMinor,
      nonCritMajor,
      recomScore: [1, 2],
      maxRecom: "any",
    };
  if (critMinor > 0)
    return {
      score: 4,
      critMinor,
      critMajor,
      nonCritMinor,
      nonCritMajor,
      recomScore: [2, 3, 4],
      maxRecom: "better/ slightly better/ same",
    };

  let allOnes = criteria.every((c) => c[resp] === 1 || c[resp] === 0);
  if (allOnes)
    return {
      score: 5,
      critMinor,
      critMajor,
      nonCritMinor,
      nonCritMajor,
      recomScore: [5],
      maxRecom: "better/ slightly better/ same",
    };

  let criticalOnes = criticalScores.every(
    (score) => score === 1 || score === 0
  );
  let hasNonCriticalAboveOne = nonCriticalScores.some((score) => score > 1);

  if (criticalOnes && hasNonCriticalAboveOne)
    return {
      score: 4,
      critMinor,
      critMajor,
      nonCritMinor,
      nonCritMajor,
      recomScore: [4],
      maxRecom: "slightly better/ same",
    };

  return {
    score: 3,
    critMinor,
    critMajor,
    nonCritMinor,
    nonCritMajor,
    recomScore: [3],
    maxRecom: "better/ slightly better/ same",
  }; // Default case if none of the above apply
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
      comparisonResult = " Response B is slightly better)";
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
  return result;
};

//respEvalnoProblA{ name: el, isCrit: false, respA: 0, respB: 0 };
export const createJustifSheema = (
  respEval,
  overallRate,
  verdict,
  toJustif
) => {
  const noProblA = respEval.filter((el) => el.respA === 1);
  const noProblB = respEval.filter((el) => el.respB === 1);
  const noProblAB = respEval.filter((el) => el.respA === 1 && el.respB === 1);
  const CrProblA__major = respEval.filter((el) => el.isCrit && el.respA === 3);
  const CrProblB__major = respEval.filter((el) => el.isCrit && el.respB === 3);
  const CrProblAB__major = respEval.filter(
    (el) => el.isCrit && el.respA === 3 && el.respB === 3
  );
  const CrProblA__minor = respEval.filter((el) => el.isCrit && el.respA === 2);
  const CrProblB__minor = respEval.filter((el) => el.isCrit && el.respB === 2);
  const CrProblAB__minor = respEval.filter(
    (el) => el.isCrit && el.respA === 2 && el.respB === 2
  );

  const unCrProblA__major = respEval.filter(
    (el) => !el.isCrit && el.respA === 3
  );
  const unCrProblB__major = respEval.filter(
    (el) => !el.isCrit && el.respB === 3
  );
  const unCrProblAB__major = respEval.filter(
    (el) => !el.isCrit && el.respA === 3 && el.respB === 3
  );
  const unCrProblA__minor = respEval.filter(
    (el) => !el.isCrit && el.respA === 2
  );
  const unCrProblB__minor = respEval.filter(
    (el) => !el.isCrit && el.respB === 2
  );
  const unCrProblAB__minor = respEval.filter(
    (el) => !el.isCrit && el.respA === 2 && el.respB === 2
  );
  let tmp = "";
  console.log(respEval);
  let just = !!CrProblAB__major.length
    ? "Both responses have major problem with " +
      CrProblAB__major.map((el) => el.name).join(
        ", (Response A EXAMPLE, Response B EXAMPLE).  "
      ) +
      ", (Response A EXAMPLE, Response B EXAMPLE).  "
    : "";
  tmp = !!CrProblA__major.length
    ? CrProblA__major.filter(
        (el) => !CrProblAB__major.some((majorEl) => majorEl.name === el.name)
      )
        .map((el) => el.name)
        .join(", (EXAMPLE). ")
    : "";

  just += !!tmp
    ? "Response A has major problem with " + tmp + ", (EXAMPLE). "
    : "";

  tmp = !!CrProblB__major.length
    ? CrProblB__major.filter(
        (el) => !CrProblAB__major.some((majorEl) => majorEl.name === el.name)
      )
        .map((el) => el.name)
        .join(", (EXAMPLE)")
    : "";
  just += !!tmp
    ? "Response B has major problem with " + tmp + ", (EXAMPLE). "
    : "";

  just += !!CrProblAB__minor.length
    ? "Both responses have some problem with " +
      CrProblB__minor.map((el) => el.name).join(
        ", (Response A EXAMPLE, Response B EXAMPLE).  "
      ) +
      ", (Response A EXAMPLE, Response B EXAMPLE).  "
    : "";
  tmp = !!CrProblA__minor.length
    ? CrProblA__minor.filter(
        (el) => !CrProblAB__minor.some((majorEl) => majorEl.name === el.name)
      )
        .map((el) => el.name)
        .join(", (EXAMPLE). ")
    : "";
  just += !!tmp
    ? "Response A has some problem with " + tmp + ", (EXAMPLE). "
    : "";

  tmp = !!CrProblB__minor.length
    ? CrProblB__minor.filter(
        (el) => !CrProblAB__minor.some((majorEl) => majorEl.name === el.name)
      )
        .map((el) => el.name)
        .join(", (EXAMPLE). ")
    : "";
  just += !!tmp
    ? "Response B has minor problem with " + tmp + ", (EXAMPLE). "
    : "";
  //----------------------------------uncrit
  just += !!unCrProblAB__major.length
    ? "Both responses have major problem with " +
      unCrProblAB__major
        .map((el) => el.name)
        .join(", (Response A EXAMPLE, Response B EXAMPLE).  ") +
      ", (Response A EXAMPLE, Response B EXAMPLE).  "
    : "";
  tmp = !!unCrProblA__major.length
    ? unCrProblA__major
        .filter(
          (el) =>
            !unCrProblAB__major.some((majorEl) => majorEl.name === el.name)
        )
        .map((el) => el.name)
        .join(", (EXAMPLE). ")
    : "";
  just += !!tmp
    ? "Response A has major problem with " + tmp + ", (EXAMPLE). "
    : "";

  tmp = !!unCrProblB__major.length
    ? unCrProblB__major
        .filter(
          (el) =>
            !unCrProblAB__major.some((majorEl) => majorEl.name === el.name)
        )
        .map((el) => el.name)
        .join(", (EXAMPLE). ")
    : "";
  just += !!tmp
    ? "Response B has major problem with " + tmp + ", (EXAMPLE). "
    : "";
  just += !!unCrProblAB__minor.length
    ? "Both responses have some problem with " +
      unCrProblB__minor
        .map((el) => el.name)
        .join(", (Response A EXAMPLE, Response B EXAMPLE).  ") +
      ", (Response A EXAMPLE, Response B EXAMPLE).  "
    : "";
  tmp += !!unCrProblA__minor.length
    ? unCrProblA__minor
        .filter(
          (el) =>
            !unCrProblAB__minor.some((majorEl) => majorEl.name === el.name)
        )
        .map((el) => el.name)
        .join(", (EXAMPLE). ")
    : "";
  just += !!tmp
    ? "Response A has some problem with " + tmp + ", (EXAMPLE). "
    : "";

  tmp = !!unCrProblB__minor.length
    ? unCrProblB__minor
        .filter(
          (el) =>
            !unCrProblAB__minor.some((majorEl) => majorEl.name === el.name)
        )
        .map((el) => el.name)
        .join(", (EXAMPLE). ")
    : "";
  just += !!tmp
    ? "Response B has minor problem with " + tmp + ", (EXAMPLE). "
    : "";
  //----------------------------------noprobl
  just += !!noProblAB.length
    ? "Both responses have no problem with " +
      noProblAB.map((el) => el.name).join(", ")
    : "";
  tmp = !!noProblA.length
    ? noProblA
        .filter((el) => !noProblAB.some((majorEl) => majorEl.name === el.name))
        .map((el) => el.name)
        .join(", ")
    : "";
  just += !!tmp ? "Response A has no problem with " + tmp : "";
  tmp = !!noProblB.length
    ? noProblB
        .filter((el) => !noProblAB.some((majorEl) => majorEl.name === el.name))
        .map((el) => el.name)
        .join(", ")
    : "";
  just += !!tmp ? "Response B has no problem with " + tmp : "";
  const { respA, respB } = overallRate;
  just += verdict.result;
  if (just && typeof just === "string") toJustif({ en: just });
};
