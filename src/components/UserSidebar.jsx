import { MdPersonSearch } from "react-icons/md";
import { UserAvatar } from "./UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsersThunk,
  userLogoutThunk,
} from "../store/slice/user/userThunk";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUnreadMessageCountThunk } from "../store/slice/massage/messageThunk";
import { getSocket, initializeSocket } from "../store/slice/socket/socket";
import {
  getUnreadMsgCount,
  setSelectedChat,
} from "../store/slice/massage/messageSlice";
import { persistor } from "../store/store";

export const UserSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otherUsers } = useSelector((state) => state.userSlice);
  const { userProfile } = useSelector((state) => state.userSlice);
  const { selectedUser } = useSelector((state) => state.userSlice);
  const { logoutResponse } = useSelector((state) => state.userSlice);
  const { token } = useSelector((state) => state.userSlice);
  const fetchData = async () => {
    try {
      dispatch(getOtherUsersThunk());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCount = async () => {
    try {
      dispatch(getUnreadMessageCountThunk());
    } catch (error) {
      console.log(error);
    }
  };

  //  fetchData()
  // useEffect(() => {
  //   const socket = getSocket();

  //   socket.on("unreadMsgCount", (unreadMsgCount) => {
  //     console.log(unreadMsgCount);
  //     dispatch(getUnreadMsgCount(unreadMsgCount));
  //   });
  // }, []);

  useEffect(() => {
    fetchData();
    fetchCount();
  }, []);
  useEffect(() => {
    dispatch(setSelectedChat(selectedUser?._id));
  }, [selectedUser]);

  const handleLogout = async (e) => {
    e.preventDefault();

    const response = await dispatch(userLogoutThunk());

    await persistor.purge();
    console.log(response.payload.status);

    if (response?.payload.status === 200) {
      const socket = getSocket();
      if (socket) socket.disconnect();
      console.log("loged out");

      navigate("/login");
    }
  };
  return (
    <>
      <div className="bg-blue-300 w-[21rem] p-2 h-screen flex flex-col gap-1.5">
        <div className=" bg-base-100 p-2 rounded-sm text-center">
          <p className="text-[19px] bg-gradient-to-r from-indigo-400 to-indigo-800 text-transparent bg-clip-text font-semibold">
            Let's Talk
          </p>
        </div>
        <div>
          <label className="input">
            <MdPersonSearch className="text-2xl" />
            <input
              className="text-[17px]"
              type="search"
              required
              placeholder="Search"
            />
          </label>
        </div>
        <div className="h-full flex flex-col gap-1.5 overflow-auto bg-base-300 rounded-sm">
          {otherUsers?.map((user) => (
            <UserAvatar key={user._id} user={user} />
          ))}
        </div>
        <div className=" bg-base-100 rounded-sm flex justify-between items-center p-0.5">
          <UserAvatar
            onClick={console.log("click")}
            key={userProfile?._id}
            user={userProfile}
          />

          <form onSubmit={handleLogout}>
            <button
              type="submit"
              className="bg-blue-400 px-3 mx-2.5 cursor-pointer rounded-sm h-8"
            >
              LogOut
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
