import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import UIProvider from "@/context/UIContext";
import { AuthProvider } from "@/context/AuthContext";

import FloatingSettings from "@/components/layout/FloatingSettings";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UIProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
            <FloatingSettings />
          </AuthProvider>
        </UIProvider>
      </body>
    </html>
  );
}