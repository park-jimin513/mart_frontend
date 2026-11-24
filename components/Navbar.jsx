// components/Navbar.jsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingBag,
  ShoppingCart,
  Package,
  MapPin,
  ChevronDown,
  Search,
  User,
  Heart,
  Menu,
  X,
  Sparkles,
  PhoneCall,
  Clock,
  ShieldCheck,
  FileText
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { categories } from "../data/categories";
import { products } from "../data/products";
import { matchesProductSearch } from "../data/productSearch.mjs";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, favorites, selectedLocation, setIsLocationModalOpen, user } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const searchMatches = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return products
      .filter((product) =>
        matchesProductSearch(
          product,
          query,
          categories.find((category) => category.slug === product.category)?.name
        )
      );
  }, [searchQuery]);

  const searchResults = searchMatches.slice(0, 5);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearchOpen(false);
    const query = searchQuery.trim();
    if (!query) {
      router.push("/products");
      return;
    }

    const normalizedQuery = query.toLowerCase();
    const exactMatch = searchMatches.find(
      (product) => product.name.trim().toLowerCase() === normalizedQuery
    );
    const singleMatch = searchMatches.length === 1 ? searchMatches[0] : null;
    const matchedProduct = exactMatch || singleMatch;

    router.push(
      matchedProduct
        ? `/products/${matchedProduct.id}`
        : `/products?search=${encodeURIComponent(query)}`
    );
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Offers", href: "/offers" },
    { name: "Track Order", href: "/tracking" },
    { name: "Pharmacy", href: "/pharmacy" },
    { name: "Stores", href: "/shops" },
    { name: "Help", href: "/contact" },
    { name: "About", href: "/about" }
  ];

  return (
    <header className="header-wrapper">
      {/* Top Banner Bar */}
      <div className="top-utility-bar">
        <div className="container utility-inner">
          <div className="utility-left">
            <span className="village-badge">🌾 Rural Hyperlocal Network</span>
            <span className="utility-delivery-message">🚚 Free Delivery within 20 KM on orders above ₹300</span>
          </div>
          <div className="utility-right">
            <Link href="/pharmacy" className="pharmacy-notice-link">
              <FileText size={13} /> Upload Prescription
            </Link>
            <span className="dot-sep">•</span>
            <Link href="/contact">
              <PhoneCall size={13} /> Village Helpline: 1800-200-VKART
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="main-nav">
        <div className="container main-nav-inner">
          {/* Logo matching reference UI */}
          <Link href="/" className="vk-brand">
            <div className="brand-logo-icon">
              <ShoppingCart size={22} className="cart-svg" />
              <span className="leaf-badge">🌱</span>
            </div>
            <div className="brand-text">
              <div className="brand-title">
                Village<span className="brand-green">Kart</span>
              </div>
              <span className="brand-subtext">Groceries • Food • Medicines</span>
            </div>
          </Link>

          {/* Delivery Location Selector */}
          <button
            type="button"
            className="location-selector-btn"
            onClick={() => setIsLocationModalOpen(true)}
            title="Change Delivery Village"
          >
            <MapPin size={18} className="loc-icon" />
            <div className="loc-text">
              <span className="deliver-label">Deliver to</span>
              <span className="village-name">
                {selectedLocation} <ChevronDown size={14} className="chevron" />
              </span>
            </div>
          </button>

          {/* Search Bar matching reference UI */}
          <form
            className="nav-search-form"
            onSubmit={handleSearchSubmit}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsSearchOpen(false);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setIsSearchOpen(false);
            }}
          >
            <input
              type="text"
              placeholder="Search all products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              aria-autocomplete="list"
              aria-expanded={isSearchOpen && Boolean(searchQuery.trim())}
              aria-controls="global-search-results"
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
              >
                <X size={14} />
              </button>
            )}
            <button
              type="submit"
              className="search-submit-btn"
              aria-label="Search products"
              title="Search products"
            >
              <Search size={16} aria-hidden="true" />
            </button>
            {isSearchOpen && searchQuery.trim() && (
              <div id="global-search-results" className="nav-search-results" role="listbox">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="nav-search-result"
                      role="option"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <span>
                        <strong>{product.name}</strong>
                        <small>{product.weight} · {product.shopName}</small>
                      </span>
                      <b>₹{product.price}</b>
                    </Link>
                  ))
                ) : (
                  <p className="nav-search-empty">No matching products found.</p>
                )}
                <button type="submit" className="nav-search-all-results">
                  View all results
                </button>
              </div>
            )}
          </form>

          {/* Actions: Cart & Profile */}
          <div className="nav-actions">
            <Link href="/cart" className="action-cart-btn" title="View Shopping Cart">
              <div className="cart-icon-wrapper">
                <ShoppingCart size={20} />
                <span className="cart-badge">{cartCount}</span>
              </div>
              <span className="action-cart-text">Cart</span>
            </Link>

            <Link
              href={user ? "/orders" : "/login?redirect=%2Forders"}
              className="action-orders-btn"
              title="View your orders"
              aria-label="View your orders"
            >
              <Package size={20} />
              <span>Orders</span>
            </Link>

            <Link
              href="/favorites"
              className="action-favorites-btn"
              title="View favorites"
              aria-label={`Favorites, ${favorites.length} saved`}
            >
              <span className="favorites-icon-wrapper">
                <Heart size={19} />
                <span className="favorites-count">{favorites.length}</span>
              </span>
              <span className="action-favorites-text">Favorites</span>
            </Link>

            <Link href={user ? "/profile" : "/login?redirect=%2Fprofile"} className="action-user-btn" title={user ? "My Account" : "Log in"}>
              <div className="user-avatar-circle">
                <User size={18} />
              </div>
              <span className="action-user-text">{user ? "Account" : "Log in"}</span>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Green Navigation Bar matching reference UI */}
      <div className="green-nav-bar">
        <div className="container green-nav-inner">
          {/* All Categories Dropdown Button */}
          <div className="category-dropdown-wrapper">
            <button
              type="button"
              className="all-categories-btn"
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
            >
              <Menu size={17} />
              <span>All Categories</span>
              <ChevronDown size={15} className={categoryDropdownOpen ? "rotate-180" : ""} />
            </button>

            {/* Dropdown Menu */}
            {categoryDropdownOpen && (
              <div className="category-flyout-menu">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={cat.slug === "all" ? "/products" : `/categories/${cat.slug}`}
                    className="flyout-item"
                    onClick={() => setCategoryDropdownOpen(false)}
                  >
                    <span className="cat-emoji">{cat.icon}</span>
                    <span className="cat-name">{cat.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Horizontal Nav Links matching reference: Home, Offers, Track Order, Help, Contact */}
          <nav className="desktop-links">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`nav-link-item ${isActive ? "active" : ""}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Quick Right Badge */}
          <div className="nav-trust-tag">
            <span>⚡ 20 KM Village Delivery Hub</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="mobile-drawer-brand">
                <ShoppingCart size={20} className="brand-green" />
                <b>VillageKart</b>
              </div>
              <button
                type="button"
                className="close-drawer-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Location Selector */}
            <div className="mobile-loc-strip" onClick={() => { setMobileMenuOpen(false); setIsLocationModalOpen(true); }}>
              <MapPin size={16} className="loc-icon" />
              <span>Deliver to: <b>{selectedLocation}</b></span>
              <ChevronDown size={14} className="ml-auto" />
            </div>

            <div className="mobile-links-list">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mobile-divider" />
              <b className="mobile-sub-title">Shop by Category</b>
              {categories.slice(1).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="mobile-category-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{cat.icon}</span> {cat.name}
                </Link>
              ))}
              <div className="mobile-divider" />
              <Link
                href={user ? "/profile" : "/login?redirect=%2Fprofile"}
                className="mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                👤 {user ? "My Profile & Addresses" : "Log in / Sign up"}
              </Link>
              <Link
                href="/favorites"
                className="mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                ♡ Favorites ({favorites.length})
              </Link>
              <Link
                href="/orders"
                className="mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                📦 My Orders
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
