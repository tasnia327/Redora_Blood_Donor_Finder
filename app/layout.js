import "./globals.css";
import Navbar from "./components/Navbar";
import FloatingSettings from "./components/FloatingSettings";
import Footer from "./components/Footer";
import UIProvider from "./context/UIContext";

export const metadata = {
  title: "Redora",
  description: "Blood Donation Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial",
        }}
      >
        <UIProvider>
          <Navbar />

          {children}

          <div style={{ position: "relative", zIndex: 5 }}>
  <Footer />
</div>

          <FloatingSettings />
        </UIProvider>
      </body>
    </html>
  );
}
