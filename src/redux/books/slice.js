import { createSlice } from "@reduxjs/toolkit";
import { fetchRecommendBooks, fetchAllBooks } from "./operations";
import { fetchSignout } from "../auth/operations";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    recommend: {
      booksRecommend: [],
      allBooks: [],
      totalPages: null,
    },
    isModal: false,
    mobMenu: false,
    filteredBooks: [],
    limit: 2,
    page: 1,
    selectedBook: null,
    loading: false,
    error: false,
  },

  reducers: {
    modalOpen: (state, action) => {
      state.isModal = true;
      state.selectedBook = action.payload;
    },
    modalClose: (state, action) => {
      state.selectedBook = null;
      state.isModal = false;
    },
    setNextPage: state => {
      state.page += 1;
    },
    setPrevPage: state => {
      state.page -= 1;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
      state.page = 1;
    },
    setFilteredBooks: (state, action) => {
      state.filteredBooks = action.payload;
    },
    openMobMenu: state => {
      state.mobMenu = true;
    },
    closeMobMenu: state => {
      state.mobMenu = false;
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
        state.filteredBooks = [];
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchRecommendBooks.rejected, state => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchSignout.fulfilled, (state, action) => {
        state.filteredBooks = [];
        state.loading = false;
        state.error = false;
        state.mobMenu = false;
      })
      .addCase(fetchAllBooks.pending, state => {
        state.filteredBooks = [];
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.allBooks = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchAllBooks.rejected, state => {
        state.error = true;
        state.loading = false;
      }),
});

export const {
  setFilteredBooks,
  modalOpen,
  modalClose,
  setNextPage,
  setPrevPage,
  setLimit,
  openMobMenu,
  closeMobMenu,
} = booksSlice.actions;
export default booksSlice.reducer;
