"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Package, Tag, UserRound } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useCart();
  const items = [
    { label: "Home", href: "/", icon: Home, active: pathname === "/" },
    {
      label: "Categories",
      href: "/products",
      icon: LayoutGrid,
      active: pathname === "/products" || pathname.startsWith("/categories")
    },
    { label: "Offers", href: "/offers", icon: Tag, active: pathname === "/offers" },
    {
      label: "Orders",
      href: user ? "/orders" : "/login?redirect=%2Forders",
      icon: Package,
      active: ["/orders", "/tracking", "/checkout"].includes(pathname)
    },
    {
      label: "Account",
      href: user ? "/profile" : "/login?redirect=%2Fprofile",
      icon: UserRound,
      active: ["/profile", "/favorites", "/login"].includes(pathname)
    }
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {items.map(({ label, href, icon: Icon, active }) => (
        <Link
          key={label}
          href={href}
          className={`mobile-bottom-nav-item ${active ? "active" : ""}`}
          aria-current={active ? "page" : undefined}
        >
          <Icon size={19} strokeWidth={active ? 2.5 : 2} />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
