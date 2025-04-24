import { supabase } from '@/lib/db/supabase';

const BUCKET = 'proofs';

export async function uploadProof(file: File): Promise<string> {
  const filePath = `${Date.now()}_${file.name}`;
  const { error } = await supabase.storage.from(BUCKET).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  return urlData.publicUrl;
}

export async function listProofs(): Promise<{ id: string; url: string; created_at: string }[]> {
  const { data, error } = await supabase.storage.from(BUCKET).list('', { sortBy: { column: 'created_at', order: 'desc' } });
  if (error) throw error;
  return (
    data?.map((item) => {
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(item.name);
      return {
        id: item.id || item.name,
        url: urlData.publicUrl,
        created_at: item.created_at || '',
      };
    }) || []
  );
}

export async function downloadProof(path: string) {
  const { data, error } = await supabase.storage.from(BUCKET).download(path);
  if (error) throw error;
  return data;
}
