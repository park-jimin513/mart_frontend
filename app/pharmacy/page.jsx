// app/pharmacy/page.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Phone,
  ChevronRight,
  Plus
} from "lucide-react";
import ProductCard from "../../components/ProductCard";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";

export default function PharmacyPage() {
  const { showToast } = useCart();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pharmacy items
  const pharmacyProducts = products.filter((p) => p.category === "medicines");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      showToast(`Selected file: ${file.name}`);
    }
  };

  const handleSubmitPrescription = (e) => {
    e.preventDefault();
    if (!uploadedFile) {
      showToast("⚠️ Please choose a prescription image or document.");
      return;
    }
    if (!agreeTerms) {
      showToast("⚠️ Please confirm pharmacist verification consent.");
      return;
    }

    setIsSubmitted(true);
    showToast("Prescription uploaded for pharmacist review!");
  };

  return (
    <div className="container pharmacy-page-container">
      {/* Breadcrumb */}
      <div className="breadcrumbs-nav">
        <Link href="/">Home</Link>
        <ChevronRight size={14} />
        <span className="current-crumb">Pharmacy &amp; Prescription Service</span>
      </div>

      {/* Mandatory Statutory Health & Safety Alert */}
      <div className="statutory-notice-banner">
        <AlertTriangle size={24} className="notice-icon" />
        <div>
          <b>Important Regulatory Notice:</b>
          <p>
            Prescription medicines require mandatory verification by a licensed retail pharmacist partner. VillageKart does not dispense Schedule H / X drugs automatically without an authentic prescription and tele-consultation confirmation.
          </p>
        </div>
      </div>

      {/* Upload Prescription Card matching Reference UI */}
      <div className="prescription-hero-grid">
        <div className="prescription-upload-card">
          <div className="rx-upload-header">
            <div className="rx-badge-pill">
              <FileText size={16} /> Verified Chemist Network
            </div>
            <h2>Order Medicines with Prescription</h2>
            <p>
              Upload your doctor&apos;s prescription slip. Our partner licensed pharmacist will review the items, confirm dosage, call you with price details, and deliver to your village within 45 minutes.
            </p>
          </div>

          {isSubmitted ? (
            <div className="upload-success-state">
              <CheckCircle2 size={48} className="text-check" />
              <h3>Prescription Submitted for Review</h3>
              <p>
                File: <b>{uploadedFile?.name}</b>
              </p>
              <p className="rx-next-steps">
                Our licensed pharmacist at <b>Apollo Pharmacy Partner &amp; Local Meds</b> is verifying your prescription. You will receive a phone call shortly at <b>+91 {contactNumber || "9876543210"}</b> to confirm available quantities and total amount before dispatch.
              </p>
              <button
                type="button"
                className="btn-hero-primary"
                onClick={() => {
                  setIsSubmitted(false);
                  setUploadedFile(null);
                }}
              >
                Upload Another Prescription
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitPrescription} className="rx-form">
              {/* Drag/Drop File Upload Area */}
              <div className="upload-dropzone">
                <input
                  type="file"
                  id="rx-file-input"
                  accept="image/*,application/pdf"
                  onChange={handleFileUpload}
                  className="hidden-file-input"
                />
                <label htmlFor="rx-file-input" className="dropzone-label">
                  <UploadCloud size={36} className="upload-icon" />
                  {uploadedFile ? (
                    <div className="selected-file-pill">
                      <b>✓ Selected: {uploadedFile.name}</b>
                      <span>Click to choose a different photo</span>
                    </div>
                  ) : (
                    <div>
                      <b>Click or tap to upload doctor&apos;s prescription</b>
                      <p>Supports JPG, PNG or PDF photos taken with your phone</p>
                    </div>
                  )}
                </label>
              </div>

              {/* Patient Details */}
              <div className="form-fields-grid">
                <div className="form-group">
                  <label>Patient Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Reddy"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Patient Age *</label>
                  <input
                    type="number"
                    placeholder="e.g. 52"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Doctor / Clinic Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. K. Rao (Civil Hospital)"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number for Pharmacist Call *</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>Village Delivery Location *</label>
                  <input
                    type="text"
                    placeholder="e.g. Peddapalli Village, near Bus Stand"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Legal Checkbox */}
              <label className="checkbox-agreement">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  required
                />
                <span>
                  I confirm that this is a valid medical prescription issued by a registered medical practitioner and understand that medicines will only be dispensed after verification by a certified pharmacist.
                </span>
              </label>

              <button type="submit" className="btn-submit-rx">
                Upload &amp; Request Pharmacist Callback <Plus size={16} />
              </button>
            </form>
          )}
        </div>

        {/* Right Info Box */}
        <div className="rx-guidelines-box">
          <h3>How Prescription Orders Work</h3>
          <ol className="rx-steps-list">
            <li>
              <b>1. Take a Clear Photo</b>
              <p>Ensure the doctor&apos;s name, clinic stamp, patient name, and medicine names are clearly legible.</p>
            </li>
            <li>
              <b>2. Pharmacist Review</b>
              <p>A licensed local chemist checks validity, dosage, and stock availability.</p>
            </li>
            <li>
              <b>3. Price Confirmation Call</b>
              <p>You receive a quick call to approve the bill amount before billing.</p>
            </li>
            <li>
              <b>4. Village Doorstep Delivery</b>
              <p>Our fleet rider delivers safely packed medications within 45 minutes.</p>
            </li>
          </ol>

          <div className="verified-chemist-card">
            <ShieldCheck size={24} className="text-check" />
            <div>
              <b>Apollo Pharmacy Partner &amp; Local Meds</b>
              <span>Govt. License # TS/DCA/2024/9912</span>
              <p>Hospital Chowrasta, Peddapalli (24 Hours Open)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Over-the-counter essentials */}
      <section className="otc-shelf-section">
        <h2 className="section-main-heading">Over-the-Counter Daily Health Needs</h2>
        <p className="section-sub-heading">Pain balms, oral rehydration salts, fever tablets &amp; first-aid essentials</p>
        <div className="products-shelf-grid">
          {pharmacyProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
