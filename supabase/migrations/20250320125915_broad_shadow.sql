/*
  # Update inventory with current stock levels

  1. Changes
    - Updates all inventory items with current stock levels
    - Adds new products that weren't previously in the system
    - Updates product names to match current naming
  
  2. Data
    - Updates stock levels for all products
    - Maintains existing table structure
    - Preserves RLS policies
*/

-- Clear existing inventory data
TRUNCATE TABLE inventory;

-- Insert current inventory data
INSERT INTO inventory (code, name, size, stock) VALUES
    -- T-shirts
    ('tshirt-dobro', 'Футболка Добро зеленая', 'M', 1),
    ('tshirt-dobro', 'Футболка Добро зеленая', 'L', 5),
    ('tshirt-dobro', 'Футболка Добро зеленая', 'XL', 2),
    ('long-dobro', 'Лонг Добро зеленый', 'S', 2),
    ('long-dobro', 'Лонг Добро зеленый', 'L', 2),
    ('long-dobro', 'Лонг Добро зеленый', 'XL', 1),
    ('dobro-kozel', 'Футболка Добро Козел черная', 'S', 2),
    ('dobro-kozel', 'Футболка Добро Козел черная', 'M', 1),
    ('tshirt-daktil', 'Футболка Дактиль', 'S', 1),
    ('tshirt-daktil', 'Футболка Дактиль', 'M', 1),
    ('tshirt-okrug', 'Футболка Округ', 'XXL', 2),
    ('tshirt-domsovetov', 'Футболка Дом Советов', 'S', 3),
    ('tshirt-domsovetov', 'Футболка Дом Советов', 'M', 1),
    ('tshirt-skulls', 'Футболка Черепа', 'L', 1),
    ('tshirt-skulls', 'Футболка Черепа', 'XL', 5),
    ('tshirt-skulls', 'Футболка Черепа', 'XXL', 1),
    ('tshirt-lifar', 'Футболка Лыфарь', 'S', 1),
    ('tshirt-lifar', 'Футболка Лыфарь', 'XL', 4),
    ('tshirt-tennis', 'Футболка Теннис', 'M', 1),
    ('tshirt-tennis', 'Футболка Теннис', 'XL', 1),
    ('tshirt-planet', 'Футболка планета с подтеком черная', 'S', 1),
    ('tshirt-brown', 'Футболка Союз Коричневая (гилдан)', 'S', 2),
    ('tshirt-bndt1', 'Футболка БНДТ белая', 'XL', 1),
    ('tshirt-bndt2', 'Футболка БНДТ белая', 'XXL', 1),
    ('tshirt-bndt2', 'Футболка БНДТ бордовая', 'M', 1),
    
    -- Longsleeves
    ('long-pink', 'Лонг Огонь розовый', 'L', 1),
    ('long-pink', 'Лонг Огонь розовый', 'XL', 2),
    
    -- Crops
    ('crop-black', 'Кроп черный', 'XS', 1),
    ('crop-black', 'Кроп черный', 'S', 1),
    ('crop-black', 'Кроп черный', 'M', 1),
    ('crop-cherry', 'Кроп Вишни', 'XS', 4),
    ('crop-cherry', 'Кроп Вишни', 'S', 1),
    ('crop-cherry', 'Кроп Вишни', 'M', 4),
    ('crop-tie', 'Кроп Бант', 'XS', 3),
    ('crop-tie', 'Кроп Бант', 'S', 1),
    ('crop-tie', 'Кроп Бант', 'M', 2),
    
    -- Pants
    ('pants-1', 'Штаны бежевые', 'XS', 1),
    ('pants-2', 'Штаны бежевые', 'S', 3),
    ('pants-3', 'Штаны бежевые', 'M', 4),
    ('pants-4', 'Штаны бежевые', 'L', 1),
    ('pants-5', 'Штаны бежевые', 'XL', 1),
    
    -- Hoodies
    ('hoodie-1', 'Худи Планета с подтеком', 'S', 3),
    ('hoodie-2', 'Худи Планета с подтеком', 'XL', 1),
    
    -- Accessories
    ('bucketbag', 'Сумка bucket', 'б/р', 2),
    ('socks', 'Носки', '40-45', 4),
    ('socks', 'Носки', '35-40', 19),
    ('case', 'Чехол для очков', 'б/р', 5),
    ('mug-dune', 'Кружка Дюна', 'б/р', 3),
    ('mug-chille', 'Кружка Чили Вили', 'б/р', 2),
    ('domsovetov', 'Дом Советов', 'б/р', 1),
    ('poster', 'Плакат', 'б/р', 4);