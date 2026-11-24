// app/products/[id]/page.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Star,
  Plus,
  Minus,
  ShoppingCart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Clock,
  Store,
  FileText,
  AlertCircle
} from "lucide-react";
import { products, nonVegPairingProductIds } from "../../../data/products";
import { useCart } from "../../../context/CartContext";
import ProductCard from "../../../components/ProductCard";

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const product = products.find((p) => p.id === id) || products[0];
  const { cart, addToCart, updateQuantity } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(product.image);

  // Cart quantity for this item
  const cartItem = cart.find((i) => i.id === product.id);
  const inCartQty = cartItem ? cartItem.qty : 0;

  const isNonVegProduct = product.category === "non-veg";
  const relatedProducts = isNonVegProduct
    ? products.filter((p) => nonVegPairingProductIds.includes(p.id))
    : products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

  const handleBuyNow = () => {
    if (product.requiresPrescription || product.price <= 0) {
      router.push("/pharmacy");
      return;
    }

    const quantityDifference = qty - inCartQty;
    if (quantityDifference > 0) {
      addToCart(product, quantityDifference);
    } else if (quantityDifference < 0) {
      updateQuantity(product.id, quantityDifference);
    }
    router.push("/checkout");
  };

  return (
    <div className="container product-detail-container">
      {/* Breadcrumb */}
      <div className="breadcrumbs-nav">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <Link href="/products">Products</Link>
        <ChevronRight size={14} />
        <Link href={`/categories/${product.category}`}>{product.category}</Link>
        <ChevronRight size={14} />
        <span className="current-crumb">{product.name}</span>
      </div>

      {/* Main Product Showcase Card */}
      <div className="product-showcase-card">
        {/* Left Column: Image Preview */}
        <div className="showcase-gallery">
          <div className="showcase-main-image-wrap">
            {product.discountPercent > 0 && (
              <span className="badge-discount">{product.discountPercent}% OFF</span>
            )}
            <img
              src={activeImg}
              alt={product.name}
              className="showcase-main-image"
            />
          </div>
          <div className="gallery-thumbs-row">
            <button
              type="button"
              className="gallery-thumb-btn active"
              onClick={() => setActiveImg(product.image)}
            >
              <img src={product.image} alt="Thumbnail 1" />
            </button>
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="showcase-details-col">
          {/* Shop badge */}
          <div className="showcase-shop-badge">
            <Store size={15} />
            <span>Store: <b>{product.shopName}</b></span>
          </div>

          <h1 className="showcase-title">{product.name}</h1>

          {/* Rating and Weight */}
          <div className="showcase-meta-strip">
            <div className="star-rating-pill">
              <Star size={13} fill="#ffb800" color="#ffb800" />
              <span>{product.rating}</span>
            </div>
            <span className="reviews-count">({product.reviewsCount} village customer reviews)</span>
            <span className="meta-bullet">•</span>
            <span className="weight-badge">{product.weight}</span>
          </div>

          {/* Price Box */}
          <div className="showcase-price-box">
            <span className="showcase-current-price">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="showcase-original-price">₹{product.originalPrice}</span>
            )}
            {product.discountPercent > 0 && (
              <span className="showcase-save-badge">Save {product.discountPercent}%</span>
            )}
          </div>

          <p className="showcase-description">{product.description}</p>

          <div className="product-facts-grid">
            <div className="product-fact">
              <span>Brand / seller</span>
              <strong>{product.brand || product.shopName}</strong>
            </div>
            <div className="product-fact">
              <span>Category</span>
              <strong>{product.subCategory || product.category}</strong>
            </div>
            <div className="product-fact">
              <span>Manufacture date</span>
              <strong>{product.manufactureDate || "Not provided by seller"}</strong>
            </div>
            <div className="product-fact">
              <span>Expiry date</span>
              <strong>{product.expiryDate || "Not provided by seller"}</strong>
            </div>
            <div className="product-fact">
              <span>Availability</span>
              <strong>{product.inStock ? "In stock" : "Currently unavailable"}</strong>
            </div>
          </div>

          {product.requiresPrescription && (
            <div className="rx-warning-box">
              <FileText size={18} className="rx-warning-icon" />
              <div>
                <b>Doctor Prescription Required</b>
                <p>This item requires verification by our licensed retail pharmacist partner before dispatch.</p>
              </div>
            </div>
          )}

          {/* Quantity and Purchase Actions */}
          <div className="showcase-actions-row">
            <div className="showcase-qty-selector">
              <button
                type="button"
                onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              >
                <Minus size={16} />
              </button>
              <span className="qty-number">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((prev) => prev + 1)}
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="showcase-action-buttons">
              <button
                type="button"
                className="btn-add-showcase"
                onClick={() => addToCart(product, qty)}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                type="button"
                className="btn-buy-showcase"
                onClick={handleBuyNow}
              >
                <ShoppingBag size={18} />
                Buy Now
              </button>
            </div>
          </div>

          {/* Delivery & Trust Highlights */}
          <div className="showcase-trust-points">
            <div className="trust-point-item">
              <Truck size={18} className="trust-icon" />
              <div>
                <b>Delivery to your village within 35-45 mins</b>
                <span>Delivered directly from {product.shopName}</span>
              </div>
            </div>
            <div className="trust-point-item">
              <ShieldCheck size={18} className="trust-icon" />
              <div>
                <b>100% Quality &amp; Freshness Guaranteed</b>
                <span>Verified weight and genuine products</span>
              </div>
            </div>
            <div className="trust-point-item">
              <Clock size={18} className="trust-icon" />
              <div>
                <b>Cash on Delivery Available</b>
                <span>Pay when your order arrives at your village doorstep</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <h2 className="section-main-heading">
            {isNonVegProduct ? "Complete Your Non-Veg Meal" : "Related Products"}
          </h2>
          {isNonVegProduct && (
            <p className="section-sub-heading">
              Fresh coriander, chicken masala, and ginger-garlic paste pair well with your selection.
            </p>
          )}
          <div className="products-shelf-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
