import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";
// axios.defaults.headers.common['Authorization'] =
//  AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const fetchBooks = createAsyncThunk(
  "books/recommendAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/books/recommend");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Щось пішло не так");
    }
  }
);
