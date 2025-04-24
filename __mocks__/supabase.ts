interface StorageBucket {
  upload: () => Promise<{ error: null }>;
  getPublicUrl: () => { data: { publicUrl: string } };
  list: () => Promise<{ data: any[]; error: null }>;
  download: () => Promise<{ data: Buffer; error: null }>;
}

const dataStore: Record<string, any[]> = {};

export const supabase = {
  storage: {
    from: (bucket: string): StorageBucket => ({
      upload: async () => ({ error: null }),
      getPublicUrl: () => ({ data: { publicUrl: `https://example.com/${bucket}/file.txt` } }),
      list: async () => ({ data: [{ id: '1', name: 'file1', created_at: new Date().toISOString() }], error: null }),
      download: async () => ({ data: Buffer.from(''), error: null }),
    }),
  },
  from: (table: string) => {
    const builder: any = {};
    builder.select = (...args: any[]) => builder;
    builder.eq = (...args: any[]) => builder;
    builder.order = (...args: any[]) => builder;
    builder.range = (...args: any[]) => builder;
    builder.insert = async (rows: any[]) => {
      dataStore[table] = dataStore[table] || [];
      dataStore[table].push(...rows);
      return { data: rows, error: null };
    };
    builder.delete = () => {
      dataStore[table] = [];
      return builder;
    };
    builder.then = (onFulfilled: any, onRejected: any) => {
      try {
        return onFulfilled({ data: dataStore[table] || [], error: null });
      } catch (e) {
        if (onRejected) onRejected(e);
      }
    };
    return builder;
  },
};
