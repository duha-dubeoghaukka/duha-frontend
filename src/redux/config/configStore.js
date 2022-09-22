import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { getDataReducer } from "../modules/getDataSlice";

const store = configureStore({
  reducer: {
    getDataReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;
