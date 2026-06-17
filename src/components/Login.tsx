import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Droplet, Lock, Mail, ShieldAlert, ArrowRight, ShieldCheck, 
  Activity, MapPin, Sparkles, Sliders, LogIn, Waves, 
  Layers, ChevronRight, HelpCircle, FileText, Database, CheckCircle
} from 'lucide-react';
import { User, ProfileSettings } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  users: User[];
  profile: ProfileSettings;
}

export default function Login({ onLogin, users, profile }: LoginProps) {
  const [email, setEmail] = useState('admin@bahbolon.go.id');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'admin' | 'user'>('admin');
  
  // Interactive logo dimension adjustment (in pixels)
  const [logoSize, setLogoSize] = useState<number>(72); 

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
      onLogin(foundUser);
    } else {
      setError('Kredensial salah atau akun tidak terdaftar.');
    }
  };

  // Features list for landing section
  const landingFeatures = [
    {
      icon: <Activity className="w-5 h-5 text-sky-500" />,
      title: "Telemetri Debit Air Real-Time",
      desc: "Pemantauan tinggi muka air sungai & debit limpasan saluran primer secara presisi."
    },
    {
      icon: <Layers className="w-5 h-5 text-indigo-500" />,
      title: "Manajemen Jaringan Irigasi",
      desc: "Inventarisasi weir/bendung, pintu air, dan pemetaan daerah irigasi terintegrasi."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-emerald-500" />,
      title: "Berita Acara Pembayaran (BAPP)",
      desc: "Dokumentasi mobile-camera langsung dari lapangan untuk laporan konstruksi fisik."
    },
    {
      icon: <Database className="w-5 h-5 text-amber-500" />,
      title: "Penatausahaan Keuangan DIPA",
      desc: "Rekapitulasi anggaran per kode rekening belanja, kas ledger, dan pelaporan SPJ."
    }
  ];

  return (
    <div id="login-landing-container" className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* Decorative gradient waves */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-gradient-to-bl from-sky-200/30 to-indigo-200/10 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-gradient-to-tr from-indigo-100/40 to-emerald-100/10 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Global Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 shadow-3xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Branding Area */}
          <div className="flex items-center gap-3.5">
            <div className="bg-slate-100 rounded-xl p-1 shrink-0 flex items-center justify-center border border-slate-200/50">
              {profile.logoUrl ? (
                <img 
                  referrerPolicy="no-referrer"
                  src={profile.logoUrl} 
                  alt="Logo Instansi" 
                  style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
                  className="rounded-lg object-cover bg-white p-0.5 shadow-2xs transition-all duration-300"
                />
              ) : (
                <div 
                  style={{ width: `${logoSize}px`, height: `${logoSize}px` }}
                  className={`rounded-lg ${profile.logoTheme || 'bg-slate-900'} text-white shadow-2xs flex items-center justify-center transition-all duration-300`}
                >
                  <Droplet className="w-1/2 h-1/2 text-sky-200 fill-sky-200" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="bg-sky-50 text-sky-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider border border-sky-100">
                  SUMUT PROV
                </span>
                <span className="text-slate-400 text-xs font-semibold">SIA v1.0.0</span>
              </div>
              <h1 className="text-base font-black text-slate-900 leading-tight">
                {profile.shortName}
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">
                Sistem Informasi Administrasi Pengelolaan Sumber Daya Air
              </p>
            </div>
          </div>

          {/* Interactive Logo Size Slider Container */}
          <div className="flex items-center gap-6">
            {/* Live Size Adjuster */}
            <div className="bg-slate-50 border border-slate-200/70 p-2.5 rounded-xl flex items-center gap-2.5">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest shrink-0">Ukuran Logo:</span>
              <input 
                type="range" 
                min={36} 
                max={110} 
                value={logoSize}
                onChange={(e) => setLogoSize(Number(e.target.value))}
                className="w-24 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-800"
                title="Sesuaikan ukuran logo sesuai kebutuhan"
              />
              <span className="text-[10px] font-mono font-bold text-slate-600 bg-white border border-slate-150 px-1.5 py-0.5 rounded-md shadow-2xs">
                {logoSize}px
              </span>
            </div>

            <a 
              href="#login-form-section" 
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition duration-150 shadow-xs"
            >
              Masuk Aplikasi
            </a>
          </div>
        </div>
      </header>

      {/* Main Container - Hero / Intro & Login Split */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left column: Landing Information & Dynamic Agency Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 rounded-full text-indigo-700 font-extrabold text-[10px] uppercase tracking-wider shadow-2xs">
            <Waves className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
            <span>Digitalisasi Pengairan Provinsi Sumatera Utara</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Selamat Datang di Portal Terintegrasi <span className="bg-gradient-to-r from-indigo-700 to-sky-650 bg-clip-text text-transparent">SIA PSA Bah Bolon</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
              Sistem backend administrasi, penatausahaan keuangan daerah irigasi, data debit juru pengairan, pemeliharaan aset, dan pelaporan fisik konstruksi UPTD Pengelolaan Sumber Daya Air Bah Bolon.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4 border-y border-slate-200/80 py-5">
            <div className="bg-white/60 p-3 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Daerah Irigasi</p>
              <h4 className="text-2xl font-black text-slate-850 mt-0.5">5 Wilayah</h4>
              <p className="text-[9px] text-slate-500 mt-1">Mengairi sawah di Simalungun & Asahan</p>
            </div>
            <div className="bg-white/60 p-3 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pos Duga Air</p>
              <h4 className="text-2xl font-black text-slate-850 mt-0.5">12 Titik</h4>
              <p className="text-[9px] text-slate-500 mt-1">Debit sungai terpantau berkala</p>
            </div>
            <div className="bg-white/60 p-3 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inventarisasi DI</p>
              <h4 className="text-2xl font-black text-indigo-700 mt-0.5">100% Digital</h4>
              <p className="text-[9px] text-slate-500 mt-1 font-semibold">Tercatat di kas & aset</p>
            </div>
          </div>

          {/* Key Features Block */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
              Layanan Utama Sistem (Core Modules)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {landingFeatures.map((f, i) => (
                <div key={i} className="flex gap-3 bg-white p-4 rounded-xl border border-slate-150/50 shadow-3xs hover:border-indigo-200 transition duration-200">
                  <div className="p-2 bg-slate-50 rounded-lg text-indigo-600 shrink-0 h-9 w-9 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{f.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Dynamic Login Card & Sandbox Selectors */}
        <div id="login-form-section" className="lg:col-span-5">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 ring-1 ring-slate-900/5 relative"
          >
            {/* Login form header */}
            <div className="mb-6">
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1 shadow-2xs py-0.5 px-2 bg-indigo-50/50 rounded-md inline-block">
                SIA SECURE PORTAL
              </p>
              <h3 className="text-lg font-black text-slate-900">Sign In to Dashboard</h3>
              <p className="text-xs text-slate-500 mt-1">Ketik email & password terdaftar untuk memproses otorisasi tugas kedinasan.</p>
            </div>

            {/* Error messaging */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl flex items-start gap-2.5 mb-5 text-xs animate-pulse-slow">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span className="font-semibold">{error}</span>
              </div>
            )}

            {/* Tab Selector for Quick Demo */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-5">
              <button
                type="button"
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'admin' 
                    ? 'bg-white text-slate-950 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                onClick={() => {
                  setActiveTab('admin');
                  setEmail('admin@bahbolon.go.id');
                }}
              >
                Kepala UPTD (Admin)
              </button>
              <button
                type="button"
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'user' 
                    ? 'bg-white text-slate-950 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                onClick={() => {
                  setActiveTab('user');
                  setEmail('user@bahbolon.go.id');
                }}
              >
                Staf Lapangan (User)
              </button>
            </div>

            {/* Credential input form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Surel Dinas / Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-xs font-medium text-slate-755"
                    placeholder="nama@bahbolon.go.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest">Sandi / Password</label>
                  <span className="text-[10px] text-slate-400 font-medium italic">Katake bebas (Demo)</span>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    required
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 text-xs text-slate-755"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                id="btn-login-submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition duration-150 flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Autentikasi & Masuk</span>
              </button>
            </form>

            {/* Sandbox Direct Actions */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center mb-3">
                Sandbox Instant Quick Access
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleDemoLogin('admin')}
                  className="flex items-center justify-between p-2.5 border border-indigo-50 hover:border-indigo-100 bg-indigo-50/20 hover:bg-indigo-50/50 rounded-xl text-left transition"
                >
                  <div>
                    <p className="text-[10px] font-black text-indigo-700 uppercase tracking-wide">Administrator</p>
                    <span className="text-[9px] text-slate-500 font-medium">Akses Penuh SIA</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0" />
                </button>

                <button
                  onClick={() => handleDemoLogin('user')}
                  className="flex items-center justify-between p-2.5 border border-sky-50 hover:border-sky-100 bg-sky-50/20 hover:bg-sky-50/50 rounded-xl text-left transition"
                >
                  <div>
                    <p className="text-[10px] font-black text-sky-700 uppercase tracking-wide">Staf Operasional</p>
                    <span className="text-[9px] text-slate-500 font-medium">Update Data & BAPP</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-sky-400 shrink-0" />
                </button>
              </div>
            </div>

            {/* Legal Notice */}
            <div className="mt-4 text-[9px] text-slate-400 text-center font-medium">
              SIA-SDA Bah Bolon membatasi hak akses selain aparatur berwenang. Log audit dicatat secara berkala.
            </div>
          </motion.div>
        </div>
      </main>

      {/* About Section details below the fold */}
      <section className="bg-slate-100/50 border-t border-slate-200/50 py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="max-w-xl">
            <h3 className="text-xl font-black text-slate-900">Alur Pengelolaan Sumber Daya Air & Administrasi</h3>
            <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
              Teknologi pencatatan informasi membantu seksi operasional pemeliharaan & seksi pembangunan irigasi dalam mengawasi kualitas serta efektivitas DIPA APBD Provinsi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-150/40 shadow-3xs space-y-2">
              <div className="h-2 w-12 bg-sky-500 rounded-full" />
              <h4 className="font-bold text-slate-900 text-xs">1. Monitoring & Rekristalilasi</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Juru pengairan menginput data debit bendung harian, kondisi saluran hara, dan mencatatkan kebutuhan mendesak bagi petani lokal.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-150/40 shadow-3xs space-y-2">
              <div className="h-2 w-12 bg-indigo-500 rounded-full" />
              <h4 className="font-bold text-slate-900 text-xs">2. Pekerjaan Fisik & Foto</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Pencatatan realisasi konstruksi pemeliharaan irigasi, divalidasi dengan lampiran foto on-site langsung sebelum Berita Acara (BAPP-SPK) dinegosiasikan.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-150/40 shadow-3xs space-y-2">
              <div className="h-2 w-12 bg-amber-500 rounded-full" />
              <h4 className="font-bold text-slate-900 text-xs">3. Verifikasi & SPJ Kas</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Bendahara memverifikasi SPJ belanja operasional rutin, mengawasi ketersediaan saldo DIPA kas umum dinas per kuitansi digital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright Footer */}
      <footer className="bg-white border-t border-slate-100 py-6 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-medium">
          <div className="text-left">
            <p className="font-bold text-slate-955">{profile.instansiName}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{profile.address || '-'}</p>
          </div>
          <div>
            <p className="text-right text-[10px] text-slate-400">{profile.copyrightText}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
