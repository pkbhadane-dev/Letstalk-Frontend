import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../components/utility/axiosInstance";

export const userLoginThunk = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/login", { email, password });
      return response.data;
    } catch (error) {
      const errMessage = error?.response?.data?.errors[0]?.msg; //validation err
      const customErrMessage = error?.response?.data?.errors; // custom err
      const networkError = error?.message;
      return rejectWithValue(errMessage || customErrMessage || networkError);
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
      const errorMassege = error?.response?.data?.errors[0]?.msg; //validation error
      const customErrMessage = error?.response?.data?.errors; // custom error
      return rejectWithValue(errorMassege || customErrMessage);
    }
  },
);

export const userLogoutThunk = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axiosInstance.post("/logout");
    console.log("response from logoutthunk", response.data);  
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const userGetProfileThunk = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/getprofile");
      // console.log("from userGetProfileThunk", response);

      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.message || "Profile fetch failed",
      );
    }
  },
);

export const getOtherUsersThunk = createAsyncThunk(
  "user/otherUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/otherUsers");
      // console.log(response);

      return response?.data;
    } catch (error) {
      console.log(error);
      const errorMassege = error?.response?.data?.errors[0]?.msg; //validation error
      const customErrMessage = error?.response?.data?.errors; // custom error
      const networkError = error?.message;
      return rejectWithValue(errorMassege || customErrMessage || networkError);
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
      console.log(error);
      rejectWithValue(error.message);
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
      // console.log(response.data);

      return response.data?.responseData;
    } catch (error) {
      console.log(error);
      rejectWithValue(error);
    }
  },
);
