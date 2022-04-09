import React, { useEffect, useState } from "react";
import "./GameArea.css";
import Board from "./board";
import Home from "./Home";
import Result from "./Result";
import { Check } from "./check";

const initialState = [
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
];

const GameArea = () => {
  const [player, setPlayer] = useState("");
  const [grid, setGrid] = useState(initialState);
  const [totalFilled, setTotalFilled] = useState(0);
  const [winner, setWinner] = useState("playing");
  const [loading, setLoading] = useState(true);

  const Check = () => {
    if (winner === "playing") {
      for (let i = 0; i < 4; i++) {
        if (
          grid[i][0] !== "" &&
          grid[i][0] === grid[i][1] &&
          grid[i][1] === grid[i][2] &&
          grid[i][2] === grid[i][3]
        ) {
          setWinner(player === "X" ? "O" : "X");
          setLoading(false);
        }
      }

      for (let i = 0; i < 4; i++) {
        if (
          grid[0][i] !== "" &&
          grid[0][i] === grid[1][i] &&
          grid[1][i] === grid[2][i] &&
          grid[2][i] === grid[3][i]
        ) {
          setWinner(player === "X" ? "O" : "X");
          setLoading(false);
        }
      }

      if (
        grid[0][0] !== "" &&
        grid[0][0] === grid[1][1] &&
        grid[1][1] === grid[2][2] &&
        grid[2][2] === grid[3][3]
      ) {
        setWinner(player === "X" ? "O" : "X");
        setLoading(false);
      }
      if (
        grid[0][3] !== "" &&
        grid[1][2] === grid[0][3] &&
        grid[2][1] === grid[1][2] &&
        grid[3][0] === grid[2][1]
      ) {
        setWinner(player === "X" ? "O" : "X");
        setLoading(false);
      }
    }
  };

  const updateHandler = (r, c) => {
    if (grid[r][c] === "") {
      setGrid(() => {
        return grid.map((val, i) => {
          return val.map((e, j) => {
            if (r === i && c === j) {
              return player;
            } else {
              return e;
            }
          });
        });
      });
      setPlayer(player === "O" ? "X" : "O");
      setTotalFilled(totalFilled + 1);
    } else {
      alert("Already Filled Space Choose another");
    }
  };

  useEffect(() => {
    Check();
    if (totalFilled === 16 || winner !== "playing") {
      setLoading(false);
    }
  }, [winner, totalFilled]);

  return (
    <>
      {loading ? (
        player === "" ? (
          <Home player={player} setPlayer={setPlayer} />
        ) : (
          <Board player={player} grid={grid} updateHandler={updateHandler} />
        )
      ) : (
        <Result winner={winner} />
      )}
    </>
  );
};

export default GameArea;
