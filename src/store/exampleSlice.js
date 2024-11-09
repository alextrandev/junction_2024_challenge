import { createSlice } from '@reduxjs/toolkit'
import { fetchFromApi } from '../api/jsonApi';

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