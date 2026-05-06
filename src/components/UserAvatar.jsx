import { useDispatch, useSelector } from "react-redux";
import { setSelectUser } from "../store/slice/user/userSlice";
import { putMarkAsReadThunk } from "../store/slice/massage/messageThunk";
import { useUserIcon } from "../hooks/useUserIcon";
import { setOpenMsgContainer } from "../store/slice/massage/messageSlice";

export const UserAvatar = ({ user }) => {
  const { unreadCount } = useSelector((state) => state.messageSlice);
  const { onlineUserId } = useSelector((state) => state.socketSlice);
  const { selectedUser } = useSelector((state) => state.userSlice);

  // console.log("unreadCount", unreadCount.responseData);
  // console.log("unreadCount2", unreadCount);

  //for better performance (if arrays are large) use Set method
  // const { otherUsers } = useSelector((state) => state.userSlice);
  // const otherUserId = otherUsers?.map((value) => value._id);
  // const set = new Set(otherUserId);
  // const getOnlineUser = onlineUserId?.filter((id) => set.has(id));
  // console.log(getOnlineUser?.toString());

  const setIcon = useUserIcon(user);

  // const{firstname, lastname} = {user}
  const dispatch = useDispatch();
  const handleOnclick = async () => {
    dispatch(setSelectUser(user));
    dispatch(putMarkAsReadThunk({ receiverId: user?._id }));
  };

  return (
    <>
      <div
        onClick={handleOnclick}
        className={` relative flex items-center gap-5 p-1 hover:bg-base-100 cursor-pointer ${
          user?._id === selectedUser?._id && "bg-gray-800"
        }`}
      >
        <div
          className={`w-10 h-10 ml-1 bg-indigo-500 flex justify-center items-center rounded-full ${
            onlineUserId?.includes(user?._id) && "avatar avatar-online"
          }`}
        >
          {!user?.profilePic ? (
            <span className=" text-2xl text-white">{setIcon}</span>
          ) : (
            <img
              className=" object-cover h-10  rounded-full"
              src={user?.profilePic}
              alt=""
            />
          )}
        </div>

        <div>
          <h1 className=" line-clamp-1">{user?.firstname}</h1>
          <p className="text-sm">{user?.lastname}</p>
        </div>
        <div>
          {unreadCount?.responseData?.length === 0
            ? []
            : unreadCount?.map((value) => (
                <span>{user?._id === value._id && value.count}</span>
              ))}
        </div>
        <div
          onClick={() => dispatch(setOpenMsgContainer(true))}
          className=" absolute visible inset-0 sm:hidden"
        />
      </div>
    </>
  );
};
