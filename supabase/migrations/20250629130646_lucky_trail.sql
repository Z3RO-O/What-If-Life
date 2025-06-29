/*
  # Media Generation Tables
  
  1. New Tables
    - `generated_media`
      - `id` (uuid, primary key)
      - `simulation_id` (uuid, references simulations)
      - `event_id` (uuid, references life_events, optional)
      - `user_id` (uuid, references profiles)
      - `media_type` (text) - image, video
      - `media_url` (text) - URL to generated media
      - `prompt` (text) - original prompt used
      - `style` (text) - style applied
      - `metadata` (jsonb) - generation parameters and info
      - `created_at` (timestamp)
      
  2. Storage
    - Create media bucket for storing generated content
    
  3. Security
    - Enable RLS on generated_media table
    - Add policies for users to manage their own media
*/

-- Create generated_media table
CREATE TABLE IF NOT EXISTS generated_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  simulation_id uuid REFERENCES simulations(id) ON DELETE CASCADE NOT NULL,
  event_id uuid REFERENCES life_events(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  media_type text NOT NULL CHECK (media_type IN ('image', 'video')),
  media_url text NOT NULL,
  prompt text NOT NULL,
  style text DEFAULT 'realistic',
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE generated_media ENABLE ROW LEVEL SECURITY;

-- Policies for generated_media
CREATE POLICY "Users can read own generated media"
  ON generated_media
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own generated media"
  ON generated_media
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own generated media"
  ON generated_media
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own generated media"
  ON generated_media
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_generated_media_simulation_id ON generated_media(simulation_id);
CREATE INDEX IF NOT EXISTS idx_generated_media_user_id ON generated_media(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_media_type ON generated_media(media_type);

-- Create storage bucket for media (this needs to be done via Supabase dashboard or API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);