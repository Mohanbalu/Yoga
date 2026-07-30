import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Breadcrumbs } from './components/common/Breadcrumbs';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { ScrollToTop } from './components/common/ScrollToTop';
import { ToastContainer } from './components/common/ToastContainer';
import { CookieBanner } from './components/common/CookieBanner';
import { BookingModal } from './components/common/BookingModal';
import { PaymentModal } from './components/common/PaymentModal';
import { InvoiceModal } from './components/common/InvoiceModal';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Plans } from './pages/Plans';
import { BookSession } from './pages/BookSession';
import { LoginSignup } from './pages/LoginSignup';
import { UserDashboard } from './pages/UserDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Contact } from './pages/Contact';
import { PrivacyTerms } from './pages/PrivacyTerms';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col justify-between bg-[#FAF9F5] text-[#2C3B34] font-sans antialiased selection:bg-[#E2ECE9] selection:text-[#1B3B36]">
          <div>
            <Navbar />
            <Breadcrumbs />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/book" element={<BookSession />} />
                <Route path="/login" element={<LoginSignup />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-terms" element={<PrivacyTerms />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>

          <Footer />

          {/* Global Floating Widgets & Modals */}
          <FloatingWhatsApp />
          <ScrollToTop />
          <ToastContainer />
          <CookieBanner />
          <BookingModal />
          <PaymentModal />
          <InvoiceModal />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
