import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  posts: [],
};

export const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    addOne: (state) => {
      state.value += 1;
    },
    minusOne: (state) => {
      state.value -= 1;
    },
  },
  extraReducers() {},
});

export const { addOne, minusOne } = exampleSlice.actions;

export default exampleSlice.reducer;
