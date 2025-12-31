// app/categories/[slug]/CategoryDetailClient.tsx (CSS Modules version)
'use client';

import { Category } from '../../types/category';
import styles from './CategoryDetail.module.css';

interface CategoryDetailClientProps {
  category: Category;
}

export default function CategoryDetailClient({ category }: CategoryDetailClientProps) {
  return (
    <div className={styles.categoryDetailPage}>
      <div 
        className={styles.categoryHero}
        style={{ backgroundImage: `url(${category.coverImage})` }}
      >
        <div 
          className={styles.heroOverlay} 
          style={{ background: category.gradient }} 
        />
        <div className={styles.heroContent}>
          <div className={styles.heroIcon}>{category.icon}</div>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
          <div className={styles.heroStats}>
            <span>{category.productCount} Products</span>
            <span>•</span>
            <span>{category.tags.join(', ')}</span>
          </div>
        </div>
      </div>

      <div className={styles.pageContent}>
        <h2>Products in {category.name}</h2>
        <p>Coming soon - product listings for this category...</p>
        
        <div className={styles.productsPlaceholder}>
          <div className={styles.placeholderCard}>
            <div className={styles.placeholderImage}></div>
            <div className={styles.placeholderContent}>
              <h3>Product Name</h3>
              <p>Product description will appear here</p>
              <div className={styles.placeholderPrice}>1000PKR</div>
            </div>
          </div>
          <div className={styles.placeholderCard}>
            <div className={styles.placeholderImage}></div>
            <div className={styles.placeholderContent}>
              <h3>Another Product</h3>
              <p>More products coming soon</p>
              <div className={styles.placeholderPrice}>200PKR</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}