import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Send,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  MessageCircle,
  Clock,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { showToast } = useApp();
  const [emailInput, setEmailInput] = useState('');

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    showToast('Thank you for subscribing to yogyatra_shreya Digest!', 'success');
    setEmailInput('');
  };

  return (
    <footer className="bg-[#18241F] text-[#D0E2DB] pt-16 pb-8 border-t border-[#2A3A33] relative overflow-hidden">
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2C524B]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E2C085]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Newsletter Card */}
        <div className="bg-[#21312A] border border-[#2F443B] rounded-3xl p-8 lg:p-12 mb-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2C4138] rounded-full text-[#E2C085] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>yogyatra_shreya Newsletter</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-2">
              Receive Weekly Wisdom & Exclusive Retreat Invites
            </h3>
            <p className="text-sm text-[#A1BBB0]">
              Subscribe to get guided pranayama audio clips, Ayurvedic seasonal nutrition tips, and member-only event discounts.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter your email address..."
              className="bg-[#18241F] border border-[#374E44] text-white placeholder-[#6E8A7F] px-5 py-3.5 rounded-2xl text-sm focus:outline-none focus:border-[#88B09F] w-full sm:w-80"
              required
            />
            <button
              type="submit"
              className="bg-[#E2C085] text-[#18241F] px-6 py-3.5 rounded-2xl text-sm font-semibold hover:bg-[#F2D099] transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md"
            >
              <span>Subscribe</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#2A3A33]">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://i.ibb.co/RkBVMMCm/logo.png"
                alt="yogyatra_shreya Logo"
                className="w-10 h-10 object-contain rounded-full shadow-md bg-[#21312A] p-1 border border-[#E2C085]/30"
              />
              <div>
                <span className="font-serif-luxury text-xl font-bold text-white block">yogyatra_shreya</span>
                <span className="text-[10px] tracking-[0.25em] text-[#88B09F] font-medium uppercase block -mt-1">
                  Luxury Studio
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-[#92B1A5]">
              A high-end sanctuary dedicated to authentic yoga traditions, modern bio-mechanics, sound healing, and mindful lifestyle transformation.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#21312A] hover:bg-[#E2C085] hover:text-[#18241F] flex items-center justify-center transition-colors text-[#92B1A5]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#21312A] hover:bg-[#E2C085] hover:text-[#18241F] flex items-center justify-center transition-colors text-[#92B1A5]"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#21312A] hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors text-[#92B1A5]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Navigation */}
          <div>
            <h4 className="font-serif-luxury text-base font-semibold text-white mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs text-[#92B1A5]">
              <li>
                <Link to="/" className="hover:text-[#E2C085] transition-colors">Home Sanctuary</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#E2C085] transition-colors">Our Story & Master Trainers</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#E2C085] transition-colors">Class Offerings & Programs</Link>
              </li>
              <li>
                <Link to="/plans" className="hover:text-[#E2C085] transition-colors">Membership & Pricing Plans</Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-[#E2C085] transition-colors">Book a Class Session</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#E2C085] transition-colors">Studio Location & Contact</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Studio */}
          <div>
            <h4 className="font-serif-luxury text-base font-semibold text-white mb-4">Operating Hours</h4>
            <ul className="space-y-3 text-xs text-[#92B1A5]">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#88B09F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Mon - Fri (Morning & Evening)</span>
                  <span className="text-[#A1BBB0]">06:00 AM – 09:30 PM IST</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#88B09F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block">Sat - Sun (Weekend Retreats)</span>
                  <span className="text-[#A1BBB0]">06:30 AM – 08:00 PM IST</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div>
            <h4 className="font-serif-luxury text-base font-semibold text-white mb-4">Studio Location</h4>
            <ul className="space-y-3 text-xs text-[#92B1A5]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E2C085] shrink-0 mt-0.5" />
                <span>
                  yogyatra_shreya Sanctuary, 42 Lotus Boulevard, Indiranagar, Bengaluru, Karnataka 560038
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#88B09F] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#88B09F] shrink-0" />
                <a href="mailto:namaste@yogyatra_shreya.com" className="hover:text-white transition-colors">namaste@yogyatra_shreya.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#6E8A7F] gap-4">
          <p>© {new Date().getFullYear()} yogyatra_shreya Luxury Yoga Studio. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <Link to="/privacy-terms" className="hover:text-[#A1BBB0] transition-colors">Privacy Policy</Link>
            <Link to="/privacy-terms" className="hover:text-[#A1BBB0] transition-colors">Terms of Service</Link>
            <span className="flex items-center gap-1 text-[#6E8A7F]">
              Crafted with <Heart className="w-3 h-3 text-[#E2C085] fill-current inline" /> for Peaceful Living
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
