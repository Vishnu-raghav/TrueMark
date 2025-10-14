import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import certificateService from "./certificateService.js"

// ISSUE CERTIFICATE
export const issueCertificate = createAsyncThunk("certificate/issueCertificate", async (data , thunkAPI) => {
    try {
        const res = await certificateService.issueCertificate(data)
        return res.data.certificate || res.data.data.certificate
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

export const getCertificate = createAsyncThunk("certificate/getCertificate", async (id , thunkAPI) => {
    try {
        const res = await certificateService.getCertificate(is)
        return res.data.certificate || res.data.data.certificate
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

// LIST ISSUED CERTIFICATES
export const listIssuedCertificates = createAsyncThunk("certificate/listIssuedCertificates", async (_ , thunkAPI) => {
    try {
        const res = await certificateService.listIssuedCertificates()
        res.data.certificates || res.data.data.certificates
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

// LIST USER CERTIFICATES
export const listUserCertificates = createAsyncThunk("certificate/listUserCertificates", async (_ , thunkAPI) => {
    try {       
        const res = await certificateService.listUserCertificates()
        return res.data.certificates || res.data.data.certificates
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    } 
})

// VERIFY CERTIFICATE
export const verifyCertificate = createAsyncThunk("certificate/verifyCertificate", async (id , thunkAPI) => {
    try {
        const res = await certificateService.verifyCertificate(id)
        return res.data.certificate || res.data.data.certificate
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

// DELETE CERTIFICATE
export const deleteCertificate = createAsyncThunk("certificate/deleteCertificate", async (id , thunkAPI) => {
    try {
        const res = await certificateService.deleteCertificate(id)
        return res.data.message
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

const initialState = {
    certificate: null,
    certificates: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}   

const certificateSlice = createSlice({
    name: "certificate",
    initialState,
    reducers:{
        reset: (state) => initialState
    }
    ,
    extraReducers: (builder) => {   
        builder
        // issue certificate    
        .addCase(issueCertificate.pending, (state) => {
            state.isLoading = true
        })
        .addCase(issueCertificate.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.certificate = action.payload
            state.message = "Certificate Issued Successfully"
        })
        .addCase(issueCertificate.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
            state.certificate = null
        })
        // get certificate
        .addCase(getCertificate.pending, (state) => {
            state.isLoading = true
        })      
        .addCase(getCertificate.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.certificate = action.payload
            state.message = "Certificate Fetched Successfully"  
        })
        .addCase(getCertificate.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
            state.certificate = null
        })
        // list issued certificates
        .addCase(listIssuedCertificates.pending, (state) => {
            state.isLoading = true
        })
        .addCase(listIssuedCertificates.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.certificates = action.payload
            state.message = "Issued Certificates Fetched Successfully"
        })
        .addCase(listIssuedCertificates.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
            state.certificates = []
        })  
        // list user certificates
        .addCase(listUserCertificates.pending, (state) => {
            state.isLoading = true
        }
        )
        .addCase(listUserCertificates.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.certificates = action.payload
            state.message = "User Certificates Fetched Successfully"
        }
        )   
        .addCase(listUserCertificates.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
            state.certificates = []
        }
        )   
        // verify certificate
        .addCase(verifyCertificate.pending, (state) => {
            state.isLoading = true
        })
        .addCase(verifyCertificate.fulfilled, (state, action) => {
            state.isLoading = false

            state.isError = false
            state.isSuccess = true
            state.certificate = action.payload
            state.message = "Certificate Verified Successfully"
        }
        )


        .addCase(verifyCertificate.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
            state.certificate = null
        }
        )
        // delete certificate
        .addCase(deleteCertificate.pending, (state) => {
            state.isLoading = true  
        })
        .addCase(deleteCertificate.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.message = action.payload
        }
        )
        .addCase(deleteCertificate.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.payload
        }
        )
    }



})

export const {reset} = certificateSlice.actions
export default certificateSlice.reducer