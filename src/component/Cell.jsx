import React from "react";
import styles from "./cell.css";
import { OverlayTrigger, Tooltip, Button } from "react-bootstrap";

function Cell({ index, data, datas }) {
  const value = data[index];

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
                padding: "20px",
                background: "#000",
                borderRadius: "5px",
                color: "#fff",
              }}
            >
              {`${datas}, contrubutions`} <br />
              {index}
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
