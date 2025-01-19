import { createSlice } from "@reduxjs/toolkit";
import {
  fetchGetBooksOwn,
  fetchAddBooks,
  fetchAddBooksByIdFromRecommend,
  fetchDeleteBookById,
} from "./operations";

const libraryFilters = createSlice({
  name: "filters",
  initialState: {
    ownBooks: [],
    isSuccessAddToLibrary: false,
    loading: false,
    error: false,
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
        state.error = false;
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
        state.ownBooks.push(action.payload);
        state.isSuccessAddToLibrary = true;
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchAddBooksByIdFromRecommend.rejected, (state, action) => {
        state.error = action.payload || "Failed to add recommended book";
        state.loading = false;
      })
      .addCase(fetchDeleteBookById.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchDeleteBookById.fulfilled, (state, action) => {
        state.ownBooks = state.ownBooks.filter(
          item => item._id !== action.payload
        );
        state.error = false;
        state.loading = false;
      })
      .addCase(fetchDeleteBookById.rejected, state => {
        state.error = true;
        state.loading = false;
      }),
});

export const { setIsSuccessAddToLibrary } = libraryFilters.actions;
export default libraryFilters.reducer;
