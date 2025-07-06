// src/components/Header.tsx
'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import MegaMenu from './MegaMenu';
import { NestedCategory } from '@/lib/api';
import MobileMenu from './MobileMenu';
import Link from 'next/link';

// Интерфейс для пропсов
interface TopBarLink { name: string; href: string; }
interface HeaderProps {
  allCategories: NestedCategory[];
  topBarLinks: TopBarLink[];
}

// Статичные ссылки для основного меню
const MAIN_NAV_LINKS = [
  { name: 'Компьютеры', slug: 'kompyutery' },
  { name: 'МФУ и принтеры', slug: 'mfu-i-printery' },
  { name: 'Периферия', slug: 'periferiya' },
  { name: 'Разное', slug: 'raznoe' },
  { name: 'Видеонаблюдение', slug: 'videonablyudenie' },
  { name: 'Услуги', slug: 'uslugi' },
];

const Header = ({ allCategories, topBarLinks }: HeaderProps) => {
  // Состояние для десктопного мега-меню
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  // --- НОВОЕ: Состояние для мобильного меню ---
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentMenuContent = allCategories.find(
    (category) => category.name === activeMenu
  )?.children;

  return (
    <div className="relative z-50" onMouseLeave={() => setActiveMenu(null)}>
      <header className="bg-black text-white px-6 py-3">
        <div className="container mx-auto flex items-center justify-between">
  <div className="flex-shrink-0">
    <a href="/" aria-label="Home">
      <img
        src="https://i.postimg.cc/2y8qj6BD/logo-23232323.png"
        alt="Логотип"
        width="130"
        height="130"
        className="object-contain"
      />
    </a>
  </div>
          {/* Десктопная навигация (скрывается на мобильных) */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {MAIN_NAV_LINKS.map((link) => (
                <li key={link.name} onMouseEnter={() => setActiveMenu(link.name)}>
                  <a
                    href={`/catalog/${link.slug}`}
                    className="text-lg font-medium hover:text-gray-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Правая часть с иконками */}
           <div className="flex items-center space-x-4 md:space-x-6">

            {/* Поиск и Избранное: скрыты на мобильных, видны на десктопе */}
            <button aria-label="Search" className="hover:text-gray-400 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <a href="/favorites" aria-label="Favorites" className="hover:text-gray-400 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
            </a>

            {/* Корзина: видна ВСЕГДА */}
            <a href="/cart" aria-label="Cart" className="hover:text-gray-400 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            </a>

            {/* Бургер: виден на мобильных, скрыт на десктопе */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1 hover:text-gray-400 transition-colors"
              aria-label="Открыть меню"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Выпадающее мега-меню для десктопа */}
      <AnimatePresence>
        {currentMenuContent && currentMenuContent.length > 0 && (
          <MegaMenu content={currentMenuContent} />
        )}
      </AnimatePresence>

      {/* --- НОВОЕ: Выезжающее меню для мобильных --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            navLinks={allCategories}
            topBarLinks={topBarLinks}
            closeMenu={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;