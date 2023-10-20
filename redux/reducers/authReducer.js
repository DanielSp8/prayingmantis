import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    authLoading: (state) => {
      state.loading = true;
    },
    signIn: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    signOut: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    authError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const { authLoading, signIn, signOut, authError, clearErrors } =
  authSlice.actions;

export default authSlice.reducer;
