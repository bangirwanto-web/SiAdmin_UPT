import React from 'react';
import { motion } from 'motion/react';
import { 
  FolderLock, 
  Wrench, 
  HardHat, 
  AlertTriangle, 
  Calendar,
  Users,
  ChevronRight,
  TrendingUp,
  Activity,
  Droplet,
  Waves
} from 'lucide-react';
import { User, ProfileSettings, Surat, KegiatanOperasional, DebitAir, ProyekPembangunan, Personel } from '../types';

interface DashboardProps {
  currentUser: User;
  profile: ProfileSettings;
  users: User[];
  suratList: Surat[];
  operasionalList: KegiatanOperasional[];
  debitList: DebitAir[];
  pembangunanList: ProyekPembangunan[];
  personelList: Personel[];
}

export default function Dashboard({ 
  currentUser, 
  profile, 
  users, 
  suratList, 
  operasionalList, 
  debitList, 
  pembangunanList,
  personelList
}: DashboardProps) {

  // Dynamic calculations
  const totalLetters = suratList.length;
  const suratMasukCount = suratList.filter(s => s.tipe === 'Masuk').length;
  const suratKeluarCount = suratList.filter(s => s.tipe === 'Keluar').length;

  const activeOpCount = operasionalList.filter(o => o.status === 'Jalan').length;
  const sumAnggaran = pembangunanList.reduce((acc, p) => acc + p.anggaran, 0);
  const activeProyekCount = pembangunanList.filter(p => p.status === 'Konstruksi').length;

  // Formatting currency
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Check alert level in debit air
  const highestAlert = debitList.reduce((prev, current) => {
    const alertWeight = { 'Normal': 0, 'Waspada': 1, 'Siaga': 2, 'Awas': 3 };
    return alertWeight[current.status] > alertWeight[prev.status] ? current : prev;
  }, debitList[0] || { status: 'Normal', tinggiMukaAir: 0, lokasiPos: 'General' });

  // Greeting based on Indonesian local time hours (mocked from current metadata or Date)
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 11) return 'Selamat Pagi';
    if (hours < 15) return 'Selamat Siang';
    if (hours < 19) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  return (
    <div id="dashboard-view" className="space-y-6">
      {/* Prime Header & Greeting */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">Panel Kontrol Utama</span>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">
            {getGreeting()}, {currentUser.name}!
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Selamat datang di Sistem Informasi Administrasi <span className="font-semibold text-slate-700">{profile.instansiName}</span>.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl text-xs text-slate-600 border border-slate-100">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span className="font-medium">10 Juni 2026 &bull; Realtime Monitor</span>
        </div>
      </div>

      {/* Bento Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Core Letter stats */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4"
        >
          <div className="p-3 bg-violet-50 text-violet-600 rounded-xl">
            <FolderLock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Penatausahaan</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{totalLetters}</p>
            <p className="text-[11px] text-slate-500 mt-1">
              <span className="text-emerald-500 font-bold">{suratMasukCount}</span> Masuk &bull; <span className="text-indigo-500 font-bold">{suratKeluarCount}</span> Keluar
            </p>
          </div>
        </motion.div>

        {/* Operational activity count */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4"
        >
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Seksi Operasional</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{operasionalList.length}</p>
            <p className="text-[11px] text-slate-500 mt-1">
              <span className="text-amber-500 font-bold">{activeOpCount}</span> Kegiatan sedang dikoordinir
            </p>
          </div>
        </motion.div>

        {/* Construction budgets */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4"
        >
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <HardHat className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Seksi Pembangunan</p>
            <p className="text-lg font-black text-slate-800 tracking-tight mt-1 truncate max-w-[140px] md:max-w-none" title={formatRupiah(sumAnggaran)}>
              {formatRupiah(sumAnggaran)}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              <span className="text-emerald-600 font-bold">{activeProyekCount}</span> Proyek konstruksi berjalan
            </p>
          </div>
        </motion.div>

        {/* Kepegawaian stats */}
        <motion.div 
          whileHover={{ y: -3 }}
          className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex items-start gap-4"
        >
          <div className="p-3 bg-teal-50 text-teal-600 rounded-xl">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Kepegawaian</p>
            <p className="text-2xl font-black text-slate-800 mt-1">{personelList.length} Pegawai</p>
            <p className="text-[11px] text-slate-500 mt-1">
              <span className="text-emerald-600 font-bold">
                {personelList.filter(p => p.statusKepegawaian === 'PNS').length}
              </span> PNS &bull;{' '}
              <span className="text-indigo-600 font-bold">
                {personelList.filter(p => p.statusKepegawaian === 'PPPK').length}
              </span> PPPK &bull;{' '}
              <span className="text-amber-600 font-bold">
                {personelList.filter(p => p.statusKepegawaian !== 'PNS' && p.statusKepegawaian !== 'PPPK').length}
              </span> Non-PNS
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* River Discharge Level Monitor - Visual Gauge Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Visual Tinggi Muka Air Sungai Bah Bolon</h2>
              <p className="text-xs text-slate-500">Hasil pembacaan pos duga air otomatis UPTD PSDA</p>
            </div>
            <div className="flex gap-2 text-[10px]">
              <span className="flex items-center gap-1 text-slate-500"><span className="w-2.5 h-2.5 bg-sky-400 rounded-full"></span> Hulu</span>
              <span className="flex items-center gap-1 text-slate-500"><span className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></span> Tengah</span>
              <span className="flex items-center gap-1 text-slate-500"><span className="w-2.5 h-2.5 bg-rose-500 rounded-full"></span> Ilir</span>
            </div>
          </div>

          {/* Bespoke SVG chart showing waves */}
          <div className="relative h-60 bg-gradient-to-b from-sky-50 to-blue-50/20 rounded-xl overflow-hidden border border-slate-100 flex flex-col justify-end">
            <div className="absolute inset-0 p-5 flex flex-col justify-between text-xs font-mono text-slate-400">
              <div className="flex justify-between border-b border-rose-200/40 pb-1">
                <span>Batas Siaga Banjir (Awas / 300cm)</span>
                <span className="text-rose-500">Kritis</span>
              </div>
              <div className="flex justify-between border-b border-amber-200/40 pb-1">
                <span>Batas Waspada (200cm)</span>
                <span className="text-amber-600">Siaga</span>
              </div>
              <div className="flex justify-between border-b border-blue-200/45 pb-1">
                <span>Kondisi Normal (100cm)</span>
                <span className="text-sky-600">Normal</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span>Dasar Sungai (0cm)</span>
                <span>Asal</span>
              </div>
            </div>

            {/* Simulated River water waves using SVGs & animated layout */}
            <div className="h-2/5 bg-sky-200/50 backdrop-blur-xs relative z-1 p-4 flex justify-around items-end">
              {debitList.map((pos) => {
                const percentage = Math.min((pos.tinggiMukaAir / 350) * 100, 100);
                let alertColor = 'bg-sky-500';
                if (pos.status === 'Waspada') alertColor = 'bg-amber-500';
                if (pos.status === 'Siaga' || pos.status === 'Awas') alertColor = 'bg-rose-500';

                return (
                  <div key={pos.id} className="flex flex-col items-center gap-2 w-1/4 group relative">
                    {/* Tooltip */}
                    <div className="absolute -top-16 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] px-2.5 py-1.5 rounded shadow-lg text-center z-10 w-28">
                      <p className="font-bold">{pos.lokasiPos.split(' ')[1]}</p>
                      <p className="font-mono mt-0.5">{pos.tinggiMukaAir} cm</p>
                    </div>

                    <div className="w-12 bg-slate-200/60 rounded-t-lg h-32 flex flex-col justify-end overflow-hidden border border-slate-300/30">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${percentage}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`w-full ${alertColor} rounded-t-md relative flex items-center justify-center`}
                      >
                        <span className="text-[9px] font-black text-white mix-blend-overlay font-mono">
                          {pos.tinggiMukaAir}
                        </span>
                      </motion.div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 text-center truncate w-full">
                      {pos.lokasiPos.split(' ')[1]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 bg-blue-50/50 border border-blue-100/60 rounded-xl p-3 text-xs text-blue-800">
            <Activity className="w-4 h-4 text-blue-600 animate-pulse shrink-0" />
            <p>
              Air Sungai Bah Bolon mengalir menuju hilir kawasan Perdagangan. Saat ini status pengawasan di hulu terpantau <strong className="text-emerald-700">Aman / Normal</strong>, namun di hilir terpantau <strong className="text-amber-700">Waspada</strong>. Petugas piket siaga diimbau tetap berkoordinasi.
            </p>
          </div>
        </div>

        {/* Quick Lists / Operations logs and users */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
          <div>
            <h2 className="text-sm font-bold text-slate-800">Pengguna & Akses Terdaftar</h2>
            <p className="text-xs text-slate-500">Daftar staf aktif pada administrasi UPTD</p>
          </div>

          <div className="divide-y divide-slate-100">
            {users.slice(0, 3).map((user) => (
              <div key={user.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                {user.avatar ? (
                  <img 
                    referrerPolicy="no-referrer"
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-9 h-9 rounded-full object-cover border border-slate-100"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold shrink-0">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-700 leading-tight truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">{user.department}</p>
                </div>
                <span className={`text-[9px] font-semibold uppercase px-2 py-0.5 rounded ${
                  user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                    : 'bg-sky-100 text-sky-700 border border-sky-200'
                }`}>
                  {user.role}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Catatan Instansi</h3>
            <div className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100/80">
              <p className="font-semibold text-slate-700 mb-1">Sekretariat {profile.shortName}:</p>
              Alamat: {profile.address}<br />
              Kontak: {profile.phone} &bull; {profile.email}
            </div>
          </div>
        </div>
      </div>

      {/* Modern Bento bottom section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent letters */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-bold text-slate-800 font-sans">Aktivitas Surat Masuk & Keluar</h2>
              <p className="text-xs text-slate-500">Arsip surat menyurat instansi terupdate</p>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold uppercase">
              Terbaru
            </span>
          </div>

          <div className="space-y-3">
            {suratList.slice(0, 3).map((surat) => (
              <div key={surat.id} className="flex gap-3 items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className={`text-[10px] font-extrabold uppercase px-2 py-1 rounded inline-block shrink-0 mt-0.5 ${
                  surat.tipe === 'Masuk' 
                    ? 'bg-teal-100 text-teal-800' 
                    : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {surat.tipe}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-700 leading-snug line-clamp-1">{surat.perihal}</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                    <span className="truncate">No: {surat.nomorSurat}</span>
                    <span>&bull;</span>
                    <span>{surat.tanggal}</span>
                  </div>
                </div>
                <span className={`text-[9.5px] font-semibold px-2 py-0.5 rounded-full ${
                  surat.status === 'Selesai' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : surat.status === 'Proses' 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {surat.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Development projects tracker */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-bold text-slate-800">Progres Jaringan Irigasi & Pembangunan</h2>
              <p className="text-xs text-slate-500">Rehabilitasi infrastruktur pengairan aktif</p>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-100">
              Konstruksi
            </span>
          </div>

          <div className="space-y-3">
            {pembangunanList.slice(0, 3).map((proj) => (
              <div key={proj.id} className="space-y-1.5 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between items-start gap-3">
                  <p className="text-xs font-bold text-slate-700 line-clamp-1">{proj.namaProyek}</p>
                  <span className="text-xs font-mono font-black text-slate-800 shrink-0">{proj.progres}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ width: `${proj.progres}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500">
                  <span className="truncate">{proj.lokasi}</span>
                  <span className="font-semibold text-slate-600 shrink-0">{formatRupiah(proj.anggaran)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
