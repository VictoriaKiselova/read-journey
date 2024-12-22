import { createSlice } from "@reduxjs/toolkit";
import { fetchSignup } from "./operations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      email: null,
      name: null,
    },
    token: null,
    isLoggedIn: false,
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
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(fetchSignup.rejected, state => {
        state.error = true;
        state.loading = false;
      }),
});

export default authSlice.reducer;
