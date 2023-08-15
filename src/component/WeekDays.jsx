import React from "react";

function WeekDays({ index }) {
  const dayNames = {
    0: "Пн",
    1: null,
    2: "Ср",
    3: null,
    4: "Пт",
    5: null,
    6: null,
  };

  return <div className="weekDays">{dayNames[index]}</div>;
}

export default WeekDays;
