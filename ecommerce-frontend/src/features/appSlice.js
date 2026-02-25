import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,       
  loading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;

      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      if (action.payload?.token) {
        localStorage.setItem("token", action.payload.token);
      }
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
    },

    startLoading: (state) => {
      state.loading = true;
    },

    stopLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { login, logout, startLoading, stopLoading } =
  appSlice.actions;

export default appSlice.reducer;
