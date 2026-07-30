import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Check,
  X,
  Crown,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

export const Plans: React.FC = () => {
  const { plans, formatPrice, showToast, openBookingModal } = useApp();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'yearly'>('quarterly');

  const getPlanPrice = (plan: typeof plans[0]) => {
    if (billingCycle === 'monthly') return plan.priceMonthly;
    if (billingCycle === 'quarterly') return Math.round(plan.priceQuarterly / 3);
    return Math.round(plan.priceYearly / 12);
  };

  const getBillingLabel = () => {
    if (billingCycle === 'monthly') return '/ month, billed monthly';
    if (billingCycle === 'quarterly') return '/ month, billed quarterly';
    return '/ month, billed annually (Save 30%)';
  };

  const handleSelectPlan = (planTitle: string) => {
    showToast(`Selected '${planTitle}' plan (${billingCycle.toUpperCase()}). Opening reservation...`, 'success');
    openBookingModal();
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-[#18241F] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#273B32] text-[#E2C085] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exclusive Membership Tiers</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold">Invest in Your Health & Stillness</h1>
          <p className="text-xs sm:text-sm text-[#A1BBB0] max-w-xl mx-auto">
            Enjoy priority class bookings, complimentary organic tea lounge access, sound bath retreats, and personal master coaching.
          </p>

          {/* Billing Cycle Switcher */}
          <div className="inline-flex p-1 bg-[#21312A] rounded-full border border-[#2F443B] mt-6">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-[#E2C085] text-[#18241F] shadow-sm' : 'text-[#A1BBB0]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'quarterly' ? 'bg-[#E2C085] text-[#18241F] shadow-sm' : 'text-[#A1BBB0]'
              }`}
            >
              Quarterly
              <span className="text-[9px] bg-[#18241F] text-[#E2C085] px-1.5 py-0.5 rounded-full font-bold">Popular</span>
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'yearly' ? 'bg-[#E2C085] text-[#18241F] shadow-sm' : 'text-[#A1BBB0]'
              }`}
            >
              Yearly
              <span className="text-[9px] bg-green-900 text-green-200 px-1.5 py-0.5 rounded-full font-bold">Save 30%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans?.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -6 }}
              className={`rounded-3xl p-8 border flex flex-col justify-between relative shadow-sm ${
                plan.popular
                  ? 'bg-[#18241F] text-white border-[#34483F] shadow-2xl ring-2 ring-[#E2C085]'
                  : 'bg-white text-[#2C3B34] border-[#D5E2DC]'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E2C085] text-[#18241F] text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className={`font-serif-luxury text-2xl font-bold ${plan.popular ? 'text-white' : 'text-[#1B3B36]'}`}>
                    {plan.title}
                  </h3>
                  <p className={`text-xs mt-1 ${plan.popular ? 'text-[#A1BBB0]' : 'text-[#6B857B]'}`}>
                    {plan.tagline}
                  </p>
                </div>

                <div className="pb-6 border-b border-current/10">
                  <div className="flex items-baseline gap-1">
                    <span className={`font-serif-luxury text-4xl font-bold ${plan.popular ? 'text-[#E2C085]' : 'text-[#1B3B36]'}`}>
                      {formatPrice(getPlanPrice(plan))}
                    </span>
                    <span className={`text-xs ${plan.popular ? 'text-[#A1BBB0]' : 'text-[#6B857B]'}`}>
                      {getBillingLabel()}
                    </span>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-3 text-xs">
                  <span className={`font-bold uppercase text-[10px] tracking-wider block ${plan.popular ? 'text-[#E2C085]' : 'text-[#88B09F]'}`}>
                    What's Included:
                  </span>
                  <ul className="space-y-2.5">
                    {plan.features?.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? 'text-[#E2C085]' : 'text-[#1B3B36]'}`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                    {plan.notIncluded?.map((notFeat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 opacity-40">
                        <X className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="line-through">{notFeat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleSelectPlan(plan.title)}
                  className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md ${
                    plan.popular
                      ? 'bg-[#E2C085] text-[#18241F] hover:bg-[#F2D099]'
                      : 'bg-[#1B3B36] text-white hover:bg-[#2C524B]'
                  }`}
                >
                  <span>Select {plan.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Matrix Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-[#D5E2DC] space-y-6">
          <div className="text-center space-y-2">
            <h3 className="font-serif-luxury text-2xl font-bold text-[#1B3B36]">Detailed Plan Feature Matrix</h3>
            <p className="text-xs text-[#6B857B]">Compare all benefits line by line to choose the ideal tier for your ritual.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-[#E6EBE8] text-[#1B3B36]">
                  <th className="p-4 font-bold">Feature / Benefit</th>
                  <th className="p-4 font-bold text-center">Starter Harmony</th>
                  <th className="p-4 font-bold text-center bg-[#F4F8F6]">Serenity Unlimited</th>
                  <th className="p-4 font-bold text-center">Sattva Royal VIP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6EBE8] text-[#2C3B34]">
                <tr>
                  <td className="p-4 font-semibold">Monthly Studio Classes</td>
                  <td className="p-4 text-center">8 Classes</td>
                  <td className="p-4 text-center bg-[#F4F8F6] font-bold text-[#1B3B36]">Unlimited</td>
                  <td className="p-4 text-center font-bold text-[#1B3B36]">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">4K Live Streams & On-Demand Library</td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-[#1B3B36] mx-auto" /></td>
                  <td className="p-4 text-center bg-[#F4F8F6]"><Check className="w-4 h-4 text-[#1B3B36] mx-auto" /></td>
                  <td className="p-4 text-center"><Check className="w-4 h-4 text-[#1B3B36] mx-auto" /></td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Sound Bath & Yoga Nidra Sessions</td>
                  <td className="p-4 text-center text-gray-400">—</td>
                  <td className="p-4 text-center bg-[#F4F8F6]">2 / Month</td>
                  <td className="p-4 text-center font-bold text-[#1B3B36]">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Private 1-on-1 Master Trainer Sessions</td>
                  <td className="p-4 text-center text-gray-400">—</td>
                  <td className="p-4 text-center bg-[#F4F8F6] text-gray-400">—</td>
                  <td className="p-4 text-center font-bold text-[#1B3B36]">4 / Month</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Personalized Ayurvedic Nutrition Consultation</td>
                  <td className="p-4 text-center text-gray-400">—</td>
                  <td className="p-4 text-center bg-[#F4F8F6]">Bi-monthly</td>
                  <td className="p-4 text-center font-bold text-[#1B3B36]">Included (Custom)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Reserved Custom Locker & Mat Towel Service</td>
                  <td className="p-4 text-center text-gray-400">—</td>
                  <td className="p-4 text-center bg-[#F4F8F6]"><Check className="w-4 h-4 text-[#1B3B36] mx-auto" /></td>
                  <td className="p-4 text-center"><Crown className="w-4 h-4 text-[#E2C085] mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
