import { createSlice } from "@reduxjs/toolkit";
import {
  fetchReadingStart,
  fetchReadingFinish,
  fetchReadingInfo,
  fetchReadingDelete,
} from "./operations";

const readingSlice = createSlice({
  name: "reading",
  initialState: {
    readingBook: null,
    bookProgress: null,
    readingCompleted: false,
    loading: false,
    error: false,
  },
  reducers: {
    setReadingBook: (state, action) => {
      state.readingBook = action.payload;
    },
    resetBookProgress: state => {
      state.bookProgress = null;
    },
    setReadingCompleted: (state, action) => {
      state.readingCompleted = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchReadingStart.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchReadingStart.fulfilled, (state, action) => {
        state.bookProgress = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchReadingStart.rejected, (state, action) => {
        state.error = action.payload?.status || action.error.message;
        state.loading = false;
      })
      .addCase(fetchReadingFinish.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchReadingFinish.fulfilled, (state, action) => {
        state.bookProgress = action.payload;
        state.readingCompleted = true;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchReadingFinish.rejected, (state, action) => {
        state.error = action.payload?.status || action.error.message;
        state.loading = false;
      })
      .addCase(fetchReadingInfo.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchReadingInfo.fulfilled, (state, action) => {
        state.bookProgress = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchReadingInfo.rejected, (state, action) => {
        state.error = action.payload?.status || action.error.message;
        state.loading = false;
      })
      .addCase(fetchReadingDelete.pending, state => {
        state.error = false;
        state.loading = true;
      })
      .addCase(fetchReadingDelete.fulfilled, (state, action) => {
        state.bookProgress = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchReadingDelete.rejected, (state, action) => {
        state.error = action.payload?.status || action.error.message;
        state.loading = false;
      }),
});

export const { setReadingBook, resetBookProgress, setReadingCompleted } =
  readingSlice.actions;
export default readingSlice.reducer;
