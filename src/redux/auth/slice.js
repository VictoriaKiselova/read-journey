import { createSlice } from "@reduxjs/toolkit";
import { fetchSignup, fetchSignin } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: null,
    isAuthorized: false,
    isRefreshing: false,
    loading: false,
    error: false,
  },
  extraReducers: builder =>
    builder
      .addCase(fetchSignup.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchSignup.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.isAuthorized = true;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchSignup.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchSignin.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchSignin.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.isAuthorized = true;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchSignin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),
});

export default authSlice.reducer;
