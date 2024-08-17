import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: [],
  currentPlayer: 1,
  check: {
    row: [],
    column: [],
    diagonal: 0,
    revDiagonal: 0,
  },
  winner: 0,
  lastMoves: [],
};

export const TicTaeToeSlice = createSlice({
  name: "tictaetoe",
  initialState,
  reducers: {
    createBoard(state, { payload: { length } }) {
      console.log({ length });
      state.board = new Array(length).fill(new Array(length).fill(0));
      const arr = new Array(length).fill(0);
      state.check.row = [...arr];
      state.check.column = [...arr];
    },
    move(state, { payload: { row: i, column: j } }) {
      TicTaeToeSlice.caseReducers.removeMove(state);
      state.lastMoves.push({ i, j });
      state.board[i][j] = state.currentPlayer;
      state.check.row[i] += state.currentPlayer;
      state.check.column[j] += state.currentPlayer;
      if (i == j) state.check.diagonal += state.currentPlayer;
      if (i + j == state.board.length - 1)
        state.check.revDiagonal += state.currentPlayer;
      TicTaeToeSlice.caseReducers.checkWinner(state, { row: i, column: j });
      state.currentPlayer *= -1;
    },
    removeMove(state) {
      if (state.lastMoves.length >= state.board.length * 2) {
        const { i, j } = state.lastMoves.shift();
        state.board[i][j] = 0;
        state.check.row[i] -= state.currentPlayer;
        state.check.column[j] -= state.currentPlayer;
        if (i == j) state.check.diagonal -= state.currentPlayer;
        if (i + j == state.board.length - 1)
          state.check.revDiagonal -= state.currentPlayer;
      }
    },
    checkWinner(state, { row: i, column: j }) {
      if (
        Math.abs(state.check.row[i]) == state.board.length ||
        Math.abs(state.check.column[j]) == state.board.length ||
        Math.abs(state.check.diagonal) == state.board.length ||
        Math.abs(state.check.revDiagonal) == state.board.length
      ) {
        state.winner = state.currentPlayer;
      }
    },
  },
});

export const { createBoard, move } = TicTaeToeSlice.actions;

export const getBoardSelector = (state) => state.tictaetoe.board;

export const getFutureDeletedata = (state) => {
  if (state.tictaetoe.lastMoves.length >= state.tictaetoe.board.length * 2) {
    return state.tictaetoe.lastMoves[0];
  } else {
    return {};
  }
};

export const getWinnerSelector = (state) => state.tictaetoe.winner;
