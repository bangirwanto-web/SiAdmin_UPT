import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Droplet, Lock, Mail, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';
import { User, ProfileSettings } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  users: User[];
  profile: ProfileSettings;
}

export default function Login({ onLogin, users, profile }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'admin' | 'user'>('admin');

  // Fast demo account login
  const handleDemoLogin = (role: 'admin' | 'user') => {
    const targetEmail = role === 'admin' ? 'admin@bahbolon.go.id' : 'user@bahbolon.go.id';
    const foundUser = users.find(u => u.email === targetEmail);
    if (foundUser) {
      if (foundUser.status === 'nonaktif') {
        setError('Akun ini sedang dinonaktifkan oleh administrator.');
        return;
      }
      onLogin(foundUser);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }

    // Standard credential checking
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      if (foundUser.status === 'nonaktif') {
        setError('Akun ini sedang dinonaktifkan oleh administrator.');
        return;
      }
      // Demo password is any or the prefix
      onLogin(foundUser);
    } else {
      setError('Kredensial salah atau akun tidak terdaftar.');
    }
  };

  return (
    <div id="login-container" className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden font-sans">
      {/* Dynamic Water Wave decorative backdrops */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg className="absolute bottom-0 w-full h-64 text-sky-500 fill-current" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,112C960,96,1056,128,1152,144C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
        <svg className="absolute bottom-10 w-full h-48 text-indigo-400 fill-current opacity-70" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,192L60,186.7C120,181,240,171,360,181.3C480,192,600,224,720,224C840,224,960,192,1080,181.3C1200,171,1320,181,1380,186.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-slate-100 z-10"
      >
        {/* Header Logo */}
        <div className="flex flex-col items-center mb-6">
          {profile.logoUrl ? (
            <img 
              referrerPolicy="no-referrer"
              src={profile.logoUrl} 
              alt="Logo Instansi" 
              className="w-16 h-16 rounded-2xl object-cover bg-white p-1 shadow-md mb-3 transition-transform hover:scale-105 border border-slate-100 shrink-0"
            />
          ) : (
            <div className={`p-4 rounded-full ${profile.logoTheme || 'bg-indigo-600'} text-white shadow-md mb-3 transition-colors duration-300`}>
              <Droplet className="w-8 h-8 animate-pulse text-sky-200 fill-sky-200" />
            </div>
          )}
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center mb-1">
            Sistem Informasi Administrasi (SIA)
          </h2>
          <h1 className="text-xl font-extrabold text-slate-800 text-center leading-tight">
            {profile.shortName}
          </h1>
          <p className="text-xs text-slate-500 text-center mt-2 px-4 max-w-xs">
            Dinas Sumber Daya Air, Cipta Karya dan Tata Ruang Provinsi Sumatera Utara
          </p>
        </div>

        {/* Tab Selector for Demo Access */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            id="tab-admin"
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'admin' 
                ? 'bg-white text-slate-800 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => {
              setActiveTab('admin');
              setEmail('admin@bahbolon.go.id');
            }}
          >
            Akses Administrator
          </button>
          <button
            type="button"
            id="tab-user"
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'user' 
                ? 'bg-white text-slate-800 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => {
              setActiveTab('user');
              setEmail('user@bahbolon.go.id');
            }}
          >
            Akses Staf / User
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-lg flex items-start gap-2.5 mb-5 text-sm">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Standard Login Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1.5">Alamat Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                id="login-email"
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                placeholder="nama@bahbolon.go.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-600 uppercase">Kata Sandi</label>
              <span className="text-[11px] text-slate-400">Demo: Bebas masukkan apa saja</span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                id="login-password"
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            id="btn-login-submit"
            className="w-full py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition"
          >
            Masuk ke Sistem
          </button>
        </form>

        {/* Demo Fast Sandbox Login */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-[11px] font-bold text-center text-slate-400 uppercase tracking-widest mb-3">
            Sandbox Demo Mode
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin('admin')}
              id="quick-login-admin"
              className="flex items-center justify-between px-3 py-2 border border-violet-100 bg-violet-50/50 hover:bg-violet-50 rounded-xl text-left transition"
            >
              <div>
                <p className="text-xs font-semibold text-slate-700">Masuk Instan</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
                  <span className="text-[10px] font-medium text-violet-700 uppercase">Admin</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-violet-400" />
            </button>

            <button
              onClick={() => handleDemoLogin('user')}
              id="quick-login-user"
              className="flex items-center justify-between px-3 py-2 border border-sky-100 bg-sky-50/50 hover:bg-sky-50 rounded-xl text-left transition"
            >
              <div>
                <p className="text-xs font-semibold text-slate-700">Masuk Instan</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                  <span className="text-[10px] font-medium text-sky-700 uppercase">Staf</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </button>
          </div>
        </div>

        {/* Footer info in login */}
        <div className="mt-6 text-center text-[10px] text-slate-400">
          SIA-PSA v1.0.0 Template Admin &bull; Silakan modifikasi sesuai kebutuhan
        </div>
      </motion.div>
    </div>
  );
}
