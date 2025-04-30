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