import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";

export const fetchRecommendBooks = createAsyncThunk(
  "books/recommend",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/books/recommend", {
        params: {
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
