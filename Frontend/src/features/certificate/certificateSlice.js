// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import certificateService from "./certificateService.js";
// import { logoutUser } from "../auth/authslice.js";

// // ===== THUNKS =====

// // ✅ FIX: ISSUE CERTIFICATE - Remove userId parameter
// export const issueCertificate = createAsyncThunk(
//   "certificate/issueCertificate",
//   async (formData, thunkAPI) => { // ✅ Direct formData pass karen
//     try {
//       console.log("🔄 issueCertificate thunk called with data:", formData);
      
//       const res = await certificateService.issueCertificate(formData);
//       console.log("✅ issueCertificate Response:", res.data);
      
//       return res.data.data || res.data;
//     } catch (error) {
//       console.error("❌ issueCertificate Error:", error);
      
//       if (error.isAuthError) thunkAPI.dispatch(logoutUser());
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || 
//         error.response?.data?.error || 
//         "Certificate issuance failed"
//       );
//     }
//   }
// );

// // GET CERTIFICATE BY ID
// export const getCertificate = createAsyncThunk(
//   "certificate/getCertificate",
//   async (id, thunkAPI) => {
//     try {
//       const res = await certificateService.getCertificate(id);
//       console.log("getCertificate Response:", res.data);
      
//       return res.data.data || res.data;
//     } catch (error) {
//       if (error.isAuthError) thunkAPI.dispatch(logoutUser());
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Fetch failed");
//     }
//   }
// );

// // LIST ISSUED CERTIFICATES (ORG)
// export const listIssuedCertificates = createAsyncThunk(
//   "certificate/listIssuedCertificates",
//   async (_, thunkAPI) => {
//     try {
//       const res = await certificateService.listIssuedCertificates();
//       console.log("listIssuedCertificates Response:", res.data);
      
//       if (res.data && Array.isArray(res.data.data)) {
//         return res.data.data;
//       } else if (Array.isArray(res.data)) {
//         return res.data;
//       } else {
//         console.warn("Unexpected response structure:", res.data);
//         return [];
//       }
//     } catch (error) {
//       if (error.isAuthError) thunkAPI.dispatch(logoutUser());
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch issued");
//     }
//   }
// );

// // LIST USER CERTIFICATES
// export const listUserCertificates = createAsyncThunk(
//   "certificate/listUserCertificates",
//   async (_, thunkAPI) => {
//     try {
//       const res = await certificateService.listUserCertificates();
//       console.log("listUserCertificates Response:", res.data);
      
//       if (res.data && Array.isArray(res.data.data)) {
//         return res.data.data;
//       } else if (Array.isArray(res.data)) {
//         return res.data;
//       } else {
//         console.warn("Unexpected response structure:", res.data);
//         return [];
//       }
//     } catch (error) {
//       if (error.isAuthError) thunkAPI.dispatch(logoutUser());
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch user certs");
//     }
//   }
// );

// // VERIFY CERTIFICATE
// export const verifyCertificate = createAsyncThunk(
//   "certificate/verifyCertificate",
//   async (id, thunkAPI) => {
//     try {
//       console.log("🔄 verifyCertificate thunk called with ID:", id);
      
//       const res = await certificateService.verifyCertificate(id);
//       console.log("✅ verifyCertificate API Response:", res.data);

//       const responseData = res.data;
      
//       // ✅ FIX: Check the actual response structure
//       if (responseData.message && responseData.message.valid === true) {
//         // Success case - certificate is valid
//         return responseData.message.certificate;
//       } else if (responseData.valid === true && responseData.certificate) {
//         // Alternative success structure
//         return responseData.certificate;
//       } else {
//         // Certificate not valid
//         console.log("❌ Certificate validation failed:", responseData);
//         return thunkAPI.rejectWithValue(
//           responseData.message || "Certificate not found or invalid"
//         );
//       }
//     } catch (error) {
//       console.error("❌ verifyCertificate Error:", error);
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || 
//         error.message || 
//         "Verification failed"
//       );
//     }
//   }
// );

// // DELETE CERTIFICATE
// export const deleteCertificate = createAsyncThunk(
//   "certificate/deleteCertificate",
//   async (id, thunkAPI) => {
//     try {
//       const res = await certificateService.deleteCertificate(id);
//       console.log("deleteCertificate Response:", res.data);
      
//       return res.data.message || "Certificate deleted successfully";
//     } catch (error) {
//       if (error.isAuthError) thunkAPI.dispatch(logoutUser());
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Delete failed");
//     }
//   }
// );

