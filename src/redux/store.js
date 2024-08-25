import { configureStore } from "@reduxjs/toolkit";
import authedUser from "./authedUser";

export const store = configureStore({
  reducer: {
    authedUser
  }
});
