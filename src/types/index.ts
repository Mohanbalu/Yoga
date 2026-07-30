export type UserRole = 'guest' | 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  membershipPlan?: string;
  membershipStatus?: 'active' | 'expired' | 'pending';
  membershipExpiresOn?: string;
  joinedDate: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  image: string;
  rating: number;
  reviewsCount: number;
  specialties: string[];
  certifications: string[];
  socials: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Group' | 'Private' | 'Mindfulness' | 'Specialized' | 'Corporate';
  durationMinutes: number;
  priceINR: number;
  priceUSD: number;
  image: string;
  popular?: boolean;
  benefits: string[];
  suitableFor: string;
  includedInPlans: string[];
}

export interface MembershipPlan {
  id: string;
  title: string;
  badge?: string;
  popular?: boolean;
  tagline: string;
  priceMonthly: number;
  priceQuarterly: number;
  priceYearly: number;
  features: string[];
  notIncluded?: string[];
  colorTheme: 'sage' | 'beige' | 'lavender' | 'emerald';
}

export interface ClassBooking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  serviceId: string;
  serviceName: string;
  trainerId: string;
  trainerName: string;
  date: string;
  timeSlot: string;
  notes?: string;
  amountINR: number;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  paymentMethod: 'Razorpay' | 'UPI' | 'Card' | 'Net Banking';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  invoiceId: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  serviceUsed: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Classes' | 'Booking' | 'Pricing' | 'Facilities' | 'Beginners';
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'Studio Space' | 'Classes' | 'Retreats' | 'Meditation Room';
  url: string;
  caption: string;
}

export interface Invoice {
  id: string;
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  items: {
    description: string;
    amount: number;
  }[];
  taxAmount: number;
  totalAmount: number;
  paymentMethod: string;
  status: 'Paid' | 'Unpaid' | 'Overdue';
}

export interface CouponCode {
  id: string;
  code: string;
  discountPercentage: number;
  validUntil: string;
  usageCount: number;
  active: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  readTime: string;
  category: string;
  coverImage: string;
  published: boolean;
}

export interface AdminStats {
  totalRevenue: number;
  monthlyGrowth: number;
  activeMembers: number;
  totalBookings: number;
  todayClassesCount: number;
  averageRating: number;
}
