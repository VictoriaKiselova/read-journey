import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";

export const fetchAllBooks = createAsyncThunk(
  "books/fetchAllBooks",
  async (_, thunkAPI) => {
    try {
      const firstResponse = await axios.get("/books/recommend", {
        params: { page: 1, limit: 10 },
      });

      const { results, totalPages } = firstResponse.data;
      if (totalPages === 1) return results;

      const requests = [];
      for (let i = 2; i <= totalPages; i++) {
        requests.push(
          axios.get("/books/recommend", {
            params: { page: i, limit: 10 },
          })
        );
      }

      const responses = await Promise.all(requests);
      const allResults = responses.reduce(
        (acc, response) => [...acc, ...response.data.results],
        results
      );
      return allResults;
    } catch (error) {
      console.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchRecommendBooks = createAsyncThunk(
  "books/recommend",
  async ({ title, author, page, limit }, thunkAPI) => {
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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
