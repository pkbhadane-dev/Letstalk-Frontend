import { useSelector } from "react-redux";

export const ChatBubble = ({ messageDetail }) => {
  const { userProfile } = useSelector((state) => state.userSlice);
  // const { isTyping } = useSelector((state) => state.socketReducer);
  // console.log(isTyping);

  const userId = userProfile?._id;
  const senderId = messageDetail?.senderId;
  const receiverId = messageDetail?.receiverId;
  // console.log("userId", userId , "senderId", senderId);

  return (
    <>
      <div
        className={`${
          userId === senderId ? "chat chat-end" : "chat chat-start"
        }`}
      >
        <div className="chat-bubble chat-bubble-primary text-sm leading-tight sm:text-md sm:max-w-72 break-all">
          {messageDetail.message}
        </div>
        
      </div>
    </>
  );
};
