import { useDispatch, useSelector } from "react-redux";
import {
  createBoard,
  getBoardSelector,
  getFutureDeletedata,
  getWinnerSelector,
  move,
} from "./slice/tictaetoe-slice";
import { useEffect } from "react";

const dataMap = {
  0: "",
  1: "X",
  "-1": "O",
};

const Board = ({ length = 3 }) => {
  const board = useSelector(getBoardSelector);
  const winner = useSelector(getWinnerSelector);
  const item = useSelector(getFutureDeletedata);
  const dispatch = useDispatch();

  const fI = item?.i;
  const fJ = item?.j;

  useEffect(() => {
    dispatch(createBoard({ length }));
  }, []);

  const onCellClick = (row, column) => {
    dispatch(move({ row, column }));
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {board.map((row, i) => (
        <div key={`row_${i}`} style={{ display: "flex" }}>
          {row.map((data, j) => (
            <div
              key={`${i}_column_${j}`}
              style={{
                padding: "12px",
                height: "35px",
                width: "35px",
                border: "1px solid black",
                textAlign: "center",
                fontSize: "20px",
                backgroundColor: `${
                  i === fI && j === fJ ? "rgba(255,0,0,0.3)" : "white"
                }`,
              }}
              onClick={() => {
                onCellClick(i, j);
              }}
            >
              {dataMap[data]}
            </div>
          ))}
        </div>
      ))}
      <br />
      <br />
      <br />
      {winner ? <h1>{winner}</h1> : null}
    </div>
  );
};

export default Board;
