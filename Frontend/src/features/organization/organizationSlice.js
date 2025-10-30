// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import organizationService from "./organizationService.js";

// // // REGISTER ORGANIZATION
// // export const registerOrganization = createAsyncThunk(
// //   "organization/registerOrganization",
// //   async (data, thunkAPI) => {
// //     try {
// //       const res = await organizationService.register(data);
// //       console.log("Register Response:", res.data);
// //       return res.data;
// //     } catch (error) {
// //       const errorMessage = error.response?.data?.message || 
// //                           error.response?.data?.error ||
// //                           "Registration failed";
// //       console.error("Register Error:", errorMessage);
// //       return thunkAPI.rejectWithValue(errorMessage);
// //     }
// //   }
// // );

// // // LOGIN ORGANIZATION
// // export const loginOrganization = createAsyncThunk(
// //   "organization/loginOrganization",
// //   async (data, thunkAPI) => {
// //     try {
// //       const res = await organizationService.login(data);
// //       console.log("Login Response:", res.data);
// //       return res.data;
// //     } catch (error) {
// //       const errorMessage = error.response?.data?.message || 
// //                           error.response?.data?.error ||
// //                           "Login failed";
// //       console.error("Login Error:", errorMessage);
// //       return thunkAPI.rejectWithValue(errorMessage);
// //     }
// //   }
// // );

// // // REFRESH TOKEN
// // export const refreshOrgToken = createAsyncThunk(
// //   "organization/refreshOrgToken",
// //   async (_, thunkAPI) => {
// //     try {
// //       const res = await organizationService.refreshToken();
// //       return res.data;
// //     } catch (error) {
// //       const errorMessage = error.response?.data?.message || 
// //                           error.response?.data?.error ||
// //                           "Token refresh failed";
// //       return thunkAPI.rejectWithValue(errorMessage);
// //     }
// //   }
// // );

// // // LOGOUT ORGANIZATION
// // export const logoutOrganization = createAsyncThunk(
// //   "organization/logoutOrganization",
// //   async (_, thunkAPI) => {
// //     try {
// //       const res = await organizationService.logout();
// //       return res.data;
// //     } catch (error) {
// //       const errorMessage = error.response?.data?.message || 
// //                           error.response?.data?.error ||
// //                           "Logout failed";
// //       return thunkAPI.rejectWithValue(errorMessage);
// //     }
// //   }
// // );

// // // ASSIGN ROLE
// // export const assignRole = createAsyncThunk(
// //   "organization/assignRole",
// //   async (data, thunkAPI) => {
// //     try {
// //       const res = await organizationService.assignRole(data);
// //       return res.data;
// //     } catch (error) {
// //       const errorMessage = error.response?.data?.message || 
// //                           error.response?.data?.error ||
// //                           "Role assignment failed";
// //       return thunkAPI.rejectWithValue(errorMessage);
// //     }
// //   }
// // );

// // // GET ORGANIZATION PROFILE
// // export const getOrganizationProfile = createAsyncThunk(
// //   "organization/getOrganizationProfile",
// //   async (_, thunkAPI) => {
// //     try {
// //       const res = await organizationService.getProfile();
// //       console.log("Profile Response:", res.data);
// //       return res.data;
// //     } catch (error) {
// //       const errorMessage = error.response?.data?.message || 
// //                           error.response?.data?.error ||
// //                           "Failed to get organization profile";
// //       return thunkAPI.rejectWithValue(errorMessage);
// //     }
// //   }
// // );

// // // ✅ GET ORGANIZATION STUDENTS (Updated with proper error handling)
// // export const getOrgStudents = createAsyncThunk(
// //   "organization/getOrgStudents",
// //   async (_, thunkAPI) => {
// //     try {
// //       const res = await organizationService.getStudents();
// //       console.log("Students API Response:", res.data);
      
// //       // ✅ Handle ApiResponse format: { success, data, message }
// //       if (res.data && res.data.success) {
// //         return { 
// //           students: res.data.data || [],
// //           message: res.data.message 
// //         };
// //       } else if (Array.isArray(res.data)) {
// //         return { students: res.data }; // Direct array response
// //       } else {
// //         return { students: [] };
// //       }
// //     } catch (error) {
// //       const errorMessage = error.response?.data?.message || 
// //                           error.response?.data?.error ||
// //                           "Failed to fetch students";
// //       console.error("Students API Error:", errorMessage);
// //       return thunkAPI.rejectWithValue(errorMessage);
// //     }
// //   }
// // );

