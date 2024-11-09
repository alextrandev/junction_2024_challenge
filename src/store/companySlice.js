import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunks
export const fetchCompanies = createAsyncThunk(
  "company/fetchCompanies",
  async () => {
    const response = await fetch("http://localhost:3001/Company");
    if (!response.ok) throw new Error("Failed to fetch companies");
    return response.json();
  }
);

export const updateCompany = createAsyncThunk(
  "company/updateCompany",
  async (updatedData) => {
    const response = await fetch(
      `http://localhost:3001/Company/${updatedData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );
    if (!response.ok) throw new Error("Failed to update company");
    return response.json();
  }
);

// Initial state with stats
const initialState = {
  companies: [],
  currentCompany: null,
  status: "idle",
  error: null,
  stats: {
    totalJobs: 0,
    totalApplications: 0,
    activeListings: 0,
    interviewsScheduled: 0,
  },
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCurrentCompany: (state, action) => {
      state.currentCompany = action.payload;
    },
    updateStats: (state, action) => {
      state.stats = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.companies = action.payload;
        if (!state.currentCompany && action.payload.length > 0) {
          state.currentCompany = action.payload[0];
        }
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateCompany.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedCompany = action.payload;
        state.companies = state.companies.map((company) =>
          company.id === updatedCompany.id ? updatedCompany : company
        );
        if (state.currentCompany?.id === updatedCompany.id) {
          state.currentCompany = updatedCompany;
        }
      });
  },
});

export const { setCurrentCompany, updateStats } = companySlice.actions;
export default companySlice.reducer;
