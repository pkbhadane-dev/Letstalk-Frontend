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
import toast from "react-hot-toast";

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
      toast.error(error.message);
    }
  };

  const fetchCount = async () => {
    try {
      dispatch(getUnreadMessageCountThunk());
    } catch (error) {
      toast.error(error.message);
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

    try {
      
      const socket = getSocket();
      if (socket) {
        socket.disconnect();
      }

      await dispatch(userLogoutThunk()).unwrap();

      await persistor.purge();

      // Additional cleanup - clear specific keys from localStorage that might remain
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes("persist") || key.includes("root") || key.includes("auth"))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));

      // Clear all cookies by setting their expiry to past
      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
        if (name) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        }
      });

      // Add a small delay to ensure cleanup completes
      await new Promise((resolve) => setTimeout(resolve, 100));

      toast.success("Logged out successfully");
      // Use hard redirect to ensure clean page reload
      window.location.href = "/login";
    } catch (error) {
      // Even on error, attempt to clear everything and redirect
      await persistor.purge();

      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.includes("persist") || key.includes("root") || key.includes("auth"))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));

      document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
        if (name) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
        }
      });
      window.location.href = "/login";
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
            user.firstname
              .toLowerCase()
              .includes(searchInput?.toLowerCase() || "") ? (
              <UserAvatar key={user._id} user={user} />
            ) : null,
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
