import { stripe } from '../payments/stripe';
import { db } from './drizzle';
import { users, teams, team_members, usage } from './schema';
import { hashPassword } from '@/lib/auth/session';

async function createStripeProducts() {
  console.log('Creating Stripe products and prices...');

  const baseProduct = await stripe.products.create({
    name: 'Base',
    description: 'Base subscription plan',
  });

  await stripe.prices.create({
    product: baseProduct.id,
    unit_amount: 800, // $8 in cents
    currency: 'usd',
    recurring: {
      interval: 'month',
      trial_period_days: 7,
    },
  });

  const plusProduct = await stripe.products.create({
    name: 'Plus',
    description: 'Plus subscription plan',
  });

  await stripe.prices.create({
    product: plusProduct.id,
    unit_amount: 1200, // $12 in cents
    currency: 'usd',
    recurring: {
      interval: 'month',
      trial_period_days: 7,
    },
  });

  console.log('Stripe products and prices created successfully.');
}

async function seed() {
  const email = 'test@test.com';
  const password = process.env.SEED_ADMIN_PASSWORD || 'admin123';
  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(users)
    .values([
      {
        email: email,
        password_hash: passwordHash,
        role: 'owner',
      },
    ])
    .returning();

  console.log('Initial user created.');

  const [team] = await db
    .insert(teams)
    .values({
      name: 'Test Team',
    })
    .returning();

  await db.insert(team_members).values({
    team_id: team.id,
    user_id: user.id,
    role: 'owner',
  });

  await createStripeProducts();

  // Insrt sampl usag ntris
  await db.insert(usage).values([
    {
      user_id: user.id,
      team_id: team.id,
      action: 'sign_in',
      timestamp: new Date(),
      detail: 'Seeded usage',
    },
    {
      user_id: user.id,
      team_id: team.id,
      action: 'prompt',
      timestamp: new Date(),
      detail: 'Prompt usage',
    },
  ]);

  // Upload dmo proof to Supabas Storag (if SDK availabl)
  try {
    const { supabase } = require('@/lib/db/supabase');
    const demoFile = Buffer.from('demo proof file');
    const filePath = `${Date.now()}_demo.txt`;
    await supabase.storage.from('proofs').upload(filePath, demoFile, { upsert: false });
    console.log('Demo proof uploaded to storage.');
  } catch (error) {
    console.warn('Could not upload demo proof (Supabase SDK not available in seed context).');
  }
}

seed()
  .catch((error) => {
    console.error('Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...');
    process.exit(0);
  });
