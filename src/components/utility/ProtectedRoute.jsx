import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const ProtectedRoute = ({ children }) => {
  const { isAuthentication, token } = useSelector((state) => state.userSlice);
  
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect if not authenticated or if no valid token
    if (!isAuthentication || !token) {
      return navigate('/login');
    }
  }, [isAuthentication, token, navigate]);
  
  return children;
};
