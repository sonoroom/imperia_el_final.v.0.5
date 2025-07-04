// src/app/products/[slug]/page.tsx
import ProductDisplay from "@/components/ProductDisplay";
import { Product, fetchAllProducts } from "@/lib/api";

// Говорит Next.js, какие страницы товаров нужно создать заранее
export async function generateStaticParams() {
  const products = await fetchAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Загружает данные для ОДНОГО товара
async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/v1/products/${slug}/`);
    if (!res.ok) {
      console.error(`Failed to fetch product with slug ${slug}, status: ${res.status}`);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
}

// Сам компонент страницы
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    return <div>Товар не найден</div>;
  }

  // Передаем полученные данные в клиентский компонент для отрисовки
  return <ProductDisplay product={product} />;
}