import { createSlice } from "@reduxjs/toolkit";
import {
  getMessageThunk,
  getUnreadMessageCountThunk,
  // getUnreadMessageCountThunk,
  putMarkAsReadThunk,
  sendmessageThunk,
} from "./messageThunk";

const initialState = {
  isButtonLoading: false,
  message: null,
  selectedChatId: null,
  unreadCount: null,
  screenLoading: false,
};
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    getNewMessage: (state, action) => {
      const oldMessage = state.message ?? [];
      state.message = [...oldMessage, action.payload];
    },
    getUnreadMsgCount: (state, action) => {
      state.unreadCount = action.payload || [];
    },
    setSelectedChat: (state, action) => {
      state.selectedChatId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //send message

    builder.addCase(sendmessageThunk.pending, (state, action) => {
      state.isButtonLoading = true;
    });
    builder.addCase(sendmessageThunk.fulfilled, (state, action) => {
      state.isButtonLoading = false;
      const oldMessage = state.message ?? [];
      state.message = [...oldMessage, action.payload?.responseData];
    });
    builder.addCase(sendmessageThunk.rejected, (state, action) => {
      // console.log(action.payload);
      state.isButtonLoading = false;
    });

    //get message

    builder.addCase(getMessageThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      state.message = action.payload?.responseData?.messages;
      state.screenLoading = false;
      // console.log(state.message);
    });
    builder.addCase(getMessageThunk.rejected, (state, action) => {
      console.log(action.payload);
    });

    // update message

    builder.addCase(putMarkAsReadThunk.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(putMarkAsReadThunk.fulfilled, (state, action) => {
      state.unreadCount = action.payload
    });
    builder.addCase(putMarkAsReadThunk.rejected, (state, action) => {
      console.log("reject");
      console.log(action.payload);
    });

    builder.addCase(getUnreadMessageCountThunk.pending, (state, action) => {
      // console.log("pending");
    });
    builder.addCase(getUnreadMessageCountThunk.fulfilled, (state, action) => {
      state.unreadCount = action.payload;
    });
    builder.addCase(getUnreadMessageCountThunk.rejected, (state, action) => {
      console.log("reject", action.payload);
    });
  },
});
export const { getNewMessage, getUnreadMsgCount, setSelectedChat } =
  messageSlice.actions;

export default messageSlice.reducer;
