export declare class FeatureFlagsService {
    getFeatureFlags(userId: string): Promise<never[]>;
    updateFeatureFlag(userId: string, id: string, enabled: boolean): Promise<null>;
}
