export interface UserProfile {
    id: number;
    userId: number;
    nickname: string;
    description: string | null;
    profileImageUrl: string | null;
    age: number;
    gender: 'MALE' | 'FEMALE';
    enableMarketingNotification: boolean;
    enableIssueNotification: boolean;
    isReadTermsAndConditions: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProfileDTO {
    nickname: string;
    age: number;
    gender: 'MALE' | 'FEMALE'; // Updated to match likely Enum string values
    enableMarketingNotification: boolean;
    enableIssueNotification: boolean;
    isReadTermsAndConditions: boolean;
}
