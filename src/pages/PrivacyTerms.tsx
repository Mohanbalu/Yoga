import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyTerms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-[#2C3B34]">
      <div className="border-b border-[#D5E2DC] pb-6 space-y-2">
        <span className="text-xs font-bold text-[#88B09F] uppercase tracking-wider">Legal Framework</span>
        <h1 className="font-serif-luxury text-3xl font-bold text-[#1B3B36]">Privacy Policy & Terms of Service</h1>
        <p className="text-xs text-[#6B857B]">Effective Date: July 30, 2026 • Sattva Yoga Studio</p>
      </div>

      <div className="space-y-6 text-xs leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif-luxury text-lg font-bold text-[#1B3B36]">1. Information Collection</h2>
          <p className="text-[#52635B]">
            We respect your privacy. When you register or book a class session with Sattva, we collect minimal personal information including your name, email address, phone number, and optional health goal notes required for instructor preparation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-luxury text-lg font-bold text-[#1B3B36]">2. Booking & Cancellation Policy</h2>
          <p className="text-[#52635B]">
            Class reservations can be rescheduled or cancelled free of charge up to 2 hours prior to class commencement through your User Dashboard. Refunds are processed back to your original payment method (Razorpay, UPI, or Card).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif-luxury text-lg font-bold text-[#1B3B36]">3. Payment Security</h2>
          <p className="text-[#52635B]">
            All transactions are handled securely over 256-Bit SSL encryption via PCI-DSS compliant payment gateways (Razorpay, UPI, GPay). Sattva does not store credit card numbers on local servers.
          </p>
        </section>
      </div>

      <div className="pt-4 border-t border-[#D5E2DC]">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-[#1B3B36] hover:underline">
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </Link>
      </div>
    </div>
  );
};
