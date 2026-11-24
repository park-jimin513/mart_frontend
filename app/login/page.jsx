"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, LockKeyhole, UserRound } from "lucide-react";
import { useCart } from "../../context/CartContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginUser, registerUser } = useCart();
  const [mode, setMode] = useState(searchParams.get("mode") === "signup" ? "signup" : "login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const redirect = searchParams.get("redirect");
  const nextPath = redirect && redirect.startsWith("/") && !redirect.startsWith("//")
    ? redirect
    : "/profile";
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    village: "",
    password: ""
  });

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (mode === "signup") {
        await registerUser(formData);
      } else {
        await loginUser(formData);
      }
      router.replace(nextPath);
    } catch (authError) {
      setError(authError.message || "Unable to authenticate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container auth-page-container">
      <section className="auth-card">
        <div className="auth-icon"><UserRound size={24} /></div>
        <h1>{mode === "signup" ? "Create your account" : "Welcome back"}</h1>
        <p className="auth-intro">
          {mode === "signup"
            ? "Sign up to save your details and place your VillageKart order."
            : "Log in to continue to checkout and place your order."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <>
              <label className="form-group">
                <span>Full name</span>
                <input name="name" autoComplete="name" value={formData.name} onChange={handleChange} required />
              </label>
              <label className="form-group">
                <span>Email address (optional)</span>
                <input name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} />
              </label>
              <label className="form-group">
                <span>Village / town</span>
                <input name="village" autoComplete="address-level2" value={formData.village} onChange={handleChange} required />
              </label>
            </>
          )}

          <label className="form-group">
            <span>Mobile number</span>
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              minLength={10}
              required
            />
          </label>
          <label className="form-group">
            <span>Password</span>
            <input
              name="password"
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              required
            />
          </label>

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button type="submit" className="btn-auth-submit" disabled={isSubmitting}>
            <LockKeyhole size={17} />
            {isSubmitting
              ? "Please wait..."
              : mode === "signup"
                ? "Create account"
                : "Log in"}
            {!isSubmitting && <ArrowRight size={17} />}
          </button>
        </form>

        <p className="auth-mode-switch">
          {mode === "signup" ? "Already have an account?" : "New to VillageKart?"}{" "}
          <button
            type="button"
            onClick={() => {
              setError("");
              setMode((current) => current === "signup" ? "login" : "signup");
            }}
          >
            {mode === "signup" ? "Log in" : "Create an account"}
          </button>
        </p>

        <p className="auth-demo-note">
          Demo sign-in is stored in this browser only. Do not use a real password.
        </p>
        <Link href="/" className="auth-back-link">Continue shopping</Link>
      </section>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="container auth-page-container">Loading account...</div>}>
      <LoginForm />
    </Suspense>
  );
}
