// src/components/TopBar.tsx
import React from 'react';

// Определяем типы
interface TopBarLink {
  name: string;
  href: string;
}
interface TopBarProps {
  links: TopBarLink[];
}

// 1. Компонент ПРИНИМАЕТ пропс 'links'
const TopBar = ({ links }: TopBarProps) => {
  return (
    <div className="hidden md:block bg-gray-100 px-6">
      <div className="container mx-auto flex h-8 justify-end">
        <ul className="flex items-center space-x-4 text-xs">

          {/* 2. Используем 'links' для .map(), а не 'topBarLinks' */}
          {links.map((link, index) => (
            <li key={link.name} className="flex items-center">
              <a href={link.href} className="text-gray-600 hover:text-black">
                {link.name}
              </a>
              {index < links.length - 1 && (
                <span className="ml-4 h-3 w-px bg-gray-300"></span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopBar;