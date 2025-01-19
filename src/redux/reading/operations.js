import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";

export const fetchReadingStart = createAsyncThunk(
  "books/readingStart",
  async ({ id, page }, thunkAPI) => {
    try {
      const response = await axios.post("/books/reading/start", {
        id,
        page,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue({
          status: error.response.status,
          message: error.response.data.message,
        });
      } else {
        return thunkAPI.rejectWithValue({
          status: 500,
          message: "Network error",
        });
      }
    }
  }
);

export const fetchReadingFinish = createAsyncThunk(
  "books/readingFinish",
  async ({ id, page }, thunkAPI) => {
    try {
      const response = await axios.post("/books/reading/finish", {
        id,
        page,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue({
          status: error.response.status,
          message: error.response.data.message,
        });
      } else {
        return thunkAPI.rejectWithValue({
          status: 500,
          message: "Network error",
        });
      }
    }
  }
);

export const fetchReadingInfo = createAsyncThunk(
  "books/readingInfo",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue({
          status: error.response.status,
          message:
            error.response.data.message ||
            "Something went wrong. Please try again later.",
        });
      } else if (error.request) {
        return thunkAPI.rejectWithValue({
          status: 500,
          message:
            "No response from the server. Please check your network connection.",
        });
      } else {
        return thunkAPI.rejectWithValue({
          status: 500,
          message: "Network error. Please try again later.",
        });
      }
    }
  }
);

export const fetchReadingDelete = createAsyncThunk(
  "books/readingDelete",
  async ({ bookId, readingId }, thunkAPI) => {
    try {
      const response = await axios.delete("/books/reading", {
        params: { bookId, readingId },
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue({
          status: error.response.status,
          message: error.response.data.message,
        });
      } else {
        return thunkAPI.rejectWithValue({
          status: 500,
          message: "Network error",
        });
      }
    }
  }
);
