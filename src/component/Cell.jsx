import React from "react";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { format } from "date-fns";

function Cell({ index, data, datas }) {
  const value = data[index];

  const dateFormatted = format(new Date(index), "EEEE MMMM d, yyyy");

  const getBackgroundColor = () => {
    if (value >= 1 && value <= 9) {
      return "#ACD5F2";
    } else if (value >= 10 && value <= 19) {
      return "#7FA8C9";
    } else if (value >= 20 && value <= 29) {
      return "#527BA0";
    } else if (value >= 30) {
      return "#254E77";
    } else {
      return "#EDEDED";
    }
  };

  return (
    <div
      style={{
        background: getBackgroundColor(),
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
                {`${datas} contributions`}
              </span>
              <br />
              <span
                style={{
                  color: "#7C7C7C",
                  fontFamily: "Inter",
                  fontSize: "10px",
                  fontweight: "400",
                }}
              >
                {dateFormatted}
              </span>
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
  );
}

export default Cell;
