import { createSlice } from "@reduxjs/toolkit";

export const authedUser = createSlice({
  name: "authedUser",
  initialState: {
    user: null
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {};
    }
  }
});

export const { setUser, logout } = authedUser.actions;
export default authedUser.reducer;
