export interface User {
    id: string;
    name?: string | null;
    email?: string | null;
}
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
export interface Team {
    id: string;
    name: string;
    createdAt: string;
}
export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: string;
}
export interface InviteTeamMemberRequest {
    email: string;
    teamId: string;
}
export interface Organization {
    id: string;
    name: string;
    createdAt: string;
}
export interface GetOrganizationsResponse {
    organizations: Organization[];
}
export interface SwitchOrganizationRequest {
    organizationId: string;
}
export interface Profile {
    name: string;
    email: string;
    avatar?: string;
}
export interface GetProfileResponse {
    profile: Profile;
}
export interface UpdateProfileRequest {
    profile: Profile;
}
export interface Notification {
    id: string;
    title: string;
    message: string;
    read?: boolean;
    timestamp: string;
}
export interface GetNotificationsResponse {
    notifications: Notification[];
}
export interface FeatureFlag {
    id: string;
    name: string;
    enabled: boolean;
}
export interface GetFeatureFlagsResponse {
    featureFlags: FeatureFlag[];
}
export interface UpdateFeatureFlagRequest {
    id: string;
    enabled: boolean;
}
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
export interface AuditLog {
    user: string;
    action: string;
    timestamp: string;
}
export interface GetAuditLogsResponse {
    logs: AuditLog[];
}
export interface AnalyticsSummary {
    visits: number;
    conversions: number;
    users: number;
}
export interface GetAnalyticsSummaryResponse {
    summary: AnalyticsSummary;
}
export interface Compliance {
    gdpr?: boolean;
    ccpa?: boolean;
}
export interface GetComplianceResponse {
    compliance: Compliance;
}
export interface UpdateComplianceRequest {
    compliance: Compliance;
}
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
export interface Preferences {
    theme?: string;
    notifications?: boolean;
}
export interface GetPreferencesResponse {
    preferences: Preferences;
}
export interface UpdatePreferencesRequest {
    preferences: Preferences;
}
export interface CheckoutRequest {
    planId: string;
}
export interface CheckoutResponse {
    url?: string;
    error?: string | {
        code: string;
        message: string;
    };
}
export interface UsageRecord {
    id: number;
    user_id?: number;
    team_id?: number;
    action: string;
    timestamp: string;
    detail?: string;
}
export interface UsageResponse {
    usage?: UsageRecord[];
    error?: string;
}
