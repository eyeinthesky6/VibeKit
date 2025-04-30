export interface Team {
  id: string;
  name: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface InviteTeamMemberRequest {
  email: string;
  teamId: string;
} 