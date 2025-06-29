import { supabase } from '@/lib/supabase';
import type { Decision, Simulation } from '@/types';

export const api = {
  // Decision management
  async createDecision(decision: Omit<Decision, 'id' | 'createdAt'>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('decisions')
      .insert({
        user_id: user.id,
        title: decision.title,
        description: decision.description,
        category: decision.category,
        chosen_path: decision.chosenPath,
        alternative_path: decision.alternativePath,
        timeframe: decision.timeframe,
        importance: decision.importance,
        context: decision.context,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getUserDecisions() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('decisions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Simulation management
  async processSimulation(decisionId: string) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process-simulation`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ decision_id: decisionId }),
      }
    );

    if (!response.ok) {
      throw new Error('Simulation processing failed');
    }

    return response.json();
  },

  async getSimulation(simulationId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('simulations')
      .select(`
        *,
        decisions (*),
        life_events (*)
      `)
      .eq('id', simulationId)
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return data;
  },

  async getUserSimulations() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('simulations')
      .select(`
        *,
        decisions (title, category)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // User statistics
  async getUserStats() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-user-stats`,
      {
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user stats');
    }

    return response.json();
  },

  // Real-time subscriptions
  subscribeToSimulations(userId: string, callback: (payload: any) => void) {
    return supabase
      .channel('simulations')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'simulations',
          filter: `user_id=eq.${userId}`,
        },
        callback
      )
      .subscribe();
  },
};