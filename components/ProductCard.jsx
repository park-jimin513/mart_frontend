// components/ProductCard.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { cart, addToCart, updateQuantity, favorites, toggleFavorite } = useCart();
  const [imgError, setImgError] = useState(false);

  // Check if item is currently in cart
  const cartItem = cart.find((item) => item.id === product.id);
  const inCartQty = cartItem ? cartItem.qty : 0;
  const isFavorite = favorites.some((item) => item.id === product.id);

  const handleBuyNow = () => {
    if (!cartItem) addToCart(product, 1);
    router.push("/checkout");
  };

  return (
    <div className="product-card-modern">
      {/* Product Image and Badges */}
      <div className="product-media-container">
        {product.discountPercent > 0 && (
          <span className="badge-discount">{product.discountPercent}% OFF</span>
        )}
        {product.isBestSeller && (
          <span className="badge-bestseller">BESTSELLER</span>
        )}
        {product.requiresPrescription && (
          <span className="badge-rx">Rx Required</span>
        )}

        <button
          type="button"
          className={`btn-favorite-card ${isFavorite ? "active" : ""}`}
          onClick={() => toggleFavorite(product)}
          aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
          aria-pressed={isFavorite}
        >
          <Heart size={17} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <Link
          href={`/products/${product.id}`}
          className="product-img-link"
          aria-label={`View details for ${product.name}`}
        >
          <img
            src={imgError ? "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80" : product.image}
            alt={product.imageAlt || product.name}
            onError={() => setImgError(true)}
            className="product-main-img"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Product Information */}
      <div className="product-details-body">
        {/* Shop & Weight tag */}
        <div className="product-meta-row">
          <span className="product-weight-tag">{product.weight}</span>
          <span className="product-shop-name" title={product.shopName}>
            {product.shopName}
          </span>
        </div>

        {/* Product Title */}
        <h3 className="product-title-text">
          <Link href={`/products/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Rating and Reviews */}
        <div className="product-rating-row">
          <div className="star-rating-pill">
            <Star size={12} fill="#ffb800" color="#ffb800" />
            <span>{product.rating}</span>
          </div>
          <span className="reviews-count">({product.reviewsCount})</span>
        </div>

        {/* Pricing Row */}
        <div className="product-pricing-strip">
          <div className="price-stack">
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>

          {/* Cart quantity and direct checkout actions */}
          <div className="product-card-actions">
            {inCartQty === 0 ? (
              <button
                type="button"
                className="btn-add-to-cart"
                onClick={() => addToCart(product, 1)}
              >
                <Plus size={14} /><span>Add to Cart</span>
              </button>
            ) : (
              <div className="qty-control-pill">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => updateQuantity(product.id, -1)}
                  aria-label="Decrease quantity"
                >
                  <Minus size={13} />
                </button>
                <span className="qty-display-number">{inCartQty}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => updateQuantity(product.id, 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={13} />
                </button>
              </div>
            )}
            {product.requiresPrescription || product.price <= 0 ? (
              <Link href="/pharmacy" className="btn-buy-now">
                Upload Rx
              </Link>
            ) : (
              <button type="button" className="btn-buy-now" onClick={handleBuyNow}>
                <ShoppingBag size={14} /> Buy Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
