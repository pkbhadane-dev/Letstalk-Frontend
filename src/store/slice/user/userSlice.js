import { createSlice } from "@reduxjs/toolkit";
import {
  getOtherUsersThunk,
  setUserAboutThunk,
  updateProfilePicThunk,
  userGetProfileThunk,
  userLoginThunk,
  userLogoutThunk,
  userSignupThunk,
} from "../user/userThunk";
import { toast } from "react-hot-toast";

const initialState = {
  isAuthentication: false,
  buttonLoading: false,
  screenLoading: true,
  token: null,
  userProfile: null,
  otherUsers: null,
  image: null,
  selectedUser: null,
  error: false,
  logoutResponse: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    resetButtonLoading: (state) => {
      state.buttonLoading = false;
    },
  },

  extraReducers: (builder) => {
    //Login Thunk

    builder.addCase(userLoginThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(userLoginThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData;
      state.token = action.payload?.responseData.token;

      toast.success("login successfull");
      state.isAuthentication = true;
      state.screenLoading = false;
      state.buttonLoading = false;
    });
    builder.addCase(userLoginThunk.rejected, (state, action) => {
      toast.error(action.payload);
      state.screenLoading = false;
      state.buttonLoading = false;
    });

    // Signup Thunk

    builder.addCase(userSignupThunk.pending, (state, action) => {});
    builder.addCase(userSignupThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData;
      state.isAuthentication = true;
      state.screenLoading = false;
      toast.success("signup successfull");
    });
    builder.addCase(userSignupThunk.rejected, (state, action) => {
      toast.error(action.payload);
    });

    //Logout Thunk

    builder.addCase(userLogoutThunk.pending, (state, action) => {});
    builder.addCase(userLogoutThunk.fulfilled, (state, action) => {
      state.userProfile = null;
      state.isAuthentication = false;
      state.selectedUser = null;
      state.logoutResponse = action.payload;
    });
    builder.addCase(userLogoutThunk.rejected, (state, action) => {
      toast.error(action.payload);
    });

    // get profile

    builder.addCase(userGetProfileThunk.pending, (state, action) => {
      state.screenLoading = true;
    });
    builder.addCase(userGetProfileThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData;
      state.isAuthentication = true;
      state.screenLoading = false;
    });
    builder.addCase(userGetProfileThunk.rejected, (state, action) => {
      state.isAuthentication = false;
      state.screenLoading = false;
      toast.error(action.payload);
    });

    // get other profile users

    builder.addCase(getOtherUsersThunk.pending, (state, action) => {});
    builder.addCase(getOtherUsersThunk.fulfilled, (state, action) => {
      state.otherUsers = action.payload?.responseData;
    });
    builder.addCase(getOtherUsersThunk.rejected, (state, action) => {
      toast.error(action.payload);
    });

    // user profile picture update

    builder.addCase(updateProfilePicThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(updateProfilePicThunk.fulfilled, (state, action) => {
      state.userProfile.profilePic = action.payload;
      state.buttonLoading = false;
      toast.success("Image Update");
    });
    builder.addCase(updateProfilePicThunk.rejected, (state, action) => {
      toast.error(action.payload);
      state.buttonLoading = false;
    });

    // get user about

    builder.addCase(setUserAboutThunk.pending, (state, action) => {
      state.buttonLoading = true;
    });
    builder.addCase(setUserAboutThunk.fulfilled, (state, action) => {
      state.userProfile.about = action.payload;
      state.buttonLoading = false;
      toast.success("About section update");
    });
    builder.addCase(setUserAboutThunk.rejected, (state, action) => {
      state.buttonLoading = false;
      toast.error(action.payload);
    });
  },
});

export const { setSelectUser, setAboutEditBtn, resetButtonLoading } = userSlice.actions;

export default userSlice.reducer;
