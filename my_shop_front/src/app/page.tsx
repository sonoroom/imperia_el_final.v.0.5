// src/app/page.tsx
import HeroSlider from '@/components/HeroSlider';

export default function HomePage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <HeroSlider />
      {/* Остальной контент главной страницы */}
      <div className="container mx-auto my-12">
        <h2 className="text-3xl font-bold text-center">Популярные товары</h2>
        {/* Здесь будет список товаров */}
      </div>
    </div>
  );
}