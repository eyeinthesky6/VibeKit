BEGIN;

-- Restrict users to only their own row
DROP POLICY IF EXISTS users_select ON users;
CREATE POLICY users_select ON users FOR SELECT USING (id::text = current_setting('jwt.claims.user_id'));
DROP POLICY IF EXISTS users_modify ON users;
CREATE POLICY users_modify ON users FOR ALL USING (id::text = current_setting('jwt.claims.user_id'));

-- Restrict usage records to the owning user
DROP POLICY IF EXISTS usage_select ON usage;
CREATE POLICY usage_select ON usage FOR SELECT USING (user_id::text = current_setting('jwt.claims.user_id'));
DROP POLICY IF EXISTS usage_modify ON usage;
CREATE POLICY usage_modify ON usage FOR UPDATE USING (user_id::text = current_setting('jwt.claims.user_id'));

COMMIT;
