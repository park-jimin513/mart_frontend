// components/CategoryStrip.jsx
"use client";

import React from "react";
import Link from "next/link";
import { categories } from "../data/categories";

export default function CategoryStrip() {
  const stripCategories = categories.slice(1);

  return (
    <section className="category-strip-section">
      <div className="category-marquee" aria-label="Browse product categories">
        <div className="category-marquee-track">
          {[false, true].map((isDuplicate) => (
            <div
              key={isDuplicate ? "duplicate" : "original"}
              className="category-marquee-group"
              aria-hidden={isDuplicate || undefined}
            >
              {stripCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="category-strip-pill"
                  tabIndex={isDuplicate ? -1 : undefined}
                >
                  <div className="category-circle-avatar">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt=""
                        className="category-avatar-img"
                      />
                    ) : (
                      <span className="category-fallback-icon">{cat.icon}</span>
                    )}
                  </div>
                  <span className="category-strip-title">{cat.name}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
