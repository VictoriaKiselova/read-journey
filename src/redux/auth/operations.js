import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://readjourney.b.goit.study/api";
const setAuthHeader = token => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common["Authorization"] = "";
};

export const fetchSignup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", data);
      setAuthHeader(response.data.token);
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

export const fetchSignin = createAsyncThunk(
  "auth/signin",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/users/signin", data);
      setAuthHeader(response.data.token);
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

export const fetchRefresh = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.token;
      setAuthHeader(savedToken);
      const response = await axios.get("/users/current");
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
  },
  {
    condition(_, thunkAPI) {
      const reduxState = thunkAPI.getState();
      const savedToken = reduxState.auth.token;
      return savedToken !== null;
    },
  }
);

export const fetchSignout = createAsyncThunk(
  "auth/signout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post("/users/signout");
      clearAuthHeader();
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
