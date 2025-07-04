// src/components/FilterSidebar.tsx
import React from 'react';

const FilterSidebar = () => {
  return (
    <aside>
      <h3 className="text-lg font-bold mb-4">Фильтры</h3>
      {/* TODO: Заменить на динамические данные */}
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Наличие</h4>
          <ul className="space-y-1">
            <li><label className="flex items-center"><input type="checkbox" className="mr-2" /> В наличии</label></li>
            <li><label className="flex items-center"><input type="checkbox" className="mr-2" /> Новинка</label></li>
          </ul>
        </div>
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-2">Бренд</h4>
           <ul className="space-y-1">
            <li><label className="flex items-center"><input type="checkbox" className="mr-2" /> Intel</label></li>
            <li><label className="flex items-center"><input type="checkbox" className="mr-2" /> AMD</label></li>
            <li><label className="flex items-center"><input type="checkbox" className="mr-2" /> Nvidia</label></li>
          </ul>
        </div>
      </div>
    </aside>
  );
};
export default FilterSidebar;