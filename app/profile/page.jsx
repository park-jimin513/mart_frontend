// app/profile/page.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  MapPin,
  Package,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Edit2,
  CheckCircle2
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { initialOrders } from "../../data/dummyOrders";

export default function ProfilePage() {
  const { user, address, setAddress, orders, favorites, showToast, logoutUser, isReady } = useCart();
  const [activeTab, setActiveTab] = useState("orders");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState(address);

  const handleSaveAddress = (e) => {
    e.preventDefault();
    setAddress(addressForm);
    setIsEditingAddress(false);
    showToast("Address saved successfully");
  };

  if (!isReady) {
    return <div className="container auth-required-container"><p>Loading your account...</p></div>;
  }

  if (!user) {
    return (
      <div className="container auth-required-container">
        <div className="auth-required-card">
          <h1>Sign in to your account</h1>
          <p>Log in or create an account to view your saved addresses and orders.</p>
          <div className="auth-required-actions">
            <Link href="/login?redirect=%2Fprofile" className="btn-hero-secondary">Log in</Link>
            <Link href="/login?mode=signup&redirect=%2Fprofile" className="btn-hero-primary">Create account</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container profile-page-container">
      {/* Breadcrumb */}
      <div className="breadcrumbs-nav">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <span className="current-crumb">My Account</span>
      </div>

      <div className="profile-dashboard-layout">
        {/* Left Sidebar Navigation matching reference UI:
            Welcome Back, Srinivas Reddy | My Orders, My Addresses, Wishlist, Settings, Logout */}
        <aside className="profile-sidebar-nav">
          <div className="user-quick-profile">
            <div className="user-large-avatar">
              <User size={28} />
            </div>
            <div>
              <span className="welcome-sub">Welcome Back,</span>
              <h3 className="user-full-name">{user.name} 👋</h3>
              <span className="user-village-badge">{address.village}</span>
            </div>
          </div>

          <nav className="profile-nav-links">
            <button
              type="button"
              className={`profile-menu-item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <Package size={17} />
              <span>My Orders</span>
              <span className="counter-badge">{orders.length}</span>
            </button>

            <button
              type="button"
              className={`profile-menu-item ${activeTab === "addresses" ? "active" : ""}`}
              onClick={() => setActiveTab("addresses")}
            >
              <MapPin size={17} />
              <span>My Addresses</span>
            </button>

            <Link href="/favorites" className="profile-menu-item">
              <Heart size={17} />
              <span>Favorites</span>
              <span className="counter-badge">{favorites.length}</span>
            </Link>

            <button
              type="button"
              className={`profile-menu-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <User size={17} />
              <span>Account Details</span>
            </button>

            <button
              type="button"
              className={`profile-menu-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings size={17} />
              <span>Settings</span>
            </button>

            <button
              type="button"
              className="profile-menu-item text-danger"
              onClick={logoutUser}
            >
              <LogOut size={17} />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* Center: Content Area */}
        <main className="profile-main-display">
          {activeTab === "orders" && (
            <div className="recent-orders-card">
              <div className="orders-card-head">
                <div>
                  <h2>Recent Orders</h2>
                  <p>Track current orders or review previous village deliveries</p>
                </div>
                <Link href="/tracking" className="view-active-tracking">
                  Track Live Order →
                </Link>
              </div>

              {/* Order rows matching reference UI:
                  #VK250001 ₹450 2 items Delivered
                  #VK250000 ₹280 3 items Delivered
                  #VK249999 ₹190 1 item Delivered */}
              <div className="orders-history-list">
                {orders.map((ord) => (
                  <div key={ord.id} className="order-history-row">
                    <div className="order-row-info">
                      <div className="order-items-preview-thumbs">
                        {ord.items?.slice(0, 2).map((item, idx) => (
                          <img
                            key={idx}
                            src={item.image}
                            alt={item.name}
                            className="order-thumb-mini"
                          />
                        ))}
                      </div>
                      <div>
                        <b className="order-id-label">#{ord.id}</b>
                        <p className="order-sub-meta">
                          ₹{ord.total} • {ord.itemCount || ord.items?.length || 2} items • {ord.date}
                        </p>
                      </div>
                    </div>

                    <div className="order-actions-right">
                      <span className="status-badge-delivered">
                        ✓ {ord.status || "Delivered"}
                      </span>
                      <Link
                        href={`/tracking?id=${ord.id}`}
                        className="btn-track-mini"
                      >
                        Track
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="recent-orders-card">
              <div className="orders-card-head">
                <h2>Saved Delivery Addresses</h2>
                <button
                  type="button"
                  className="btn-edit-address-pill"
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                >
                  <Edit2 size={14} /> {isEditingAddress ? "Cancel" : "Edit Address"}
                </button>
              </div>

              {isEditingAddress ? (
                <form onSubmit={handleSaveAddress} className="address-edit-form">
                  <div className="form-fields-grid">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={addressForm.name}
                        onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Mobile Number</label>
                      <input
                        type="tel"
                        value={addressForm.phone}
                        onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Village Name</label>
                      <input
                        type="text"
                        value={addressForm.village}
                        onChange={(e) => setAddressForm({ ...addressForm, village: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Mandal</label>
                      <input
                        type="text"
                        value={addressForm.mandal}
                        onChange={(e) => setAddressForm({ ...addressForm, mandal: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>District</label>
                      <input
                        type="text"
                        value={addressForm.district}
                        onChange={(e) => setAddressForm({ ...addressForm, district: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>PIN Code</label>
                      <input
                        type="text"
                        value={addressForm.pincode}
                        onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Landmark</label>
                      <input
                        type="text"
                        value={addressForm.landmark}
                        onChange={(e) => setAddressForm({ ...addressForm, landmark: e.target.value })}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-hero-primary">
                    Save Address
                  </button>
                </form>
              ) : (
                <div className="saved-address-card">
                  <div className="address-card-top">
                    <span className="badge-primary-addr">Primary Delivery Village</span>
                  </div>
                  <h3>{address.name}</h3>
                  <p>{address.village}, {address.mandal}</p>
                  <p>Dist: {address.district} - {address.pincode}</p>
                  <p>Landmark: {address.landmark}</p>
                  <p>Phone: +91 {address.phone}</p>
                  <div className="address-zone-tag">
                    <CheckCircle2 size={16} /> Within 20 km Eligible Zone ({address.distanceKm || 8} km)
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="recent-orders-card">
              <h2>Account Details</h2>
              <div className="account-details-grid">
                <div className="detail-item">
                  <span className="label">Customer Name</span>
                  <b>{user.name}</b>
                </div>
                <div className="detail-item">
                  <span className="label">Registered Phone</span>
                  <b>+91 {user.phone}</b>
                </div>
                <div className="detail-item">
                  <span className="label">Email Address</span>
                  <b>{user.email}</b>
                </div>
                <div className="detail-item">
                  <span className="label">Registered Village</span>
                  <b>{user.village}</b>
                </div>
                <div className="detail-item">
                  <span className="label">Member Since</span>
                  <b>{user.joinedDate}</b>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="recent-orders-card">
              <h2>App Settings &amp; Preferences</h2>
              <div className="settings-options">
                <label className="toggle-row">
                  <div>
                    <b>SMS Delivery Alerts</b>
                    <p>Receive order updates via village SMS when mobile internet is slow</p>
                  </div>
                  <input type="checkbox" defaultChecked />
                </label>
                <label className="toggle-row">
                  <div>
                    <b>Preferred Language</b>
                    <p>English / Telugu (తెలుగు)</p>
                  </div>
                  <select defaultValue="en">
                    <option value="en">English</option>
                    <option value="te">తెలుగు (Telugu Demo)</option>
                  </select>
                </label>
              </div>
            </div>
          )}
        </main>

        {/* Right: Promotional Cards (Matching bottom right of reference UI) */}
        <aside className="promo-side-stack">
          {/* Banner 1: Fresh Vegetables Direct from Farmers */}
          <div className="banner-purple-veg">
            <div className="banner-text-part">
              <h3>Fresh Vegetables</h3>
              <p>Direct from Farmers</p>
              <Link href="/categories/vegetables" className="btn-banner-shop">
                Shop Now →
              </Link>
            </div>
            <img
              src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=250&q=80"
              alt="Fresh vegetables"
              className="banner-thumb-img"
            />
          </div>

          {/* Banner 2: Delicious Bakery Freshly Baked */}
          <div className="banner-gold-bakery">
            <div className="banner-text-part">
              <h3>Delicious Bakery</h3>
              <p>Freshly Baked</p>
              <Link href="/categories/bakery" className="btn-banner-shop">
                Order Now →
              </Link>
            </div>
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=250&q=80"
              alt="Delicious chocolate cake"
              className="banner-thumb-img"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
