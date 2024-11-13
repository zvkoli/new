import { createSlice } from "@reduxjs/toolkit";

const initialState = 300;

const widthContainerSlice = createSlice({
  name: "widthContainer",
  initialState,
  reducers: {
    setWidthContainer: (state, action) => {
      return action.payload;
    },
  },
});

export const { setWidthContainer } = widthContainerSlice.actions;
export default widthContainerSlice.reducer;