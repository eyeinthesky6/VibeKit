export interface Page {
    id: string;
    title: string;
    slug: string;
    blocks: any[];
}
export interface GetPagesResponse {
    pages: Page[];
}
export interface CreatePageRequest {
    title: string;
    slug: string;
    blocks: any[];
}
