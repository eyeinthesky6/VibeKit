export interface AuthConfig {
    middlewares?: Array<(req: unknown, res: unknown, next: unknown) => void>;
    hooks?: Record<string, (...args: unknown[]) => void>;
    plugins?: Array<{
        name: string;
        setup: () => void;
    }>;
}
