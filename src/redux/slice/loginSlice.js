import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utills/api";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/login`,
        userData
      );
      return response.data;
    } catch (error) {
      if (error.message === "Network Error") {
        return rejectWithValue("Unable to connect to the server. Please check your network.");
      }
      return rejectWithValue(error?.response?.data || "Login failed");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: null,
    loading: false,
    error: null,
    user: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      AsyncStorage.setItem('token', action.payload)
    },
    clearError:(state) => {
         state.error = null
    },
    logOutUser:  (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true; 
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      });
  },
});

export const { setToken, clearError , logOutUser } = loginSlice.actions;
export default loginSlice.reducer;