// // ===== SLICE =====
// const initialState = {
//   certificate: null,
//   certificates: [],
//   isError: false,
//   isSuccess: false,
//   isLoading: false,
//   message: "",
// };

// const certificateSlice = createSlice({
//   name: "certificate",
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.isError = false;
//       state.isSuccess = false;
//       state.isLoading = false;
//       state.message = "";
//     },
//     resetCertificateState: (state) => {
//       state.certificate = null;
//       state.isError = false;
//       state.isSuccess = false;
//       state.isLoading = false;
//       state.message = "";
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // ISSUE
//       .addCase(issueCertificate.pending, (state) => {
//         state.isLoading = true;
//         state.isError = false;
//         state.isSuccess = false;
//         state.message = "";
//       })
//       .addCase(issueCertificate.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.certificate = action.payload;
//         state.message = "Certificate Issued Successfully";
//       })
//       .addCase(issueCertificate.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//         state.certificate = null;
//       })

//       // GET
//       .addCase(getCertificate.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getCertificate.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.certificate = action.payload;
//         state.message = "Certificate Fetched Successfully";
//       })
//       .addCase(getCertificate.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })

//       // LIST ISSUED
//       .addCase(listIssuedCertificates.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(listIssuedCertificates.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.certificates = action.payload;
//         state.message = "Issued Certificates Fetched Successfully";
//       })
//       .addCase(listIssuedCertificates.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })

//       // LIST USER
//       .addCase(listUserCertificates.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(listUserCertificates.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.certificates = action.payload;
//         state.message = "User Certificates Fetched Successfully";
//       })
//       .addCase(listUserCertificates.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })

//       // VERIFY
//       .addCase(verifyCertificate.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(verifyCertificate.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.certificate = action.payload;
//         state.message = "Certificate Verified Successfully";
//       })
//       .addCase(verifyCertificate.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       })




    

//       // DELETE
//       .addCase(deleteCertificate.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(deleteCertificate.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.message = action.payload;
//       })
//       .addCase(deleteCertificate.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload;
//       });
//   },
// });

// export const { reset, resetCertificateState } = certificateSlice.actions;
// export default certificateSlice.reducer;






import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import certificateService from "./certificateService.js";
import { logoutUser } from "../auth/authslice.js";

// ===== THUNKS =====

// ✅ FIX: ISSUE CERTIFICATE - Remove userId parameter
export const issueCertificate = createAsyncThunk(
  "certificate/issueCertificate",
  async (formData, thunkAPI) => { // ✅ Direct formData pass karen
    try {
      console.log("🔄 issueCertificate thunk called with data:", formData);
      
      const res = await certificateService.issueCertificate(formData);
      console.log("✅ issueCertificate Response:", res.data);
      
      return res.data.data || res.data;
    } catch (error) {
      console.error("❌ issueCertificate Error:", error);
      
      if (error.isAuthError) thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 
        error.response?.data?.error || 
        "Certificate issuance failed"
      );
    }
  }
);

