import {
  Trainer,
  ServiceItem,
  MembershipPlan,
  Testimonial,
  FAQItem,
  GalleryImage,
  ClassBooking,
  Invoice,
  CouponCode,
  BlogPost,
  AdminStats
} from '../types';

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'tr-1',
    name: 'Ananya Sharma',
    role: 'Lead Ashtanga & Vinyasa Master',
    experience: '12+ Years Experience',
    bio: 'Certified ERYT-500 from Rishikesh Yog Peeth. Specialized in breathwork alignment, core balance, and somatic movement therapy.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    reviewsCount: 248,
    specialties: ['Ashtanga Flow', 'Chakra Balancing', 'Pranayama Master'],
    certifications: ['YACEP Certified', 'RYT-500 Rishikesh', 'Sound Healing Master'],
    socials: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 'tr-2',
    name: 'Marcus Vance',
    role: 'Hatha & Power Yoga Specialist',
    experience: '9+ Years Experience',
    bio: 'Former athlete turned holistic yogi. Focuses on muscular endurance, flexibility enhancement, and stress detox.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    rating: 4.95,
    reviewsCount: 192,
    specialties: ['Power Vinyasa', 'Spinal Alignment', 'Athlete Recovery'],
    certifications: ['RYT-500 Bali Yoga Academy', 'Kinesiology Specialist'],
    socials: {
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 'tr-3',
    name: 'Priya Nair',
    role: 'Yin Yoga & Mindfulness Coach',
    experience: '10+ Years Experience',
    bio: 'Priya guides deep restorative yin practices, sound bath meditation, and prenatal care with gentle mindfulness.',
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    reviewsCount: 310,
    specialties: ['Restorative Yin', 'Tibetan Sound Bath', 'Prenatal Care'],
    certifications: ['Yin Yoga International Certified', 'Sound Therapy Diploma'],
    socials: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com'
    }
  },
  {
    id: 'tr-4',
    name: 'Devraj Kapoor',
    role: 'Kirtan & Kundalini Guide',
    experience: '15+ Years Experience',
    bio: 'Deeply versed in ancient Vedic traditions, energy flow activation, and corporate wellness transformation programs.',
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800',
    rating: 4.88,
    reviewsCount: 165,
    specialties: ['Kundalini Awakening', 'Corporate Wellness', 'Mantra Chanting'],
    certifications: ['Kundalini Research Institute', 'Ayurveda Life Coach'],
    socials: {
      linkedin: 'https://linkedin.com'
    }
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Group Vinyasa Flow',
    tagline: 'Synchronize breath and fluid movement in a serene group atmosphere.',
    description: 'Dynamic flowing sequences designed to increase cardiovascular stamina, flexibility, and deep mental focus in our temperature-controlled light sanctuary.',
    category: 'Group',
    durationMinutes: 60,
    priceINR: 899,
    priceUSD: 12,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    popular: true,
    benefits: ['Boosts metabolic efficiency', 'Improves posture & spinal flex', 'Elevates endorphins'],
    suitableFor: 'All levels from beginner to advanced practitioners',
    includedInPlans: ['plan-starter', 'plan-quarterly', 'plan-yearly', 'plan-vip']
  },
  {
    id: 'srv-2',
    title: 'Private 1-on-1 Alignment',
    tagline: 'Tailored 100% to your unique anatomy, health goals, and injury recovery.',
    description: 'Exclusive private studio session with a senior master trainer. Includes bio-mechanical posture assessment, personalized posture adjustments, and targeted breathwork.',
    category: 'Private',
    durationMinutes: 75,
    priceINR: 2499,
    priceUSD: 32,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    popular: true,
    benefits: ['Targeted body rehabilitation', 'Accelerated progression', 'Exclusive attention & privacy'],
    suitableFor: 'Individuals needing custom modification, posture repair, or luxury privacy',
    includedInPlans: ['plan-vip']
  },
  {
    id: 'srv-3',
    title: 'Sound Bath & Yoga Nidra',
    tagline: 'Deep psychic sleep paired with singing bowl acoustic frequencies.',
    description: 'Immerse in crystal singing bowls and Tibetan gongs while reclined on organic cotton bolsters. Achieve Theta wave brain relaxation equivalent to 4 hours of deep sleep.',
    category: 'Mindfulness',
    durationMinutes: 60,
    priceINR: 1199,
    priceUSD: 16,
    image: 'https://i.ytimg.com/vi/jZXtmkGf4_Q/maxresdefault.jpg',
    popular: true,
    benefits: ['Instant nervous system reset', 'Relieves chronic insomnia & anxiety', 'Deep muscle relaxation'],
    suitableFor: 'Anyone experiencing burnout, stress, or sleep disturbances',
    includedInPlans: ['plan-quarterly', 'plan-yearly', 'plan-vip']
  },
  {
    id: 'srv-4',
    title: 'Prenatal & Postnatal Care',
    tagline: 'Safe, nurturing, expert-guided movement for expectant and new mothers.',
    description: 'Specially structured sequences to relieve pelvic lumbar tension, support safe baby positioning, build labor stamina, and restore postpartum core strength.',
    category: 'Specialized',
    durationMinutes: 60,
    priceINR: 1499,
    priceUSD: 20,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
    benefits: ['Eases pregnancy back pain', 'Prepares pelvic floor muscles', 'Provides supportive mom community'],
    suitableFor: 'Trimester 1-3 pregnant women & new mothers after doctor clearance',
    includedInPlans: ['plan-yearly', 'plan-vip']
  },
  {
    id: 'srv-5',
    title: 'Kids & Teen Yoga Sanctuary',
    tagline: 'Playful mindfulness, posture improvement, and concentration building.',
    description: 'Engaging, story-driven yoga poses and emotional regulation techniques designed to improve children’s physical flexibility, focus, and digital screen detox.',
    category: 'Specialized',
    durationMinutes: 45,
    priceINR: 799,
    priceUSD: 10,
    image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800',
    benefits: ['Enhances memory & study focus', 'Promotes body positivity', 'Reduces childhood stress'],
    suitableFor: 'Ages 6 to 16 years',
    includedInPlans: ['plan-yearly', 'plan-vip']
  },
  {
    id: 'srv-6',
    title: 'Metabolic Weight Loss Program',
    tagline: 'High-energy Power Yoga paired with custom Ayurvedic nutrition detox.',
    description: 'An intensive 6-week holistic transformation program combining dynamic Power Ashtanga, HIIT core circuits, and weekly personalized Ayurvedic diet consultations.',
    category: 'Specialized',
    durationMinutes: 90,
    priceINR: 2999,
    priceUSD: 40,
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&q=80&w=800',
    benefits: ['Burns visceral fat naturally', 'Boosts basal metabolic rate', 'Includes meal plan guidance'],
    suitableFor: 'Those looking for sustainable weight reduction and toning',
    includedInPlans: ['plan-vip']
  },
  {
    id: 'srv-7',
    title: 'Corporate Mind-Reset Workshop',
    tagline: 'On-site or virtual stress resilience for modern leadership teams.',
    description: 'Desk-friendly ergonomic stretches, 10-minute instant mindfulness practices, and posture repair modules to reduce workplace burn-out and boost team focus.',
    category: 'Corporate',
    durationMinutes: 60,
    priceINR: 4999,
    priceUSD: 65,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800',
    benefits: ['Reduces team sick leave', 'Relieves neck & back stiffness', 'Improves team morale'],
    suitableFor: 'Corporate offices, startups, executive retreats, and remote teams',
    includedInPlans: []
  },
  {
    id: 'srv-8',
    title: 'Stress Relief & Breath Therapy',
    tagline: 'Pranayama and vagus nerve stimulation for acute stress recovery.',
    description: 'Scientific breathwork techniques including Nadi Shodhana, Box Breathing, and Kapalabhati engineered to regulate cortisol and shift into parasympathetic bliss.',
    category: 'Mindfulness',
    durationMinutes: 45,
    priceINR: 999,
    priceUSD: 14,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
    benefits: ['Calms heart rate variability', 'Improves oxygen intake', 'Reduces mental clutter'],
    suitableFor: 'Executives, students, and busy professionals seeking clarity',
    includedInPlans: ['plan-starter', 'plan-quarterly', 'plan-yearly', 'plan-vip']
  }
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'plan-starter',
    title: 'Starter Harmony',
    tagline: 'Ideal for beginners establishing a consistent weekly ritual.',
    priceMonthly: 2999,
    priceQuarterly: 7999,
    priceYearly: 28999,
    colorTheme: 'beige',
    features: [
      '8 Group Studio Classes / Month',
      'Access to Online Live Streams & On-Demand HD Library',
      'Mat Storage & Herbal Tea Lounge Access',
      '10% Discount on Special Workshops',
      'Community Wellness Events'
    ],
    notIncluded: [
      'Private 1-on-1 Sessions',
      'Sound Bath Sanctuary Sessions',
      'Personalized Ayurvedic Diet Consultation'
    ]
  },
  {
    id: 'plan-quarterly',
    title: 'Serenity Unlimited',
    popular: true,
    badge: 'MOST POPULAR',
    tagline: 'Our flagship plan for dedicated practitioners seeking total growth.',
    priceMonthly: 5499,
    priceQuarterly: 14999,
    priceYearly: 52999,
    colorTheme: 'sage',
    features: [
      'Unlimited Group Studio Classes',
      'Full Online Live & HD Library Access',
      '2 Monthly Sound Bath & Meditation Sessions',
      'Complimentary Mat & Towel Service',
      'Monthly Bio-metric Body Composition Analysis',
      '15% Discount on Retreats & Spa Partners',
      'Guest Pass (2 per month)'
    ],
    notIncluded: ['Dedicated Private Personal Trainer']
  },
  {
    id: 'plan-vip',
    title: 'yogyatra_shreya Royal VIP',
    badge: 'LUXURY EXPERIENCE',
    tagline: 'Complete 360° lifestyle concierge, personal master coaching & total privacy.',
    priceMonthly: 12999,
    priceQuarterly: 34999,
    priceYearly: 124999,
    colorTheme: 'lavender',
    features: [
      'Unlimited Group & Special Classes',
      '4 Monthly Private 1-on-1 Master Trainer Sessions',
      'Personalized Ayurvedic Nutrition & Meal Plan',
      'Unlimited Sound Bath & Meditation Sessions',
      'VIP Locker with Custom Stenciled Nameplate',
      'Complimentary Luxury Organic Apparel Gift',
      'Priority Booking for International Retreats',
      'Unlimited Guest Passes'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Radhika Malhotra',
    role: 'Architect & Creative Director',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    comment: 'yogyatra_shreya is not just a studio; it is an oasis. The minimalist architecture, scent of lemongrass, and world-class master teachers completely transformed my posture and mental resilience within 3 months.',
    rating: 5,
    serviceUsed: 'Serenity Unlimited Membership',
    verified: true
  },
  {
    id: 't-2',
    name: 'Vikramaditya Sengupta',
    role: 'Tech Founder & Marathon Runner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    comment: 'As a long-distance runner with tight hamstrings, Marcus and Ananya personalized my mobility routines. The private alignment sessions are worth every rupee. Outstanding professionalism.',
    rating: 5,
    serviceUsed: 'Private 1-on-1 Alignment',
    verified: true
  },
  {
    id: 't-3',
    name: 'Dr. Sunita Deshmukh',
    role: 'Cardiologist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    comment: 'The sound bath sessions guided by Priya bring a level of parasympathetic nervous system release that I rarely find elsewhere. Highly recommended for busy medical professionals.',
    rating: 5,
    serviceUsed: 'Sound Bath & Yoga Nidra',
    verified: true
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Beginners',
    question: 'I am completely inflexible and new to yoga. Can I still join?',
    answer: 'Absolutely! Flexibility is the outcome of yoga, not a prerequisite. Our instructors provide options and modifications for every body type, age, and fitness level.'
  },
  {
    id: 'faq-2',
    category: 'Facilities',
    question: 'What amenities are available at the studio?',
    answer: 'We feature temperature-controlled bamboo wood floors, infrared radiant heating, organic cotton mats, spa-grade rain showers, lockable brass lockers, and an organic herbal elixir bar.'
  },
  {
    id: 'faq-3',
    category: 'Booking',
    question: 'How do I reschedule or cancel a booked session?',
    answer: 'You can easily reschedule or cancel up to 2 hours prior to class commencement directly through your User Dashboard with 100% refund or class credit.'
  },
  {
    id: 'faq-4',
    category: 'Pricing',
    question: 'What payment methods do you accept?',
    answer: 'We accept Razorpay, UPI (Google Pay, PhonePe, Paytm), All Major Credit/Debit Cards, Net Banking, and Apple/Google Pay. Monthly recurring auto-debit is also available for memberships.'
  },
  {
    id: 'faq-5',
    category: 'Classes',
    question: 'Should I bring my own mat or equipment?',
    answer: 'We provide sanitized eco-friendly Liforme & Manduka natural rubber mats, organic cotton bolsters, cork blocks, and eye pillows free of charge. You are also welcome to bring your personal mat.'
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g-1',
    title: 'The Light Sanctuary Studio',
    category: 'Studio Space',
    url: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1200',
    caption: 'Sun-drenched sanctuary with natural oak floors and acoustic insulation.'
  },
  {
    id: 'g-2',
    title: 'Morning Vinyasa Flow',
    category: 'Classes',
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
    caption: 'Harmonious morning group session bathed in gentle warm light.'
  },
  {
    id: 'g-4',
    title: 'Himalayan Mindful Retreat',
    category: 'Retreats',
    url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1200',
    caption: 'Annual 5-day mountain wellness experience in Rishikesh valleys.'
  },
  {
    id: 'g-5',
    title: 'Herbal Tea Lounge',
    category: 'Studio Space',
    url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
    caption: 'Relax post-practice with hand-harvested organic Himalayan botanical infusions.'
  },
  {
    id: 'g-6',
    title: 'Sunset Roof Deck Session',
    category: 'Classes',
    url: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=1200',
    caption: 'Evening panoramic sunset practice overlooking peaceful botanical gardens.'
  }
];

