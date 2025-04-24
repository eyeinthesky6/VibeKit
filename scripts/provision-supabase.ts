import { execSync } from 'child_process';

function run(cmd: string) {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Failed: ${cmd}`);
    process.exit(1);
  }
}

// Provision prompts table
run('supabase db query < modules/prompts/supabase-table.sql');
// Provision activity_logs table
run(`supabase db query "\
CREATE TABLE IF NOT EXISTS activity_logs (\
  id serial PRIMARY KEY NOT NULL,\
  team_id integer NOT NULL,\
  user_id integer,\
  action text NOT NULL,\
  timestamp timestamp DEFAULT now() NOT NULL,\
  ip_address varchar(45)\
);\
"`);
// Provision proofs bucket (public-read)
run('supabase storage buckets create proofs --public');

console.log('Supabase provisioning complete.');
