import React from "react";

function Months({ index }) {
  const months = {
    0: "Апр.",
    1: "Май",
    2: "Июнь",
    3: "Июль",
    4: "Авг.",
    5: "Сент.",
    6: "Окт.",
    7: "Нояб.",
    8: "Дек.",
    9: "Янв.",
    10: "Февр.",
    11: "Март",
  };

  return <div className="months">{months[index]}</div>;
}

export default Months;
