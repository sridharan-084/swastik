import React from "react";
import "./Home.css";

const Result = ({ winner }) => {
  return (
    <div className="center">
      {winner !== "playing" ? (
        <h1 style={{ color: "black" }}> Game Over with Winner {winner} </h1>
      ) : (
        <h1 style={{ color: "black" }}> Game Over with Draw </h1>
      )}
    </div>
  );
};

export default Result;
