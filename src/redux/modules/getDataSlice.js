import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  data: null,
  error: null
};

const getDataThunk = createAsyncThunk("data", async (data, thunk) => {
  try {
    const { data } = await axios.get();
    return thunk.fulfillWithValue(data);
  } catch (error) {
    return thunk.rejectWithValue(error);
  }
});

const getDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDataThunk.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(getDataThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getDataThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const getDataReducer = getDataSlice.reducer;
export const getDataActions = getDataSlice.actions;