// // // ✅ SEARCH STUDENTS (Updated with proper error handling)
// // export const searchStudents = createAsyncThunk(
// //   "organization/searchStudents",
// //   async (query, thunkAPI) => {
// //     try {
// //       if (!query || query.trim() === "") {
// //         return thunkAPI.rejectWithValue("Search query is required");
// //       }

// //       const res = await organizationService.searchStudents(query);
// //       console.log("Search Students Response:", res.data);
      
// //       // ✅ Handle ApiResponse format
// //       if (res.data && res.data.success) {
// //         return { 
// //           students: res.data.data || [],
// //           message: res.data.message 
// //         };
// //       } else if (Array.isArray(res.data)) {
// //         return { students: res.data };
// //       } else {
// //         return { students: [] };
// //       }
// //     } catch (error) {
// //       const errorMessage = error.response?.data?.message || 
// //                           error.response?.data?.error ||
// //                           "Failed to search students";
// //       return thunkAPI.rejectWithValue(errorMessage);
// //     }
// //   }
// // );

// // // ✅ GET STUDENTS COUNT (Updated with proper error handling)
// // export const getStudentsCount = createAsyncThunk(
// //   "organization/getStudentsCount",
// //   async (_, thunkAPI) => {
// //     try {
// //       const res = await organizationService.getStudentsCount();
// //       console.log("Students Count Response:", res.data);
      
// //       // ✅ Handle ApiResponse format
// //       if (res.data && res.data.success) {
// //         return { 
// //           count: res.data.data?.count || res.data.count || 0,
// //           message: res.data.message 
// //         };
// //       } else if (res.data && typeof res.data === 'object') {
// //         return { 
// //           count: res.data.count || res.data.data?.count || 0 
// //         };
// //       } else {
// //         return { count: 0 };
// //       }
// //     } catch (error) {
// //       const errorMessage = error.response?.data?.message || 
// //                           error.response?.data?.error ||
// //                           "Failed to get students count";
// //       return thunkAPI.rejectWithValue(errorMessage);
// //     }
// //   }
// // );


// // // ✅ ADD STUDENT TO ORGANIZATION
// // export const addStudentToOrg = createAsyncThunk(
// //   "organization/addStudentToOrg",
// //   async (studentEmail, thunkAPI) => {
// //     try {
// //       const res = await organizationService.addStudent(studentEmail);
// //       console.log("Add Student Response:", res.data);
      
// //       if (res.data && res.data.success) {
// //         return { 
// //           student: res.data.data,
// //           message: res.data.message 
// //         };
// //       } else {
// //         return { student: res.data };
// //       }
// //     } catch (error) {
// //       const errorMessage = error.response?.data?.message || 
// //                           error.response?.data?.error ||
// //                           "Failed to add student";
// //       return thunkAPI.rejectWithValue(errorMessage);
// //     }
// //   }
// // );

// // // ✅ FIX ALL STUDENTS (Optional)
// // export const fixAllStudents = createAsyncThunk(
// //   "organization/fixAllStudents",
// //   async (_, thunkAPI) => {
// //     try {
// //       const res = await organizationService.fixStudents();
// //       return res.data;
// //     } catch (error) {
// //       const errorMessage = error.response?.data?.message || 
// //                           error.response?.data?.error ||
// //                           "Failed to fix students";
// //       return thunkAPI.rejectWithValue(errorMessage);
// //     }
// //   }
// // );




// // const initialState = {
// //   organization: null,
// //   accessToken: null,
// //   students: [],
// //   studentsCount: 0,
// //   isError: false,
// //   isSuccess: false,
// //   isLoading: false,
// //   message: "",
// //   studentsLoading: false,
// //   studentsError: null,
// // };

