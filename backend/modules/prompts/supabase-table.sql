-- Supabase SQL for prompts table
create table if not exists prompts (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  prompt_text text not null,
  response_text text not null,
  created_at timestamp with time zone default timezone('utc', now())
);
