"use client";
import { useEffect, useState, useRef } from 'react';
import { fetchPrompts } from '@/modules/prompts/client';

const PAGE_SIZE = 10;

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // TODO: Replace with real user ID from session/auth
  const userId = 'demo-user';

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchTerm]);

  useEffect(() => {
    setPage(1); // Reset page to 1 when search changes
  }, [debouncedSearch]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPrompts({ userId, page, pageSize: PAGE_SIZE, searchTerm: debouncedSearch })
      .then(({ data, total }) => {
        setPrompts(data);
        setTotal(total);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load prompts');
        setLoading(false);
      });
  }, [userId, page, debouncedSearch]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Prompt Logs</h1>
      <input
        type="text"
        placeholder="Search prompts..."
        className="mb-4 w-full border px-3 py-2 rounded"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {loading ? (
        <div className="text-gray-600 text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-red-600 text-center py-8">{error}</div>
      ) : prompts.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No prompts found.</div>
      ) : (
        <>
          <ul className="space-y-2">
            {prompts.map((p) => (
              <li key={p.id} className="border rounded p-4 cursor-pointer" onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm">{p.prompt_text}</span>
                  <span className="text-xs text-gray-500">{new Date(p.created_at).toLocaleString()}</span>
                </div>
                {expanded === p.id && (
                  <div className="mt-2 bg-gray-50 p-2 rounded text-xs text-gray-700">
                    <strong>Response:</strong>
                    <div>{p.response_text}</div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6">
            <button
              className="px-3 py-1 rounded border disabled:opacity-50"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="text-sm">
              Page {page} of {Math.max(1, Math.ceil(total / PAGE_SIZE))} ({total} total)
            </span>
            <button
              className="px-3 py-1 rounded border disabled:opacity-50"
              onClick={() => setPage(p => p + 1)}
              disabled={page * PAGE_SIZE >= total}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
