import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthState = {
  username: null | string;
  role: null | string;
};

const initialState: TAuthState = {
  username: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state: any,
      action: PayloadAction<{ username: string; role: string }>
    ) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
      console.log("setUser:", {
        username: state.username,
        role: state.role,
      });
    },
    logOut: (state: any) => {
      console.log("logOut:", {
        username: state.username,
        role: state.role,
      });
      state.username = null;
      state.role = null;
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
