# Local Webhook Testing

1. Install the Stripe CLI:
   ```sh
   npm install -g stripe
   ```

2. Start listening and forwarding to your local webhook route:
   ```sh
   stripe listen --forward-to localhost:3000/api/billing/webhook
   ```

3. Copy the signing secret (the `whsec_…` value printed) into your `.env.local` as `STRIPE_WEBHOOK_SECRET`.

4. Select events to forward (e.g. `checkout.session.completed`, `invoice.paid`).

5. Restart your dev server (`npm run dev`) to pick up the new secret.

---
