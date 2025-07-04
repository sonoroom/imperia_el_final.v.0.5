// src/components/MegaMenu.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { NestedCategory } from '@/lib/api';

interface MegaMenuProps {
  content: NestedCategory[];
}

// 1. Создаем "варианты" анимации для родительской панели
const panelVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    }
  },
  visible: {
    height: 'auto', // Автоматическая высота в зависимости от контента
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      // Говорим дочерним элементам начать анимацию с задержкой после родительской
      staggerChildren: 0.3,
    }
  }
};

// 2. Создаем "варианты" анимации для контента внутри панели
const contentVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    }
  }
};


const MegaMenu = ({ content }: MegaMenuProps) => {
  return (
    // ВНЕШНЯЯ ПАНЕЛЬ: анимируем ее высоту и прозрачность
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      // Важно! Скрываем все, что выходит за пределы анимируемой высоты
      className="absolute top-full left-0 w-full bg-white text-sm text-gray-700 shadow-lg border-t border-gray-200 overflow-hidden"
    >
      {/* ВНУТРЕННИЙ КОНТЕНТ: анимируем его появление */}
<motion.div
  variants={contentVariants}
  className="container mx-auto flex justify-center gap-x-16 px-6 py-10"
>
        {content.map((column) => (
          // Оборачиваем каждую колонку в motion.div для каскадной анимации
          <motion.div key={column.id} variants={contentVariants}>
            <a href={`/catalog/${column.slug}`} className="block font-bold text-gray-900 mb-4">
              {column.name}
            </a>
            <ul className="space-y-3">
              {column.children?.map((link) => (
                <li key={link.id}>
                  <a href={`/catalog/${link.slug}`} className="hover:text-black">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MegaMenu;