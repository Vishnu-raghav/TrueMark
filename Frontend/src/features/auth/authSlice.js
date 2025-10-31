import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService.js";


const getInitialState = () => {
  const userFromStorage = localStorage.getItem('user');
  const tokenFromStorage = localStorage.getItem('accessToken');
  
  return {
    user: userFromStorage ? JSON.parse(userFromStorage) : null,
    accessToken: tokenFromStorage || null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  };
};

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
    return res.data; // Return complete response
  } catch (error) {
 
    console.log("🔴 Login error details:", error.response?.data);
    
    let errorMessage = "Invalid email or password";
    
    // Check if response is HTML instead of JSON
    if (error.response?.data) {
      const responseData = error.response.data;
      
      // If it's HTML error page (backend is returning HTML instead of JSON)
      if (typeof responseData === 'string' && responseData.includes('<pre>')) {
        const match = responseData.match(/<pre>([^<]+)<\/pre>/);
        if (match && match[1]) {
          // Extract the actual error message from HTML
          const htmlError = match[1];
          if (htmlError.includes('Invalid email or password')) {
            errorMessage = "Invalid email or password";
          } else {
            // Get first line of error and clean it up
            errorMessage = htmlError.split('<br>')[0].replace('Error:', '').trim();
          }
        }
      } 
      // If it's proper JSON error (normal case)
      else if (responseData.message) {
        errorMessage = responseData.message;
      } else if (responseData.error) {
        errorMessage = responseData.error;
      }
    }
    
    console.log("✅ Extracted error message:", errorMessage);
    return thunkAPI.rejectWithValue(errorMessage);
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

// UPDATE USER PROFILE
export const updateUserProfile = createAsyncThunk("auth/updateUserProfile", async (data, thunkAPI) => {
  try {
    const res = await authService.updateUserProfile(data);
    return res.data.user || res.data.data?.user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Profile update failed");
  }
});

// CHANGE PASSWORD
export const changePassword = createAsyncThunk("auth/changePassword", async (data, thunkAPI) => {
  try {
    const res = await authService.changePassword(data);
    return res.data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Password change failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    // Reset state utility
    resetAuthState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    
    clearUser: (state) => {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    },
   
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', accessToken);
    }
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "Registration Successful";
        
      
        if (action.payload) {
          localStorage.setItem('user', JSON.stringify(action.payload));
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      // LOGIN - UPDATED with localStorage
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        //  Handle different response formats
        const userData = action.payload.user || action.payload.data?.user || action.payload;
        const token = action.payload.accessToken || action.payload.data?.accessToken;
        
        state.user = userData;
        state.accessToken = token;
        state.message = "Login Successful";
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        if (token) {
          localStorage.setItem('accessToken', token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.accessToken = null;
        
        //  FIXED: Always show user-friendly message
        
        const errorMsg = action.payload;
        if (errorMsg.includes("failed") || errorMsg.includes("status code") || errorMsg.includes("Request failed")) {
          state.message = "Invalid email or password";
        } else {
          state.message = errorMsg;
        }
        
        console.log("🔴 Login rejected - error:", action.payload);
        console.log("✅ Showing message to user:", state.message);
        
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      })

      // GET CURRENT USER
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        
        // ✅ Update localStorage with fresh user data
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
        
        // ✅ Clear localStorage if getting current user fails
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      })

      // LOGOUT - ✅ UPDATED with localStorage
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isSuccess = true;
        state.message = "Logout Successful";
        
        // ✅ Clear localStorage on logout
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        
        // ✅ Still clear localStorage even if API call fails
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      })

      // REFRESH TOKEN - ✅ UPDATED with localStorage
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        // ✅ Update token in localStorage
        localStorage.setItem('accessToken', action.payload);
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        
        // ✅ Clear tokens if refresh fails
        state.accessToken = null;
        localStorage.removeItem('accessToken');
      })

      // UPDATE USER PROFILE - ✅ UPDATED with localStorage
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "Profile updated successfully";
        
        // ✅ Update user in localStorage
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // CHANGE PASSWORD
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload || "Password changed successfully";
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAuthState, clearUser, setCredentials } = authSlice.actions;
export default authSlice.reducer;