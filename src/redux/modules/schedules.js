import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

const initialState = {
  schedules: [],
  isLoding: false,
  error: null
};

export const __getSchedules = createAsyncThunk("getSchedules", async (payload, thunkAPI) => {
  try {
    const { data } = await api.get("/auth/trip");
    return thunkAPI.fulfillWithValue(data.data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response);
  }
});

export const __deleteSchedule = createAsyncThunk("deleteSchedule", async (payload, thunkAPI) => {
  try {
    const { data } = await api.delete(`/auth/trip/${payload}`);
    const serveData = [data, payload];
    return thunkAPI.fulfillWithValue(serveData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response);
  }
});

export const __editSchedule = createAsyncThunk("editSchedule", async (payload, thunkAPI) => {
  try {
    const { id, editData } = payload;
    const { data } = await api.put(`/auth/trip/${id}`, editData);
    return thunkAPI.fulfillWithValue(data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response);
  }
});

export const schedules = createSlice({
  name: "schedules",
  initialState,
  reducers: {},
  extraReducers: {
    [__getSchedules.pending]: (state, action) => {
      state.isLoding = true;
    },
    [__deleteSchedule.pending]: (state, action) => {
      state.isLoding = true;
    },
    [__getSchedules.fulfilled]: (state, action) => {
      state.isLoding = false;
      state.schedules = action.payload;
    },
    [__deleteSchedule.fulfilled]: (state, action) => {
      if (action.payload[0].code === "NULL") {
        state.schedules = state.schedules.filter(item => item.id !== action.payload[1]);
      } else {
        alert(action.payload[0].message);
      }
    },
    [__editSchedule.fulfilled]: (state, action) => {
      state.isLoding = false;
    },
    [__getSchedules.rejected]: (state, action) => {
      state.isLoding = false;
      state.error = action.payload;
    },
    [__deleteSchedule.rejected]: (state, action) => {
      state.isLoding = false;
      state.error = action.payload;
    },
    [__editSchedule.rejected]: (state, action) => {
      state.isLoding = false;
      state.error = action.payload;
    }
  }
});

export const {} = schedules.actions;
export default schedules.reducer;
