import { apiClient } from "../../../lib/api-client";
import type { User } from "../types";

export const getMe = async (): Promise<User> => {
    return apiClient.get<User>('/user/profile/me');
};
