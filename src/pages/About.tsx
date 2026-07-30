import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Award,
  Sparkles,
  CheckCircle2,
  Heart,
  Globe,
  ShieldCheck,
  Instagram,
  Linkedin
} from 'lucide-react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  const { trainers } = useApp();

  return (
    <div className="space-y-20 pb-16">
      {/* Hero */}
      <section className="bg-[#18241F] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#273B32] text-[#E2C085] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Origin & Philosophy</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold leading-tight">
            Rooted in Tradition. <br />
            <span className="italic font-normal text-[#E2C085]">Designed for Modern Peace.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#A1BBB0] max-w-2xl mx-auto leading-relaxed">
            yogyatra_shreya was founded with a singular intention: to create a tranquil sanctuary where authentic yogic wisdom meets luxury hospitality, somatic alignment, and mindful community.
          </p>
        </div>
      </section>

      {/* Studio Story, Mission, Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#88B09F]">
              The Studio Story
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1B3B36]">
              A Sanctuary Crafted for Mindful Breath & Stillness
            </h2>
            <p className="text-xs sm:text-sm text-[#52635B] leading-relaxed">
              In 2018, after decades of studying at Himalayan ashrams and practicing biomechanics in Europe, our founders set out to build a space free of gym noise and artificial distractions.
            </p>
            <p className="text-xs sm:text-sm text-[#52635B] leading-relaxed">
              Every detail of yogyatra_shreya—from the sustainably harvested teak wood floors to the sound-softened curved walls and chemical-free organic air diffusion—was engineered to facilitate immediate parasympathetic nervous system release.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E0ECE8]">
              <div>
                <h4 className="font-serif-luxury text-2xl font-bold text-[#1B3B36]">12,000+</h4>
                <p className="text-xs text-[#6B857B]">Hours of Yoga Guided</p>
              </div>
              <div>
                <h4 className="font-serif-luxury text-2xl font-bold text-[#1B3B36]">100%</h4>
                <p className="text-xs text-[#6B857B]">Certified Masters</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="glass-card p-6 rounded-3xl border border-[#D5E2DC] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E2ECE9] text-[#1B3B36] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#1B3B36]">Our Mission</h3>
              <p className="text-xs text-[#6B857B] leading-relaxed">
                To empower individuals to overcome chronic stress, build resilient physical posture, and awaken self-awareness through authentic, accessible yoga practice.
              </p>
            </div>

            <div className="glass-card p-6 rounded-3xl border border-[#D5E2DC] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E2ECE9] text-[#1B3B36] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#1B3B36]">Our Vision</h3>
              <p className="text-xs text-[#6B857B] leading-relaxed">
                To be the benchmark global wellness sanctuary uniting ancient yogic lineage, scientific breathwork, and luxury holistic living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trainer Profiles Section */}
      <section className="bg-[#F4F8F6] py-16 border-y border-[#E0ECE8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#88B09F]">
              World-Class Faculty
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#1B3B36]">
              Meet Our Senior Master Instructors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trainers?.map((tr) => (
              <div key={tr.id} className="bg-white rounded-3xl p-6 border border-[#D5E2DC] flex flex-col sm:flex-row gap-6 items-start">
                <img
                  src={tr.image}
                  alt={tr.name}
                  className="w-full sm:w-40 h-48 rounded-2xl object-cover shrink-0"
                />
                <div className="space-y-3 flex-1">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#88B09F] tracking-wider block">
                      {tr.experience}
                    </span>
                    <h3 className="font-serif-luxury text-xl font-bold text-[#1B3B36]">{tr.name}</h3>
                    <p className="text-xs text-[#6B857B]">{tr.role}</p>
                  </div>
                  <p className="text-xs text-[#52635B] leading-relaxed">{tr.bio}</p>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#1B3B36] uppercase">Certifications:</span>
                    <div className="flex flex-wrap gap-1">
                      {tr.certifications?.map((cert) => (
                        <span key={cert} className="px-2 py-0.5 bg-[#E2ECE9] text-[#1B3B36] text-[10px] rounded-md font-medium">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Certifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#18241F] text-white p-8 sm:p-12 rounded-3xl space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold">Accreditations & Industry Honors</h3>
            <p className="text-xs text-[#A1BBB0]">Globally certified and recognized by international wellness boards.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { title: 'Yoga Alliance USA', desc: 'Registered RYS-500 School' },
              { title: 'Rishikesh Peeth', desc: 'Affiliated Lineage Partner' },
              { title: 'Sound Healing Intl', desc: 'Certified Vibrational Therapy' },
              { title: 'Best Wellness Studio', desc: 'Bengaluru Lifestyle Award 2025' }
            ].map((ach, idx) => (
              <div key={idx} className="bg-[#21312A] p-5 rounded-2xl border border-[#2F443B] space-y-2">
                <Award className="w-8 h-8 text-[#E2C085] mx-auto" />
                <h4 className="font-serif-luxury text-base font-bold text-white">{ach.title}</h4>
                <p className="text-xs text-[#92B1A5]">{ach.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
