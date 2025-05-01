export interface Profile {
    name: string;
    email: string;
    avatar?: string;
}
export interface GetProfileResponse {
    profile: Profile;
}
export interface UpdateProfileRequest {
    profile: Profile;
}