// // const organizationSlice = createSlice({
// //   name: "organization",
// //   initialState,
// //   reducers: {
// //     resetOrgState: (state) => {
// //       state.isError = false;
// //       state.isSuccess = false;
// //       state.isLoading = false;
// //       state.message = "";
// //       state.studentsError = null;
// //     },
// //     clearOrganization: (state) => {
// //       state.organization = null;
// //       state.accessToken = null;
// //       state.students = [];
// //       state.studentsCount = 0;
// //       state.studentsError = null;
// //     },
// //     setOrgAccessToken: (state, action) => {
// //       state.accessToken = action.payload;
// //     },
// //     clearStudents: (state) => {
// //       state.students = [];
// //       state.studentsCount = 0;
// //       state.studentsError = null;
// //     },
// //     resetStudentsLoading: (state) => {
// //       state.studentsLoading = false;
// //       state.studentsError = null;
// //     },
// //     // ✅ NEW: Add student to local state (for immediate UI update)
// //     addStudentToLocal: (state, action) => {
// //       state.students.unshift(action.payload);
// //       state.studentsCount += 1;
// //     },
// //     // ✅ NEW: Update student in local state
// //     updateStudentInLocal: (state, action) => {
// //       const index = state.students.findIndex(
// //         student => student._id === action.payload._id
// //       );
// //       if (index !== -1) {
// //         state.students[index] = { ...state.students[index], ...action.payload };
// //       }
// //     },
// //     // ✅ NEW: Remove student from local state
// //     removeStudentFromLocal: (state, action) => {
// //       state.students = state.students.filter(
// //         student => student._id !== action.payload
// //       );
// //       state.studentsCount = Math.max(0, state.studentsCount - 1);
// //     }
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       // Register
// //       .addCase(registerOrganization.pending, (state) => {
// //         state.isLoading = true;
// //         state.isError = false;
// //         state.isSuccess = false;
// //         state.message = "";
// //       })
// //       .addCase(registerOrganization.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.isSuccess = true;
// //         // ✅ Handle ApiResponse format
// //         if (action.payload.data) {
// //           state.organization = action.payload.data.organization || action.payload.data;
// //           state.accessToken = action.payload.data.accessToken;
// //         } else {
// //           state.organization = action.payload.organization || action.payload;
// //           state.accessToken = action.payload.accessToken;
// //         }
// //         state.message = action.payload.message || "Organization registered successfully";
// //       })
// //       .addCase(registerOrganization.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.isError = true;
// //         state.organization = null;
// //         state.accessToken = null;
// //         state.message = action.payload;
// //       })

// //       // Login
// //       .addCase(loginOrganization.pending, (state) => {
// //         state.isLoading = true;
// //         state.isError = false;
// //         state.isSuccess = false;
// //         state.message = "";
// //       })
// //       .addCase(loginOrganization.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.isSuccess = true;
// //         // ✅ Handle ApiResponse format
// //         if (action.payload.data) {
// //           state.organization = action.payload.data.organization || action.payload.data;
// //           state.accessToken = action.payload.data.accessToken;
// //         } else {
// //           state.organization = action.payload.organization || action.payload;
// //           state.accessToken = action.payload.accessToken;
// //         }
// //         state.message = action.payload.message || "Login successful";
// //       })
// //       .addCase(loginOrganization.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.isError = true;
// //         state.organization = null;
// //         state.accessToken = null;
// //         state.message = action.payload;
// //       })

// //       // Refresh token
// //       .addCase(refreshOrgToken.pending, (state) => {
// //         state.isLoading = true;
// //         state.isError = false;
// //       })
// //       .addCase(refreshOrgToken.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         if (action.payload.data) {
// //           state.accessToken = action.payload.data.accessToken;
// //         } else {
// //           state.accessToken = action.payload.accessToken;
// //         }
// //         state.message = action.payload.message || "Token refreshed successfully";
// //       })
// //       .addCase(refreshOrgToken.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.isError = true;
// //         state.accessToken = null;
// //         state.message = action.payload;
// //       })

