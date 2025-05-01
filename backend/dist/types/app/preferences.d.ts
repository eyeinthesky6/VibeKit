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
