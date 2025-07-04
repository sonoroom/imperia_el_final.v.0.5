// src/lib/api.ts

// --- ТИПЫ ДАННЫХ ---

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
}

export interface NestedCategory extends Category {
  children?: NestedCategory[];
}

export interface ProductImage {
  image: string;
  is_main: boolean;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: string;
  stock_quantity: number;
  category: number; // ID категории
  tags: string[];
  attributes: string[];
  images: ProductImage[];
}

// --- ФУНКЦИИ ДЛЯ РАБОТЫ С API ---

// Получает все категории
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/categories/');
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Строит иерархию категорий
export const buildCategoryTree = (categories: Category[]): NestedCategory[] => {
  const categoryMap: { [key: number]: NestedCategory } = {};
  const tree: NestedCategory[] = [];

  categories.forEach(category => {
    categoryMap[category.id] = { ...category, children: [] };
  });

  categories.forEach(category => {
    if (category.parent !== null) {
      const parent = categoryMap[category.parent];
      if (parent) {
        parent.children?.push(categoryMap[category.id]);
      }
    } else {
      tree.push(categoryMap[category.id]);
    }
  });

  return tree;
};

export const fetchAllProducts = async (): Promise<{ slug: string }[]> => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/products/`);
    if (!res.ok) return [];
    const products: Product[] = await res.json();
    // Возвращаем только то, что нужно для generateStaticParams
    return products.map(p => ({ slug: p.slug }));
  } catch (error) {
    console.error("Failed to fetch all products:", error);
    return [];
  }
};

// Новый метод для получения товаров по нескольким слагам категорий
export const fetchProductsByCategorySlugs = async (slugs: string[]): Promise<Product[]> => {
  try {
    // Формируем строку запроса с несколькими category__slug
    const query = slugs.map(slug => `category__slug=${encodeURIComponent(slug)}`).join('&');
    const res = await fetch(`http://127.0.0.1:8000/api/v1/products/?${query}`);
    if (!res.ok) {
      console.error(`Failed to fetch products for categories ${slugs.join(', ')}, status: ${res.status}`);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Failed to fetch products by category slugs:", error);
    return [];
  }
};

