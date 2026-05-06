import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../components/utility/axiosInstance";

export const sendmessageThunk = createAsyncThunk(
  "message/post",
  async ({ message, receiverId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/send/${receiverId}`, {
        message,
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
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
      console.log(error);
      rejectWithValue(error);
    }
  }
);

export const getUnreadMessageCountThunk = createAsyncThunk(
  "message/getMessageCount",
  async (_, { rejectWithValue }) => {
    try {
      // console.log("receiverId", receiverId);

      const response = await axiosInstance.get(`/getMessageCount`);
      return response?.data?.responseData;
    } catch (error) {
      console.error(error);
      return rejectWithValue({
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });
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
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
