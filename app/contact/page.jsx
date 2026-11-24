// app/contact/page.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageSquare, ChevronRight, CheckCircle2 } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function ContactPage() {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({ name: "", phone: "", village: "", query: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("Message sent to village support team!");
  };

  return (
    <div className="container contact-page-container">
      <div className="breadcrumbs-nav">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <span className="current-crumb">Contact &amp; Village Support</span>
      </div>

      <div className="contact-layout-grid">
        <div className="contact-info-col">
          <span className="village-badge">📞 24/7 Rural Support</span>
          <h1>We&apos;re Here to Help Your Village</h1>
          <p>
            Have a question regarding your grocery delivery, prescription review, or want to list your village dukan on VillageKart? Reach out to our local mandal support team.
          </p>

          <div className="contact-touchpoints">
            <div className="touchpoint-row">
              <Phone size={20} className="brand-green" />
              <div>
                <b>Toll Free Helpline</b>
                <p>1800-200-VKART (1800 200 85278)</p>
              </div>
            </div>

            <div className="touchpoint-row">
              <Mail size={20} className="brand-green" />
              <div>
                <b>Email Support</b>
                <p>care@villagekart.demo</p>
              </div>
            </div>

            <div className="touchpoint-row">
              <MapPin size={20} className="brand-green" />
              <div>
                <b>Peddapalli Mandal Fulfillment Hub</b>
                <p>Near Old Bus Stand, Peddapalli, Dist. Karimnagar, Telangana - 505172</p>
              </div>
            </div>

            <div className="touchpoint-row">
              <Clock size={20} className="brand-green" />
              <div>
                <b>Operating Hours</b>
                <p>Delivery: 6:30 AM – 9:30 PM (All 7 Days)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-col">
          {submitted ? (
            <div className="contact-success-card">
              <CheckCircle2 size={48} className="text-check" />
              <h2>Thank You for Reaching Out!</h2>
              <p>Our village customer executive will call you at <b>+91 {formData.phone}</b> within 15 minutes.</p>
              <button
                type="button"
                className="btn-hero-primary"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: "", phone: "", village: "", query: "" });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-card-form">
              <h3>Send us a Message</h3>
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Srinivas Reddy"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Mobile Number *</label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Your Village / Mandal *</label>
                <input
                  type="text"
                  placeholder="e.g. Julapalli Village"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>How can we help? *</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your order query or store partnership request..."
                  value={formData.query}
                  onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn-hero-primary full-width">
                Submit Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
