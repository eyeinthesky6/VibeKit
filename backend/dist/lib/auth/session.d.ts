import { NewUser } from '@/lib/db/schema';
export declare function hashPassword(password: string): Promise<string>;
export declare function comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
type SessionData = {
    user: {
        id: number;
    };
    expires: string;
};
export declare function signToken(payload: SessionData): Promise<string>;
export declare function verifyToken(input: string): Promise<SessionData>;
export declare function getSession(): Promise<SessionData | null>;
export declare function setSession(user: NewUser): Promise<void>;
export {};
