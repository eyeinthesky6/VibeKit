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