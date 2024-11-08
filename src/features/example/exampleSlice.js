import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const baseApiUrl = "http://localhost:3001/";
const postsApi = baseApiUrl + "posts";

export const fetchFromApi = createAsyncThunk("example/posts", async () => {
  const res = await axios.get(postsApi);
  return res.data;
});

const initialState = {
  value: 0,
  posts: [],
}

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    addOne: (state) => {
      state.value += 1
    },
    minusOne: (state) => {
      state.value -= 1
    },
  },
  extraReducers(builder) {
    builder
    // when fetch return the promise, do the action: update products in state with api payload
    .addCase(fetchFromApi.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
})

export const { addOne, minusOne } = exampleSlice.actions

export default exampleSlice.reducer