import { configureStore } from "@reduxjs/toolkit";
import widthContainerReducer from "./features/widthContainerSlice";
import heightContainerReducer from "./features/heightContainerSlice";
import bgColorContainerReducer from "./features/bgColorContainerSlice";
import bgImageContainerReducer from "./features/bgImageContainerSlice";
import itemsReducer from "./features/itemsSlice";
import editEnabledReducer from "./features/editEnabledSlice";
import dragDisabledReducer from "./features/dragDisabledSlice";

const store = configureStore({
  reducer: {
    widthContainer: widthContainerReducer,
    heightContainer: heightContainerReducer,
    bgColorContainer: bgColorContainerReducer,
    bgImageContainer: bgImageContainerReducer,
    items: itemsReducer,
    editEnabled: editEnabledReducer,
    dragDisabled: dragDisabledReducer,
  },
});

export default store;
