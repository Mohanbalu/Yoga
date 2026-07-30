import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Menu,
  X,
  User,
  Calendar,
  LogOut,
  Shield,
  ChevronDown,
  Globe,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    userRole,
    setUserRole,
    logoutUser,
    currency,
    setCurrency,
    openBookingModal
  } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Plans', path: '/plans' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Bar Role & Currency Switcher Banner (for demonstration & quick review) */}
      <div className="bg-[#1B2621] text-[#E0ECE8] py-1.5 px-4 text-xs font-medium border-b border-[#2C3B34] flex items-center justify-between z-50 relative">
        <div className="flex items-center space-[#12] gap-3 mx-auto md:mx-0">
          <span className="flex items-center gap-1.5 text-[#A2C7B9]">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden sm:inline">Experience Luxury Mindful Living</span>
          </span>
          <span className="text-white/30 hidden sm:inline">|</span>
          <span className="text-white/80">Rishikesh Certified Masters</span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {/* Currency Toggle */}
          <button
            onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
            className="flex items-center gap-1 hover:text-[#D4AF37] transition-colors cursor-pointer"
            title="Toggle Currency Display"
          >
            <Globe className="w-3.5 h-3.5 text-[#88B09F]" />
            <span>{currency} ({currency === 'INR' ? '₹' : '$'})</span>
          </button>

          <span className="text-white/30">|</span>

          {/* Quick Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-1.5 bg-[#2A3A33] hover:bg-[#34483F] px-2.5 py-1 rounded-full transition-colors cursor-pointer text-[#CBE3D9]"
            >
              <Shield className="w-3 h-3 text-[#E2C085]" />
              <span className="capitalize font-semibold">{userRole} View</span>
              <ChevronDown className="w-3 h-3 text-white/60" />
            </button>

            <AnimatePresence>
              {roleDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute right-0 mt-2 w-48 bg-[#1B2621] border border-[#34483F] rounded-xl shadow-2xl overflow-hidden z-50 text-white"
                >
                  <div className="p-2 text-[10px] text-white/50 uppercase tracking-wider font-semibold border-b border-[#2C3B34]">
                    Switch App View
                  </div>
                  <button
                    onClick={() => {
                      setUserRole('guest');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-[#2A3A33] transition-colors flex items-center justify-between ${
                      userRole === 'guest' ? 'text-[#D4AF37] font-semibold' : 'text-white/80'
                    }`}
                  >
                    <span>Guest User</span>
                    {userRole === 'guest' && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>}
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('user');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-[#2A3A33] transition-colors flex items-center justify-between ${
                      userRole === 'user' ? 'text-[#D4AF37] font-semibold' : 'text-white/80'
                    }`}
                  >
                    <span>Member (Aarav)</span>
                    {userRole === 'user' && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>}
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('admin');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-[#2A3A33] transition-colors flex items-center justify-between ${
                      userRole === 'admin' ? 'text-[#D4AF37] font-semibold' : 'text-white/80'
                    }`}
                  >
                    <span>Admin Director</span>
                    {userRole === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF9F5]/90 backdrop-blur-md shadow-sm py-3 border-b border-[#E6EBE8]'
            : 'bg-[#FAF9F5]/70 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1B3B36] to-[#2C524B] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <span className="font-serif-luxury text-xl font-bold italic tracking-tighter text-[#E2C085]">
                  S
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-luxury text-2xl font-bold tracking-tight text-[#1B3B36] group-hover:text-[#2C524B] transition-colors">
                  Sattva
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#6B857B] font-medium uppercase -mt-1">
                  Luxury Yoga
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-all relative py-1 ${
                    isActive(link.path)
                      ? 'text-[#1B3B36] font-semibold'
                      : 'text-[#52635B] hover:text-[#1B3B36]'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1B3B36] rounded-full"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              {userRole === 'admin' ? (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 bg-[#1B2621] text-[#E2C085] px-4 py-2.5 rounded-full text-xs font-semibold hover:bg-[#2A3A33] transition-all shadow-sm"
                >
                  <Shield className="w-4 h-4 text-[#E2C085]" />
                  Admin Console
                </Link>
              ) : currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2.5 bg-white border border-[#D5E2DC] hover:border-[#88B09F] p-1.5 pr-3 rounded-full transition-all cursor-pointer shadow-xs"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#C5D9CE]"
                    />
                    <div className="text-left">
                      <p className="text-xs font-semibold text-[#1B3B36] leading-tight">
                        {currentUser.name}
                      </p>
                      <p className="text-[10px] text-[#6B857B] font-medium">
                        {currentUser.membershipPlan || 'Member'}
                      </p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-[#6B857B] ml-1" />
                  </button>

                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute right-0 mt-2 w-56 bg-white border border-[#E0ECE8] rounded-2xl shadow-xl overflow-hidden z-50"
                      >
                        <div className="p-4 bg-[#F4F8F6] border-b border-[#E0ECE8]">
                          <p className="text-xs font-semibold text-[#1B3B36]">{currentUser.name}</p>
                          <p className="text-[11px] text-[#6B857B] truncate">{currentUser.email}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 bg-[#E2ECE9] text-[#1B3B36] text-[10px] font-semibold rounded-full">
                            Status: Active
                          </span>
                        </div>

                        <div className="p-2">
                          <Link
                            to="/dashboard"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#2C3B34] hover:bg-[#F4F8F6] rounded-xl transition-colors font-medium"
                          >
                            <User className="w-4 h-4 text-[#43685B]" />
                            User Dashboard
                          </Link>
                          <Link
                            to="/book"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#2C3B34] hover:bg-[#F4F8F6] rounded-xl transition-colors font-medium"
                          >
                            <Calendar className="w-4 h-4 text-[#43685B]" />
                            Book Session
                          </Link>
                          <button
                            onClick={() => {
                              setUserDropdownOpen(false);
                              logoutUser();
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium cursor-pointer"
                          >
                            <LogOut className="w-4 h-4 text-red-500" />
                            Log Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-xs font-semibold text-[#1B3B36] hover:text-[#2C524B] px-3 py-2 transition-colors"
                >
                  Log In
                </Link>
              )}

              {/* Book Now Primary Button */}
              <button
                onClick={() => {
                  if (location.pathname === '/book') {
                    openBookingModal();
                  } else {
                    navigate('/book');
                  }
                }}
                className="flex items-center gap-2 bg-[#1B3B36] text-white px-5 py-2.5 rounded-full text-xs font-semibold hover:bg-[#2C524B] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile Hamburger Trigger */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setCurrency(currency === 'INR' ? 'USD' : 'INR')}
                className="text-xs font-semibold bg-[#E2ECE9] text-[#1B3B36] px-2.5 py-1 rounded-full"
              >
                {currency}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#1B3B36] hover:bg-[#E2ECE9] rounded-full transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FAF9F5] border-b border-[#E6EBE8] px-6 py-6 shadow-xl z-30 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium py-2 border-b border-[#EBF2EE] ${
                    isActive(link.path)
                      ? 'text-[#1B3B36] font-bold pl-2 border-l-2 border-[#1B3B36]'
                      : 'text-[#4A5D55]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2 flex flex-col gap-3">
                {currentUser ? (
                  <>
                    <Link
                      to={userRole === 'admin' ? '/admin' : '/dashboard'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center gap-2 bg-[#E2ECE9] text-[#1B3B36] py-3 rounded-xl text-sm font-semibold"
                    >
                      <User className="w-4 h-4" />
                      {userRole === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logoutUser();
                      }}
                      className="text-sm font-medium text-red-600 py-1"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center bg-[#E2ECE9] text-[#1B3B36] py-3 rounded-xl text-sm font-semibold"
                  >
                    Log In / Sign Up
                  </Link>
                )}

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/book');
                  }}
                  className="bg-[#1B3B36] text-white py-3.5 rounded-xl text-sm font-semibold shadow-md flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Book Class Session
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
