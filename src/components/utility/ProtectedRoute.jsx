import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export const ProtectedRoute = ({ children }) => {
  const {isAuthentication} = useSelector((state) => state.userSlice);
  
  const navigate = useNavigate();
  useEffect(()=>{
    
    if (!isAuthentication) {
      return navigate('/login')
    }
  },[ isAuthentication])
  
  return children
};
