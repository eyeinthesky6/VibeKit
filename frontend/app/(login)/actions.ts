'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { User } from '../../../shared/types';

// Schema validation
const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  inviteId: z.string().optional(),
  role: z.enum(['basic', 'premium', 'admin']).optional(),
});

// Helper to validate actions
const validatedAction = <T>(schema: z.ZodSchema<T>, callback: (data: T, formData: FormData) => Promise<any>) => {
  return async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const result = schema.safeParse(data);
    
    if (!result.success) {
      return { 
        error: 'Invalid input',
        errors: result.error.flatten().fieldErrors
      };
    }
    
    return callback(result.data as T, formData);
  };
};

// API call helpers
async function apiPost<T>(endpoint: string, data: Record<string, any>): Promise<T> {
  const response = await fetch(`/api/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  return response.json();
}

// Action implementations
export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;
  
  try {
    const result = await apiPost<{ token?: string; error?: string }>('auth/sign-in', { email, password });
    
    if (result.error) {
      return {
        error: result.error,
        email,
        password: '',
      };
    }
    
    // Set session cookie from result if API returns it
    if (result.token) {
      const cookiesInstance = await cookies();
      cookiesInstance.set('session', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
    }
    
    const redirectTo = formData.get('redirect') as string | null;
    if (redirectTo === 'checkout') {
      const priceId = formData.get('priceId') as string;
      const checkoutResult = await apiPost<{ url?: string; error?: string }>('stripe/checkout', { planId: priceId });
      
      if (checkoutResult.url) {
        return { success: 'checkout', url: checkoutResult.url };
      }
      
      return { error: 'Failed to create checkout session' };
    }
    
    redirect('/dashboard');
    return { success: 'redirected' };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      error: 'An unexpected error occurred. Please try again.',
      email,
      password: '',
    };
  }
});

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
  const { email, password, inviteId, role } = data;
  
  try {
    const result = await apiPost<{ token?: string; error?: string }>('auth/sign-up', { 
      email, 
      password,
      inviteId,
      role: role || 'basic'
    });
    
    if (result.error) {
      return {
        error: result.error,
        email,
        password: '',
      };
    }
    
    // Set session cookie from result if API returns it
    if (result.token) {
      const cookiesInstance = await cookies();
      cookiesInstance.set('session', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
    }
    
    const redirectTo = formData.get('redirect') as string | null;
    if (redirectTo === 'checkout') {
      const priceId = formData.get('priceId') as string;
      const checkoutResult = await apiPost<{ url?: string; error?: string }>('stripe/checkout', { planId: priceId });
      
      if (checkoutResult.url) {
        return { success: 'checkout', url: checkoutResult.url };
      }
      
      return { error: 'Failed to create checkout session' };
    }
    
    redirect('/dashboard');
    return { success: 'redirected' };
  } catch (error) {
    console.error('Sign up error:', error);
    return {
      error: 'An unexpected error occurred. Please try again.',
      email,
      password: '',
    };
  }
});

export async function signOut() {
  try {
    await apiPost<{}>('auth/sign-out', {});
    const cookiesInstance = await cookies();
    cookiesInstance.delete('session');
    redirect('/');
  } catch (error) {
    console.error('Sign out error:', error);
  }
}

export async function inviteTeamMember(formData: FormData) {
  const email = formData.get('email');
  
  if (!email || typeof email !== 'string') {
    return { error: 'Email is required' };
  }
  
  try {
    const result = await apiPost<{ error?: string }>('teams/invite', { email });
    
    if (result.error) {
      return { error: result.error };
    }
    
    return { success: 'Invitation sent successfully' };
  } catch (error) {
    console.error('Invite error:', error);
    return { error: 'Failed to send invitation' };
  }
}
