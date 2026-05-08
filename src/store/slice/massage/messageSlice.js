import { createSlice } from "@reduxjs/toolkit";
import {
  deleteMessageThunk,
  getMessageThunk,
  getUnreadMessageCountThunk,
  putMarkAsReadThunk,
  sendmessageThunk,
} from "./messageThunk";
import toast from "react-hot-toast";

const initialState = {
  isButtonLoading: false,
  message: null,
  selectedChatId: null,
  unreadCount: null,
  screenLoading: false,
  openMsgContainer: false,
  deleteMessageResponse: null,
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
    // for small screen size
    setOpenMsgContainer: (state, action) => {
      state.openMsgContainer = action.payload;
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
      state.isButtonLoading = false;
      toast.error(action.payload);
    });

    //get message

    builder.addCase(getMessageThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      state.message = action.payload?.responseData?.messages;

      state.screenLoading = false;
    });
    builder.addCase(getMessageThunk.rejected, (state, action) => {
      toast.error(action.payload);
    });

    // update message

    builder.addCase(putMarkAsReadThunk.pending, (state, action) => {});
    builder.addCase(putMarkAsReadThunk.fulfilled, (state, action) => {
      state.unreadCount = action.payload;
    });
    builder.addCase(putMarkAsReadThunk.rejected, (state, action) => {
      toast.error(action.payload);
    });

    builder.addCase(getUnreadMessageCountThunk.pending, (state, action) => {});
    builder.addCase(getUnreadMessageCountThunk.fulfilled, (state, action) => {
      state.unreadCount = action.payload;
    });
    builder.addCase(getUnreadMessageCountThunk.rejected, (state, action) => {
      toast.error(action.payload);
    });

    builder.addCase(deleteMessageThunk.pending, (state, action) => {});
    builder.addCase(deleteMessageThunk.fulfilled, (state, action) => {
      if (state.message) {
        state.message = state.message.filter(
          (msg) => String(msg._id) !== String(action.payload),
        );
      }
    });
    builder.addCase(deleteMessageThunk.rejected, (state, action) => {
      toast.error("reject", action.payload);
    });
  },
});
export const {
  getNewMessage,
  getUnreadMsgCount,
  setSelectedChat,
  setOpenMsgContainer,
} = messageSlice.actions;

export default messageSlice.reducer;
