export declare function uploadProof(file: File): Promise<string>;
export declare function listProofs(): Promise<{
    id: string;
    url: string;
    created_at: string;
}[]>;
export declare function downloadProof(path: string): Promise<Blob>;
