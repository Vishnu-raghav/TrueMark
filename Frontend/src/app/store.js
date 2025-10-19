import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authslice.js";
import certificateReducer from "../features/certificate/certificateSlice.js";
import organizationReducer from "../features/organization/organizationSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    certificate: certificateReducer,
    organization: organizationReducer,
  },
  devTools: true, 
});
