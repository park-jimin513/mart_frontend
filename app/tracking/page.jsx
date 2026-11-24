// app/tracking/page.jsx
"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  ChevronRight,
  Truck,
  Package,
  Home,
  User,
  ShoppingBag
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { activeLiveOrder } from "../../data/dummyOrders";

function TrackingContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || activeLiveOrder.id;
  const { orders } = useCart();

  // Find placed order or fallback to demo active order
  const matchedOrder = orders.find((o) => o.id === orderId) || activeLiveOrder;

  return (
    <div className="container tracking-page-container">
      {/* Breadcrumb */}
      <div className="breadcrumbs-nav">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <Link href="/orders">My Orders</Link>
        <ChevronRight size={14} />
        <span className="current-crumb">Track Order #{matchedOrder.id}</span>
      </div>

      {/* Main Order Tracking Card matching reference UI Bottom-Left */}
      <div className="tracking-card-container">
        <div className="tracking-header-bar">
          <div>
            <h1 className="tracking-main-title">Track Your Order</h1>
            <p className="tracking-order-meta">
              Order ID: <b>#{matchedOrder.id}</b> • Placed on {matchedOrder.date || "Today"}
            </p>
          </div>
          <span className="status-badge-live">
            ● {matchedOrder.status || "Out for Delivery"}
          </span>
        </div>

        {/* Stepper Timeline matching reference:
            Order Placed (10:30 AM) -> Preparing (11:00 AM) -> Out for Delivery (11:30 AM) -> Delivered (Est 12:00 PM) */}
        <div className="timeline-stepper">
          <div className="stepper-progress-bar">
            <div className="stepper-progress-fill" style={{ width: "70%" }} />
          </div>

          <div className="stepper-node completed">
            <div className="node-dot">✓</div>
            <span className="node-label">Order Placed</span>
            <span className="node-time">10:30 AM</span>
          </div>

          <div className="stepper-node completed">
            <div className="node-dot">✓</div>
            <span className="node-label">Preparing</span>
            <span className="node-time">11:00 AM</span>
          </div>

          <div className="stepper-node active">
            <div className="node-dot">🛵</div>
            <span className="node-label">Out for Delivery</span>
            <span className="node-time">11:30 AM</span>
          </div>

          <div className="stepper-node">
            <div className="node-dot">🏡</div>
            <span className="node-label">Delivered</span>
            <span className="node-time">(Estimated 12:00 PM)</span>
          </div>
        </div>

        {/* Tracking Map Visual with Scooter Marker & ETA badge matching reference */}
        <div className="tracking-map-visual">
          {/* Schematic SVG Map representing rural mandal roads */}
          <svg className="map-route-svg" viewBox="0 0 800 200" fill="none">
            <path
              d="M 50 150 Q 200 40 400 110 T 750 60"
              stroke="#0284c7"
              strokeWidth="5"
              strokeDasharray="8 8"
            />
            {/* Village Hub Marker */}
            <circle cx="50" cy="150" r="12" fill="#15803d" />
            {/* Customer Home Marker */}
            <circle cx="750" cy="60" r="14" fill="#ef4444" />
          </svg>

          {/* Delivery Rider Scooter Marker with Arriving in 15 mins badge */}
          <div className="map-rider-marker">
            <div className="rider-scooter-icon">🛵</div>
            <div className="eta-pill-badge">
              Arriving in <b>15 min</b>
            </div>
          </div>
        </div>

        {/* Delivery Partner Details & Address */}
        <div className="tracking-details-split">
          {/* Delivery Partner */}
          <div className="partner-details-card">
            <h4>Delivery Partner Details</h4>
            <div className="partner-profile-row">
              <div className="partner-avatar">RN</div>
              <div className="partner-info">
                <b>Ramesh Naik</b>
                <span>Assigned Local Fleet Rider</span>
                <span className="vehicle-tag">Hero Splendor • TS 02 AB 4591</span>
              </div>
              <a href="tel:9441288319" className="btn-call-partner">
                <Phone size={15} /> Call Rider
              </a>
            </div>
          </div>

          {/* Destination Address */}
          <div className="destination-details-card">
            <h4>Delivering To:</h4>
            <div className="dest-address">
              <MapPin size={18} className="brand-green" />
              <div>
                <b>{matchedOrder.deliveryAddress?.name || "Srinivas Reddy"}</b>
                <p>{matchedOrder.deliveryAddress?.village || "Peddapalli Village, Peddapalli Mandal"}</p>
                <p>{matchedOrder.deliveryAddress?.district || "Dist: Karimnagar - 505xxx"}</p>
                <p>Phone: +91 {matchedOrder.deliveryAddress?.phone || "9876543210"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Items in this order */}
        <div className="tracking-items-section">
          <h4>Items in this order ({matchedOrder.items?.length || 3})</h4>
          <div className="tracking-items-grid">
            {matchedOrder.items?.map((item) => (
              <div key={item.id} className="tracking-item-pill">
                <img src={item.image} alt={item.name} />
                <div>
                  <b>{item.name}</b>
                  <span>₹{item.price} × {item.qty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: "50px 0", textAlign: "center" }}>Loading order tracking details...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
