import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";

export const fetchRecommendBooks = createAsyncThunk(
  "books/recommend",
  async ({ title, author, page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/books/recommend", {
        params: {
          title: title,
          author: author,
          page: page,
          limit: limit,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);
