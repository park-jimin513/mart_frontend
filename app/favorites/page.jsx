"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Heart, Trash2 } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import { useCart } from "../../context/CartContext";

export default function FavoritesPage() {
  const { favorites, clearFavorites, isReady } = useCart();

  if (!isReady) {
    return <div className="container favorites-page-container">Loading your favorites...</div>;
  }

  return (
    <div className="container favorites-page-container">
      <div className="breadcrumbs-nav">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <span className="current-crumb">Favorites</span>
      </div>

      <section className="favorites-page-header">
        <div>
          <span className="favorites-eyebrow"><Heart size={15} /> Saved for later</span>
          <h1>My Favorites</h1>
          <p>{favorites.length} {favorites.length === 1 ? "item" : "items"} saved to your list</p>
        </div>
        {favorites.length > 0 && (
          <button type="button" className="btn-clear-favorites" onClick={clearFavorites}>
            <Trash2 size={15} /> Clear list
          </button>
        )}
      </section>

      {favorites.length > 0 ? (
        <div className="products-shelf-grid">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="favorites-empty-state">
          <div className="favorites-empty-icon"><Heart size={28} /></div>
          <h2>Your favorites list is empty</h2>
          <p>Tap the heart on any product to save it here for later.</p>
          <Link href="/products" className="btn-hero-primary">Browse products</Link>
        </div>
      )}
    </div>
  );
}
