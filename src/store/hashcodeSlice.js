import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  extractCompanyId,
  generateHash,
} from "../../src/utils/helperFunctions";

// Create new hash and save to server
export const createHash = createAsyncThunk(
  "hashes/create",
  async (companyId = 1, { rejectWithValue }) => {
    try {
      const hashcode = "1c6-ad74hp"; // Mock hashcode
      const response = await axios.post("http://localhost:3001/Hashes", {
        hashcode,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch all hashes for a company
export const fetchCompanyHashes = createAsyncThunk(
  "hashes/fetchByCompany",
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3001/Hashes");
      // console.log("All Hashes:", response.data);
      // console.log("Filtering for Company ID:", companyId);
      const filteredHashes = response.data.filter(
        (hash) => extractCompanyId(hash.hashcode) === companyId
      );
      console.log("Filtered Hashes:", filteredHashes);
      return filteredHashes;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Use hash and assign to employee
export const useHash = createAsyncThunk(
  "hashes/use",
  async ({ hashcode, employeeId = "1" }, { rejectWithValue }) => {
    try {
      // First verify the hash exists
      const hashResponse = await axios.get(
        `http://localhost:3001/Hashes?hashcode=${hashcode}`
      );
      if (!hashResponse.data.length) {
        throw new Error("Invalid hashcode");
      }
      const hash = hashResponse.data[0];

      // Get the current Employee data
      const employeeResponse = await axios.get(
        `http://localhost:3001/Employee/${employeeId}`
      );
      const employee = employeeResponse.data;

      // Update Employee with the hashcode
      const updatedEmployee = await axios.patch(
        `http://localhost:3001/Employee/${employeeId}`,
        {
          hashcode: hashcode,
        }
      );

      // Only delete the hash if the Employee update was successful
      if (updatedEmployee.data) {
        await axios.delete(`http://localhost:3001/Hashes/${hash.id}`);
      }

      return { hash, employee: updatedEmployee.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const hashesSlice = createSlice({
  name: "hashes",
  initialState: {
    items: ["1c6-ad74hp"],
    status: "idle",
    error: null,
    currentHash: null,
  },
  reducers: {
    clearCurrentHash: (state) => {
      state.currentHash = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createHash.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createHash.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
        state.currentHash = action.payload;
        state.error = null;
      })
      .addCase(createHash.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCompanyHashes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanyHashes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCompanyHashes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(useHash.pending, (state) => {
        state.status = "loading";
      })
      .addCase(useHash.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter(
          (hash) => hash.id !== action.payload.hash.id
        );
        state.error = null;
      })
      .addCase(useHash.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCurrentHash } = hashesSlice.actions;
export default hashesSlice.reducer;
