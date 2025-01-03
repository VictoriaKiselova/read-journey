import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";

export const fetchAddBooks = createAsyncThunk(
  "books/addBooks",
  async ({ title, author, totalPages }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/books/add", {
        title,
        author,
        totalPages,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchAddBooksByIdFromRecommend = createAsyncThunk(
  "books/add",
  async (bookId, thunkAPI) => {
    try {
      const response = await axios.post(`/books/add/${bookId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error has occurred"
      );
    }
  }
);

export const fetchGetBooksOwn = createAsyncThunk(
  "books/getBooksOwn",
  async (filter = "allBooks", thunkAPI) => {
    try {
      const response =
        filter === "allBooks"
          ? await axios.get("/books/own")
          : await axios.get("/books/own", { params: { status: filter } });
      return response.data;
    } catch (error) {
      console.error("Error when receiving books:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error has occurred"
      );
    }
  }
);