// //       // Logout
// //       .addCase(logoutOrganization.pending, (state) => {
// //         state.isLoading = true;
// //       })
// //       .addCase(logoutOrganization.fulfilled, (state) => {
// //         state.organization = null;
// //         state.accessToken = null;
// //         state.students = [];
// //         state.studentsCount = 0;
// //         state.isError = false;
// //         state.isSuccess = true;
// //         state.isLoading = false;
// //         state.message = "Logout successful";
// //         state.studentsError = null;
// //       })
// //       .addCase(logoutOrganization.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.isError = true;
// //         state.message = action.payload;
// //         // Logout failed, but still clear local state for security
// //         state.organization = null;
// //         state.accessToken = null;
// //         state.students = [];
// //         state.studentsCount = 0;
// //         state.studentsError = null;
// //       })

// //       // Assign Role
// //       .addCase(assignRole.pending, (state) => {
// //         state.isLoading = true;
// //         state.isError = false;
// //       })
// //       .addCase(assignRole.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.isSuccess = true;
// //         state.message = action.payload.message || "Role assigned successfully";
// //       })
// //       .addCase(assignRole.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.isError = true;
// //         state.message = action.payload;
// //       })

// //       // Get Organization Profile
// //       .addCase(getOrganizationProfile.pending, (state) => {
// //         state.isLoading = true;
// //         state.isError = false;
// //       })
// //       .addCase(getOrganizationProfile.fulfilled, (state, action) => {
// //         state.isLoading = false;
// //         state.isSuccess = true;
// //         // ✅ Handle ApiResponse format
// //         if (action.payload.data) {
// //           state.organization = action.payload.data.organization || action.payload.data;
// //         } else {
// //           state.organization = action.payload.organization || action.payload;
// //         }
// //         state.message = action.payload.message || "Profile fetched successfully";
// //       })
// //       .addCase(getOrganizationProfile.rejected, (state, action) => {
// //         state.isLoading = false;
// //         state.isError = true;
// //         state.message = action.payload;
// //       })

// //       // ✅ GET ORGANIZATION STUDENTS (Improved)
// //       .addCase(getOrgStudents.pending, (state) => {
// //         state.studentsLoading = true;
// //         state.studentsError = null;
// //       })
// //       .addCase(getOrgStudents.fulfilled, (state, action) => {
// //         state.studentsLoading = false;
// //         state.students = action.payload.students || [];
// //         state.message = action.payload.message || "Students fetched successfully";
// //         state.studentsError = null;
// //       })
// //       .addCase(getOrgStudents.rejected, (state, action) => {
// //         state.studentsLoading = false;
// //         state.studentsError = action.payload;
// //         state.message = action.payload;
// //         state.students = [];
// //       })

// //       // ✅ SEARCH STUDENTS (Improved)
// //       .addCase(searchStudents.pending, (state) => {
// //         state.studentsLoading = true;
// //         state.studentsError = null;
// //       })
// //       .addCase(searchStudents.fulfilled, (state, action) => {
// //         state.studentsLoading = false;
// //         state.students = action.payload.students || [];
// //         state.message = action.payload.message || "Students search completed";
// //         state.studentsError = null;
// //       })
// //       .addCase(searchStudents.rejected, (state, action) => {
// //         state.studentsLoading = false;
// //         state.studentsError = action.payload;
// //         state.message = action.payload;
// //       })

// //       // ✅ GET STUDENTS COUNT (Improved)
// //       .addCase(getStudentsCount.pending, (state) => {
// //         state.studentsLoading = true;
// //         state.studentsError = null;
// //       })
// //       .addCase(getStudentsCount.fulfilled, (state, action) => {
// //         state.studentsLoading = false;
// //         state.studentsCount = action.payload.count || 0;
// //         state.message = action.payload.message || "Students count fetched";
// //         state.studentsError = null;
// //       })
// //       .addCase(getStudentsCount.rejected, (state, action) => {
// //         state.studentsLoading = false;
// //         state.studentsError = action.payload;
// //         state.message = action.payload;
// //         state.studentsCount = 0;
// //       });


// //             // ✅ ADD STUDENT TO ORGANIZATION
// // .addCase(addStudentToOrg.pending, (state) => {
// //   state.isLoading = true;
// //   state.isError = false;
// // })
// // .addCase(addStudentToOrg.fulfilled, (state, action) => {
// //   state.isLoading = false;
// //   state.isSuccess = true;
  
// //   // ✅ Add student to local state immediately
// //   if (action.payload.student) {
// //     const existingIndex = state.students.findIndex(
// //       s => s._id === action.payload.student._id
// //     );
    