// GET CERTIFICATE BY ID
export const getCertificate = createAsyncThunk(
  "certificate/getCertificate",
  async (id, thunkAPI) => {
    try {
      const res = await certificateService.getCertificate(id);
      console.log("getCertificate Response:", res.data);
      
      return res.data.data || res.data;
    } catch (error) {
      if (error.isAuthError) thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);

// LIST ISSUED CERTIFICATES (ORG)
export const listIssuedCertificates = createAsyncThunk(
  "certificate/listIssuedCertificates",
  async (_, thunkAPI) => {
    try {
      const res = await certificateService.listIssuedCertificates();
      console.log("listIssuedCertificates Response:", res.data);
      
      if (res.data && Array.isArray(res.data.data)) {
        return res.data.data;
      } else if (Array.isArray(res.data)) {
        return res.data;
      } else {
        console.warn("Unexpected response structure:", res.data);
        return [];
      }
    } catch (error) {
      if (error.isAuthError) thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch issued");
    }
  }
);

// LIST USER CERTIFICATES
export const listUserCertificates = createAsyncThunk(
  "certificate/listUserCertificates",
  async (_, thunkAPI) => {
    try {
      const res = await certificateService.listUserCertificates();
      console.log("listUserCertificates Response:", res.data);
      
      if (res.data && Array.isArray(res.data.data)) {
        return res.data.data;
      } else if (Array.isArray(res.data)) {
        return res.data;
      } else {
        console.warn("Unexpected response structure:", res.data);
        return [];
      }
    } catch (error) {
      if (error.isAuthError) thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch user certs");
    }
  }
);

// VERIFY CERTIFICATE - PERFECTED FOR YOUR API RESPONSE
export const verifyCertificate = createAsyncThunk(
  "certificate/verifyCertificate",
  async (id, thunkAPI) => {
    try {
      console.log("🔄 verifyCertificate thunk called with ID:", id);
      
      const res = await certificateService.verifyCertificate(id);
      console.log("✅ verifyCertificate API Response:", res.data);

      const responseData = res.data;
      
      // ✅ PERFECT MATCH FOR YOUR API STRUCTURE
      if (responseData.success === true && 
          responseData.message && 
          responseData.message.valid === true && 
          responseData.message.certificate) {
        // Success case - certificate is valid
        console.log("🎉 Certificate found and valid:", responseData.message.certificate);
        return responseData.message.certificate;
      } 
      else if (responseData.success === false) {
        // API returned success: false
        console.log("❌ API returned success: false", responseData);
        return thunkAPI.rejectWithValue(
          responseData.message?.message || 
          responseData.data || 
          "Certificate verification failed"
        );
      }
      else {
        // Unexpected response structure
        console.log("❌ Unexpected API response:", responseData);
        return thunkAPI.rejectWithValue(
          responseData.message?.message || 
          "Invalid response from server"
        );
      }
    } catch (error) {
      console.error("❌ verifyCertificate Error:", error);
      
      // ✅ Handle specific HTTP status codes with better error messages
      if (error.response?.status === 404) {
        return thunkAPI.rejectWithValue(
          "Certificate not found. Please check the Certificate ID and try again."
        );
      } else if (error.response?.status === 400) {
        return thunkAPI.rejectWithValue(
          "Invalid Certificate ID format. Please check and try again."
        );
      } else if (error.response?.status === 500) {
        return thunkAPI.rejectWithValue(
          "Server error. Please try again later."
        );
      } else if (error.code === 'NETWORK_ERROR') {
        return thunkAPI.rejectWithValue(
          "Network error. Please check your internet connection."
        );
      }
      
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        "Verification failed. Please try again."
      );
    }
  }
);

// DELETE CERTIFICATE
export const deleteCertificate = createAsyncThunk(
  "certificate/deleteCertificate",
  async (id, thunkAPI) => {
    try {
      const res = await certificateService.deleteCertificate(id);
      console.log("deleteCertificate Response:", res.data);
      
      return res.data.message || "Certificate deleted successfully";
    } catch (error) {
      if (error.isAuthError) thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);

// ===== SLICE =====
const initialState = {
  certificate: null,
  certificates: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    // ✅ ADD: Reset certificate state specifically
    resetCertificateState: (state) => {
      state.certificate = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    // ✅ ADD: Clear certificate data specifically
    clearCertificate: (state) => {
      state.certificate = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // ISSUE
      .addCase(issueCertificate.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(issueCertificate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.certificate = action.payload;
        state.message = "Certificate Issued Successfully";
      })
      .addCase(issueCertificate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.certificate = null;
      })

      // GET
      .addCase(getCertificate.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getCertificate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.certificate = action.payload;
        state.message = "Certificate Fetched Successfully";
      })
      .addCase(getCertificate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.certificate = null;
      })

      // LIST ISSUED
      .addCase(listIssuedCertificates.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(listIssuedCertificates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.certificates = action.payload;
        state.message = "Issued Certificates Fetched Successfully";
      })
      .addCase(listIssuedCertificates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.certificates = [];
      })

      // LIST USER
      .addCase(listUserCertificates.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(listUserCertificates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.certificates = action.payload;
        state.message = "User Certificates Fetched Successfully";
      })
      .addCase(listUserCertificates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.certificates = [];
      })

      // VERIFY - IMPROVED ERROR HANDLING
      .addCase(verifyCertificate.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
        state.certificate = null; // Clear previous certificate on new verification
      })
      .addCase(verifyCertificate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.certificate = action.payload;
        state.message = "Certificate Verified Successfully";
        
        console.log("🎉 Reducer - Certificate stored:", action.payload);
      })
      .addCase(verifyCertificate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.certificate = null;
        state.message = action.payload;
        
        console.log("❌ Reducer - Error stored:", action.payload);
      })

      // DELETE
      .addCase(deleteCertificate.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteCertificate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteCertificate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetCertificateState, clearCertificate } = certificateSlice.actions;
export default certificateSlice.reducer;