import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  Briefcase, 
  TrendingUp, 
  Coins, 
  Clock, 
  MapPin,
  CheckCircle,
  Calendar,
  AlertTriangle,
  Edit,
  XCircle,
  Award,
  CloudSun,
  Activity
} from 'lucide-react';
import { User, ProyekPembangunan, UsulKegiatan, ProgresPembangunanLapangan } from '../types';

interface SeksiPembangunanProps {
  currentUser: User;
  pembangunanList: ProyekPembangunan[];
  setPembangunanList: (list: ProyekPembangunan[]) => void;
  activeTabOverride?: 'data-kegiatan' | 'progres-lapangan' | 'usul-kegiatan';
  onSubTabChange?: (tab: 'data-kegiatan' | 'progres-lapangan' | 'usul-kegiatan') => void;
  usulKegiatanList: UsulKegiatan[];
  setUsulKegiatanList: (list: UsulKegiatan[]) => void;
  progresLapanganList: ProgresPembangunanLapangan[];
  setProgresLapanganList: (list: ProgresPembangunanLapangan[]) => void;
}

export default function SeksiPembangunan({ 
  currentUser, 
  pembangunanList, 
  setPembangunanList,
  activeTabOverride = 'data-kegiatan',
  onSubTabChange,
  usulKegiatanList,
  setUsulKegiatanList,
  progresLapanganList,
  setProgresLapanganList
}: SeksiPembangunanProps) {

  const activeSubTab = activeTabOverride;

  const handleTabChange = (tab: 'data-kegiatan' | 'progres-lapangan' | 'usul-kegiatan') => {
    if (onSubTabChange) {
      onSubTabChange(tab);
    }
  };

  // General search / filter query
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');

  // Modals
  const [isProjModalOpen, setIsProjModalOpen] = useState(false);
  const [isUsulModalOpen, setIsUsulModalOpen] = useState(false);
  const [isProgresModalOpen, setIsProgresModalOpen] = useState(false);

  // --- CRUD for 1: DATA KEGIATAN (Ongoing Projects) ---
  const [editingProjId, setEditingProjId] = useState<string | null>(null);
  const [newProjNama, setNewProjNama] = useState('');
  const [newProjLokasi, setNewProjLokasi] = useState('');
  const [newProjKontraktor, setNewProjKontraktor] = useState('');
  const [newProjAnggaran, setNewProjAnggaran] = useState('');
  const [newProjRealisasi, setNewProjRealisasi] = useState('');
  const [newProjProgres, setNewProjProgres] = useState(0);
  const [newProjTarget, setNewProjTarget] = useState('');
  const [newProjStatus, setNewProjStatus] = useState<'Perencanaan' | 'Konstruksi' | 'Selesai'>('Perencanaan');

  const handleAddProjTrigger = () => {
    setEditingProjId(null);
    setNewProjNama('');
    setNewProjLokasi('');
    setNewProjKontraktor('');
    setNewProjAnggaran('');
    setNewProjRealisasi('');
    setNewProjProgres(0);
    setNewProjTarget('');
    setNewProjStatus('Perencanaan');
    setIsProjModalOpen(true);
  };

  const handleEditProjClick = (item: ProyekPembangunan) => {
    setEditingProjId(item.id);
    setNewProjNama(item.namaProyek);
    setNewProjLokasi(item.lokasi);
    setNewProjKontraktor(item.kontraktor === 'Sertifikasi Swakelola / Tender Dinas' ? '' : item.kontraktor);
    setNewProjAnggaran(item.anggaran.toString());
    setNewProjRealisasi(item.realisasi.toString());
    setNewProjProgres(item.progres);
    setNewProjTarget(item.targetSelesai);
    setNewProjStatus(item.status);
    setIsProjModalOpen(true);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjNama || !newProjLokasi || !newProjAnggaran) return;

    const newItem: ProyekPembangunan = {
      id: editingProjId || `pem-${Date.now()}`,
      namaProyek: newProjNama,
      lokasi: newProjLokasi,
      kontraktor: newProjKontraktor || 'Sertifikasi Swakelola / Tender Dinas',
      anggaran: Number(newProjAnggaran),
      realisasi: Number(newProjRealisasi || 0),
      progres: Number(newProjStatus === 'Selesai' ? 100 : newProjProgres),
      targetSelesai: newProjTarget || '2026-12-31',
      status: newProjStatus
    };

    if (editingProjId) {
      setPembangunanList(pembangunanList.map(item => item.id === editingProjId ? newItem : item));
    } else {
      setPembangunanList([newItem, ...pembangunanList]);
    }

    setIsProjModalOpen(false);
    setEditingProjId(null);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Hapus proyek pembangunan fisik dari lembaran registrasi?')) {
      setPembangunanList(pembangunanList.filter(item => item.id !== id));
    }
  };

  const handleModifyProgress = (id: string, value: number) => {
    setPembangunanList(pembangunanList.map(item => {
      if (item.id === id) {
        const isSelesai = value === 100;
        return {
          ...item,
          progres: value,
          status: isSelesai ? 'Selesai' : item.status === 'Selesai' ? 'Konstruksi' : item.status
        };
      }
      return item;
    }));
  };

  // --- CRUD for 2: PROGRES LAPANGAN (Weekly Milestones) ---
  const [editingProgId, setEditingProgId] = useState<string | null>(null);
  const [newProgProjId, setNewProgProjId] = useState('');
  const [newProgDetail, setNewProgDetail] = useState('');
  const [newProgTargetM, setNewProgTargetM] = useState('');
  const [newProgKendala, setNewProgKendala] = useState('');
  const [newProgCuaca, setNewProgCuaca] = useState<'Cerah' | 'Hujan Ringan' | 'Hujan Lebat'>('Cerah');
  const [newProgTanggal, setNewProgTanggal] = useState(new Date().toISOString().split('T')[0]);

  const handleAddProgresTrigger = () => {
    setEditingProgId(null);
    setNewProgProjId(pembangunanList[0]?.id || '');
    setNewProgDetail('');
    setNewProgTargetM('');
    setNewProgKendala('');
    setNewProgCuaca('Cerah');
    setNewProgTanggal(new Date().toISOString().split('T')[0]);
    setIsProgresModalOpen(true);
  };

  const handleEditProgClick = (prog: ProgresPembangunanLapangan) => {
    setEditingProgId(prog.id);
    setNewProgProjId(prog.proyekId);
    setNewProgDetail(prog.uraianPekerjaanDetail);
    setNewProgTargetM(prog.targetFisikMingguIni);
    setNewProgKendala(prog.kendalaLapangan);
    setNewProgCuaca(prog.cuacaKondisi);
    setNewProgTanggal(prog.tanggalUpdate);
    setIsProgresModalOpen(true);
  };

  const handleCreateProgres = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgDetail || !newProgProjId) return;

    const referencedProj = pembangunanList.find(p => p.id === newProgProjId);
    const projectName = referencedProj ? referencedProj.namaProyek : 'Proyek Swakelola';

    const newItem: ProgresPembangunanLapangan = {
      id: editingProgId || `prg-${Date.now()}`,
      proyekId: newProgProjId,
      namaProyek: projectName,
      uraianPekerjaanDetail: newProgDetail,
      targetFisikMingguIni: newProgTargetM,
      kendalaLapangan: newProgKendala || 'Tidak ada kendala berarti.',
      cuacaKondisi: newProgCuaca,
      tanggalUpdate: newProgTanggal
    };

    if (editingProgId) {
      setProgresLapanganList(progresLapanganList.map(item => item.id === editingProgId ? newItem : item));
    } else {
      setProgresLapanganList([newItem, ...progresLapanganList]);
    }
    setIsProgresModalOpen(false);
    setEditingProgId(null);
  };

  const handleDeleteProgres = (id: string) => {
    if (confirm('Hapus laporan progress lapangan mingguan ini?')) {
      setProgresLapanganList(progresLapanganList.filter(item => item.id !== id));
    }
  };

  // --- CRUD for 3: USUL KEGIATAN (Capital proposals) ---
  const [editingUsulId, setEditingUsulId] = useState<string | null>(null);
  const [newUsulPekerjaan, setNewUsulPekerjaan] = useState('');
  const [newUsulLokasi, setNewUsulLokasi] = useState('');
  const [newUsulBiaya, setNewUsulBiaya] = useState('');
  const [newUsulPrioritas, setNewUsulPrioritas] = useState<'Tinggi' | 'Sedang' | 'Rendah'>('Sedang');
  const [newUsulPengusul, setNewUsulPengusul] = useState('');
  const [newUsulTanggal, setNewUsulTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [newUsulKet, setNewUsulKet] = useState('');
  const [newUsulStatus, setNewUsulStatus] = useState<'Ditinjau' | 'Disetujui' | 'Ditangguhkan'>('Ditinjau');

  const handleAddUsulTrigger = () => {
    setEditingUsulId(null);
    setNewUsulPekerjaan('');
    setNewUsulLokasi('');
    setNewUsulBiaya('');
    setNewUsulPrioritas('Sedang');
    setNewUsulPengusul(currentUser.name);
    setNewUsulTanggal(new Date().toISOString().split('T')[0]);
    setNewUsulKet('');
    setNewUsulStatus('Ditinjau');
    setIsUsulModalOpen(true);
  };

  const handleEditUsulClick = (item: UsulKegiatan) => {
    setEditingUsulId(item.id);
    setNewUsulPekerjaan(item.namaPekerjaan);
    setNewUsulLokasi(item.lokasi);
    setNewUsulBiaya(item.estimasiBiaya.toString());
    setNewUsulPrioritas(item.skalaPrioritas);
    setNewUsulPengusul(item.diusulkanOleh);
    setNewUsulTanggal(item.tanggalUsulan);
    setNewUsulKet(item.keterangan || '');
    setNewUsulStatus(item.statusAproval);
    setIsUsulModalOpen(true);
  };

  const handleCreateUsul = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsulPekerjaan || !newUsulLokasi || !newUsulBiaya) return;

    const newItem: UsulKegiatan = {
      id: editingUsulId || `upb-${Date.now()}`,
      namaPekerjaan: newUsulPekerjaan,
      lokasi: newUsulLokasi,
      estimasiBiaya: Number(newUsulBiaya),
      skalaPrioritas: newUsulPrioritas,
      diusulkanOleh: newUsulPengusul,
      tanggalUsulan: newUsulTanggal,
      keterangan: newUsulKet,
      statusAproval: newUsulStatus
    };

    if (editingUsulId) {
      setUsulKegiatanList(usulKegiatanList.map(item => item.id === editingUsulId ? newItem : item));
    } else {
      setUsulKegiatanList([newItem, ...usulKegiatanList]);
    }
    setIsUsulModalOpen(false);
    setEditingUsulId(null);
  };

  const handleUpdateUsulApproval = (id: string, status: 'Ditinjau' | 'Disetujui' | 'Ditangguhkan') => {
    setUsulKegiatanList(usulKegiatanList.map(item => {
      if (item.id === id) {
        return { ...item, statusAproval: status };
      }
      return item;
    }));
  };

  const handleDeleteUsul = (id: string) => {
    if (confirm('Hapus usul kegiatan pembangunan infrastruktur fisik ini?')) {
      setUsulKegiatanList(usulKegiatanList.filter(item => item.id !== id));
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const isEditable = currentUser.role === 'admin';

  return (
    <div id="pembangunan-view" className="space-y-6">
      
      {/* Upper header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">Pengadaan & Konstruksi Fisik</span>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">Seksi Pembangunan Infrastruktur SDA</h1>
          <p className="text-xs text-slate-500 mt-1">
            Rehabilitasi prasarana bendung besar, suplesi pengaliran sawah, serta monitoring kemajuan kontraktor di lapangan.
          </p>
        </div>

        {/* Sub tab switchers */}
        <div className="flex flex-wrap bg-slate-100 p-1 rounded-xl gap-0.5">
          {[
            { id: 'data-kegiatan', label: 'Data Kegiatan', icon: Briefcase },
            { id: 'progres-lapangan', label: 'Progres Lapangan', icon: Activity },
            { id: 'usul-kegiatan', label: 'Usul Kegiatan', icon: Coins }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isTabActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id as any)}
                className={`px-3 py-1.5 md:px-4 md:py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                  isTabActive 
                    ? 'bg-slate-800 text-white shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
                }`}
              >
                <IconComponent className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RENDER TAB 1: DATA KEGIATAN (Ongoing construction projects) */}
      {activeSubTab === 'data-kegiatan' && (
        <div className="space-y-6 animate-fade-in-down">
          
          {/* Budget stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Coins className="w-4 h-4 text-emerald-500" />
                <span>Alokasi Pagu Anggaran</span>
              </div>
              <p className="text-xl font-black text-slate-800 mt-2">
                {formatRupiah(pembangunanList.reduce((acc, p) => acc + p.anggaran, 0))}
              </p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 font-medium">Dana kontrak untuk registrasi pembangunan fisik</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <TrendingUp className="w-4 h-4 text-sky-500" />
                <span>Realisasi SP2D Penyerapan</span>
              </div>
              <p className="text-xl font-black text-slate-800 mt-2">
                {formatRupiah(pembangunanList.reduce((acc, p) => acc + p.realisasi, 0))}
              </p>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-sky-500 h-1.5 rounded-full" style={{ 
                  width: `${(pembangunanList.reduce((acc, p) => acc + p.realisasi, 0) / (pembangunanList.reduce((acc, p) => acc + p.anggaran, 0) || 1)) * 100}%` 
                }}></div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5">
                Kinerja Keuangan: <strong>{((pembangunanList.reduce((acc, p) => acc + p.realisasi, 0) / (pembangunanList.reduce((acc, p) => acc + p.anggaran, 0) || 1)) * 100).toFixed(1)}%</strong>
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span>Volume Kegiatan Kontrak</span>
              </div>
              <p className="text-xl font-black text-slate-800 mt-2">{pembangunanList.length} Kontrak Konstruksi</p>
              <div className="flex items-center gap-2 mt-3 text-[10px] text-slate-500 font-semibold font-mono">
                <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Rencana: {pembangunanList.filter(p => p.status === 'Perencanaan').length}</span>
                <span className="text-emerald-750 text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">Konstruksi: {pembangunanList.filter(p => p.status === 'Konstruksi').length}</span>
              </div>
            </div>
          </div>

          {/* Filtering bar and add button */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:max-w-xl">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Cari nama proyek, lokasi, atau pelaksana..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  className="border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="Semua">Semua Status Konstruksi</option>
                  <option value="Perencanaan">Masa Perencanaan</option>
                  <option value="Konstruksi">Sedang Dikerjakan</option>
                  <option value="Selesai">Proyek Rampung (FHO)</option>
                </select>
              </div>
            </div>

            <button
              id="btn-add-pembangunan"
              onClick={handleAddProjTrigger}
              className="w-full md:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shrink-0"
            >
              <Plus className="w-4.5 h-4.5" />
              <span>Daftar Proyek Baru</span>
            </button>
          </div>

          {/* Projects lists */}
          <div className="space-y-4">
            {pembangunanList
              .filter(p => {
                const matchesSearch = p.namaProyek.toLowerCase().includes(searchQuery.toLowerCase()) || p.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) || p.kontraktor.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesStatus = statusFilter === 'Semua' || p.status === statusFilter;
                return matchesSearch && matchesStatus;
              })
              .map((proj) => (
                <div key={proj.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  
                  <div className="space-y-2 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        proj.status === 'Selesai' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : proj.status === 'Konstruksi' 
                          ? 'bg-blue-105 bg-blue-150 bg-blue-100 text-blue-800' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {proj.status === 'Selesai' ? 'FHO - Rampung' : proj.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {proj.lokasi}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-800 leading-snug">{proj.namaProyek}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <p><strong className="text-slate-600">Kontraktor:</strong> {proj.kontraktor}</p>
                      <p className="flex items-center gap-1 text-[11px]"><Calendar className="w-3.5 h-3.5 text-slate-400" /> Target Selesai: {proj.targetSelesai}</p>
                    </div>
                  </div>

                  <div className="w-full lg:w-72 space-y-2">
                    <div className="flex justify-between items-end text-xs">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Kemajuan Fisik</p>
                        <p className="font-mono font-bold text-slate-800">{proj.progres}% Selesai</p>
                      </div>
                      <span className="text-[10px] text-slate-500">
                        Pencairan SP2D: <strong>{((proj.realisasi / proj.anggaran) * 100).toFixed(0)}%</strong>
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-2.5 rounded-full transition-all duration-300 ${proj.status === 'Selesai' ? 'bg-emerald-500' : 'bg-blue-500'}`}
                        style={{ width: `${proj.progres}%` }}
                      ></div>
                    </div>

                    {isEditable && (
                      <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Ubah Fisik:</label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={5}
                          className="w-40 h-1 accent-indigo-600 bg-slate-200 rounded-lg cursor-pointer"
                          value={proj.progres}
                          onChange={(e) => handleModifyProgress(proj.id, Number(e.target.value))}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end shrink-0 sm:self-stretch lg:self-center bg-slate-50/50 p-4 rounded-xl border border-slate-100 min-w-[200px]">
                    <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Nilai Kontrak RAB</p>
                    <p className="text-sm font-black text-slate-800 font-mono">{formatRupiah(proj.anggaran)}</p>
                    
                    <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider mt-2">Pencairan Dana</p>
                    <p className="text-xs font-semibold text-slate-600 font-mono">{formatRupiah(proj.realisasi)}</p>
                    
                    {isEditable && (
                      <div className="flex flex-wrap gap-2.5 mt-3">
                        <button
                          onClick={() => handleEditProjClick(proj)}
                          className="text-[10.5px] text-blue-600 font-semibold hover:underline flex items-center gap-1 hover:text-blue-700 transition"
                        >
                          <Edit className="w-3.5 h-3.5" /> Ubah Rincian
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="text-[10.5px] text-rose-500 font-semibold hover:underline flex items-center gap-1 hover:text-rose-600 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Hapus
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* RENDER TAB 2: PROGRES LAPANGAN (Weekly project reports/obstructions) */}
      {activeSubTab === 'progres-lapangan' && (
        <div className="space-y-6 animate-fade-in-down">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between gap-4 items-center">
            <div>
              <p className="text-xs uppercase font-extrabold text-slate-400 tracking-widest">Pencatatan Berita Acara / Laporan Lapangan</p>
              <h2 className="text-sm font-bold text-slate-800 mt-1">Laporan Fisik Mingguan Pengawas Proyek</h2>
            </div>

            {isEditable && (
              <button
                id="btn-add-progres"
                onClick={handleAddProgresTrigger}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-705 bg-slate-850 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Buat Catatan Lapangan</span>
              </button>
            )}
          </div>

          {/* Grid list of progress logs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {progresLapanganList.map((log) => (
              <div key={log.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-blue-500 bg-blue-50 px-2 py-0.5 rounded font-mono">
                      REF: {log.proyekId}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                      <CloudSun className="w-3.5 h-3.5 text-amber-500" />
                      Cuaca: <strong>{log.cuacaKondisi}</strong>
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wide">Nama Proyek Kontrak</h3>
                    <p className="text-xs font-bold text-slate-800 leading-snug mt-0.5">{log.namaProyek}</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs text-slate-650">
                    <div>
                      <strong className="text-slate-855 text-slate-800 block text-[11px] uppercase tracking-wide">Pekerjaan Lapangan:</strong>
                      <p className="text-[11.5px] mt-0.5">{log.uraianPekerjaanDetail}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-100/60">
                      <strong className="text-slate-855 text-slate-800 block text-[11px] uppercase tracking-wide">Target Minggu Ini:</strong>
                      <p className="text-[11.5px] mt-0.5 font-semibold text-indigo-650 text-indigo-600 font-mono">{log.targetFisikMingguIni}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-100/60">
                      <strong className="text-rose-700 block text-[11px] uppercase tracking-wide flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                        Kendala Lapangan:
                      </strong>
                      <p className="text-[11.5px] mt-0.5 text-rose-800 font-medium italic">" {log.kendalaLapangan} "</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100/70 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono font-bold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Dilaporkan: {log.tanggalUpdate}
                  </span>

                  {isEditable && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleEditProgClick(log)}
                        className="p-1 px-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-700 rounded-lg flex items-center gap-1 transition"
                      >
                        <Edit className="w-3 h-3" /> Edit Laporan
                      </button>
                      <button
                        onClick={() => handleDeleteProgres(log.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RENDER TAB 3: USUL KEGIATAN (Proposed Capital Project Proposals) */}
      {activeSubTab === 'usul-kegiatan' && (
        <div className="space-y-6 animate-fade-in-down">
          
          {/* Key stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest block">Total Usul Konstruksi</span>
              <p className="text-2xl font-black text-slate-800 mt-1">{usulKegiatanList.length} Proyek Baru</p>
              <p className="text-[10px] text-slate-400 mt-1">Diajukan untuk pagu tahun anggaran depan</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest block">Estimasi Kebutuhan Biaya</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">
                {formatRupiah(usulKegiatanList.reduce((acc, u) => acc + u.estimasiBiaya, 0))}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Total usulan rencana belanja modal</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest block">Usulan Disetujui</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">
                {usulKegiatanList.filter(u => u.statusAproval === 'Disetujui').length} Tender
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Disiapkan berkas HPS & lelang LPSE</p>
            </div>
          </div>

          {/* Action bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between gap-4 items-center">
            <div className="relative w-full sm:max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Cari ide/usulan proyek..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              id="btn-add-usul"
              onClick={handleAddUsulTrigger}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Usulkan Kegiatan Konstruksi</span>
            </button>
          </div>

          {/* Proposals loop */}
          <div className="space-y-4">
            {usulKegiatanList
              .filter(u => u.namaPekerjaan.toLowerCase().includes(searchQuery.toLowerCase()) || u.lokasi.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((u) => {
                const priorityBadgeColor = {
                  'Tinggi': 'bg-rose-50 text-rose-700 border-rose-100',
                  'Sedang': 'bg-amber-50 text-amber-700 border-amber-100',
                  'Rendah': 'bg-slate-50 text-slate-600 border-slate-100'
                }[u.skalaPrioritas] || 'bg-slate-50 text-slate-600';

                return (
                  <div key={u.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="space-y-2 max-w-xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
                          u.statusAproval === 'Disetujui' 
                            ? 'bg-emerald-100 border-emerald-200 text-emerald-800' 
                            : u.statusAproval === 'Ditangguhkan' 
                            ? 'bg-rose-100 border-rose-200 text-rose-800' 
                            : 'bg-amber-55 bg-amber-50 border-amber-200 text-amber-800 animate-pulse'
                        }`}>
                          {u.statusAproval}
                        </span>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${priorityBadgeColor}`}>
                          Prioritas: {u.skalaPrioritas}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-350 text-slate-400" />
                          Diajukan: {u.tanggalUsulan}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-800 leading-snug">{u.namaPekerjaan}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-500">
                        <p><strong className="text-slate-600">Kecamatan Lokasi:</strong> {u.lokasi}</p>
                        <p><strong className="text-slate-600">Diusulkan Oleh:</strong> {u.diusulkanOleh}</p>
                      </div>
                      {u.keterangan && <p className="text-[11px] text-slate-450 italic">" {u.keterangan} "</p>}
                    </div>

                    <div className="flex flex-col items-start lg:items-end bg-slate-50 border border-slate-100 p-4 rounded-xl min-w-[200px]">
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Estimasi RAB Pembangunan</span>
                      <p className="text-base font-black text-slate-800 font-mono mt-0.5">{formatRupiah(u.estimasiBiaya)}</p>

                      {isEditable && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          <button
                            onClick={() => handleUpdateUsulApproval(u.id, 'Disetujui')}
                            className="p-1 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[9.5px] font-extrabold flex items-center gap-0.5"
                          >
                            <CheckCircle className="w-3 h-3" /> Setujui Proyek
                          </button>
                          <button
                            onClick={() => handleUpdateUsulApproval(u.id, 'Ditangguhkan')}
                            className="p-1 px-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-[9.5px] font-extrabold flex items-center gap-0.5"
                          >
                            <XCircle className="w-3 h-3" /> Tangguhkan
                          </button>
                          <button
                            onClick={() => handleEditUsulClick(u)}
                            className="p-1 px-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-[9.5px] font-extrabold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUsul(u.id)}
                            className="p-1 px-1.5 bg-white border border-slate-200 text-rose-600 rounded-lg hover:border-rose-350 hover:border-rose-300"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* --- DIALOG MODALS SECTION --- */}

      {/* 1: PROJECT MODAL */}
      {isProjModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-100">
            <div className="bg-slate-900 text-white p-5">
              <h3 className="font-bold text-sm">
                {editingProjId ? 'Ubah Rincian Proyek Konstruksi' : 'Form Registrasi Proyek Konstruksi'}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Pendaftaran surat perjanjian pelaksanaan kerja / tender dinas</p>
            </div>

            <form onSubmit={handleCreateProject} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama Proyek / Paket Pekerjaan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rehabilitasi Tanggul Sungai Bah Bolon Ruas Hilir"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2"
                  value={newProjNama}
                  onChange={(e) => setNewProjNama(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Lokasi Kecamatan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kec. Siantar"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2"
                    value={newProjLokasi}
                    onChange={(e) => setNewProjLokasi(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Kontraktor Pelaksana</label>
                  <input
                    type="text"
                    placeholder="Pemenang Tender / CV / PT"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2"
                    value={newProjKontraktor}
                    onChange={(e) => setNewProjKontraktor(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Pagu Anggaran RAB (Rp)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    placeholder="Contoh: 1500000000"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                    value={newProjAnggaran}
                    onChange={(e) => setNewProjAnggaran(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Pencairan Keuangan (Rp)</label>
                  <input
                    type="number"
                    placeholder="Nilai kuitansi SP2D"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono"
                    value={newProjRealisasi}
                    onChange={(e) => setNewProjRealisasi(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Target Rampung</label>
                  <input
                    type="date"
                    required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2"
                    value={newProjTarget}
                    onChange={(e) => setNewProjTarget(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Status Pengadaan</label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-700"
                    value={newProjStatus}
                    onChange={(e: any) => {
                      setNewProjStatus(e.target.value);
                      if (e.target.value === 'Selesai') setNewProjProgres(100);
                      if (e.target.value === 'Perencanaan') setNewProjProgres(0);
                    }}
                  >
                    <option value="Perencanaan">Masa Perencanaan</option>
                    <option value="Konstruksi">Sedang Konstruksi</option>
                    <option value="Selesai">Selesai / Rampung Sempurna</option>
                  </select>
                </div>
              </div>

              {(newProjStatus === 'Konstruksi' || editingProjId) && newProjStatus !== 'Selesai' && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Kemajuan Fisik Kontrak ({newProjProgres}%)</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    className="w-full accent-indigo-600 bg-slate-200 rounded-lg cursor-pointer"
                    value={newProjProgres}
                    onChange={(e) => setNewProjProgres(Number(e.target.value))}
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProjModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 hover:text-slate-500"
                >
                  Urungkan
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-705 bg-slate-850 hover:bg-slate-800"
                >
                  {editingProjId ? 'Simpan' : 'Daftarkan Proyek'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2: DAILY PROGRESS LOGS MODAL */}
      {isProgresModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-100">
            <div className="bg-slate-900 text-white p-5">
              <h3 className="font-bold text-sm">
                {editingProgId ? 'Ubah Rincian Berita Acara Lapangan' : 'Buat Catatan Lapangan / Pengawasan Mingguan'}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Pencatatan rintangan kerja konstruksi sipil sungai & cuaca</p>
            </div>

            <form onSubmit={handleCreateProgres} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Pilih Proyek Kontrak Kerja</label>
                <select
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-700"
                  value={newProgProjId}
                  onChange={(e) => setNewProgProjId(e.target.value)}
                >
                  {pembangunanList.map(p => (
                    <option key={p.id} value={p.id}>{p.namaProyek} (ID: {p.id})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Uraian Detail Progress Fisik Dilaporkan</label>
                <textarea
                  required
                  placeholder="Contoh: Pekerjaan cor slub pondasi jembatan penyebrangan air, tuntas level 1B"
                  rows={2}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  value={newProgDetail}
                  onChange={(e) => setNewProgDetail(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Target Fisik Minggu Ini</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 15% selesai cor aspal"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                    value={newProgTargetM}
                    onChange={(e) => setNewProgTargetM(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Catatan Cuaca Lapangan</label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-700"
                    value={newProgCuaca}
                    onChange={(e: any) => setNewProgCuaca(e.target.value)}
                  >
                    <option value="Cerah">Cerah / Normal</option>
                    <option value="Hujan Ringan">Hujan Ringan / Gerimis</option>
                    <option value="Hujan Lebat">Hujan Lebat (Banjir Luap)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Tanggal Laporan Diambil</label>
                  <input
                    type="date"
                    required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2"
                    value={newProgTanggal}
                    onChange={(e) => setNewProgTanggal(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-1.5">Kendala / Rintangan Teknis</label>
                  <input
                    type="text"
                    placeholder="Contoh: Alat berat macet / kurang pasir cor"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2"
                    value={newProgKendala}
                    onChange={(e) => setNewProgKendala(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProgresModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700"
                >
                  {editingProgId ? 'Simpan' : 'Kirim Laporan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3: CONSTRUCTION PROPOSALS MODAL */}
      {isUsulModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-100">
            <div className="bg-slate-900 text-white p-5">
              <h3 className="font-bold text-sm">
                {editingUsulId ? 'Ubah Usulan Konstruksi Baru' : 'Form Pengajuan Usul Pembangunan Baru'}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Pengajuan pembangunan tebing, talud saringan, atau pintu air baru</p>
            </div>

            <form onSubmit={handleCreateUsul} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama Usulan Pembangunan Fisik</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pembangunan Karet Bendung Simalungun II"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2"
                  value={newUsulPekerjaan}
                  onChange={(e) => setNewUsulPekerjaan(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Kecamatan Lokasi</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kec. Tanah Jawa"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2"
                    value={newUsulLokasi}
                    onChange={(e) => setNewUsulLokasi(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Estimasi Biaya RAB (Rp)</label>
                  <input
                    type="number"
                    required
                    placeholder="Contoh: 850000000"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:ring-2"
                    value={newUsulBiaya}
                    onChange={(e) => setNewUsulBiaya(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Skala Prioritas Proyek</label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-700"
                    value={newUsulPrioritas}
                    onChange={(e: any) => setNewUsulPrioritas(e.target.value)}
                  >
                    <option value="Tinggi">Tinggi (Sangat Mendesak)</option>
                    <option value="Sedang">Sedang (Rencana Reguler)</option>
                    <option value="Rendah">Rendah (Dapat Ditunda)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Diusulkan Oleh</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama institusi / Juru"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                    value={newUsulPengusul}
                    onChange={(e) => setNewUsulPengusul(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Tanggal Permohonan</label>
                  <input
                    type="date"
                    required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2"
                    value={newUsulTanggal}
                    onChange={(e) => setNewUsulTanggal(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Rekomendasi Dinas</label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-700"
                    value={newUsulStatus}
                    onChange={(e: any) => {
                      if (isEditable) {
                        setNewUsulStatus(e.target.value);
                      } else {
                        alert("Hanya admin / Kepala Seksi yang dapat mengubah status keputusan usulan.");
                      }
                    }}
                    disabled={!isEditable}
                  >
                    <option value="Ditinjau">Ditinjau (Dalam Kajian Teknis)</option>
                    <option value="Disetujui">Disetujui (Rekomendasi Kontrak LPSE)</option>
                    <option value="Ditangguhkan">Ditangguhkan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Keterangan Justifikasi Teknis</label>
                <textarea
                  placeholder="Mengapa sarana / prasarana fisik ini vital dibangun segera?..."
                  rows={2}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  value={newUsulKet}
                  onChange={(e) => setNewUsulKet(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsUsulModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-705 bg-slate-850 hover:bg-slate-800"
                >
                  {editingUsulId ? 'Simpan' : 'Kirim Usulan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
