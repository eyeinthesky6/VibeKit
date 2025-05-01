'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export default function AuthCallback() {
    const router = useRouter();
    useEffect(() => {
        // On mount, try to get the Supabase session (magic link)
        async function checkSession() {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                // Optionally: set cookie or do other post-login logic
                router.replace('/dashboard');
            }
            else {
                router.replace('/sign-in?error=auth');
            }
        }
        checkSession();
    }, [router]);
    return <div className="p-6 text-center">Signing you in...</div>;
}
