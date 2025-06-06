import { POST } from '@/app/api/stripe/webhook/route';
import { stripe, handleSubscriptionChange } from '@/lib/payments/stripe';
import type { Stripe } from 'stripe';

jest.mock('@/lib/payments/stripe', () => {
  const actual = jest.requireActual('@/lib/payments/stripe');
  return {
    ...actual,
    stripe: {
      ...actual.stripe,
      webhooks: {
        constructEvent: jest.fn(),
      },
      subscriptions: {
        retrieve: jest.fn(),
      },
    },
    handleSubscriptionChange: jest.fn(),
  };
});

describe('Stripe Webhook Handler', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should process checkout.session.completed event', async () => {
    const mockEvent: Stripe.Event = {
      type: 'checkout.session.completed',
      data: { object: { subscription: 'sub_123' } } as any,
    } as any;
    (stripe.webhooks.constructEvent as jest.Mock).mockReturnValue(mockEvent);
    (stripe.subscriptions.retrieve as jest.Mock).mockResolvedValue({ id: 'sub_123' });

    const req: any = {
      text: jest.fn().mockResolvedValue('payload'),
      headers: { get: jest.fn().mockReturnValue('sig_header') },
    };
    const res = await POST(req);

    expect(handleSubscriptionChange).toHaveBeenCalledWith({ id: 'sub_123' });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ received: true });
  });

  it('returns error for invalid signature', async () => {
    (stripe.webhooks.constructEvent as jest.Mock).mockImplementation(() => { throw new Error('Invalid signature'); });
    const req: any = {
      text: jest.fn().mockResolvedValue('payload'),
      headers: { get: jest.fn().mockReturnValue('sig_header') },
    };
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json() as any;
    expect(json.error).toEqual({ code: 'WEBHOOK_SIGNATURE_VERIFICATION_FAILED', message: 'Webhook signature verification failed.' });
  });
});
