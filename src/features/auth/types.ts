export interface User {
    userId: number;
    nickname: string;
    description?: string | null;
    profileImageUrl?: string | null;
    age: number;
    gender: 'MALE' | 'FEMALE';
    enableMarketingNotification: boolean;
    enableIssueNotification: boolean;
    isReadTermsAndConditions: boolean;
    // Legacy fields needed compatibility or removal?
    // Removing email, role, id(replaced by userId)
}
