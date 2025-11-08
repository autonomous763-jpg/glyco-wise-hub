/*
  # GlycoCare+ Database Schema
  
  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text)
      - `email` (text)
      - `age` (integer)
      - `weight` (float)
      - `gender` (text)
      - `diabetes_type` (text)
      - `has_bp` (boolean)
      - `has_heart_condition` (boolean)
      - `created_at` (timestamp)
    
    - `vitals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `glucose_level` (float)
      - `bp_systolic` (integer)
      - `bp_diastolic` (integer)
      - `heart_rate` (integer)
      - `timestamp` (timestamp)
    
    - `meals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `dish_name` (text)
      - `portion_g` (float)
      - `glucose_delta` (float)
      - `confidence` (float)
      - `advice` (text)
      - `status` (text)
      - `timestamp` (timestamp)
    
    - `chat_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `role` (text)
      - `message` (text)
      - `timestamp` (timestamp)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data only
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  email text UNIQUE,
  age integer,
  weight float,
  gender text,
  diabetes_type text,
  has_bp boolean DEFAULT false,
  has_heart_condition boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create vitals table
CREATE TABLE IF NOT EXISTS vitals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  glucose_level float,
  bp_systolic integer,
  bp_diastolic integer,
  heart_rate integer,
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE vitals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own vitals"
  ON vitals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own vitals"
  ON vitals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own vitals"
  ON vitals FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own vitals"
  ON vitals FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create meals table
CREATE TABLE IF NOT EXISTS meals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  dish_name text NOT NULL,
  portion_g float,
  glucose_delta float,
  confidence float,
  advice text,
  status text,
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE meals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own meals"
  ON meals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own meals"
  ON meals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own meals"
  ON meals FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own meals"
  ON meals FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create chat_history table
CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL,
  message text NOT NULL,
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chat history"
  ON chat_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chat history"
  ON chat_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own chat history"
  ON chat_history FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_vitals_user_timestamp ON vitals(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_meals_user_timestamp ON meals(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_chat_user_timestamp ON chat_history(user_id, timestamp DESC);
