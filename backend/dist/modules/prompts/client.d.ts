interface Prompt {
    id: string;
    user_id: string;
    prompt_text: string;
    response_text: string;
}
export declare function getPrompts(userId: string): Promise<Prompt[]>;
export declare function fetchPrompts({ userId, page, pageSize, searchTerm, }: {
    userId: string;
    page: number;
    pageSize: number;
    searchTerm?: string;
}): Promise<{
    data: unknown[];
    total: number;
}>;
export declare function addPrompt(userId: string, prompt_text: string, response_text: string): Promise<Prompt[]>;
export declare function deletePrompt(id: string): Promise<void>;
export {};
