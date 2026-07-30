import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Trainer,
  ServiceItem,
  MembershipPlan,
  Testimonial,
  FAQItem,
  ClassBooking,
  Invoice,
  CouponCode,
  BlogPost,
  AdminStats
} from '../types';
import {
  INITIAL_TRAINERS,
  SERVICES_LIST,
  MEMBERSHIP_PLANS,
  INITIAL_BOOKINGS,
  INITIAL_INVOICES,
  INITIAL_BLOGS,
  INITIAL_COUPONS,
  INITIAL_ADMIN_STATS,
  TESTIMONIALS,
  FAQ_ITEMS
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  currentUser: User | null;
  userRole: 'guest' | 'user' | 'admin';
  setUserRole: (role: 'guest' | 'user' | 'admin') => void;
  loginUser: (email: string, name?: string, role?: 'user' | 'admin') => void;
  logoutUser: () => void;
  updateUserProfile: (data: Partial<User>) => void;
  
  currency: 'INR' | 'USD';
  setCurrency: (curr: 'INR' | 'USD') => void;
  formatPrice: (amountINR: number) => string;

  trainers: Trainer[];
  addTrainer: (trainer: Omit<Trainer, 'id'>) => void;
  updateTrainer: (id: string, data: Partial<Trainer>) => void;
  deleteTrainer: (id: string) => void;

  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, data: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  plans: MembershipPlan[];
  testimonials: Testimonial[];
  faqItems: FAQItem[];

  bookings: ClassBooking[];
  addBooking: (bookingData: Omit<ClassBooking, 'id' | 'createdAt' | 'status' | 'invoiceId' | 'paymentStatus'>) => ClassBooking;
  cancelBooking: (bookingId: string) => void;
  rescheduleBooking: (bookingId: string, newDate: string, newTimeSlot: string) => void;

  invoices: Invoice[];
  getInvoiceByBookingId: (bookingId: string) => Invoice | undefined;

  coupons: CouponCode[];
  applyCoupon: (code: string) => CouponCode | null;
  addCoupon: (code: string, discount: number) => void;

  blogs: BlogPost[];
  addBlog: (blog: Omit<BlogPost, 'id' | 'date'>) => void;
  togglePublishBlog: (id: string) => void;

  adminStats: AdminStats;

  toasts: ToastMessage[];
  showToast: (title: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  // Global Booking & Payment Modal state
  bookingModalOpen: boolean;
  selectedServiceForBooking: ServiceItem | null;
  openBookingModal: (service?: ServiceItem) => void;
  closeBookingModal: () => void;
  
  // Payment Modal
  activePaymentBooking: ClassBooking | null;
  openPaymentModal: (booking: ClassBooking) => void;
  closePaymentModal: () => void;

  // Selected Invoice for Modal
  activeInvoice: Invoice | null;
  openInvoiceModal: (invoice: Invoice) => void;
  closeInvoiceModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER: User = {
  id: 'usr-1',
  name: 'Aarav Mehta',
  email: 'aarav@sattvayoga.com',
  phone: '+91 98765 43210',
  role: 'user',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  membershipPlan: 'Serenity Unlimited',
  membershipStatus: 'active',
  membershipExpiresOn: '2026-11-30',
  joinedDate: '2025-09-15'
};

const DEFAULT_ADMIN: User = {
  id: 'admin-1',
  name: 'Sattva Admin',
  email: 'admin@sattvayoga.com',
  phone: '+91 91234 56789',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
  membershipPlan: 'Master Director',
  membershipStatus: 'active',
  membershipExpiresOn: '2028-12-31',
  joinedDate: '2024-01-01'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(DEFAULT_USER);
  const [userRole, setUserRoleState] = useState<'guest' | 'user' | 'admin'>('user');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const [trainers, setTrainers] = useState<Trainer[]>(INITIAL_TRAINERS);
  const [services, setServices] = useState<ServiceItem[]>(SERVICES_LIST);
  const [plans] = useState<MembershipPlan[]>(MEMBERSHIP_PLANS);
  const [testimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [faqItems] = useState<FAQItem[]>(FAQ_ITEMS);
  const [bookings, setBookings] = useState<ClassBooking[]>(INITIAL_BOOKINGS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [coupons, setCoupons] = useState<CouponCode[]>(INITIAL_COUPONS);
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [adminStats, setAdminStats] = useState<AdminStats>(INITIAL_ADMIN_STATS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<ServiceItem | null>(null);
  const [activePaymentBooking, setActivePaymentBooking] = useState<ClassBooking | null>(null);
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);

  const showToast = (title: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = 'toast-' + Date.now() + Math.random().toString().slice(2, 5);
    setToasts((prev) => [...prev, { id, title, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setUserRole = (role: 'guest' | 'user' | 'admin') => {
    setUserRoleState(role);
    if (role === 'guest') {
      setCurrentUser(null);
      showToast('Switched to Guest view', 'info');
    } else if (role === 'user') {
      setCurrentUser(DEFAULT_USER);
      showToast('Switched to User Dashboard view (Aarav Mehta)', 'info');
    } else if (role === 'admin') {
      setCurrentUser(DEFAULT_ADMIN);
      showToast('Switched to Admin Dashboard view', 'info');
    }
  };

  const loginUser = (email: string, name?: string, role: 'user' | 'admin' = 'user') => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: name || (email.split('@')[0] ? email.split('@')[0].toUpperCase() : 'Member'),
      email,
      phone: '+91 98765 00000',
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      membershipPlan: 'Starter Harmony',
      membershipStatus: 'active',
      membershipExpiresOn: '2026-12-31',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(newUser);
    setUserRoleState(role);
    showToast(`Welcome back, ${newUser.name}!`, 'success');
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setUserRoleState('guest');
    showToast('Logged out successfully', 'info');
  };

  const updateUserProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser((prev) => (prev ? { ...prev, ...data } : null));
    showToast('Profile updated successfully', 'success');
  };

  const formatPrice = (amountINR: number) => {
    if (currency === 'USD') {
      const usd = Math.round(amountINR / 83);
      return `$${usd}`;
    }
    return `₹${amountINR.toLocaleString('en-IN')}`;
  };

  // Trainers CRUD
  const addTrainer = (trainer: Omit<Trainer, 'id'>) => {
    const newTrainer: Trainer = { ...trainer, id: 'tr-' + Date.now() };
    setTrainers((prev) => [newTrainer, ...prev]);
    showToast('Trainer profile added successfully');
  };

  const updateTrainer = (id: string, data: Partial<Trainer>) => {
    setTrainers((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    showToast('Trainer updated successfully');
  };

  const deleteTrainer = (id: string) => {
    setTrainers((prev) => prev.filter((t) => t.id !== id));
    showToast('Trainer deleted from roster', 'info');
  };

  // Services CRUD
  const addService = (service: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = { ...service, id: 'srv-' + Date.now() };
    setServices((prev) => [newService, ...prev]);
    showToast('New service created');
  };

  const updateService = (id: string, data: Partial<ServiceItem>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
    showToast('Service details updated');
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast('Service removed', 'info');
  };

  // Booking Flow
  const addBooking = (
    bookingData: Omit<ClassBooking, 'id' | 'createdAt' | 'status' | 'invoiceId' | 'paymentStatus'>
  ): ClassBooking => {
    const bookingId = 'BK-' + Math.floor(1000 + Math.random() * 9000);
    const invoiceId = 'INV-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900);
    const createdAt = new Date().toISOString().split('T')[0];

    const newBooking: ClassBooking = {
      ...bookingData,
      id: bookingId,
      status: 'Upcoming',
      paymentStatus: 'Paid',
      invoiceId,
      createdAt
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Create corresponding Invoice
    const baseAmount = Math.round(bookingData.amountINR / 1.18);
    const gstAmount = bookingData.amountINR - baseAmount;

    const newInvoice: Invoice = {
      id: invoiceId,
      bookingId,
      customerName: bookingData.userName,
      customerEmail: bookingData.userEmail,
      customerPhone: currentUser?.phone || '+91 98765 43210',
      date: createdAt,
      items: [{ description: `${bookingData.serviceName} Session Pass`, amount: baseAmount }],
      taxAmount: gstAmount,
      totalAmount: bookingData.amountINR,
      paymentMethod: bookingData.paymentMethod,
      status: 'Paid'
    };

    setInvoices((prev) => [newInvoice, ...prev]);
    
    // Update admin stats
    setAdminStats((prev) => ({
      ...prev,
      totalRevenue: prev.totalRevenue + bookingData.amountINR,
      totalBookings: prev.totalBookings + 1
    }));

    showToast(`Booking confirmed! ID: ${bookingId}`, 'success');
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled', paymentStatus: 'Refunded' } : b))
    );
    showToast(`Booking ${bookingId} has been cancelled`, 'info');
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newTimeSlot: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, date: newDate, timeSlot: newTimeSlot } : b))
    );
    showToast(`Booking ${bookingId} rescheduled to ${newDate} (${newTimeSlot})`, 'success');
  };

  const getInvoiceByBookingId = (bookingId: string) => {
    return invoices.find((inv) => inv.bookingId === bookingId);
  };

  const applyCoupon = (code: string): CouponCode | null => {
    const found = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.active);
    if (found) {
      showToast(`Coupon '${found.code}' applied! ${found.discountPercentage}% OFF`, 'success');
      return found;
    } else {
      showToast('Invalid or expired coupon code', 'error');
      return null;
    }
  };

  const addCoupon = (code: string, discount: number) => {
    const newCoupon: CouponCode = {
      id: 'c-' + Date.now(),
      code: code.toUpperCase().trim(),
      discountPercentage: discount,
      validUntil: '2026-12-31',
      usageCount: 0,
      active: true
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast(`New coupon ${newCoupon.code} created`, 'success');
  };

  const addBlog = (blog: Omit<BlogPost, 'id' | 'date'>) => {
    const newBlog: BlogPost = {
      ...blog,
      id: 'blog-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setBlogs((prev) => [newBlog, ...prev]);
    showToast('New blog article created');
  };

  const togglePublishBlog = (id: string) => {
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, published: !b.published } : b)));
    showToast('Blog status updated');
  };

  const openBookingModal = (service?: ServiceItem) => {
    if (service) setSelectedServiceForBooking(service);
    else setSelectedServiceForBooking(services[0]);
    setBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
  };

  const openPaymentModal = (booking: ClassBooking) => {
    setActivePaymentBooking(booking);
  };

  const closePaymentModal = () => {
    setActivePaymentBooking(null);
  };

  const openInvoiceModal = (invoice: Invoice) => {
    setActiveInvoice(invoice);
  };

  const closeInvoiceModal = () => {
    setActiveInvoice(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        userRole,
        setUserRole,
        loginUser,
        logoutUser,
        updateUserProfile,
        currency,
        setCurrency,
        formatPrice,
        trainers,
        addTrainer,
        updateTrainer,
        deleteTrainer,
        services,
        addService,
        updateService,
        deleteService,
        plans,
        testimonials,
        faqItems,
        bookings,
        addBooking,
        cancelBooking,
        rescheduleBooking,
        invoices,
        getInvoiceByBookingId,
        coupons,
        applyCoupon,
        addCoupon,
        blogs,
        addBlog,
        togglePublishBlog,
        adminStats,
        toasts,
        showToast,
        removeToast,
        bookingModalOpen,
        selectedServiceForBooking,
        openBookingModal,
        closeBookingModal,
        activePaymentBooking,
        openPaymentModal,
        closePaymentModal,
        activeInvoice,
        openInvoiceModal,
        closeInvoiceModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
