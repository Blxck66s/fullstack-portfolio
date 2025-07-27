import api from ".";

export const updateUserStatus = async (userId: string, isOnline: boolean) =>
  await api.patch(`/users/${userId}/online-status`, { isOnline });