export const INITIAL_BOOKINGS: ClassBooking[] = [
  {
    id: 'BK-8902',
    userId: 'usr-1',
    userName: 'Aarav Mehta',
    userEmail: 'aarav@example.com',
    serviceId: 'srv-1',
    serviceName: 'Group Vinyasa Flow',
    trainerId: 'tr-1',
    trainerName: 'Ananya Sharma',
    date: '2026-08-02',
    timeSlot: '07:00 AM - 08:00 AM',
    notes: 'Focus on lower back tension relieving',
    amountINR: 899,
    status: 'Upcoming',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    invoiceId: 'INV-2026-001',
    createdAt: '2026-07-28'
  },
  {
    id: 'BK-8903',
    userId: 'usr-1',
    userName: 'Aarav Mehta',
    userEmail: 'aarav@example.com',
    serviceId: 'srv-3',
    serviceName: 'Sound Bath & Yoga Nidra',
    trainerId: 'tr-3',
    trainerName: 'Priya Nair',
    date: '2026-08-05',
    timeSlot: '06:30 PM - 07:30 PM',
    notes: 'Please keep extra bolster ready',
    amountINR: 1199,
    status: 'Upcoming',
    paymentMethod: 'Razorpay',
    paymentStatus: 'Paid',
    invoiceId: 'INV-2026-002',
    createdAt: '2026-07-29'
  },
  {
    id: 'BK-8841',
    userId: 'usr-1',
    userName: 'Aarav Mehta',
    userEmail: 'aarav@example.com',
    serviceId: 'srv-2',
    serviceName: 'Private 1-on-1 Alignment',
    trainerId: 'tr-2',
    trainerName: 'Marcus Vance',
    date: '2026-07-15',
    timeSlot: '10:00 AM - 11:15 AM',
    amountINR: 2499,
    status: 'Completed',
    paymentMethod: 'Card',
    paymentStatus: 'Paid',
    invoiceId: 'INV-2026-003',
    createdAt: '2026-07-12'
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'INV-2026-001',
    bookingId: 'BK-8902',
    customerName: 'Aarav Mehta',
    customerEmail: 'aarav@example.com',
    customerPhone: '+91 98765 43210',
    date: '2026-07-28',
    items: [
      { description: 'Group Vinyasa Flow Session Pass', amount: 761.86 }
    ],
    taxAmount: 137.14,
    totalAmount: 899,
    paymentMethod: 'UPI (GPay)',
    status: 'Paid'
  },
  {
    id: 'INV-2026-002',
    bookingId: 'BK-8903',
    customerName: 'Aarav Mehta',
    customerEmail: 'aarav@example.com',
    customerPhone: '+91 98765 43210',
    date: '2026-07-29',
    items: [
      { description: 'Sound Bath & Yoga Nidra Sanctuary Pass', amount: 1016.10 }
    ],
    taxAmount: 182.90,
    totalAmount: 1199,
    paymentMethod: 'Razorpay',
    status: 'Paid'
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Science of Pranayama: How 10 Minutes of Breathwork Alters Cortisol',
    excerpt: 'Discover how conscious deep diaphragmatic breathing vagally resets your nervous system and boosts cognitive clarity.',
    content: 'Deep breathing is not just spiritual imagery; it is measurable physiology. When we prolong our exhalations in a 4:8 rhythm, baroreceptors in the carotid sinuses register increased pressure, sending immediate inhibitory signals to the sympathetic nervous system...',
    author: 'Ananya Sharma',
    authorRole: 'Master Practitioner',
    authorImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=400',
    date: 'July 24, 2026',
    readTime: '5 min read',
    category: 'Mindfulness',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
    published: true
  },
  {
    id: 'blog-2',
    title: 'Creating a Sacred Space at Home: A Guide to Minimalist Zen Interiors',
    excerpt: 'Simple design principles to turn any small corner of your apartment into a peaceful sanctuary for daily practice.',
    content: 'Sanctuary design begins with clearing physical clutter. Choose organic natural materials like unbleached linen, light teak wood, and air-purifying plants like Sansevieria and Peace Lilies...',
    author: 'Priya Nair',
    authorRole: 'Mindfulness Coach',
    authorImage: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=400',
    date: 'July 18, 2026',
    readTime: '7 min read',
    category: 'Lifestyle',
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
    published: true
  }
];

export const INITIAL_COUPONS: CouponCode[] = [
  { id: 'c-1', code: 'YOGYATRA10', discountPercentage: 10, validUntil: '2026-12-31', usageCount: 142, active: true },
  { id: 'c-2', code: 'PEACE20', discountPercentage: 20, validUntil: '2026-09-30', usageCount: 89, active: true },
  { id: 'c-3', code: 'LUXURYVIP', discountPercentage: 25, validUntil: '2026-11-15', usageCount: 23, active: true }
];

export const INITIAL_ADMIN_STATS: AdminStats = {
  totalRevenue: 845200,
  monthlyGrowth: 18.4,
  activeMembers: 324,
  totalBookings: 1280,
  todayClassesCount: 8,
  averageRating: 4.94
};
