// import { useSelector } from "react-redux";
import io from "socket.io-client";

let socket = null;

export const initializeSocket = (token) => {
  socket = io("http://localhost:3000/", {
    auth: {
      token: token,
    },
  });
  return socket;
};

export const getSocket = () => socket;
