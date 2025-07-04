// src/components/ProductCard.tsx
import React from 'react';
import { Product } from '@/lib/api'; // Используем наш тип

const API_BASE_URL = 'http://127.0.0.1:8000';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Ищем главное изображение или берем первое
  const mainImage = product.images.find(img => img.is_main) || product.images[0];

  return (
    <a href={`/products/${product.slug}`} className="group block">
     <div className="aspect-square w-full overflow-hidden bg-gray-100">
        {mainImage && (
          // Собираем полный URL
          <img
            src={mainImage.image.startsWith('http://') || mainImage.image.startsWith('https://') ? mainImage.image : `${API_BASE_URL}${mainImage.image.startsWith('/') ? mainImage.image : '/' + mainImage.image}`}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <h3 className="mt-4 text-sm font-medium text-gray-900">{product.name}</h3>
      <p className="mt-1 text-lg font-bold text-gray-900">{product.price} ₽</p>
    </a>
  );
};
export default ProductCard;