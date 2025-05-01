export declare class EmailTemplatesService {
    getTemplates(userId: string): Promise<never[]>;
    createTemplate(userId: string, template: any): Promise<null>;
    deleteTemplate(userId: string, templateId: string): Promise<null>;
}
