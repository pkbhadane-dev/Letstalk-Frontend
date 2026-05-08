import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const initialState = { onlineUserId: null, isTyping: null };

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    getOnlineUsers: (state, action) => {
      state.onlineUserId = action.payload;
    },
    setIsTyping: (state, action) => {
      state.isTyping = action.payload;
    },
  },
});

export const { getOnlineUsers, setIsTyping } = socketSlice.actions;
export default socketSlice.reducer;
