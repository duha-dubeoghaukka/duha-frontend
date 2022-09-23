import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../../api/api";

const initialState = {
  isLoading: false,
  data: null,
  error: null
};

export const getTouristSpots = createAsyncThunk("getTouristSpots", async (data, thunk) => {
  try {
    const { data } = await instance.get("/touristspot");
    return thunk.fulfillWithValue(data);
  } catch (error) {
    return thunk.rejectWithValue(error);
  }
});

export const getRestaurants = createAsyncThunk("getRestaurants", async (data, thunk) => {
  try {
    const { data } = await instance.get("/restaurant");
    return thunk.fulfillWithValue(data);
  } catch (error) {
    return thunk.rejectWithValue(error);
  }
});

export const getAccommodations = createAsyncThunk("getAccommodations", async (data, thunk) => {
  try {
    const { data } = await instance.get("/accommodation");
    return thunk.fulfillWithValue(data);
  } catch (error) {
    return thunk.rejectWithValue(error);
  }
});

const getDataSlice = createSlice({
  name: "getData",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTouristSpots.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(getTouristSpots.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getTouristSpots.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getRestaurants.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getRestaurants.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAccommodations.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.data = null;
      })
      .addCase(getAccommodations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAccommodations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const getDataReducer = getDataSlice.reducer;
