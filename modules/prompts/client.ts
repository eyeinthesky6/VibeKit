import { supabase } from '@/lib/db/supabase';

export async function getPrompts(userId: string) {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function fetchPrompts({ userId, page, pageSize, searchTerm }: { userId: string; page: number; pageSize: number; searchTerm?: string }) : Promise<{ data: any[]; total: number }> {
  let query = supabase
    .from('prompts')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (searchTerm) {
    query = query.ilike('prompt_text', `%${searchTerm}%`);
  }
  const from = (page - 1) * pageSize;
  const to = page * pageSize - 1;
  query = query.range(from, to);
  const { data, error, count } = await query;
  if (error) throw error;
  return { data: data || [], total: count || 0 };
}

export async function addPrompt(userId: string, prompt_text: string, response_text: string) {
  const { data, error } = await supabase
    .from('prompts')
    .insert([{ user_id: userId, prompt_text, response_text }]);
  if (error) throw error;
  return data;
}

export async function deletePrompt(id: string) {
  const { error } = await supabase
    .from('prompts')
    .delete()
    .eq('id', id);
  if (error) throw error;
}
