// Database Schema Types (Generated from Supabase)
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          decision_patterns: any;
          subscription_tier: 'free' | 'premium' | 'enterprise';
          subscription_status: 'active' | 'canceled' | 'past_due' | 'unpaid';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          decision_patterns?: any;
          subscription_tier?: 'free' | 'premium' | 'enterprise';
          subscription_status?: 'active' | 'canceled' | 'past_due' | 'unpaid';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          decision_patterns?: any;
          subscription_tier?: 'free' | 'premium' | 'enterprise';
          subscription_status?: 'active' | 'canceled' | 'past_due' | 'unpaid';
          created_at?: string;
          updated_at?: string;
        };
      };
      decisions: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          category: 'career' | 'education' | 'relationship' | 'location' | 'health' | 'finance';
          chosen_path: string;
          alternative_path: string;
          timeframe: string;
          importance: number;
          context: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          category: 'career' | 'education' | 'relationship' | 'location' | 'health' | 'finance';
          chosen_path: string;
          alternative_path: string;
          timeframe: string;
          importance: number;
          context?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          category?: 'career' | 'education' | 'relationship' | 'location' | 'health' | 'finance';
          chosen_path?: string;
          alternative_path?: string;
          timeframe?: string;
          importance?: number;
          context?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      simulations: {
        Row: {
          id: string;
          decision_id: string;
          user_id: string;
          original_timeline: any;
          alternate_timeline: any;
          insights: any;
          confidence_score: number;
          processing_time: number;
          status: 'processing' | 'completed' | 'failed';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          decision_id: string;
          user_id: string;
          original_timeline?: any;
          alternate_timeline?: any;
          insights?: any;
          confidence_score?: number;
          processing_time?: number;
          status?: 'processing' | 'completed' | 'failed';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          decision_id?: string;
          user_id?: string;
          original_timeline?: any;
          alternate_timeline?: any;
          insights?: any;
          confidence_score?: number;
          processing_time?: number;
          status?: 'processing' | 'completed' | 'failed';
          created_at?: string;
          updated_at?: string;
        };
      };
      life_events: {
        Row: {
          id: string;
          simulation_id: string;
          title: string;
          description: string;
          category: string;
          timeline: string;
          impact: 'positive' | 'negative' | 'neutral';
          probability: number;
          is_alternate: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          simulation_id: string;
          title: string;
          description: string;
          category: string;
          timeline: string;
          impact: 'positive' | 'negative' | 'neutral';
          probability: number;
          is_alternate?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          simulation_id?: string;
          title?: string;
          description?: string;
          category?: string;
          timeline?: string;
          impact?: 'positive' | 'negative' | 'neutral';
          probability?: number;
          is_alternate?: boolean;
          created_at?: string;
        };
      };
      generated_media: {
        Row: {
          id: string;
          simulation_id: string;
          event_id: string | null;
          user_id: string;
          media_type: 'image' | 'video';
          media_url: string;
          prompt: string;
          style: string;
          metadata: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          simulation_id: string;
          event_id?: string | null;
          user_id: string;
          media_type: 'image' | 'video';
          media_url: string;
          prompt: string;
          style?: string;
          metadata?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          simulation_id?: string;
          event_id?: string | null;
          user_id?: string;
          media_type?: 'image' | 'video';
          media_url?: string;
          prompt?: string;
          style?: string;
          metadata?: any;
          created_at?: string;
        };
      };
      analytics: {
        Row: {
          id: string;
          user_id: string;
          simulation_id: string | null;
          event_type: string;
          event_data: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          simulation_id?: string | null;
          event_type: string;
          event_data?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          simulation_id?: string | null;
          event_type?: string;
          event_data?: any;
          created_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          tier: 'free' | 'premium' | 'enterprise';
          status: 'active' | 'canceled' | 'past_due' | 'unpaid';
          stripe_subscription_id: string | null;
          current_period_start: string;
          current_period_end: string;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          tier?: 'free' | 'premium' | 'enterprise';
          status?: 'active' | 'canceled' | 'past_due' | 'unpaid';
          stripe_subscription_id?: string | null;
          current_period_start?: string;
          current_period_end?: string;
          cancel_at_period_end?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          tier?: 'free' | 'premium' | 'enterprise';
          status?: 'active' | 'canceled' | 'past_due' | 'unpaid';
          stripe_subscription_id?: string | null;
          current_period_start?: string;
          current_period_end?: string;
          cancel_at_period_end?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
