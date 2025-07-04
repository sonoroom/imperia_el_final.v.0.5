// src/components/ProductDisplay.tsx
'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/lib/api';

// 1. Указываем базовый URL нашего бэкенда
const API_BASE_URL = 'http://127.0.0.1:8000';

interface ProductDisplayProps {
  product: Product;
}

export default function ProductDisplay({ product }: ProductDisplayProps) {
  // Находим главное изображение или берем первое из списка
  // Фильтруем изображения, чтобы исключить undefined или пустые
  const validImages = product.images.filter(img => img.image && img.image.length > 0);

  const mainImage = validImages.find(img => img.is_main) || validImages[0];

  // Состояние для отслеживания текущего активного изображения
  const [activeImage, setActiveImage] = useState(mainImage?.image || '/placeholder.jpg');

  // Эффект, чтобы сбрасывать активное изображение при смене товара
  useEffect(() => {
    const newMainImage = validImages.find(img => img.is_main) || validImages[0];
    setActiveImage(newMainImage?.image || '/placeholder.jpg');
  }, [product]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

        {/* ЛЕВАЯ КОЛОНКА: ГАЛЕРЕЯ */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
          {/* Вертикальная лента с миниатюрами */}
          <div className="flex md:flex-col gap-3">
            {validImages.map((img) => (
 <div
                key={img.image}
                className={`w-16 h-16 cursor-pointer border-2 transition-all ${activeImage === img.image ? 'border-black' : 'border-transparent'}`}
                onClick={() => setActiveImage(img.image)}
              >
                {/* 3. Собираем полный URL для миниатюры */}
                <img src={img.image.startsWith('http://') || img.image.startsWith('https://') ? img.image : `${API_BASE_URL}${img.image.startsWith('/') ? img.image : '/' + img.image}`} alt={`${product.name} thumbnail`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Основное изображение */}
          <div className="flex-grow">
            <img src={activeImage && (activeImage.startsWith('http://') || activeImage.startsWith('https://')) ? activeImage : `${API_BASE_URL}${activeImage && activeImage.startsWith ? (activeImage.startsWith('/') ? activeImage : '/' + activeImage) : '/placeholder.jpg'}`} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА: ИНФОРМАЦИЯ */}
        <div className="flex flex-col py-4">
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-500 mt-2">Артикул: {product.id}</p>
          <p className="text-4xl md:text-5xl font-light my-6">{product.price} ₽</p>

          <div className="prose max-w-none text-gray-700">
            <p>{product.description}</p>
          </div>

          <div className="mt-8">
            <button className="w-full bg-black text-white py-4 px-8 text-lg font-medium hover:bg-gray-800 transition-colors">
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}