// In-memory store for prompts (used in tests and fallback)
interface Prompt { id: string; user_id: string; prompt_text: string; response_text: string }
let promptStore: Prompt[] = [];
let nextId = 1;
// export supabase client import for production
// import { supabase } from '@/lib/db/supabase';

export async function getPrompts(userId: string) {
  // Return stored prompts for user
  return promptStore.filter((p) => p.user_id === userId);
}

export async function fetchPrompts({
  userId,
  page,
  pageSize,
  searchTerm,
}: {
  userId: string;
  page: number;
  pageSize: number;
  searchTerm?: string;
}): Promise<{ data: any[]; total: number }> {
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

export async function addPrompt(userId: string, prompt_text: string, response_text: string) {
  const newPrompt: Prompt = { id: `${nextId++}`, user_id: userId, prompt_text, response_text };
  promptStore.push(newPrompt);
  return [newPrompt];
}

export async function deletePrompt(id: string) {
  promptStore = promptStore.filter((p) => p.id !== id);
}
