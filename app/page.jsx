// app/page.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  Star,
  Store,
  ChevronRight,
  Clock,
  Sparkles,
  Award,
  Users,
  MapPin,
  TrendingUp,
  FileText
} from "lucide-react";
import HeroBanner from "../components/HeroBanner";
import ShopByCategoryGrid from "../components/ShopByCategoryGrid";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { shops } from "../data/shops";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("all");

  // Popular and Best Sellers matching reference UI
  // Reference items: Tata Salt, Aashirvaad Atta, Fortune Oil, Toor Dal, Onion 1kg, Tomato 1kg, Chicken 500g, Cake
  const popularProducts = products.filter((p) => p.isPopular).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);

  const filteredPopular =
    activeTab === "all"
      ? popularProducts
      : popularProducts.filter((p) => p.category === activeTab);

  return (
    <div className="home-page-container">
      {/* 1. Hero Promotional Banner */}
      <HeroBanner />

      {/* 2. Shop By Category Grid with Free Delivery & Rx Cards */}
      <ShopByCategoryGrid />

      {/* 3. Popular Village Essentials Section */}
      <section className="home-section home-trending-section container">
        <div className="section-header-row">
          <div>
            <h2 className="section-main-heading">
              <span className="home-desktop-title">Popular Village Essentials</span>
              <span className="home-mobile-title">Trending Today</span>
            </h2>
            <p className="section-sub-heading">
              Frequently ordered daily groceries, farm fresh produce and kitchen needs
            </p>
          </div>
          <Link href="/products" className="view-all-link">
            See All Products <ArrowRight size={16} />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="category-filter-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Essentials
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "groceries" ? "active" : ""}`}
            onClick={() => setActiveTab("groceries")}
          >
            🌾 Groceries
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "vegetables" ? "active" : ""}`}
            onClick={() => setActiveTab("vegetables")}
          >
            🥬 Farm Veggies
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "non-veg" ? "active" : ""}`}
            onClick={() => setActiveTab("non-veg")}
          >
            🍗 Fresh Meat
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "bakery" ? "active" : ""}`}
            onClick={() => setActiveTab("bakery")}
          >
            🎂 Bakery &amp; Sweets
          </button>
        </div>

        {/* Product Cards Shelf */}
        <div className="products-shelf-grid">
          {filteredPopular.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Special Promotional Banners */}
      <section className="container home-promos-section">
        <div className="double-banner-grid">
          {/* Banner 1: Fresh Vegetables Direct From Farmers (Purple) */}
          <div className="banner-purple-veg">
            <div className="banner-text-part">
              <span className="badge-promo-pill">Direct Mandi Harvest</span>
              <h3>Fresh Vegetables Direct from Farmers</h3>
              <p>Hand-picked every morning from local village fields with zero middlemen markup.</p>
              <Link href="/categories/vegetables" className="btn-banner-shop">
                Shop Now <ArrowRight size={14} />
              </Link>
            </div>
            <img
              src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=300&q=80"
              alt="Fresh vegetables in basket"
              className="banner-thumb-img"
            />
          </div>

          {/* Banner 2: Delicious Bakery Freshly Baked (Gold) */}
          <div className="banner-gold-bakery">
            <div className="banner-text-part">
              <span className="badge-promo-pill">Hot &amp; Oven Fresh</span>
              <h3>Delicious Bakery Freshly Baked</h3>
              <p>Special butter biscuits, fresh milk loaves, and celebration chocolate cakes.</p>
              <Link href="/categories/bakery" className="btn-banner-shop">
                Order Now <ArrowRight size={14} />
              </Link>
            </div>
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=300&q=80"
              alt="Delicious chocolate cake"
              className="banner-thumb-img"
            />
          </div>
        </div>
      </section>

      {/* 5. Best-Selling Products Section */}
      <section className="home-section container">
        <div className="section-header-row">
          <div>
            <h2 className="section-main-heading">Best Sellers Near You</h2>
            <p className="section-sub-heading">
              Top-rated items trusted by hundreds of families in your mandal
            </p>
          </div>
          <Link href="/products?sort=popular" className="view-all-link">
            View All Best Sellers <ArrowRight size={16} />
          </Link>
        </div>

        <div className="products-shelf-grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Nearby Local Village Stores */}
      <section className="home-section container">
        <div className="section-header-row">
          <div>
            <h2 className="section-main-heading">Nearby Village Partner Stores</h2>
            <p className="section-sub-heading">
              Support neighborhood kirana dukans, bakeries and medical shops
            </p>
          </div>
          <Link href="/shops" className="view-all-link">
            Explore All Stores <ArrowRight size={16} />
          </Link>
        </div>

        <div className="shops-grid-home">
          {shops.slice(0, 3).map((shop) => (
            <div key={shop.id} className="store-card-modern">
              <div className="store-card-img-wrap">
                <img src={shop.image} alt={shop.name} className="store-card-img" />
                <span className={`store-status-chip ${shop.isOpen ? "open" : "closed"}`}>
                  {shop.isOpen ? "● Open Now" : "○ Closed"}
                </span>
                <span className="store-distance-tag">📍 {shop.distanceKm} km away</span>
              </div>
              <div className="store-card-details">
                <div className="store-top-line">
                  <span className="store-category-text">{shop.category}</span>
                  <div className="store-rating-chip">
                    <Star size={12} fill="#ffb800" color="#ffb800" />
                    <span>{shop.rating}</span>
                  </div>
                </div>
                <h3 className="store-name-text">{shop.name}</h3>
                <p className="store-loc-text">{shop.location}</p>
                <div className="store-footer-meta">
                  <span className="delivery-estimate-text">
                    <Clock size={13} /> {shop.deliveryTime}
                  </span>
                  <Link href={`/shops/${shop.id}`} className="btn-visit-store">
                    Visit Store <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Why Choose VillageKart */}
      <section className="why-choose-section">
        <div className="container">
          <div className="why-header text-center">
            <span className="why-pill-badge">Built for Rural India</span>
            <h2 className="section-main-heading">Why Choose VillageKart?</h2>
            <p className="section-sub-heading">
              Overcoming the rural quick-commerce barrier with a dedicated village delivery fleet
            </p>
          </div>

          <div className="why-cards-grid">
            <div className="why-card">
              <div className="why-icon-box">
                <Truck size={28} />
              </div>
              <h3>20 KM Village Delivery</h3>
              <p>
                While urban delivery platforms stop at city borders, VillageKart extends up to 20 km into villages, settlements, and farming hamlets.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon-box">
                <ShieldCheck size={28} />
              </div>
              <h3>Verified Mandal Stores</h3>
              <p>
                We partner with established, reputable local kirana, meat, and medical stores ensuring genuine weights, fair prices, and pure quality.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon-box">
                <FileText size={28} />
              </div>
              <h3>Safe Pharmacy Review</h3>
              <p>
                Never compromise on family health. Upload doctor prescriptions easily for licensed pharmacist validation before dispensing.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon-box">
                <Award size={28} />
              </div>
              <h3>Zero Urban Markups</h3>
              <p>
                Enjoy realistic local mandi rates with nominal delivery charges and multiple payment options including Cash on Delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Customer Testimonials */}
      <section className="testimonials-section container">
        <div className="why-header text-center">
          <span className="why-pill-badge">Village Voices</span>
          <h2 className="section-main-heading">Trusted by Rural Families</h2>
          <p className="section-sub-heading">
            See how VillageKart is making everyday living easier in rural mandals
          </p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="test-stars">★★★★★</div>
            <p className="test-quote">
              &ldquo;Earlier, if my aged parents needed fever tablets or groceries, I had to travel 12 km to Sultanabad on a bike. Now VillageKart brings everything to our doorstep in 35 minutes!&rdquo;
            </p>
            <div className="test-author">
              <div className="author-avatar">SR</div>
              <div>
                <b>Srinivas Reddy</b>
                <span>Peddapalli Village, Farmer &amp; Customer</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="test-stars">★★★★★</div>
            <p className="test-quote">
              &ldquo;The meat and country chicken delivered were cleanly cut and hygienic. Very happy with the Cash on Delivery option and courteous delivery boys.&rdquo;
            </p>
            <div className="test-author">
              <div className="author-avatar">LR</div>
              <div>
                <b>Lavanya Rao</b>
                <span>Julapalli Village, Homemaker</span>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="test-stars">★★★★★</div>
            <p className="test-quote">
              &ldquo;Uploading doctor prescription for my grandmother was seamless. The local chemist called to confirm medicines and VillageKart delivered same evening.&rdquo;
            </p>
            <div className="test-author">
              <div className="author-avatar">VK</div>
              <div>
                <b>Venkatesh Kumar</b>
                <span>Basanthnagar, Teacher</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
