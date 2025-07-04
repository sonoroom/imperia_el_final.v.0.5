// src/components/MobileMenu.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { NestedCategory } from '@/lib/api';

interface TopBarLink { name: string; href: string; }

interface MobileMenuProps {
  navLinks: NestedCategory[];
  topBarLinks: TopBarLink[];
  closeMenu: () => void;
}

const MobileMenu = ({ navLinks, topBarLinks, closeMenu }: MobileMenuProps) => {
  return (
    <>
      {/* Затемняющий фон */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeMenu}
      />
      {/* Сама панель меню */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 right-0 h-full w-full max-w-xs bg-white z-50 p-6 flex flex-col"
      >
        {/* Кнопка закрытия */}
        <div className="flex justify-end mb-8">
          <button onClick={closeMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Основные категории */}
        <nav>
          {/* 1. ИЗМЕНЕН РАЗМЕР ШРИФТА */}
          <ul className="space-y-6 text-xl font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={`/catalog/${link.slug}`} className="flex justify-between items-center">
                  <span className="text-black">{link.name}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Этот div теперь будет занимать все доступное пространство, отодвигая нижний блок вниз */}
        <div className="flex-grow" />

        {/* 2. ДОБАВЛЕН РАЗДЕЛИТЕЛЬ И ЗАГОЛОВОК */}
        <div className="border-t border-gray-200 pt-6">
           <h4 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Информация
          </h4>
          <ul className="space-y-4">
            {topBarLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-gray-600">{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  );
};

export default MobileMenu;