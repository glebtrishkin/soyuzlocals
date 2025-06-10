import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductInventory, type InventoryItem, getAvailableSizes } from '../lib/supabase';
import SizeSelector from '../components/SizeSelector';
import SizeGuide from '../components/SizeGuide';
import { productsData } from '../lib/products';
import { Product } from '../lib/types';

// Category labels for display
const categoryLabels = {
  'clothing': 'ОДЕЖДА',
  'accessories': 'АКСЕССУАРЫ',
  'friends': 'ДРУЗЬЯ'
};

function ProductDetail() {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Get product type for size guide
  const getProductType = () => {
    if (!product) return 'tshirt';
    if (product.name.toLowerCase().includes('худи')) return 'hoodie';
    if (product.name.toLowerCase().includes('кроп')) return 'crop-top';
    if (product.name.toLowerCase().includes('лонг')) return 'longsleeve';
    if (product.name.toLowerCase().includes('брюки') || product.name.toLowerCase().includes('штаны')) return 'pants';
    return 'tshirt';
  };

  // Set the product based on the ID from the URL
  useEffect(() => {
    if (id && productsData[id]) {
      setProduct(productsData[id]);
    } else {
      // Fallback to the first product if ID doesn't match
      setProduct(productsData['bag-1']);
    }
  }, [id]);

  // Fetch inventory data from Supabase
  useEffect(() => {
    async function fetchInventory() {
      if (!product) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Use the helper function to get inventory for this product
        const productInventory = await getProductInventory(product.id);
        console.log(`ProductDetail - Inventory for ${product.id}:`, productInventory);
        
        if (!productInventory || productInventory.length === 0) {
          console.warn(`No inventory found for product ${product.id}`);
        }
        
        setInventory(productInventory);
        
        // Set default selected size to the first available size with stock
        if (productInventory.length > 0 && !selectedSize) {
          const inStockItem = productInventory.find(item => (item.quantity || item.stock || 0) > 0);
          if (inStockItem) {
            setSelectedSize(inStockItem.size);
            console.log(`Setting default selected size to ${inStockItem.size}`);
          }
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
        setError('Failed to load inventory data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchInventory();
  }, [product, selectedSize]);

  // Reset state when product changes
  useEffect(() => {
    setSelectedSize('');
    setQuantity(1);
    setAddedToCart(false);
  }, [id]);

  if (!product) {
    return <div className="text-center text-black">Loading...</div>;
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setAddedToCart(false); // Reset added to cart state when size changes
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10));
    setAddedToCart(false); // Reset added to cart state when quantity changes
  };

  const getAvailableQuantity = () => {
    const selectedItem = inventory.find(item => item.size.toLowerCase() === selectedSize.toLowerCase());
    return selectedItem ? (selectedItem.quantity || selectedItem.stock || 0) : 0;
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Пожалуйста, выберите размер');
      return;
    }
    
    // Check if the selected size is in stock
    const selectedItem = inventory.find(item => item.size.toLowerCase() === selectedSize.toLowerCase());
    if (!selectedItem || (selectedItem.quantity || selectedItem.stock || 0) <= 0) {
      alert('Извините, выбранный размер отсутствует в наличии');
      return;
    }

    // Check if requested quantity is available
    const availableQuantity = selectedItem.quantity || selectedItem.stock || 0;
    if (quantity > availableQuantity) {
      alert(`Извините, в наличии только ${availableQuantity} шт. этого размера`);
      return;
    }
    
    // For now, we'll just show a success message and redirect to cart
    setAddedToCart(true);
    
    // After a short delay, redirect to cart
    setTimeout(() => {
      window.location.href = '/cart';
    }, 1000);
  };

  // Get related products from the same category (excluding current product)
  const relatedProducts = Object.values(productsData)
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 2);

  // Get available sizes from inventory
  const availableSizes = getAvailableSizes(inventory);

  // Generate quantity options based on available stock
  const maxQuantity = getAvailableQuantity();
  const quantityOptions = Array.from({ length: Math.min(maxQuantity, 10) }, (_, i) => i + 1);

  // Get category label
  const categoryLabel = categoryLabels[product.category as keyof typeof categoryLabels] || '';

  // Check if any sizes are available
  const hasAvailableSizes = availableSizes && availableSizes.length > 0 && availableSizes.some(size => size.inStock);

  return (
    <div className="pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 pt-8">
          <ol className="flex text-sm">
            <li><Link to="/" className="text-black hover:opacity-70">Главная</Link></li>
            <li className="mx-2 text-black">/</li>
            <li><Link to="/shop" className="text-black hover:opacity-70">Магазин</Link></li>
            {categoryLabel && (
              <>
                <li className="mx-2 text-black">/</li>
                <li>
                  <Link 
                    to={`/shop?category=${product.category}`} 
                    className="text-black hover:opacity-70"
                  >
                    {categoryLabel}
                  </Link>
                </li>
              </>
            )}
            <li className="mx-2 text-black">/</li>
            <li className="text-black">{product.name}</li>
          </ol>
        </nav>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4 overflow-hidden bg-white aspect-[3/4]">
              {product.images && product.images[currentImageIndex] ? (
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              )}
              
              {/* Brand badge for "friends" category */}
              {product.category === 'friends' && product.brand && (
                <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs">
                  {product.brand}
                </div>
              )}
            </div>
            
            {(product.thumbnails?.length ? product.thumbnails : product.images)?.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {(product.thumbnails?.length ? product.thumbnails : product.images).map((thumb, index) => (
                  <button 
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`border ${currentImageIndex === index ? 'border-black' : 'border-gray-200'}`}
                  >
                    <img 
                      src={thumb} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Category badge */}
            {categoryLabel && (
              <div className="mb-2">
                <Link 
                  to={`/shop?category=${product.category}`}
                  className="inline-block text-xs uppercase tracking-wider text-gray-500 hover:text-black"
                >
                  {categoryLabel}
                </Link>
              </div>
            )}
            
            <h1 className="text-xl font-medium mb-4 text-black">{product.name}</h1>
            <p className="text-sm mb-6 text-black">{product.price}</p>
            
            {/* Brand info for "friends" category */}
            {product.category === 'friends' && product.brand && (
              <div className="mb-6">
                <p className="text-sm text-black">
                  Бренд: <span className="font-medium">{product.brand}</span>
                </p>
              </div>
            )}
            
            {/* Size Selection with Availability Status */}
            {product.category !== 'accessories' && product.id !== 'bag-1' && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2 text-black uppercase tracking-wider">Размер</h3>
                {loading ? (
                  <p className="text-sm text-black">Загрузка размеров...</p>
                ) : availableSizes && availableSizes.length > 0 ? (
                  <SizeSelector 
                    sizes={availableSizes}
                    selectedSize={selectedSize}
                    onSizeSelect={handleSizeSelect}
                    loading={loading}
                  />
                ) : (
                  <p className="text-sm text-black">Нет доступных размеров</p>
                )}
                
                {/* Selected size availability */}
                {selectedSize && (
                  <div className="mt-3 flex items-center">
                    <span className="text-sm text-black">
                      Выбранный размер: <strong>{selectedSize}</strong>
                    </span>
                    {loading ? (
                      <span className="ml-2 text-sm text-gray-500">Проверка наличия...</span>
                    ) : (
                      <>
                        {inventory.find(item => item.size.toLowerCase() === selectedSize.toLowerCase() && 
                                              (item.quantity || item.stock || 0) > 0) ? (
                          <span className="ml-2 text-sm text-green-600 flex items-center">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                            В наличии ({inventory.find(item => 
                              item.size.toLowerCase() === selectedSize.toLowerCase())?.quantity || 
                              inventory.find(item => 
                              item.size.toLowerCase() === selectedSize.toLowerCase())?.stock || 0} шт.)
                          </span>
                        ) : (
                          <span className="ml-2 text-sm text-red-600 flex items-center">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                            Нет в наличии
                          </span>
                        )}
                      </>
                    )}
                  </div>
                )}
                
                {/* Size guide button */}
                <button 
                  className="text-xs text-black underline mt-2 hover:opacity-70"
                  onClick={() => setIsSizeGuideOpen(true)}
                >
                  Таблица размеров
                </button>
              </div>
            )}
            
            {/* For accessories or bag product - show one size only */}
            {(product.category === 'accessories' || product.id === 'bag-1') && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2 text-black uppercase tracking-wider">Размер</h3>
                <p className="text-sm text-black">Один размер</p>
                {loading ? (
                  <p className="text-sm text-black mt-2">Проверка наличия...</p>
                ) : (
                  <div className="mt-2 flex items-center">
                    {inventory.length > 0 && (inventory[0]?.quantity || inventory[0]?.stock || 0) > 0 ? (
                      <span className="text-sm text-green-600 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        В наличии ({inventory[0]?.quantity || inventory[0]?.stock || 0} шт.)
                      </span>
                    ) : (
                      <span className="text-sm text-red-600 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                        Нет в наличии
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* Quantity Selector */}
            {selectedSize && getAvailableQuantity() > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2 text-black uppercase tracking-widest">Количество</h3>
                <select 
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                >
                  {quantityOptions.map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Add to Cart Button or No Sizes Available Message */}
            {!loading && (
              <>
                {/* For clothing items - check if sizes are available */}
                {product.category === 'clothing' && (
                  <>
                    {!hasAvailableSizes ? (
                      <div className="w-full border border-gray-300 py-4 px-6 flex items-center justify-center bg-gray-100">
                        <span className="text-black font-medium uppercase tracking-wider">
                          Нет доступных размеров
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        className={`
                          tech-button w-full border border-black py-4 px-6 flex items-center justify-center 
                          uppercase font-medium relative overflow-hidden transition-all duration-700
                          ${addedToCart 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'bg-white text-black hover:bg-black hover:text-white'}
                        `}
                        disabled={!selectedSize || !inventory.find(item => 
                          item.size.toLowerCase() === selectedSize.toLowerCase() && 
                          (item.quantity || item.stock || 0) > 0)}
                      >
                        <span className="relative z-10">
                          {addedToCart ? 'ДОБАВЛЕНО В КОРЗИНУ ✓' : 'ДОБАВИТЬ В КОРЗИНУ'}
                        </span>
                      </button>
                    )}
                  </>
                )}

                {/* For accessories - check if item is in stock */}
                {(product.category === 'accessories' || product.id === 'bag-1') && (
                  <>
                    {inventory.length === 0 || (inventory[0]?.quantity || inventory[0]?.stock || 0) <= 0 ? (
                      <div className="w-full border border-gray-300 py-4 px-6 flex items-center justify-center bg-gray-100">
                        <span className="text-black font-medium uppercase tracking-wider">
                          Нет в наличии
                        </span>
                      </div>
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        className={`
                          tech-button w-full border border-black py-4 px-6 flex items-center justify-center 
                          uppercase font-medium relative overflow-hidden transition-all duration-700
                          ${addedToCart 
                            ? 'bg-green-600 text-white hover:bg-green-700' 
                            : 'bg-white text-black hover:bg-black hover:text-white'}
                        `}
                      >
                        <span className="relative z-10">
                          {addedToCart ? 'ДОБАВЛЕНО В КОРЗИНУ ✓' : 'ДОБАВИТЬ В КОРЗИНУ'}
                        </span>
                      </button>
                    )}
                  </>
                )}
              </>
            )}

            {/* Loading state */}
            {loading && (
              <div className="w-full border border-gray-300 py-4 px-6 flex items-center justify-center bg-gray-100">
                <span className="text-black font-medium uppercase tracking-wider">
                  ЗАГРУЗКА...
                </span>
              </div>
            )}
            
            {/* Size Guide */}
            {product.description && (
              <div className="mb-6 mt-6">
                <button className="text-black font-medium uppercase mb-6 text-xs tracking-wider">
                  SIZE GUIDE
                </button>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2 text-black text-xs uppercase tracking-wider">RUS:</h3>
                  <p className="text-black mb-4 text-xs">{product.description.rus}</p>
                  
                  {product.modelInfo?.rus.map((info, index) => (
                    <p key={index} className="text-black text-xs">{info}</p>
                  ))}
                </div>
                
                <div>
                  <h3 className="font-medium mb-2 text-black text-xs uppercase tracking-wider">ENG:</h3>
                  <p className="text-black mb-4 text-xs">{product.description.eng}</p>
                  
                  {product.modelInfo?.eng.map((info, index) => (
                    <p key={index} className="text-black text-xs">{info}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products Section - Responsive: 1 per row on mobile, 2 per row on desktop */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-lg font-medium mb-8 text-black uppercase tracking-wider">Вам также может понравиться</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link to={`/product/${relatedProduct.id}`} key={relatedProduct.id} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden product-card">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover product-card-image"
                    />
                    
                    {/* Brand badge for "friends" category */}
                    {relatedProduct.category === 'friends' && relatedProduct.brand && (
                      <div className="absolute top-0 right-0 bg-black text-white px-2 py-1 text-xs">
                        {relatedProduct.brand}
                      </div>
                    )}
                  </div>
                  <div className="product-card-info">
                    <h3 className="text-xs uppercase tracking-wider font-medium text-black">{relatedProduct.name}</h3>
                    <p className="text-xs text-black mt-1">{relatedProduct.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Back to Home Button */}
        <div className="flex justify-center mt-12">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-8 py-2 text-sm font-medium tracking-wider text-black bg-white border border-black uppercase"
          >
            На главную
          </Link>
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuide
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        productType={getProductType()}
      />
    </div>
  );
}

export default ProductDetail;