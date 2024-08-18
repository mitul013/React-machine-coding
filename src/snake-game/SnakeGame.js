import { useEffect, useRef, useState } from "react";

function createBoard(rowSize, columnSize = rowSize) {
  let res = new Array(rowSize).fill(new Array(columnSize).fill(""));
  return res;
}

const SnakeGame = ({ rowSize = 20, columnSize = rowSize }) => {
  const [board, setBoard] = useState(createBoard(rowSize));
  const [snakeSet, setSnakeSet] = useState(new Set([32, 33, 34]));
  const directionRef = useRef({ x: 0, y: 1 });
  const gameOverRef = useRef(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const foodRef = useRef(null);

  const timeRef = useRef(null);

  const isSnakeActive = (i, j) => {
    let cellNumber = i * rowSize + j;
    return snakeSet.has(cellNumber);
  };

  const isFoodActive = (i, j) => {
    let cellNumber = i * rowSize + j;
    return foodRef.current == cellNumber;
  };

  const generateFood = () => {
    const randomFoodNumber = Math.floor(rowSize * columnSize * Math.random());
    foodRef.current = randomFoodNumber;
  };

  const keyDown = (e) => {
    let { x, y } = directionRef.current;
    if (e.key === "ArrowDown" && x != -1 && y != 0) {
      directionRef.current = { x: 1, y: 0 };
    } else if (e.key === "ArrowUp" && x != 1 && y != 0) {
      directionRef.current = { x: -1, y: 0 };
    } else if (e.key === "ArrowRight" && x != 0 && y != -1) {
      directionRef.current = { x: 0, y: 1 };
    } else if (e.key === "ArrowLeft" && x != 0 && y != 1) {
      directionRef.current = { x: 0, y: -1 };
    }
  };

  const addEvevnts = () => {
    window.addEventListener("keydown", keyDown);
  };

  const removeEvents = () => {
    window.removeEventListener("keydown", keyDown);
  };

  useEffect(() => {
    if (!gameOverRef.current) {
      addEvevnts();
      generateFood();
      timeRef.current = setInterval(() => {
        if (gameOverRef.current) {
          setIsGameOver(true);
          return;
        }
        setSnakeSet((prevState) => {
          const head = [...prevState].pop();
          const tail = prevState.values().next().value;
          let hx = Math.floor(head / rowSize);
          let hy = head % rowSize;
          let { x, y } = directionRef.current;
          let nhx = hx + x;
          let nhy = hy + y;
          let newHeadCell = nhx * rowSize + nhy;
          console.log({ head, tail, prevState });
          if (
            nhx < 0 ||
            nhy < 0 ||
            nhx >= columnSize ||
            nhy >= rowSize ||
            prevState.has(newHeadCell)
          ) {
            console.log(x, y, hx, hy, nhx, nhy, newHeadCell);
            gameOverRef.current = true;
            return new Set([32, 33, 34]);
          }

          let updatedState = new Set(prevState);

          if (head == foodRef.current) {
            generateFood();
          } else {
            updatedState.delete(tail);
          }

          updatedState.add(newHeadCell);
          return updatedState;
        });
      }, 200);
    }
    return () => {
      console.log("asdasdasd");
      removeEvents();
      if (timeRef.current) {
        console.log("timerref --> ", timeRef.current);
        clearInterval(timeRef.current);
        timeRef.current = null;
      }
    };
  }, [isGameOver]);

  return (
    <div
      style={{
        border: "3px solid black",
        width: "500px",
        height: "500px",
        display: "grid",
        gridTemplateRows: "repeat(20,1fr)",
      }}
    >
      {board.map((row, i) => (
        <div
          key={`row_${i}`}
          style={{ display: "grid", gridTemplateColumns: "repeat(20,1fr)" }}
        >
          {row.map((data, j) => (
            <div
              key={`${data}_${i}_${j}`}
              data-key={`${i * rowSize + j}_${i}_${j}`}
              style={{
                textAlign: "center",
                fontSize: "20px",
                backgroundColor: `${
                  isSnakeActive(i, j)
                    ? "red"
                    : isFoodActive(i, j)
                    ? "lightGreen"
                    : "white"
                }`,
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SnakeGame;
