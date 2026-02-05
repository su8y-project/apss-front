import { apiClient } from "../../../lib/api-client";
import type { CreateProfileDTO, UserProfile } from "../types";

export const registerProfile = async (data: CreateProfileDTO): Promise<UserProfile> => {
    return apiClient.post<UserProfile>('/user/profile', data);
};
