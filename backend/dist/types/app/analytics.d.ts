export interface AnalyticsSummary {
    visits: number;
    conversions: number;
    users: number;
}
export interface GetAnalyticsSummaryResponse {
    summary: AnalyticsSummary;
}
