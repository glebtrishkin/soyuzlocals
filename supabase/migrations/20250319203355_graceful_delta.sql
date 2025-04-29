/*
  # Update inventory data

  1. Changes
    - Updates existing inventory data with current stock levels
    - Ensures all products have correct names
    - Maintains existing table structure
  
  2. Data Updates
    - Updates stock levels for pants-1
    - Updates stock levels for hoodie-1
    - Updates stock levels for tshirt-2
*/

-- Update inventory data with current stock levels
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