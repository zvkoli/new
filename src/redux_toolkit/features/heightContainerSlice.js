import { createSlice } from "@reduxjs/toolkit";

const initialState = 300;

const heightContainerSlice = createSlice({
  name: "heightContainer",
  initialState,
  reducers: {
    setHeightContainer: (state, action) => {
      return action.payload;
    },
  },
});

export const { setHeightContainer } = heightContainerSlice.actions;
export default heightContainerSlice.reducer;