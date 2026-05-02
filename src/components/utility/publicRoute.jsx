import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ScreenLoading } from "./ScreenLoading";

export const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthentication, screenLoading } = useSelector(
    (state) => state.userSlice
  );

  useEffect(() => {
    if (isAuthentication) {
      return navigate("/letstalk");
    }
  }, [isAuthentication]);

  // if (screenLoading || isAuthentication) {
  //   return <ScreenLoading />;
  // }

  return children;
};
