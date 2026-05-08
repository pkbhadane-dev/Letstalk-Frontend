import { useEffect, useRef } from "react";
import { MessageContainer } from "../../components/MessageContainer";
import { UserSidebar } from "../../components/UserSidebar";
import { useDispatch, useSelector } from "react-redux";
import { getOnlineUsers } from "../../store/slice/socket/socketSlice";
import { initializeSocket } from "../../store/slice/socket/socket";
import {
  getNewMessage,
  getUnreadMsgCount,
} from "../../store/slice/massage/messageSlice";
import { putMarkAsReadThunk } from "../../store/slice/massage/messageThunk";

export const LetsTalk = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.userSlice);
  const { token } = useSelector((state) => state.userSlice);

  const { selectedChatId } = useSelector((state) => state.messageSlice);

  // use this code for better performance

  const selectedChatIdRef = useRef(selectedChatId);
  useEffect(() => {
    selectedChatIdRef.current = selectedChatId;
  }, [selectedChatId]);

  useEffect(() => {
    if (!token) return;
    const socket = initializeSocket(token);

    socket.on("onlineUser", (onlineUserId) => {
      dispatch(getOnlineUsers(onlineUserId));
    });

    socket.on("newMessage", (newMessage) => {
      if (selectedChatIdRef.current === newMessage.senderId) {
        dispatch(getNewMessage(newMessage));
      }
    });

    socket.on("unreadMsgCount", (unreadMsgCount) => {
      const isSameChat = unreadMsgCount?.some(
        (value) => value._id === selectedChatIdRef.current,
      );

      if (isSameChat) {
        return dispatch(
          putMarkAsReadThunk({ receiverId: selectedChatIdRef.current }),
        );
      }
      dispatch(getUnreadMsgCount(unreadMsgCount));
    });

    return () => {
      socket.off("onlineUser");
      socket.off("newMessage");
      socket.off("unreadMsgCount");
      // socket.disconnect();
    };
  }, [token, dispatch]);

  return (
    <div className="flex">
      <UserSidebar />
      <MessageContainer />
    </div>
  );
};
