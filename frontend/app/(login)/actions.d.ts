export declare const signIn: (formData: FormData) => Promise<any>;
export declare const signUp: (formData: FormData) => Promise<any>;
export declare function signOut(): Promise<void>;
export declare function inviteTeamMember(formData: FormData): Promise<{
    error: string;
    success?: undefined;
} | {
    success: string;
    error?: undefined;
}>;
