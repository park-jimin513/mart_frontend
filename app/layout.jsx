import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LocationModal from "../components/LocationModal";
import Toast from "../components/Toast";
import ChatWidget from "../components/ChatWidget";
import MobileBottomNav from "../components/MobileBottomNav";

export const metadata = {
  title: "VillageKart | Your Village. Your Market. Delivered.",
  description: "Rural hyperlocal delivery platform for groceries, fresh vegetables, meat, bakery & verified pharmacy items in Indian villages and small towns."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <div className="app-viewport-wrapper">
            <Navbar />
            <main className="main-content-area">{children}</main>
            <Footer />
            <LocationModal />
            <Toast />
            <ChatWidget />
            <MobileBottomNav />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
