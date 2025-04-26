import { getStorage } from '@/lib/utils/storage';
import { supabase } from '@/lib/db/supabase';

const BUCKET = 'proofs';

export async function uploadProof(file: File): Promise<string> {
  const filePath = `${Date.now()}_${file.name}`;
  const storage = getStorage(BUCKET);
  const { error } = await storage.upload(filePath, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;
  const { data: urlData } = storage.getPublicUrl(filePath);
  return urlData.publicUrl;
}

export async function listProofs(): Promise<{ id: string; url: string; created_at: string }[]> {
  const storage = getStorage(BUCKET);
  const { data, error } = await storage.list('', {
    sortBy: { column: 'created_at', order: 'desc' },
  });
  if (error) throw error;
  return (
    data?.map((item) => {
      const { data: urlData } = storage.getPublicUrl(item.name);
      return {
        id: item.id || item.name,
        url: urlData.publicUrl,
        created_at: item.created_at || '',
      };
    }) || []
  );
}

export async function downloadProof(path: string) {
  const storage = getStorage(BUCKET);
  const { data, error } = await storage.download(path);
  if (error) throw error;
  return data;
}
