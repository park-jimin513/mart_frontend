// app/orders/page.jsx
"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Package, ArrowRight, CheckCircle2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function OrdersPage() {
  const { orders, user, isReady } = useCart();

  if (!isReady) {
    return <div className="container auth-required-container"><p>Loading your orders...</p></div>;
  }

  if (!user) {
    return (
      <div className="container auth-required-container">
        <div className="auth-required-card">
          <h1>Log in to view your orders</h1>
          <p>Sign in to see order history and track your deliveries.</p>
          <Link href="/login?redirect=%2Forders" className="btn-hero-primary">Log in or sign up</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container orders-page-container">
      <div className="breadcrumbs-nav">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <Link href="/profile">My Account</Link>
        <ChevronRight size={14} />
        <span className="current-crumb">My Orders</span>
      </div>

      <div className="orders-header-bar">
        <div>
          <h1>My VillageKart Orders</h1>
          <p>Review past order receipts and track active rural deliveries</p>
        </div>
      </div>

      <div className="orders-full-list">
        {orders.map((ord) => (
          <div key={ord.id} className="order-full-card">
            <div className="order-card-top-bar">
              <div className="order-meta-info">
                <span className="order-number">Order #{ord.id}</span>
                <span className="order-timestamp">Placed on {ord.date}</span>
              </div>
              <span className="status-pill-order">
                {ord.status || "Delivered"}
              </span>
            </div>

            <div className="order-items-grid-detail">
              {ord.items?.map((item) => (
                <div key={item.id} className="order-item-inline">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <b>{item.name}</b>
                    <span>Qty: {item.qty} × ₹{item.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-card-footer">
              <div className="order-footer-details">
                <span>Payment: <b>{ord.paymentMethod || "Cash on Delivery"}</b></span>
                <span>Delivered to: <b>{ord.deliveryAddress?.village || "Peddapalli Village"}</b></span>
                <span className="total-highlight">Total: <b>₹{ord.total}</b></span>
              </div>
              <Link href={`/tracking?id=${ord.id}`} className="btn-track-order-link">
                Track Live Order <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
