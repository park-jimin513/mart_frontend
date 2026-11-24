// app/categories/[slug]/page.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowUpDown, Filter } from "lucide-react";
import ProductCard from "../../../components/ProductCard";
import { categories } from "../../../data/categories";
import { products } from "../../../data/products";

export default function CategoryDetailsPage({ params }) {
  const { slug } = params;
  const category = categories.find((c) => c.slug === slug);
  const [selectedSub, setSelectedSub] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  if (!category && slug !== "all") {
    return (
      <div className="container not-found-box">
        <h2>Category Not Found</h2>
        <p>The category you are looking for does not exist.</p>
        <Link href="/products" className="btn-hero-primary">Back to All Products</Link>
      </div>
    );
  }

  const categoryProducts = products.filter((p) => {
    const matchCat = slug === "all" || p.category === slug;
    const matchSub = selectedSub === "All" || p.subCategory === selectedSub;
    return matchCat && matchSub;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="container category-page-layout">
      {/* Breadcrumb */}
      <div className="breadcrumbs-nav">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <Link href="/products">Categories</Link>
        <ChevronRight size={14} />
        <span className="current-crumb">{category?.name || "All"}</span>
      </div>

      {/* Category Header Banner */}
      <div className="category-header-banner">
        <div className="cat-banner-text">
          <span className="cat-banner-icon">{category?.icon}</span>
          <div>
            <h1>{category?.name}</h1>
            <p>{category?.description || "Fresh and verified items delivered within 20 km"}</p>
          </div>
        </div>
      </div>

      {/* Subcategory Filter Tabs */}
      {category?.subCategories && category.subCategories.length > 0 && (
        <div className="subcat-bar">
          <button
            type="button"
            className={`subcat-pill ${selectedSub === "All" ? "active" : ""}`}
            onClick={() => setSelectedSub("All")}
          >
            All {category.name}
          </button>
          {category.subCategories.map((sub) => (
            <button
              key={sub}
              type="button"
              className={`subcat-pill ${selectedSub === sub ? "active" : ""}`}
              onClick={() => setSelectedSub(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Product Results Header */}
      <div className="category-results-head">
        <span>Showing <b>{categoryProducts.length}</b> products</span>
        <div className="sort-mini">
          <ArrowUpDown size={14} />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default order</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="products-shelf-grid">
        {categoryProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
