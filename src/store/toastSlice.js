import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
  severity: "success",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    handleCloseToast: (state) => {
      state.open === false;
    },
    handleOpenToast: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    }
  }
});

export const { handleCloseToast, handleOpenToast } = toastSlice.actions;

export default toastSlice.reducer;
