import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
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
})

export const { increment, decrement, incrementByAmount } = exampleSlice.actions

export default exampleSlice.reducer