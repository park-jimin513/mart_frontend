// components/ShopByCategoryGrid.jsx
"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Plus } from "lucide-react";
import CategoryBrowser from "./CategoryBrowser";
import { mobileHomeCategoryItems } from "../data/categoryDisplayItems";

export default function ShopByCategoryGrid() {
  return (
    <section className="shop-by-category-section">
      <div className="container">
        <div className="section-header-row">
          <div>
            <h2 className="section-main-heading">Shop by Category</h2>
            <p className="section-sub-heading">Explore fresh daily essentials sourced from nearby mandal shops</p>
          </div>
          <Link href="/products" className="view-all-link">
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>

        <div className="category-showcase-layout">
          <div className="category-showcase-main">
            <div className="mobile-home-categories" aria-label="Shop by category">
              {mobileHomeCategoryItems.map((category) => (
                <Link
                  key={category.name}
                  href={`/categories/${category.slug}`}
                  className="mobile-home-category"
                >
                  <img src={category.image} alt="" className="mobile-home-category-image" loading="lazy" />
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
            <CategoryBrowser variant="showcase" />
          </div>

          {/* Right Promotional Column matching Reference UI */}
          <div className="category-side-promos">
            {/* Promo 1: Free Delivery within 20 KM banner */}
            <div className="promo-card-green">
              <div className="promo-badge-tag">Fast Local Fleet</div>
              <h3 className="promo-title">Free Delivery within 20 KM</h3>
              <p className="promo-subtitle">No minimum order for your first 3 village deliveries</p>
              
              <div className="promo-illustration-box">
                <img
                  src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=400&q=80"
                  alt="Delivery scooter in village"
                  className="promo-rider-img"
                />
              </div>

              <ul className="promo-features-list">
                <li><CheckCircle2 size={16} className="text-check" /> Fresh Farm Products</li>
                <li><CheckCircle2 size={16} className="text-check" /> Under 45 Mins Delivery</li>
                <li><CheckCircle2 size={16} className="text-check" /> Best Local Village Prices</li>
              </ul>
            </div>

            {/* Promo 2: Order Medicines with Prescription Card matching Reference UI */}
            <div className="promo-prescription-card">
              <div className="rx-card-content">
                <div className="rx-card-text">
                  <h4>Order Medicines with Prescription</h4>
                  <p>Upload doctor&apos;s slip for local licensed pharmacist verification.</p>
                </div>
                <div className="rx-cross-icon">
                  <Plus size={22} />
                </div>
              </div>
              <Link href="/pharmacy" className="btn-upload-rx-pill">
                Upload Prescription <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
