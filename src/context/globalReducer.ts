import { createSlice } from '@reduxjs/toolkit' // to create reducers
import type { PayloadAction } from '@reduxjs/toolkit' 


interface User {
  clientId: number;
}

export interface GlobalState { // to define the state, TypeScript
  mode: "dark" | "light" | "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia" | "protanomaly" | "deuteranomaly" | "tritanomaly" | "achromatomaly",
  isLoggedIn: boolean,
  user: User | null
}

type mode = "dark" | "light" | "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia" | "protanomaly" | "deuteranomaly" | "tritanomaly" | "achromatomaly"

type SetInitials = {
  isLoggedIn: boolean
  user: User | null
}
const initialState: GlobalState = {
  mode: 'dark',
  isLoggedIn: false, // if the token isn't there or expired it's going to be false
  user: null
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: { // reducers to update the state
    //Actions:
    setInitialLogin: (state, action: PayloadAction<SetInitials>) => {
      console.log("setInitialLogin", action.payload);
      state.isLoggedIn = action.payload.isLoggedIn;
      state.user = action.payload.user;
    },
    setMode: (state, action: PayloadAction<mode>) => {
      // state.mode = state.mode === "dark" ? "light" : "dark"*
      state.mode = action.payload
    },
    setLogin: (state, action: PayloadAction<User>) => {
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
export const { setInitialLogin, setMode, setLogin, setLogout } = globalSlice.actions

export default globalSlice.reducer