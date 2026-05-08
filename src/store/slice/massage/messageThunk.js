import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../components/utility/axiosInstance";

export const sendmessageThunk = createAsyncThunk(
  "message/post",
  async ({ message, receiverId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/send/${receiverId}`, {
        message,
      });
      return response.data;
    } catch (error) {
     return HandleError(error, rejectWithValue)
    }
  }
);

export const getMessageThunk = createAsyncThunk(
  "message/get",
  async ({ receiverId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/getMessage/${receiverId}`);
      return response.data;
    } catch (error) {
      return HandleError(error, rejectWithValue)
    }
  }
);

export const getUnreadMessageCountThunk = createAsyncThunk(
  "message/getMessageCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/getMessageCount`);
      return response?.data?.responseData;
    } catch (error) {
      return HandleError(error, rejectWithValue)
    }
  }
);

export const putMarkAsReadThunk = createAsyncThunk(
  "message/read",
  async ({receiverId},{ rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/markRead/${receiverId}`);
      return response.data;
    } catch (error) {
      return HandleError(error, rejectWithValue)
    }
  }
);

export const deleteMessageThunk = createAsyncThunk("message/delete", async({messageId}, {rejectWithValue})=>{
try {
  const response = await axiosInstance.delete(`/deleteMessage/${messageId}`)
  return response.data.responseData._id
} catch (error) {
  return HandleError(error, rejectWithValue)
}
})