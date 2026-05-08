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
import { setOpenMsgContainer } from "../store/slice/massage/messageSlice";

export const MessageContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [goToProfilePage, setGoToProfilePage] = useState(false);
  const { selectedUser } = useSelector((state) => state.userSlice);
  const { userProfile } = useSelector((state) => state.userSlice);
  const { message } = useSelector((state) => state.messageSlice);
  const { openMsgContainer } = useSelector((state) => state.messageSlice);
  const { screenLoading } = useSelector((state) => state.messageSlice);
  const socket = getSocket();

 useEffect(() => {
  if (selectedUser?._id && userProfile?._id) {
    if (selectedUser._id === userProfile._id) {
      navigate("/profile");
    }
  }
}, [selectedUser, userProfile, navigate]);

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
      
        <div
          className={` ${openMsgContainer ? " visible w-full" : " hidden w-0"} relative h-screen sm:flex flex-col sm:w-full`}
        >
          <div className=" border-b border-blue-300 p-1.5">
            {!selectedUser ? (
              <h3 className="p-2 text-2xl">Well-Come</h3>
            ) : (
              selectedUser && <UserAvatar user={selectedUser} />
            )}
          </div>
          {selectedUser ? (
            (screenLoading && <ScreenLoading />) || (
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
            )
          ) : (
            <div className="w-full h-full text-center text-2xl">
              {" "}
              select user for chat
            </div>
          )}
          <MessageSend />
          <div
            onClick={() => dispatch(setOpenMsgContainer(false))}
            className="py-2 px-2 m-3 visible sm:hidden rounded-md text-indigo-400 font-semibold bg-gray-700 fixed right-0 top-0"
          >
            Back
          </div>
        </div>
      
    </>
  );
};
