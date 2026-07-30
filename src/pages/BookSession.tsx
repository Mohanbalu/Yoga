import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Calendar as CalendarIcon,
  Clock,
  User,
  Check,
  Tag,
  CreditCard,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

export const BookSession: React.FC = () => {
  const {
    services,
    trainers,
    currentUser,
    formatPrice,
    addBooking,
    applyCoupon,
    openPaymentModal,
    showToast
  } = useApp();

  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedTrainer, setSelectedTrainer] = useState(trainers[0]);
  const [selectedDate, setSelectedDate] = useState('2026-08-01');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('07:00 AM - 08:00 AM');
  const [notes, setNotes] = useState('');

  // Coupon
  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // Guest details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');

  const timeSlots = [
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

  const handleApplyCoupon = () => {
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (res) {
      setAppliedDiscount(res.discountPercentage);
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const userName = currentUser ? currentUser.name : (guestName || 'Valued Guest');
    const userEmail = currentUser ? currentUser.email : (guestEmail || 'guest@sattvayoga.com');

    const created = addBooking({
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

    openPaymentModal(created);
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="bg-[#18241F] text-white py-14 px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#273B32] text-[#E2C085] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Class Reservation</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold">Book Your Yoga Session</h1>
          <p className="text-xs sm:text-sm text-[#A1BBB0]">
            Select your program, preferred master trainer, date, and convenient time slot.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmitBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Booking Controls (Col 1-7) */}
          <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#D5E2DC] shadow-sm">
            {/* Step 1: Service Selection */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B3B36] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1B3B36] text-white flex items-center justify-center text-[10px]">1</span>
                Select Class or Program
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                {services?.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      selectedService.id === srv.id
                        ? 'bg-[#1B3B36] text-white border-[#1B3B36] shadow-sm'
                        : 'bg-[#FAF9F5] text-[#2C3B34] border-[#D5E2DC] hover:border-[#88B09F]'
                    }`}
                  >
                    <img src={srv.image} alt={srv.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold leading-tight">{srv.title}</h4>
                      <p className={`text-[10px] mt-0.5 ${selectedService.id === srv.id ? 'text-[#A2C7B9]' : 'text-[#6B857B]'}`}>
                        {srv.durationMinutes} mins • {formatPrice(srv.priceINR)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Trainer Selection */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B3B36] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1B3B36] text-white flex items-center justify-center text-[10px]">2</span>
                Choose Instructor
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trainers?.map((tr) => (
                  <div
                    key={tr.id}
                    onClick={() => setSelectedTrainer(tr)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                      selectedTrainer.id === tr.id
                        ? 'bg-[#E2ECE9] border-[#1B3B36] text-[#1B3B36]'
                        : 'bg-[#FAF9F5] border-[#D5E2DC] hover:border-[#88B09F]'
                    }`}
                  >
                    <img src={tr.image} alt={tr.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold truncate">{tr.name}</h4>
                      <p className="text-[10px] text-[#6B857B] truncate">{tr.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Date & Time Picker */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B3B36] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#1B3B36] text-white flex items-center justify-center text-[10px]">3</span>
                Pick Date & Slot
              </h3>
              <div className="space-y-3">
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl px-4 py-3 text-xs font-semibold text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`p-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        selectedTimeSlot === slot
                          ? 'bg-[#1B3B36] text-white border-[#1B3B36]'
                          : 'bg-[#FAF9F5] text-[#2C3B34] border-[#D5E2DC] hover:border-[#88B09F]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 4: Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1B3B36] mb-1">
                4. Session Notes / Special Requirements
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Share any past injuries, focus areas, or questions..."
                className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl p-3 text-xs text-[#2C3B34] focus:outline-none focus:border-[#1B3B36] h-20 resize-none"
              />
            </div>
          </div>

          {/* Checkout & Summary Sidebar (Col 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            {!currentUser && (
              <div className="bg-white p-6 rounded-3xl border border-[#D5E2DC] space-y-3 shadow-sm">
                <h4 className="text-xs font-bold text-[#1B3B36] uppercase tracking-wider">Guest Information</h4>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl px-3 py-2.5 text-xs text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl px-3 py-2.5 text-xs text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
                  required
                />
              </div>
            )}

            {/* Coupon Box */}
            <div className="bg-white p-4 rounded-2xl border border-[#D5E2DC] flex gap-2">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl px-3 py-2 text-xs uppercase font-semibold text-[#1B3B36] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                className="bg-[#E2ECE9] text-[#1B3B36] px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#CBE3D9] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>

            {/* Order Summary Box */}
            <div className="bg-[#18241F] text-white p-6 rounded-3xl space-y-4 shadow-xl">
              <h3 className="font-serif-luxury text-xl font-bold text-[#E2C085]">Reservation Summary</h3>

              <div className="space-y-2 text-xs border-y border-white/10 py-4 text-white/80">
                <div className="flex justify-between">
                  <span>Class:</span>
                  <span className="font-semibold text-white">{selectedService.title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Master Instructor:</span>
                  <span className="font-semibold text-white">{selectedTrainer.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Slot:</span>
                  <span className="font-semibold text-white">{selectedDate} ({selectedTimeSlot})</span>
                </div>
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span className="font-semibold text-white">{formatPrice(selectedService.priceINR)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#E2C085]">
                    <span>Discount ({appliedDiscount}% Off):</span>
                    <span>-{formatPrice(Math.round(selectedService.priceINR * (appliedDiscount / 100)))}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-sm font-bold text-white pt-1">
                <span>Total Amount:</span>
                <span className="font-serif-luxury text-2xl text-[#E2C085]">
                  {formatPrice(calculateFinalPrice())}
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#E2C085] text-[#18241F] py-4 rounded-2xl text-xs font-bold hover:bg-[#F2D099] transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 mt-2"
              >
                <CreditCard className="w-4 h-4" />
                <span>Confirm & Pay {formatPrice(calculateFinalPrice())}</span>
              </button>

              <div className="text-[10px] text-center text-[#A1BBB0] flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E2C085]" />
                <span>Secured via UPI, Razorpay & 256-Bit SSL</span>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};
