import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slice/user/userSlice";
import messageSlice from "./slice/massage/messageSlice";
import socketSlice from "./slice/socket/socketSlice"
export const rootReducer = combineReducers({
  userSlice,
  messageSlice,
  socketSlice
});
