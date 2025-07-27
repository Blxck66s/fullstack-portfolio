import { createRoom, getMessagesByRoomId, getRooms } from "@/lib/api";
import {
  ChatMember,
  ChatMessage,
  ChatPagination,
  ChatRoom,
} from "@/types/chat";
import { create } from "zustand";

export interface ChatState {
  selectedRoom: ChatRoom | null;
  messages: ChatMessage[];
  members: ChatMember[];
  rooms: ChatRoom[];
  messagesPagination: ChatPagination;
  roomsPagination: ChatPagination;
  isFetchingRooms?: boolean;
  isFetchingMessages?: boolean;
  setSelectedRoom: (roomId: string) => void;
  setRoomsPagination: (pagination: Partial<ChatPagination>) => void;
  createRoom: (name: string) => Promise<void>;
  getRooms: () => Promise<void>;
  getMessages: (
    roomId: string,
    pagination: { page: number; take: number },
  ) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  selectedRoom: null,
  messages: [],
  members: [],
  rooms: [],
  messagesPagination: { page: 1, take: 10, totalCount: 0 },
  roomsPagination: { page: 1, take: 5, totalCount: 0 },
  totalRoomsCount: 0,
  isFetchingRooms: false,
  isFetchingMessages: false,
  setSelectedRoom: async (roomId) => {
    set((state) => {
      const room = state.rooms.find((room) => room.id === roomId);
      if (room) {
        return {
          selectedRoom: room,
          members: room.members,
          messages: room.messages,
        };
      }
      return {};
    });
  },
  setRoomsPagination: async (pagination) => {
    set({ roomsPagination: { ...get().roomsPagination, ...pagination } });
    await get().getRooms();
  },
  createRoom: async (name) => {
    try {
      const newRoom = await createRoom(name);
      if (get().roomsPagination.totalCount >= 5) {
        set((state) => ({
          rooms: [newRoom, ...state.rooms.slice(0, 4)],
          selectedRoom: newRoom,
          messages: [],
        }));
      }
    } catch (error) {
      console.error("Failed to create chat room:", error);
      throw error;
    }
  },
  getRooms: async () => {
    try {
      set({ isFetchingRooms: true, isFetchingMessages: true });
      const roomsPagination = get().roomsPagination;
      const { rooms, totalCount } = await getRooms(
        roomsPagination.page,
        roomsPagination.take,
      );
      set((state) => ({
        selectedRoom: null,
        rooms,
        roomsPagination: {
          ...state.roomsPagination,
          page: roomsPagination.page,
          totalCount,
        },
      }));
    } catch (error) {
      console.error("Failed to fetch chat rooms:", error);
      throw error;
    } finally {
      set({ isFetchingRooms: false, isFetchingMessages: false });
    }
  },
  getMessages: async (
    roomId: string,
    pagination: { page: number; take: number },
  ) => {
    try {
      set({ isFetchingMessages: true });
      const messagesPagination = get().messagesPagination;
      const { messages, totalCount } = await getMessagesByRoomId(
        roomId,
        pagination.page,
        pagination.take,
      );
      if (pagination.page === messagesPagination.page) {
        set({
          messages,
          messagesPagination: {
            page: pagination.page,
            take: pagination.take,
            totalCount,
          },
        });
      } else if (pagination.page > messagesPagination.page) {
        set((state) => ({
          messages: [...state.messages, ...messages],
          messagesPagination: {
            ...state.messagesPagination,
            page: pagination.page,
            totalCount,
          },
        }));
      } else if (pagination.page < messagesPagination.page) {
        set({
          messages,
          messagesPagination: {
            page: pagination.page,
            take: pagination.take,
            totalCount,
          },
        });
      }
    } catch (error) {
      console.error("Failed to fetch chat messages:", error);
      throw error;
    } finally {
      set({ isFetchingMessages: false });
    }
  },
}));
