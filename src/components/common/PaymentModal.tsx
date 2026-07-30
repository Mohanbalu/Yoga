import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  CreditCard,
  QrCode,
  Building2,
  CheckCircle2,
  Lock,
  ArrowRight,
  Shield,
  FileText,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PaymentModal: React.FC = () => {
  const {
    activePaymentBooking,
    closePaymentModal,
    formatPrice,
    getInvoiceByBookingId,
    openInvoiceModal,
    showToast
  } = useApp();

  const [paymentTab, setPaymentTab] = useState<'upi' | 'razorpay' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!activePaymentBooking) return null;

  const invoice = getInvoiceByBookingId(activePaymentBooking.id);

  const handleSimulatePayment = (methodName: string) => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
      showToast(`Payment of ${formatPrice(activePaymentBooking.amountINR)} successful via ${methodName}!`, 'success');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#FAF9F5] border border-[#D5E2DC] rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden relative my-6"
      >
        {/* Header */}
        <div className="bg-[#18241F] text-white p-6 relative flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1 text-[#E2C085] text-[10px] font-semibold uppercase tracking-widest mb-1">
              <Lock className="w-3 h-3" /> 256-Bit SSL Secure Checkout
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold">yogyatra_shreya Payment Gateway</h3>
            <p className="text-xs text-[#A1BBB0]">
              Booking ID: {activePaymentBooking.id} • {activePaymentBooking.serviceName}
            </p>
          </div>

          <button
            onClick={closePaymentModal}
            className="p-2 text-white/60 hover:text-white bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!completed ? (
          <div className="p-6 space-y-6">
            {/* Amount Banner */}
            <div className="bg-white p-4 rounded-2xl border border-[#D5E2DC] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#6B857B] block">Total Amount to Pay</span>
                <span className="font-serif-luxury text-2xl font-bold text-[#1B3B36]">
                  {formatPrice(activePaymentBooking.amountINR)}
                </span>
              </div>
              <div className="text-right text-xs text-[#52635B]">
                <p className="font-semibold text-[#1B3B36]">{activePaymentBooking.date}</p>
                <p>{activePaymentBooking.timeSlot}</p>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="flex border-b border-[#D5E2DC] gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setPaymentTab('upi')}
                className={`pb-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                  paymentTab === 'upi'
                    ? 'border-[#1B3B36] text-[#1B3B36]'
                    : 'border-transparent text-[#6B857B] hover:text-[#1B3B36]'
                }`}
              >
                UPI / Google Pay / PhonePe
              </button>
              <button
                onClick={() => setPaymentTab('razorpay')}
                className={`pb-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                  paymentTab === 'razorpay'
                    ? 'border-[#1B3B36] text-[#1B3B36]'
                    : 'border-transparent text-[#6B857B] hover:text-[#1B3B36]'
                }`}
              >
                Razorpay Checkout
              </button>
              <button
                onClick={() => setPaymentTab('card')}
                className={`pb-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                  paymentTab === 'card'
                    ? 'border-[#1B3B36] text-[#1B3B36]'
                    : 'border-transparent text-[#6B857B] hover:text-[#1B3B36]'
                }`}
              >
                Credit / Debit Card
              </button>
              <button
                onClick={() => setPaymentTab('netbanking')}
                className={`pb-3 px-3 text-xs font-semibold border-b-2 whitespace-nowrap cursor-pointer transition-colors ${
                  paymentTab === 'netbanking'
                    ? 'border-[#1B3B36] text-[#1B3B36]'
                    : 'border-transparent text-[#6B857B] hover:text-[#1B3B36]'
                }`}
              >
                Net Banking
              </button>
            </div>

            {/* Tab: UPI */}
            {paymentTab === 'upi' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleSimulatePayment('Google Pay')}
                    disabled={processing}
                    className="p-3 bg-white border border-[#D5E2DC] hover:border-[#1B3B36] rounded-2xl flex flex-col items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <span className="text-sm font-bold text-[#4285F4]">GPay</span>
                    <span className="text-[10px] text-[#6B857B]">Google Pay UPI</span>
                  </button>
                  <button
                    onClick={() => handleSimulatePayment('PhonePe')}
                    disabled={processing}
                    className="p-3 bg-white border border-[#D5E2DC] hover:border-[#1B3B36] rounded-2xl flex flex-col items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                  >
                    <span className="text-sm font-bold text-[#5F259F]">PhonePe</span>
                    <span className="text-[10px] text-[#6B857B]">PhonePe UPI</span>
                  </button>
                  <button
                    onClick={() => handleSimulatePayment('Paytm UPI')}
                    disabled={processing}
                    className="p-3 bg-white border border-[#D5E2DC] hover:border-[#1B3B36] rounded-2xl flex flex-col items-center gap-1.5 transition-all cursor-pointer shadow-xs col-span-2 sm:col-span-1"
                  >
                    <span className="text-sm font-bold text-[#00B9F1]">Paytm</span>
                    <span className="text-[10px] text-[#6B857B]">Paytm UPI</span>
                  </button>
                </div>

                <div className="relative py-2 flex items-center justify-center">
                  <div className="border-t border-[#D5E2DC] w-full" />
                  <span className="bg-[#FAF9F5] px-3 text-[10px] font-semibold text-[#88B09F] uppercase">
                    or enter VPA / UPI ID
                  </span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. mobile@upi or username@okicici"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="bg-white border border-[#D5E2DC] rounded-xl px-3 py-2.5 text-xs text-[#1B3B36] focus:outline-none focus:border-[#1B3B36] flex-1"
                  />
                  <button
                    onClick={() => handleSimulatePayment('VPA UPI')}
                    disabled={processing}
                    className="bg-[#1B3B36] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#2C524B] transition-all cursor-pointer"
                  >
                    Verify & Pay
                  </button>
                </div>

                {/* Simulated QR Code */}
                <div className="bg-white p-4 rounded-2xl border border-[#D5E2DC] flex items-center gap-4">
                  <div className="w-20 h-20 bg-[#F4F8F6] p-2 rounded-xl flex items-center justify-center border border-[#CBE3D9] shrink-0">
                    <QrCode className="w-16 h-16 text-[#1B3B36]" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#1B3B36]">Scan & Pay via any UPI App</h5>
                    <p className="text-[11px] text-[#6B857B] mt-0.5">
                      Open GPay, PhonePe, Paytm, or BHIM to scan code and pay directly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Razorpay */}
            {paymentTab === 'razorpay' && (
              <div className="bg-white p-6 rounded-2xl border border-[#D5E2DC] space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1B3B36]">Razorpay Smart Checkout</h4>
                  <p className="text-xs text-[#6B857B] mt-1 max-w-sm mx-auto">
                    Supports Cards, Wallets, EMI, Cred, and International payments with instant verification.
                  </p>
                </div>
                <button
                  onClick={() => handleSimulatePayment('Razorpay Express')}
                  disabled={processing}
                  className="w-full bg-[#0C2340] text-white py-3.5 rounded-xl text-xs font-bold hover:bg-[#15345D] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-[#E2C085]" />
                  <span>Launch Razorpay Gateway</span>
                </button>
              </div>
            )}

            {/* Tab: Credit / Debit Card */}
            {paymentTab === 'card' && (
              <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#D5E2DC]">
                <div>
                  <label className="block text-[11px] font-semibold text-[#52635B] mb-1">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8892"
                      className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl pl-3 pr-10 py-2.5 text-xs text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
                    />
                    <CreditCard className="w-4 h-4 text-[#88B09F] absolute right-3 top-3" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#52635B] mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      placeholder="08/28"
                      className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl p-2.5 text-xs text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#52635B] mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength={4}
                      className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl p-2.5 text-xs text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleSimulatePayment('Credit Card')}
                  disabled={processing}
                  className="w-full bg-[#1B3B36] text-white py-3 rounded-xl text-xs font-semibold hover:bg-[#2C524B] transition-all cursor-pointer mt-2"
                >
                  Pay {formatPrice(activePaymentBooking.amountINR)} Securely
                </button>
              </div>
            )}

            {/* Tab: Net Banking */}
            {paymentTab === 'netbanking' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank'].map((bank) => (
                    <button
                      key={bank}
                      onClick={() => handleSimulatePayment(bank + ' NetBanking')}
                      disabled={processing}
                      className="p-3 bg-white border border-[#D5E2DC] hover:border-[#1B3B36] rounded-xl text-xs font-semibold text-[#1B3B36] flex items-center gap-2 cursor-pointer"
                    >
                      <Building2 className="w-4 h-4 text-[#88B09F]" />
                      <span>{bank}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {processing && (
              <div className="p-4 bg-[#E2ECE9] text-[#1B3B36] rounded-2xl flex items-center justify-center gap-3 animate-pulse">
                <div className="w-5 h-5 border-2 border-[#1B3B36] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold">Contacting bank gateway & confirming booking...</span>
              </div>
            )}
          </div>
        ) : (
          /* Payment Success State */
          <div className="p-8 text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 rounded-full bg-[#E2ECE9] text-[#1B3B36] flex items-center justify-center mx-auto shadow-lg"
            >
              <CheckCircle2 className="w-10 h-10 text-[#1B3B36]" />
            </motion.div>

            <div>
              <span className="text-xs font-semibold text-[#88B09F] uppercase tracking-widest block">
                Transaction Successful
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#1B3B36] mt-1">
                Namaste! Your Session is Confirmed
              </h3>
              <p className="text-xs text-[#52635B] mt-2 max-w-sm mx-auto">
                We have emailed your booking pass and tax invoice to{' '}
                <span className="font-semibold text-[#1B3B36]">{activePaymentBooking.userEmail}</span>.
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#D5E2DC] text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#6B857B]">Booking Ref:</span>
                <span className="font-bold text-[#1B3B36]">{activePaymentBooking.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B857B]">Session:</span>
                <span className="font-bold text-[#1B3B36]">{activePaymentBooking.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B857B]">Date & Time:</span>
                <span className="font-bold text-[#1B3B36]">{activePaymentBooking.date} • {activePaymentBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B857B]">Amount Paid:</span>
                <span className="font-bold text-[#1B3B36]">{formatPrice(activePaymentBooking.amountINR)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {invoice && (
                <button
                  onClick={() => {
                    closePaymentModal();
                    openInvoiceModal(invoice);
                  }}
                  className="flex-1 bg-white border border-[#D5E2DC] hover:border-[#1B3B36] text-[#1B3B36] py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <FileText className="w-4 h-4 text-[#88B09F]" />
                  <span>View Tax Invoice</span>
                </button>
              )}
              <button
                onClick={closePaymentModal}
                className="flex-1 bg-[#1B3B36] text-white py-3 rounded-xl text-xs font-semibold hover:bg-[#2C524B] transition-all cursor-pointer shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
