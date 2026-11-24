// components/HeroBanner.jsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Tag, Truck } from "lucide-react";
import { categories } from "../data/categories";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function HeroBanner() {
  const router = useRouter();
  const { cart, addToCart } = useCart();
  const categorySlides = categories.map((category) => ({
    id: `category-${category.id}`,
    kind: "Category",
    name: category.name,
    description: category.description || "Browse all VillageKart products",
    image: category.image || products[0].image,
    icon: category.icon,
    priceLabel: category.startingPrice ? `From ₹${category.startingPrice}` : "Shop everything",
    href: category.slug === "all" ? "/products" : `/categories/${category.slug}`,
    action: "View items"
  }));
  const popularSlides = products
    .filter((product) => product.isPopular && product.price > 0)
    .slice(0, 8)
    .map((product) => ({
      id: `popular-${product.id}`,
      kind: "Popular item",
      name: product.name,
      description: product.description,
      details: `${product.brand || product.shopName} · ${product.weight} · ${product.rating}★`,
      image: product.image,
      icon: "⭐",
      priceLabel: `₹${product.price}`,
      product,
      action: "Buy now"
    }));
  const recentlyListedSlides = products
    .filter((product) => product.inStock && product.price > 0)
    .slice(-8)
    .reverse()
    .map((product) => ({
      id: `recent-${product.id}`,
      kind: "Recently listed",
      name: product.name,
      description: product.description,
      details: `${product.brand || product.shopName} · ${product.weight} · ${product.rating}★`,
      image: product.image,
      icon: "🆕",
      priceLabel: `₹${product.price}`,
      product,
      action: "Buy now"
    }));
  const slideGroups = {
    categories: categorySlides,
    popular: popularSlides,
    recent: recentlyListedSlides
  };
  const [activeGroup, setActiveGroup] = useState("categories");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = slideGroups[activeGroup];
  const slide = slides[activeSlide];

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [activeGroup, isPaused, slides.length]);

  const changeSlide = (direction) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };

  const selectGroup = (group) => {
    setActiveGroup(group);
    setActiveSlide(0);
  };

  const handleSlideBuy = () => {
    if (!slide.product) return;
    if (slide.product.requiresPrescription || slide.product.price <= 0) {
      router.push("/pharmacy");
      return;
    }

    if (!cart.some((item) => item.id === slide.product.id)) {
      addToCart(slide.product, 1);
    }
    router.push("/checkout");
  };

  return (
    <section className="hero-banner-section">
      <div className="container hero-banner-inner">
        {/* Left Content Column */}
        <div className="hero-content-col">
          <div className="hero-badge-pill">
            <span className="sparkle-dot">●</span>
            <span>Your Village. Your Market. Delivered.</span>
          </div>

          <h1 className="hero-title-main">
            Your Complete <span className="text-highlight-green">Village Store</span> at Your Door Step!
          </h1>

          <p className="hero-description-text">
            Groceries • Fresh Food • Home Needs • Medicines &amp; More... Daily essentials from local mandal shops brought to village doorsteps within 30-45 minutes.
          </p>

          <div className="delivery-radius-tag">
            <Truck size={18} className="truck-icon" />
            <span><b>20 km Delivery Only</b> — Reaching rural families and villages</span>
          </div>

          <div className="hero-cta-buttons">
            <Link href="/products" className="btn-hero-primary">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link href="/pharmacy" className="btn-hero-secondary">
              Upload Prescription
            </Link>
          </div>

          {/* Value Props Row */}
          <div className="hero-perks-row">
            <div className="perk-item">
              <ShieldCheck size={16} className="perk-icon" />
              <span>100% Fresh Local Products</span>
            </div>
            <div className="perk-item">
              <Truck size={16} className="perk-icon" />
              <span>Fast Doorstep Delivery</span>
            </div>
            <div className="perk-item">
              <Tag size={16} className="perk-icon" />
              <span>Village Mandi Fair Prices</span>
            </div>
          </div>
        </div>

        {/* Featured categories and products rotate inside this hero panel */}
        <div className="hero-visual-col">
          <div
            className="hero-image-wrapper hero-featured-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="hero-featured-slide" key={slide.id}>
              <img src={slide.image} alt="" className="hero-featured-image" />
              <div className="hero-featured-overlay">
                <span className="hero-featured-kind">{slide.icon} {slide.kind}</span>
                <div>
                  <h2>{slide.name}</h2>
                  <p>{slide.description}</p>
                  {slide.details && <small className="hero-featured-details">{slide.details}</small>}
                </div>
                <div className="hero-featured-footer">
                  <strong>{slide.priceLabel}</strong>
                  {slide.product ? (
                    <button type="button" className="hero-featured-link" onClick={handleSlideBuy}>
                      {slide.action} <ArrowRight size={15} />
                    </button>
                  ) : (
                    <Link
                      href={slide.href}
                      className="hero-featured-link"
                      onPointerDown={() => setIsPaused(true)}
                      onClick={() => setIsPaused(true)}
                    >
                      {slide.action} <ArrowRight size={15} />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="hero-featured-controls">
              <button
                type="button"
                className={`hero-featured-group-button ${activeGroup === "categories" ? "active" : ""}`}
                onClick={() => selectGroup("categories")}
              >
                Categories
              </button>
              <button
                type="button"
                className={`hero-featured-group-button ${activeGroup === "popular" ? "active" : ""}`}
                onClick={() => selectGroup("popular")}
              >
                Popular
              </button>
              <button
                type="button"
                className={`hero-featured-group-button ${activeGroup === "recent" ? "active" : ""}`}
                onClick={() => selectGroup("recent")}
              >
                Recent
              </button>
              <button
                type="button"
                aria-label="Previous featured item"
                onClick={() => changeSlide(-1)}
              >
                <ChevronLeft size={17} />
              </button>
              <span>{activeSlide + 1}/{slides.length}</span>
              <button
                type="button"
                aria-label="Next featured item"
                onClick={() => changeSlide(1)}
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
