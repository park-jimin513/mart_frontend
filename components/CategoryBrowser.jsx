"use client";

import Link from "next/link";
import { categoryDisplayItems } from "../data/categoryDisplayItems";

export default function CategoryBrowser({
  title,
  selectedCategory,
  onSelectCategory,
  variant = "catalog"
}) {
  const isSelectable = typeof onSelectCategory === "function";

  return (
    <section className={`category-browser category-browser-${variant}`} aria-label={title || "Browse categories"}>
      {title && <h2 className="category-browser-title">{title}</h2>}
      <div className="category-browser-grid">
        {categoryDisplayItems.map((category) => {
          const selected = selectedCategory === category.slug;
          const cardContent = (
            <>
              <span className="category-browser-image">
                <img src={category.image} alt="" loading="lazy" />
              </span>
              <span className="category-browser-label">{category.name}</span>
            </>
          );

          return isSelectable ? (
            <button
              key={category.id}
              type="button"
              className={`category-browser-card${selected ? " active" : ""}`}
              onClick={() => onSelectCategory(category.slug)}
              aria-pressed={selected}
            >
              {cardContent}
            </button>
          ) : (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="category-browser-card"
            >
              {cardContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
