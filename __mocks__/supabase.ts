const supabase = {
  storage: {
    from: (bucket) => ({
      upload: async (path, file, opts) => ({ error: null }),
      getPublicUrl: (path) => ({ data: { publicUrl: `https://mock/${bucket}/${path}` } }),
      list: async () => ({
        data: [{ id: '1', name: 'file1.txt', created_at: new Date().toISOString() }], error: null
      }),
      download: async (path) => ({ data: 'filedata', error: null }),
    }),
  },
  from: (table) => ({
    select: (columns, options) => ({
      eq: (col, val) => ({
        order: (col2, opts2) => Promise.resolve({
          data: [{ id: '1', user_id: 'test-user', prompt_text: 'hello', response_text: 'world' }],
          error: null,
          count: 1,
        }),
      }),
    }),
    insert: async (rows) => ({ data: rows.map((row, idx) => ({ id: `${idx + 1}`, ...row })), error: null }),
    delete: async () => ({ error: null }),
  }),
};

export { supabase };
