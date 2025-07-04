// src/components/Layout.tsx
import Header from './Header';// Убедись, что компонент Footer существует
import TopBar from './TopBar';
import React from 'react';
import { NestedCategory } from '@/lib/api';

// Данные для топ-бара теперь живут здесь
const topBarLinks = [
  { name: 'Найти магазин', href: '/stores' },
  { name: 'Помощь', href: '/help' },
  { name: 'Присоединиться', href: '/register' },
  { name: 'Войти', href: '/login' },
];

interface LayoutProps {
  children: React.ReactNode;
  categoryTree: NestedCategory[];
}

export default function Layout({ children, categoryTree }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar links={topBarLinks} />
      {/* Мы передаем в Header пропс `allCategories` */}
        <Header allCategories={categoryTree} topBarLinks={topBarLinks} />
      <main className="flex-grow">{children}</main>
    </div>
  );
}