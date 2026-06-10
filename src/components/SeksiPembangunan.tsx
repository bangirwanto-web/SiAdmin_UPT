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
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ExternalLink,
  Edit
} from 'lucide-react';
import { User, ProyekPembangunan } from '../types';

interface SeksiPembangunanProps {
  currentUser: User;
  pembangunanList: ProyekPembangunan[];
  setPembangunanList: (list: ProyekPembangunan[]) => void;
}

export default function SeksiPembangunan({ 
  currentUser, 
  pembangunanList, 
  setPembangunanList 
}: SeksiPembangunanProps) {

  // Query and states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Semua' | 'Perencanaan' | 'Konstruksi' | 'Selesai'>('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Project Form Inputs
  const [newProjNama, setNewProjNama] = useState('');
  const [newProjLokasi, setNewProjLokasi] = useState('');
  const [newProjKontraktor, setNewProjKontraktor] = useState('');
  const [newProjAnggaran, setNewProjAnggaran] = useState('');
  const [newProjRealisasi, setNewProjRealisasi] = useState('');
  const [newProjProgres, setNewProjProgres] = useState(0);
  const [newProjTarget, setNewProjTarget] = useState('');
  const [newProjStatus, setNewProjStatus] = useState<'Perencanaan' | 'Konstruksi' | 'Selesai'>('Perencanaan');

  // Editing state trackers for SeksiPembangunan
  const [editingProjId, setEditingProjId] = useState<string | null>(null);

  // Edit Triggers
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
    setIsModalOpen(true);
  };

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
    setIsModalOpen(true);
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

    setIsModalOpen(false);
    setEditingProjId(null);

    // Reset Form
    setNewProjNama('');
    setNewProjLokasi('');
    setNewProjKontraktor('');
    setNewProjAnggaran('');
    setNewProjRealisasi('');
    setNewProjProgres(0);
    setNewProjTarget('');
    setNewProjStatus('Perencanaan');
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Hapus proyek pembangunan fisik dari lembaran registrasi?')) {
      setPembangunanList(pembangunanList.filter(item => item.id !== id));
    }
  };

  // Quick state edit (simulated slider/progress modifier for testing)
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

  // Helper formatting money
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Filtered lists
  const filteredProjects = pembangunanList.filter(item => {
    const matchesSearch = item.namaProyek.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.kontraktor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'Semua' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculations for budget stats
  const totalAnggaran = filteredProjects.reduce((acc, p) => acc + p.anggaran, 0);
  const totalRealisasi = filteredProjects.reduce((acc, p) => acc + p.realisasi, 0);
  const penyerapanPersen = totalAnggaran > 0 ? (totalRealisasi / totalAnggaran) * 100 : 0;

  const isEditable = currentUser.role === 'admin';

  return (
    <div id="pembangunan-view" className="space-y-6">
      {/* Upper header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">Pengadaan & Konstruksi Fisik</span>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">Seksi Pembangunan</h1>
          <p className="text-xs text-slate-500 mt-1">
            Rehabilitasi prasarana bendung, kantong lumpur, tanggul proteksi sungai Bah Bolon.
          </p>
        </div>

        {isEditable ? (
          <button
            type="button"
            id="btn-add-pembangunan"
            onClick={handleAddProjTrigger}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>Daftar Proyek Baru</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-amber-50 px-3.5 py-1.5 rounded-xl text-[10px] text-amber-800 border border-amber-100">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Staf dibatasi lihat-saja untuk pendaftaran tender dinas</span>
          </div>
        )}
      </div>

      {/* Financial summary banner (Bento style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Coins className="w-4 h-4 text-emerald-500" />
            <span>Alokasi Pagu Anggaran</span>
          </div>
          <p className="text-xl font-black text-slate-800 mt-2">{formatRupiah(totalAnggaran)}</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <p className="text-[10px] text-slate-400 mt-1.5">Total anggaran untuk proyek terfilter</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <TrendingUp className="w-4 h-4 text-sky-500" />
            <span>Realisasi SP2D Penyerapan</span>
          </div>
          <p className="text-xl font-black text-slate-800 mt-2">{formatRupiah(totalRealisasi)}</p>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: `${penyerapanPersen}%` }}></div>
          </div>
          <p className="text-[10px] text-slate-400 mt-1.5">Penyerapan Keuangan: <strong>{penyerapanPersen.toFixed(1)}%</strong></p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Briefcase className="w-4 h-4 text-slate-400" />
            <span>Volume Kegiatan Fisik</span>
          </div>
          <p className="text-xl font-black text-slate-800 mt-2">{filteredProjects.length} Proyek</p>
          <div className="flex items-center gap-2 mt-3 text-[10px] text-slate-500 font-semibold font-mono">
            <span className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">Konstruksi: {filteredProjects.filter(p => p.status === 'Konstruksi').length}</span>
            <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Selesai: {filteredProjects.filter(p => p.status === 'Selesai').length}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-xs"
            placeholder="Cari nama proyek, kontraktor pemenang, atau kecamatan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            className="border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 bg-white"
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
          >
            <option value="Semua">Semua Status Konstruksi</option>
            <option value="Perencanaan">Masa Perencanaan</option>
            <option value="Konstruksi">Sedang Dikerjakan</option>
            <option value="Selesai">Proyek Rampung (FHO)</option>
          </select>
        </div>
      </div>

      {/* Projects Display layout */}
      <div className="space-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((proj) => {
            return (
              <div key={proj.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                
                {/* Project identity */}
                <div className="space-y-2 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                      proj.status === 'Selesai' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : proj.status === 'Konstruksi' 
                        ? 'bg-blue-100 text-blue-800' 
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

                {/* Progress / Slider Control for Interactive Preview */}
                <div className="w-full lg:w-72 space-y-2">
                  <div className="flex justify-between items-end text-xs">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Kemajuan Fisik</p>
                      <p className="font-mono font-bold text-slate-800">{proj.progres}% Selesai</p>
                    </div>
                    <span className="text-[10px] text-slate-500">
                      Realisasi Keuangan: <strong>{((proj.realisasi/proj.anggaran)*100).toFixed(0)}%</strong>
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        proj.status === 'Selesai' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}
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

                {/* Financial Summary panel */}
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
                        title="Ubah Rincian Proyek"
                      >
                        <Edit className="w-3.5 h-3.5" /> Ubah Rincian
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="text-[10.5px] text-rose-500 font-semibold hover:underline flex items-center gap-1 hover:text-rose-600 transition"
                        title="Hapus Proyek"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Hapus Registrasi
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-400 border border-slate-100">
            <Building2 className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="font-semibold text-slate-500">Tidak ada data proyek pembangunan yang cocok.</p>
          </div>
        )}
      </div>

      {/* DIALOG NEW PROJECT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-100">
            <div className="bg-slate-900 text-white p-5">
              <h3 className="font-bold text-sm">
                {editingProjId ? 'Ubah Rincian Proyek Konstruksi' : 'Form Registrasi Proyek Konstruksi'}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {editingProjId ? 'Modifikasi data anggaran, kontraktor, target atau progres fisik' : 'Pendaftaran surat perjanjian pelaksanaan kerja / tender dinas'}
              </p>
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
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingProjId(null);
                  }}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50"
                >
                  Urungkan
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700"
                >
                  {editingProjId ? 'Simpan Perubahan' : 'Registrasikan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
