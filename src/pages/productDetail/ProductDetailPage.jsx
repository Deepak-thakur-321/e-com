import React, { useState } from 'react';
import { ShoppingCart, Heart, Truck, RefreshCw, Shield, ChevronLeft, ChevronRight, Star, Check, Package, Award } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCollectionProducts } from '../../app/features/products/collectionProductSlice';
import { addToCart } from '../../app/features/cart/cartSlice';

export default function ProductDetailPage() {
   const [selectedSize, setSelectedSize] = useState('');
   const [selectedColor, setSelectedColor] = useState('');
   const [quantity, setQuantity] = useState(1);
   const [selectedImage, setSelectedImage] = useState(0);
   const [isWishlisted, setIsWishlisted] = useState(false);
   const [showAddedToCart, setShowAddedToCart] = useState(false);

   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const products = useSelector(selectCollectionProducts);

   const product = products?.find((p) => p.id === Number(id));

   if (!product) {
      return (
         <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
               <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
               <button
                  onClick={() => navigate('/collections')}
                  className="bg-black text-white px-6 py-2 rounded-lg"
               >
                  Back to Collections
               </button>
            </div>
         </div>
      );
   }

   // Get similar products (same category, different id)
   const similarProducts = products?.filter(
      (p) => p.category === product.category && p.id !== product.id
   ).slice(0, 4) || [];

   // Set initial color when component loads
   React.useEffect(() => {
      if (product?.colors?.length > 0 && !selectedColor) {
         setSelectedColor(product.colors[0].name);
      }
   }, [product, selectedColor]);

   // Get current color's images or default images
   const getCurrentImages = () => {
      if (!selectedColor) return product.images;

      const colorData = product.colors?.find(c => c.name === selectedColor);
      return colorData?.images || product.images;
   };

   const currentImages = getCurrentImages();

   const nextImage = () => {
      setSelectedImage((prev) => (prev + 1) % currentImages.length);
   };

   const prevImage = () => {
      setSelectedImage((prev) => (prev - 1 + currentImages.length) % currentImages.length);
   };

   // Handle color change - reset selected image
   const handleColorChange = (colorName) => {
      setSelectedColor(colorName);
      setSelectedImage(0);
   };

   // Handle Add to Cart
   const handleAddToCart = () => {
      if (!selectedSize) {
         alert('Please select a size');
         return;
      }

      const cartItem = {
         id: product.id,
         name: product.name,
         price: product.price,
         image: currentImages[0],
         size: selectedSize,
         color: selectedColor,
         quantity: quantity
      };

      dispatch(addToCart(cartItem));
      setShowAddedToCart(true);

      setTimeout(() => {
         setShowAddedToCart(false);
      }, 3000);
   };

   return (
      <div className="min-h-screen bg-white">
         {/* Success Toast */}
         {showAddedToCart && (
            <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 animate-slide-in">
               <Check className="w-5 h-5" />
               <span>Added to cart successfully!</span>
            </div>
         )}

         {/* Breadcrumb */}
         <div className="border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
               <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <button onClick={() => navigate('/')} className="hover:text-black transition-colors">Home</button>
                  <span>/</span>
                  <button onClick={() => navigate('/collections')} className="hover:text-black transition-colors">Collections</button>
                  <span>/</span>
                  <span className="text-black font-medium">{product.name}</span>
               </div>
            </div>
         </div>

         {/* Product Section */}
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               {/* Image Gallery */}
               <div className="space-y-6">
                  <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden group">
                     <img
                        src={currentImages[selectedImage]}
                        alt={product.name}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                     />
                     {currentImages.length > 1 && (
                        <>
                           <button
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                           >
                              <ChevronLeft className="w-5 h-5" />
                           </button>
                           <button
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                           >
                              <ChevronRight className="w-5 h-5" />
                           </button>
                        </>
                     )}
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                     {currentImages.map((img, idx) => (
                        <button
                           key={idx}
                           onClick={() => setSelectedImage(idx)}
                           className={`aspect-[3/4] overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-black' : 'border-gray-200 hover:border-gray-400'
                              }`}
                        >
                           <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                     ))}
                  </div>
               </div>

               {/* Product Info */}
               <div className="space-y-8">
                  <div>
                     <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">{product.category}</p>
                     <h1 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4 leading-tight">{product.name}</h1>
                     <div className="flex items-center space-x-4 mb-6">
                        <div className="flex items-center">
                           {[...Array(5)].map((_, i) => (
                              <Star
                                 key={i}
                                 className={`w-4 h-4 ${i < Math.floor(product.rating)
                                       ? 'fill-black text-black'
                                       : 'text-gray-300'
                                    }`}
                              />
                           ))}
                        </div>
                        <span className="text-sm text-gray-600">{product.rating}</span>
                        <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                     </div>
                  </div>

                  <div className="flex items-baseline space-x-4 pb-6 border-b border-gray-200">
                     <span className="text-4xl font-light text-gray-900">₹{product.price?.toLocaleString()}</span>
                     {product.originalPrice && (
                        <>
                           <span className="text-xl text-gray-400 line-through">₹{product.originalPrice?.toLocaleString()}</span>
                           <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                              {product.discount}% OFF
                           </span>
                        </>
                     )}
                  </div>

                  <p className="text-gray-600 leading-relaxed text-base">{product.description}</p>

                  {/* Color Selection */}
                  <div>
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-900 tracking-wider">COLOR</h3>
                        <span className="text-sm text-gray-600 capitalize">{selectedColor}</span>
                     </div>
                     <div className="flex flex-wrap gap-3">
                        {product.colors?.map((color) => (
                           <button
                              key={color.name}
                              onClick={() => handleColorChange(color.name)}
                              className={`relative w-14 h-14 rounded-full border-2 transition-all ${selectedColor === color.name ? 'border-black scale-110' : 'border-gray-300 hover:border-gray-500'
                                 }`}
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                           >
                              {selectedColor === color.name && (
                                 <div className="absolute inset-0 flex items-center justify-center">
                                    <Check className="w-6 h-6 text-white drop-shadow-lg" />
                                 </div>
                              )}
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                     <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-medium text-gray-900 tracking-wider">SIZE</h3>
                        <button className="text-sm text-gray-600 hover:text-black underline">Size Guide</button>
                     </div>
                     <div className="grid grid-cols-6 gap-3">
                        {product.sizes?.map((size) => (
                           <button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`py-3 border-2 font-medium transition-all ${selectedSize === size
                                    ? 'border-black bg-black text-white'
                                    : 'border-gray-300 hover:border-gray-500'
                                 }`}
                           >
                              {size}
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Quantity */}
                  <div>
                     <h3 className="text-sm font-medium text-gray-900 tracking-wider mb-4">QUANTITY</h3>
                     <div className="flex items-center space-x-4">
                        <button
                           onClick={() => setQuantity(Math.max(1, quantity - 1))}
                           className="w-12 h-12 border-2 border-gray-300 hover:border-black transition-colors flex items-center justify-center text-lg"
                        >
                           −
                        </button>
                        <span className="text-lg font-medium w-16 text-center">{quantity}</span>
                        <button
                           onClick={() => setQuantity(quantity + 1)}
                           className="w-12 h-12 border-2 border-gray-300 hover:border-black transition-colors flex items-center justify-center text-lg"
                        >
                           +
                        </button>
                     </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                     <button
                        onClick={handleAddToCart}
                        className="w-full bg-black text-white py-4 px-6 font-medium hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
                     >
                        <ShoppingCart className="w-5 h-5" />
                        <span>ADD TO CART</span>
                     </button>
                     <button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className={`w-full py-4 px-6 border-2 font-medium transition-colors flex items-center justify-center space-x-2 ${isWishlisted
                              ? 'border-red-500 text-red-500'
                              : 'border-gray-300 hover:border-black'
                           }`}
                     >
                        <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                        <span>{isWishlisted ? 'WISHLISTED' : 'ADD TO WISHLIST'}</span>
                     </button>
                  </div>

                  {/* Brand Promise */}
                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                     <div className="text-center">
                        <Truck className="w-8 h-8 mx-auto mb-2 text-gray-900" />
                        <p className="text-xs font-medium text-gray-900 mb-1">Free Shipping</p>
                        <p className="text-xs text-gray-500">On orders ₹999+</p>
                     </div>
                     <div className="text-center">
                        <RefreshCw className="w-8 h-8 mx-auto mb-2 text-gray-900" />
                        <p className="text-xs font-medium text-gray-900 mb-1">Easy Returns</p>
                        <p className="text-xs text-gray-500">30-day policy</p>
                     </div>
                     <div className="text-center">
                        <Award className="w-8 h-8 mx-auto mb-2 text-gray-900" />
                        <p className="text-xs font-medium text-gray-900 mb-1">Premium Quality</p>
                        <p className="text-xs text-gray-500">Guaranteed</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Product Story Section */}

            {/* Care Instructions */}
            <div className="mt-16 max-w-7xl mx-auto">
               <h2 className="text-2xl font-light text-gray-900 mb-8">Care Instructions</h2>
               <div className="bg-gray-50 p-8 space-y-4">
                  <div className="flex items-start space-x-4">
                     <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                     <p className="text-gray-700">Machine wash cold with similar colors</p>
                  </div>
                  <div className="flex items-start space-x-4">
                     <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                     <p className="text-gray-700">Do not bleach or use harsh chemicals</p>
                  </div>
                  <div className="flex items-start space-x-4">
                     <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                     <p className="text-gray-700">Tumble dry low or hang to dry</p>
                  </div>
                  <div className="flex items-start space-x-4">
                     <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                     <p className="text-gray-700">Iron on low heat if needed</p>
                  </div>
               </div>
            </div>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
               <div className="mt-24 border-t border-gray-200 pt-16">
                  <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">You May Also Like</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                     {similarProducts.map((item) => (
                        <div
                           key={item.id}
                           onClick={() => {
                              navigate(`/product/${item.id}`);
                              window.scrollTo(0, 0);
                           }}
                           className="group cursor-pointer"
                        >
                           <div className="aspect-[3/4] bg-gray-50 mb-4 overflow-hidden">
                              <img
                                 src={item.images[0]}
                                 alt={item.name}
                                 className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                              />
                           </div>
                           <h3 className="text-base font-medium text-gray-900 mb-1 group-hover:underline">{item.name}</h3>
                           <div className="flex items-center space-x-2">
                              <span className="text-lg font-light">₹{item.price?.toLocaleString()}</span>
                              {item.originalPrice && (
                                 <span className="text-sm text-gray-400 line-through">₹{item.originalPrice?.toLocaleString()}</span>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}