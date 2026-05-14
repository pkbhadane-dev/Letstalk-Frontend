import { useEffect, useState } from "react";
import { userGetProfileThunk } from "../store/slice/user/userThunk";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../store/slice/user/userSlice";

export const useFetchUserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthentication } = useSelector((state) => state.userSlice);
  useEffect(() => {
    if (!isAuthentication) return;

    const fetchData = async () => {
      try {
        const response = await dispatch(userGetProfileThunk());
      } catch (error) {
        toast.error(error.message || "user not fetched");
      }
    };
    fetchData();
  }, [dispatch, isAuthentication]);
};
