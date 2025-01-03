import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSignup,
  fetchSignin,
  fetchRefresh,
  fetchSignout,
} from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: null,
    isAuthorized: false,
    isRefreshing: false,
    token: null,
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
        state.token = action.payload.token;
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
        state.token = action.payload.token;
        state.isAuthorized = true;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchSignin.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchRefresh.pending, state => {
        state.error = false;
        state.loading = true;
        state.isRefreshing = true;
      })
      .addCase(fetchRefresh.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.token = action.payload.token;
        state.isAuthorized = true;
        state.isRefreshing = false;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchRefresh.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.isRefreshing = false;
      })
      .addCase(fetchSignout.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchSignout.fulfilled, (state, action) => {
        state.name = null;
        state.token = null;
        state.isAuthorized = false;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchSignout.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),
});

export default authSlice.reducer;
