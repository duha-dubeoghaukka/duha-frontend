import { configureStore } from "@reduxjs/toolkit";
import schedules from "../modules/schedules";

const store = configureStore({
  reducer: {
    schedules
  }
});

export default store;
