import { createSlice } from "@reduxjs/toolkit";
import { fetchRecommendBooks } from "./operations";
import { fetchSignout } from "../auth/operations";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    recommend: {
      booksRecommend: [],
      totalPages: null,
    },
    isModal: false,
    currentPage: 1,
    limit: 2,
    selectedBook: null,
  },

  reducers: {
    modalOpen: (state, action) => {
      state.isModal = true;
      state.selectedBook = action.payload;
    },
    modalClose: (state, action) => {
      state.selectedBook = action.payload;
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
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchRecommendBooks.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchRecommendBooks.fulfilled, (state, action) => {
        state.recommend.booksRecommend = action.payload.results;
        state.recommend.totalPages = action.payload.totalPages;
        state.loading = false;
      })
      .addCase(fetchRecommendBooks.rejected, state => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchSignout.fulfilled, (state, action) => {
        state.recommend.booksRecommend = [];
        state.loading = false;
      }),
});

export const { modalOpen, modalClose, setNextPage, setPrevPage, setLimit } =
  booksSlice.actions;
export default booksSlice.reducer;
