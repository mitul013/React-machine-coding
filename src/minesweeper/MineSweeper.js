import React, { useState } from "react";

// first we need to generate board
// we need to put mines
// we need to calculate numbers

function createBoard(row, column) {
  let arr = new Array(row).fill(
    new Array(column).fill({ isOpen: false, number: 0 })
  );
  return JSON.parse(JSON.stringify(arr));
}

function putRandomMines(arr, noOfMines, row, column) {
  for (let i = 0; i < noOfMines; i++) {
    let randomI = Math.floor(Math.random() * row);
    let randomJ = Math.floor(Math.random() * column);
    arr[randomI][randomJ]["number"] = -1;
  }
}

const directions = [
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

function helper(arr, i1, j1, row, column) {
  for (let i = 0; i < directions.length; i++) {
    const { x, y } = directions[i];
    let newI = i1 + x;
    let newJ = j1 + y;
    if (
      newI >= 0 &&
      newI < row &&
      newJ >= 0 &&
      newJ < column &&
      arr[newI][newJ]["number"] != -1
    ) {
      arr[newI][newJ]["number"] += 1;
    }
  }
}

function calCulateAdjacentMineNumber(arr, row, column) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      const element = arr[i][j];
      if (element.number == -1) {
        helper(arr, i, j, row, column);
      }
    }
  }
}

function initialzeBoard(row = 5, column = 5, noOfMines = 3) {
  const board = createBoard(row, column);
  putRandomMines(board, noOfMines, row, column);
  calCulateAdjacentMineNumber(board, row, column);
  console.log({ board });
  return board;
}

/**
 * data : [
 *  [{isMine:true/false,isOpened:true/false},{}],
 *  [{},{}],
 *  [{},{}],
 * ]
 */

const MineSweeper = ({ row = 5, column = 5, noOfMines = 3 }) => {
  const [board, setBoard] = useState(initialzeBoard(row, column, noOfMines));
  const [closedCount, setClosedCount] = useState(row * column);
  const [status, setStatus] = useState(null);
  if (closedCount <= noOfMines && status == null) setStatus("WINNER");

  const helperToOpenBox = (i, j, board, row, column, closedCountObj) => {
    if (i < 0 || j < 0 || i >= row || j >= column || board[i][j]["isOpen"])
      return;
    if (board[i][j]["number"] != -1) {
      board[i][j]["isOpen"] = true;
      closedCountObj.count -= 1;
    }
    if (board[i][j]["number"] == 0) {
      for (let z = 0; z < directions.length; z++) {
        const { x, y } = directions[z];
        let newI = i + x;
        let newJ = j + y;
        helperToOpenBox(newI, newJ, board, row, column, closedCountObj);
      }
    }
  };

  const onCellClick = (i, j) => {
    console.log("clicked on", i, j);
    if (board[i][j]["number"] == -1) {
      setStatus("LOST");
      return;
    }
    let closedCountObj = { count: closedCount };
    let copyBoard = JSON.parse(JSON.stringify(board));
    helperToOpenBox(i, j, copyBoard, row, column, closedCountObj);
    setClosedCount(closedCountObj.count);
    setBoard(copyBoard);
  };

  return (
    <div>
      {status ? status : null}
      {board.map((row, i) => {
        return (
          <div key={`row_${i}`} style={{ display: "flex" }}>
            {row.map((item, j) => (
              <div
                key={`row_${i}_column_${j}`}
                data-key={`row_${i}_column_${j}`}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid black",
                  textAlign: "center",
                  padding: "5px",
                  background: `${item?.isOpen ? "white" : "grey"}`,
                }}
                onClick={() => {
                  onCellClick(i, j);
                }}
              >
                {item?.isOpen ? item?.number : ""}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default MineSweeper;
