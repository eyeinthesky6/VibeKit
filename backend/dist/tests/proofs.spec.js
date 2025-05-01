import { uploadProof, listProofs } from '../modules/proofs/client';
describe('Proof Artifacts', () => {
    it('should upload and list proofs', async () => {
        const file = new File(['test'], 'test.txt');
        const url = await uploadProof(file);
        expect(url).toContain('proofs');
        const proofs = await listProofs();
        expect(proofs.length).toBeGreaterThan(0);
    });
});
