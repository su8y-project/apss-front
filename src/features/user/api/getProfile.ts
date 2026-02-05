import { apiClient } from "../../../lib/api-client";
import type { UserProfile } from "../types";

export const getProfile = async (): Promise<UserProfile> => {
    return apiClient.get<UserProfile>('/user/profile/me');
};
