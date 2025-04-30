export interface AuditLog {
  user: string;
  action: string;
  timestamp: string;
}

export interface GetAuditLogsResponse {
  logs: AuditLog[];
} 