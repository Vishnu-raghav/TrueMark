import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import organizationService from "./organizationService.js";

const getInitialState = () => {
  const organizationFromStorage = localStorage.getItem('organization');
  const tokenFromStorage = localStorage.getItem('orgAccessToken');
  
  return {
    organization: organizationFromStorage ? JSON.parse(organizationFromStorage) : null,
    accessToken: tokenFromStorage || null,
    students: [],
    studentsCount: 0,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    studentsLoading: false,
    studentsError: null,
  };
};

// REGISTER ORGANIZATION
export const registerOrganization = createAsyncThunk(
  "organization/registerOrganization",
  async (data, thunkAPI) => {
    try {
      const res = await organizationService.register(data);
      console.log("Register Response:", res.data);
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Registration failed";
      console.error("Register Error:", errorMessage);
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
      console.log("Login Response:", res.data);
      return res.data;
    } catch (error) {
      
      let errorMessage = "Invalid email or password";
      
      if (error.response?.data) {
        const responseData = error.response.data;
        if (typeof responseData === 'string' && responseData.includes('<pre>')) {
          const match = responseData.match(/<pre>([^<]+)<\/pre>/);
          if (match && match[1]) {
            const htmlError = match[1];
            if (htmlError.includes('Invalid email or password')) {
              errorMessage = "Invalid email or password";
            } else {
              errorMessage = htmlError.split('<br>')[0].replace('Error:', '').trim();
            }
          }
        } 
        else if (responseData.message) {
          errorMessage = responseData.message;
        } else if (responseData.error) {
          errorMessage = responseData.error;
        }
      }
      
      console.log("Extracted organization error:", errorMessage);
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

// UPDATE ORGANIZATION PROFILE
export const updateOrganizationProfile = createAsyncThunk(
  "organization/updateOrganizationProfile",
  async (data, thunkAPI) => {
    try {
      const res = await organizationService.updateProfile(data);
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Profile update failed";
      console.error("Update Profile Error:", errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// GET ORGANIZATION STUDENTS
export const getOrgStudents = createAsyncThunk(
  "organization/getOrgStudents",
  async (_, thunkAPI) => {
    try {
      const res = await organizationService.getStudents();
      
      if (res.data && res.data.success) {
        return { 
          students: res.data.data || [],
          message: res.data.message 
        };
      } else if (Array.isArray(res.data)) {
        return { students: res.data };
      } else {
        return { students: [] };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Failed to fetch students";
      console.error("Students API Error:", errorMessage);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// SEARCH STUDENTS
export const searchStudents = createAsyncThunk(
  "organization/searchStudents",
  async (query, thunkAPI) => {
    try {
      if (!query || query.trim() === "") {
        return thunkAPI.rejectWithValue("Search query is required");
      }

      const res = await organizationService.searchStudents(query);
      
      if (res.data && res.data.success) {
        return { 
          students: res.data.data || [],
          message: res.data.message 
        };
      } else if (Array.isArray(res.data)) {
        return { students: res.data };
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

// GET STUDENTS COUNT
export const getStudentsCount = createAsyncThunk(
  "organization/getStudentsCount",
  async (_, thunkAPI) => {
    try {
      const res = await organizationService.getStudentsCount();
      
      if (res.data && res.data.success) {
        return { 
          count: res.data.data?.count || res.data.count || 0,
          message: res.data.message 
        };
      } else if (res.data && typeof res.data === 'object') {
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

// ADD STUDENT TO ORGANIZATION
export const addStudentToOrg = createAsyncThunk(
  "organization/addStudentToOrg",
  async (studentEmail, thunkAPI) => {
    try {
      const res = await organizationService.addStudent(studentEmail);
      console.log("Add Student Response:", res.data);
      
      if (res.data && res.data.success) {
        return { 
          student: res.data.data,
          message: res.data.message 
        };
      } else {
        return { student: res.data };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Failed to add student";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// FIX ALL STUDENTS
export const fixAllStudents = createAsyncThunk(
  "organization/fixAllStudents",
  async (_, thunkAPI) => {
    try {
      const res = await organizationService.fixStudents();
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Failed to fix students";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const organizationSlice = createSlice({
  name: "organization",
  initialState: getInitialState(),
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
      
      localStorage.removeItem('organization');
      localStorage.removeItem('orgAccessToken');
    },
    setOrgAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem('orgAccessToken', action.payload);
    },
    clearStudents: (state) => {
      state.students = [];
      state.studentsCount = 0;
      state.studentsError = null;
    },
    resetStudentsLoading: (state) => {
      state.studentsLoading = false;
      state.studentsError = null;
    },
    addStudentToLocal: (state, action) => {
      state.students.unshift(action.payload);
      state.studentsCount += 1;
    },
    updateStudentInLocal: (state, action) => {
      const index = state.students.findIndex(
        student => student._id === action.payload._id
      );
      if (index !== -1) {
        state.students[index] = { ...state.students[index], ...action.payload };
      }
    },
    removeStudentFromLocal: (state, action) => {
      state.students = state.students.filter(
        student => student._id !== action.payload
      );
      state.studentsCount = Math.max(0, state.studentsCount - 1);
    },
    // NEW: Initialize auth from localStorage
    initializeOrgAuth: (state) => {
      const token = localStorage.getItem('orgAccessToken');
      const orgData = localStorage.getItem('organization');
      
      if (token && orgData) {
        state.accessToken = token;
        state.organization = JSON.parse(orgData);
      }
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
        if (action.payload.data) {
          state.organization = action.payload.data.organization || action.payload.data;
          state.accessToken = action.payload.data.accessToken;
        } else {
          state.organization = action.payload.organization || action.payload;
          state.accessToken = action.payload.accessToken;
        }
        state.message = action.payload.message || "Organization registered successfully";
        
        // Save to localStorage
        localStorage.setItem('organization', JSON.stringify(state.organization));
        if (state.accessToken) {
          localStorage.setItem('orgAccessToken', state.accessToken);
        }
      })
      .addCase(registerOrganization.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.organization = null;
        state.accessToken = null;
        state.message = action.payload;
      })

      
      .addCase(loginOrganization.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(loginOrganization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload.data) {
          state.organization = action.payload.data.organization || action.payload.data;
          state.accessToken = action.payload.data.accessToken;
        } else {
          state.organization = action.payload.organization || action.payload;
          state.accessToken = action.payload.accessToken;
        }
        state.message = action.payload.message || "Login successful";
        
        // Save to localStorage
        localStorage.setItem('organization', JSON.stringify(state.organization));
        if (state.accessToken) {
          localStorage.setItem('orgAccessToken', state.accessToken);
        }
      })
      .addCase(loginOrganization.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.organization = null;
        state.accessToken = null;
        
        const errorMsg = action.payload;
        if (errorMsg.includes("failed") || errorMsg.includes("status code") || errorMsg.includes("Request failed")) {
          state.message = "Invalid email or password";
        } else {
          state.message = errorMsg;
        }
        
        // Clear localStorage on login failure
        localStorage.removeItem('organization');
        localStorage.removeItem('orgAccessToken');
      })

      // Refresh token
      .addCase(refreshOrgToken.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(refreshOrgToken.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data) {
          state.accessToken = action.payload.data.accessToken;
        } else {
          state.accessToken = action.payload.accessToken;
        }
        state.message = action.payload.message || "Token refreshed successfully";
        
        // ✅ Update token in localStorage
        if (state.accessToken) {
          localStorage.setItem('orgAccessToken', state.accessToken);
        }
      })
      .addCase(refreshOrgToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.accessToken = null;
        state.message = action.payload;
        
        //  Clear token from localStorage
        localStorage.removeItem('orgAccessToken');
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
        
        // lear localStorage on logout
        localStorage.removeItem('organization');
        localStorage.removeItem('orgAccessToken');
      })
      .addCase(logoutOrganization.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        
        // Still clear localStorage even if API call fails
        state.organization = null;
        state.accessToken = null;
        state.students = [];
        state.studentsCount = 0;
        state.studentsError = null;
        localStorage.removeItem('organization');
        localStorage.removeItem('orgAccessToken');
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
        if (action.payload.data) {
          state.organization = action.payload.data.organization || action.payload.data;
        } else {
          state.organization = action.payload.organization || action.payload;
        }
        state.message = action.payload.message || "Profile fetched successfully";
        
        // Update organization in localStorage
        localStorage.setItem('organization', JSON.stringify(state.organization));
      })
      .addCase(getOrganizationProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // UPDATE ORGANIZATION PROFILE (COMPLETED)
      .addCase(updateOrganizationProfile.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateOrganizationProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (action.payload.data) {
          state.organization = action.payload.data.organization || action.payload.data;
        } else {
          state.organization = action.payload.organization || action.payload;
        }
        state.message = action.payload.message || "Profile updated successfully";
        
        // Update organization in localStorage
        localStorage.setItem('organization', JSON.stringify(state.organization));
      })
      .addCase(updateOrganizationProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // GET ORGANIZATION STUDENTS (COMPLETED)
      .addCase(getOrgStudents.pending, (state) => {
        state.studentsLoading = true;
        state.studentsError = null;
      })
      .addCase(getOrgStudents.fulfilled, (state, action) => {
        state.studentsLoading = false;
        state.students = action.payload.students || [];
        state.message = action.payload.message || "Students fetched successfully";
        state.studentsError = null;
      })
      .addCase(getOrgStudents.rejected, (state, action) => {
        state.studentsLoading = false;
        state.studentsError = action.payload;
        state.message = action.payload;
        state.students = [];
      })

      //  SEARCH STUDENTS (COMPLETED)
      .addCase(searchStudents.pending, (state) => {
        state.studentsLoading = true;
        state.studentsError = null;
      })
      .addCase(searchStudents.fulfilled, (state, action) => {
        state.studentsLoading = false;
        state.students = action.payload.students || [];
        state.message = action.payload.message || "Students search completed";
        state.studentsError = null;
      })
      .addCase(searchStudents.rejected, (state, action) => {
        state.studentsLoading = false;
        state.studentsError = action.payload;
        state.message = action.payload;
      })

      //  GET STUDENTS COUNT (COMPLETED)
      .addCase(getStudentsCount.pending, (state) => {
        state.studentsLoading = true;
        state.studentsError = null;
      })
      .addCase(getStudentsCount.fulfilled, (state, action) => {
        state.studentsLoading = false;
        state.studentsCount = action.payload.count || 0;
        state.message = action.payload.message || "Students count fetched";
        state.studentsError = null;
      })
      .addCase(getStudentsCount.rejected, (state, action) => {
        state.studentsLoading = false;
        state.studentsError = action.payload;
        state.message = action.payload;
        state.studentsCount = 0;
      })

      // ADD STUDENT TO ORGANIZATION (COMPLETED)
      .addCase(addStudentToOrg.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addStudentToOrg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        if (action.payload.student) {
          const existingIndex = state.students.findIndex(
            s => s._id === action.payload.student._id
          );
          
          if (existingIndex === -1) {
            state.students.unshift(action.payload.student);
            state.studentsCount += 1;
          }
        }
        
        state.message = action.payload.message || "Student added successfully";
      })
      .addCase(addStudentToOrg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // FIX ALL STUDENTS (COMPLETED)
      .addCase(fixAllStudents.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fixAllStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message || "Students fixed successfully";
        
        if (action.payload.data) {
          state.studentsCount = action.payload.data.totalStudents || 0;
        }
      })
      .addCase(fixAllStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { 
  resetOrgState, 
  clearOrganization, 
  setOrgAccessToken,
  clearStudents,
  resetStudentsLoading,
  addStudentToLocal,
  updateStudentInLocal,
  removeStudentFromLocal,
  initializeOrgAuth
} = organizationSlice.actions;

export default organizationSlice.reducer;