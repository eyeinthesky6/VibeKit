import { addPrompt, getPrompts } from '@/modules/prompts/client';

describe('Prompt Logging', () => {
  it('should add and fetch prompts', async () => {
    const userId = 'test-user';
    const created = await addPrompt(userId, 'hello', 'world');
    expect(created).toBeDefined();
    const prompts = await getPrompts(userId);
    expect(Array.isArray(prompts)).toBe(true);
    expect(prompts.some(p => p.prompt_text === 'hello')).toBe(true);
  });
});
