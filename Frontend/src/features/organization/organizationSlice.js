import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import organizationService from "./organizationService.js";

// REGISTER ORGANIZATION
export const registerOrganization = createAsyncThunk(
  "organization/registerOrganization",
  async (data, thunkAPI) => {
    try {
      const res = await organizationService.register(data);
      return res.data.organization || res.data.data?.organization;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

// LOGIN ORGANIZATION
export const loginOrganization = createAsyncThunk(
  "organization/loginOrganization",
  async (data, thunkAPI) => {
    try {
      const res = await organizationService.login(data);
      return res.data.organization || res.data.data?.organization;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// REFRESH TOKEN
export const refreshOrgToken = createAsyncThunk(
  "organization/refreshOrgToken",
  async (_, thunkAPI) => {
    try {
      const res = await organizationService.refreshToken();
      return res.data.accessToken || res.data.data?.accessToken;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Token refresh failed");
    }
  }
);

// LOGOUT ORGANIZATION
export const logoutOrganization = createAsyncThunk(
  "organization/logoutOrganization",
  async (_, thunkAPI) => {
    try {
      const res = await organizationService.logout();
      return res.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

// ASSIGN ROLE
export const assignRole = createAsyncThunk(
  "organization/assignRole",
  async (data, thunkAPI) => {
    try {
      const res = await organizationService.assignRole(data);
      return res.data.message || "Role assigned successfully";
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Role assignment failed");
    }
  }
);

// ✅ NEW: GET ORGANIZATION PROFILE
export const getOrganizationProfile = createAsyncThunk(
  "organization/getOrganizationProfile",
  async (_, thunkAPI) => {
    try {
      const res = await organizationService.getProfile();
      return res.data.organization || res.data.data?.organization;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to get organization profile");
    }
  }
);

const initialState = {
  organization: null,
  accessToken: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    // ✅ Reset state utility
    resetOrgState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    // ✅ Clear organization data
    clearOrganization: (state) => {
      state.organization = null;
      state.accessToken = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerOrganization.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerOrganization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.organization = action.payload;
        state.message = "Organization registered successfully";
      })
      .addCase(registerOrganization.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Login
      .addCase(loginOrganization.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginOrganization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.organization = action.payload;
        state.message = "Login successful";
      })
      .addCase(loginOrganization.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.organization = null;
        state.message = action.payload;
      })

      // Refresh token
      .addCase(refreshOrgToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshOrgToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload;
      })
      .addCase(refreshOrgToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Logout
      .addCase(logoutOrganization.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutOrganization.fulfilled, (state) => {
        state.organization = null;
        state.accessToken = null;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = "Logout successful";
      })
      .addCase(logoutOrganization.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Assign Role
      .addCase(assignRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(assignRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(assignRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ✅ NEW: Get Organization Profile
      .addCase(getOrganizationProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrganizationProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.organization = action.payload;
      })
      .addCase(getOrganizationProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetOrgState, clearOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;