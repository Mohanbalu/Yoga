import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User as UserIcon,
  Calendar,
  CreditCard,
  FileText,
  Bell,
  Settings,
  XCircle,
  RefreshCw,
  Award,
  Clock,
  Sparkles,
  Download,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

export const UserDashboard: React.FC = () => {
  const {
    currentUser,
    bookings,
    invoices,
    cancelBooking,
    rescheduleBooking,
    openPaymentModal,
    openInvoiceModal,
    formatPrice,
    updateUserProfile,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'membership' | 'invoices' | 'settings'>('overview');

  // Reschedule state modal inside tab
  const [rescheduleBookingId, setRescheduleBookingId] = useState<string | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('2026-08-10');
  const [rescheduleSlot, setRescheduleSlot] = useState('07:00 AM - 08:00 AM');

  // Profile form
  const [nameInput, setNameInput] = useState(currentUser?.name || '');
  const [phoneInput, setPhoneInput] = useState(currentUser?.phone || '');

  const userBookings = (bookings || []).filter((b) => b.userId === currentUser?.id || true);
  const upcomingBookings = userBookings.filter((b) => b.status === 'Upcoming');
  const pastBookings = userBookings.filter((b) => b.status !== 'Upcoming');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name: nameInput, phone: phoneInput });
  };

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleBookingId) return;
    rescheduleBooking(rescheduleBookingId, rescheduleDate, rescheduleSlot);
    setRescheduleBookingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Hero Card */}
      <div className="bg-[#18241F] text-white p-8 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5 z-10">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#E2C085]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold">
                Namaste, {currentUser?.name || 'Practitioner'}
              </h1>
              <span className="bg-[#273B32] text-[#E2C085] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {currentUser?.membershipPlan || 'Member'}
              </span>
            </div>
            <p className="text-xs text-[#A1BBB0] mt-1">
              Member since {currentUser?.joinedDate || '2025'} • Status: Active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 z-10 bg-[#21312A] p-4 rounded-2xl border border-[#2F443B]">
          <Award className="w-8 h-8 text-[#E2C085]" />
          <div>
            <span className="text-[10px] text-[#A1BBB0] uppercase font-bold block">Current Practice Streak</span>
            <span className="font-serif-luxury text-xl font-bold text-white">14 Days Active</span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#D5E2DC] overflow-x-auto no-scrollbar pb-2">
        {[
          { id: 'overview', label: 'Overview & Upcoming', icon: Calendar },
          { id: 'bookings', label: 'Booking History', icon: Clock },
          { id: 'membership', label: 'Membership Plan', icon: Award },
          { id: 'invoices', label: 'Invoices & Payments', icon: FileText },
          { id: 'settings', label: 'Profile Settings', icon: Settings }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#1B3B36] text-white shadow-sm'
                : 'text-[#52635B] hover:bg-[#E2ECE9]'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#D5E2DC] shadow-xs">
              <span className="text-xs text-[#6B857B] font-semibold block">Upcoming Sessions</span>
              <span className="font-serif-luxury text-3xl font-bold text-[#1B3B36] mt-1 block">
                {upcomingBookings.length}
              </span>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#D5E2DC] shadow-xs">
              <span className="text-xs text-[#6B857B] font-semibold block">Total Classes Completed</span>
              <span className="font-serif-luxury text-3xl font-bold text-[#1B3B36] mt-1 block">28</span>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-[#D5E2DC] shadow-xs">
              <span className="text-xs text-[#6B857B] font-semibold block">Active Membership</span>
              <span className="font-serif-luxury text-xl font-bold text-[#1B3B36] mt-1 block">
                {currentUser?.membershipPlan}
              </span>
            </div>
          </div>

          {/* Upcoming Class Passes list */}
          <div className="bg-white rounded-3xl p-6 border border-[#D5E2DC] space-y-4">
            <h3 className="font-serif-luxury text-xl font-bold text-[#1B3B36]">Your Upcoming Sessions</h3>

            {upcomingBookings.length === 0 ? (
              <p className="text-xs text-[#6B857B] py-6 text-center">No upcoming sessions booked yet.</p>
            ) : (
              <div className="space-y-3">
                {upcomingBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E6EBE8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#1B3B36]">{b.serviceName}</span>
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-[10px] font-bold">
                          {b.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B857B] mt-1">
                        Trainer: {b.trainerName} • Date: {b.date} ({b.timeSlot})
                      </p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => setRescheduleBookingId(b.id)}
                        className="flex-1 sm:flex-none px-3 py-1.5 bg-white border border-[#D5E2DC] text-[#1B3B36] rounded-xl text-xs font-semibold hover:bg-[#E2ECE9] transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#88B09F]" />
                        <span>Reschedule</span>
                      </button>
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="flex-1 sm:flex-none px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold hover:bg-red-100 transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: BOOKING HISTORY */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-3xl p-6 border border-[#D5E2DC] space-y-4">
          <h3 className="font-serif-luxury text-xl font-bold text-[#1B3B36]">Complete Class History</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F5] border-b border-[#E6EBE8] text-[#1B3B36]">
                <tr>
                  <th className="p-3 font-bold">Booking Ref</th>
                  <th className="p-3 font-bold">Class Program</th>
                  <th className="p-3 font-bold">Instructor</th>
                  <th className="p-3 font-bold">Date & Slot</th>
                  <th className="p-3 font-bold">Amount</th>
                  <th className="p-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6EBE8] text-[#2C3B34]">
                {userBookings.map((b) => (
                  <tr key={b.id}>
                    <td className="p-3 font-mono font-bold text-[#1B3B36]">{b.id}</td>
                    <td className="p-3 font-semibold">{b.serviceName}</td>
                    <td className="p-3">{b.trainerName}</td>
                    <td className="p-3">{b.date} • {b.timeSlot}</td>
                    <td className="p-3 font-bold">{formatPrice(b.amountINR)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        b.status === 'Upcoming' ? 'bg-green-100 text-green-800' :
                        b.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: MEMBERSHIP PLAN */}
      {activeTab === 'membership' && (
        <div className="bg-white rounded-3xl p-8 border border-[#D5E2DC] space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E6EBE8] pb-6">
            <div>
              <span className="text-[10px] font-bold text-[#88B09F] uppercase tracking-wider block">Active Pass</span>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#1B3B36]">{currentUser?.membershipPlan}</h3>
              <p className="text-xs text-[#6B857B] mt-0.5">Renews on {currentUser?.membershipExpiresOn || '2026-12-31'}</p>
            </div>
            <button
              onClick={() => showToast('Redirecting to upgrade plans...', 'info')}
              className="bg-[#1B3B36] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#2C524B] cursor-pointer"
            >
              Upgrade Membership Tier
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-[#1B3B36]">Your Member Benefits</h4>
            <ul className="space-y-1.5 text-[#52635B]">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1B3B36]" /> Unlimited Group Classes</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1B3B36]" /> Complimentary Mat & Organic Tea Lounge</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#1B3B36]" /> 2 Monthly Sound Bath Passes</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 4: INVOICES & PAYMENTS */}
      {activeTab === 'invoices' && (
        <div className="bg-white rounded-3xl p-6 border border-[#D5E2DC] space-y-4">
          <h3 className="font-serif-luxury text-xl font-bold text-[#1B3B36]">Tax Invoices</h3>

          <div className="space-y-3">
            {invoices.map((inv) => (
              <div key={inv.id} className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E6EBE8] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1B3B36]">{inv.id}</h4>
                  <p className="text-[10px] text-[#6B857B]">{inv.date} • {inv.paymentMethod}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-[#1B3B36]">{formatPrice(inv.totalAmount)}</span>
                  <button
                    onClick={() => openInvoiceModal(inv)}
                    className="p-2 bg-white border border-[#D5E2DC] rounded-xl hover:bg-[#E2ECE9] transition-colors cursor-pointer text-[#1B3B36]"
                    title="View Tax Invoice"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PROFILE SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl p-8 border border-[#D5E2DC] max-w-xl space-y-6">
          <h3 className="font-serif-luxury text-xl font-bold text-[#1B3B36]">Account & Profile Settings</h3>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#1B3B36] mb-1">Full Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl p-3 text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
              />
            </div>
            <div>
              <label className="block font-bold text-[#1B3B36] mb-1">Phone Number</label>
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl p-3 text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
              />
            </div>

            <button
              type="submit"
              className="bg-[#1B3B36] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#2C524B] cursor-pointer"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      )}

      {/* Reschedule Modal inside Dashboard */}
      {rescheduleBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white p-6 rounded-3xl border border-[#D5E2DC] max-w-md w-full space-y-4">
            <h3 className="font-serif-luxury text-lg font-bold text-[#1B3B36]">Reschedule Booking</h3>
            <form onSubmit={handleRescheduleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Select New Date</label>
                <input
                  type="date"
                  value={rescheduleDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full border p-2.5 rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Select Time Slot</label>
                <select
                  value={rescheduleSlot}
                  onChange={(e) => setRescheduleSlot(e.target.value)}
                  className="w-full border p-2.5 rounded-xl"
                >
                  <option>06:00 AM - 07:00 AM</option>
                  <option>07:00 AM - 08:00 AM</option>
                  <option>05:00 PM - 06:15 PM</option>
                  <option>06:30 PM - 07:30 PM</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRescheduleBookingId(null)}
                  className="flex-1 border p-2.5 rounded-xl font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#1B3B36] text-white p-2.5 rounded-xl font-semibold cursor-pointer"
                >
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
