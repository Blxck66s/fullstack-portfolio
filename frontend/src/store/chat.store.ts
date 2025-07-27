import {
  createRoom,
  getMessagesByRoomId,
  getRooms,
  inviteMemberToRoom,
} from "@/lib/api";
import { sendMessage } from "@/lib/socket/chat.socket";
import { ChatPagination, ChatRoom } from "@/types/chat";
import { create } from "zustand";
import { useAuthStore } from "./auth.store";

export interface ChatState {
  selectedRoom: ChatRoom | null;
  rooms: ChatRoom[];
  roomsPagination: ChatPagination;
  isFetchingRooms?: boolean;
  isFetchingMessages?: boolean;
  setSelectedRoom: (roomId: string) => void;
  setRoomsPagination: (pagination: Partial<ChatPagination>) => Promise<void>;
  setMessagesPagination: (pagination: Partial<ChatPagination>) => Promise<void>;
  createRoom: (name: string) => Promise<void>;
  getRooms: () => Promise<void>;
  getMessages: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  inviteMemberToRoom: (roomId: string, email: string) => Promise<void>;
}

export const useChatStore = create<ChatState>((set, get) => ({
  selectedRoom: null,
  rooms: [],
  roomsPagination: { page: 1, take: 5, totalCount: 0 },
  totalRoomsCount: 0,
  isFetchingRooms: false,
  isFetchingMessages: false,
  setSelectedRoom: async (roomId) => {
    const prevSelectedRoom = get().selectedRoom;
    if (prevSelectedRoom?.id === roomId) return;
    if (prevSelectedRoom?.id !== roomId) {
      const prevRoomIndex = get().rooms.findIndex(
        (room) => room.id === prevSelectedRoom?.id,
      );
      if (prevRoomIndex !== -1) {
        set((state) => {
          if (!prevSelectedRoom) return {};
          return {
            rooms: state.rooms.map((room, index) => {
              if (index === prevRoomIndex) {
                return {
                  ...prevSelectedRoom,
                };
              }
              return room;
            }),
          };
        });
      }
    }

    set((state) => {
      const room = state.rooms.find((room) => room.id === roomId);
      if (room) {
        return {
          selectedRoom: room,
          members: room.members,
          messages: room.messages,
          messagesPagination: { page: 1, take: 10, totalCount: 0 },
        };
      }
      return {};
    });
  },
  setRoomsPagination: async (pagination) => {
    set({ roomsPagination: { ...get().roomsPagination, ...pagination } });
    await get().getRooms();
  },
  setMessagesPagination: async (pagination) => {
    set((state) => {
      const selectedRoom = state.selectedRoom;
      if (!selectedRoom) return {};
      return {
        selectedRoom: {
          ...selectedRoom,
          messagesPagination: {
            ...selectedRoom.messagesPagination,
            ...pagination,
          },
        },
      };
    });
    const selectedRoom = get().selectedRoom;
    if (selectedRoom) await get().getMessages();
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
        rooms: [...state.rooms, ...rooms],
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
  getMessages: async () => {
    try {
      set({ isFetchingMessages: true });
      const roomId = get().selectedRoom?.id;
      const messagesPagination = get().selectedRoom?.messagesPagination;
      if (!roomId || !messagesPagination) return;
      const { messages: messagesData, totalCount } = await getMessagesByRoomId(
        roomId,
        messagesPagination.page,
        messagesPagination.take,
      );

      set((state) => {
        if (!state.selectedRoom) return {};
        const existingIds = new Set(
          state.selectedRoom.messages.map((m) => m.id),
        );
        const newMessages = messagesData.filter((m) => !existingIds.has(m.id));
        return {
          selectedRoom: {
            ...state.selectedRoom,
            messages: [...state.selectedRoom.messages, ...newMessages],
            messagesPagination: {
              ...state.selectedRoom.messagesPagination,
              page: messagesPagination.page,
              totalCount,
            },
          },
        };
      });
    } catch (error) {
      console.error("Failed to fetch chat messages:", error);
      throw error;
    } finally {
      set({ isFetchingMessages: false });
    }
  },
  sendMessage: async (message) => {
    const chatMember = get().selectedRoom?.members.find(
      (member) => member.userId === useAuthStore.getState().user?.id,
    );
    const selectedRoom = get().selectedRoom;
    if (!selectedRoom) throw new Error("No selected chat room");
    if (!chatMember)
      throw new Error("Chat member not found for the current user");

    try {
      const newMessage = await sendMessage({
        roomId: selectedRoom.id,
        message,
      });
      set((state) => {
        if (!state.selectedRoom) return {};
        return {
          selectedRoom: {
            ...state.selectedRoom,
            messages: [newMessage, ...state.selectedRoom.messages],
            messagesPagination: {
              ...state.selectedRoom.messagesPagination,
              totalCount: state.selectedRoom.messagesPagination.totalCount + 1,
            },
          },
        };
      });
    } catch (error) {
      console.error("Failed to send chat message:", error);
      throw error;
    }
  },
  inviteMemberToRoom: async (roomId, email) => {
    try {
      const updatedRoom = await inviteMemberToRoom(roomId, email);
      set((state) => ({
        rooms: state.rooms.map((room) =>
          room.id === roomId ? { ...room, ...updatedRoom } : room,
        ),
      }));
    } catch (error) {
      console.error("Failed to invite member to chat room:", error);
      throw error;
    }
  },
}));
