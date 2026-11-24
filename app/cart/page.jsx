// app/cart/page.jsx
"use client";

import React from "react";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/ProductCard";
import { products } from "../../data/products";

const suggestedProducts = products
  .filter((product) => product.isPopular && product.inStock && product.price > 0)
  .slice(0, 4);

export default function CartPage() {
  const {
    cart,
    cartCount,
    subtotal,
    deliveryFee,
    discount,
    finalTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    address,
    setIsLocationModalOpen,
    user,
    isReady
  } = useCart();

  if (!isReady) {
    return <div className="container cart-loading-state">Loading your cart...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="container empty-cart-container">
        <div className="empty-cart-card">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your VillageKart Cart is Empty</h2>
          <p>Explore fresh groceries, farm vegetables, meat, and medicines from nearby shops.</p>
          <Link href="/products" className="btn-hero-primary">
            Start Shopping Now <ArrowRight size={16} />
          </Link>
        </div>

        <section className="empty-cart-recommendations">
          <div className="section-header-row">
            <div>
              <h2 className="section-main-heading">Popular items you might like</h2>
              <p className="section-sub-heading">A few village favorites to get your cart started</p>
            </div>
            <Link href="/products" className="view-all-link">
              Browse all products <ArrowRight size={16} />
            </Link>
          </div>
          <div className="products-shelf-grid">
            {suggestedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="container cart-page-container">
      {/* Breadcrumb */}
      <div className="breadcrumbs-nav">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <span className="current-crumb">Shopping Cart</span>
      </div>

      <div className="cart-page-layout">
        {/* Left: Cart Table matching Reference UI Middle-Right image */}
        {/* Shows: Your Cart (3 items) | Clear Cart | Onion 1kg ₹30 - 1 + ₹30 x | Tomato 1kg ₹40 | Chicken 500g ₹120 */}
        <div className="cart-table-card">
          <div className="cart-card-header">
            <h1 className="cart-title">Your Cart ({cartCount} {cartCount === 1 ? "item" : "items"})</h1>
            <button
              type="button"
              className="btn-clear-cart"
              onClick={clearCart}
            >
              <Trash2 size={14} /> Clear Cart
            </button>
          </div>

          <div className="cart-items-rows">
            {cart.map((item) => {
              const lineTotal = item.price * item.qty;
              return (
                <div key={item.id} className="cart-product-row">
                  {/* Left: Thumbnail & Name */}
                  <div className="cart-item-left">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-thumb-img"
                    />
                    <div className="cart-meta-info">
                      <h3 className="cart-meta-name">{item.name}</h3>
                      <span className="cart-meta-unit">{item.weight || "1 unit"} • ₹{item.price}</span>
                    </div>
                  </div>

                  {/* Right: Quantity controls, Price, and Remove */}
                  <div className="cart-item-right">
                    <span className="cart-unit-price">₹{item.price}</span>

                    <div className="qty-control-pill">
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="qty-display-number">{item.qty}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <span className="cart-line-total">₹{lineTotal}</span>

                    <button
                      type="button"
                      className="btn-remove-item"
                      onClick={() => removeFromCart(item.id)}
                      title="Remove product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtotal & Total Amount bar matching reference ₹190 */}
          <div className="cart-total-bar">
            <span className="total-amount-label">Total Amount:</span>
            <span className="total-amount-rupees">₹{finalTotal}</span>
          </div>

          <Link
            href={!isReady || user ? "/checkout" : "/login?mode=signup&redirect=%2Fcheckout"}
            className="btn-proceed-checkout"
          >
            Proceed to Checkout <ArrowRight size={18} />
          </Link>
        </div>

        {/* Right: Delivery Address & 20 KM Eligibility Panel (Matching reference) */}
        <aside className="cart-sidebar-card">
          <div className="delivery-address-panel">
            <div className="address-panel-header">
              <div className="address-panel-title">
                <MapPin size={18} className="brand-green" />
                <span>Delivery Address</span>
              </div>
              <button
                type="button"
                className="btn-change-address"
                onClick={() => setIsLocationModalOpen(true)}
              >
                Change
              </button>
            </div>

            <div className="address-details-body">
              <b>{address.name}</b>
              <p>{address.village},</p>
              <p>{address.mandal}</p>
              <p>Dist: {address.district} - {address.pincode}</p>
              <p className="phone-num">Mobile: +91 {address.phone}</p>
            </div>

            {/* Delivery Eligibility Pill matching reference UI */}
            <div className="delivery-eligibility-badge">
              <CheckCircle2 size={18} className="text-check" />
              <span>Delivery within 20 km ✓</span>
            </div>
          </div>

          {/* Bill Breakdown */}
          <div className="delivery-address-panel">
            <h3 className="order-summary-title">Order Bill Details</h3>
            <div className="bill-rows">
              <div className="bill-row">
                <span>Items Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="bill-row">
                <span>Delivery Fee (Within 20 km)</span>
                <span>{deliveryFee === 0 ? <b className="text-green">FREE</b> : `₹${deliveryFee}`}</span>
              </div>
              {discount > 0 && (
                <div className="bill-row discount-row">
                  <span>Village Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="bill-row grand-total-row">
                <span>To Pay</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
