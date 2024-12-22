import { createSlice } from "@reduxjs/toolkit";
import { fetchBooks } from "./operations";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    booksRecommend: [],
  },
  extraReducers: builder =>
    builder
      .addCase(fetchBooks.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.booksRecommend = action.payload.results;
        state.isLoggedIn = false;
      })
      .addCase(fetchBooks.rejected, state => {
        state.error = true;
        state.loading = false;
      }),
});

export default booksSlice.reducer;
