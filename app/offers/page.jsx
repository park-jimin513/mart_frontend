// app/offers/page.jsx
"use client";

import React from "react";
import Link from "next/link";
import { Tag, Sparkles, Clock, ArrowRight, ChevronRight } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import { products } from "../../data/products";

export default function OffersPage() {
  const discountedProducts = products.filter((p) => p.discountPercent > 0);

  return (
    <div className="container offers-page-container">
      <div className="breadcrumbs-nav">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <span className="current-crumb">Offers &amp; Deals</span>
      </div>

      <div className="offers-hero-banner">
        <div className="offers-badge">
          <Tag size={16} /> Village Festival &amp; Daily Savings
        </div>
        <h1>Rural Hyperlocal Discounts &amp; Deals</h1>
        <p>Save up to 30% on groceries, farm produce, meat, and home care essentials</p>
      </div>

      <div className="offers-cards-row">
        <div className="offer-coupon-card">
          <div className="coupon-left">
            <span className="coupon-code">VILLAGE50</span>
            <b>₹50 OFF on orders above ₹499</b>
            <p>Valid for all village deliveries within 20 km.</p>
          </div>
          <button type="button" className="btn-copy-code">Applied</button>
        </div>

        <div className="offer-coupon-card">
          <div className="coupon-left">
            <span className="coupon-code">FREEDEL</span>
            <b>FREE Delivery on First 3 Orders</b>
            <p>Zero delivery charges for rural households.</p>
          </div>
          <button type="button" className="btn-copy-code">Applied</button>
        </div>
      </div>

      <section className="discounted-shelf-section">
        <h2 className="section-main-heading">Discounted Products Today</h2>
        <div className="products-shelf-grid">
          {discountedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
