// import { defaultRubJust, defaultRubricator } from "../constants/textParts";
import { sAlert } from "./alert";
import { summariseRub } from "./analysis";
import { defaultKey } from "./defaultKey";
import { saveToHistorygeneral } from "./localStorage";
import { defaultRubrics, rubExExample, defaultRubJust, defaultRubricator } from "../constants/rubricsTemplates";

export const createFieldFn = (item, setItem, textRef, setTextRef, action, fieldId, setPopup) => {
  const fieldFn = {
    delRub: async (index) => {
      const result = await sAlert({
        title: `Delete criteria #${index + 1}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, deleted it",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed)
        setItem((prev) => {
          return {
            ...prev,
            rubricator: prev.rubricator.filter((it, i) => i !== parseInt(index)),
          };
        });
    },
    setDefRef: () => setTextRef(null),
    move: (ind, dir) => {
      setItem((prev) => {
        const rubricator = [...prev.rubricator];

        // Сдвиг вверх (если элемент первый, он становится последним)
        if (dir === "up") {
          if (ind === 0) {
            rubricator.push(rubricator.shift()); // Переносим первый элемент в конец
          } else {
            // Сдвигаем элемент вверх
            const temp = rubricator[ind];
            rubricator[ind] = rubricator[ind - 1];
            rubricator[ind - 1] = temp;
          }
        }

        // Сдвиг вниз (если элемент последний, он становится первым)
        if (dir === "down") {
          if (ind === rubricator.length - 1) {
            rubricator.unshift(rubricator.pop()); // Переносим последний элемент в начало
          } else {
            // Сдвигаем элемент вниз
            const temp = rubricator[ind];
            rubricator[ind] = rubricator[ind + 1];
            rubricator[ind + 1] = temp;
          }
        }

        return {
          ...prev,
          rubricator,
        };
      });
    },
    isRubricInEdit: (rubIndex) => {
      // eslint-disable-next-line no-unused-vars
      let index;

      if (fieldId && fieldId.includes("-")) {
        [, index] = fieldId.split("-");
        return Number(index) === Number(rubIndex);
      } else {
        return false;
      }
    },
    getFieldValue: (fieldName = "") => {
      if (!item) return "";
      if (!fieldId && !fieldName) return "";
      const [field, index] = fieldName ? fieldName.split("-") : fieldId.split("-");

      const dr = { ...defaultRubricator };
      if (field in item) return item[field];

      if (item.rubricator.length > index && field in dr) return item.rubricator[index][field];
      else return "";
      // return field in item
      //   ? item[field]
      //   : item.rubricator.length < index
      //   ? ""
      //   : item.rubricator[index][field];

      // return field in defaultRubricator
      //   ? item.rubricator.length >= index
      //     ? ""
      //     : item.rubricator[index][field]
      //   : item[field];
    },
    setNewVal: (val, fieldName = "") => {
      const [field, index] = fieldName ? fieldName.split("-") : fieldId.split("-");
      if (field in defaultRubricator)
        setItem((prev) => {
          return {
            ...prev,
            rubricator: prev.rubricator.map((it, i) => (i === parseInt(index) ? { ...it, [field]: val } : it)),
          };
        });
      else setItem({ ...item, [field]: val });
    },
    setRCount: () => {
      const v = item.countR === 4 ? 2 : item.countR === 2 ? 3 : 4;
      setItem({ ...item, countR: v });
    },
    setVersion: () => {
      const v = item.version === 0 ? 1 : 0;
      setItem({ ...item, version: v });
    },
    createRub: (type = "") => {
      if (type && type !== "createRub") {
        let defr = defaultRubrics[type];
        let nr = defr[item.version];
        let sepEx = defr.config.separEx;
        setItem((prev) => {
          return {
            ...prev,
            rubricator: [
              ...prev.rubricator,
              {
                ...defaultRubricator,
                ...nr,
                exExample: sepEx,
                comment: `${defr.config.title}\n${defr.config.justif}`,
              },
            ],
          };
        });
      } else
        setItem((prev) => {
          return {
            ...prev,
            rubricator: [...prev.rubricator, { ...defaultRubricator, new: true }],
          };
        });
    },

    deleteRub: () => {
      if (window.confirm("Clear rubrics?"))
        setItem((prev) => {
          return {
            ...prev,
            rubricator: [],
          };
        });
    },
    clearJ: () => {
      if (window.confirm("Clear justifications and scores?"))
        setItem((prev) => {
          return {
            ...defaultRubJust,
            prompt: prev.prompt,
            id: prev.id,
            links: prev.links,
            rubricator: prev.rubricator.map((item) => ({
              ...defaultRubricator,
              rubric: item.rubric || "",
              example: item.example || "",
              comment: item.comment || "",
              exExample: item.exExample,
            })),
          };
        });
    },
    clearS: () => {
      if (window.confirm("Clear scores?"))
        setItem((prev) => {
          return {
            ...prev,
            rubricator: prev.rubricator.map((item) => ({
              ...defaultRubricator,
              rubric: item.rubric || "",
              comment: item.comment || "",
              example: item.example || "",
              exExample: item.exExample,
            })),
          };
        });
    },
    updateRub: (nv) => {
      if (window.confirm("update rubrics?"))
        setItem((prev) => {
          return {
            ...prev,
            rubricator: nv,
          };
        });
    },
    createRubPrompt: (selectedText, notAutoText = false) => {
      const rubrArr = selectedText
        .split("\n")
        .filter(Boolean)
        .map((el) => {
          let [comm, crit] = el.split("==");
          if (crit === "") crit = comm;
          const [r, ex] = crit.split("++");
          return {
            ...defaultRubricator,
            rubric: (notAutoText ? "" : "Ответ содержит ") + r,
            example: ex,
            comment: comm,
          };
        });

      setItem((prev) => {
        return {
          ...prev,
          rubricator: [...prev.rubricator, ...rubrArr],
        };
      });
    },
    createRubPromptScores: (selectedText) => {
      const scores = {
        "major_issues": 2,
        "minor_issues": 1,
        "N/A": -1,
        "no_issues": 0,
      };
      const getparts = (input) => {
        const parts = input.split("\t");

        if (parts.length < 5) {
          throw new Error("Недостаточно данных для разделения");
        }

        const len = parts.length;

        const mainText = parts.slice(0, len - 4).join("\t"); // всё до последних 4 полей
        const [rubric, example] = mainText.split(/например|Например|Например,|например,|Например:|например:/);
        // const [rubric, example] = mainText.split("Например");
        const score1 = scores[parts[len - 4].trim()];
        const score2 = scores[parts[len - 3].trim()];
        const score3 = scores[parts[len - 2].trim()];
        const score4 = scores[parts[len - 1].trim()];
        return { rubric, example, score1, score2, score3, score4 };
      };

      const rubrArr = selectedText
        .split("\n")
        .filter(Boolean)
        .map((el) => {
          const fr = getparts(el);
          return {
            ...defaultRubricator,
            ...fr,
          };
        });

      setItem((prev) => {
        return {
          ...prev,
          rubricator: [...prev.rubricator, ...rubrArr],
        };
      });
    },
    createRubPromptScoresTask: (rawText) => {
      const scores = {
        "major_issues": 2,
        "minor_issues": 1,
        "N/A": -1,
        "no_issues": 0,
      };

      const lines = rawText
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line !== "");

      // Пропускаем первые 5 строк: "Criteria", "Response 1", ..., "Response 4"
      const dataLines = lines.slice(5);

      const rubrArr = [];
      for (let i = 0; i < dataLines.length; i += 5) {
        const block = dataLines.slice(i, i + 5);
        if (block.length < 5) continue;

        const [criterionRaw, s1Raw, s2Raw, s3Raw, s4Raw] = block;

        const [rubricRaw, exampleRaw] = criterionRaw.split(
          /например:|например,|например|Например:|Например,|Например/i
        );

        const rubric = rubricRaw?.trim() || "";
        const example = exampleRaw?.trim() || "";

        const [score1, score2, score3, score4] = [s1Raw, s2Raw, s3Raw, s4Raw].map((val) => scores[val.trim()] ?? -1);
        const comment = "";
        rubrArr.push({
          ...defaultRubricator,
          rubric,
          comment,
          example,
          score1,
          score2,
          score3,
          score4,
        });
      }

      setItem((prev) => ({
        ...prev,
        rubricator: [...prev.rubricator, ...rubrArr],
      }));
    },
    onFocus: (ref) => {
      if (textRef && textRef.current) {
        const field = fieldId;
        const val = textRef.current.value || "";
        fieldFn.setNewVal(val, field);
      }

      setTextRef(ref);
    },
    onKeyDown: (e) => {
      defaultKey(e, fieldId, fieldFn.getFieldValue(fieldId), fieldFn.setNewVal, action);
    },
    notNew: (index) => {
      setItem((prev) => {
        return {
          ...prev,
          rubricator: prev.rubricator.map((it, i) =>
            i === parseInt(index)
              ? (() => {
                  const { new: _, ...rest } = it;
                  return rest;
                })()
              : it
          ),
        };
      });
    },
    summ: (i = null, ovr = false) => {
      if (i && typeof i.preventDefault === "function") {
        i.preventDefault();
        i = null;
      }
      const newV = summariseRub(item, i, ovr);
      setItem({ ...newV });
    },
    clearAll: () => {
      if (window.confirm("Clear task?")) saveToHistorygeneral({ en: JSON.stringify(item), ru: "RUB" }, setPopup);
      setItem({ ...defaultRubJust });
    },
    addLinkToRub: (linkObj) => {
      // linkObj { name: "...", link: "..." }
      if (linkObj && linkObj.name && linkObj.link) {
        setItem((prev) => {
          return {
            ...prev,
            links: [...prev.links, { ...linkObj }],
          };
        });
      }
    },
    delLink: (index) => {
      if (index >= 0 && index < item.links.length) {
        if (!window.confirm("Delete link # " + (index + 1))) return;
        setItem((prev) => {
          return {
            ...prev,
            links: prev.links.filter((it, i) => i !== parseInt(index)),
          };
        });
      }
    },
    updateLinks: (val, index) => {
      setItem((prev) => {
        return {
          ...prev,
          links: prev.links.map((it, i) => (i === parseInt(index) ? { ...it, ...val } : it)),
        };
      });
    },
  };
  return fieldFn;
};

export const getCriterisText = (criteria, version) =>
  `${criteria.rubric}  
${
  criteria.exExample === null || !criteria.example ? "" : rubExExample[Number(criteria.exExample)][version]
}             
${criteria.example}`;
