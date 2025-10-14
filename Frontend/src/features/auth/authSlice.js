import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService.js";

// REGISTER
export const registerUser = createAsyncThunk("auth/registerUser", async (data, thunkAPI) => {
  try {
    const res = await authService.registerUser(data);
    return res.data.user || res.data.data?.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
  }
});

// LOGIN
export const loginUser = createAsyncThunk("auth/loginUser", async (data, thunkAPI) => {
  try {
    const res = await authService.loginUser(data);
    return res.data.user || res.data.data?.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

// GET CURRENT USER
export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, thunkAPI) => {
  try {
    const res = await authService.getCurrentUser();
    return res.data.user || res.data.data?.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to get user");
  }
});

// LOGOUT
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkAPI) => {
  try {
    const res = await authService.logoutUser();
    return res.data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Logout failed");
  }
});

// REFRESH TOKEN
export const refreshAccessToken = createAsyncThunk("auth/refreshAccessToken", async (_, thunkAPI) => {
  try {
    const res = await authService.refreshAccessToken();
    return res.data.accessToken;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Token refresh failed");
  }
});

const initialState = {
  user: null,
  accessToken: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "Registration Successful";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "Login Successful";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })

      // GET CURRENT USER
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isSuccess = true;
        state.message = "Logout Successful";
      })

      // REFRESH TOKEN
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      });
  },
});

export default authSlice.reducer;
/* Additional functionalities to be implemented in the future:

-> update user details  
-> get user details
-> list all users
-> delete user  
-> update user password
-> reset user password

-> get user by id
-> get user by name
-> get user by email
-> get user by role 
*/  