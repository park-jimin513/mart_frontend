// lib/storage.js
"use client";

export const STORAGE_KEYS = {
  CART: "villagekart_cart",
  ORDERS: "villagekart_orders",
  USER: "villagekart_user",
  AUTH_SESSION: "villagekart_auth_session",
  ACCOUNTS: "villagekart_accounts",
  FAVORITES: "villagekart_favorites",
  ADDRESS: "villagekart_address",
  LOCATION: "villagekart_selected_location",
  PRESCRIPTIONS: "villagekart_prescriptions"
};

export const defaultAddress = {
  name: "Srinivas Reddy",
  phone: "9876543210",
  village: "Peddapalli Village",
  mandal: "Peddapalli Mandal",
  district: "Karimnagar",
  pincode: "505172",
  landmark: "Near Hanuman Temple, Main Road",
  distanceKm: 8
};

export const defaultUser = {
  id: "USR-88219",
  name: "Srinivas Reddy",
  email: "srinivas.reddy@villagekart.demo",
  phone: "9876543210",
  village: "Peddapalli Village",
  district: "Karimnagar",
  pincode: "505172",
  joinedDate: "October 2025"
};

export function getFromStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error("Storage read error", e);
    return fallback;
  }
}

export function saveToStorage(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage save error", e);
  }
}
