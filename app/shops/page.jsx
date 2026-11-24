// app/shops/page.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Store,
  MapPin,
  Clock,
  Star,
  ShieldCheck,
  ChevronRight,
  Search,
  Filter
} from "lucide-react";
import { shops } from "../../data/shops";

export default function ShopsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoriesList = ["All", "Groceries & Daily Needs", "Fresh Vegetables & Fruits", "Fresh Meat & Poultry", "Bakery & Confectionery", "Medicines & Healthcare", "Fast Food & Snacks"];

  const filteredShops = shops.filter((s) => {
    const matchCat = selectedCategory === "All" || s.category === selectedCategory;
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="container shops-page-container">
      <div className="breadcrumbs-nav">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <span className="current-crumb">Nearby Village Stores</span>
      </div>

      <div className="shops-header-hero">
        <div className="shops-hero-text">
          <span className="village-badge">🌾 Neighborhood Commerce</span>
          <h1>Nearby Village &amp; Mandal Partner Stores</h1>
          <p>
            Connect directly with verified local shops in your mandal. Fast 30-45 mins delivery to nearby villages.
          </p>
        </div>

        <div className="shops-search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search stores by name, bazaar or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Filter Strip */}
      <div className="category-filter-tabs">
        {categoriesList.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`tab-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stores Grid */}
      <div className="shops-directory-grid">
        {filteredShops.map((shop) => (
          <div key={shop.id} className="store-profile-card">
            <div className="store-img-container">
              <img src={shop.image} alt={shop.name} />
              <span className={`store-status-chip ${shop.isOpen ? "open" : "closed"}`}>
                {shop.isOpen ? "● Open Now" : "○ Closed"}
              </span>
              <span className="store-dist-badge">📍 {shop.distanceKm} km away</span>
            </div>

            <div className="store-body">
              <div className="store-top">
                <span className="store-cat">{shop.category}</span>
                <div className="store-rating-chip">
                  <Star size={12} fill="#ffb800" color="#ffb800" />
                  <span>{shop.rating}</span>
                  <small>({shop.reviews})</small>
                </div>
              </div>

              <h2>{shop.name}</h2>
              <p className="store-address">
                <MapPin size={14} /> {shop.location}
              </p>

              <div className="store-perks-row">
                <span><Clock size={13} /> {shop.deliveryTime}</span>
                <span>Min Order: ₹{shop.minOrder}</span>
                <span>{shop.timing}</span>
              </div>

              <Link href={`/shops/${shop.id}`} className="btn-visit-full">
                Browse Shop Items <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
