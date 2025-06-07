import { createSlice } from "@reduxjs/toolkit";

const soundSlice = createSlice({
  name: "sound",
  initialState: {
    muted: false,
  },
  reducers: {
    toggleMute: (state) => {
      state.muted = !state.muted;
    },
  },
});

export const { toggleMute } = soundSlice.actions;
export default soundSlice.reducer;
