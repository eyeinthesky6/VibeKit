"use client";
import { useEffect, useRef, useState } from 'react';
import { uploadProof, listProofs } from '@/modules/proofs/client';

export default function ProofsPage() {
  const [proofs, setProofs] = useState<{ id: string; url: string; created_at: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  async function refreshProofs() {
    try {
      const files = await listProofs();
      setProofs(files);
    } catch (err) {
      setError('Failed to load proofs');
    }
  }

  useEffect(() => {
    refreshProofs();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    setProgress(0);
    setError(null);
    let uploaded = 0;
    for (let i = 0; i < files.length; i++) {
      try {
        await uploadProof(files[i]);
        uploaded++;
        setProgress(Math.round(((uploaded) / files.length) * 100));
      } catch (err) {
        setError('Upload failed: ' + (err as any)?.message);
      }
    }
    setUploading(false);
    setProgress(0);
    await refreshProofs();
    if (fileInput.current) fileInput.current.value = '';
  }

  function isImage(url: string) {
    return url.match(/\.(jpeg|jpg|png|gif|webp)$/i);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Proof Artifacts</h1>
      <input
        type="file"
        accept="image/*,application/pdf"
        ref={fileInput}
        className="mb-4"
        onChange={handleUpload}
        disabled={uploading}
        multiple
      />
      {uploading && (
        <div className="mb-2 text-blue-600">Uploading... {progress}%</div>
      )}
      {error && <div className="mb-2 text-red-600">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {proofs.map((proof) => (
          <div
            key={proof.id}
            className="border rounded p-2 cursor-pointer bg-white hover:bg-gray-50 flex flex-col items-center"
            title={proof.url}
            onClick={() => window.open(proof.url, '_blank')}
          >
            {isImage(proof.url) ? (
              <img src={proof.url} alt="proof" className="object-cover h-32 w-full rounded mb-1" />
            ) : (
              <div className="text-xs text-blue-600 underline">Download file</div>
            )}
            <div className="truncate text-xs font-mono w-full text-center">{proof.url.split('/').pop()}</div>
            <div className="text-[10px] text-gray-400">{proof.created_at ? new Date(proof.created_at).toLocaleString() : ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
