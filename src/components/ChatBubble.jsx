import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessageThunk } from "../store/slice/massage/messageThunk";

export const ChatBubble = ({ messageDetail }) => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.userSlice);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const userId = userProfile?._id;
  const senderId = messageDetail?.senderId;
  const receiverId = messageDetail?.receiverId;
  
  return (
    <>
      <div
        className={`${
          userId === senderId ? "chat chat-end" : "chat chat-start"
        }`}
      >
        <div className="relative chat-bubble chat-bubble-primary text-sm leading-tight sm:text-md sm:max-w-72 break-all">
          <div className={`${userId === senderId && "pt-2"}`}>
            {messageDetail?.message}
          </div>
          {userId === senderId && (
            <>
              <span
                onClick={() => setShowDeleteBtn(!showDeleteBtn)}
                className=" absolute top-0 left-0 px-2 z-10"
              >
                <BsThreeDots size={15} />
              </span>
              <div>
                <button
                  onClick={() =>
                    dispatch(
                      deleteMessageThunk({ messageId: messageDetail?._id }),
                    )
                  }
                  className={` ${showDeleteBtn ? "opacity-100" : "opacity-0"} bg-linear-to-t from-red-400 to-red-300 absolute inset-1 rounded-sm`}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