// //     if (existingIndex === -1) {
// //       state.students.unshift(action.payload.student);
// //       state.studentsCount += 1;
// //     }
// //   }
  
// //   state.message = action.payload.message || "Student added successfully";
// // })
// // .addCase(addStudentToOrg.rejected, (state, action) => {
// //   state.isLoading = false;
// //   state.isError = true;
// //   state.message = action.payload;
// // })

// // // ✅ FIX ALL STUDENTS (Optional)
// // .addCase(fixAllStudents.pending, (state) => {
// //   state.isLoading = true;
// //   state.isError = false;
// // })
// // .addCase(fixAllStudents.fulfilled, (state, action) => {
// //   state.isLoading = false;
// //   state.isSuccess = true;
// //   state.message = action.payload.message || "Students fixed successfully";
  
// //   // Refresh students list after fix
// //   if (action.payload.data) {
// //     state.studentsCount = action.payload.data.totalStudents || 0;
// //   }
// // })
// // .addCase(fixAllStudents.rejected, (state, action) => {
// //   state.isLoading = false;
// //   state.isError = true;
// //   state.message = action.payload;
// // })



// //   },
  
// // });

// // export const { 
// //   resetOrgState, 
// //   clearOrganization, 
// //   setOrgAccessToken,
// //   clearStudents,
// //   resetStudentsLoading,
// //   addStudentToLocal,
// //   updateStudentInLocal,
// //   removeStudentFromLocal
  
// // } = organizationSlice.actions;

// // export default organizationSlice.reducer;


















// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import organizationService from "./organizationService.js";

// // REGISTER ORGANIZATION
// export const registerOrganization = createAsyncThunk(
//   "organization/registerOrganization",
//   async (data, thunkAPI) => {
//     try {
//       const res = await organizationService.register(data);
//       console.log("Register Response:", res.data);
//       return res.data;
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error ||
//                           "Registration failed";
//       console.error("Register Error:", errorMessage);
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

// // LOGIN ORGANIZATION
// export const loginOrganization = createAsyncThunk(
//   "organization/loginOrganization",
//   async (data, thunkAPI) => {
//     try {
//       const res = await organizationService.login(data);
//       console.log("Login Response:", res.data);
//       return res.data;
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error ||
//                           "Login failed";
//       console.error("Login Error:", errorMessage);
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

// // REFRESH TOKEN
// export const refreshOrgToken = createAsyncThunk(
//   "organization/refreshOrgToken",
//   async (_, thunkAPI) => {
//     try {
//       const res = await organizationService.refreshToken();
//       return res.data;
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error ||
//                           "Token refresh failed";
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

// // LOGOUT ORGANIZATION
// export const logoutOrganization = createAsyncThunk(
//   "organization/logoutOrganization",
//   async (_, thunkAPI) => {
//     try {
//       const res = await organizationService.logout();
//       return res.data;
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error ||
//                           "Logout failed";
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

// // ASSIGN ROLE
// export const assignRole = createAsyncThunk(
//   "organization/assignRole",
//   async (data, thunkAPI) => {
//     try {
//       const res = await organizationService.assignRole(data);
//       return res.data;
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error ||
//                           "Role assignment failed";
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

// // GET ORGANIZATION PROFILE
// export const getOrganizationProfile = createAsyncThunk(
//   "organization/getOrganizationProfile",
//   async (_, thunkAPI) => {
//     try {
//       const res = await organizationService.getProfile();
//       console.log("Profile Response:", res.data);
//       return res.data;
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error ||
//                           "Failed to get organization profile";
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

// // ✅ GET ORGANIZATION STUDENTS
// export const getOrgStudents = createAsyncThunk(
//   "organization/getOrgStudents",
//   async (_, thunkAPI) => {
//     try {
//       const res = await organizationService.getStudents();
//       console.log("Students API Response:", res.data);
      
//       if (res.data && res.data.success) {
//         return { 
//           students: res.data.data || [],
//           message: res.data.message 
//         };
//       } else if (Array.isArray(res.data)) {
//         return { students: res.data };
//       } else {
//         return { students: [] };
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error ||
//                           "Failed to fetch students";
//       console.error("Students API Error:", errorMessage);
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

