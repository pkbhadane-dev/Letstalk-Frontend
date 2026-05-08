// import { useSelector } from "react-redux";
import io from "socket.io-client";

let socket = null;

export const initializeSocket = (token) => {
  socket = io(import.meta.env.VITE_SOCKET_URL, {
    auth: {
      token: token,
    },
  });
  return socket;
};

export const getSocket = () => socket;
