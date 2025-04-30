// Shared API request/response interfaces

export interface CheckoutRequest {
  planId: string;
}

export interface CheckoutResponse {
  url?: string;
  error?: string | { code: string; message: string };
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