// // ✅ SEARCH STUDENTS
// export const searchStudents = createAsyncThunk(
//   "organization/searchStudents",
//   async (query, thunkAPI) => {
//     try {
//       if (!query || query.trim() === "") {
//         return thunkAPI.rejectWithValue("Search query is required");
//       }

//       const res = await organizationService.searchStudents(query);
//       console.log("Search Students Response:", res.data);
      
//       if (res.data && res.data.success) {
//         return { 
//           students: res.data.data || [],
//           message: res.data.message 
//         };
//       } else if (Array.isArray(res.data)) {
//         return { students: res.data };
//       } else {
//         return { students: [] };
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error ||
//                           "Failed to search students";
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

// // ✅ GET STUDENTS COUNT
// export const getStudentsCount = createAsyncThunk(
//   "organization/getStudentsCount",
//   async (_, thunkAPI) => {
//     try {
//       const res = await organizationService.getStudentsCount();
//       console.log("Students Count Response:", res.data);
      
//       if (res.data && res.data.success) {
//         return { 
//           count: res.data.data?.count || res.data.count || 0,
//           message: res.data.message 
//         };
//       } else if (res.data && typeof res.data === 'object') {
//         return { 
//           count: res.data.count || res.data.data?.count || 0 
//         };
//       } else {
//         return { count: 0 };
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error ||
//                           "Failed to get students count";
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

// // ✅ ADD STUDENT TO ORGANIZATION
// export const addStudentToOrg = createAsyncThunk(
//   "organization/addStudentToOrg",
//   async (studentEmail, thunkAPI) => {
//     try {
//       const res = await organizationService.addStudent(studentEmail);
//       console.log("Add Student Response:", res.data);
      
//       if (res.data && res.data.success) {
//         return { 
//           student: res.data.data,
//           message: res.data.message 
//         };
//       } else {
//         return { student: res.data };
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error ||
//                           "Failed to add student";
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

// // ✅ FIX ALL STUDENTS
// export const fixAllStudents = createAsyncThunk(
//   "organization/fixAllStudents",
//   async (_, thunkAPI) => {
//     try {
//       const res = await organizationService.fixStudents();
//       return res.data;
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error ||
//                           "Failed to fix students";
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );

// const initialState = {
//   organization: null,
//   accessToken: null,
//   students: [],
//   studentsCount: 0,
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: "",
//   studentsLoading: false,
//   studentsError: null,
// };

// const organizationSlice = createSlice({
//   name: "organization",
//   initialState,
//   reducers: {
//     resetOrgState: (state) => {
//       state.isError = false;
//       state.isSuccess = false;
//       state.isLoading = false;
//       state.message = "";
//       state.studentsError = null;
//     },
//     clearOrganization: (state) => {
//       state.organization = null;
//       state.accessToken = null;
//       state.students = [];
//       state.studentsCount = 0;
//       state.studentsError = null;
//     },
//     setOrgAccessToken: (state, action) => {
//       state.accessToken = action.payload;
//     },
//     clearStudents: (state) => {
//       state.students = [];
//       state.studentsCount = 0;
//       state.studentsError = null;
//     },
//     resetStudentsLoading: (state) => {
//       state.studentsLoading = false;
//       state.studentsError = null;
//     },
//     addStudentToLocal: (state, action) => {
//       state.students.unshift(action.payload);
//       state.studentsCount += 1;
//     },
//     updateStudentInLocal: (state, action) => {
//       const index = state.students.findIndex(
//         student => student._id === action.payload._id
//       );
//       if (index !== -1) {
//         state.students[index] = { ...state.students[index], ...action.payload };
//       }
//     },
//     removeStudentFromLocal: (state, action) => {
//       state.students = state.students.filter(
//         student => student._id !== action.payload
//       );
//       state.studentsCount = Math.max(0, state.studentsCount - 1);
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register
//       .addCase(registerOrganization.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//         state.isSuccess = false;
//         state.message = "";
//       })
//       .addCase(registerOrganization.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         if (action.payload.data) {
//           state.organization = action.payload.data.organization || action.payload.data;
//           state.accessToken = action.payload.data.accessToken;
//         } else {
//           state.organization = action.payload.organization || action.payload;
//           state.accessToken = action.payload.accessToken;
//         }
//         state.message = action.payload.message || "Organization registered successfully";
//       })
//       .addCase(registerOrganization.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.organization = null;
//         state.accessToken = null;
//         state.message = action.payload;
//       })

