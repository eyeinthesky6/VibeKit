import { uploadProof, listProofs } from '../modules/proofs/client';

jest.mock('../modules/proofs/client', () => ({
  uploadProof: jest.fn(() => Promise.resolve('mock-url/proofs/test.txt')),
  listProofs: jest.fn(() => Promise.resolve([{ url: 'mock-url/proofs/test.txt' }])),
}));

describe('Proof Artifacts', () => {
  it('should upload and list proofs', async () => {
    const file = new File(['test'], 'test.txt');
    const url = await uploadProof(file);
    expect(url).toContain('proofs');
    const proofs = await listProofs();
    expect(proofs.length).toBeGreaterThan(0);
  });
});
