import { addPrompt, fetchPrompts, getPrompts, deletePrompt } from '../modules/prompts/client';
describe('Prompt Logging', () => {
  it('should add and fetch prompts', async () => {
    const userId = 'test-user';
    const prompt = await addPrompt(userId, 'hello', 'world');
    expect(prompt).toBeDefined();
    const prompts = await getPrompts(userId);
    expect(prompts.length).toBeGreaterThan(0);
    await deletePrompt(prompts[0].id);
  });
});