//       // Login
//       .addCase(loginOrganization.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//         state.isSuccess = false;
//         state.message = "";
//       })
//       .addCase(loginOrganization.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         if (action.payload.data) {
//           state.organization = action.payload.data.organization || action.payload.data;
//           state.accessToken = action.payload.data.accessToken;
//         } else {
//           state.organization = action.payload.organization || action.payload;
//           state.accessToken = action.payload.accessToken;
//         }
//         state.message = action.payload.message || "Login successful";
//       })
//       .addCase(loginOrganization.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.organization = null;
//         state.accessToken = null;
//         state.message = action.payload;
//       })

//       // Refresh token
//       .addCase(refreshOrgToken.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//       })
//       .addCase(refreshOrgToken.fulfilled, (state, action) => {
//         state.isLoading = false;
//         if (action.payload.data) {
//           state.accessToken = action.payload.data.accessToken;
//         } else {
//           state.accessToken = action.payload.accessToken;
//         }
//         state.message = action.payload.message || "Token refreshed successfully";
//       })
//       .addCase(refreshOrgToken.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.accessToken = null;
//         state.message = action.payload;
//       })

//       // Logout
//       .addCase(logoutOrganization.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(logoutOrganization.fulfilled, (state) => {
//         state.organization = null;
//         state.accessToken = null;
//         state.students = [];
//         state.studentsCount = 0;
//         state.isError = false;
//         state.isSuccess = true;
//         state.isLoading = false;
//         state.message = "Logout successful";
//         state.studentsError = null;
//       })
//       .addCase(logoutOrganization.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         state.organization = null;
//         state.accessToken = null;
//         state.students = [];
//         state.studentsCount = 0;
//         state.studentsError = null;
//       })

//       // Assign Role
//       .addCase(assignRole.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//       })
//       .addCase(assignRole.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.message = action.payload.message || "Role assigned successfully";
//       })
//       .addCase(assignRole.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })

//       // Get Organization Profile
//       .addCase(getOrganizationProfile.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//       })
//       .addCase(getOrganizationProfile.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         if (action.payload.data) {
//           state.organization = action.payload.data.organization || action.payload.data;
//         } else {
//           state.organization = action.payload.organization || action.payload;
//         }
//         state.message = action.payload.message || "Profile fetched successfully";
//       })
//       .addCase(getOrganizationProfile.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })

//       // Get Organization Students
//       .addCase(getOrgStudents.pending, (state) => {
//         state.studentsLoading = true;
//         state.studentsError = null;
//       })
//       .addCase(getOrgStudents.fulfilled, (state, action) => {
//         state.studentsLoading = false;
//         state.students = action.payload.students || [];
//         state.message = action.payload.message || "Students fetched successfully";
//         state.studentsError = null;
//       })
//       .addCase(getOrgStudents.rejected, (state, action) => {
//         state.studentsLoading = false;
//         state.studentsError = action.payload;
//         state.message = action.payload;
//         state.students = [];
//       })

//       // Search Students
//       .addCase(searchStudents.pending, (state) => {
//         state.studentsLoading = true;
//         state.studentsError = null;
//       })
//       .addCase(searchStudents.fulfilled, (state, action) => {
//         state.studentsLoading = false;
//         state.students = action.payload.students || [];
//         state.message = action.payload.message || "Students search completed";
//         state.studentsError = null;
//       })
//       .addCase(searchStudents.rejected, (state, action) => {
//         state.studentsLoading = false;
//         state.studentsError = action.payload;
//         state.message = action.payload;
//       })

