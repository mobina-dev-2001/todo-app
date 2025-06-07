import { configureStore } from "@reduxjs/toolkit";
import soundReducer from "../features/soundSlice";
import themeReducer from "../features/themeSlice";
import todoReducer from "../features/todoSlice";
import { loadState, saveState } from "../utils/localStorage";

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    sound: soundReducer,
    theme: themeReducer,
    todo: todoReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
