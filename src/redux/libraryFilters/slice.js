import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetBooksOwn,
  fetchAddBooks,
  fetchAddBooksByIdFromRecommend,
} from "./operations";

const libraryFilters = createSlice({
  name: "filters",
  initialState: {
    ownBooks: [],
    isSuccessAddToLibrary: false,
  },
  reducers: {
    setIsSuccessAddToLibrary: (state, action) => {
      state.isSuccessAddToLibrary = action.payload;
    },
  },

  extraReducers: builder =>
    builder
      .addCase(fetchGetBooksOwn.pending, state => {
        state.error = false;
        state.loading = true;
        state.ownBooks = [];
      })
      .addCase(fetchGetBooksOwn.fulfilled, (state, action) => {
        state.ownBooks = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchGetBooksOwn.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.ownBooks = [];
      })
      .addCase(fetchAddBooks.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchAddBooks.fulfilled, (state, action) => {
        state.ownBooks = [...state.ownBooks, action.payload];
        state.loading = false;
        // state.isModal = true;
      })
      .addCase(fetchAddBooks.rejected, state => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchAddBooksByIdFromRecommend.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchAddBooksByIdFromRecommend.fulfilled, (state, action) => {
        state.ownBooks = [...state.ownBooks, action.payload];
        state.isSuccessAddToLibrary = true;
      })
      .addCase(fetchAddBooksByIdFromRecommend.rejected, state => {
        state.error = true;
        state.loading = false;
      }),
});

export const { setIsSuccessAddToLibrary } = libraryFilters.actions;
export default libraryFilters.reducer;
