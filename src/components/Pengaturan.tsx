import React, { useState } from 'react';
import { 
  Settings, 
  Building2, 
  Users, 
  Copyright, 
  MapPin, 
  Phone, 
  Mail, 
  Plus, 
  ShieldAlert, 
  UserPlus, 
  CheckCircle, 
  Lock, 
  ShieldCheck,
  Droplet,
  UploadCloud,
  Trash2,
  Image
} from 'lucide-react';
import { User, ProfileSettings } from '../types';

interface PengaturanProps {
  currentUser: User;
  profile: ProfileSettings;
  setProfile: (profile: ProfileSettings) => void;
  users: User[];
  setUsers: (users: User[]) => void;
}

export default function Pengaturan({ 
  currentUser, 
  profile, 
  setProfile, 
  users, 
  setUsers 
}: PengaturanProps) {

  // Inner sub-tabs
  const [activeSubTab, setActiveSubTab] = useState<'profil' | 'users' | 'footer'>('profil');

  // Success state alert
  const [successMsg, setSuccessMsg] = useState('');

  // Form profile states
  const [instansiName, setInstansiName] = useState(profile.instansiName);
  const [shortName, setShortName] = useState(profile.shortName);
  const [address, setAddress] = useState(profile.address);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [logoTheme, setLogoTheme] = useState(profile.logoTheme);
  const [logoUrl, setLogoUrl] = useState(profile.logoUrl || '');
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Form footer / copyright state
  const [footerText, setFooterText] = useState(profile.footerText);
  const [copyrightText, setCopyrightText] = useState(profile.copyrightText);

  // User management form state
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'user'>('user');
  const [newUserDept, setNewUserDept] = useState('');

  // Toggle user status active/inactive
  const handleToggleUserStatus = (id: string) => {
    // Prevent self-deactivation
    if (id === currentUser.id) {
      alert('Anda tidak bisa menonaktifkan akun Anda sendiri.');
      return;
    }

    setUsers(users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'aktif' ? 'nonaktif' : 'aktif';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
    triggerSuccess('Status pengguna berhasil diubah.');
  };

  // Add new User handler
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    // Email collision check
    if (users.some(u => u.email.toLowerCase() === newUserEmail.toLowerCase())) {
      alert('Email sudah terdaftar untuk pengguna lain.');
      return;
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'aktif',
      department: newUserDept || 'Staf Tata Usaha UPTD',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120&h=120' // standard fresh avatar
    };

    setUsers([...users, newUser]);
    setIsAddingUser(false);
    
    // Clear forms
    setNewUserName('');
    setNewUserEmail('');
    setNewUserRole('user');
    setNewUserDept('');

    triggerSuccess('Pengguna baru berhasil diregistrasikan.');
  };

  const handleDeleteUser = (id: string) => {
    if (id === currentUser.id) {
      alert('Anda tidak dapat menghapus akun Anda sendiri.');
      return;
    }
    if (confirm('Apakah Anda yakin ingin menghapus user ini secara permanen?')) {
      setUsers(users.filter(u => u.id !== id));
      triggerSuccess('Pengguna berhasil dihapus.');
    }
  };

  // Logo upload processing
  const processFile = (file: File) => {
    setUploadError('');
    if (!file.type.startsWith('image/')) {
      setUploadError('Tipe berkas harus berupa gambar (PNG, JPG, JPEG, GIF, SVG).');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Ukuran gambar maksimal adalah 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result && typeof event.target.result === 'string') {
        setLogoUrl(event.target.result);
      }
    };
    reader.onerror = () => {
      setUploadError('Gagal membaca fail gambar.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoUrl('');
    setUploadError('');
  };

  // Profile submit handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      ...profile,
      instansiName,
      shortName,
      address,
      phone,
      email,
      logoTheme,
      logoUrl: logoUrl || undefined
    });
    triggerSuccess('Profil instansi berhasil diperbaharui.');
  };

  // Footer submit handler
  const handleSaveFooter = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({
      ...profile,
      footerText,
      copyrightText
    });
    triggerSuccess('Catatan kaki dan hak cipta berhasil disimpan.');
  };

  const triggerSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Restricted Access check (template restriction verification)
  const isAuthorized = currentUser.role === 'admin';

  if (!isAuthorized) {
    return (
      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-8 text-center max-w-2xl mx-auto my-12 space-y-4">
        <ShieldAlert className="w-16 h-16 text-rose-500 mx-auto animate-bounce" />
        <h2 className="text-lg font-black text-rose-900 uppercase">Akses Terbatas</h2>
        <p className="text-sm text-rose-700 leading-relaxed">
          Maaf, halaman ini berisi konfigurasi administratif sensitif seperti profil instansi, manajemen hak cipta, dan kredensial user. Akun Anda saat ini memiliki hak akses sebagai <strong className="uppercase">Staf / Operator</strong>, sehingga dilarang melakukan modifikasi sistem global UPTD.
        </p>
        <p className="text-xs text-rose-500 pt-2 border-t border-rose-100">
          Silakan keluar dan masuk kembali menggunakan akun demo Administrator untuk mencoba halaman pengubahan profil ini.
        </p>
      </div>
    );
  }

  // Pre-configured logo colour presets
  const colorThemes = [
    { class: 'bg-indigo-600', label: 'Indigo Bolon' },
    { class: 'bg-teal-600', label: 'Teal Air' },
    { class: 'bg-emerald-600', label: 'Emerald Irigasi' },
    { class: 'bg-sky-600', label: 'Sky Murni' },
    { class: 'bg-slate-800', label: 'Slate Gelap' },
    { class: 'bg-rose-600', label: 'Rose Bahaya' }
  ];

  return (
    <div id="pengaturan-view" className="space-y-6 font-sans">
      {/* Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-fade-in">
        <div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">Pusat Pengendali</span>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-0.5 font-sans">Pengaturan Sistem</h1>
          <p className="text-xs text-slate-500 mt-1">
            Sesuaikan identitas instansi, manajemen pengguna terdaftar, dan footer hak cipta global.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            id="subtab-profil"
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === 'profil' 
                ? 'bg-white text-slate-800 shadow-xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => setActiveSubTab('profil')}
          >
            <Building2 className="w-4 h-4" />
            <span>Profil Instansi</span>
          </button>
          <button
            type="button"
            id="subtab-users"
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === 'users' 
                ? 'bg-white text-slate-800 shadow-xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => setActiveSubTab('users')}
          >
            <Users className="w-4 h-4" />
            <span>Manajemen User</span>
          </button>
          <button
            type="button"
            id="subtab-footer"
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === 'footer' 
                ? 'bg-white text-slate-800 shadow-xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => setActiveSubTab('footer')}
          >
            <Copyright className="w-4 h-4" />
            <span>Catatan Kaki & Hak Cipta</span>
          </button>
        </div>
      </div>

      {/* Success alert notification */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 animate-pulse text-xs font-bold shadow-xs">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* RENDER PROFILE FORM */}
      {activeSubTab === 'profil' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-sm font-bold text-slate-800 mb-5 pb-3 border-b border-slate-100">Profil Instansi UPTD</h2>
          
          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama Lengkap Instansi</label>
                <input
                  type="text"
                  required
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  value={instansiName}
                  onChange={(e) => setInstansiName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama Singkat (Aplikasi / Cetakan)</label>
                <input
                  type="text"
                  required
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                />
              </div>
            </div>

            {/* Logo colors presets selection */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Warna Logo & Tema Aplikasi</label>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                {colorThemes.map((theme) => (
                  <button
                    key={theme.class}
                    type="button"
                    onClick={() => setLogoTheme(theme.class)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition ${
                      logoTheme === theme.class 
                        ? 'border-slate-800 bg-slate-50/70 text-slate-800 ring-2 ring-slate-100' 
                        : 'border-slate-100 bg-white text-slate-500 hover:bg-slate-50/50'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${theme.class} shrink-0`}></span>
                    <span className="truncate">{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Logo Upload Section */}
            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-200/60 shadow-xs space-y-3">
              <div>
                <h3 className="text-xs font-black text-slate-700 uppercase tracking-wide">Unggah Logo Instansi</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Berikan sentuhan khas daerah atau dinas Anda dengan mengunggah gambar logo kustom. Logo ini akan menggantikan ikon default di sidebar dan portal masuk secara global.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                {/* Logo Preview */}
                <div className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl relative h-28 shadow-2xs">
                  <span className="absolute top-1.5 left-1.5 text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                    Pratinjau Logo
                  </span>
                  {logoUrl ? (
                    <div className="flex flex-col items-center gap-1.5 mt-2">
                      <img 
                        referrerPolicy="no-referrer"
                        src={logoUrl} 
                        alt="Custom Logo Preview" 
                        className="w-12 h-12 rounded-lg object-contain border border-slate-100 p-0.5 bg-white shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="flex items-center gap-1 px-2 py-0.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded text-[9px] font-semibold border border-rose-100 transition-colors"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                        <span>Hapus Logo</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 mt-2 text-slate-400">
                      <div className={`p-2 rounded-lg ${logoTheme || 'bg-indigo-600'} text-white shadow-md flex items-center justify-center shrink-0`}>
                        <Droplet className="w-5 h-5 text-sky-200 fill-sky-200" />
                      </div>
                      <span className="text-[9px] font-medium text-slate-400">Default UPTD (Droplet)</span>
                    </div>
                  )}
                </div>

                {/* Drop Zone Box */}
                <div className="col-span-1 md:col-span-2">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl h-28 p-4 flex flex-col items-center justify-center text-center transition cursor-pointer relative ${
                      dragOver 
                        ? 'border-blue-500 bg-blue-50/20 text-blue-700 shadow-xs' 
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50/30'
                    }`}
                    onClick={() => document.getElementById('logo-file-input')?.click()}
                  >
                    <input 
                      type="file"
                      id="logo-file-input"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <UploadCloud className={`w-6 h-6 mb-1 ${dragOver ? 'text-blue-500 animate-bounce' : 'text-slate-400'}`} />
                    <p className="text-[10px] font-bold text-slate-600">
                      Seret & taruh gambar di sini, atau <span className="text-blue-600 underline">klik untuk cari</span>
                    </p>
                    <p className="text-[9px] text-slate-400 mt-1">
                      PNG, JPG, JPEG, GIF, atau SVG (Maks. 2MB)
                    </p>
                  </div>
                  {uploadError && (
                    <p className="text-[10px] text-rose-600 font-bold mt-1.5 flex items-center gap-1">
                      <span>⚠</span> {uploadError}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Alamat Resmi Kantor</label>
              <input
                type="text"
                required
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-medium focus:ring-2 focus:ring-blue-500/20"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nomor Telepon Sekretariat</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500/20"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Email Instansi</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                id="btn-save-profile"
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                Terapkan Identitas Instansi
              </button>
            </div>
          </form>
        </div>
      )}

      {/* RENDER USER MANAGEMENT */}
      {activeSubTab === 'users' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Manajemen Pengguna Aplikasi</h2>
              <p className="text-xs text-slate-500 mt-1">Daftar personil dan hak otorisasi yang dapat masuk ke SIA</p>
            </div>

            {!isAddingUser && (
              <button
                onClick={() => setIsAddingUser(true)}
                id="btn-trigger-add-user"
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition"
              >
                <UserPlus className="w-4 h-4" />
                <span>Tambah Pengguna</span>
              </button>
            )}
          </div>

          {/* Form adding user overlay nested */}
          {isAddingUser && (
            <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200/50 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest">Pendaftaran Juru / Staf Baru</h3>
                <button 
                  onClick={() => setIsAddingUser(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  Batal
                </button>
              </div>

              <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama Lengkap & Gelar</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pratama Dinata, S.T."
                    className="w-full border border-slate-200 bg-white rounded-xl px-3 py-2 text-xs"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Alamat Email Kredensial</label>
                  <input
                    type="email"
                    required
                    placeholder="nama@bahbolon.go.id"
                    className="w-full border border-slate-200 bg-white rounded-xl px-3 py-2 text-xs"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Bagian / Jabatan Kerja</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Juru Irigasi Kerasaan"
                    className="w-full border border-slate-200 bg-white rounded-xl px-3 py-2 text-xs"
                    value={newUserDept}
                    onChange={(e) => setNewUserDept(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Hak Akses Sistem</label>
                  <select
                    className="w-full border border-slate-200 bg-white rounded-xl px-3 py-2 text-xs text-slate-700"
                    value={newUserRole}
                    onChange={(e: any) => setNewUserRole(e.target.value)}
                  >
                    <option value="user">Staf / Juru Pengairan (Grup View-Only)</option>
                    <option value="admin">Administrator Global (Akses Penuh)</option>
                  </select>
                </div>

                <div className="col-span-1 md:col-span-2 pt-2 border-t border-slate-200/40 flex justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setIsAddingUser(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-500 hover:bg-slate-100"
                  >
                    Batalkan
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700"
                  >
                    Daftarkan Personil
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* User List Table */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden text-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    <th className="p-4 pl-6">Profil Pengguna</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Bagian / Departemen</th>
                    <th className="p-4">Hak Otorisasi</th>
                    <th className="p-4 text-center">Status Kelayakan</th>
                    <th className="p-4 text-right pr-6">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/40 transition">
                      <td className="p-4 pl-6 flex items-center gap-3">
                        {u.avatar ? (
                          <img 
                            referrerPolicy="no-referrer"
                            src={u.avatar} 
                            alt={u.name} 
                            className="w-8.5 h-8.5 rounded-full border border-slate-200 object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-8.5 h-8.5 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0">
                            {u.name.charAt(0)}
                          </div>
                        )}
                        <span className="font-bold text-slate-800">{u.name}</span>
                      </td>
                      <td className="p-4 font-mono text-[11px] font-medium text-slate-500">{u.email}</td>
                      <td className="p-4 font-medium">{u.department}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
                          u.role === 'admin' 
                            ? 'bg-purple-50 text-purple-700 border-purple-100' 
                            : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                        }`}>
                          {u.role === 'admin' ? <ShieldCheck className="w-3 h-3 text-purple-600" /> : <Lock className="w-2.5 h-2.5 text-indigo-600" />}
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleToggleUserStatus(u.id)}
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition ${
                            u.status === 'aktif'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100'
                              : 'bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100'
                          }`}
                          title={u.id === currentUser.id ? 'Anda sendiri' : 'Klik untuk mengubah status aktif'}
                          disabled={u.id === currentUser.id}
                        >
                          {u.status === 'aktif' ? 'Aktif' : 'Nonaktif / Suspend'}
                        </button>
                      </td>
                      <td className="p-4 text-right pr-6 whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          disabled={u.id === currentUser.id}
                          className={`p-1 text-slate-400 hover:text-rose-500 rounded hover:bg-rose-50 transition inline-flex items-center ${
                            u.id === currentUser.id ? 'opacity-20 cursor-not-allowed' : ''
                          }`}
                          title="Hapus Pengguna"
                        >
                          <Plus className="w-4 h-4 rotate-45" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RENDER FOOTER & COPYRIGHT FORM */}
      {activeSubTab === 'footer' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-800">Cetak Kaki & Hak Cipta Global</h2>
            <p className="text-xs text-slate-500 mt-1">Konfigurasi teks penutup instansi di bagian bawah setiap halaman portal</p>
          </div>

          <form onSubmit={handleSaveFooter} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Isi Teks Deskripsi Catatan Kaki</label>
              <textarea
                required
                rows={3}
                className="w-full border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 font-medium focus:ring-2 resize-none"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Teks Hak Cipta (Intellectual Property/Copyright)</label>
              <input
                type="text"
                required
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-medium focus:ring-2"
                value={copyrightText}
                onChange={(e) => setCopyrightText(e.target.value)}
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition shadow-xs"
              >
                Simpan Catatan Kaki
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
