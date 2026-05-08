import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  isEmployLoginIn:boolean;
  isadminLoginIn:boolean;
  user: any | null;
  employUser: any | null;
  
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  isEmployLoginIn:false,
  employUser:null,
  isadminLoginIn:false

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      window.location.href='/'
    },
    employlogin: (state, action: PayloadAction<any>) => {
      state.isEmployLoginIn = true;
      state.employUser = action.payload;
    },
    adminlogin: (state, action: PayloadAction<any>) => {
      state.isadminLoginIn = true;
    },
    adminLogoout: (state) => {
      state.isadminLoginIn = false;
    },
    employLogOut: (state, action: PayloadAction<any>) => {
      state.isEmployLoginIn = false;
      state.employUser = null;
    },
  },
});

export const { login, logout,employlogin,adminlogin,adminLogoout,employLogOut } = authSlice.actions;
export default authSlice.reducer;