//       // Get Students Count
//       .addCase(getStudentsCount.pending, (state) => {
//         state.studentsLoading = true;
//         state.studentsError = null;
//       })
//       .addCase(getStudentsCount.fulfilled, (state, action) => {
//         state.studentsLoading = false;
//         state.studentsCount = action.payload.count || 0;
//         state.message = action.payload.message || "Students count fetched";
//         state.studentsError = null;
//       })
//       .addCase(getStudentsCount.rejected, (state, action) => {
//         state.studentsLoading = false;
//         state.studentsError = action.payload;
//         state.message = action.payload;
//         state.studentsCount = 0;
//       })

//       // Add Student to Organization
//       .addCase(addStudentToOrg.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//       })
//       .addCase(addStudentToOrg.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
        
//         if (action.payload.student) {
//           const existingIndex = state.students.findIndex(
//             s => s._id === action.payload.student._id
//           );
          
//           if (existingIndex === -1) {
//             state.students.unshift(action.payload.student);
//             state.studentsCount += 1;
//           }
//         }
        
//         state.message = action.payload.message || "Student added successfully";
//       })
//       .addCase(addStudentToOrg.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })

//       // Fix All Students
//       .addCase(fixAllStudents.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//       })
//       .addCase(fixAllStudents.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.message = action.payload.message || "Students fixed successfully";
        
//         if (action.payload.data) {
//           state.studentsCount = action.payload.data.totalStudents || 0;
//         }
//       })
//       .addCase(fixAllStudents.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       });
//   },
// });

// export const { 
//   resetOrgState, 
//   clearOrganization, 
//   setOrgAccessToken,
//   clearStudents,
//   resetStudentsLoading,
//   addStudentToLocal,
//   updateStudentInLocal,
//   removeStudentFromLocal
// } = organizationSlice.actions;

// export default organizationSlice.reducer;





import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import organizationService from "./organizationService.js";

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
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Login failed";
      console.error("Login Error:", errorMessage);
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
      console.log("Profile Response:", res.data);
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          "Failed to get organization profile";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// ✅ UPDATE ORGANIZATION PROFILE (NEW)
export const updateOrganizationProfile = createAsyncThunk(
  "organization/updateOrganizationProfile",
  async (data, thunkAPI) => {
    try {
      const res = await organizationService.updateProfile(data);
      console.log("Update Profile Response:", res.data);
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

// ✅ GET ORGANIZATION STUDENTS
export const getOrgStudents = createAsyncThunk(
  "organization/getOrgStudents",
  async (_, thunkAPI) => {
    try {
      const res = await organizationService.getStudents();
      console.log("Students API Response:", res.data);
      
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

// ✅ SEARCH STUDENTS
export const searchStudents = createAsyncThunk(
  "organization/searchStudents",
  async (query, thunkAPI) => {
    try {
      if (!query || query.trim() === "") {
        return thunkAPI.rejectWithValue("Search query is required");
      }

      const res = await organizationService.searchStudents(query);
      console.log("Search Students Response:", res.data);
      
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

// ✅ GET STUDENTS COUNT
export const getStudentsCount = createAsyncThunk(
  "organization/getStudentsCount",
  async (_, thunkAPI) => {
    try {
      const res = await organizationService.getStudentsCount();
      console.log("Students Count Response:", res.data);
      
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

// ✅ ADD STUDENT TO ORGANIZATION
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

// ✅ FIX ALL STUDENTS
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
  studentsError: null,
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
        if (action.payload.data) {
          state.organization = action.payload.data.organization || action.payload.data;
          state.accessToken = action.payload.data.accessToken;
        } else {
          state.organization = action.payload.organization || action.payload;
          state.accessToken = action.payload.accessToken;
        }
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
        if (action.payload.data) {
          state.accessToken = action.payload.data.accessToken;
        } else {
          state.accessToken = action.payload.accessToken;
        }
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
        if (action.payload.data) {
          state.organization = action.payload.data.organization || action.payload.data;
        } else {
          state.organization = action.payload.organization || action.payload;
        }
        state.message = action.payload.message || "Profile fetched successfully";
      })
      .addCase(getOrganizationProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // ✅ UPDATE ORGANIZATION PROFILE (NEW)
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
      })
      .addCase(updateOrganizationProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get Organization Students
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

      // Search Students
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

      // Get Students Count
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

      // Add Student to Organization
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

      // Fix All Students
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
  removeStudentFromLocal
} = organizationSlice.actions;

export default organizationSlice.reducer;