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
  Edit,
  MapPin,
  Layers,
  FileText,
  Calendar,
  DollarSign,
  Briefcase,
  Layers3,
  ThumbsUp,
  XCircle,
  HelpCircle,
  Activity,
  Camera,
  Navigation,
  Eye,
  Map,
  X,
  Check
} from 'lucide-react';
import { User, KegiatanOperasional, DebitAir, InventarisDI, UsulKegiatan, BangunanPendukung } from '../types';

interface SeksiOperasionalProps {
  currentUser: User;
  operasionalList: KegiatanOperasional[];
  setOperasionalList: (list: KegiatanOperasional[]) => void;
  debitList: DebitAir[];
  setDebitList: (list: DebitAir[]) => void;
  activeTabOverride?: 'inventaris-di' | 'data-kegiatan' | 'progres-lapangan' | 'usul-kegiatan';
  onSubTabChange?: (tab: 'inventaris-di' | 'data-kegiatan' | 'progres-lapangan' | 'usul-kegiatan') => void;
  inventarisDiList: InventarisDI[];
  setInventarisDiList: (list: InventarisDI[]) => void;
  usulKegiatanList: UsulKegiatan[];
  setUsulKegiatanList: (list: UsulKegiatan[]) => void;
}

export default function SeksiOperasional({ 
  currentUser, 
  operasionalList, 
  setOperasionalList, 
  debitList, 
  setDebitList,
  activeTabOverride = 'inventaris-di',
  onSubTabChange,
  inventarisDiList,
  setInventarisDiList,
  usulKegiatanList,
  setUsulKegiatanList
}: SeksiOperasionalProps) {

  const activeSubTab = activeTabOverride;

  const handleTabChange = (tab: 'inventaris-di' | 'data-kegiatan' | 'progres-lapangan' | 'usul-kegiatan') => {
    if (onSubTabChange) {
      onSubTabChange(tab);
    }
  };

  // General state trackers
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('Semua');

  // Modal states
  const [isDiModalOpen, setIsDiModalOpen] = useState(false);
  const [isOpModalOpen, setIsOpModalOpen] = useState(false);
  const [isDebitModalOpen, setIsDebitModalOpen] = useState(false);
  const [isAddPosModalOpen, setIsAddPosModalOpen] = useState(false);
  const [isUsulModalOpen, setIsUsulModalOpen] = useState(false);

  // --- CRUD for 1: INVENTARIS DI ---
  const [editingDiId, setEditingDiId] = useState<string | null>(null);
  const [newDiNama, setNewDiNama] = useState('');
  const [newDiLuas, setNewDiLuas] = useState('');
  const [newDiPanjang, setNewDiPanjang] = useState('');
  const [newDiKewenangan, setNewDiKewenangan] = useState('Provinsi');
  const [newDiKeterangan, setNewDiKeterangan] = useState('');

  // States for multiple Bangunan Pendukung inside popup pendaftaran
  const [tempBangunanList, setTempBangunanList] = useState<BangunanPendukung[]>([]);
  const [bNama, setBNama] = useState('');
  const [bKategori, setBKategori] = useState('Pintu Air');
  const [bKondisi, setBKondisi] = useState<'Baik' | 'Rusak Ringan' | 'Rusak Berat'>('Baik');
  const [bLatitude, setBLatitude] = useState('');
  const [bLongitude, setBLongitude] = useState('');
  const [bPhotos, setBPhotos] = useState<string[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

  // States for viewing and displaying detailed bangunan pendukung of a DI
  const [selectedDiDetail, setSelectedDiDetail] = useState<InventarisDI | null>(null);

  const resetBangunanForm = () => {
    setBNama('');
    setBKategori('Pintu Air');
    setBKondisi('Baik');
    setBLatitude('');
    setBLongitude('');
    setBPhotos([]);
    setIsCameraActive(false);
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }
    setCameraStream(null);
  };

  const startCamera = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setCameraStream(stream);
      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera access failed", err);
      alert("Gagal mengakses kamera langsung. Pastikan Anda telah mengizinkan akses kamera pada peramban, atau gunakan fitur tombol 'Pilih File / Kamera Lapangan'.");
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
    }
    setCameraStream(null);
    setIsCameraActive(false);
  };

  const capturePhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    const video = document.getElementById('camera-preview') as HTMLVideoElement | null;
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setBPhotos(prev => [...prev, dataUrl]);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setBPhotos(prev => [...prev, reader.result]);
          }
        };
        reader.readAsDataURL(file as Blob);
      });
    }
  };

  const handleGetLocation = (e: React.MouseEvent) => {
    e.preventDefault();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setBLatitude(pos.coords.latitude.toFixed(6));
          setBLongitude(pos.coords.longitude.toFixed(6));
        },
        (err) => {
          console.error("GPS error", err);
          alert("Gagal mendapatkan lokasi GPS. Pastikan izin lokasi perangkat telah diaktifkan.");
        }
      );
    } else {
      alert("Sistem GPS tidak didukung oleh perangkat ini.");
    }
  };

  const handleAddBangunanToTemp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!bNama.trim()) {
      alert("Nama bangunan pendukung tidak boleh kosong!");
      return;
    }
    const nb: BangunanPendukung = {
      id: `b-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      nama: bNama,
      kategori: bKategori,
      kondisi: bKondisi,
      latitude: Number(bLatitude || 0),
      longitude: Number(bLongitude || 0),
      fotoList: bPhotos
    };
    setTempBangunanList(prev => [...prev, nb]);
    resetBangunanForm();
  };

  const handleRemoveBangunanFromTemp = (indexToRemove: number) => {
    setTempBangunanList(prev => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleAddDiTrigger = () => {
    setEditingDiId(null);
    setNewDiNama('');
    setNewDiLuas('');
    setNewDiPanjang('');
    setNewDiKewenangan('Provinsi');
    setNewDiKeterangan('');
    setTempBangunanList([]);
    resetBangunanForm();
    setIsDiModalOpen(true);
  };

  const handleEditDiClick = (di: InventarisDI) => {
    setEditingDiId(di.id);
    setNewDiNama(di.namaDI);
    setNewDiLuas(di.luasAreal.toString());
    setNewDiPanjang(di.panjangSaluran.toString());
    setNewDiKewenangan(di.statusKewenangan);
    setNewDiKeterangan(di.keterangan);
    setTempBangunanList(di.bangunanPendukung || []);
    resetBangunanForm();
    setIsDiModalOpen(true);
  };

  const handleCreateDi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiNama || !newDiLuas) return;

    const newItem: InventarisDI = {
      id: editingDiId || `di-${Date.now()}`,
      namaDI: newDiNama,
      luasAreal: Number(newDiLuas),
      panjangSaluran: Number(newDiPanjang || 0),
      jumlahBangunan: tempBangunanList.length, // sinkronkan dengan jumlah list bangunan pendukung
      statusKewenangan: newDiKewenangan,
      keterangan: newDiKeterangan,
      bangunanPendukung: tempBangunanList
    };

    if (editingDiId) {
      setInventarisDiList(inventarisDiList.map(item => item.id === editingDiId ? newItem : item));
    } else {
      setInventarisDiList([newItem, ...inventarisDiList]);
    }
    stopCamera();
    setIsDiModalOpen(false);
    setEditingDiId(null);
  };

  const handleDeleteDi = (id: string) => {
    if (confirm('Hapus rincian Daerah Irigasi (DI) ini dari daftar inventaris?')) {
      setInventarisDiList(inventarisDiList.filter(item => item.id !== id));
    }
  };

  // --- CRUD for 2: DATA KEGIATAN (O&M) ---
  const [newKegiatanNama, setNewKegiatanNama] = useState('');
  const [newKegiatanLokasi, setNewKegiatanLokasi] = useState('');
  const [newKegiatanPetugas, setNewKegiatanPetugas] = useState('');
  const [newKegiatanTanggal, setNewKegiatanTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [newKegiatanStatus, setNewKegiatanStatus] = useState<'Rencana' | 'Jalan' | 'Selesai'>('Rencana');
  const [newKegiatanProgres, setNewKegiatanProgres] = useState(0);
  const [editingKegiatanId, setEditingKegiatanId] = useState<string | null>(null);

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
  };

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
    if (confirm('Hapus agenda pemeliharaan O&M ini?')) {
      setOperasionalList(operasionalList.filter(item => item.id !== id));
    }
  };

  // --- CRUD for 3: PROGRES LAPANGAN (Debit Air TMA) ---
  const [selectedPosId, setSelectedPosId] = useState('');
  const [updatedTinggiAir, setUpdatedTinggiAir] = useState(100);
  const [updatedStatus, setUpdatedStatus] = useState<'Normal' | 'Waspada' | 'Siaga' | 'Awas'>('Normal');

  const [newPosLokasi, setNewPosLokasi] = useState('');
  const [newPosTinggi, setNewPosTinggi] = useState(100);
  const [newPosStatus, setNewPosStatus] = useState<'Normal' | 'Waspada' | 'Siaga' | 'Awas'>('Normal');

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
    setNewPosLokasi('');
    setNewPosTinggi(100);
    setNewPosStatus('Normal');
  };

  const handleUpdateDebitSubmit = (e: React.FormEvent) => {
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

  const handleDeletePos = (id: string) => {
    if (confirm('Hapus Pos Pemantauan Tinggi Air ini?')) {
      setDebitList(debitList.filter(pos => pos.id !== id));
    }
  };

  // --- CRUD for 4: USUL KEGIATAN (Proposals) ---
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
      id: editingUsulId || `uop-${Date.now()}`,
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
    if (confirm('Hapus rencana usulan kerja pemeliharaan ini?')) {
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
    <div id="operasional-view" className="space-y-6">
      
      {/* Upper header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">Pekerjaan & Data Lapangan UPTD</span>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">Seksi Operasional & Pemeliharaan SDA</h1>
          <p className="text-xs text-slate-500 mt-1">
            Data Daerah Irigasi, Pemeliharaan Daerah Irigasi, kegiatan O&amp;P, serta pendaftaran usulan kerja pemeliharaan.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap bg-slate-100 p-1 rounded-xl gap-0.5 scrollbar-thin">
          {[
            { id: 'inventaris-di', label: 'Inventaris DI', icon: Layers3 },
            { id: 'data-kegiatan', label: 'Data Kegiatan', icon: Wrench },
            { id: 'progres-lapangan', label: 'Progres Lapangan', icon: Waves },
            { id: 'usul-kegiatan', label: 'Usul Kegiatan', icon: FileText }
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

      {/* RENDER TAB 1: INVENTARIS DI */}
      {activeSubTab === 'inventaris-di' && (
        <div className="space-y-6 animate-fade-in-down">
          
          {/* Key stats row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest block">Total Daerah Irigasi</span>
              <p className="text-2xl font-black text-slate-800 mt-1">{inventarisDiList.length} D.I.</p>
              <p className="text-[10px] text-slate-400 mt-1">Terdaftar dalam kewenangan UPTD</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest block">Cakupan Luas Areal</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">
                {inventarisDiList.reduce((acc, di) => acc + di.luasAreal, 0).toLocaleString('id-ID')} Ha
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Suplesi aliran air produktif</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest block">Panjang Saluran Total</span>
              <p className="text-2xl font-black text-blue-600 mt-1">
                {inventarisDiList.reduce((acc, di) => acc + di.panjangSaluran, 0).toFixed(1)} Km
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Saluran primer & sekunder</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest block">Bangunan Pelengkap</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">
                {inventarisDiList.reduce((acc, di) => acc + di.jumlahBangunan, 0)} Unit
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Pintu air, sipon, bendung, takar</p>
            </div>
          </div>

          {/* Search bar and add button */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between gap-4 items-center">
            <div className="relative w-full sm:max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Cari Daerah Irigasi..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              id="btn-add-di"
              onClick={handleAddDiTrigger}
              className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Daerah Irigasi</span>
            </button>
          </div>

          {/* Table display */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    <th className="p-4">Nama Daerah Irigasi</th>
                    <th className="p-4">Luas Areal (Ha)</th>
                    <th className="p-4">Panjang Saluran</th>
                    <th className="p-4">Bangunan Pendukung</th>
                    <th className="p-4">Sektor Kewenangan</th>
                    <th className="p-4">Keterangan Teknis</th>
                    <th className="p-4 text-right">Opsi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
                  {inventarisDiList
                    .filter(di => di.namaDI.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((di) => (
                      <tr key={di.id} className="hover:bg-slate-50/70 transition">
                        <td className="p-4 font-bold text-slate-800 flex items-center gap-2">
                          <Layers3 className="w-4 h-4 text-indigo-500" />
                          {di.namaDI}
                        </td>
                        <td className="p-4 font-mono text-slate-700 font-bold">{di.luasAreal.toLocaleString('id-ID')} Ha</td>
                        <td className="p-4 font-mono">{di.panjangSaluran} Km</td>
                        <td className="p-4">
                          <button
                            type="button"
                            onClick={() => setSelectedDiDetail(di)}
                            className="text-left hover:underline group flex flex-col items-start bg-slate-50 hover:bg-indigo-50/40 p-2 rounded-xl border border-slate-100 transition-all cursor-pointer"
                          >
                            <span className="font-bold text-slate-800 font-mono flex items-center gap-1 group-hover:text-indigo-600 text-[11px]">
                              {di.bangunanPendukung && di.bangunanPendukung.length > 0
                                ? `${di.bangunanPendukung.length} Bangunan`
                                : `${di.jumlahBangunan || 0} Unit`}
                              <Eye className="w-3 text-slate-400 group-hover:text-indigo-500 transition" />
                            </span>
                            <span className="text-[9px] text-slate-400 font-semibold mt-0.5 whitespace-nowrap">
                              Detail & Peta Google Maps →
                            </span>
                          </button>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 text-[9px] bg-slate-100 text-slate-700 rounded font-extrabold uppercase tracking-wider">
                            {di.statusKewenangan}
                          </span>
                        </td>
                        <td className="p-4 text-[11px] text-slate-500 max-w-[240px] truncate" title={di.keterangan}>
                          {di.keterangan || '-'}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedDiDetail(di)}
                              className="p-1 px-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-[10.5px] font-bold flex items-center gap-1 transition"
                              title="Lihat Detail Bangunan"
                            >
                              <Eye className="w-3.5 h-3.5" /> Detail
                            </button>
                            {isEditable && (
                              <>
                                <button
                                  onClick={() => handleEditDiClick(di)}
                                  className="p-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10.5px] font-bold flex items-center gap-1 transition"
                                  title="Ubah Rincian"
                                >
                                  <Edit className="w-3 h-3" /> Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteDi(di.id)}
                                  className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition"
                                  title="Hapus"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RENDER TAB 2: DATA KEGIATAN (O&M Activities) */}
      {activeSubTab === 'data-kegiatan' && (
        <div className="space-y-6 animate-fade-in-down">
          
          {/* Filter box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:max-w-xl">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  placeholder="Cari kegiatan pemeliharaan..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  className="border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 bg-white"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="Semua">Semua Status O&M</option>
                  <option value="Rencana">Rencana Konstruksi</option>
                  <option value="Jalan">Sedang Berjalan</option>
                  <option value="Selesai">Pekerjaan Rampung</option>
                </select>
              </div>
            </div>

            <button
              id="btn-add-kegiatan"
              onClick={handleAddKegiatanTrigger}
              className="w-full md:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shrink-0"
            >
              <Plus className="w-4.5 h-4.5" />
              <span>Daftar Kegiatan O&M</span>
            </button>
          </div>

          {/* Activities list card layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {operasionalList
              .filter(item => {
                const matchesSearch = item.namaKegiatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                      item.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                      item.petugas.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesStatus = filterStatus === 'Semua' || item.status === filterStatus;
                return matchesSearch && matchesStatus;
              })
              .map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        item.status === 'Selesai' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : item.status === 'Jalan' 
                          ? 'bg-blue-105 bg-blue-100 text-blue-800 animate-pulse' 
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {item.tanggalMulai}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-800 leading-snug">{item.namaKegiatan}</h3>
                    <div className="space-y-1 text-xs text-slate-500">
                      <p><strong className="text-slate-600">Lokasi:</strong> {item.lokasi}</p>
                      <p><strong className="text-slate-600">Pelaksana Juru:</strong> {item.petugas}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex-1 max-w-[150px] mr-4">
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
                        <span>Fisik:</span>
                        <strong>{item.progres}%</strong>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-300 ${item.status === 'Selesai' ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                          style={{ width: `${item.progres}%` }}
                        ></div>
                      </div>
                    </div>

                    {isEditable && (
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => handleEditKegiatanClick(item)}
                          className="px-2.5 py-1 bg-slate-55 bg-slate-50 hover:bg-slate-100 rounded-lg text-[10px] font-bold text-slate-700 flex items-center gap-1 transition"
                          title="Edit"
                        >
                          <Edit className="w-3 h-3" /> Ubah
                        </button>
                        <button
                          onClick={() => handleDeleteKegiatan(item.id)}
                          className="p-1 px-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition"
                          title="Hapus"
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

      {/* RENDER TAB 3: PROGRES LAPANGAN (Debit TMA Stations) */}
      {activeSubTab === 'progres-lapangan' && (
        <div className="space-y-6 animate-fade-in-down">
          
          <div className="bg-amber-50 px-4 py-3 rounded-2xl text-xs text-amber-900 border border-amber-100 flex items-start gap-2 max-w-3xl">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold">Pemantau Siaga Debit Air Provinsi - Wilayah Bah Bolon</p>
              <p className="text-[11px] text-amber-800/90 mt-0.5">
                Elevasi tinggi muka air diatur manual oleh petugas bendung di masing-masing titik duga guna mengantisipasi banjir bandang (luapan air hulu).
              </p>
            </div>
          </div>

          {/* Pos action header */}
          <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Daftar Stasiun Duga TMA</h3>
            
            {isEditable && (
              <button
                id="btn-add-pos"
                onClick={() => setIsAddPosModalOpen(true)}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Pendaftaran Pos Baru</span>
              </button>
            )}
          </div>

          {/* Pos list grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {debitList.map((pos) => {
              const statusColorMap = {
                'Normal': 'bg-emerald-50 border-emerald-100 text-emerald-800',
                'Waspada': 'bg-amber-50 border-amber-100 text-amber-800',
                'Siaga': 'bg-orange-50 border-orange-100 text-orange-850',
                'Awas': 'bg-rose-50 border-rose-100 text-rose-800'
              }[pos.status] || 'bg-slate-50 border-slate-100 text-slate-700';

              const progressPct = Math.min((pos.tinggiMukaAir / 350) * 100, 100);

              return (
                <div key={pos.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
                  <div className="p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-widest flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {pos.lokasiPos.split(' ')[1] || 'Bah Bolon'}
                      </span>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${statusColorMap}`}>
                        {pos.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-extrabold text-slate-800">{pos.lokasiPos}</h4>
                      <div className="flex items-baseline gap-1 mt-2">
                        <span className="text-3xl font-black text-slate-900 font-mono tracking-tight">{pos.tinggiMukaAir}</span>
                        <span className="text-xs text-slate-400 font-bold font-mono">cm</span>
                      </div>
                    </div>

                    {/* Progress curve bar */}
                    <div className="space-y-1">
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-2.5 rounded-full transition-all duration-500 ${
                            pos.status === 'Awas' ? 'bg-rose-500' : pos.status === 'Siaga' ? 'bg-orange-500' : pos.status === 'Waspada' ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${progressPct}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[8px] text-slate-400 font-mono">
                        <span>0m (Kering)</span>
                        <span>3.5m (Kritis)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[9px] text-slate-400 font-medium flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                      {pos.waktuTerakhir}
                    </span>

                    {isEditable && (
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setSelectedPosId(pos.id);
                            setUpdatedTinggiAir(pos.tinggiMukaAir);
                            setUpdatedStatus(pos.status);
                            setIsDebitModalOpen(true);
                          }}
                          className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 flex items-center gap-0.5 transition"
                        >
                          <Edit className="w-3 h-3" /> Kalibrasi
                        </button>
                        <button
                          onClick={() => handleDeletePos(pos.id)}
                          className="p-1 px-1.5 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* RENDER TAB 4: USUL KEGIATAN */}
      {activeSubTab === 'usul-kegiatan' && (
        <div className="space-y-6 animate-fade-in-down">
          
          {/* Key stats row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest block">Total Usul O&M</span>
              <p className="text-2xl font-black text-slate-800 mt-1">{usulKegiatanList.length} Proposal</p>
              <p className="text-[10px] text-slate-400 mt-1">Diusulkan oleh Juru / GP3A</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest block">Total Estimasi Kebutuhan</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">
                {formatRupiah(usulKegiatanList.reduce((acc, u) => acc + u.estimasiBiaya, 0))}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Estimasi rincian anggaran usul</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest block">Level Prioritas Tinggi</span>
              <p className="text-2xl font-black text-rose-500 mt-1">
                {usulKegiatanList.filter(u => u.skalaPrioritas === 'Tinggi').length} Usulan
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Memerlukan disposisi cepat</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest block">Usulan Disetujui</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">
                {usulKegiatanList.filter(u => u.statusAproval === 'Disetujui').length} Proyek
              </p>
              <p className="text-[10px] text-slate-400 mt-1">Pindah ke antrean pengerjaan fizikal</p>
            </div>
          </div>

          {/* Actions bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between gap-4 items-center">
            <div className="relative w-full sm:max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Cari kerja usulan..."
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
              <span>Usul Kegiatan Baru</span>
            </button>
          </div>

          {/* Proposals display lists */}
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
                        <span className="text-[10px] text-slate-450 text-slate-400 font-mono flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Diajukan: {u.tanggalUsulan}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-800 leading-snug">{u.namaPekerjaan}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-500">
                        <p><strong className="text-slate-600">Lokasi:</strong> {u.lokasi}</p>
                        <p><strong className="text-slate-600">Pengusul:</strong> {u.diusulkanOleh}</p>
                      </div>
                      {u.keterangan && <p className="text-[11px] text-slate-400 italic">" {u.keterangan} "</p>}
                    </div>

                    <div className="flex flex-col items-start lg:items-end bg-slate-50 border border-slate-100 p-4 rounded-xl min-w-[200px]">
                      <span className="text-[9px] uppercase font-extrabold text-slate-450 text-slate-400 tracking-wider">Estimasi Biaya O&M</span>
                      <p className="text-base font-black text-slate-850 text-slate-800 font-mono mt-0.5">{formatRupiah(u.estimasiBiaya)}</p>

                      {isEditable && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          <button
                            onClick={() => handleUpdateUsulApproval(u.id, 'Disetujui')}
                            className="p-1 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-[9.5px] font-extrabold flex items-center gap-0.5"
                          >
                            <CheckCircle className="w-3 h-3" /> Setujui
                          </button>
                          <button
                            onClick={() => handleUpdateUsulApproval(u.id, 'Ditangguhkan')}
                            className="p-1 px-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-[9.5px] font-extrabold flex items-center gap-0.5"
                          >
                            <XCircle className="w-3 h-3" /> Tangguhkan
                          </button>
                          <button
                            onClick={() => handleEditUsulClick(u)}
                            className="p-1 px-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-705 text-slate-700 rounded-lg text-[9.5px] font-extrabold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUsul(u.id)}
                            className="p-1 px-1.5 bg-white border border-slate-200 text-rose-600 rounded-lg hover:border-rose-300"
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

      {/* 1: DIALOG INVENTARIS DI */}
      {isDiModalOpen && (
        <div className="fixed inset-0 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden border border-slate-100 flex flex-col animate-scale-up">
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center shrink-0">
              <div>
                <h3 className="font-extrabold text-sm">
                  {editingDiId ? 'Ubah Rincian Daerah Irigasi' : 'Pendaftaran Daerah Irigasi (D.I.) Baru'}
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Lengkapi data teknis dan daftar bangunan pendukung</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  setIsDiModalOpen(false);
                }}
                className="text-slate-400 hover:text-white transition p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* SEKTOR KIRI: DATA UTAMA DI */}
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b pb-1.5 flex items-center gap-1.5">
                    <Layers3 className="w-4 h-4 text-indigo-500" />
                    1. Rincian Daerah Irigasi
                  </h4>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nama Daerah Irigasi (D.I.)</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: D.I. Bah Bolon Utama"
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                      value={newDiNama}
                      onChange={(e) => setNewDiNama(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Luas Areal (Ha)</label>
                      <input
                        type="number"
                        required
                        min={1}
                        placeholder="Contoh: 1500"
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                        value={newDiLuas}
                        onChange={(e) => setNewDiLuas(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Panjang Saluran (Km)</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="Contoh: 12.5"
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                        value={newDiPanjang}
                        onChange={(e) => setNewDiPanjang(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Status Kewenangan</label>
                    <select
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                      value={newDiKewenangan}
                      onChange={(e) => setNewDiKewenangan(e.target.value)}
                    >
                      <option value="Provinsi">Provinsi</option>
                      <option value="Pusat">Pusat / APBN</option>
                      <option value="Kabupaten">Kabupaten</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Keterangan Teknis Lapangan</label>
                    <textarea
                      placeholder="Kondisi aliran, catatan suplesi atau limpahan..."
                      rows={4}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                      value={newDiKeterangan}
                      onChange={(e) => setNewDiKeterangan(e.target.value)}
                    />
                  </div>
                </div>

                {/* SEKTOR KANAN: BANGUNAN PENDUKUNG (MULTIPLE ENTRIES) */}
                <div className="space-y-4 md:border-l md:pl-6 border-slate-100">
                  <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b pb-1.5 flex items-center justify-between gap-1.5">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-indigo-500" />
                      2. Bangunan Pendukung
                    </span>
                    <span className="bg-indigo-100 text-indigo-800 text-[10px] px-2 py-0.5 rounded-full font-extrabold font-mono">
                      {tempBangunanList.length} Bangunan
                    </span>
                  </h4>

                  {/* List of currently added supporting structures */}
                  {tempBangunanList.length > 0 ? (
                    <div className="space-y-2 max-h-36 overflow-y-auto pr-1 border border-slate-100 p-2 rounded-xl bg-slate-50">
                      {tempBangunanList.map((bg, index) => (
                        <div key={bg.id} className="bg-white p-2.5 rounded-lg border border-slate-150 flex items-center justify-between text-xs shadow-3xs">
                          <div className="space-y-0.5">
                            <div className="font-bold text-slate-800 flex items-center gap-1.5">
                              <span className="text-[9px] px-1.5 py-0.2 bg-indigo-50 text-indigo-700 font-extrabold uppercase rounded">{bg.kategori}</span>
                              {bg.nama}
                            </div>
                            <div className="text-[9.5px] text-slate-400 flex items-center gap-2">
                              <span>Kondisi: <strong className="text-slate-600">{bg.kondisi}</strong></span>
                              {bg.latitude && bg.longitude ? (
                                <span className="font-mono text-indigo-600">[{bg.latitude}, {bg.longitude}]</span>
                              ) : null}
                              {bg.fotoList.length > 0 && (
                                <span className="text-slate-500 font-bold flex items-center gap-0.5"><Camera className="w-3 h-3 text-slate-400" /> {bg.fotoList.length} foto</span>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveBangunanFromTemp(index)}
                            className="p-1 hover:bg-rose-50 text-rose-500 hover:text-rose-700 rounded-md transition cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-4 text-center border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs bg-slate-50/50">
                      Belum ada bangunan pendukung. Tambahkan di bawah ini.
                    </div>
                  )}

                  {/* Subform to append a single supporting structure */}
                  <div className="bg-indigo-50/45 p-4 rounded-xl border border-indigo-100/50 space-y-3">
                    <span className="block text-[10px] font-black text-indigo-950 uppercase tracking-widest">Formulir Tambah Bangunan</span>

                    <div>
                      <input
                        type="text"
                        placeholder="Nama Bangunan (contoh: Pintu Sadap Sekunder)"
                        className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none"
                        value={bNama}
                        onChange={(e) => setBNama(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Kategori</label>
                        <select
                          className="w-full border border-slate-200 bg-white rounded-lg px-2 py-1.5 text-xs text-slate-700 focus:outline-none"
                          value={bKategori}
                          onChange={(e) => setBKategori(e.target.value)}
                        >
                          <option value="Pintu Air">Pintu Air</option>
                          <option value="Bendung / Intake">Bendung / Intake</option>
                          <option value="Alat Ukur Debit">Alat Ukur Debit</option>
                          <option value="Sipon & Talang">Sipon & Talang</option>
                          <option value="Gorong-gorong">Gorong-gorong</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Kondisi</label>
                        <select
                          className="w-full border border-slate-200 bg-white rounded-lg px-2 py-1.5 text-xs text-slate-700 focus:outline-none"
                          value={bKondisi}
                          onChange={(e) => setBKondisi(e.target.value as any)}
                        >
                          <option value="Baik">Baik</option>
                          <option value="Rusak Ringan">Rusak Ringan</option>
                          <option value="Rusak Berat">Rusak Berat</option>
                        </select>
                      </div>
                    </div>

                    {/* Coordinates Section with GPS trigger and Maps validation */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Koordinat Google Maps</label>
                        <button
                          type="button"
                          onClick={handleGetLocation}
                          className="text-[9.5px] font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-0.5 transition cursor-pointer"
                          title="Gunakan GPS internal"
                        >
                          <Navigation className="w-3.5 h-3.5 text-indigo-600" /> Ambil GPS Perangkat
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          step="0.000001"
                          placeholder="Latitude (Lintang)"
                          className="w-full border border-slate-200 bg-white rounded-lg px-2 py-1.5 text-xs font-mono focus:outline-none"
                          value={bLatitude}
                          onChange={(e) => setBLatitude(e.target.value)}
                        />
                        <input
                          type="number"
                          step="0.000001"
                          placeholder="Longitude (Bujur)"
                          className="w-full border border-slate-200 bg-white rounded-lg px-2 py-1.5 text-xs font-mono focus:outline-none"
                          value={bLongitude}
                          onChange={(e) => setBLongitude(e.target.value)}
                        />
                      </div>
                      {bLatitude && bLongitude ? (
                        <div className="text-[10px] text-emerald-600 flex items-center gap-1 font-bold">
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          Terintegrasi!
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${bLatitude},${bLongitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto underline text-indigo-600 hover:text-indigo-800 font-extrabold"
                          >
                            Buka di Maps →
                          </a>
                        </div>
                      ) : null}
                    </div>

                    {/* CAMERA INTEGRATION */}
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Kamera Terintegrasi Kamera Perangkat</label>
                      
                      {isCameraActive ? (
                        <div className="space-y-2">
                          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-250 shadow-inner">
                            <video
                              id="camera-preview"
                              autoPlay
                              playsInline
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-slate-900/80 px-2 py-0.5 rounded text-[8.5px] font-mono text-emerald-400 uppercase tracking-widest animate-pulse">
                              LIVE CAMERA ACTIVE
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={capturePhoto}
                              className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-black tracking-wider uppercase transition flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <Camera className="w-4 h-4" /> Jepret Foto
                            </button>
                            <button
                              type="button"
                              onClick={stopCamera}
                              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-[10px] font-black transition cursor-pointer"
                            >
                              Tutup Stream
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            type="button"
                            onClick={startCamera}
                            className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition cursor-pointer"
                          >
                            <Camera className="w-3.5 h-3.5" /> Ambil Kamera Live
                          </button>
                          <label className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition border border-slate-200 cursor-pointer text-center">
                            <Camera className="w-3.5 h-3.5" /> Pilih File / Galeri
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              capture="environment"
                              className="hidden"
                              onChange={handleFileUpload}
                            />
                          </label>
                        </div>
                      )}

                      {/* Captured Photos Thumbnail Flexstrip */}
                      {bPhotos.length > 0 && (
                        <div className="space-y-1 pt-1.5">
                          <span className="block text-[9px] font-bold text-slate-500 uppercase">Daftar Foto yang Diambil ({bPhotos.length}):</span>
                          <div className="flex gap-2.5 overflow-x-auto py-1 pr-1 scrollbar-thin">
                            {bPhotos.map((photo, pIdx) => (
                              <div key={pIdx} className="relative w-12 h-12 rounded-lg overflow-hidden border bg-black shrink-0">
                                <img
                                  src={photo}
                                  alt="Jepretan"
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                                <button
                                  type="button"
                                  onClick={() => setBPhotos(prev => prev.filter((_, i) => i !== pIdx))}
                                  className="absolute top-0 right-0 p-0.5 bg-slate-900/80 text-white rounded-bl hover:bg-rose-650 transition cursor-pointer"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Add supporting building to parent DI temporary array */}
                    <button
                      type="button"
                      onClick={handleAddBangunanToTemp}
                      className="w-full py-2 bg-indigo-650 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-3xs"
                    >
                      <Plus className="w-4 h-4" /> Tambahkan ke Daftar Bangunan
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  setIsDiModalOpen(false);
                }}
                className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleCreateDi}
                className="px-5 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 cursor-pointer transition shadow-xs"
              >
                {editingDiId ? 'Simpan Perubahan DI' : 'Daftarkan DI'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1.5: DIALOG DETAIL BANGUNAN PENDUKUNG (GOOGLE MAPS COORD & PHOTO GALLERY INTEGRATED) */}
      {selectedDiDetail && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans animate-fade-in animate-duration-250">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-slate-100 flex flex-col">
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center shrink-0">
              <div>
                <h3 className="font-extrabold text-sm">{selectedDiDetail.namaDI}</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Rincian Bangunan Pendukung & Koordinat Terintegrasi dengan Google Maps</p>
              </div>
              <button
                onClick={() => setSelectedDiDetail(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
              <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="block text-[9px] text-slate-400 uppercase font-black">Luas Sektor Ha</span>
                  <span className="font-extrabold font-mono text-slate-800">{selectedDiDetail.luasAreal} Ha</span>
                </div>
                <div>
                  <span className="block text-[9px] text-slate-400 uppercase font-black">Panjang Saluran</span>
                  <span className="font-extrabold font-mono text-slate-800">{selectedDiDetail.panjangSaluran} Km</span>
                </div>
                <div>
                  <span className="block text-[9px] text-slate-400 uppercase font-black">Status Kewenangan</span>
                  <span className="font-extrabold text-slate-800 uppercase tracking-wider">{selectedDiDetail.statusKewenangan}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-3 border-b pb-1">Daftar Jaringan Bangunan Pendukung ({selectedDiDetail.bangunanPendukung?.length || 0})</h4>
                
                {!selectedDiDetail.bangunanPendukung || selectedDiDetail.bangunanPendukung.length === 0 ? (
                  <div className="p-8 text-center border-2 border-dashed border-slate-150 rounded-2xl text-slate-400 text-xs">
                    <MapPin className="w-8 h-8 mx-auto text-slate-300 mb-2 animate-pulse" />
                    Belum ada data bangunan pendukung terdaftar untuk Daerah Irigasi ini.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedDiDetail.bangunanPendukung.map((b, idx) => (
                      <div key={b.id || idx} className="border border-slate-150 bg-white shadow-xs rounded-xl p-4 hover:border-indigo-200 hover:shadow-xs transition-all">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                          <div>
                            <h5 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                              <span className="p-1 px-1.5 bg-indigo-50 text-indigo-700 rounded text-[9px] font-black uppercase tracking-wider">{b.kategori}</span>
                              {b.nama}
                            </h5>
                          </div>
                          
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            b.kondisi === 'Baik' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                            b.kondisi === 'Rusak Ringan' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                            'bg-rose-50 text-rose-700 border border-rose-100'
                          }`}>
                            Kondisi: {b.kondisi}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2 flex flex-col justify-between">
                            <div>
                              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Koordinat Terpasang</div>
                              <div className="font-mono text-[10.5px] text-slate-800 font-bold flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                                {b.latitude ? b.latitude.toFixed(6) : '0.000000'}, {b.longitude ? b.longitude.toFixed(6) : '0.000000'}
                              </div>
                            </div>

                            {b.latitude && b.longitude ? (
                              <div className="space-y-2 pt-2 border-t border-slate-200">
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${b.latitude},${b.longitude}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-[10px] flex items-center justify-center gap-1 transition"
                                >
                                  <Navigation className="w-3.5 h-3.5 text-indigo-300" /> Buka di Google Maps Baru
                                </a>
                                <iframe
                                  title={`Map-Embed-${idx}`}
                                  width="100%"
                                  height="100"
                                  className="rounded-lg border border-slate-200 shadow-3xs"
                                  loading="lazy"
                                  src={`https://maps.google.com/maps?q=${b.latitude},${b.longitude}&z=15&output=embed`}
                                />
                              </div>
                            ) : (
                              <div className="text-[10px] text-slate-400 italic">Koordinat tidak disematkan</div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Dokumentasi Foto Perangkat ({b.fotoList?.length || 0})</div>
                            
                            {!b.fotoList || b.fotoList.length === 0 ? (
                              <div className="h-28 bg-slate-100 border border-slate-150 rounded-lg flex flex-col items-center justify-center text-slate-400 p-2">
                                <Camera className="w-6 h-6 text-slate-300 mb-1" />
                                <span className="text-[10px]">Belum ada foto yang diambil</span>
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto pr-1">
                                {b.fotoList.map((foto, fIdx) => (
                                  <div key={fIdx} className="relative aspect-video rounded-lg overflow-hidden border bg-black group/img">
                                    <img
                                      src={foto}
                                      alt="Foto Bangunan"
                                      className="w-full h-full object-cover group-hover/img:scale-110 transition duration-300"
                                      referrerPolicy="no-referrer"
                                    />
                                    <a
                                      href={foto}
                                      download={`foto-bangunan-${idx}-${fIdx}.jpg`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-[9px] text-white transition font-bold"
                                    >
                                      Ambil Berkas
                                    </a>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedDiDetail(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2: DIALOG CRUD KEGIATAN O&M */}
      {isOpModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-100">
            <div className="bg-slate-900 text-white p-5">
              <h3 className="font-bold text-sm">
                {editingKegiatanId ? 'Ubah Rincian Agenda Pemeliharaan' : 'Tambahkan Agenda Pemeliharaan Baru'}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Penugasan mandiri pembersihan jaringan sungai</p>
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
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama Pelaksana / Juru</label>
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
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50 animate-fade-in"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 font-sens"
                >
                  {editingKegiatanId ? 'Simpan' : 'Buat Agenda'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3: DIALOG UPDATING TMA TMA */}
      {isDebitModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-slate-100">
            <div className="bg-slate-900 text-white p-5">
              <h3 className="font-bold text-sm">Kalibrasi Alat Ukur / TMA</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Edit tinggi muka air sungai & duga pintu air</p>
            </div>

            <form onSubmit={handleUpdateDebitSubmit} className="p-6 space-y-4">
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
                  <option value="Normal">Normal (Aman)</option>
                  <option value="Waspada">Waspada (Elevasi Meningkat)</option>
                  <option value="Siaga">Siaga (Luapan Rawan)</option>
                  <option value="Awas">Awas (Banjir Ekstrem)</option>
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500"
                >
                  Kalibrasi Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4: DIALOG ADDING NEW TMA POS */}
      {isAddPosModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden border border-slate-100">
            <div className="bg-slate-900 text-white p-5">
              <h3 className="font-bold text-sm">Tambah Pos Pemantauan Baru</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Daftarkan stasiun duga pintu air baru</p>
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

      {/* 5: DIALOG USUL KEGIATAN */}
      {isUsulModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 font-sans animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-100">
            <div className="bg-slate-900 text-white p-5">
              <h3 className="font-bold text-sm">
                {editingUsulId ? 'Ubah Rincian Usul Kegiatan' : 'Form Pengajuan Usul Kegiatan O&M'}
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Pengajuan rehabilitasi/pemeliharaan rutin tanggul irigasi</p>
            </div>

            <form onSubmit={handleCreateUsul} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Nama Pekerjaan O&M Yang Diusulkan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pembersihan sedimentasi lumpur primer"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2"
                  value={newUsulPekerjaan}
                  onChange={(e) => setNewUsulPekerjaan(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Lokasi / Jaringan DI</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sekunder K6 D.I. Kerasaan"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2"
                    value={newUsulLokasi}
                    onChange={(e) => setNewUsulLokasi(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Estimasi Biaya O&M (Rp)</label>
                  <input
                    type="number"
                    required
                    placeholder="Contoh: 15000000"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono focus:ring-2"
                    value={newUsulBiaya}
                    onChange={(e) => setNewUsulBiaya(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Skala Prioritas Kerja</label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-700"
                    value={newUsulPrioritas}
                    onChange={(e: any) => setNewUsulPrioritas(e.target.value)}
                  >
                    <option value="Tinggi">Tinggi (Sangat Mendesak)</option>
                    <option value="Sedang">Sedang (Rutin Berkala)</option>
                    <option value="Rendah">Rendah (Rencana Jauh)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Diusulkan Oleh</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama institusi / GP3A"
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
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Rekomendasi Disposisi</label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs bg-white text-slate-700"
                    value={newUsulStatus}
                    onChange={(e: any) => {
                      if (isEditable) {
                        setNewUsulStatus(e.target.value);
                      } else {
                        alert("Hanya admin / Kepala Seksi yang dapat mengubah status persetujuan usulan.");
                      }
                    }}
                    disabled={!isEditable}
                  >
                    <option value="Ditinjau">Ditinjau (Dalam Review)</option>
                    <option value="Disetujui">Disetujui (Rekomendasi SPK)</option>
                    <option value="Ditangguhkan">Ditangguhkan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Penjelasan Singkat Kerusakan Fisik</label>
                <textarea
                  placeholder="Mengapa pekerjaan pemeliharaan ini penting?..."
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
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700"
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
