// app/categories/page.tsx
import { getCategories } from '../data/categories';
import CategoryCard from '../components/categories/CategoryCard';

import './CategoriesPage.css';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="categories-page">
      <div className="page-header">
        <h1>Explore Categories</h1>
        <p>Discover products that match your lifestyle and interests</p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}