let promptStore = [];
let nextId = 1;
// export supabase client import for production
// import { supabase } from '@/lib/db/supabase';
export async function getPrompts(userId) {
    // Return stored prompts for user
    return promptStore.filter((p) => p.user_id === userId);
}
export async function fetchPrompts({ userId, page, pageSize, searchTerm, }) {
    let prompts = promptStore.filter((p) => p.user_id === userId);
    if (searchTerm) {
        prompts = prompts.filter((p) => p.prompt_text.includes(searchTerm));
    }
    const from = (page - 1) * pageSize;
    const to = page * pageSize - 1;
    const data = prompts.slice(from, to + 1);
    const total = prompts.length;
    return { data, total };
}
export async function addPrompt(userId, prompt_text, response_text) {
    const newPrompt = { id: `${nextId++}`, user_id: userId, prompt_text, response_text };
    promptStore.push(newPrompt);
    return [newPrompt];
}
export async function deletePrompt(id) {
    promptStore = promptStore.filter((p) => p.id !== id);
}
