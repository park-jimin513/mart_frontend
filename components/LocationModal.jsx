// components/LocationModal.jsx
"use client";

import React, { useState } from "react";
import { MapPin, CheckCircle2, AlertCircle, X, Search, Navigation } from "lucide-react";
import { useCart } from "../context/CartContext";
import { sampleVillages } from "../data/categories";

export default function LocationModal() {
  const { isLocationModalOpen, setIsLocationModalOpen, selectedLocation, setSelectedLocation, setAddress, address, showToast } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [manualDistance, setManualDistance] = useState(address.distanceKm || 8);

  if (!isLocationModalOpen) return null;

  const filteredVillages = sampleVillages.filter((v) =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.mandal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.pincode.includes(searchTerm)
  );

  const handleSelectVillage = (village) => {
    if (village.distance > 20) {
      showToast(`⚠️ ${village.name} is ${village.distance} km away (outside 20 km limit).`);
    } else {
      setSelectedLocation(village.name);
      setAddress((prev) => ({
        ...prev,
        village: village.name,
        mandal: `${village.mandal} Mandal`,
        district: village.district,
        pincode: village.pincode,
        distanceKm: village.distance
      }));
      showToast(`Delivery location set to ${village.name}`);
      setIsLocationModalOpen(false);
    }
  };

  const handleApplyCustom = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const dist = Number(manualDistance) || 8;
    if (dist > 20) {
      showToast("⚠️ This location exceeds the 20 km hyperlocal delivery zone!");
      return;
    }
    setSelectedLocation(searchTerm.trim());
    setAddress((prev) => ({
      ...prev,
      village: searchTerm.trim(),
      distanceKm: dist
    }));
    showToast(`Delivery location updated to ${searchTerm.trim()}`);
    setIsLocationModalOpen(false);
  };

  return (
    <div className="modal-backdrop-overlay" onClick={() => setIsLocationModalOpen(false)}>
      <div className="location-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="loc-modal-header">
          <div className="loc-header-title">
            <MapPin size={22} className="brand-green" />
            <div>
              <h3>Select Your Village or Town</h3>
              <p>VillageKart delivers within a 20 km radius of local hub centers.</p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setIsLocationModalOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* 20 KM Zone Notification */}
        <div className="zone-info-banner">
          <Navigation size={18} />
          <span><b>20 KM Delivery Radius:</b> We reach remote villages and farms where standard city apps don&apos;t deliver.</span>
        </div>

        {/* Search input */}
        <div className="loc-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Type your village name, mandal or PIN code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Preset sample villages matching Telangana/rural context */}
        <div className="village-presets-list">
          <span className="presets-label">Nearby Serviceable Villages:</span>
          <div className="presets-grid">
            {filteredVillages.map((item) => {
              const isSelected = selectedLocation === item.name;
              const isServiceable = item.distance <= 20;

              return (
                <div
                  key={item.name}
                  onClick={() => handleSelectVillage(item)}
                  className={`village-pill ${isSelected ? "selected" : ""} ${!isServiceable ? "out-of-zone" : ""}`}
                >
                  <div className="pill-top">
                    <span className="v-name">{item.name}</span>
                    {isServiceable ? (
                      <span className="tag-eligible">✓ {item.distance} km</span>
                    ) : (
                      <span className="tag-out">✕ {item.distance} km (Out)</span>
                    )}
                  </div>
                  <span className="v-sub">
                    {item.mandal}, {item.district} • {item.pincode}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Custom Village Entry */}
        <form onSubmit={handleApplyCustom} className="custom-village-form">
          <span className="custom-label">Or enter custom village details:</span>
          <div className="custom-inputs-row">
            <input
              type="text"
              placeholder="Enter village name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="custom-name-input"
            />
            <div className="distance-selector">
              <label>Distance:</label>
              <select
                value={manualDistance}
                onChange={(e) => setManualDistance(Number(e.target.value))}
              >
                <option value={4}>4 km (Fast)</option>
                <option value={8}>8 km (Standard)</option>
                <option value={15}>15 km (Eligible)</option>
                <option value={19}>19 km (Outer)</option>
                <option value={24}>24 km (Out of zone)</option>
              </select>
            </div>
            <button type="submit" className="set-location-btn">
              Confirm Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
