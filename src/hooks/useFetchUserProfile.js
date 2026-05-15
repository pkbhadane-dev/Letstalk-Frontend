import { useEffect, useState } from "react";
import { userGetProfileThunk } from "../store/slice/user/userThunk";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSlice } from "../store/slice/user/userSlice";
import toast from "react-hot-toast";

export const useFetchUserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthentication, userProfile } = useSelector((state) => state.userSlice);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!isAuthentication) {
      setHasFetched(false);
      return;
    }

    // Only fetch if we haven't fetched yet or if userProfile is null
    if (hasFetched && userProfile) return;

    const fetchData = async () => {
      try {
        await dispatch(userGetProfileThunk());
        setHasFetched(true);
      } catch (error) {
        toast.error(error.message || "user not fetched");
      }
    };
    fetchData();
  }, [dispatch, isAuthentication, userProfile, hasFetched]);
};
