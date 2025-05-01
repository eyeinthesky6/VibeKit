export declare class PagesService {
    getPages(userId: string): Promise<never[]>;
    createPage(userId: string, page: any): Promise<null>;
    updatePage(userId: string, pageId: string, page: any): Promise<null>;
    deletePage(userId: string, pageId: string): Promise<null>;
}
