import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Instagram,
  Facebook,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast('Please complete all required fields', 'error');
      return;
    }
    showToast('Thank you! Our concierge team will reach out within 2 hours.', 'success');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-[#18241F] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#273B32] text-[#E2C085] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Studio Concierge</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold">Connect With yogyatra_shreya</h1>
          <p className="text-xs sm:text-sm text-[#A1BBB0] max-w-xl mx-auto">
            Have questions about private alignment coaching, corporate retreats, or studio visits? Our team is at your service.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form (Col 1-7) */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#D5E2DC] shadow-sm space-y-6">
          <div>
            <h2 className="font-serif-luxury text-2xl font-bold text-[#1B3B36]">Send a Direct Message</h2>
            <p className="text-xs text-[#6B857B] mt-1">We respond to all inquiries within 2 hours during studio business hours.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#1B3B36] uppercase mb-1">Your Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Radhika Sharma"
                  className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl p-3 text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#1B3B36] uppercase mb-1">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. radhika@example.com"
                  className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl p-3 text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#1B3B36] uppercase mb-1">Phone Number (Optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl p-3 text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1B3B36] uppercase mb-1">How Can We Assist You? *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Inquire about membership plans, private master sessions, sound baths, or studio tours..."
                className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl p-3 text-[#1B3B36] focus:outline-none focus:border-[#1B3B36] h-32 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#1B3B36] text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-[#2C524B] transition-all cursor-pointer shadow-md flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-[#E2C085]" />
              <span>Submit Message</span>
            </button>
          </form>
        </div>

        {/* Location Info & Map (Col 8-12) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Contact Cards */}
          <div className="bg-[#18241F] text-white p-6 rounded-3xl space-y-6 shadow-xl">
            <h3 className="font-serif-luxury text-xl font-bold text-[#E2C085]">Studio Contact Details</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E2C085] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Studio Location</span>
                  <p className="text-[#A1BBB0] mt-0.5">
                    yogyatra_shreya Sanctuary, 42 Lotus Boulevard, Indiranagar, Bengaluru, KA 560038
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#88B09F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Concierge Desk</span>
                  <a href="tel:+919876543210" className="text-[#A1BBB0] hover:text-white transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#88B09F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">General Inquiries</span>
                  <a href="mailto:namaste@yogyatra_shreya.com" className="text-[#A1BBB0] hover:text-white transition-colors">
                    namaste@yogyatra_shreya.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#88B09F] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Business Hours</span>
                  <p className="text-[#A1BBB0]">Mon - Fri: 06:00 AM – 09:30 PM IST</p>
                  <p className="text-[#A1BBB0]">Sat - Sun: 06:30 AM – 08:00 PM IST</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#25D366] text-white py-3.5 rounded-2xl text-xs font-bold hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat Directly on WhatsApp</span>
            </a>
          </div>

          {/* Interactive Simulated Google Map Visual */}
          <div className="bg-white rounded-3xl p-4 border border-[#D5E2DC] shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#1B3B36] uppercase tracking-wider">Studio Interactive Map</h4>
            <div className="aspect-[4/3] bg-[#E2ECE9] rounded-2xl relative overflow-hidden flex flex-col items-center justify-center p-6 text-center space-y-2 border border-[#CBE3D9]">
              <div className="w-12 h-12 rounded-full bg-[#1B3B36] text-[#E2C085] flex items-center justify-center shadow-lg animate-bounce">
                <MapPin className="w-6 h-6" />
              </div>
              <h5 className="font-serif-luxury font-bold text-[#1B3B36] text-sm">yogyatra_shreya Yoga Studio Sanctuary</h5>
              <p className="text-[11px] text-[#52635B] max-w-xs">
                Indiranagar 100ft Road, Opposite Lotus Park. Valet parking available at premises.
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-2 px-3 py-1.5 bg-[#1B3B36] text-white text-[10px] font-bold rounded-lg hover:bg-[#2C524B] transition-colors"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
