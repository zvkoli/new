import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const editEnabledSlice = createSlice({
  name: "editEnabled",
  initialState,
  reducers: {
    setEditEnabled: (state, action) => {
      return action.payload;
    },
  },
});

export const { setEditEnabled } = editEnabledSlice.actions;
export default editEnabledSlice.reducer;

