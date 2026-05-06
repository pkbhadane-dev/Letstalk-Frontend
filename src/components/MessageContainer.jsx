import { useDispatch, useSelector } from "react-redux";
import { ChatBubble } from "./ChatBubble";
import { UserAvatar } from "./UserAvatar";
import { MessageSend } from "./MessageSend";
import { useEffect, useRef, useState } from "react";
import { getMessageThunk } from "../store/slice/massage/messageThunk";
import { getSocket } from "../store/slice/socket/socket";
import { ScreenLoading } from "./utility/ScreenLoading";
import { Profile } from "../pages/letstalk/Profile";
import { useNavigate } from "react-router-dom";

export const MessageContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { selectedUser } = useSelector((state) => state.userSlice);
  const { userProfile } = useSelector((state) => state.userSlice);
  const { message } = useSelector((state) => state.messageSlice);
  const socket = getSocket();

  // console.log("userProfile", userProfile)
  //   console.log("selectedUser", selectedUser);
  useEffect(() => {
    if (selectedUser) {
      dispatch(getMessageThunk({ receiverId: selectedUser?._id }));
    }
  }, [selectedUser]);

  const [isTyping, setIsTyping] = useState(null);

  const scrollMessage = useRef(null);

  useEffect(() => {
    if (!socket) return;
    socket.on("typing", (sender) => {
      if (sender === selectedUser?._id) {
        setIsTyping(true);
      }
    });

    socket.on("stopTyping", (sender) => {
      if (sender === selectedUser?._id) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, [socket, selectedUser?._id]);

  useEffect(() => {
    scrollMessage.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, isTyping]);

  return (
    <>
      {selectedUser?._id === userProfile?._id ? (
        <div className="flex justify-center items-center w-full">
          {navigate("/profile")}
        </div>
      ) : (
        <div className="h-screen flex flex-col w-full">
          <div className=" border-b border-blue-300 p-1.5">
            {!selectedUser ? (
              <h3 className="p-2 text-2xl">Well-Come</h3>
            ) : (
              selectedUser && <UserAvatar user={selectedUser} />
            )}
          </div>
          {selectedUser ? (
            <div className="px-2 py-3 h-full overflow-auto flex flex-col">
              {message?.map((messageDetail) => {
                return (
                  <ChatBubble
                    key={messageDetail?._id}
                    messageDetail={messageDetail}
                  />
                );
              })}
              {isTyping && (
                <div className="self-start text-white animate-pulse">
                  Typing...
                </div>
              )}
              <div ref={scrollMessage}></div>
            </div>
          ) : (
            <div className="w-full h-full text-center text-2xl">
              {" "}
              select user for chat
            </div>
          )}
          <MessageSend />
        </div>
      )}
    </>
  );
};
