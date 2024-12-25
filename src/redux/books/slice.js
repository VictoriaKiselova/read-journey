import { createSlice } from "@reduxjs/toolkit";
import { fetchBooks } from "./operations";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    booksRecommend: [],
    isModal: false,
    loading: false,
    error: false,
  },
  reducers: {
    modalOpen: state => {
      state.isModal = true;
    },
    modalClose: state => {
      state.isModal = false;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchBooks.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.booksRecommend = action.payload.results;
        state.loading = false;
      })
      .addCase(fetchBooks.rejected, state => {
        state.error = true;
        state.loading = false;
      }),
});

export const { modalOpen, modalClose } = booksSlice.actions;
export default booksSlice.reducer;
