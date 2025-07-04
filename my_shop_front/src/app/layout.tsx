// src/app/layout.tsx
import Layout from '@/components/Layout';
import './globals.css';
import { fetchCategories, buildCategoryTree } from '@/lib/api';

export const metadata = {
  title: 'Империя Электроники',
  description: 'Nike в мире компьютерного оборудования',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const flatCategories = await fetchCategories();
  const categoryTree = buildCategoryTree(flatCategories);

  return (
    <html lang="ru">
      <body>
        <Layout categoryTree={categoryTree}>{children}</Layout>
      </body>
    </html>
  );
}
