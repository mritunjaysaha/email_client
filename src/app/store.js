import { configureStore } from '@reduxjs/toolkit';
import { emailSlice } from "../features/email/emailSlice"

export const store = configureStore({
  reducer: {
    email: emailSlice.reducer
  },
});
