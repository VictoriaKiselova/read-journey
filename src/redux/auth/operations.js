import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";
const setAuthToken = token => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const fetchSignup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/signup", data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setAuthToken(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchSignin = createAsyncThunk(
  "auth/signin",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/users/signin", data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setAuthToken(token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
