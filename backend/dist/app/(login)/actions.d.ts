export declare const signIn: (prevState: import("@/lib/auth/middleware").ActionState, formData: FormData) => Promise<import("@/lib/auth/middleware").ActionState>;
export declare const signUp: (prevState: import("@/lib/auth/middleware").ActionState, formData: FormData) => Promise<import("@/lib/auth/middleware").ActionState>;
export declare function signOut(): Promise<void>;
export declare const updatePassword: (prevState: import("@/lib/auth/middleware").ActionState, formData: FormData) => Promise<import("@/lib/auth/middleware").ActionState>;
export declare const deleteAccount: (prevState: import("@/lib/auth/middleware").ActionState, formData: FormData) => Promise<import("@/lib/auth/middleware").ActionState>;
export declare const updateAccount: (prevState: import("@/lib/auth/middleware").ActionState, formData: FormData) => Promise<import("@/lib/auth/middleware").ActionState>;
export declare const removeTeamMember: (prevState: import("@/lib/auth/middleware").ActionState, formData: FormData) => Promise<import("@/lib/auth/middleware").ActionState>;
export declare const inviteTeamMember: (prevState: import("@/lib/auth/middleware").ActionState, formData: FormData) => Promise<import("@/lib/auth/middleware").ActionState>;
