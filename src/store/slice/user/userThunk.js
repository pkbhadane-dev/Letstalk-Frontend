import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../components/utility/axiosInstance";
import { HandleError } from "../../../components/utility/handleErrors";

export const userLoginThunk = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/login", { email, password });
      return response.data;
    } catch (error) {
      return HandleError(error, rejectWithValue);
      // const errMessage = error?.response?.data?.errors[0]?.msg; //validation err
      // const customErrMessage = error?.response?.data?.errors; // custom err
      // const networkError = error?.message;
      // return rejectWithValue(errMessage || customErrMessage || networkError);
    }
  },
);

export const userSignupThunk = createAsyncThunk(
  "user/signup",
  async (
    { firstname, lastname, email, password, gender },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post("/signup", {
        firstname,
        lastname,
        password,
        email,
        gender,
      });
      return response.data;
    } catch (error) {
      return HandleError(error, rejectWithValue);
      // const errorMassege = error?.response?.data?.errors[0]?.msg; //validation error
      // const customErrMessage = error?.response?.data?.errors; // custom error
      // return rejectWithValue(errorMassege || customErrMessage);
    }
  },
);

export const userLogoutThunk = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axiosInstance.post("/logout");
    return response.data;
  } catch (error) {
    return HandleError(error, rejectWithValue);
  }
});

export const userGetProfileThunk = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/getprofile");
      return response.data;
    } catch (error) {
      return HandleError(error, rejectWithValue);
    }
  },
);

export const getOtherUsersThunk = createAsyncThunk(
  "user/otherUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/otherUsers");
      return response?.data;
    } catch (error) {
      return HandleError(error, rejectWithValue);
    }
  },
);

export const updateProfilePicThunk = createAsyncThunk(
  "user/updatePicProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/uploadProfilePic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data?.responseData;
    } catch (error) {
      return HandleError(error, rejectWithValue);
    }
  },
);

export const setUserAboutThunk = createAsyncThunk(
  "user/about",
  async ({ about: editAbout }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/setAbout", {
        about: editAbout,
      });

      return response.data?.responseData;
    } catch (error) {
      return HandleError(error, rejectWithValue);
    }
  },
);
