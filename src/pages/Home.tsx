import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Video,
  UserCheck,
  HeartHandshake,
  Salad,
  Star,
  ChevronDown,
  ChevronUp,
  Play,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { GALLERY_IMAGES } from '../data/mockData';

export const Home: React.FC = () => {
  const {
    trainers,
    services,
    testimonials,
    faqItems,
    formatPrice,
    openBookingModal
  } = useApp();

  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<string | null>('faq-1');
  const [videoModal, setVideoModal] = useState(false);

  return (
    <div className="space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Full Width Image with Soft Luxury Gradient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=2000"
            alt="Yoga Studio Sanctuary"
            className="w-full h-full object-cover scale-105 filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#18241F]/90 via-[#18241F]/65 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F5] via-transparent to-[#18241F]/40" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[#E2C085] text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Bengaluru’s Premier Luxury Yoga & Wellness Sanctuary</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Find Balance. <br />
              <span className="italic font-normal text-[#E2C085]">Build Strength.</span> <br />
              Transform Your Life.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-[#D0E2DB] max-w-xl leading-relaxed font-normal">
              Join professional yoga classes designed for your body, mind, and soul. Guided by Rishikesh-certified master instructors in temperature-controlled light sanctuary halls.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => openBookingModal()}
                className="bg-[#E2C085] text-[#18241F] px-8 py-4 rounded-full text-sm font-bold hover:bg-[#F2D099] transition-all shadow-xl hover:scale-105 cursor-pointer flex items-center gap-2 group"
              >
                <span>Book Session</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                to="/plans"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-8 py-4 rounded-full text-sm font-semibold transition-all hover:scale-105"
              >
                View Plans
              </Link>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-8 flex flex-wrap items-center gap-8 border-t border-white/15">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'
                  ].map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Member"
                      className="w-9 h-9 rounded-full object-cover border-2 border-[#18241F]"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center text-[#E2C085]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#D0E2DB] font-medium">
                    <strong className="text-white">4.9/5</strong> from 1,200+ Members
                  </span>
                </div>
              </div>

              <div className="text-xs text-[#D0E2DB] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E2C085]" />
                <span>100% Free Cancellation Policy</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Video Preview Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative hidden lg:block"
          >
            <div className="glass-panel p-4 rounded-3xl shadow-2xl relative group">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000"
                  alt="Yoga Meditation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                  <button
                    onClick={() => setVideoModal(true)}
                    className="w-16 h-16 rounded-full bg-white/90 text-[#1B3B36] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer pl-1"
                  >
                    <Play className="w-7 h-7 fill-current text-[#1B3B36]" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-black/40 backdrop-blur-md p-3 rounded-xl text-white text-xs flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Take a 2-Min Studio Tour</p>
                    <p className="text-[10px] text-white/80">Experience our light-filled sanctuary</p>
                  </div>
                  <span className="px-2 py-0.5 bg-[#E2C085] text-[#18241F] rounded-full text-[10px] font-bold">
                    4K Ultra HD
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. WHY CHOOSE US (5 Core Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#88B09F]">
            The Sattva Difference
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1B3B36]">
            Why Discerning Practitioners Choose Us
          </h2>
          <p className="text-xs sm:text-sm text-[#52635B]">
            We merge ancient Himalayan wisdom with modern bio-mechanical precision, organic aromatherapy, and luxury hospitality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            {
              icon: Award,
              title: 'Certified Master Trainers',
              desc: 'Rishikesh & Bali ERYT-500 masters with 10+ years experience.'
            },
            {
              icon: Video,
              title: 'Online & Offline Classes',
              desc: 'Practice in studio or stream 4K live streams & on-demand workouts.'
            },
            {
              icon: UserCheck,
              title: 'Personal Coaching',
              desc: 'Tailored 1-on-1 alignment, posture repair & bio-mechanical assessment.'
            },
            {
              icon: HeartHandshake,
              title: 'Sound Meditation',
              desc: '24K gold-plated singing bowls & Yoga Nidra theta wave restoration.'
            },
            {
              icon: Salad,
              title: 'Diet & Detox Guidance',
              desc: 'Personalized Ayurvedic nutrition plans customized to your Dosha.'
            }
          ].map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-6 rounded-3xl border border-[#E0ECE8] hover-lift text-center space-y-3 flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#E2ECE9] text-[#1B3B36] flex items-center justify-center shadow-xs">
                <pillar.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-base font-bold text-[#1B3B36]">{pillar.title}</h3>
              <p className="text-xs text-[#6B857B] leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED SERVICES PREVIEW */}
      <section className="bg-[#F4F8F6] py-20 border-y border-[#E0ECE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#88B09F]">
                Curated Practice Offerings
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1B3B36] mt-1">
                Explore Our Signature Classes
              </h2>
            </div>
            <Link
              to="/services"
              className="text-xs font-semibold text-[#1B3B36] hover:text-[#2C524B] flex items-center gap-1 group"
            >
              <span>View All 8 Programs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.slice(0, 3)?.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#D5E2DC] shadow-sm hover-lift flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {srv.popular && (
                    <span className="absolute top-3 left-3 bg-[#E2C085] text-[#18241F] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Popular Session
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md">
                    {srv.durationMinutes} Mins
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#88B09F]">
                        {srv.category}
                      </span>
                      <span className="font-serif-luxury text-lg font-bold text-[#1B3B36]">
                        {formatPrice(srv.priceINR)}
                      </span>
                    </div>
                    <h3 className="font-serif-luxury text-xl font-bold text-[#1B3B36]">{srv.title}</h3>
                    <p className="text-xs text-[#6B857B] mt-2 line-clamp-2">{srv.description}</p>
                  </div>

                  <div className="pt-2 border-t border-[#E6EBE8] flex items-center justify-between">
                    <span className="text-[11px] text-[#52635B] font-medium">{srv.suitableFor}</span>
                    <button
                      onClick={() => openBookingModal(srv)}
                      className="bg-[#1B3B36] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#2C524B] transition-colors cursor-pointer"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TRAINER SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#88B09F]">
            Master Lineage
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1B3B36]">
            Guided By Certified Master Instructors
          </h2>
          <p className="text-xs sm:text-sm text-[#52635B]">
            Our teachers hold international credentials from Rishikesh, Bali, and Mysore, combining deep spiritual roots with bio-mechanical posture mastery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers?.map((tr) => (
            <div key={tr.id} className="bg-white rounded-3xl border border-[#D5E2DC] overflow-hidden hover-lift flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={tr.image}
                  alt={tr.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-1 text-[#E2C085] text-xs font-bold mb-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{tr.rating} ({tr.reviewsCount} reviews)</span>
                  </div>
                  <h3 className="font-serif-luxury text-lg font-bold">{tr.name}</h3>
                  <p className="text-xs text-white/80">{tr.role}</p>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-[#6B857B] line-clamp-3 leading-relaxed">{tr.bio}</p>
                <div className="flex flex-wrap gap-1">
                  {tr.specialties?.map((spec) => (
                    <span key={spec} className="px-2 py-0.5 bg-[#E2ECE9] text-[#1B3B36] text-[10px] font-semibold rounded-md">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GALLERY SECTION */}
      <section className="bg-[#18241F] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E2C085]">
              Visual Sanctuary
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
              Step Inside Sattva Studio Space
            </h2>
            <p className="text-xs sm:text-sm text-[#A1BBB0]">
              Natural bamboo floors, acoustic soundproofing, organic cotton props, and calming botanicals created for deep inner quiet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((img) => (
              <div key={img.id} className="group relative rounded-3xl overflow-hidden aspect-[4/3] cursor-pointer">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#E2C085]">
                    {img.category}
                  </span>
                  <h4 className="font-serif-luxury text-base font-bold">{img.title}</h4>
                  <p className="text-xs text-white/70 line-clamp-1">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#88B09F]">
            Member Experiences
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1B3B36]">
            Stories of Transformation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials?.map((t) => (
            <div key={t.id} className="glass-card p-8 rounded-3xl border border-[#D5E2DC] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#2C3B34] italic leading-relaxed">"{t.comment}"</p>
              </div>

              <div className="pt-4 border-t border-[#E6EBE8] flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-[#1B3B36]">{t.name}</h4>
                  <p className="text-[10px] text-[#6B857B]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#88B09F]">
            Got Questions?
          </span>
          <h2 className="font-serif-luxury text-3xl font-bold text-[#1B3B36]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqItems?.map((faq) => {
            const isOpen = activeFaq === faq.id;
            return (
              <div key={faq.id} className="bg-white rounded-2xl border border-[#D5E2DC] overflow-hidden">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif-luxury font-bold text-[#1B3B36] text-sm sm:text-base cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#88B09F]" /> : <ChevronDown className="w-5 h-5 text-[#88B09F]" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-[#52635B] leading-relaxed border-t border-[#F4F8F6] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Video Modal Simulation */}
      {videoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#18241F] text-white p-6 rounded-3xl max-w-2xl w-full space-y-4 relative">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-luxury text-lg font-bold">Sattva Studio Tour Video</h3>
              <button onClick={() => setVideoModal(false)} className="text-white/60 hover:text-white cursor-pointer">
                Close
              </button>
            </div>
            <div className="aspect-video bg-black rounded-2xl overflow-hidden relative flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=1200"
                alt="Studio Tour Video"
                className="w-full h-full object-cover filter brightness-75"
              />
              <div className="absolute text-center space-y-2">
                <p className="text-sm font-semibold">4K Studio Tour Video Playing...</p>
                <p className="text-xs text-white/70">Bamboo floors • Organic Herbal Bar • Rain Showers</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
