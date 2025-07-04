// src/app/page.tsx
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <div>
      <Hero />
      {/* Здесь, под Hero блоком, мы позже добавим
          секцию "Популярные товары" или что-то еще */}
      <div className="container mx-auto my-12">
        <h2 className="text-3xl font-bold text-center">Скоро здесь будут избранные товары</h2>
      </div>
    </div>
  );
}