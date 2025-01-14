/*
  # Create alerts table for cryptocurrency price monitoring

  1. New Tables
    - `alerts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `cryptocurrency_id` (integer)
      - `target_price` (numeric)
      - `condition` (text, either 'above' or 'below')
      - `triggered` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `alerts` table
    - Add policies for users to manage their own alerts
*/

CREATE TABLE alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  cryptocurrency_id integer NOT NULL,
  target_price numeric NOT NULL,
  condition text NOT NULL CHECK (condition IN ('above', 'below')),
  triggered boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own alerts
CREATE POLICY "Users can read own alerts"
  ON alerts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to create their own alerts
CREATE POLICY "Users can create alerts"
  ON alerts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own alerts
CREATE POLICY "Users can delete own alerts"
  ON alerts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);