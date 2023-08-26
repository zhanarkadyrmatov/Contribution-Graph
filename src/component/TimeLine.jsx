import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import WeekDays from "./WeekDays";
import Months from "./Months";
import axios from "axios";
import { format, eachDayOfInterval } from "date-fns";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";

const Items = [
  {
    id: 0,
    nomer: "0",
    cod: 0,
  },
  {
    id: 1,
    nomer: "1-9",
    cod: 8,
  },
  {
    id: 2,
    nomer: "10-19",
    cod: 18,
  },
  {
    id: 3,
    nomer: "20-29",
    cod: 28,
  },
  {
    id: 4,
    nomer: "30+",
    cod: 38,
  },
];

function TimeLine() {
  const [datas, setDatas] = useState([]);
  // const [months, setMonths] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("https://dpg.gg/test/calendar.json");
    setDatas(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const keys = Object.keys(datas)[0];
  const startDate = new Date("2022-05-31");
  const endDate = new Date("2023-05-18");

  const dateDataMap = {};
  const dateArray = eachDayOfInterval({ start: startDate, end: endDate });
  dateArray.forEach((date) => {
    const dateString = format(date, "yyyy-MM-dd");
    dateDataMap[dateString] = datas[dateString] || 0;
  });

  const weekDays = Array.from(new Array(7));

  const groupedDates = {};
  dateArray.forEach((date) => {
    const month = format(date, "MMM");
    if (!groupedDates[month]) {
      groupedDates[month] = [];
    }
    const dateString = format(date, "yyyy-MM-dd");
    groupedDates[month].push(dateString);
  });
  return (
    <div className="container">
      <div className="timeline">
        <div className="timeline_months">
          {Object.keys(groupedDates).map((month, index) => {
            return <Months key={index} month={month} />;
          })}
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
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <p
            style={{
              marginRight: "10px",
            }}
          >
            Меньше
          </p>
          {Items.map((id) => {
            return (
              <div key={id.id}>
                <div
                  style={{
                    background:
                      id.cod >= 1 && id.cod <= 9
                        ? "#ACD5F2"
                        : id.cod >= 10 && id.cod <= 19
                        ? "#7FA8C9"
                        : id.cod >= 20 && id.cod <= 29
                        ? "#527BA0"
                        : id.cod >= 30
                        ? "#254E77"
                        : "#EDEDED",
                  }}
                  className="cell"
                >
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-top`}>
                        <div
                          style={{
                            padding: "5px 10px",
                            background: "#000",
                            borderRadius: "5px",
                            color: "#fff",
                            textAlign: "center",
                          }}
                        >
                          <span
                            style={{
                              color: "#FFF",
                              fontFamily: "Inter",
                              fontSize: "12px",
                              fontWeight: "400",
                            }}
                          >
                            {`${id.nomer} contributions`}
                          </span>
                          <br />
                        </div>
                      </Tooltip>
                    }
                  >
                    <Button
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        background: "none",
                      }}
                      variant="secondary"
                    ></Button>
                  </OverlayTrigger>
                </div>
              </div>
            );
          })}
          <p
            style={{
              marginLeft: "10px",
            }}
          >
            Больше
          </p>
        </div>
      </div>
    </div>
  );
}

export default TimeLine;
