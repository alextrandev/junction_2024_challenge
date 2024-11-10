import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import mockdb from "../../db.json";

// Async thunks
export const fetchJobSeekers = createAsyncThunk(
  "company/fetchJobSeekers",
  async () => {
    const response = await axios.get("http://localhost:3001/JobSeeker");
    return response.data;
  }
);

export const updateJobSeeker = createAsyncThunk(
  "company/updateJobSeeker",
  async (updatedData) => {
    const response = await axios.put(
      `http://localhost:3001/JobSeeker/${updatedData.id}`,
      updatedData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

// Initial state with stats
const initialState = {
  jobSeekers: mockdb.JobSeeker,
  currentJobSeeker: mockdb.JobSeeker[0],
  status: "idle",
  error: null,
  stats: {
    totalJobs: 0,
    totalApplications: 3,
    activeListings: 2,
    interviewsScheduled: 0,
  },
};

const jobSeekerSlice = createSlice({
  name: "jobSeeker",
  initialState,
  reducers: {
    setCurrentJobSeeker: (state, action) => {
      state.currentJobSeeker = action.payload;
    },
    updateStats: (state, action) => {
      state.stats = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobSeekers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchJobSeekers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobSeekers = action.payload;
        if (!state.currentJobSeeker && action.payload.length > 0) {
          state.currentJobSeeker = action.payload[0];
        }
      })
      .addCase(fetchJobSeekers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateJobSeeker.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateJobSeeker.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedJobSeeker = action.payload;
        state.jobSeekers = state.jobSeekers.map((jobSeeker) =>
          jobSeeker.id === updatedJobSeeker.id ? updatedJobSeeker : company
        );
        if (state.currentJobSeeker?.id === updatedJobSeeker.id) {
          state.currentJobSeeker = updatedJobSeeker;
        }
      });
  },
});

export const { setCurrentJobSeeker, updateStats } = jobSeekerSlice.actions;
export default jobSeekerSlice.reducer;