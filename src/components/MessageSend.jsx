import { BsSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { sendmessageThunk } from "../store/slice/massage/messageThunk";
import { useEffect, useState } from "react";
import { getSocket } from "../store/slice/socket/socket";

export const MessageSend = () => {
  const dispatch = useDispatch();
  const socket = getSocket();
  const { selectedUser } = useSelector((state) => state.userSlice);
  const { userProfile } = useSelector((state) => state.userSlice);
  const [value, setValue] = useState({
    message: "",
    receiverId: "",
  });
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleOnChange = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      receiverId: selectedUser?._id,
    }));

    socket.emit("typing", {
      receiver: selectedUser?._id,
      sender: userProfile?._id,
    });
    if (typingTimeout) clearTimeout(typingTimeout);
    const timer = setTimeout(() => {
      socket.emit("stopTyping", {
        receiver: selectedUser?._id,
        sender: userProfile?._id,
      });
    }, 2000);

    setTypingTimeout(timer);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(sendmessageThunk(value));
    e.target.value = "";
    setValue((prev) => ({
      ...prev,
      message: "",
    }));
  };

  return (
    <div className="bg-base-300 p-3">
      <form onSubmit={handleOnSubmit} className="flex gap-2">
        <input
          value={value.message}
          onChange={handleOnChange}
          className="bg-base-100 w-full rounded-sm p-3"
          type="text"
          name="message"
          placeholder="Type Here"
        />
        <button
          type="submit"
          className=" w-12 hover:bg-blue-500 flex items-center justify-center cursor-pointer rounded-sm bg-blue-400"
        >
          <BsSendFill />
        </button>
      </form>
    </div>
  );
};
