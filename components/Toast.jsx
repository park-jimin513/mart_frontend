// components/Toast.jsx
"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="global-toast-pill">
      <CheckCircle2 size={18} className="toast-icon-check" />
      <span>{toastMessage}</span>
    </div>
  );
}
