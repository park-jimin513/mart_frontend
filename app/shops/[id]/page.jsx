// app/shops/[id]/page.jsx
"use client";

import React from "react";
import Link from "next/link";
import {
  Store,
  MapPin,
  Clock,
  Star,
  ShieldCheck,
  ChevronRight,
  Phone,
  ArrowRight
} from "lucide-react";
import { shops } from "../../../data/shops";
import { products } from "../../../data/products";
import ProductCard from "../../../components/ProductCard";

export default function ShopDetailPage({ params }) {
  const { id } = params;
  const shop = shops.find((s) => s.id === id) || shops[0];
  const shopProducts = products.filter((p) => p.shopId === shop.id);

  return (
    <div className="container shop-detail-container">
      <div className="breadcrumbs-nav">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <Link href="/shops">Stores</Link>
        <ChevronRight size={14} />
        <span className="current-crumb">{shop.name}</span>
      </div>

      {/* Store Banner Card */}
      <div className="store-detail-banner">
        <img src={shop.image} alt={shop.name} className="store-banner-bg" />
        <div className="store-banner-content">
          <div className="store-badge-row">
            <span className={`store-status-chip ${shop.isOpen ? "open" : "closed"}`}>
              {shop.isOpen ? "● Open Now" : "○ Closed"}
            </span>
            <span className="verified-store-tag">
              <ShieldCheck size={14} /> Verified Partner Store
            </span>
          </div>
          <h1>{shop.name}</h1>
          <p className="banner-loc-text">
            <MapPin size={15} /> {shop.location} • {shop.distanceKm} km from Peddapalli Hub
          </p>
          <div className="banner-meta-strip">
            <span>⭐ {shop.rating} ({shop.reviews} ratings)</span>
            <span>⏱️ Delivery: {shop.deliveryTime}</span>
            <span>🕒 Timings: {shop.timing}</span>
          </div>
        </div>
      </div>

      {/* Products from this store */}
      <section className="store-catalog-section">
        <div className="section-header-row">
          <div>
            <h2 className="section-main-heading">Available Products from this Store</h2>
            <p className="section-sub-heading">Dispatched directly with local delivery warranty</p>
          </div>
        </div>

        <div className="products-shelf-grid">
          {shopProducts.length > 0 ? (
            shopProducts.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </section>
    </div>
  );
}
