import { useDispatch, useSelector } from "react-redux";
import { useFetchUserProfile } from "../../hooks/useFetchUserProfile";
import { FcCancel, FcGallery } from "react-icons/fc";
import { FaCross, FaEdit } from "react-icons/fa";
import { useUserIcon } from "../../hooks/useUserIcon";
import { useState } from "react";
// import { axiosInstance } from "../../components/utility/axiosInstance";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { updateProfilePic } from "../../store/slice/user/userSlice";
import {
  setUserAboutThunk,
  updateProfilePicThunk,
} from "../../store/slice/user/userThunk";
import { ButtonLoading } from "../../components/utility/ButtonLoading";
import { setAboutEditBtn, setSelectUser } from "../../store/slice/user/userSlice";
import { BiCross } from "react-icons/bi";
import { CgCross } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const dispatch = useDispatch();
  useFetchUserProfile();
  const navigate = useNavigate();
  const { userProfile } = useSelector((state) => state.userSlice);
  const { buttonLoading } = useSelector((state) => state.userSlice);
  const [editAbout, setEditAbout] = useState(null);
  const [aboutEditBtn, setAboutEditBtn] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  const setIcon = useUserIcon(userProfile);

  if (!userProfile) return <h1 className="text-2xl text-center">Loading</h1>;

  const { email, firstname, lastname } = userProfile;

  // const [image, setImage] = useState("");
  // console.log("image", image);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    // setImage(URL.createObjectURL(file));
  };

  const handleEditBtn = (e) => {
    e.preventDefault();
    setAboutEditBtn(true);
  };
  const handleAboutOnchange = (e) => {
    setEditAbout(e.target.value);
  };

  const handleAboutSubmit = (e) => {
    e.preventDefault();
    if (!editAbout) return;
    // console.log(editAbout);

    dispatch(setUserAboutThunk({ about: editAbout }));
    setAboutEditBtn(false);
  };

  const handleCancle = (e) => {
    e.preventDefault()
    navigate("/letstalk")
    dispatch(setSelectUser(null))
  }

  const handleProfilePicSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("hello");

      if (!profilePic) return;

      const formData = new FormData(); // Here we use FormData because we send image file to backend image file is binary
      formData.append("image", profilePic);

      // const res = await axiosInstance.post("/uploadProfilePic", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });
      // console.log("hiii");
      // console.log(res.data.responseData);
      dispatch(updateProfilePicThunk(formData));
    } catch (error) {
      console.log("image update fail", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className=" relative w-[90%] md:w-2xl p-2.5 bg-gradient-to-bl from-slate-700 from-20% to-slate-800 to-80% flex flex-col gap-2 items-center justify-center rounded-md">
        <div className=" relative group flex flex-col justify-center items-center">
          <div className=" absolute inset-0 rounded-2xl overflow-hidden opacity-0 hover:opacity-100 bg-linear-to-b from-gray-500/70 to-transparent transition-all duration-300 flex justify-center items-center">
            <form>
              <input type="file" id="profilePic" hidden />
              <label htmlFor="profilePic">
                <FcGallery
                  className=" cursor-pointer hover:scale-110 duration-300"
                  size={30}
                />
              </label>
            </form>
          </div>
          {userProfile?.profilePic ? (
            <img
              className=" w-40 h-40 rounded-2xl object-cover"
              src={userProfile?.profilePic}
              alt="ProfilePicture"
            />
          ) : (
            <span className="w-40 h-40 flex justify-center items-center text-6xl bg-indigo-400 rounded-2xl font-semibold ">
              {setIcon}
            </span>
          )}
        </div>

        <div>
          <p className="text-center">
            {firstname} {lastname}
          </p>
          <p className="text-center">{email}</p>
        </div>
        <form
          onSubmit={handleAboutSubmit}
          className="w-full h-3/4 flex  flex-col justify-center items-center p-2.5"
        >
          <p className="text-center bg-indigo-600 rounded-md mb-2.5 w-20 m-auto m">
            About
          </p>
          {aboutEditBtn ? (
            <>
              <textarea
                onChange={handleAboutOnchange}
                className="w-3/4 h-full p-2.5 border-2 rounded-2xl resize-none"
                name="about"
                id=""
                placeholder="write about yourself"
              ></textarea>
              <div className="space-x-5">
                <button
                  type="submit"
                  className="bg-indigo-700 px-3 mt-2.5 rounded-md"
                >
                  {buttonLoading ? <ButtonLoading /> : "Update"}
                </button>
                <button
                  onClick={() => setAboutEditBtn(false)}
                  className="bg-indigo-700 px-3 mt-2.5 rounded-md"
                >
                  Cancle
                </button>
              </div>
            </>
          ) : (
            <div className="w-3/4 h-full p-2.5 border flex flex-col-reverse rounded-2xl font-medium text-[19px]">
              <p className=" break-all">{userProfile?.about}</p>
              <button
                className=" text-2xl flex justify-end cursor-pointer"
                onClick={handleEditBtn}
              >
                <FaEdit />{" "}
              </button>
            </div>
          )}
        </form>
        <span className=" absolute top-0 right-0 py-2 px-2 cursor-pointer hover:scale-110 duration-300">
          <RxCross2
            size={25}
            onClick={handleCancle}
          />
        </span>
      </div>
    </div>
  );
};
