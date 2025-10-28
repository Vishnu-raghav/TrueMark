import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import organizationService from "./organizationService.js";

// REGISTER ORGANIZATION
export const registerOrganization = createAsyncThunk(
  "organization/registerOrganization",
  async (data, thunkAPI) => {
    try {
      const res = await organizationService.register(data);
      console.log("Register Response:", res.data); // Debug
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Registration failed";
      console.error("Register Error:", errorMessage); // Debug
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
      console.log("Login Response:", res.data); // Debug
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Login failed";
      console.error("Login Error:", errorMessage); // Debug
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
      console.log("Profile Response:", res.data); // Debug
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Failed to get organization profile";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// ✅ GET ORGANIZATION STUDENTS (Improved)
export const getOrgStudents = createAsyncThunk(
  "organization/getOrgStudents",
  async (_, thunkAPI) => {
    try {
      const res = await organizationService.getStudents();
      console.log("Students API Response:", res.data); // Debug
      
      // ✅ Handle different response formats
      if (res.data && Array.isArray(res.data)) {
        return { students: res.data }; // Direct array response
      } else if (res.data && res.data.data) {
        return { students: res.data.data }; // { data: [] } format
      } else {
        return { students: [] }; // Fallback
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Failed to fetch students";
      console.error("Students API Error:", errorMessage); // Debug
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// ✅ SEARCH STUDENTS (Improved)
export const searchStudents = createAsyncThunk(
  "organization/searchStudents",
  async (query, thunkAPI) => {
    try {
      const res = await organizationService.searchStudents(query);
      console.log("Search Students Response:", res.data); // Debug
      
      // ✅ Handle different response formats
      if (res.data && Array.isArray(res.data)) {
        return { students: res.data };
      } else if (res.data && res.data.data) {
        return { students: res.data.data };
      } else {
        return { students: [] };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Failed to search students";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// ✅ GET STUDENTS COUNT (Improved)
export const getStudentsCount = createAsyncThunk(
  "organization/getStudentsCount",
  async (_, thunkAPI) => {
    try {
      const res = await organizationService.getStudentsCount();
      console.log("Students Count Response:", res.data); // Debug
      
      // ✅ Handle different response formats
      if (res.data && typeof res.data === 'object') {
        return { 
          count: res.data.count || res.data.data?.count || 0 
        };
      } else {
        return { count: 0 };
      }
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
  students: [],
  studentsCount: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  studentsLoading: false,
  studentsError: null, // ✅ Changed from boolean to null for better error handling
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
      state.studentsError = null;
    },
    clearOrganization: (state) => {
      state.organization = null;
      state.accessToken = null;
      state.students = [];
      state.studentsCount = 0;
      state.studentsError = null;
    },
    setOrgAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearStudents: (state) => {
      state.students = [];
      state.studentsCount = 0;
      state.studentsError = null;
    },
    // ✅ NEW: Reset students loading state
    resetStudentsLoading: (state) => {
      state.studentsLoading = false;
      state.studentsError = null;
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
        // ✅ Handle different response formats
        state.organization = action.payload.organization || action.payload.data?.organization || action.payload.data || action.payload;
        state.accessToken = action.payload.accessToken || action.payload.data?.accessToken || action.payload.token;
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
        // ✅ Handle different response formats
        state.organization = action.payload.organization || action.payload.data?.organization || action.payload.data || action.payload;
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
        state.accessToken = action.payload.accessToken || action.payload.data?.accessToken || action.payload.token;
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
      .addCase(logoutOrganization.fulfilled, (state) => {
        state.organization = null;
        state.accessToken = null;
        state.students = [];
        state.studentsCount = 0;
        state.isError = false;
        state.isSuccess = true;
        state.isLoading = false;
        state.message = "Logout successful";
        state.studentsError = null;
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
        state.studentsError = null;
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
        // ✅ Handle different response formats
        state.organization = action.payload.organization || action.payload.data?.organization || action.payload.data || action.payload;
        state.message = action.payload.message || "Profile fetched successfully";
      })
      .addCase(getOrganizationProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ✅ GET ORGANIZATION STUDENTS (Improved)
      .addCase(getOrgStudents.pending, (state) => {
        state.studentsLoading = true;
        state.studentsError = null;
      })
      .addCase(getOrgStudents.fulfilled, (state, action) => {
        state.studentsLoading = false;
        state.students = action.payload.students || []; // ✅ Use students from payload
        state.message = "Students fetched successfully";
      })
      .addCase(getOrgStudents.rejected, (state, action) => {
        state.studentsLoading = false;
        state.studentsError = action.payload;
        state.message = action.payload;
        state.students = []; // Clear students on error
      })

      // ✅ SEARCH STUDENTS (Improved)
      .addCase(searchStudents.pending, (state) => {
        state.studentsLoading = true;
        state.studentsError = null;
      })
      .addCase(searchStudents.fulfilled, (state, action) => {
        state.studentsLoading = false;
        state.students = action.payload.students || []; // ✅ Use students from payload
        state.message = "Students search completed";
      })
      .addCase(searchStudents.rejected, (state, action) => {
        state.studentsLoading = false;
        state.studentsError = action.payload;
        state.message = action.payload;
      })

      // ✅ GET STUDENTS COUNT (Improved)
      .addCase(getStudentsCount.pending, (state) => {
        state.studentsLoading = true;
      })
      .addCase(getStudentsCount.fulfilled, (state, action) => {
        state.studentsLoading = false;
        state.studentsCount = action.payload.count || 0; // ✅ Use count from payload
        state.message = "Students count fetched";
      })
      .addCase(getStudentsCount.rejected, (state, action) => {
        state.studentsLoading = false;
        state.studentsError = action.payload;
        state.message = action.payload;
        state.studentsCount = 0; // Reset count on error
      });
  },
});

export const { 
  resetOrgState, 
  clearOrganization, 
  setOrgAccessToken,
  clearStudents,
  resetStudentsLoading 
} = organizationSlice.actions;

export default organizationSlice.reducer;