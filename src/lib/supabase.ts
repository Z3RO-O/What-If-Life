import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          decision_patterns?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          decision_patterns?: any;
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
    };
  };
}