import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./redux/Pasteslice";

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});
