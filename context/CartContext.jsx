// context/CartContext.jsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { STORAGE_KEYS, getFromStorage, saveToStorage, defaultAddress } from "../lib/storage";
import { initialOrders } from "../data/dummyOrders";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState(defaultAddress);
  const [selectedLocation, setSelectedLocation] = useState("Peddapalli Village");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    setIsMounted(true);
    const savedCart = getFromStorage(STORAGE_KEYS.CART, [
      // Pre-seed matching reference UI cart
      { id: "prod-6", name: "Onion 1kg", originalName: "Fresh Red Onions (Desi Ullipaya)", price: 30, originalPrice: 38, qty: 1, weight: "1 kg", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80", shopName: "Rythu Fresh Rythu Bazaar Stall #12" },
      { id: "prod-7", name: "Tomato 1kg", originalName: "Farm Fresh Country Tomatoes", price: 40, originalPrice: 50, qty: 1, weight: "1 kg", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80", shopName: "Rythu Fresh Rythu Bazaar Stall #12" },
      { id: "prod-10", name: "Chicken 500g", originalName: "Fresh Broiler Chicken Curry Cut", price: 120, originalPrice: 150, qty: 1, weight: "500 g", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=600&q=80", shopName: "Reddy Country Fresh Chicken & Mutton" }
    ]);
    const savedFavorites = getFromStorage(STORAGE_KEYS.FAVORITES, []);
    const savedOrders = getFromStorage(STORAGE_KEYS.ORDERS, initialOrders);
    const savedUser = getFromStorage(STORAGE_KEYS.AUTH_SESSION, null);
    const savedAddress = getFromStorage(STORAGE_KEYS.ADDRESS, defaultAddress);
    const savedLoc = getFromStorage(STORAGE_KEYS.LOCATION, "Peddapalli Village");

    setCart(savedCart);
    setFavorites(Array.isArray(savedFavorites) ? savedFavorites : []);
    setOrders(savedOrders);
    setUser(savedUser);
    setAddress(savedAddress);
    setSelectedLocation(savedLoc);
  }, []);

  // Sync to storage on state change
  useEffect(() => {
    if (!isMounted) return;
    saveToStorage(STORAGE_KEYS.CART, cart);
  }, [cart, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    saveToStorage(STORAGE_KEYS.FAVORITES, favorites);
  }, [favorites, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    saveToStorage(STORAGE_KEYS.ORDERS, orders);
  }, [orders, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    if (user) {
      saveToStorage(STORAGE_KEYS.AUTH_SESSION, user);
      saveToStorage(STORAGE_KEYS.USER, user);
    } else if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    saveToStorage(STORAGE_KEYS.ADDRESS, address);
  }, [address, isMounted]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 2800);
  };

  const hashPassword = async (password, salt) => {
    if (!window.crypto?.subtle) {
      throw new Error("Secure browser authentication is unavailable. Use HTTPS or localhost.");
    }

    const key = await window.crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      "PBKDF2",
      false,
      ["deriveBits"]
    );
    const hash = await window.crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt,
        iterations: 120000,
        hash: "SHA-256"
      },
      key,
      256
    );
    return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("");
  };

  const registerUser = async ({ name, phone, email, village, password }) => {
    const normalizedPhone = phone.replace(/\D/g, "");
    if (normalizedPhone.length < 10 || normalizedPhone.length > 15) {
      throw new Error("Enter a valid mobile number.");
    }
    const accounts = getFromStorage(STORAGE_KEYS.ACCOUNTS, []);
    if (accounts.some((account) => account.user.phone === normalizedPhone)) {
      throw new Error("An account already exists for this phone number. Please log in.");
    }

    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const passwordHash = await hashPassword(password, salt);
    const userData = {
      id: `USR-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: normalizedPhone,
      village: village.trim(),
      district: address.district,
      pincode: address.pincode,
      joinedDate: new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    };

    saveToStorage(STORAGE_KEYS.ACCOUNTS, [
      ...accounts,
      { user: userData, salt: Array.from(salt), passwordHash }
    ]);
    setUser(userData);
    setAddress((current) => ({ ...current, name: userData.name, phone: userData.phone, village: userData.village }));
    setSelectedLocation(userData.village);
    saveToStorage(STORAGE_KEYS.LOCATION, userData.village);
    return userData;
  };

  const loginUser = async ({ phone, password }) => {
    const normalizedPhone = phone.replace(/\D/g, "");
    if (normalizedPhone.length < 10 || normalizedPhone.length > 15) {
      throw new Error("Enter a valid mobile number.");
    }
    const accounts = getFromStorage(STORAGE_KEYS.ACCOUNTS, []);
    const account = accounts.find((item) => item.user.phone === normalizedPhone);
    if (!account) {
      throw new Error("No account found for this phone number. Please sign up first.");
    }

    const passwordHash = await hashPassword(password, new Uint8Array(account.salt));
    if (passwordHash !== account.passwordHash) {
      throw new Error("Incorrect password. Please try again.");
    }

    setUser(account.user);
    setAddress((current) => ({
      ...current,
      name: account.user.name,
      phone: account.user.phone,
      village: account.user.village
    }));
    setSelectedLocation(account.user.village);
    saveToStorage(STORAGE_KEYS.LOCATION, account.user.village);
    return account.user;
  };

  const logoutUser = () => {
    setUser(null);
    showToast("You have been logged out");
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + quantity } : item
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          weight: product.weight,
          image: product.image,
          shopName: product.shopName,
          category: product.category,
          qty: quantity
        }
      ];
    });
    showToast(`${product.name} added to cart`);
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    showToast("Item removed from cart");
  };

  const clearCart = () => {
    setCart([]);
    showToast("Cart cleared");
  };

  const toggleFavorite = (product) => {
    const isSaved = favorites.some((item) => item.id === product.id);
    setFavorites((current) =>
      isSaved
        ? current.filter((item) => item.id !== product.id)
        : [...current, product]
    );
    showToast(isSaved ? "Removed from favorites" : "Added to favorites");
  };

  const clearFavorites = () => {
    setFavorites([]);
    showToast("Favorites cleared");
  };

  const placeOrder = (orderData) => {
    const newOrder = {
      id: `VK${Math.floor(250000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      items: [...cart],
      itemCount: cart.reduce((sum, item) => sum + item.qty, 0),
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      discount: discount,
      total: finalTotal,
      status: "Order Placed",
      statusStep: 1,
      paymentMethod: orderData.paymentMethod || "Cash on Delivery",
      deliveryAddress: orderData.address || address,
      timeline: [
        { step: "Order Placed", time: "Just now", completed: true },
        { step: "Order Confirmed", time: "Pending", completed: false },
        { step: "Preparing", time: "Pending", completed: false },
        { step: "Out for Delivery", time: "Pending", completed: false },
        { step: "Delivered", time: "Pending", completed: false }
      ]
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    saveToStorage(STORAGE_KEYS.ORDERS, updated);
    setCart([]);
    showToast("Order placed successfully!");
    return newOrder;
  };

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal > 300 ? 0 : (address.distanceKm > 15 ? 30 : 20);
  const discount = subtotal > 500 ? 40 : 0;
  const finalTotal = Math.max(0, subtotal + deliveryFee - discount);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        deliveryFee,
        discount,
        finalTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        favorites,
        toggleFavorite,
        clearFavorites,
        orders,
        placeOrder,
        isReady: isMounted,
        user,
        setUser,
        registerUser,
        loginUser,
        logoutUser,
        address,
        setAddress,
        selectedLocation,
        setSelectedLocation,
        isLocationModalOpen,
        setIsLocationModalOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
