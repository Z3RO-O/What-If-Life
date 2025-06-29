import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export interface AuthUser extends User {
  profile?: {
    full_name: string | null;
    avatar_url: string | null;
    decision_patterns: any;
  };
}

export const authService = {
  // Sign up with email and password (with OTP verification)
  async signUp(email: string, password: string, fullName?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName || null,
        },
      },
    });

    if (error) throw error;

    // Note: Profile will be created via database trigger or webhook
    // when email is confirmed
    return data;
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Sign in with Google OAuth
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) throw error;
    return data;
  },

  // Sign in with OTP (Magic Link)
  async signInWithOTP(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return data;
  },

  // Verify OTP
  async verifyOTP(email: string, token: string) {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });

    if (error) throw error;
    return data;
  },

  // Resend email confirmation
  async resendConfirmation(email: string) {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) throw error;
    return data;
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user with profile
  async getCurrentUser(): Promise<AuthUser | null> {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return null;

    // Fetch profile data
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, avatar_url, decision_patterns')
      .eq('id', user.id)
      .single();

    return {
      ...user,
      profile: profile || undefined,
    };
  },

  // Update profile
  async updateProfile(updates: { full_name?: string; avatar_url?: string }) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('No authenticated user');

    const { error } = await supabase.from('profiles').update(updates).eq('id', user.id);

    if (error) throw error;
  },

  // Listen to auth changes
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const user = await this.getCurrentUser();
        callback(user);
      } else {
        callback(null);
      }
    });
  },

  // Handle OAuth callback
  async handleAuthCallback() {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;

    // If user signed in with OAuth and doesn't have a profile, create one
    if (data.session?.user) {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.session.user.id)
        .single();

      if (!existingProfile) {
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.session.user.id,
          email: data.session.user.email!,
          full_name:
            data.session.user.user_metadata?.full_name ||
            data.session.user.user_metadata?.name ||
            null,
          avatar_url:
            data.session.user.user_metadata?.avatar_url ||
            data.session.user.user_metadata?.picture ||
            null,
        });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }
      }
    }

    return data;
  },
};
