import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 1,
}

export const pageSlice = createSlice({
  name: 'page_number',
  initialState,
  reducers: {
    clear: (state) => {
      state.value = 1
    },
    incrementByAmount: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { clear, incrementByAmount } = pageSlice.actions

export default pageSlice.reducer