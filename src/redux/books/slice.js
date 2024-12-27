import { createSlice } from "@reduxjs/toolkit";
import { fetchRecommendBooks } from "./operations";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    booksRecommend: [],
    isModal: false,
    currentPage: 1,
    limit: 2,
    totalPages: null,
  },

  reducers: {
    modalOpen: state => {
      state.isModal = true;
    },
    modalClose: state => {
      state.isModal = false;
    },
    setNextPage: state => {
      if (state.currentPage < state.totalPages) {
        state.currentPage += 1;
      }
    },
    setPrevPage: state => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchRecommendBooks.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchRecommendBooks.fulfilled, (state, action) => {
        state.booksRecommend = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(fetchRecommendBooks.rejected, state => {
        state.error = true;
        state.loading = false;
      }),
});

export const { modalOpen, modalClose, setNextPage, setPrevPage, setLimit } =
  booksSlice.actions;
export default booksSlice.reducer;
