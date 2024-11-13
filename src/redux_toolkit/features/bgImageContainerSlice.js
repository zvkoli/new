import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const bgImageContainerSlice = createSlice({
  name: "bgImageContainer",
  initialState,
  reducers: {
    setBgImageContainer: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBgImageContainer } = bgImageContainerSlice.actions;
export default bgImageContainerSlice.reducer;
