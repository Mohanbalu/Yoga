import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Clock,
  CheckCircle2,
  Filter,
  Search,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { ServiceItem } from '../types';

export const Services: React.FC = () => {
  const { services, formatPrice, openBookingModal } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Group', 'Private', 'Mindfulness', 'Specialized', 'Corporate'];

  const filteredServices = (services || []).filter((srv) => {
    const matchesCategory = activeCategory === 'All' || srv.category === activeCategory;
    const matchesSearch =
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-[#18241F] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#273B32] text-[#E2C085] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Signature Programs & Custom Sessions</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold">Class Offerings & Services</h1>
          <p className="text-xs sm:text-sm text-[#A1BBB0] max-w-xl mx-auto">
            Choose from dynamic group flows, intimate private 1-on-1 alignment, sound bath meditation, and specialized therapeutic programs.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 rounded-2xl border border-[#D5E2DC] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#1B3B36] text-white shadow-sm'
                    : 'bg-[#FAF9F5] text-[#52635B] hover:bg-[#E2ECE9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#88B09F] absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search services or benefits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#D5E2DC] space-y-3">
            <ShieldAlert className="w-10 h-10 text-[#88B09F] mx-auto" />
            <h3 className="font-serif-luxury text-xl font-bold text-[#1B3B36]">No Sessions Found</h3>
            <p className="text-xs text-[#6B857B]">Try adjusting your search terms or selecting 'All' categories.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((srv) => (
              <div
                key={srv.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#D5E2DC] shadow-sm hover-lift flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#1B3B36] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {srv.category}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {srv.durationMinutes} Mins
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-serif-luxury text-xl font-bold text-[#1B3B36]">{srv.title}</h3>
                      <span className="font-serif-luxury text-lg font-bold text-[#1B3B36] shrink-0 ml-2">
                        {formatPrice(srv.priceINR)}
                      </span>
                    </div>

                    <p className="text-xs text-[#6B857B] leading-relaxed">{srv.description}</p>

                    <div className="space-y-1.5 pt-2 border-t border-[#E6EBE8]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#88B09F]">
                        Key Health Benefits:
                      </span>
                      <ul className="space-y-1">
                        {srv.benefits?.map((b, i) => (
                          <li key={i} className="text-xs text-[#2C3B34] flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1B3B36] shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => openBookingModal(srv)}
                    className="w-full bg-[#1B3B36] text-white py-3 rounded-2xl text-xs font-bold hover:bg-[#2C524B] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Book Session ({formatPrice(srv.priceINR)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
