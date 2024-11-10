import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to submit job application data to the JSON server
export const submitApplication = createAsyncThunk(
  'company/submitApplication',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/JobSeeker', formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    form: {
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      resume: null,
    },
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    updateForm: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    clearForm: (state) => {
      state.form = {
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        resume: null,
      };
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitApplication.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to submit application';
      });
  },
});

export const { updateForm, clearForm } = companySlice.actions;
export default companySlice.reducer;
