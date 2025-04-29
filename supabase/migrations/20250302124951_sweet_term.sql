/*
  # Add product sizes to inventory

  1. New Inventory Items
    - Add sizes for pants-1 (S, M, L, XL)
    - Add sizes for hoodie-1 (S, M, L, XL)
    - Add sizes for bag-1 (One Size)
  
  2. Data
    - Each size has initial stock quantity
*/

-- Add pants sizes
INSERT INTO inventory (code, name, size, stock)
VALUES 
  ('pants-1', 'Брюки Союз 2.0', 'S', 5),
  ('pants-1', 'Брюки Союз 2.0', 'M', 8),
  ('pants-1', 'Брюки Союз 2.0', 'L', 6),
  ('pants-1', 'Брюки Союз 2.0', 'XL', 4)
ON CONFLICT (code, size) DO UPDATE
SET stock = EXCLUDED.stock, name = EXCLUDED.name;

-- Add hoodie sizes
INSERT INTO inventory (code, name, size, stock)
VALUES 
  ('hoodie-1', 'Худи Союз', 'S', 7),
  ('hoodie-1', 'Худи Союз', 'M', 9),
  ('hoodie-1', 'Худи Союз', 'L', 5),
  ('hoodie-1', 'Худи Союз', 'XL', 3)
ON CONFLICT (code, size) DO UPDATE
SET stock = EXCLUDED.stock, name = EXCLUDED.name;

-- Add bag size (one size)
INSERT INTO inventory (code, name, size, stock)
VALUES 
  ('bag-1', 'Сумка Союз "Basic Bag"', 'Один размер', 12)
ON CONFLICT (code, size) DO UPDATE
SET stock = EXCLUDED.stock, name = EXCLUDED.name;