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
      const hashcode = generateHash(companyId);
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
      // We'll extract company ID from each hash to filter
      const response = await axios.get("http://localhost:3001/Hashes");
      return response.data.filter(
        (hash) => extractCompanyId(hash.hashcode) === companyId
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Use hash and assign to employee
export const useHash = createAsyncThunk(
  "hashes/use",
  async ({ hashcode, employeeId }, { rejectWithValue }) => {
    try {
      const hashResponse = await axios.get(
        `http://localhost:3001/Hashes?hashcode=${hashcode}`
      );
      if (!hashResponse.data.length) {
        throw new Error("Invalid hashcode");
      }

      const hash = hashResponse.data[0];

      // Delete hash from Hashes array
      await axios.delete(`http://localhost:3001/Hashes/${hash.id}`);

      // Update employee with hashcode
      const response = await axios.patch(
        `http://localhost:3001/Employee/${employeeId}`,
        {
          hashcode: hashcode,
        }
      );

      return { hash, employee: response.data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const hashesSlice = createSlice({
  name: "hashes",
  initialState: {
    items: [],
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
