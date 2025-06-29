/*
  # Initial Schema for What If Life Platform

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `avatar_url` (text, optional)
      - `decision_patterns` (jsonb) - stores ML analysis of decision patterns
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `decisions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `chosen_path` (text)
      - `alternative_path` (text)
      - `timeframe` (text)
      - `importance` (integer, 1-5)
      - `context` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `simulations`
      - `id` (uuid, primary key)
      - `decision_id` (uuid, references decisions)
      - `user_id` (uuid, references profiles)
      - `original_timeline` (jsonb)
      - `alternate_timeline` (jsonb)
      - `insights` (jsonb)
      - `confidence_score` (decimal)
      - `processing_time` (integer) - in milliseconds
      - `status` (text) - processing, completed, failed
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `life_events`
      - `id` (uuid, primary key)
      - `simulation_id` (uuid, references simulations)
      - `title` (text)
      - `description` (text)
      - `category` (text)
      - `timeline` (text)
      - `impact` (text) - positive, negative, neutral
      - `probability` (decimal)
      - `is_alternate` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for reading public aggregated data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  decision_patterns jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create decisions table
CREATE TABLE IF NOT EXISTS decisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  category text NOT NULL CHECK (category IN ('career', 'education', 'relationship', 'location', 'health', 'finance')),
  chosen_path text NOT NULL,
  alternative_path text NOT NULL,
  timeframe text NOT NULL,
  importance integer NOT NULL CHECK (importance >= 1 AND importance <= 5),
  context text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create simulations table
CREATE TABLE IF NOT EXISTS simulations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  decision_id uuid REFERENCES decisions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  original_timeline jsonb DEFAULT '[]',
  alternate_timeline jsonb DEFAULT '[]',
  insights jsonb DEFAULT '[]',
  confidence_score decimal DEFAULT 0.0 CHECK (confidence_score >= 0.0 AND confidence_score <= 1.0),
  processing_time integer DEFAULT 0,
  status text DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create life_events table
CREATE TABLE IF NOT EXISTS life_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  simulation_id uuid REFERENCES simulations(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  timeline text NOT NULL,
  impact text NOT NULL CHECK (impact IN ('positive', 'negative', 'neutral')),
  probability decimal NOT NULL CHECK (probability >= 0.0 AND probability <= 1.0),
  is_alternate boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE decisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE life_events ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Decisions policies
CREATE POLICY "Users can read own decisions"
  ON decisions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own decisions"
  ON decisions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own decisions"
  ON decisions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own decisions"
  ON decisions
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Simulations policies
CREATE POLICY "Users can read own simulations"
  ON simulations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own simulations"
  ON simulations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own simulations"
  ON simulations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Life events policies
CREATE POLICY "Users can read own life events"
  ON life_events
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM simulations 
      WHERE simulations.id = life_events.simulation_id 
      AND simulations.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert life events for own simulations"
  ON life_events
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM simulations 
      WHERE simulations.id = life_events.simulation_id 
      AND simulations.user_id = auth.uid()
    )
  );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_decisions_updated_at
  BEFORE UPDATE ON decisions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_simulations_updated_at
  BEFORE UPDATE ON simulations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_decisions_user_id ON decisions(user_id);
CREATE INDEX IF NOT EXISTS idx_decisions_category ON decisions(category);
CREATE INDEX IF NOT EXISTS idx_simulations_user_id ON simulations(user_id);
CREATE INDEX IF NOT EXISTS idx_simulations_status ON simulations(status);
CREATE INDEX IF NOT EXISTS idx_life_events_simulation_id ON life_events(simulation_id);