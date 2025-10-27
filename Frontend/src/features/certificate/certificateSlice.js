import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import certificateService from "./certificateService.js";
import { logoutUser } from "../auth/authslice.js";

// ===== THUNKS =====

// ISSUE CERTIFICATE - FIXED
export const issueCertificate = createAsyncThunk(
  "certificate/issueCertificate",
  async ({ userId, data }, thunkAPI) => {
    try {
      const res = await certificateService.issueCertificate(userId, data);
      console.log("issueCertificate Response:", res.data);
      
      // ✅ FIX: Correct response structure
      return res.data.data || res.data;
    } catch (error) {
      if (error.isAuthError) thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Issue failed");
    }
  }
);

// GET CERTIFICATE BY ID - FIXED
export const getCertificate = createAsyncThunk(
  "certificate/getCertificate",
  async (id, thunkAPI) => {
    try {
      const res = await certificateService.getCertificate(id);
      console.log("getCertificate Response:", res.data);
      
      // ✅ FIX: Correct response structure
      return res.data.data || res.data;
    } catch (error) {
      if (error.isAuthError) thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Fetch failed");
    }
  }
);

// LIST ISSUED CERTIFICATES (ORG) - FIXED
export const listIssuedCertificates = createAsyncThunk(
  "certificate/listIssuedCertificates",
  async (_, thunkAPI) => {
    try {
      const res = await certificateService.listIssuedCertificates();
      console.log("listIssuedCertificates Response:", res.data);
      
      // ✅ FIX: Correct response structure for arrays
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

// LIST USER CERTIFICATES - FIXED
export const listUserCertificates = createAsyncThunk(
  "certificate/listUserCertificates",
  async (_, thunkAPI) => {
    try {
      const res = await certificateService.listUserCertificates();
      console.log("listUserCertificates Response:", res.data);
      
      // ✅ FIX: Correct response structure for arrays
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

// VERIFY CERTIFICATE - FIXED
export const verifyCertificate = createAsyncThunk(
  "certificate/verifyCertificate",
  async (id, thunkAPI) => {
    try {
      const res = await certificateService.verifyCertificate(id);
      console.log("verifyCertificate Response:", res.data);
      
      const data = res.data.data || res.data || {};
      
      if (!data.valid || !data.certificate) {
        return thunkAPI.rejectWithValue("Certificate not found or invalid");
      }

      return data.certificate;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Verification failed"
      );
    }
  }
);

// DELETE CERTIFICATE - FIXED
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
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // ISSUE
      .addCase(issueCertificate.pending, (state) => {
        state.isLoading = true;
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
      })

      // GET
      .addCase(getCertificate.pending, (state) => {
        state.isLoading = true;
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
      })

      // LIST ISSUED
      .addCase(listIssuedCertificates.pending, (state) => {
        state.isLoading = true;
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
      })

      // LIST USER
      .addCase(listUserCertificates.pending, (state) => {
        state.isLoading = true;
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
      })

      // VERIFY
      .addCase(verifyCertificate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyCertificate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.certificate = action.payload;
        state.message = "Certificate Verified Successfully";
      })
      .addCase(verifyCertificate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // DELETE
      .addCase(deleteCertificate.pending, (state) => {
        state.isLoading = true;
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

export const { reset } = certificateSlice.actions;
export default certificateSlice.reducer;