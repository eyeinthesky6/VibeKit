/* eslint-disable */
const supabase = {
  storage: {
    from: (bucket: unknown) => ({
      upload: async (_path: unknown, _file: unknown, _opts: unknown) => ({ error: null }),
      getPublicUrl: (_path: unknown) => ({ data: { publicUrl: `https://mock/${bucket}/${_path}` } }),
      list: async () => ({
        data: [{ id: '1', name: '_file1.txt', created_at: new Date().toISOString() }], error: null
      }),
      download: async (_path: unknown) => ({ data: '_filedata', error: null }),
    }),
  },
  from: (_table: unknown) => ({
    select: (_columns: unknown, _options: unknown) => ({
      eq: (col: unknown, _val: unknown) => ({
        order: (_col2: unknown, _opts2: unknown) => Promise.resolve({
          data: [{ id: '1', user_id: 'test-user', prompt_text: 'hello', response_text: 'world' }],
          error: null,
          count: 1,
        }),
      }),
    }),
    insert: async (rows: unknown[]) => ({ data: rows.map((row: unknown, idx: number) => (typeof row === 'object' && row !== null ? { id: `${idx + 1}`, ...row } : { id: `${idx + 1}`, value: row })), error: null }),
    delete: async () => ({ error: null }),
  }),
};

export { supabase };
