import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  BarChart3,
  Users,
  Calendar,
  CreditCard,
  Settings,
  Plus,
  Trash2,
  Edit,
  Send,
  FileSpreadsheet,
  Search,
  Filter,
  CheckCircle2,
  Moon,
  Sun,
  BookOpen,
  Tag,
  Star,
  Award
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    adminStats,
    bookings,
    services,
    trainers,
    invoices,
    coupons,
    blogs,
    addTrainer,
    deleteTrainer,
    addService,
    deleteService,
    addCoupon,
    addBlog,
    togglePublishBlog,
    formatPrice,
    showToast
  } = useApp();

  const [adminTab, setAdminTab] = useState<
    'overview' | 'bookings' | 'users' | 'services' | 'trainers' | 'blogs' | 'coupons' | 'broadcast'
  >('overview');

  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form states
  const [newTrainerName, setNewTrainerName] = useState('');
  const [newTrainerRole, setNewTrainerRole] = useState('');
  const [newTrainerBio, setNewTrainerBio] = useState('');

  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServicePrice, setNewServicePrice] = useState(1299);
  const [newServiceDesc, setNewServiceDesc] = useState('');

  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);

  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');

  const [broadcastMessage, setBroadcastMessage] = useState('');

  const handleCreateTrainer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrainerName) return;
    addTrainer({
      name: newTrainerName,
      role: newTrainerRole || 'Master Instructor',
      experience: '8+ Years',
      bio: newTrainerBio || 'Senior yoga practitioner with deep posture alignment knowledge.',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
      reviewsCount: 12,
      specialties: ['Hatha', 'Vinyasa'],
      certifications: ['RYT-500'],
      socials: {}
    });
    setNewTrainerName('');
    setNewTrainerRole('');
    setNewTrainerBio('');
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle) return;
    addService({
      title: newServiceTitle,
      tagline: 'Custom wellness experience',
      description: newServiceDesc || 'Specially designed class for mental and physical harmony.',
      category: 'Group',
      durationMinutes: 60,
      priceINR: Number(newServicePrice),
      priceUSD: Math.round(Number(newServicePrice) / 83),
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800',
      benefits: ['Promotes balance', 'Strengthens core'],
      suitableFor: 'All practitioners',
      includedInPlans: ['plan-yearly', 'plan-vip']
    });
    setNewServiceTitle('');
    setNewServiceDesc('');
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode) return;
    addCoupon(newCouponCode, Number(newCouponDiscount));
    setNewCouponCode('');
  };

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle) return;
    addBlog({
      title: blogTitle,
      excerpt: blogExcerpt,
      content: 'Full article body content...',
      author: 'Sattva Editorial',
      authorRole: 'Master Lead',
      authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      readTime: '4 min read',
      category: 'Wisdom',
      coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
      published: true
    });
    setBlogTitle('');
    setBlogExcerpt('');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage) return;
    showToast(`Broadcast notification sent to 324 active studio members!`, 'success');
    setBroadcastMessage('');
  };

  const handleExportCSV = () => {
    showToast('Exporting admin reports as CSV file...', 'info');
  };

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors ${darkMode ? 'bg-[#121A17] text-white' : 'bg-[#FAF9F5] text-[#2C3B34]'}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6 border-current/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1B3B36] text-[#E2C085] flex items-center justify-center font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif-luxury text-2xl font-bold">Studio Admin Console</h1>
              <p className="text-xs opacity-70">Executive Director Control Panel • Live Operations</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border border-current/20 hover:bg-current/10 transition-colors cursor-pointer text-xs flex items-center gap-2"
            >
              {darkMode ? <Sun className="w-4 h-4 text-[#E2C085]" /> : <Moon className="w-4 h-4" />}
              <span>{darkMode ? 'Light' : 'Dark'} Mode</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="bg-[#1B3B36] text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#2C524B] flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#E2C085]" />
              <span>Export Reports</span>
            </button>
          </div>
        </div>

        {/* Layout: Sidebar + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Tabs (Col 1-3) */}
          <div className="lg:col-span-3 space-y-1">
            {[
              { id: 'overview', label: 'Dashboard & Analytics', icon: BarChart3 },
              { id: 'bookings', label: 'All Class Bookings', icon: Calendar },
              { id: 'services', label: 'Services & Programs', icon: Award },
              { id: 'trainers', label: 'Instructor Roster', icon: Users },
              { id: 'blogs', label: 'Articles & Content', icon: BookOpen },
              { id: 'coupons', label: 'Coupons & Discounts', icon: Tag },
              { id: 'broadcast', label: 'Broadcast Notification', icon: Send }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setAdminTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                  adminTab === item.id
                    ? 'bg-[#1B3B36] text-white shadow-md'
                    : 'hover:bg-current/5 text-current/80'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Main Console Content (Col 4-12) */}
          <div className="lg:col-span-9 space-y-8">
            {/* SEARCH & FILTER BAR */}
            <div className="p-3 bg-white/10 rounded-2xl border border-current/10 flex items-center gap-3">
              <Search className="w-4 h-4 text-current/50" />
              <input
                type="text"
                placeholder="Search across bookings, instructors, members, or revenue logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent w-full text-xs focus:outline-none placeholder-current/50"
              />
            </div>

            {/* TAB: OVERVIEW */}
            {adminTab === 'overview' && (
              <div className="space-y-8">
                {/* 4 Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 bg-white text-[#2C3B34] rounded-3xl border border-[#D5E2DC] shadow-xs">
                    <span className="text-[10px] font-bold text-[#88B09F] uppercase tracking-wider block">Total Revenue</span>
                    <span className="font-serif-luxury text-2xl font-bold text-[#1B3B36] mt-1 block">
                      {formatPrice(adminStats.totalRevenue)}
                    </span>
                    <span className="text-[10px] text-green-700 font-semibold mt-1 inline-block">
                      +{adminStats.monthlyGrowth}% this month
                    </span>
                  </div>

                  <div className="p-5 bg-white text-[#2C3B34] rounded-3xl border border-[#D5E2DC] shadow-xs">
                    <span className="text-[10px] font-bold text-[#88B09F] uppercase tracking-wider block">Active Members</span>
                    <span className="font-serif-luxury text-2xl font-bold text-[#1B3B36] mt-1 block">
                      {adminStats.activeMembers}
                    </span>
                    <span className="text-[10px] text-[#6B857B]">Across 3 Membership Tiers</span>
                  </div>

                  <div className="p-5 bg-white text-[#2C3B34] rounded-3xl border border-[#D5E2DC] shadow-xs">
                    <span className="text-[10px] font-bold text-[#88B09F] uppercase tracking-wider block">Total Bookings</span>
                    <span className="font-serif-luxury text-2xl font-bold text-[#1B3B36] mt-1 block">
                      {adminStats.totalBookings}
                    </span>
                    <span className="text-[10px] text-[#6B857B]">Lifetime Reservation Volume</span>
                  </div>

                  <div className="p-5 bg-white text-[#2C3B34] rounded-3xl border border-[#D5E2DC] shadow-xs">
                    <span className="text-[10px] font-bold text-[#88B09F] uppercase tracking-wider block">Average Satisfaction</span>
                    <span className="font-serif-luxury text-2xl font-bold text-[#1B3B36] mt-1 block">
                      ★ {adminStats.averageRating}
                    </span>
                    <span className="text-[10px] text-[#6B857B]">From 500+ Verified Reviews</span>
                  </div>
                </div>

                {/* Simulated Revenue Chart Graphic */}
                <div className="p-6 bg-white text-[#2C3B34] rounded-3xl border border-[#D5E2DC] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-luxury text-lg font-bold text-[#1B3B36]">Monthly Revenue Growth</h3>
                    <span className="text-xs text-[#88B09F] font-semibold">2026 Q3 Trend</span>
                  </div>

                  <div className="h-40 flex items-end justify-between gap-3 pt-6 border-b border-[#E6EBE8] pb-2">
                    {[
                      { month: 'Jan', height: '40%' },
                      { month: 'Feb', height: '55%' },
                      { month: 'Mar', height: '50%' },
                      { month: 'Apr', height: '65%' },
                      { month: 'May', height: '75%' },
                      { month: 'Jun', height: '85%' },
                      { month: 'Jul', height: '100%' }
                    ].map((bar) => (
                      <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group">
                        <div
                          className="w-full bg-[#1B3B36] rounded-t-xl group-hover:bg-[#E2C085] transition-all"
                          style={{ height: bar.height }}
                        />
                        <span className="text-[10px] text-[#6B857B] font-semibold">{bar.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: BOOKINGS */}
            {adminTab === 'bookings' && (
              <div className="p-6 bg-white text-[#2C3B34] rounded-3xl border border-[#D5E2DC] space-y-4">
                <h3 className="font-serif-luxury text-lg font-bold text-[#1B3B36]">Master Class Reservations Log</h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF9F5] border-b border-[#E6EBE8] text-[#1B3B36]">
                      <tr>
                        <th className="p-3 font-bold">Ref</th>
                        <th className="p-3 font-bold">Customer</th>
                        <th className="p-3 font-bold">Class Program</th>
                        <th className="p-3 font-bold">Instructor</th>
                        <th className="p-3 font-bold">Date & Slot</th>
                        <th className="p-3 font-bold">Payment</th>
                        <th className="p-3 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6EBE8]">
                      {bookings?.map((b) => (
                        <tr key={b.id}>
                          <td className="p-3 font-mono font-bold">{b.id}</td>
                          <td className="p-3">
                            <span className="font-bold block">{b.userName}</span>
                            <span className="text-[10px] text-[#6B857B]">{b.userEmail}</span>
                          </td>
                          <td className="p-3 font-medium">{b.serviceName}</td>
                          <td className="p-3">{b.trainerName}</td>
                          <td className="p-3">{b.date} ({b.timeSlot})</td>
                          <td className="p-3 font-bold">{formatPrice(b.amountINR)} ({b.paymentMethod})</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-[10px] font-bold">
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

            {/* TAB: SERVICES MANAGER */}
            {adminTab === 'services' && (
              <div className="space-y-6">
                <form onSubmit={handleCreateService} className="p-6 bg-white text-[#2C3B34] rounded-3xl border border-[#D5E2DC] space-y-4">
                  <h3 className="font-serif-luxury text-lg font-bold text-[#1B3B36]">Create New Class Program</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <input
                      type="text"
                      placeholder="Program Title (e.g. Kundalini Awakening)"
                      value={newServiceTitle}
                      onChange={(e) => setNewServiceTitle(e.target.value)}
                      className="border p-3 rounded-xl focus:outline-none"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Price in INR (₹)"
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(Number(e.target.value))}
                      className="border p-3 rounded-xl focus:outline-none"
                      required
                    />
                  </div>
                  <textarea
                    placeholder="Program description..."
                    value={newServiceDesc}
                    onChange={(e) => setNewServiceDesc(e.target.value)}
                    className="w-full border p-3 rounded-xl text-xs h-20 resize-none focus:outline-none"
                  />
                  <button type="submit" className="bg-[#1B3B36] text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer">
                    Add Class Offering
                  </button>
                </form>

                <div className="p-6 bg-white text-[#2C3B34] rounded-3xl border border-[#D5E2DC] space-y-3">
                  <h3 className="font-serif-luxury text-lg font-bold text-[#1B3B36]">Existing Active Offerings</h3>
                  <div className="space-y-2">
                    {services?.map((srv) => (
                      <div key={srv.id} className="p-3 bg-[#FAF9F5] border rounded-2xl flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-[#1B3B36]">{srv.title}</span>
                          <span className="text-[#6B857B] ml-2">• {formatPrice(srv.priceINR)}</span>
                        </div>
                        <button
                          onClick={() => deleteService(srv.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: TRAINERS */}
            {adminTab === 'trainers' && (
              <div className="space-y-6">
                <form onSubmit={handleCreateTrainer} className="p-6 bg-white text-[#2C3B34] rounded-3xl border border-[#D5E2DC] space-y-4">
                  <h3 className="font-serif-luxury text-lg font-bold text-[#1B3B36]">Add Master Instructor</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <input
                      type="text"
                      placeholder="Trainer Full Name"
                      value={newTrainerName}
                      onChange={(e) => setNewTrainerName(e.target.value)}
                      className="border p-3 rounded-xl"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Role (e.g. Ashtanga Master)"
                      value={newTrainerRole}
                      onChange={(e) => setNewTrainerRole(e.target.value)}
                      className="border p-3 rounded-xl"
                    />
                  </div>
                  <textarea
                    placeholder="Short biography..."
                    value={newTrainerBio}
                    onChange={(e) => setNewTrainerBio(e.target.value)}
                    className="w-full border p-3 rounded-xl text-xs h-20 resize-none"
                  />
                  <button type="submit" className="bg-[#1B3B36] text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer">
                    Add Instructor
                  </button>
                </form>

                <div className="p-6 bg-white text-[#2C3B34] rounded-3xl border border-[#D5E2DC] space-y-3">
                  <h3 className="font-serif-luxury text-lg font-bold text-[#1B3B36]">Instructor Roster</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {trainers?.map((tr) => (
                      <div key={tr.id} className="p-3 bg-[#FAF9F5] border rounded-2xl flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img src={tr.image} alt={tr.name} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className="font-bold text-[#1B3B36]">{tr.name}</p>
                            <p className="text-[10px] text-[#6B857B]">{tr.role}</p>
                          </div>
                        </div>
                        <button onClick={() => deleteTrainer(tr.id)} className="text-red-600 p-1 cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: COUPONS */}
            {adminTab === 'coupons' && (
              <div className="space-y-6">
                <form onSubmit={handleCreateCoupon} className="p-6 bg-white text-[#2C3B34] rounded-3xl border border-[#D5E2DC] space-y-4">
                  <h3 className="font-serif-luxury text-lg font-bold text-[#1B3B36]">Generate Discount Coupon</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. PEACE25)"
                      value={newCouponCode}
                      onChange={(e) => setNewCouponCode(e.target.value)}
                      className="border p-3 rounded-xl uppercase font-semibold"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Discount % (e.g. 20)"
                      value={newCouponDiscount}
                      onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                      className="border p-3 rounded-xl"
                      required
                    />
                  </div>
                  <button type="submit" className="bg-[#1B3B36] text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer">
                    Create Coupon
                  </button>
                </form>

                <div className="p-6 bg-white text-[#2C3B34] rounded-3xl border border-[#D5E2DC] space-y-3">
                  <h3 className="font-serif-luxury text-lg font-bold text-[#1B3B36]">Active Coupon Codes</h3>
                  <div className="space-y-2">
                    {coupons?.map((c) => (
                      <div key={c.id} className="p-3 bg-[#FAF9F5] border rounded-2xl flex items-center justify-between text-xs">
                        <span className="font-bold font-mono text-[#1B3B36]">{c.code}</span>
                        <span className="text-[#6B857B]">{c.discountPercentage}% OFF • Used {c.usageCount} times</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: BROADCAST */}
            {adminTab === 'broadcast' && (
              <form onSubmit={handleSendBroadcast} className="p-6 bg-white text-[#2C3B34] rounded-3xl border border-[#D5E2DC] space-y-4">
                <h3 className="font-serif-luxury text-lg font-bold text-[#1B3B36]">Broadcast Notification to All Members</h3>
                <textarea
                  placeholder="Enter message to broadcast to all 324 active studio members via App & WhatsApp..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  className="w-full border p-3 rounded-2xl text-xs h-32 resize-none focus:outline-none"
                  required
                />
                <button type="submit" className="bg-[#1B3B36] text-white px-6 py-3 rounded-2xl text-xs font-bold cursor-pointer shadow-md flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#E2C085]" />
                  <span>Send Studio Broadcast</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
