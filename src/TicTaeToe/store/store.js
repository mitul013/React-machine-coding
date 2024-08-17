import { configureStore } from "@reduxjs/toolkit";
import { TicTaeToeSlice } from "../slice/tictaetoe-slice";

export const store = configureStore({
  reducer: {
    tictaetoe: TicTaeToeSlice.reducer,
  },
});
