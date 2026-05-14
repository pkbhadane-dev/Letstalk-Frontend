import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heading } from "../../components/Heading";
import { useDispatch, useSelector } from "react-redux";
import { userLoginThunk } from "../../store/slice/user/userThunk";
import { resetButtonLoading, resetUserState } from "../../store/slice/user/userSlice";
import { ButtonLoading } from "../../components/utility/ButtonLoading";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { buttonLoading } = useSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(resetButtonLoading());
  }, [dispatch]);

  const handleOnchange = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Reset old user state before attempting new login
    dispatch(resetUserState());
    const response = await dispatch(userLoginThunk(formData));
    if (response?.meta?.requestStatus === "fulfilled") {
      navigate("/letstalk");
    }
  };

  return (
    <>
      <Heading />
      <form onSubmit={handleLogin}>
        <div className="mt-10 w-full flex justify-center">
          <fieldset className=" fieldset bg-gradient-to-bl from-indigo-400 from-20% to-indigo-800 to-80% rounded-box w-md p-4">
            <legend className="fieldset-legend text-3xl ">Login</legend>

            <label className="label text-lg text-white">Email</label>
            <input
              onChange={handleOnchange}
              type="text"
              className="p-2 text-[17px]  border rounded-sm"
              name="email"
              placeholder="enter your email"
            />

            <label className="label text-lg text-white">Password</label>
            <input
              onChange={handleOnchange}
              type="password"
              className="p-2 text-[17px] border rounded-sm"
              name="password"
              placeholder="enter your password"
            />

            <button
              type="submit"
              className="btn bg-gradient-to-tr from-indigo-400 to-indigo-800 border-0  mt-4"
            >
              {buttonLoading ? <ButtonLoading /> : <span>Login</span>}
            </button>
            <p className="text-[14px]">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400 underline">
                Sign up
              </Link>
            </p>
          </fieldset>
        </div>
      </form>
    </>
  );
};
