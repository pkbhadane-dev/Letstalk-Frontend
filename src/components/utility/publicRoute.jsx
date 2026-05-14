import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ScreenLoading } from "./ScreenLoading";

export const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthentication, token, screenLoading } = useSelector(
    (state) => state.userSlice
  );

  useEffect(() => {
    // If authenticated with a valid token, redirect to letstalk
    if (isAuthentication && token) {
      return navigate("/letstalk");
    }
  }, [isAuthentication, token, navigate]);

  // if (screenLoading || isAuthentication) {
  //   return <ScreenLoading />;
  // }

  return children;
};
