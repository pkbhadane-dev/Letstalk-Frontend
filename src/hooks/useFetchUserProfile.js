import { useEffect } from "react";
import { userGetProfileThunk } from "../store/slice/user/userThunk";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const useFetchUserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(userGetProfileThunk());
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, navigate]);
};
