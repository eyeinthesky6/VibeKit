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
