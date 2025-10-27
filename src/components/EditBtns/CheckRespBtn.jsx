import { Button } from "react-bootstrap";
import React from "react";
import { HiRefresh } from "react-icons/hi";

const CheckRespBtn = ({ item, fieldRate }) => {
  const chekF = (isRef) => {
    let result = "";
    if (isRef) {
      result = `Проверь верна ли соответсвует ли информация в новом тексте  источнику. игнорируй языковые ошибки. Нужен только спискок грубых ошибок искажающих информацию источника.   
      ИСТОЧНИК: "${item.Prompt}"
      НОВЫЙ ТЕКСТ: "${item[fieldRate]}"`;
    } else
      result =
        result = `"Проверь верна ли фактическая информация в тексте. игнорируй языковые ошибки. Нужен только спискок грубых фактических ошибок
       Текст: "${item[fieldRate]}"`;
    if (result) {
      navigator.clipboard.writeText(result).catch((err) => {
        console.error("Ошибка копирования:", err);
      });
    }
  };

  return (
    <div className="format-btns ">
      <Button className=" m-0">
        <HiRefresh />
        Check
      </Button>
      <div className="sub-btns">
        <button className=" hotBtnGr intense" onClick={() => chekF()}>
          facts
        </button>
        <button className=" hotBtnGr intense" onClick={() => chekF(true)}>
          facts in ref
        </button>
        {/* <button
          className=" hotBtnGr intense"
          onClick={() =>
            navigator.clipboard.writeText("Правильно ли так сказать? ").catch((err) => {
              console.error("Ошибка копирования:", err);
            })
          }>
          check just
        </button> */}
      </div>
    </div>
  );
};

export default CheckRespBtn;
