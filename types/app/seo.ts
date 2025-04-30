export interface SEOSettings {
  metaTags?: string[];
  sitemap?: string;
  robots?: string;
}

export interface GetSEOSettingsResponse {
  seo: SEOSettings;
}

export interface UpdateSEOSettingsRequest {
  seo: SEOSettings;
} 