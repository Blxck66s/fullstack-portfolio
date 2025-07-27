import { ChatMessage } from "@/types/chat";
import { getSocket } from ".";

export interface SendMessageParams {
  roomId: string;
  message: string;
}

export const sendMessage = async (params: SendMessageParams) => {
  const socket = getSocket();
  if (!socket) throw new Error("Socket is not initialized");

  return new Promise<ChatMessage>((resolve, reject) => {
    socket.emit(
      "sendMessage",
      params,
      (response: {
        success: boolean;
        message: ChatMessage;
        error?: string;
      }) => {
        if (response.success) {
          console.log("Message sent successfully");
          resolve(response.message);
        } else {
          reject(new Error(response.error || "Failed to send message"));
        }
      },
    );
  });
};
