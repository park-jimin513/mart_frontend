// app/products/page.jsx
"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import CategoryBrowser from "../../components/CategoryBrowser";
import { products } from "../../data/products";
import { categories } from "../../data/categories";
import { matchesProductSearch } from "../../data/productSearch.mjs";

function ProductsContent() {
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const categoryParam = searchParams.get("category") || "all";

  const [search, setSearch] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setSearch(searchParam);
    setSelectedCategory(categoryParam);
    setSelectedSubCategory("All");
  }, [searchParam, categoryParam]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory =
          selectedCategory === "all" || p.category === selectedCategory;
        const matchesSubCategory =
          selectedSubCategory === "All" || p.subCategory === selectedSubCategory;
        const matchesSearch = matchesProductSearch(
          p,
          search,
          categories.find((category) => category.slug === p.category)?.name
        );
        return matchesCategory && matchesSubCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0;
      });
  }, [selectedCategory, selectedSubCategory, search, sortBy]);

  // Current category data
  const currentCategoryData = categories.find((c) => c.slug === selectedCategory);
  const subCats = currentCategoryData?.subCategories || [];
  const resetSearch = () => {
    setSelectedCategory("all");
    setSelectedSubCategory("All");
    setSearch("");
    setSortBy("default");
  };

  return (
    <div className="container products-page-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs-nav">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <Link href="/products">Products</Link>
        {selectedCategory !== "all" && (
          <>
            <ChevronRight size={14} />
            <span className="current-crumb">{currentCategoryData?.name}</span>
          </>
        )}
      </div>

      <div className="products-layout-grid">
        <section className="catalog-main-content">
          <div className="catalog-header-bar">
            <div>
              <h1 className="catalog-title">
                {selectedCategory === "all" ? "All Village Products" : currentCategoryData?.name}
              </h1>
              <p className="catalog-count-text">
                Showing {filteredProducts.length} items available for local delivery
              </p>
            </div>

            {/* Sort Controls */}
            <div className="sort-controls-row">
              <div className="sort-dropdown-wrap">
                <ArrowUpDown size={14} />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="default">Default order</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>
          </div>

          {!search && (
            <section className="catalog-category-section">
              <CategoryBrowser
                title="Categories"
                selectedCategory={selectedCategory}
                onSelectCategory={(slug) => {
                  setSelectedCategory(slug);
                  setSelectedSubCategory("All");
                }}
              />
              {subCats.length > 0 && selectedCategory !== "all" && (
                <div className="subcategory-filter-group">
                  <h4 className="filter-title">{currentCategoryData?.name} Types</h4>
                  <div className="subcat-chips">
                    <button
                      type="button"
                      className={`subcat-chip ${selectedSubCategory === "All" ? "active" : ""}`}
                      onClick={() => setSelectedSubCategory("All")}
                    >
                      All
                    </button>
                    {subCats.map((sub) => (
                      <button
                        key={sub}
                        type="button"
                        className={`subcat-chip ${selectedSubCategory === sub ? "active" : ""}`}
                        onClick={() => setSelectedSubCategory(sub)}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {filteredProducts.length > 0 ? (
            <div className="products-shelf-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-catalog-state">
              <div className="empty-icon">🛍️</div>
              <h3>No products found</h3>
              <p>We couldn&apos;t find any items matching your selected criteria or search term.</p>
              <button
                type="button"
                className="btn-hero-primary"
                onClick={resetSearch}
              >
                Clear Search
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: "50px 0", textAlign: "center" }}>Loading village products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
