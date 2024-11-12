import React from "react";
import {
  replacementsEnding,
  replacementsGeneral,
} from "../../constants/replacements";
import { Button } from "react-bootstrap";

const Hint = () => {
  return (
    <div className="btnToHis divBtn  hintBtn">
      ?
      <div className="hint">
        {replacementsEnding.map((item, i) => (
          <div key={i}>
            {item[1]} <span>{item[0].join("/")}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hint;

// const Hint = () => {
//   return (
//     <Button className="btnToHis  hintBtn">
//       ?
//       <div className="hint">
//         {replacementsGeneral
//           .filter((el) => el.show)
//           .map((item, i) => (
//             <div key={i}>
//               {item.newT} :<span>{item.oldT.join("/")}</span>
//             </div>
//           ))}
//       </div>
//     </Button>
//   );
// };
