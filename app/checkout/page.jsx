// app/checkout/page.jsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  ChevronRight,
  AlertCircle
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/ProductCard";
import { products, nonVegPairingProductIds } from "../../data/products";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, finalTotal, subtotal, deliveryFee, discount, address, setAddress, placeOrder, showToast, user, isReady } = useCart();
  const hasNonVegItem = cart.some((item) =>
    products.some((product) => product.id === item.id && product.category === "non-veg")
  );
  const nonVegPairings = products.filter((product) =>
    nonVegPairingProductIds.includes(product.id)
  );

  const [formData, setFormData] = useState({
    name: address.name || "Srinivas Reddy",
    phone: address.phone || "9876543210",
    village: address.village || "Peddapalli Village",
    mandal: address.mandal || "Peddapalli Mandal",
    district: address.district || "Karimnagar",
    pincode: address.pincode || "505172",
    landmark: address.landmark || "Near Hanuman Temple",
    distanceKm: address.distanceKm || 8
  });

  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [upiId, setUpiId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrderSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      router.push("/login?mode=signup&redirect=%2Fcheckout");
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim() || !formData.village.trim()) {
      showToast("⚠️ Please enter customer name, phone and village.");
      return;
    }

    if (Number(formData.distanceKm) > 20) {
      showToast("⚠️ Sorry, delivery is only supported within 20 km.");
      return;
    }

    setAddress(formData);
    setIsSubmitting(true);
    const created = placeOrder({
      address: formData,
      paymentMethod: paymentMethod
    });
    router.push(`/tracking?id=${created.id}`);
  };

  if (!isReady) {
    return <div className="container empty-cart-container"><p>Loading your checkout...</p></div>;
  }

  if (cart.length === 0) {
    return (
      <div className="container empty-cart-container">
        <h2>No Items to Checkout</h2>
        <p>Please add products to your cart before proceeding.</p>
        <Link href="/products" className="btn-hero-primary">Back to Shopping</Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container auth-required-container">
        <div className="auth-required-card">
          <h1>Log in or create an account to order</h1>
          <p>Your cart is saved. Sign in to continue to delivery details and place your order.</p>
          <div className="auth-required-actions">
            <Link href="/login?redirect=%2Fcheckout" className="btn-hero-secondary">Log in</Link>
            <Link href="/login?mode=signup&redirect=%2Fcheckout" className="btn-hero-primary">Create account</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container checkout-page-container">
      {/* Breadcrumb */}
      <div className="breadcrumbs-nav">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <Link href="/cart">Cart</Link>
        <ChevronRight size={14} />
        <span className="current-crumb">Checkout</span>
      </div>

      <div className="checkout-layout-grid">
        {/* Left: Customer & Address Form */}
        <form onSubmit={handlePlaceOrderSubmit} className="checkout-form-col">
          <div className="checkout-card">
            <div className="checkout-card-header">
              <MapPin size={20} className="brand-green" />
              <div>
                <h2>1. Village Delivery Address</h2>
                <p>Ensure accurate village name and landmark for our local delivery fleet</p>
              </div>
            </div>

            <div className="form-fields-grid">
              <div className="form-group">
                <label>Customer Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Mobile Number (For Delivery Updates) *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Village / Town Name *</label>
                <input
                  type="text"
                  name="village"
                  value={formData.village}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Mandal / Sub-District *</label>
                <input
                  type="text"
                  name="mandal"
                  value={formData.mandal}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>District *</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>PIN Code *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label>Prominent Landmark / House details</label>
                <input
                  type="text"
                  name="landmark"
                  placeholder="e.g. Near Ramalayam Temple / Primary School"
                  value={formData.landmark}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* 20 KM Eligibility Validation */}
            <div className="delivery-radius-check">
              <CheckCircle2 size={18} className="text-check" />
              <div>
                <b>Estimated Delivery Distance: {formData.distanceKm} km (Serviceable)</b>
                <span>Complies with VillageKart&apos;s 20 km rural hyperlocal fulfillment boundary.</span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="checkout-card">
            <div className="checkout-card-header">
              <CreditCard size={20} className="brand-green" />
              <div>
                <h2>2. Select Payment Option (Demo)</h2>
                <p>Safe and convenient payment modes for rural families</p>
              </div>
            </div>

            <div className="payment-options-list">
              <label className={`payment-pill ${paymentMethod === "Cash on Delivery" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={() => setPaymentMethod("Cash on Delivery")}
                />
                <div>
                  <b>💵 Cash on Delivery (COD)</b>
                  <p>Pay cash or UPI directly to our delivery rider at your village doorstep.</p>
                </div>
              </label>

              <label className={`payment-pill ${paymentMethod === "UPI (Google Pay / PhonePe)" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "UPI (Google Pay / PhonePe)"}
                  onChange={() => setPaymentMethod("UPI (Google Pay / PhonePe)")}
                />
                <div>
                  <b>📱 UPI (Google Pay / PhonePe / Paytm Demo)</b>
                  <p>Pay via instant UPI QR or VPA upon order placement.</p>
                </div>
              </label>

              {paymentMethod.startsWith("UPI") && (
                <div className="upi-demo-box">
                  <label>Enter UPI ID (Demo):</label>
                  <input
                    type="text"
                    placeholder="e.g. 9876543210@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <small>Demo transaction interface — no real banking credentials collected.</small>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-confirm-order"
            >
              {isSubmitting ? "Placing Order..." : `Confirm & Place Order (₹${finalTotal})`}
            </button>
          </div>
        </form>

        {/* Right: Order Summary */}
        <aside className="checkout-summary-col">
          <div className="checkout-card">
            <h3 className="summary-title">Order Items ({cart.length})</h3>
            <div className="checkout-items-list">
              {cart.map((item) => (
                <div key={item.id} className="checkout-item-row">
                  <img src={item.image} alt={item.name} className="checkout-item-thumb" />
                  <div className="checkout-item-info">
                    <b>{item.name}</b>
                    <span>Qty: {item.qty} × ₹{item.price}</span>
                  </div>
                  <span className="checkout-item-total">₹{item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="checkout-totals-block">
              <div className="total-line">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="total-line">
                <span>Delivery Charge</span>
                <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
              </div>
              {discount > 0 && (
                <div className="total-line discount">
                  <span>Village Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="total-line grand">
                <span>Total Amount</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            <div className="safety-badge">
              <ShieldCheck size={18} />
              <span>VillageKart 100% Genuine Mandal Sourcing Promise</span>
            </div>
          </div>
        </aside>
      </div>

      {hasNonVegItem && (
        <section className="checkout-related-products">
          <div className="section-header-row">
            <div>
              <h2 className="section-main-heading">Complete your non-veg meal</h2>
              <p className="section-sub-heading">
                Add coriander, chicken masala, or ginger-garlic paste to your order.
              </p>
            </div>
          </div>
          <div className="products-shelf-grid">
            {nonVegPairings.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
