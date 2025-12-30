// components/CategoryCard.tsx (updated)
'use client';

import { Category } from '../../types/category';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../CategoryCard.module.css';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    router.push(`/categories/${category.slug}`);
  };

  return (
    <div 
      className={`${styles.categoryCard} ${isHovered ? styles.hovered : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.cardImage}>
        <img 
          src={category.image} 
          alt={category.name}
          className={`${styles.image} ${isHovered ? styles.zoomed : ''}`}
        />
        <div 
          className={styles.gradientOverlay}
          style={{ background: category.gradient }}
        />
        <div className={styles.iconBadge}>
          <span className={styles.icon}>{category.icon}</span>
        </div>
        {category.isFeatured && (
          <div className={styles.featuredBadge}>
            <span>Featured</span>
          </div>
        )}
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.categoryName}>{category.name}</h3>
        <p className={styles.categoryDescription}>{category.description}</p>
        
        <div className={styles.categoryStats}>
          <span className={styles.productCount}>
            {category.productCount} products
          </span>
        </div>

        <div className={styles.tagsContainer}>
          {category.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className={`${styles.actionButton} ${isHovered ? styles.active : ''}`}>
          <span>Explore Category</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    </div>
  );
}