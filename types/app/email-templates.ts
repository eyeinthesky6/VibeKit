export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

export interface GetEmailTemplatesResponse {
  templates: EmailTemplate[];
}

export interface CreateEmailTemplateRequest {
  name: string;
  subject: string;
  body: string;
} 