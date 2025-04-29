/*
  # Create inventory table and add initial data

  1. New Tables
    - `inventory`
      - `id` (uuid, primary key)
      - `code` (text) - Product code
      - `name` (text) - Product name
      - `size` (text) - Size code
      - `stock` (integer) - Available quantity
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on inventory table
    - Add policy for authenticated users to read inventory data
    - Add policy for admin users to modify inventory data

  3. Initial Data
    - Add inventory for pants-1, hoodie-1, and tshirt-2
*/

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    code text NOT NULL,
    name text NOT NULL,
    size text NOT NULL,
    stock integer NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(code, size)
);

-- Enable RLS
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access"
    ON inventory
    FOR SELECT
    TO public
    USING (true);

CREATE POLICY "Allow admin full access"
    ON inventory
    TO authenticated
    USING (auth.uid() IN (
        SELECT id FROM auth.users WHERE auth.email() IN ('admin@example.com')
    ))
    WITH CHECK (auth.uid() IN (
        SELECT id FROM auth.users WHERE auth.email() IN ('admin@example.com')
    ));

-- Insert initial inventory data
INSERT INTO inventory (code, name, size, stock) VALUES
    -- Pants
    ('pants-1', 'Брюки Союз 2.0', 'S', 5),
    ('pants-1', 'Брюки Союз 2.0', 'M', 8),
    ('pants-1', 'Брюки Союз 2.0', 'L', 6),
    ('pants-1', 'Брюки Союз 2.0', 'XL', 4),
    
    -- Hoodie
    ('hoodie-1', 'Худи Союз', 'S', 7),
    ('hoodie-1', 'Худи Союз', 'M', 9),
    ('hoodie-1', 'Худи Союз', 'L', 5),
    ('hoodie-1', 'Худи Союз', 'XL', 3),
    
    -- T-Shirt
    ('tshirt-2', 'Футболка Союз', 'S', 10),
    ('tshirt-2', 'Футболка Союз', 'M', 12),
    ('tshirt-2', 'Футболка Союз', 'L', 8),
    ('tshirt-2', 'Футболка Союз', 'XL', 6)
ON CONFLICT (code, size) 
DO UPDATE SET 
    stock = EXCLUDED.stock,
    name = EXCLUDED.name,
    updated_at = now();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_inventory_updated_at
    BEFORE UPDATE ON inventory
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();