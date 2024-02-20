import { createSlice } from '@reduxjs/toolkit' // to create reducers
import type { PayloadAction } from '@reduxjs/toolkit' 

export interface GlobalState { // to define the state, TypeScript
  mode: "dark" | "light",
  isLoggedIn: boolean,
  user: Object | null
}

const initialState: GlobalState = {
  mode: 'dark',
  isLoggedIn: false,
  user: null
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: { // reducers to update the state
    //Actions:
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark"
    },
    setLogin: (state, action: PayloadAction<Object>) => {
      state.isLoggedIn = true // if there is a token it's going to be true
      state.user = action.payload
    },
    setLogout: (state) => {
      state.isLoggedIn = false // if the token isn't there or expired it's going to be false
      state.user = null 
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMode, setLogin, setLogout } = globalSlice.actions

export default globalSlice.reducer