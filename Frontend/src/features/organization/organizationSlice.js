import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import organizationService from "./organizationService.js";

// REGISTER ORGANIZATION
export const registerOrganization = createAsyncThunk(
  "organization/registerOrganization",
  async (data, thunkAPI) => {
    try {
      const res = await organizationService.register(data);
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Registration failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// LOGIN ORGANIZATION
export const loginOrganization = createAsyncThunk(
  "organization/loginOrganization",
  async (data, thunkAPI) => {
    try {
      const res = await organizationService.login(data);
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Login failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// REFRESH TOKEN
export const refreshOrgToken = createAsyncThunk(
  "organization/refreshOrgToken",
  async (_, thunkAPI) => {
    try {
      const res = await organizationService.refreshToken();
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Token refresh failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// LOGOUT ORGANIZATION
export const logoutOrganization = createAsyncThunk(
  "organization/logoutOrganization",
  async (_, thunkAPI) => {
    try {
      const res = await organizationService.logout();
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Logout failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// ASSIGN ROLE
export const assignRole = createAsyncThunk(
  "organization/assignRole",
  async (data, thunkAPI) => {
    try {
      const res = await organizationService.assignRole(data);
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Role assignment failed";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// GET ORGANIZATION PROFILE
export const getOrganizationProfile = createAsyncThunk(
  "organization/getOrganizationProfile",
  async (_, thunkAPI) => {
    try {
      const res = await organizationService.getProfile();
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Failed to get organization profile";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// ✅ NEW: GET ORGANIZATION STUDENTS
export const getOrgStudents = createAsyncThunk(
  "organization/getOrgStudents",
  async (_, thunkAPI) => {
    try {
      const res = await organizationService.getStudents();
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Failed to fetch students";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// ✅ NEW: SEARCH STUDENTS
export const searchStudents = createAsyncThunk(
  "organization/searchStudents",
  async (query, thunkAPI) => {
    try {
      const res = await organizationService.searchStudents(query);
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Failed to search students";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// ✅ NEW: GET STUDENTS COUNT
export const getStudentsCount = createAsyncThunk(
  "organization/getStudentsCount",
  async (_, thunkAPI) => {
    try {
      const res = await organizationService.getStudentsCount();
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Failed to get students count";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  organization: null,
  accessToken: null,
  students: [], // ✅ NEW: Students list
  studentsCount: 0, // ✅ NEW: Students count
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  // ✅ NEW: Students specific states
  studentsLoading: false,
  studentsError: false,
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    resetOrgState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.studentsError = false;
    },
    clearOrganization: (state) => {
      state.organization = null;
      state.accessToken = null;
      state.students = [];
      state.studentsCount = 0;
    },
    setOrgAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    // ✅ NEW: Clear students data
    clearStudents: (state) => {
      state.students = [];
      state.studentsCount = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerOrganization.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(registerOrganization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.organization = action.payload.organization || action.payload.data?.organization || action.payload;
        state.accessToken = action.payload.accessToken || action.payload.data?.accessToken;
        state.message = action.payload.message || "Organization registered successfully";
      })
      .addCase(registerOrganization.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.organization = null;
        state.accessToken = null;
        state.message = action.payload;
      })

      // Login
      .addCase(loginOrganization.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(loginOrganization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.organization = action.payload.organization || action.payload.data?.organization || action.payload;
        state.accessToken = action.payload.accessToken || action.payload.data?.accessToken || action.payload.token;
        state.message = action.payload.message || "Login successful";
      })
      .addCase(loginOrganization.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.organization = null;
        state.accessToken = null;
        state.message = action.payload;
      })

      // Refresh token
      .addCase(refreshOrgToken.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(refreshOrgToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.accessToken || action.payload.data?.accessToken || action.payload;
        state.message = action.payload.message || "Token refreshed successfully";
      })
      .addCase(refreshOrgToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.accessToken = null;
        state.message = action.payload;
      })

      // Logout
      .addCase(logoutOrganization.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutOrganization.fulfilled, (state, action) => {
        state.organization = null;
        state.accessToken = null;
        state.students = [];
        state.studentsCount = 0;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = action.payload.message || "Logout successful";
      })
      .addCase(logoutOrganization.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        // Logout failed, but still clear local state for security
        state.organization = null;
        state.accessToken = null;
        state.students = [];
        state.studentsCount = 0;
      })

      // Assign Role
      .addCase(assignRole.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(assignRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message || "Role assigned successfully";
      })
      .addCase(assignRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Organization Profile
      .addCase(getOrganizationProfile.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getOrganizationProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.organization = action.payload.organization || action.payload.data?.organization || action.payload;
        state.message = action.payload.message || "Profile fetched successfully";
      })
      .addCase(getOrganizationProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ✅ NEW: GET ORGANIZATION STUDENTS
      .addCase(getOrgStudents.pending, (state) => {
        state.studentsLoading = true;
        state.studentsError = false;
      })
      .addCase(getOrgStudents.fulfilled, (state, action) => {
        state.studentsLoading = false;
        state.students = action.payload.data || action.payload;
        state.message = action.payload.message || "Students fetched successfully";
      })
      .addCase(getOrgStudents.rejected, (state, action) => {
        state.studentsLoading = false;
        state.studentsError = true;
        state.message = action.payload;
      })

      // ✅ NEW: SEARCH STUDENTS
      .addCase(searchStudents.pending, (state) => {
        state.studentsLoading = true;
        state.studentsError = false;
      })
      .addCase(searchStudents.fulfilled, (state, action) => {
        state.studentsLoading = false;
        state.students = action.payload.data || action.payload;
        state.message = action.payload.message || "Students search completed";
      })
      .addCase(searchStudents.rejected, (state, action) => {
        state.studentsLoading = false;
        state.studentsError = true;
        state.message = action.payload;
      })

      // ✅ NEW: GET STUDENTS COUNT
      .addCase(getStudentsCount.pending, (state) => {
        state.studentsLoading = true;
      })
      .addCase(getStudentsCount.fulfilled, (state, action) => {
        state.studentsLoading = false;
        state.studentsCount = action.payload.data?.count || action.payload.count || 0;
        state.message = action.payload.message || "Students count fetched";
      })
      .addCase(getStudentsCount.rejected, (state, action) => {
        state.studentsLoading = false;
        state.studentsError = true;
        state.message = action.payload;
      });
  },
});

export const { 
  resetOrgState, 
  clearOrganization, 
  setOrgAccessToken,
  clearStudents 
} = organizationSlice.actions;

export default organizationSlice.reducer;