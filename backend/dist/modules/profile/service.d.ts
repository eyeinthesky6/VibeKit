export declare class ProfileService {
    getProfile(userId: string): Promise<null>;
    updateProfile(userId: string, profile: any): Promise<null>;
    deleteProfile(userId: string): Promise<null>;
}
