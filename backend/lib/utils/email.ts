// Stub email sender - logs email invitations without external dependencies
export async function sendInvitationEmail(
  to: string,
  teamName: string,
  role: string,
  inviteId: number,
) {
  console.log(`Invitation email stub: to=${to}, team=${teamName}, role=${role}, inviteId=${inviteId}`);
}
