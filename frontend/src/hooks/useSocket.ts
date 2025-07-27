import { connectSocket, disconnectSocket, getSocket } from "@/lib/socket";
import { useSocketStore } from "@/store/socket.store";
import { useEffect } from "react";

export const useSocket = () => {
  const setConnected = useSocketStore((state) => state.setConnected);

  useEffect(() => {
    const socket = connectSocket();

    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      disconnectSocket();
    };
  }, [setConnected]);

  return getSocket();
};
