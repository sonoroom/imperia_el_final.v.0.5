// src/app/catalog/[slug]/page.tsx


import { fetchCategories, buildCategoryTree, fetchProductsByCategorySlugs, Product, Category, NestedCategory } from '@/lib/api'; // Убедись, что тип Product импортирован
import FilterSidebar from '@/components/FilterSidebar';
import ProductGrid from '@/components/ProductGrid';

// Эта функция говорит Next.js, какие страницы создавать
export async function generateStaticParams() {
  const categories = await fetchCategories();
  // Возвращаем массив слагов
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

// Рекурсивная функция для получения всех дочерних слагов категории
function getDescendantSlugs(categoryTree: NestedCategory[], slug: string): string[] {
  let slugs: string[] = [];

  for (const category of categoryTree) {
    if (category.slug === slug) {
      slugs.push(category.slug);
      if (category.children && category.children.length > 0) {
        for (const child of category.children) {
          slugs = slugs.concat(getDescendantSlugs([child], child.slug));
        }
      }
      break;
    } else if (category.children && category.children.length > 0) {
      const childSlugs = getDescendantSlugs(category.children, slug);
      if (childSlugs.length > 0) {
        slugs = slugs.concat(childSlugs);
        break;
      }
    }
  }

  return slugs;
}

// Эта функция получает товары для конкретной категории и всех её дочерних категорий
async function getProductsForCategory(slug: string): Promise<Product[]> {
  try {
    const categories = await fetchCategories();
    const categoryTree = buildCategoryTree(categories);
    const slugs = getDescendantSlugs(categoryTree, slug);
    if (slugs.length === 0) {
      // Если категория не найдена, возвращаем пустой массив
      return [];
    }
    const products = await fetchProductsByCategorySlugs(slugs);
    return products;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Это сам компонент страницы
export default async function CatalogPage({ params }: { params: { slug: string } }) {
  const products = await getProductsForCategory(params.slug);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="mb-6">
        <h1 className="text-4xl font-bold capitalize">{params.slug.replace(/-/g, ' ')}</h1>
        <p className="text-gray-500 mt-2">Найдено товаров: {products.length}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Левая колонка - Фильтры */}
        <div className="lg:col-span-1">
          <FilterSidebar />
        </div>

        {/* Правая колонка - Товары */}
        <div className="lg:col-span-3">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <p>В этой категории пока нет товаров.</p>
          )}
        </div>
      </div>
    </div>
  );
}
