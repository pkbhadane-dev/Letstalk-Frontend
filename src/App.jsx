import { useEffect } from "react";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userGetProfileThunk } from "./store/slice/user/userThunk";
import { Outlet } from "react-router-dom";
import { useFetchUserProfile } from "./hooks/useFetchUserProfile";

function App() {

  
    useFetchUserProfile()

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <Outlet />
    </>
  );
}

export default App;
