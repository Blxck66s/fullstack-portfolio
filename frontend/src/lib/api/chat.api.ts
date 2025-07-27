import { useAuthStore } from "@/store/auth.store";
import {
  ChatMessage,
  ChatRoom,
  GetChatMessagesRes,
  GetChatRoomsRes,
} from "@/types/chat";
import api from ".";

export const createRoom = async (roomName: string) =>
  await api.post<ChatRoom>("/chat/room", { name: roomName }).then((res) => ({
    ...res.data,
    messages: [],
    messagesPagination: {
      page: 1,
      take: 10,
      totalCount: 0,
    },
  }));

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
            isOwn: msg.chatMember.userId === useAuthStore.getState().user?.id,
          })) || [],
        messagesPagination: {
          page: 1,
          take: 10,
          totalCount: room.messages?.length ?? 0,
        },
      })),
    }));

export const getMessagesByRoomId = async (
  roomId: string,
  page: number = 1,
  take: number = 10,
  totalReceivedAndSentMessages: number = 0,
) =>
  await api
    .get<GetChatMessagesRes>(`/chat/room/${roomId}/messages`, {
      params: { page, take, rsm: totalReceivedAndSentMessages },
    })
    .then((res) => ({
      ...res.data,
      messages:
        res.data.messages.map((msg: ChatMessage) => ({
          ...msg,
          isOwn: false,
        })) || [],
    }));

export const inviteMemberToRoom = async (roomId: string, email: string) =>
  await api.post(`/chat/room/${roomId}/member/${email}`).then((res) => ({
    ...res.data,
  }));
