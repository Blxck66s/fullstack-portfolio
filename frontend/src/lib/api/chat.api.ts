import {
  ChatMessage,
  ChatRoom,
  GetChatMessagesRes,
  GetChatRoomsRes,
} from "@/types/chat";
import api from ".";

export const createRoom = async (roomName: string) =>
  await api
    .post<ChatRoom>("/chat/room", { name: roomName })
    .then((res) => res.data);

export const getRooms = async (page: number = 1, take: number = 5) =>
  await api
    .get<GetChatRoomsRes>("/chat/rooms", { params: { take, page } })
    .then((res) => ({
      ...res.data,
      rooms: res.data.rooms.map((room) => ({
        ...room,
        messages:
          room.messages?.map((msg) => ({
            ...msg,
            isOwn: msg.chatMember.user.id === msg.chatMember.userId,
          })) || [],
      })),
    }));

export const getMessagesByRoomId = async (
  roomId: string,
  page: number = 1,
  take: number = 10,
) =>
  await api
    .get<GetChatMessagesRes>(`/chat/room/${roomId}/messages`, {
      params: { page, take },
    })
    .then((res) => ({
      ...res.data,
      messages:
        res.data.messages.map((msg: ChatMessage) => ({
          ...msg,
          isOwn: msg.chatMember.user.id === msg.chatMember.userId,
        })) || [],
    }));
