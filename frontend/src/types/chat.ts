export interface ChatUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isOnline: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  members: ChatMember[];
  messages: ChatMessage[];

  messagesPagination: ChatPagination;
}

export interface ChatMember {
  id: string;
  userId: string;
  chatRoomId: string;
  createdAt: Date;

  user: ChatUser;
  chatRoom: ChatRoom;
}

export interface ChatMessage {
  id: string;
  message: string;
  isRead: boolean;
  chatMemberId: string;
  chatRoomId: string;
  isOwn: boolean;

  deletedAt?: Date | null;
  updatedAt: Date;
  createdAt: Date;

  chatMember: ChatMember;
}

export interface GetChatRoomsRes {
  rooms: ChatRoom[];
  totalCount: number;
}

export interface GetChatMessagesRes {
  messages: ChatMessage[];
  totalCount: number;
}

export interface ChatPagination {
  page: number;
  take: number;
  totalCount: number;
}
