-- Migration 0001: enable row-level security and define basic policies
BEGIN;

-- Enable RLS and policies for users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY users_select ON users FOR SELECT USING (true);
CREATE POLICY users_modify ON users FOR ALL USING (true);

-- Enable RLS and policies for teams table
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
CREATE POLICY teams_select ON teams FOR SELECT USING (true);
CREATE POLICY teams_modify ON teams FOR ALL USING (true);

-- Enable RLS and policies for team_members table
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY team_members_select ON team_members FOR SELECT USING (true);
CREATE POLICY team_members_modify ON team_members FOR ALL USING (true);

-- Enable RLS and policies for invitations table
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
CREATE POLICY invitations_select ON invitations FOR SELECT USING (true);
CREATE POLICY invitations_modify ON invitations FOR ALL USING (true);

-- Enable RLS and policies for activity_logs table
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY activity_logs_select ON activity_logs FOR SELECT USING (true);
CREATE POLICY activity_logs_modify ON activity_logs FOR ALL USING (true);

-- Enable RLS and policies for usage table
ALTER TABLE usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY usage_select ON usage FOR SELECT USING (true);
CREATE POLICY usage_modify ON usage FOR ALL USING (true);

COMMIT;
