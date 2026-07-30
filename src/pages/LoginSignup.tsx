import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Lock,
  Mail,
  User,
  ShieldCheck,
  CheckCircle2,
  Camera,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

export const LoginSignup: React.FC = () => {
  const { loginUser, showToast } = useApp();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('aarav@yogyatra_shreya.com');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Aarav Mehta');
  const [rememberMe, setRememberMe] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400');

  // Simulated Email verification banner
  const [verificationSent, setVerificationSent] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email', 'error');
      return;
    }
    loginUser(email, name || 'Aarav Mehta', email.includes('admin') ? 'admin' : 'user');
    navigate('/dashboard');
  };

  const handleGoogleAuth = () => {
    showToast('Connecting with Google OAuth 2.0...', 'info');
    setTimeout(() => {
      loginUser('aarav.google@gmail.com', 'Aarav Mehta', 'user');
      navigate('/dashboard');
    }, 1200);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationSent(true);
    showToast('Verification email link sent to ' + email, 'success');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Password reset link sent to ' + email, 'success');
    setMode('login');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#D5E2DC] shadow-xl space-y-6 relative overflow-hidden"
      >
        {/* Top Branding Header */}
        <div className="text-center space-y-2">
          <img
            src="https://i.ibb.co/RkBVMMCm/logo.png"
            alt="yogyatra_shreya Logo"
            className="w-12 h-12 object-contain rounded-full bg-[#1B3B36] p-1 mx-auto shadow-md border border-[#E2C085]/30"
          />
          <h2 className="font-serif-luxury text-2xl font-bold text-[#1B3B36]">
            {mode === 'login' && 'Welcome Back to yogyatra_shreya'}
            {mode === 'signup' && 'Create Your yogyatra_shreya Account'}
            {mode === 'forgot' && 'Reset Your Password'}
          </h2>
          <p className="text-xs text-[#6B857B]">
            {mode === 'login' && 'Log in to manage bookings, view invoices, and track workouts.'}
            {mode === 'signup' && 'Join 1,200+ mindful practitioners today.'}
            {mode === 'forgot' && 'Enter your registered email address.'}
          </p>
        </div>

        {/* Verification banner simulation */}
        {verificationSent && (
          <div className="p-4 bg-green-50 border border-green-200 text-green-900 rounded-2xl text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="w-4 h-4 text-green-600" /> Verification Email Sent!
            </div>
            <p className="text-[11px] text-green-700">
              Please check your inbox at <strong className="underline">{email}</strong> and click the link to finalize setup.
            </p>
          </div>
        )}

        {/* Google Auth Button */}
        {mode !== 'forgot' && (
          <div className="space-y-4">
            <button
              onClick={handleGoogleAuth}
              type="button"
              className="w-full bg-[#FAF9F5] hover:bg-[#E2ECE9] border border-[#D5E2DC] text-[#1B3B36] py-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-3 transition-colors cursor-pointer shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#E6EBE8] w-full" />
              <span className="bg-white px-3 text-[10px] font-bold text-[#88B09F] uppercase">or with email</span>
            </div>
          </div>
        )}

        {/* FORMS */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#1B3B36] uppercase mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
                  required
                />
                <Mail className="w-4 h-4 text-[#88B09F] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold text-[#1B3B36] uppercase">Password</label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-[11px] text-[#1B3B36] hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
                  required
                />
                <Lock className="w-4 h-4 text-[#88B09F] absolute left-3 top-3" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#52635B]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#1B3B36]"
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1B3B36] text-white py-3.5 rounded-2xl text-xs font-bold hover:bg-[#2C524B] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <span>Log In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-xs text-[#6B857B] pt-2">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="font-bold text-[#1B3B36] hover:underline cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          </form>
        )}

        {mode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="text-center">
              <div className="relative inline-block">
                <img src={avatarPreview} alt="Avatar" className="w-16 h-16 rounded-full object-cover border-2 border-[#1B3B36]" />
                <button
                  type="button"
                  onClick={() => showToast('Avatar upload simulated', 'info')}
                  className="absolute bottom-0 right-0 p-1 bg-[#1B3B36] text-white rounded-full text-[10px]"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#1B3B36] uppercase mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl px-3 py-2.5 text-xs text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#1B3B36] uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl px-3 py-2.5 text-xs text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#1B3B36] uppercase mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl px-3 py-2.5 text-xs text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1B3B36] text-white py-3.5 rounded-2xl text-xs font-bold hover:bg-[#2C524B] transition-all cursor-pointer shadow-md"
            >
              Create Account & Verify
            </button>

            <p className="text-center text-xs text-[#6B857B] pt-2">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-[#1B3B36] hover:underline cursor-pointer"
              >
                Log In
              </button>
            </p>
          </form>
        )}

        {mode === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#1B3B36] uppercase mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-[#D5E2DC] rounded-xl px-3 py-2.5 text-xs text-[#1B3B36] focus:outline-none focus:border-[#1B3B36]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1B3B36] text-white py-3.5 rounded-2xl text-xs font-bold hover:bg-[#2C524B] transition-all cursor-pointer shadow-md"
            >
              Send Reset Instructions
            </button>

            <p className="text-center text-xs text-[#6B857B]">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-[#1B3B36] hover:underline cursor-pointer"
              >
                Back to Login
              </button>
            </p>
          </form>
        )}
      </motion.div>
    </div>
  );
};
