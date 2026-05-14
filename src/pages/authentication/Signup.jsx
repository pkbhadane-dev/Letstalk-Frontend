import { Link, useNavigate } from "react-router-dom";
import { Heading } from "../../components/Heading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignupThunk } from "../../store/slice/user/userThunk";
import { resetButtonLoading } from "../../store/slice/user/userSlice";
import { ButtonLoading } from "../../components/utility/ButtonLoading";

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
  });

  const { buttonLoading } = useSelector((state) => state.userSlice);

  useEffect(() => {
    dispatch(resetButtonLoading());
  }, [dispatch]);

  const handleOnChange = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await dispatch(userSignupThunk(formData));
    if (response?.meta?.requestStatus === "fulfilled") {
      setTimeout(() => {
        navigate("/letstalk");
      }, 100);
    }
  };

  return (
    <>
      <Heading />
      <form onSubmit={handleSignup}>
        <div className="mt-10 w-full flex justify-center">
          <fieldset className=" fieldset bg-gradient-to-bl from-indigo-400 from-20% to-indigo-800 to-80% rounded-box w-md p-5">
            <legend className="fieldset-legend text-3xl ">SignUp</legend>

            <label className="label text-lg text-white">Firstname</label>
            <input
              onChange={handleOnChange}
              type="text"
              className="p-2 text-[17px]  border rounded-sm"
              name="firstname"
              placeholder="Enter your firstname"
            />

            <label className="label text-lg text-white">Lastname</label>
            <input
              onChange={handleOnChange}
              type="text"
              className="p-2 text-[17px]  border rounded-sm"
              name="lastname"
              placeholder="Enter your lastname"
            />

            <label className="label text-lg text-white">Email</label>
            <input
              onChange={handleOnChange}
              type="email"
              className="p-2 text-[17px] border rounded-sm"
              name="email"
              placeholder="Enter your email"
            />

            <label className="label text-lg text-white">Password</label>
            <input
              onChange={handleOnChange}
              type="password"
              className="p-2 text-[17px] border rounded-sm"
              name="password"
              placeholder="Enter your password"
            />

            <label className="label text-lg text-white">Conform Password</label>
            <input
              onChange={handleOnChange}
              type="password"
              className="p-2 text-[17px] border rounded-sm"
              name="conform password"
              placeholder="Conform your password"
            />

            <span className="text-lg">Gender</span>
            <div className=" border-[1px] rounded border-white">
              <label
                className="label text-[15px] text-white m-2"
                htmlFor="male"
              >
                Male
              </label>
              <input
                onChange={handleOnChange}
                type="radio"
                name="gender"
                value="Male"
                id="male"
              />
              <label
                className="label text-[15px] text-white m-2"
                htmlFor="female"
              >
                Female
              </label>
              <input type="radio" name="gender" value="Female" id="female" />
            </div>

            <button
              type="submit"
              className="btn bg-gradient-to-tr from-indigo-400 to-indigo-800 border-0  mt-4"
            >
              {buttonLoading ? <ButtonLoading /> : <span>Signup</span>}
            </button>
            <p className="text-[14px]">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 underline">
                Login
              </Link>
            </p>
          </fieldset>
        </div>
      </form>
    </>
  );
};
