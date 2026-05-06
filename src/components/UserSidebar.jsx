import { MdPersonSearch } from "react-icons/md";
import { UserAvatar } from "./UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsersThunk,
  userLogoutThunk,
} from "../store/slice/user/userThunk";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [searchInput, setSearchInput] = useState(null);
  const { otherUsers } = useSelector((state) => state.userSlice);
  const { userProfile } = useSelector((state) => state.userSlice);
  const { selectedUser } = useSelector((state) => state.userSlice);
  const { logoutResponse } = useSelector((state) => state.userSlice);
  const { token } = useSelector((state) => state.userSlice);
  const { openMsgContainer } = useSelector((state) => state.messageSlice);

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

    if (response?.payload.status === 200) {
      const socket = getSocket();
      if (socket) socket.disconnect();
      navigate("/login");
    }
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
   
  };

  return (
    <>
      <div
        className={` ${"w-full" && openMsgContainer ? " hidden w-0" : "visible w-full"} bg-blue-300 sm:w-[21rem] p-2 h-screen flex flex-col gap-1.5`}
      >
        <div className=" bg-base-100 p-2 rounded-sm text-center">
          <p className="text-[19px] bg-gradient-to-r from-indigo-400 to-indigo-800 text-transparent bg-clip-text font-semibold">
            Let's Talk
          </p>
        </div>
        <div>
          <label className="input w-full">
            <MdPersonSearch className="text-2xl" />
            <input
              onChange={handleSearchInput}
              className="text-[17px]"
              type="search"
              required
              placeholder="Search"
            />
          </label>
        </div>
        <div className="h-full flex flex-col gap-1.5 overflow-auto bg-base-300 rounded-sm">
          {otherUsers?.map((user) => 
            user.firstname.toLowerCase().includes(searchInput?.toLowerCase() || "") ? (
              <UserAvatar key={user._id} user={user} />
            ) : null
          )}
        </div>
        <div className=" bg-base-100 rounded-sm flex justify-between items-center p-0.5">
          <UserAvatar key={userProfile?._id} user={userProfile} />

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
