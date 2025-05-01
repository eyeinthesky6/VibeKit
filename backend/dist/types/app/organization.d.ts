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
