import { createSlice } from "@reduxjs/toolkit";

const initialState = "#ffffff";

const bgColorContainerSlice = createSlice({
  name: "bgColorContainer",
  initialState,
  reducers: {
    setBgColorContainer: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBgColorContainer } = bgColorContainerSlice.actions;
export default bgColorContainerSlice.reducer;
