import React, { useState } from 'react';
import { 
  Waves, 
  Wrench, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  TrendingUp, 
  AlertTriangle,
  ChevronRight,
  ClipboardList,
  CheckCircle,
  Clock,
  Play,
  Edit
} from 'lucide-react';
import { User, KegiatanOperasional, DebitAir } from '../types';

interface SeksiOperasionalProps {
  currentUser: User;
  operasionalList: KegiatanOperasional[];
  setOperasionalList: (list: KegiatanOperasional[]) => void;
  debitList: DebitAir[];
  setDebitList: (list: DebitAir[]) => void;
}

export default function SeksiOperasional({ 
  currentUser, 
  operasionalList, 
  setOperasionalList, 
  debitList, 
  setDebitList 
}: SeksiOperasionalProps) {

  // Inner states
  const [activeSubTab, setActiveSubTab] = useState<'monitoring' | 'kegiatan'>('monitoring');
  
  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'Semua' | 'Rencana' | 'Jalan' | 'Selesai'>('Semua');

  // Modal Overlays
  const [isOpModalOpen, setIsOpModalOpen] = useState(false);
  const [isDebitModalOpen, setIsDebitModalOpen] = useState(false);
  const [isAddPosModalOpen, setIsAddPosModalOpen] = useState(false);

  // New Debit Air State Form (Update)
  const [selectedPosId, setSelectedPosId] = useState('');
  const [updatedTinggiAir, setUpdatedTinggiAir] = useState(100);
  const [updatedStatus, setUpdatedStatus] = useState<'Normal' | 'Waspada' | 'Siaga' | 'Awas'>('Normal');

  // New Debit Air Pos Form (Create)
  const [newPosLokasi, setNewPosLokasi] = useState('');
  const [newPosTinggi, setNewPosTinggi] = useState(100);
  const [newPosStatus, setNewPosStatus] = useState<'Normal' | 'Waspada' | 'Siaga' | 'Awas'>('Normal');

  // New Kegiatan Form
  const [newKegiatanNama, setNewKegiatanNama] = useState('');
  const [newKegiatanLokasi, setNewKegiatanLokasi] = useState('');
  const [newKegiatanPetugas, setNewKegiatanPetugas] = useState('');
  const [newKegiatanTanggal, setNewKegiatanTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [newKegiatanStatus, setNewKegiatanStatus] = useState<'Rencana' | 'Jalan' | 'Selesai'>('Rencana');
  const [newKegiatanProgres, setNewKegiatanProgres] = useState(0);

  // Editing state tracker for Kegiatan
  const [editingKegiatanId, setEditingKegiatanId] = useState<string | null>(null);

  // ---- EDIT TRIGGER HANDLERS -----

  const handleEditKegiatanClick = (item: KegiatanOperasional) => {
    setEditingKegiatanId(item.id);
    setNewKegiatanNama(item.namaKegiatan);
    setNewKegiatanLokasi(item.lokasi);
    setNewKegiatanPetugas(item.petugas === 'Petugas Juru Pengairan' ? '' : item.petugas);
    setNewKegiatanTanggal(item.tanggalMulai);
    setNewKegiatanStatus(item.status);
    setNewKegiatanProgres(item.progres);
    setIsOpModalOpen(true);
  };

  const handleAddKegiatanTrigger = () => {
    setEditingKegiatanId(null);
    setNewKegiatanNama('');
    setNewKegiatanLokasi('');
    setNewKegiatanPetugas('');
    setNewKegiatanTanggal(new Date().toISOString().split('T')[0]);
    setNewKegiatanStatus('Rencana');
    setNewKegiatanProgres(0);
    setIsOpModalOpen(true);
  };

  const handleAddPos = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPosLokasi) return;

    const timeString = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) + `, ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    const newPos: DebitAir = {
      id: `pos-${Date.now()}`,
      lokasiPos: newPosLokasi,
      tinggiMukaAir: Number(newPosTinggi),
      status: newPosStatus,
      waktuTerakhir: timeString
    };

    setDebitList([...debitList, newPos]);
    setIsAddPosModalOpen(false);

    // Reset
    setNewPosLokasi('');
    setNewPosTinggi(100);
    setNewPosStatus('Normal');
  };

  const handleDeletePos = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus Pos Pemantauan Debit Air ini?')) {
      setDebitList(debitList.filter(pos => pos.id !== id));
    }
  };

  // Submit operations handlers
  const handleUpdateDebit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPosId) return;

    const timeString = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) + `, ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    setDebitList(debitList.map(pos => {
      if (pos.id === selectedPosId) {
        return {
          ...pos,
          tinggiMukaAir: Number(updatedTinggiAir),
          status: updatedStatus,
          waktuTerakhir: timeString
        };
      }
      return pos;
    }));

    setIsDebitModalOpen(false);
  };

  const handleCreateKegiatan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKegiatanNama || !newKegiatanLokasi) return;

    const newItem: KegiatanOperasional = {
      id: editingKegiatanId || `op-${Date.now()}`,
      namaKegiatan: newKegiatanNama,
      lokasi: newKegiatanLokasi,
      petugas: newKegiatanPetugas || 'Petugas Juru Pengairan',
      tanggalMulai: newKegiatanTanggal,
      status: newKegiatanStatus,
      progres: Number(newKegiatanStatus === 'Selesai' ? 100 : newKegiatanStatus === 'Rencana' ? 0 : newKegiatanProgres)
    };

    if (editingKegiatanId) {
      setOperasionalList(operasionalList.map(item => item.id === editingKegiatanId ? newItem : item));
    } else {
      setOperasionalList([newItem, ...operasionalList]);
    }

    setIsOpModalOpen(false);
    setEditingKegiatanId(null);

    // Reset Form
    setNewKegiatanNama('');
    setNewKegiatanLokasi('');
    setNewKegiatanPetugas('');
    setNewKegiatanTanggal(new Date().toISOString().split('T')[0]);
    setNewKegiatanStatus('Rencana');
    setNewKegiatanProgres(0);
  };

  // Change individual task status immediately (fast inline edit)
  const handleUpdateTaskStatus = (id: string, status: 'Rencana' | 'Jalan' | 'Selesai') => {
    setOperasionalList(operasionalList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status,
          progres: status === 'Selesai' ? 100 : status === 'Rencana' ? 0 : 50
        };
      }
      return item;
    }));
  };

  const handleDeleteKegiatan = (id: string) => {
    if (confirm('Hapus kegiatan operasional ini?')) {
      setOperasionalList(operasionalList.filter(item => item.id !== id));
    }
  };

  // Search filter
  const filteredKegiatan = operasionalList.filter(item => {
    const matchesSearch = item.namaKegiatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.petugas.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'Semua' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const isEditable = currentUser.role === 'admin';

  return (
    <div id="operasional-view" className="space-y-6">
      {/* Title block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">Operasional & Pemeliharaan (O&M)</span>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">Seksi Operasional</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manajemen duga debit air sungai utama dan pencatatan operasional juru pengairan.
          </p>
        </div>

        {/* Tab Switchers */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            id="op-tab-monitoring"
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
              activeSubTab === 'monitoring' 
                ? 'bg-white text-slate-800 shadow-xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => setActiveSubTab('monitoring')}
          >
            <Waves className="w-4.5 h-4.5" />
            <span>Debit Air Sungai Bah Bolon</span>
          </button>
          <button
            type="button"
            id="op-tab-kegiatan"
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
              activeSubTab === 'kegiatan' 
                ? 'bg-white text-slate-800 shadow-xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
            onClick={() => setActiveSubTab('kegiatan')}
          >
            <Wrench className="w-4.5 h-4.5" />
            <span>Kegiatan Pemeliharaan (O&M)</span>
          </button>
        </div>
      </div>

      {/* RENDER DEBIT AIR MONITOR */}
      {activeSubTab === 'monitoring' && (
        <div className="space-y-6">
          {/* Header Bar with Action Button */}
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200/50">
            <div>
              <h2 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Akurasi Pos Sensor Lapangan</h2>
              <p className="text-[10px] text-slate-500 mt-0.5">Pemantauan Tinggi Muka Air (TMA) real-time</p>
            </div>
            {isEditable && (
              <button
                type="button"
                onClick={() => setIsAddPosModalOpen(true)}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Pos Baru</span>
              </button>
            )}
          </div>

          {/* Pos Gauges Bento Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {debitList.map((pos) => {
              let alertStyle = {
                bg: 'bg-emerald-50 border-emerald-100/50',
                text: 'text-emerald-800',
                indicator: 'bg-emerald-500 text-white border-emerald-100',
                titleColor: 'text-emerald-500'
              };

              if (pos.status === 'Waspada') {
                alertStyle = {
                  bg: 'bg-amber-50 border-amber-100/50',
                  text: 'text-amber-800',
                  indicator: 'bg-amber-500 text-white border-amber-100',
                  titleColor: 'text-amber-500'
                };
              } else if (pos.status === 'Siaga' || pos.status === 'Awas') {
                alertStyle = {
                  bg: 'bg-rose-50 border-rose-100/50',
                  text: 'text-rose-800',
                  indicator: 'bg-rose-500 text-white border-rose-100',
                  titleColor: 'text-rose-500'
                };
              }

              return (
                <div key={pos.id} className={`p-6 rounded-2xl border ${alertStyle.bg} shadow-xs flex flex-col justify-between h-56 transition-all`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border ${alertStyle.indicator}`}>
                          Status: {pos.status}
                        </span>
                        {isEditable && (
                          <button
                            type="button"
                            onClick={() => handleDeletePos(pos.id)}
                            className="text-slate-400 hover:text-rose-600 transition p-[1px] rounded"
                            title="Hapus Pos"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-800 mt-3">{pos.lokasiPos}</h3>
                    </div>
                    <Waves className={`w-6 h-6 shrink-0 ${pos.status === 'Normal' ? 'text-sky-400' : pos.status === 'Waspada' ? 'text-amber-400 animate-bounce' : 'text-rose-400 animate-pulse'}`} />
                  </div>

                  <div className="my-3">
                    <p className="text-3xl font-black text-slate-800 tracking-tight">
                      {pos.tinggiMukaAir} <span className="text-sm font-medium text-slate-500">cm (Muka Air)</span>
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">Pembacaan sensor hulu/meteran</p>
                  </div>

                  <div className="border-t border-slate-200/40 pt-3 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 truncate" title={pos.waktuTerakhir}>
                      Upd: {pos.waktuTerakhir}
                    </span>
                    {isEditable && (
                      <button
                        onClick={() => {
                          setSelectedPosId(pos.id);
                          setUpdatedTinggiAir(pos.tinggiMukaAir);
                          setUpdatedStatus(pos.status);
                          setIsDebitModalOpen(true);
                        }}
                        className="text-xs font-bold text-slate-800 hover:text-blue-600 transition underline shrink-0"
                      >
                        Kalibrasi
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Safety measures block */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex gap-4 items-start">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">Prosedur Kesiapsiagaan Banjir Bah Bolon</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                  Bah Bolon memiliki karakter hidrologi yang tanggap cepat terhadap curah hujan di kawasan hulu Simalungun dan Pematangsiantar. Apabila tinggi muka air (TMA) pada Pos II Kerasaan mencapai &gt; 180cm, Unit Reaksi Cepat Seksi Operasional segera mengaktifkan koordinasi pintu limpasan air ke Daerah Irigasi Bah Bolon Kanan mencegah erosi tanggul utama.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-[11px] font-medium">
              <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-100/50 rounded-xl">
                <strong>Normal (&lt;150cm)</strong><br />
                Pintu air dibuka normal untuk pengairan sawah warga.
              </div>
              <div className="p-3 bg-amber-50 text-amber-800 border border-amber-100/50 rounded-xl">
                <strong>Waspada (150-200cm)</strong><br />
                Patroli tanggul setiap 4 jam sekali oleh juru pengairan.
              </div>
              <div className="p-3 bg-orange-50 text-orange-850 border border-orange-100/50 rounded-xl">
                <strong>Siaga (200-300cm)</strong><br />
                Persiapan kantong pasir penahan tanggul roboh.
              </div>
              <div className="p-3 bg-rose-50 text-rose-800 border border-rose-100/50 rounded-xl">
                <strong>Awas (&gt;300cm)</strong><br />
                Evakuasi warga bantaran dan sirene peringatan dini diaktifkan.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENDER KEGIATAN PEMELIHARAAN (O&M) */}
      {activeSubTab === 'kegiatan' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3 flex-grow">
              {/* Search text */}
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-xs"
                  placeholder="Cari kegiatan, lokasi, atau nama petugas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Status Select Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  className="border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-600 bg-white"
                  value={filterStatus}
                  onChange={(e: any) => setFilterStatus(e.target.value)}
                >
                  <option value="Semua">Semua Status</option>
                  <option value="Rencana">Rencana Kegiatan</option>
                  <option value="Jalan">Sedang Berjalan</option>
                  <option value="Selesai">Telah Selesai</option>
                </select>
              </div>
            </div>

            {/* Create new Task */}
            {isEditable ? (
              <button
                type="button"
                id="btn-add-op"
                onClick={handleAddKegiatanTrigger}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition"
              >
                <Plus className="w-4.5 h-4.5" />
                <span>Tambahkan Kegiatan O&M</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-amber-50 px-3.5 py-1.5 rounded-xl text-[10px] text-amber-800 border border-amber-100">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Format update dibatasi hanya untuk Administrator</span>
              </div>
            )}
          </div>

          {/* Activities list list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredKegiatan.length > 0 ? (
              filteredKegiatan.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between gap-4">
                  <div className="flex justify-between items-start gap-3">
                    <div className="min-w-0">
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        item.status === 'Selesai' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                          : item.status === 'Jalan' 
                          ? 'bg-sky-50 text-sky-700 border border-sky-100 animate-pulse' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.status}
                      </span>
                      <h3 className="text-xs font-bold text-slate-800 mt-2.5 leading-snug">{item.namaKegiatan}</h3>
                    </div>
                    {isEditable && (
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleEditKegiatanClick(item)}
                          className="p-1 text-slate-400 hover:text-blue-500 rounded hover:bg-blue-50 transition"
                          title="Ubah Rincian Kegiatan"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteKegiatan(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded hover:bg-rose-50 transition"
                          title="Hapus Kegiatan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-500 space-y-1">
                    <p><strong className="text-slate-600">Lokasi:</strong> {item.lokasi}</p>
                    <p><strong className="text-slate-600">Pelaksana Juru:</strong> {item.petugas}</p>
                    <p><strong className="text-slate-600">Tanggal Mulai:</strong> {item.tanggalMulai}</p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500">
                      <span>Progres Operasional</span>
                      <span>{item.progres}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          item.status === 'Selesai' ? 'bg-emerald-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${item.progres}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Operational Interactive Action buttons for testing template */}
                  {isEditable && item.status !== 'Selesai' && (
                    <div className="flex justify-end gap-1.5 pt-2 border-t border-slate-100 text-[10px] font-bold">
                      {item.status === 'Rencana' ? (
                        <button
                          type="button"
                          onClick={() => handleUpdateTaskStatus(item.id, 'Jalan')}
                          className="flex items-center gap-1 text-blue-600 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg"
                        >
                          <Play className="w-3 h-3" /> Memulai Pekerjaan
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleUpdateTaskStatus(item.id, 'Selesai')}
                          className="flex items-center gap-1 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg"
                        >
                          <CheckCircle className="w-3 h-3" /> Menyelesaikan Kerja
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-2 bg-white rounded-2xl p-8 border border-dashed border-slate-200 text-center text-slate-400">
                <ClipboardList className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                <p className="font-semibold text-slate-500">Tidak ada agenda pemeliharaan.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL UPDATE TMA DEBIT AIR */}
      {isDebitModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-slate-100">
            <div className="bg-slate-900 text-white p-5">
              <h3 className="font-bold text-sm">Kalibrasi Alat Ukur / TMA</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Edit tinggi muka air sungai & duga pintu air</p>
            </div>

            <form onSubmit={handleUpdateDebit} className="p-6 space-y-4">
              <div>
                <label className="block text-[10.5px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Tinggi Muka Air (cm)</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={500}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                  value={updatedTinggiAir}
                  onChange={(e) => setUpdatedTinggiAir(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Status Pengawasan Air</label>
                <select
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 bg-white"
                  value={updatedStatus}
                  onChange={(e: any) => setUpdatedStatus(e.target.value)}
                >
                  <option value="Normal">Normal (Sawah Terairi Aman)</option>
                  <option value="Waspada">Waspada (Geliat Debit Air Naik)</option>
                  <option value="Siaga">Siaga (Meluap di Pintu Air Sekunder)</option>
                  <option value="Awas">Awas! (Bahaya Limpasan Banjir)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsDebitModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50"
                >
                  Urungkan
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700"
                >
                  Kalibrasi TMA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CREATE/EDIT KEGIATAN OP */}
      {isOpModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-100">
            <div className="bg-slate-900 text-white p-5">
              <h3 className="font-bold text-sm">
                {editingKegiatanId ? 'Ubah Rincian Agenda Pemeliharaan' : 'Tambahkan Agenda Pemeliharaan Baru'}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {editingKegiatanId ? 'Ubah data penugasan atau progres rincian kerja' : 'Penugasan mandiri pembersihan jaringan sungai'}
              </p>
            </div>

            <form onSubmit={handleCreateKegiatan} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama Kegiatan Pemeliharaan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pemangkasan Eceng Gondok Saluran Sekunder"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  value={newKegiatanNama}
                  onChange={(e) => setNewKegiatanNama(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Lokasi Kegiatan</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Saluran Tersier DI"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                    value={newKegiatanLokasi}
                    onChange={(e) => setNewKegiatanLokasi(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama Juru Pengair / Pelaksana</label>
                  <input
                    type="text"
                    placeholder="Nama Juru Pemelihara"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                    value={newKegiatanPetugas}
                    onChange={(e) => setNewKegiatanPetugas(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                   <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Tanggal Pelaksanaan</label>
                   <input
                     type="date"
                     required
                     className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                     value={newKegiatanTanggal}
                     onChange={(e) => setNewKegiatanTanggal(e.target.value)}
                   />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Status Kerja</label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-700"
                    value={newKegiatanStatus}
                    onChange={(e: any) => {
                      setNewKegiatanStatus(e.target.value);
                      if (e.target.value === 'Selesai') setNewKegiatanProgres(100);
                      if (e.target.value === 'Rencana') setNewKegiatanProgres(0);
                    }}
                  >
                    <option value="Rencana">Direncanakan (0%)</option>
                    <option value="Jalan">Sedang Berjalan</option>
                    <option value="Selesai">Selesai (100%)</option>
                  </select>
                </div>
              </div>

              {(newKegiatanStatus === 'Jalan' || editingKegiatanId) && newKegiatanStatus !== 'Selesai' && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Progres Pekerjaan ({newKegiatanProgres}%)</label>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    className="w-full accent-indigo-600 cursor-pointer"
                    value={newKegiatanProgres}
                    onChange={(e) => setNewKegiatanProgres(Number(e.target.value))}
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpModalOpen(false);
                    setEditingKegiatanId(null);
                  }}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700"
                >
                  {editingKegiatanId ? 'Simpan Perubahan' : 'Buat Penugasan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CREATION DEBIT AIR POS (CREATE) */}
      {isAddPosModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-slate-100">
            <div className="bg-slate-900 text-white p-5">
              <h3 className="font-bold text-sm">Tambah Pos Pemantauan Baru</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Daftarkan stasiun duga debit air irigasi baru</p>
            </div>

            <form onSubmit={handleAddPos} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama / Lokasi Pos Pemantau</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pos IV Kerasaan Hilir"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  value={newPosLokasi}
                  onChange={(e) => setNewPosLokasi(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Tinggi Muka Air Awal (cm)</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={500}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                  value={newPosTinggi}
                  onChange={(e) => setNewPosTinggi(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Status Pengawasan Awal</label>
                <select
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-700"
                  value={newPosStatus}
                  onChange={(e: any) => setNewPosStatus(e.target.value)}
                >
                  <option value="Normal">Normal</option>
                  <option value="Waspada">Waspada</option>
                  <option value="Siaga">Siaga</option>
                  <option value="Awas">Awas</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddPosModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50"
                >
                  Urungkan
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500"
                >
                  Daftarkan Pos
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
