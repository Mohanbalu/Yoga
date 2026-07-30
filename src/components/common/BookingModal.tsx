import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Calendar,
  Clock,
  User,
  Sparkles,
  Check,
  CreditCard,
  Tag,
  ShieldCheck,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BookingModal: React.FC = () => {
  const {
    bookingModalOpen,
    closeBookingModal,
    selectedServiceForBooking,
    services,
    trainers,
    currentUser,
    formatPrice,
    addBooking,
    applyCoupon,
    openPaymentModal
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState(selectedServiceForBooking || services[0]);
  const [selectedTrainer, setSelectedTrainer] = useState(trainers[0]);
  const [selectedDate, setSelectedDate] = useState('2026-08-01');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('07:00 AM - 08:00 AM');
  const [notes, setNotes] = useState('');
  
  // Coupon
  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // User input fields if guest
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  useEffect(() => {
    if (selectedServiceForBooking) {
      setSelectedService(selectedServiceForBooking);
    }
  }, [selectedServiceForBooking]);

  if (!bookingModalOpen) return null;

  const availableTimeSlots = [
    '06:00 AM - 07:00 AM',
    '07:15 AM - 08:15 AM',
    '09:00 AM - 10:15 AM',
    '05:00 PM - 06:15 PM',
    '06:30 PM - 07:30 PM',
    '07:45 PM - 08:45 PM'
  ];

  const calculateFinalPrice = () => {
    let price = selectedService.priceINR;
    if (appliedDiscount > 0) {
      price = Math.round(price * (1 - appliedDiscount / 100));
    }
    return price;
  };

  const handleApplyCouponCode = () => {
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (res) {
      setAppliedDiscount(res.discountPercentage);
    }
  };

  const handleProceedToPayment = () => {
    const userName = currentUser ? currentUser.name : (guestName || 'Valued Guest');
    const userEmail = currentUser ? currentUser.email : (guestEmail || 'guest@sattvayoga.com');

    const createdBooking = addBooking({
      userId: currentUser ? currentUser.id : 'guest-1',
      userName,
      userEmail,
      serviceId: selectedService.id,
      serviceName: selectedService.title,
      trainerId: selectedTrainer.id,
      trainerName: selectedTrainer.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      notes,
      amountINR: calculateFinalPrice(),
      paymentMethod: 'UPI'
    });

    closeBookingModal();
    // Open payment drawer/modal with newly created booking
    openPaymentModal(createdBooking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-[#FAF9F5] border border-[#D5E2DC] rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden my-8 relative"
      >
        {/* Header */}
        <div className="bg-[#1B3B36] text-white p-6 relative flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2C524B] text-[#E2C085] text-[10px] font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3" />
              Sattva Reservation
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold">Book Your Yoga Session</h3>
            <p className="text-xs text-[#A2C7B9]">Step {step} of 3 — Personalized Practice Details</p>
          </div>

          <button
            onClick={closeBookingModal}
            className="p-2 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#E2ECE9] h-1.5">
          <div
            className="bg-[#D4AF37] h-1.5 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8">
          {/* STEP 1: Select Service & Trainer */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-[#1B3B36] uppercase tracking-wider mb-2">
                  1. Select Experience Program
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto p-1 pr-2 no-scrollbar">
                  {services?.map((srv) => (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                        selectedService.id === srv.id
                          ? 'bg-[#1B3B36] text-white border-[#1B3B36] shadow-md'
                          : 'bg-white text-[#2C3B34] border-[#D5E2DC] hover:border-[#88B09F]'
                      }`}
                    >
                      <img
                        src={srv.image}
                        alt={srv.title}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold leading-snug">{srv.title}</h4>
                          <span className={`text-xs font-bold ${selectedService.id === srv.id ? 'text-[#E2C085]' : 'text-[#1B3B36]'}`}>
                            {formatPrice(srv.priceINR)}
                          </span>
                        </div>
                        <p className={`text-[10px] mt-0.5 line-clamp-2 ${selectedService.id === srv.id ? 'text-[#A2C7B9]' : 'text-[#6B857B]'}`}>
                          {srv.tagline}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B3B36] uppercase tracking-wider mb-2">
                  2. Choose Master Trainer
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {trainers?.map((tr) => (
                    <div
                      key={tr.id}
                      onClick={() => setSelectedTrainer(tr)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                        selectedTrainer.id === tr.id
                          ? 'bg-[#E2ECE9] border-[#1B3B36] text-[#1B3B36]'
                          : 'bg-white border-[#D5E2DC] hover:border-[#88B09F]'
                      }`}
                    >
                      <img
                        src={tr.image}
                        alt={tr.name}
                        className="w-10 h-10 rounded-full object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold truncate">{tr.name}</h4>
                        <p className="text-[10px] text-[#6B857B] truncate">{tr.role}</p>
                      </div>
                      {selectedTrainer.id === tr.id && (
                        <div className="w-5 h-5 rounded-full bg-[#1B3B36] text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="bg-[#1B3B36] text-white px-6 py-3 rounded-xl text-xs font-semibold hover:bg-[#2C524B] transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Next: Pick Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Pick Date, Time & Notes */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-[#1B3B36] uppercase tracking-wider mb-2">
                  1. Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-white border border-[#D5E2DC] rounded-xl px-4 py-3 text-xs font-semibold text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B3B36] uppercase tracking-wider mb-2">
                  2. Select Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {availableTimeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        selectedTimeSlot === slot
                          ? 'bg-[#1B3B36] text-white border-[#1B3B36]'
                          : 'bg-white text-[#2C3B34] border-[#D5E2DC] hover:border-[#88B09F]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1B3B36] uppercase tracking-wider mb-1">
                  3. Health Goals or Focus Areas (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Recovering from lower back stiffness, prenatal trimester 2, beginner..."
                  className="w-full bg-white border border-[#D5E2DC] rounded-xl p-3 text-xs text-[#2C3B34] focus:outline-none focus:border-[#1B3B36] h-20 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#52635B] hover:text-[#1B3B36] flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-[#1B3B36] text-white px-6 py-3 rounded-xl text-xs font-semibold hover:bg-[#2C524B] transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Review & Summary</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Summary & Guest Auth / Checkout */}
          {step === 3 && (
            <div className="space-y-6">
              {!currentUser && (
                <div className="bg-white p-4 rounded-2xl border border-[#D5E2DC] space-y-3">
                  <h4 className="text-xs font-bold text-[#1B3B36] uppercase tracking-wider">
                    Guest Contact Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1B3B36]"
                    />
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#1B3B36]"
                    />
                  </div>
                </div>
              )}

              {/* Coupon Code input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-[#88B09F] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Enter Coupon Code (e.g. SATTVA10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full bg-white border border-[#D5E2DC] rounded-xl pl-9 pr-3 py-2 text-xs text-[#1B3B36] uppercase font-semibold focus:outline-none focus:border-[#1B3B36]"
                  />
                </div>
                <button
                  onClick={handleApplyCouponCode}
                  className="bg-[#E2ECE9] text-[#1B3B36] hover:bg-[#CBE3D9] px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {/* Order Summary Box */}
              <div className="bg-[#1B2621] text-white p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h4 className="font-serif-luxury text-base font-bold text-[#E2C085]">
                      {selectedService.title}
                    </h4>
                    <p className="text-xs text-white/70">With Master Trainer {selectedTrainer.name}</p>
                  </div>
                  <span className="text-sm font-bold text-white">
                    {formatPrice(selectedService.priceINR)}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-white/80">
                  <div className="flex justify-between">
                    <span>Date & Time:</span>
                    <span className="font-semibold text-white">{selectedDate} ({selectedTimeSlot})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-semibold text-white">{selectedService.durationMinutes} Minutes</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-[#E2C085]">
                      <span>Discount ({appliedDiscount}% Off):</span>
                      <span>-{formatPrice(Math.round(selectedService.priceINR * (appliedDiscount / 100)))}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-white/10 font-bold text-sm text-white">
                    <span>Total Amount Payable:</span>
                    <span className="text-[#E2C085]">{formatPrice(calculateFinalPrice())}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#52635B] bg-[#E2ECE9] p-3 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-[#1B3B36] shrink-0" />
                <span>Instant confirmation, 100% free cancellation up to 2 hours before session.</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#52635B] hover:text-[#1B3B36] flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleProceedToPayment}
                  className="bg-[#D4AF37] text-[#18241F] px-7 py-3.5 rounded-xl text-xs font-bold hover:bg-[#E2C085] transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Proceed to Pay {formatPrice(calculateFinalPrice())}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
