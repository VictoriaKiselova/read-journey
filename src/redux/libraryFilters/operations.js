import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";

export const fetchAddBooks = createAsyncThunk(
  "books/addBooks",
  async ({ title, author, totalPages }, thunkAPI) => {
    try {
      const response = await axios.post("/books/add", {
        title,
        author,
        totalPages,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
      console.error(error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error has occurred"
      );
    }
  }
);

export const fetchDeleteBookById = createAsyncThunk(
  "books/delete",
  async (bookId, thunkAPI) => {
    try {
      const response = await axios.delete(`/books/remove/${bookId}`);
      console.log(response.data);
      return response.data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "An error has occurred"
      );
    }
  }
);
