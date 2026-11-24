// app/about/page.jsx
"use client";

import React from "react";
import Link from "next/link";
import { Truck, ShieldCheck, Heart, MapPin, Award, Users, ChevronRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container about-page-container">
      <div className="breadcrumbs-nav">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <span className="current-crumb">About VillageKart</span>
      </div>

      <div className="about-hero-section">
        <span className="village-badge">🌾 Our Vision</span>
        <h1>Bridging Rural India with Hyperlocal Convenience</h1>
        <p className="about-tagline">&ldquo;Your Village. Your Market. Delivered.&rdquo;</p>
        <p className="about-lead">
          VillageKart was founded on a simple realization: while metro cities enjoy 10-minute grocery delivery, millions of families residing in India&apos;s villages, taluks, and gram panchayats still have to travel 10 to 25 kilometers on two-wheelers just to fetch fever medicines, baby supplies, or weekly groceries.
        </p>
      </div>

      <div className="mission-values-grid">
        <div className="value-box">
          <Truck size={32} className="val-icon" />
          <h3>20 KM Hyperlocal Radius</h3>
          <p>
            We engineered a dedicated rural delivery routing model with local youth riders that easily covers settlements up to 20 km from mandal town centers.
          </p>
        </div>

        <div className="value-box">
          <ShieldCheck size={32} className="val-icon" />
          <h3>Empowering Neighborhood Shops</h3>
          <p>
            We do not operate dark warehouses. Instead, we digitize existing village kirana stores, rythu bazaars, bakeries, and pharmacies.
          </p>
        </div>

        <div className="value-box">
          <Heart size={32} className="val-icon" />
          <h3>Fair &amp; Transparent Mandi Pricing</h3>
          <p>
            No surge pricing, hidden platform fees, or predatory markups. Rural families pay authentic local rates with nominal delivery charges.
          </p>
        </div>
      </div>

      <div className="founder-quote-banner">
        <h2>&ldquo;Every village household deserves easy access to daily essentials and genuine medicine without travelling miles on rural highways.&rdquo;</h2>
        <span className="founder-sign">— The VillageKart Founding Team</span>
      </div>
    </div>
  );
}
