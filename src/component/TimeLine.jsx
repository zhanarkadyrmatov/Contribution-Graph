import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import WeekDays from "./WeekDays";
import Months from "./Months";
import axios from "axios";
import { format, eachDayOfInterval } from "date-fns";

function TimeLine() {
  const [datas, setDatas] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("https://dpg.gg/test/calendar.json");
    setDatas(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const startDate = new Date("2022-04-01");
  const endDate = new Date("2023-03-31");

  const dateDataMap = {};
  const dateArray = eachDayOfInterval({ start: startDate, end: endDate });
  dateArray.forEach((date) => {
    const dateString = format(date, "yyyy-MM-dd");
    dateDataMap[dateString] = datas[dateString] || 0;
  });
  console.log(dateDataMap);

  const weekDays = Array.from(new Array(7));
  const months = Array.from(new Array(12));
  return (
    <div className="container">
      <div className="timeline">
        <div className="timeline_months">
          {months.map((_, index) => (
            <Months key={index} index={index} />
          ))}
        </div>
        <div className="timeline_body">
          <div className="timeline_weekDay">
            {weekDays.map((_, index) => (
              <WeekDays key={index} index={index} />
            ))}
          </div>
          <div className="timeline_cells">
            {Object.keys(dateDataMap).map((index) => (
              <Cell
                key={index}
                index={index}
                data={dateDataMap}
                datas={dateDataMap[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeLine;
