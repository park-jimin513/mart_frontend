// components/Footer.jsx
"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingCart,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Truck,
  FileText
} from "lucide-react";
import { categories } from "../data/categories";

export default function Footer() {
  return (
    <footer className="footer-container">
      {/* Guarantee & Highlights Bar */}
      <div className="footer-highlights">
        <div className="container highlights-grid">
          <div className="highlight-card">
            <div className="highlight-icon">
              <Truck size={24} />
            </div>
            <div className="highlight-text">
              <b>20 KM Delivery Radius</b>
              <p>Reaching rural villages & hamlets beyond urban delivery boundaries.</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon">
              <ShieldCheck size={24} />
            </div>
            <div className="highlight-text">
              <b>Verified Local Stores</b>
              <p>100% authentic groceries, medicines & farm-fresh village produce.</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon">
              <Clock size={24} />
            </div>
            <div className="highlight-text">
              <b>30-45 Mins Fast Delivery</b>
              <p>Direct from your nearby mandal center right to your doorstep.</p>
            </div>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon">
              <FileText size={24} />
            </div>
            <div className="highlight-text">
              <b>Rx Medicine Review</b>
              <p>All prescription items verified by licensed registered pharmacists.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container footer-main">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <Link href="/" className="footer-brand">
            <div className="footer-logo-circle">
              <ShoppingCart size={22} />
            </div>
            <div className="brand-text">
              <div className="brand-title">
                Village<span className="brand-light-green">Kart</span>
              </div>
              <span className="brand-subtext">Rural Hyperlocal Delivery</span>
            </div>
          </Link>
          <p className="footer-mission-text">
            VillageKart is India&apos;s pioneering rural hyperlocal platform bringing daily essentials, fresh vegetables, farm meat, bakery favorites, and verified pharmacy supplies to village doorsteps where quick-commerce didn&apos;t reach.
          </p>
          <div className="footer-tagline">
            <b>&ldquo;Your Village. Your Market. Delivered.&rdquo;</b>
          </div>
        </div>

        {/* Categories Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Top Categories</h4>
          <ul className="footer-list">
            {categories.slice(1, 8).map((cat) => (
              <li key={cat.id}>
                <Link href={`/categories/${cat.slug}`}>
                  {cat.icon} {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-list">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">All Products</Link></li>
            <li><Link href="/shops">Nearby Village Stores</Link></li>
            <li><Link href="/pharmacy">Pharmacy & Upload Rx</Link></li>
            <li><Link href="/tracking">Track Active Order</Link></li>
            <li><Link href="/favorites">My Favorites</Link></li>
            <li><Link href="/orders">Order History</Link></li>
            <li><Link href="/profile">My Profile & Addresses</Link></li>
            <li><Link href="/about">About VillageKart</Link></li>
          </ul>
        </div>

        {/* Village Support & Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">Village Support Hub</h4>
          <div className="footer-contact-info">
            <div className="contact-row">
              <MapPin size={18} className="contact-icon" />
              <span>Village Delivery Hub, Peddapalli Mandal, Dist. Karimnagar, Telangana - 505172</span>
            </div>
            <div className="contact-row">
              <Phone size={18} className="contact-icon" />
              <span>Toll Free: 1800-200-VKART (85278)</span>
            </div>
            <div className="contact-row">
              <Mail size={18} className="contact-icon" />
              <span>care@villagekart.demo</span>
            </div>
            <div className="contact-row">
              <Clock size={18} className="contact-icon" />
              <span>Customer Help: 6:30 AM – 10:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container bottom-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} VillageKart Technologies Pvt. Ltd. All rights reserved. Made for Rural India.
          </p>
          <div className="bottom-links">
            <Link href="/about">Mission</Link>
            <span className="dot">•</span>
            <Link href="/contact">Support</Link>
            <span className="dot">•</span>
            <Link href="/pharmacy">Rx Guidelines</Link>
            <span className="dot">•</span>
            <span className="disclaimer-badge">Demo Frontend Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
