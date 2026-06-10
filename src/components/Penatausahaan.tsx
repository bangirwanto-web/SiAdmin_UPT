import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Database, 
  AlertTriangle,
  FolderMinus,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  Mail,
  Phone,
  Award,
  BookOpen,
  Download,
  FileSpreadsheet,
  Edit
} from 'lucide-react';
import { User, Surat, InventarisAset, Personel, Keuangan } from '../types';

interface PenatausahaanProps {
  currentUser: User;
  suratList: Surat[];
  setSuratList: (list: Surat[]) => void;
  inventarisList: InventarisAset[];
  setInventarisList: (list: InventarisAset[]) => void;
  personelList: Personel[];
  setPersonelList: (list: Personel[]) => void;
  keuanganList: Keuangan[];
  setKeuanganList: (list: Keuangan[]) => void;
  activeTabOverride?: 'umum' | 'personalia' | 'aset' | 'keuangan';
  onSubTabChange?: (tab: 'umum' | 'personalia' | 'aset' | 'keuangan') => void;
}

export default function Penatausahaan({ 
  currentUser, 
  suratList, 
  setSuratList, 
  inventarisList, 
  setInventarisList,
  personelList,
  setPersonelList,
  keuanganList,
  setKeuanganList,
  activeTabOverride = 'umum',
  onSubTabChange
}: PenatausahaanProps) {

  const activeSubTab = activeTabOverride;
  const setActiveSubTab = (tab: 'umum' | 'personalia' | 'aset' | 'keuangan') => {
    if (onSubTabChange) {
      onSubTabChange(tab);
    }
  };

  // Search & Filters state
  const [suratSearch, setSuratSearch] = useState('');
  const [suratSubTab, setSuratSubTab] = useState<'masuk' | 'keluar' | 'semua'>('masuk');
  const [suratFilterTahun, setSuratFilterTahun] = useState<string>('Semua');
  const [suratFilterType, setSuratFilterType] = useState<'Semua' | 'Masuk' | 'Keluar'>('Semua');
  const [asetSearch, setAsetSearch] = useState('');
  const [asetFilterKondisi, setAsetFilterKondisi] = useState<'Semua' | 'Baik' | 'Rusak Ringan' | 'Rusak Berat'>('Semua');
  
  // Personel Search & Filter
  const [personelSearch, setPersonelSearch] = useState('');
  const [personelFilterStatus, setPersonelFilterStatus] = useState<'Semua' | 'PNS' | 'PPPK' | 'Honor Daerah' | 'Kontrak'>('Semua');

  // Keuangan Search & Filter
  const [keuanganSearch, setKeuanganSearch] = useState('');
  const [keuanganFilterKategori, setKeuanganFilterKategori] = useState<'Semua' | 'Anggaran DIPA' | 'Belanja Operasional' | 'Pemeliharaan' | 'Honorarium' | 'Lain-lain'>('Semua');
  const [keuanganFilterTipe, setKeuanganFilterTipe] = useState<'Semua' | 'Masuk' | 'Keluar'>('Semua');

  // Dialog Overlays
  const [isSuratModalOpen, setIsSuratModalOpen] = useState(false);
  const [isAsetModalOpen, setIsAsetModalOpen] = useState(false);
  const [isPersonelModalOpen, setIsPersonelModalOpen] = useState(false);
  const [isKeuanganModalOpen, setIsKeuanganModalOpen] = useState(false);

  // New Surat Form State
  const [newSuratTipe, setNewSuratTipe] = useState<'Masuk' | 'Keluar'>('Masuk');
  
  // Custom states matching user's exact specification
  const [newNomorAgenda, setNewNomorAgenda] = useState('');
  const [newTglAgenda, setNewTglAgenda] = useState(new Date().toISOString().split('T')[0]);
  const [newSuratNo, setNewSuratNo] = useState('');
  const [newSuratTanggal, setNewSuratTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [newAsalPengirim, setNewAsalPengirim] = useState('');
  const [newTujuanSurat, setNewTujuanSurat] = useState('');
  const [newSuratPerihal, setNewSuratPerihal] = useState('');
  const [newTahapAdministrasi, setNewTahapAdministrasi] = useState('Registrasi');
  const [newPdfName, setNewPdfName] = useState('');

  // New Aset Form State
  const [newAsetNama, setNewAsetNama] = useState('');
  const [newAsetKode, setNewAsetKode] = useState('');
  const [newAsetKategori, setNewAsetKategori] = useState('');
  const [newAsetJumlah, setNewAsetJumlah] = useState(1);
  const [newAsetKondisi, setNewAsetKondisi] = useState<'Baik' | 'Rusak Ringan' | 'Rusak Berat'>('Baik');
  const [newAsetLokasi, setNewAsetLokasi] = useState('');

  // New Personel Form State
  const [newPersNip, setNewPersNip] = useState('');
  const [newPersNama, setNewPersNama] = useState('');
  const [newPersJabatan, setNewPersJabatan] = useState('');
  const [newPersGolongan, setNewPersGolongan] = useState('III-a');
  const [newPersStatus, setNewPersStatus] = useState<'PNS' | 'PPPK' | 'Honor Daerah' | 'Kontrak'>('PNS');
  const [newPersTelepon, setNewPersTelepon] = useState('');
  const [newPersEmail, setNewPersEmail] = useState('');

  // New Keuangan Form State
  const [newKeuNoBukti, setNewKeuNoBukti] = useState('');
  const [newKeuTanggal, setNewKeuTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [newKeuUraian, setNewKeuUraian] = useState('');
  const [newKeuKategori, setNewKeuKategori] = useState<'Anggaran DIPA' | 'Belanja Operasional' | 'Pemeliharaan' | 'Honorarium' | 'Lain-lain'>('Belanja Operasional');
  const [newKeuTipe, setNewKeuTipe] = useState<'Masuk' | 'Keluar'>('Keluar');
  const [newKeuJumlah, setNewKeuJumlah] = useState<number>(0);
  const [newKeuPenanggung, setNewKeuPenanggung] = useState(currentUser.name);

  // Editing state trackers for CRUD full completion
  const [editingSuratId, setEditingSuratId] = useState<string | null>(null);
  const [editingAsetId, setEditingAsetId] = useState<string | null>(null);
  const [editingPersonelId, setEditingPersonelId] = useState<string | null>(null);
  const [editingKeuanganId, setEditingKeuanganId] = useState<string | null>(null);

  const isEditable = currentUser.role === 'admin';

  // ---- EDIT TRIGGER HANDLERS -----
  
  const handleEditSuratClick = (surat: Surat) => {
    setEditingSuratId(surat.id);
    setNewSuratTipe(surat.tipe);
    setNewNomorAgenda(surat.nomorAgenda || '');
    setNewTglAgenda(surat.tglAgenda || surat.tanggal);
    setNewSuratNo(surat.nomorSurat);
    setNewSuratTanggal(surat.tanggalSurat || surat.tanggal);
    setNewAsalPengirim(surat.pengirim === 'UPTD PSA Bah Bolon' ? '' : surat.pengirim);
    setNewTujuanSurat(surat.penerima === 'UPTD PSA Bah Bolon' ? '' : surat.penerima);
    setNewSuratPerihal(surat.perihal);
    setNewTahapAdministrasi(surat.tahapAdministrasi || 'Registrasi Baru');
    setNewPdfName(surat.pdfName || '');
    setIsSuratModalOpen(true);
  };

  const handleAddSuratTrigger = () => {
    setEditingSuratId(null);
    setNewNomorAgenda('');
    setNewTglAgenda(new Date().toISOString().split('T')[0]);
    setNewSuratNo('');
    setNewSuratTanggal(new Date().toISOString().split('T')[0]);
    setNewAsalPengirim('');
    setNewTujuanSurat('');
    setNewSuratPerihal('');
    setNewTahapAdministrasi(newSuratTipe === 'Masuk' ? 'Registrasi Baru' : 'Penyusunan Draft');
    setNewPdfName('');
    setIsSuratModalOpen(true);
  };

  const handleEditAsetClick = (aset: InventarisAset) => {
    setEditingAsetId(aset.id);
    setNewAsetNama(aset.namaAset);
    setNewAsetKode(aset.kodeAset);
    setNewAsetKategori(aset.kategori);
    setNewAsetJumlah(aset.jumlah);
    setNewAsetKondisi(aset.kondisi);
    setNewAsetLokasi(aset.lokasi);
    setIsAsetModalOpen(true);
  };

  const handleAddAsetTrigger = () => {
    setEditingAsetId(null);
    setNewAsetNama('');
    setNewAsetKode('');
    setNewAsetKategori('');
    setNewAsetJumlah(1);
    setNewAsetKondisi('Baik');
    setNewAsetLokasi('');
    setIsAsetModalOpen(true);
  };

  const handleEditPersonelClick = (pers: Personel) => {
    setEditingPersonelId(pers.id);
    setNewPersNip(pers.nip === '-' ? '' : pers.nip);
    setNewPersNama(pers.nama);
    setNewPersJabatan(pers.jabatan);
    setNewPersGolongan(pers.golongan);
    setNewPersStatus(pers.statusKepegawaian);
    setNewPersTelepon(pers.telepon === '-' ? '' : pers.telepon);
    setNewPersEmail(pers.email === '-' ? '' : pers.email);
    setIsPersonelModalOpen(true);
  };

  const handleAddPersonelTrigger = () => {
    setEditingPersonelId(null);
    setNewPersNip('');
    setNewPersNama('');
    setNewPersJabatan('');
    setNewPersGolongan('III-a');
    setNewPersStatus('PNS');
    setNewPersTelepon('');
    setNewPersEmail('');
    setIsPersonelModalOpen(true);
  };

  const handleEditKeuanganClick = (keu: Keuangan) => {
    setEditingKeuanganId(keu.id);
    setNewKeuNoBukti(keu.nomorBukti);
    setNewKeuTanggal(keu.tanggal);
    setNewKeuUraian(keu.uraian);
    setNewKeuKategori(keu.kategori);
    setNewKeuTipe(keu.tipe);
    setNewKeuJumlah(keu.jumlah);
    setNewKeuPenanggung(keu.penanggungJawab);
    setIsKeuanganModalOpen(true);
  };

  const handleAddKeuanganTrigger = () => {
    setEditingKeuanganId(null);
    setNewKeuNoBukti('');
    setNewKeuTanggal(new Date().toISOString().split('T')[0]);
    setNewKeuUraian('');
    setNewKeuKategori('Belanja Operasional');
    setNewKeuTipe('Keluar');
    setNewKeuJumlah(0);
    setNewKeuPenanggung(currentUser.name);
    setIsKeuanganModalOpen(true);
  };

  // ---- CRUD HANDLERS -----

  const handleAddSurat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSuratNo || !newSuratPerihal) return;

    const isMasuk = newSuratTipe === 'Masuk';
    
    // Auto-map status Pending/Proses/Selesai based on Tahap Administrasi
    const lowTahap = newTahapAdministrasi.toLowerCase();
    let finalStatus: 'Pending' | 'Proses' | 'Selesai' = 'Pending';
    if (lowTahap.includes('selesai') || lowTahap.includes('arsip') || lowTahap.includes('kirim')) {
      finalStatus = 'Selesai';
    } else if (lowTahap.includes('proses') || lowTahap.includes('disposisi') || lowTahap.includes('koreksi') || lowTahap.includes('verifikasi')) {
      finalStatus = 'Proses';
    }

    const newItem: Surat = {
      id: editingSuratId || `srt-${Date.now()}`,
      nomorSurat: newSuratNo,
      perihal: newSuratPerihal,
      pengirim: isMasuk ? (newAsalPengirim || 'Eksternal') : 'UPTD PSA Bah Bolon',
      penerima: isMasuk ? 'UPTD PSA Bah Bolon' : (newTujuanSurat || 'Eksternal'),
      tanggal: isMasuk ? newTglAgenda : newSuratTanggal,
      tipe: newSuratTipe,
      status: finalStatus,
      // custom fields
      nomorAgenda: isMasuk ? newNomorAgenda : undefined,
      tglAgenda: isMasuk ? newTglAgenda : undefined,
      tanggalSurat: newSuratTanggal,
      tahapAdministrasi: newTahapAdministrasi,
      pdfName: newPdfName || undefined
    };

    if (editingSuratId) {
      setSuratList(suratList.map(s => s.id === editingSuratId ? newItem : s));
    } else {
      setSuratList([newItem, ...suratList]);
    }
    
    setIsSuratModalOpen(false);
    setEditingSuratId(null);

    // Reset Form fields
    setNewNomorAgenda('');
    setNewTglAgenda(new Date().toISOString().split('T')[0]);
    setNewSuratNo('');
    setNewSuratTanggal(new Date().toISOString().split('T')[0]);
    setNewAsalPengirim('');
    setNewTujuanSurat('');
    setNewSuratPerihal('');
    setNewTahapAdministrasi('Registrasi Baru');
    setNewPdfName('');
  };

  const handleDeleteSurat = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus surat ini dari log arsip?')) {
      setSuratList(suratList.filter(s => s.id !== id));
    }
  };

  const handleAddAset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsetNama || !newAsetKode) return;

    const newItem: InventarisAset = {
      id: editingAsetId || `ast-${Date.now()}`,
      namaAset: newAsetNama,
      kodeAset: newAsetKode,
      kategori: newAsetKategori || 'Peralatan Umum',
      jumlah: Number(newAsetJumlah),
      kondisi: newAsetKondisi,
      lokasi: newAsetLokasi || 'Kantor UPTD'
    };

    if (editingAsetId) {
      setInventarisList(inventarisList.map(a => a.id === editingAsetId ? newItem : a));
    } else {
      setInventarisList([newItem, ...inventarisList]);
    }
    
    setIsAsetModalOpen(false);
    setEditingAsetId(null);
    // Reset Form
    setNewAsetNama('');
    setNewAsetKode('');
    setNewAsetKategori('');
    setNewAsetJumlah(1);
    setNewAsetKondisi('Baik');
    setNewAsetLokasi('');
  };

  const handleDeleteAset = (id: string) => {
    if (confirm('Hapus aset ini dari inventaris instansi?')) {
      setInventarisList(inventarisList.filter(a => a.id !== id));
    }
  };

  const handleAddPersonel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPersNama || !newPersJabatan) return;

    const newItem: Personel = {
      id: editingPersonelId || `per-${Date.now()}`,
      nip: newPersNip || '-',
      nama: newPersNama,
      jabatan: newPersJabatan,
      golongan: newPersGolongan || 'Non-Eselon',
      statusKepegawaian: newPersStatus,
      telepon: newPersTelepon || '-',
      email: newPersEmail || '-'
    };

    if (editingPersonelId) {
      setPersonelList(personelList.map(p => p.id === editingPersonelId ? newItem : p));
    } else {
      setPersonelList([newItem, ...personelList]);
    }
    
    setIsPersonelModalOpen(false);
    setEditingPersonelId(null);
    // Reset
    setNewPersNip('');
    setNewPersNama('');
    setNewPersJabatan('');
    setNewPersGolongan('III-a');
    setNewPersStatus('PNS');
    setNewPersTelepon('');
    setNewPersEmail('');
  };

  const handleDeletePersonel = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pegawai ini dari data Kepegawaian internal?')) {
      setPersonelList(personelList.filter(p => p.id !== id));
    }
  };

  const handleAddKeuangan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeuNoBukti || !newKeuUraian || newKeuJumlah <= 0) return;

    const newItem: Keuangan = {
      id: editingKeuanganId || `keu-${Date.now()}`,
      nomorBukti: newKeuNoBukti,
      tanggal: newKeuTanggal,
      uraian: newKeuUraian,
      kategori: newKeuKategori,
      tipe: newKeuTipe,
      jumlah: Number(newKeuJumlah),
      penanggungJawab: newKeuPenanggung || currentUser.name
    };

    if (editingKeuanganId) {
      setKeuanganList(keuanganList.map(k => k.id === editingKeuanganId ? newItem : k));
    } else {
      setKeuanganList([newItem, ...keuanganList]);
    }
    
    setIsKeuanganModalOpen(false);
    setEditingKeuanganId(null);
    // Reset
    setNewKeuNoBukti('');
    setNewKeuTanggal(new Date().toISOString().split('T')[0]);
    setNewKeuUraian('');
    setNewKeuKategori('Belanja Operasional');
    setNewKeuTipe('Keluar');
    setNewKeuJumlah(0);
    setNewKeuPenanggung(currentUser.name);
  };

  const handleDeleteKeuangan = (id: string) => {
    if (confirm('Hapus transaksi ini dari buku pembukuan ledger kas?')) {
      setKeuanganList(keuanganList.filter(k => k.id !== id));
    }
  };

  const handleExportExcel = () => {
    if (filteredSurat.length === 0) {
      alert('Tidak ada data surat untuk diekport.');
      return;
    }

    // Headers in Indonesian
    const headers = ['Nomor Surat', 'Tanggal', 'Jenis', 'Perihal', 'Pengirim', 'Penerima', 'Status'];
    // Map rows
    const rows = filteredSurat.map(s => [
      s.nomorSurat,
      s.tanggal,
      s.tipe,
      s.perihal,
      s.pengirim,
      s.penerima,
      s.status
    ]);

    // Construct CSV with semicolon delimiter for high Excel compatibility
    const csvContent = [
      headers.join(';'),
      ...rows.map(row => 
        row.map(val => {
          const str = val === undefined || val === null ? '' : String(val);
          return `"${str.replace(/"/g, '""')}"`;
        }).join(';')
      )
    ].join('\r\n');

    // Add UTF-8 BOM so Microsoft Excel opens it seamlessly
    const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const tipeLabel = suratSubTab === 'masuk' ? 'Masuk' : suratSubTab === 'keluar' ? 'Keluar' : 'Semua';
    const tahunLabel = suratFilterTahun !== 'Semua' ? `_Tahun_${suratFilterTahun}` : '';
    link.href = url;
    link.setAttribute('download', `Rekap_Surat_${tipeLabel}${tahunLabel}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ----- FILTER COMPUTATIONS ------

  // Mengekstrak daftar tahun surat yang tersedia di database secara dinamis
  const availableSuratYears = Array.from(
    new Set([
      ...suratList.map(s => s.tanggal ? s.tanggal.split('-')[0] : '').filter(Boolean),
      '2026', '2025', '2024'
    ])
  ).sort((a, b) => b.localeCompare(a));

  const filteredSurat = suratList.filter(s => {
    // 1. Pilah data berdasarkan sub-halaman: Surat Masuk, Surat Keluar, atau Semua
    const matchesSubTab = 
      suratSubTab === 'semua' ||
      (suratSubTab === 'masuk' && s.tipe === 'Masuk') ||
      (suratSubTab === 'keluar' && s.tipe === 'Keluar');

    // 2. Pencarian teks deskripsi dsb
    const matchesSearch = 
      s.perihal.toLowerCase().includes(suratSearch.toLowerCase()) || 
      s.nomorSurat.toLowerCase().includes(suratSearch.toLowerCase()) ||
      s.pengirim.toLowerCase().includes(suratSearch.toLowerCase()) ||
      s.penerima.toLowerCase().includes(suratSearch.toLowerCase());

    // 3. Filter berdasarkan tahun
    const matchesYear = 
      suratFilterTahun === 'Semua' || 
      (s.tanggal && s.tanggal.startsWith(suratFilterTahun));

    // 4. Filter tipe lama (aliran) jika masih diakses
    const matchesType = suratFilterType === 'Semua' || s.tipe === suratFilterType;

    return matchesSubTab && matchesSearch && matchesYear && matchesType;
  });

  const filteredAset = inventarisList.filter(a => {
    const matchesSearch = a.namaAset.toLowerCase().includes(asetSearch.toLowerCase()) ||
                          a.kodeAset.toLowerCase().includes(asetSearch.toLowerCase()) ||
                          a.lokasi.toLowerCase().includes(asetSearch.toLowerCase());
    const matchesKondisi = asetFilterKondisi === 'Semua' || a.kondisi === asetFilterKondisi;
    return matchesSearch && matchesKondisi;
  });

  const filteredPersonel = personelList.filter(p => {
    const matchesSearch = p.nama.toLowerCase().includes(personelSearch.toLowerCase()) ||
                          p.nip.toLowerCase().includes(personelSearch.toLowerCase()) ||
                          p.jabatan.toLowerCase().includes(personelSearch.toLowerCase());
    const matchesStatus = personelFilterStatus === 'Semua' || p.statusKepegawaian === personelFilterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredKeuangan = keuanganList.filter(k => {
    const matchesSearch = k.uraian.toLowerCase().includes(keuanganSearch.toLowerCase()) ||
                          k.nomorBukti.toLowerCase().includes(keuanganSearch.toLowerCase()) ||
                          k.penanggungJawab.toLowerCase().includes(keuanganSearch.toLowerCase());
    const matchesKategori = keuanganFilterKategori === 'Semua' || k.kategori === keuanganFilterKategori;
    const matchesTipe = keuanganFilterTipe === 'Semua' || k.tipe === keuanganFilterTipe;
    return matchesSearch && matchesKategori && matchesTipe;
  });

  // Calculate finance metrics
  const totalMasuk = keuanganList
    .filter(k => k.tipe === 'Masuk')
    .reduce((sum, curr) => sum + curr.jumlah, 0);

  const totalKeluar = keuanganList
    .filter(k => k.tipe === 'Keluar')
    .reduce((sum, curr) => sum + curr.jumlah, 0);

  const saldoKas = totalMasuk - totalKeluar;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div id="penatausahaan-view" className="space-y-6">
      {/* Upper Navigation & Section Title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">Bagian Kesekretariatan</span>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-0.5">Penatausahaan</h1>
          <p className="text-xs text-slate-500 mt-1">
            Pengelolaan administrasi umum, kepegawaian personalia, inventarisasi aset, dan pembukuan keuangan UPTD PSA.
          </p>
        </div>

        {/* Tab switcher buttons - Synced with Sidebar */}
        <div className="flex bg-slate-100 p-1 rounded-xl scrollbar-none overflow-x-auto max-w-full">
          <button
            type="button"
            id="subtab-umum"
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'umum' 
                ? 'bg-white text-slate-850 shadow-xs' 
                : 'text-slate-500 hover:text-slate-850'
            }`}
            onClick={() => setActiveSubTab('umum')}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Adm Umum</span>
          </button>
          <button
            type="button"
            id="subtab-personalia"
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'personalia' 
                ? 'bg-white text-slate-850 shadow-xs' 
                : 'text-slate-500 hover:text-slate-850'
            }`}
            onClick={() => setActiveSubTab('personalia')}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Personalia</span>
          </button>
          <button
            type="button"
            id="subtab-aset"
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'aset' 
                ? 'bg-white text-slate-850 shadow-xs' 
                : 'text-slate-500 hover:text-slate-850'
            }`}
            onClick={() => setActiveSubTab('aset')}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Aset & Inventaris</span>
          </button>
          <button
            type="button"
            id="subtab-keuangan"
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeSubTab === 'keuangan' 
                ? 'bg-white text-slate-850 shadow-xs' 
                : 'text-slate-500 hover:text-slate-850'
            }`}
            onClick={() => setActiveSubTab('keuangan')}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Keuangan</span>
          </button>
        </div>
      </div>

      {/* ----------------- 1. VIEW ADM UMUM (SURAT) ----------------- */}
      {activeSubTab === 'umum' && (
        <div className="space-y-4">
          {/* Sub-halaman: Surat Masuk & Surat Keluar */}
          <div className="flex border-b border-slate-100 bg-slate-50 p-1 rounded-xl w-fit gap-2">
            <button
              type="button"
              id="sub-umum-masuk"
              onClick={() => {
                setSuratSubTab('masuk');
                setSuratFilterTahun('Semua');
              }}
              className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-all flex items-center gap-2 ${
                suratSubTab === 'masuk'
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${suratSubTab === 'masuk' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></span>
              Surat Masuk ({suratList.filter(s => s.tipe === 'Masuk').length})
            </button>
            <button
              type="button"
              id="sub-umum-keluar"
              onClick={() => {
                setSuratSubTab('keluar');
                setSuratFilterTahun('Semua');
              }}
              className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-all flex items-center gap-2 ${
                suratSubTab === 'keluar'
                  ? 'bg-white text-indigo-800 shadow-xs border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${suratSubTab === 'keluar' ? 'bg-indigo-500 animate-pulse' : 'bg-slate-300'}`}></span>
              Surat Keluar ({suratList.filter(s => s.tipe === 'Keluar').length})
            </button>
            <button
              type="button"
              id="sub-umum-semua"
              onClick={() => {
                setSuratSubTab('semua');
                setSuratFilterTahun('Semua');
              }}
              className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-all flex items-center gap-2 ${
                suratSubTab === 'semua'
                  ? 'bg-white text-slate-800 shadow-xs border border-slate-200/50'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${suratSubTab === 'semua' ? 'bg-slate-500' : 'bg-slate-300'}`}></span>
              Semua Surat ({suratList.length})
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="surat-search"
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs text-slate-750 font-medium"
                  placeholder={
                    suratSubTab === 'masuk' ? 'Cari surat masuk...' :
                    suratSubTab === 'keluar' ? 'Cari surat keluar...' :
                    'Cari perihal, nomor surat, atau instansi...'
                  }
                  value={suratSearch}
                  onChange={(e) => setSuratSearch(e.target.value)}
                />
              </div>

              {/* Filter Berdasarkan Tahun pada Data Tabel */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  id="surat-filter-tahun"
                  className="border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 text-slate-650 bg-white font-bold"
                  value={suratFilterTahun}
                  onChange={(e) => setSuratFilterTahun(e.target.value)}
                >
                  <option value="Semua">Semua Tahun</option>
                  {availableSuratYears.map((tahun) => (
                    <option key={tahun} value={tahun}>Tahun {tahun}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Export Excel & Add Surat Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                id="btn-export-excel"
                onClick={handleExportExcel}
                className="flex items-center gap-2 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-black shadow-2xs transition"
                title="Ekspor daftar surat ke Excel format"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-650" />
                <span>Ekspor ke Excel</span>
              </button>

              {isEditable ? (
                <button
                  type="button"
                  id="btn-add-surat"
                  onClick={() => {
                    if (suratSubTab === 'masuk') setNewSuratTipe('Masuk');
                    if (suratSubTab === 'keluar') setNewSuratTipe('Keluar');
                    handleAddSuratTrigger();
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-extrabold shadow-sm transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Arsip Baru</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-xl text-[10px] text-amber-800 border border-amber-100">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Operator: Read-Only</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    {suratSubTab === 'masuk' ? (
                      <>
                        <th className="p-3 pl-6">Nomor & Tanggal Agenda</th>
                        <th className="p-3">Nomor & Tanggal Surat</th>
                        <th className="p-3">Asal Pengirim</th>
                        <th className="p-3">Perihal Kedinasan</th>
                        <th className="p-3">Tahap Administrasi</th>
                        <th className="p-3 text-center">Dokumen PDF</th>
                        {isEditable && <th className="p-3 text-right pr-6">Hapus</th>}
                      </>
                    ) : suratSubTab === 'keluar' ? (
                      <>
                        <th className="p-3 pl-6">Nomor Surat Keluar</th>
                        <th className="p-3">Tanggal Surat Keluar</th>
                        <th className="p-3">Tujuan Surat</th>
                        <th className="p-3">Perihal Kedinasan</th>
                        <th className="p-3">Tahap Administrasi</th>
                        <th className="p-3 text-center">Dokumen PDF</th>
                        {isEditable && <th className="p-3 text-right pr-6">Hapus</th>}
                      </>
                    ) : (
                      <>
                        <th className="p-3 pl-6">Jenis Surat</th>
                        <th className="p-3">Agenda / No. Surat</th>
                        <th className="p-3">Tanggal</th>
                        <th className="p-3">Pengirim / Penerima</th>
                        <th className="p-3">Perihal Kedinasan</th>
                        <th className="p-3">Tahap Administrasi</th>
                        <th className="p-3 text-center">Dokumen PDF</th>
                        {isEditable && <th className="p-3 text-right pr-6">Hapus</th>}
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {filteredSurat.length > 0 ? (
                    filteredSurat.map((surat) => (
                      <tr key={surat.id} className="hover:bg-slate-50/40 transition">
                        {suratSubTab === 'masuk' ? (
                          <>
                            {/* Surat Masuk Columns */}
                            <td className="p-3 pl-6">
                              <p className="font-bold text-slate-800">{surat.nomorAgenda || '-'}</p>
                              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{surat.tglAgenda || '-'}</p>
                            </td>
                            <td className="p-3">
                              <p className="font-bold text-slate-700">{surat.nomorSurat}</p>
                              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{surat.tanggalSurat || surat.tanggal}</p>
                            </td>
                            <td className="p-3 font-semibold text-slate-700">
                              {surat.pengirim}
                            </td>
                            <td className="p-3 font-semibold text-slate-700 max-w-xs truncate" title={surat.perihal}>
                              {surat.perihal}
                            </td>
                            <td className="p-3">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                                surat.status === 'Selesai' 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : surat.status === 'Proses' 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : 'bg-slate-100 text-slate-705 bg-slate-100 text-slate-700'
                              }`}>
                                {surat.status === 'Selesai' && <CheckCircle className="w-3 h-3" />}
                                {surat.status === 'Proses' && <Clock className="w-3 h-3 animate-spin" />}
                                {surat.status === 'Pending' && <AlertCircle className="w-3 h-3" />}
                                {surat.tahapAdministrasi || surat.status}
                              </span>
                            </td>
                            <td className="p-3 text-center whitespace-nowrap">
                              {surat.pdfName ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    alert(`Membuka lampiran dokumen PDF: ${surat.pdfName}`);
                                  }}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 border border-red-100 hover:bg-red-100 rounded-lg text-[10px] font-bold transition"
                                  title={surat.pdfName}
                                >
                                  <FileText className="w-3 h-3" />
                                  <span>PDF</span>
                                </button>
                              ) : (
                                <span className="text-[10px] text-slate-400 italic">No File</span>
                              )}
                            </td>
                          </>
                        ) : suratSubTab === 'keluar' ? (
                          <>
                            {/* Surat Keluar Columns */}
                            <td className="p-3 pl-6">
                              <p className="font-bold text-slate-800">{surat.nomorSurat}</p>
                            </td>
                            <td className="p-3">
                              <p className="text-[10px] text-slate-400 font-mono">{surat.tanggalSurat || surat.tanggal}</p>
                            </td>
                            <td className="p-3 font-semibold text-slate-700">
                              {surat.penerima}
                            </td>
                            <td className="p-3 font-semibold text-slate-700 max-w-xs truncate" title={surat.perihal}>
                              {surat.perihal}
                            </td>
                            <td className="p-3">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                                surat.status === 'Selesai' 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : surat.status === 'Proses' 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : 'bg-slate-100 text-slate-705 bg-slate-100 text-slate-700'
                              }`}>
                                {surat.status === 'Selesai' && <CheckCircle className="w-3 h-3" />}
                                {surat.status === 'Proses' && <Clock className="w-3 h-3 animate-spin" />}
                                {surat.status === 'Pending' && <AlertCircle className="w-3 h-3" />}
                                {surat.tahapAdministrasi || surat.status}
                              </span>
                            </td>
                            <td className="p-3 text-center whitespace-nowrap">
                              {surat.pdfName ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    alert(`Membuka lampiran dokumen PDF: ${surat.pdfName}`);
                                  }}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 border border-red-100 hover:bg-red-100 rounded-lg text-[10px] font-bold transition"
                                  title={surat.pdfName}
                                >
                                  <FileText className="w-3 h-3" />
                                  <span>PDF</span>
                                </button>
                              ) : (
                                <span className="text-[10px] text-slate-400 italic">No File</span>
                              )}
                            </td>
                          </>
                        ) : (
                          <>
                            {/* General/Semua Combined Columns */}
                            <td className="p-3 pl-6">
                              <span className={`inline-flex items-center gap-1 text-[9px] font-black px-2 py-0.5 rounded uppercase ${
                                surat.tipe === 'Masuk' 
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                  : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                              }`}>
                                {surat.tipe}
                              </span>
                            </td>
                            <td className="p-3">
                              {surat.tipe === 'Masuk' && surat.nomorAgenda ? (
                                <div className="space-y-0.5">
                                  <p className="font-bold text-slate-800"><span className="text-[9px] text-emerald-600 font-bold mr-1">Agenda:</span>{surat.nomorAgenda}</p>
                                  <p className="text-[10px] text-slate-500 font-mono"><span className="text-[9px] text-slate-400 font-bold mr-1">No:</span>{surat.nomorSurat}</p>
                                </div>
                              ) : (
                                <p className="font-bold text-slate-800">{surat.nomorSurat}</p>
                              )}
                            </td>
                            <td className="p-3 text-slate-400 font-mono text-[10px]">
                              {surat.tanggalSurat || surat.tanggal}
                            </td>
                            <td className="p-3 text-slate-600">
                              <div className="space-y-0.5 leading-tight text-[11px]">
                                <p className="font-medium text-slate-700">
                                  <span className="text-[9px] uppercase font-bold text-slate-400 mr-1">Dari:</span> {surat.pengirim}
                                </p>
                                <p className="text-slate-500">
                                  <span className="text-[9px] uppercase font-bold text-slate-400 mr-1">Untuk:</span> {surat.penerima}
                                </p>
                              </div>
                            </td>
                            <td className="p-3 font-semibold text-slate-700 max-w-xs truncate" title={surat.perihal}>
                              {surat.perihal}
                            </td>
                            <td className="p-3">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                                surat.status === 'Selesai' 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : surat.status === 'Proses' 
                                  ? 'bg-amber-100 text-amber-800' 
                                  : 'bg-slate-100 text-slate-700'
                              }`}>
                                {surat.status === 'Selesai' && <CheckCircle className="w-3 h-3" />}
                                {surat.status === 'Proses' && <Clock className="w-3 h-3 animate-spin" />}
                                {surat.status === 'Pending' && <AlertCircle className="w-3 h-3" />}
                                {surat.tahapAdministrasi || surat.status}
                              </span>
                            </td>
                            <td className="p-3 text-center whitespace-nowrap">
                              {surat.pdfName ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    alert(`Membuka lampiran dokumen PDF: ${surat.pdfName}`);
                                  }}
                                  className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 border border-red-100 hover:bg-red-100 rounded-lg text-[10px] font-bold transition"
                                  title={surat.pdfName}
                                >
                                  <FileText className="w-3 h-3" />
                                  <span>PDF</span>
                                </button>
                              ) : (
                                <span className="text-[10px] text-slate-400 italic">No File</span>
                              )}
                            </td>
                          </>
                        )}
                        {isEditable && (
                          <td className="p-3 text-right pr-6 whitespace-nowrap">
                            <div className="flex justify-end gap-1">
                              <button
                                onClick={() => handleEditSuratClick(surat)}
                                className="p-1 text-slate-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition"
                                title="Edit Surat"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteSurat(surat.id)}
                                className="p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={suratSubTab === 'masuk' ? 7 : suratSubTab === 'keluar' ? 7 : 8} className="p-8 text-center text-slate-400">
                        <FolderMinus className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                        <p className="font-semibold text-slate-550">Tidak ada arsip surat yang terdaftar.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- 2. VIEW PERSONALIA (STAFFING) ----------------- */}
      {activeSubTab === 'personalia' && (
        <div className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-150/60 shadow-2xs flex items-center gap-3">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-black tracking-wider text-slate-400">Total Pegawai</p>
                <h3 className="text-sm font-extrabold text-slate-800 mt-0.5">{personelList.length} Personel</h3>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-150/60 shadow-2xs flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-black tracking-wider text-slate-400">Aparatur PNS</p>
                <h3 className="text-sm font-extrabold text-slate-800 mt-0.5">
                  {personelList.filter(p => p.statusKepegawaian === 'PNS').length} Orang
                </h3>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-150/60 shadow-2xs flex items-center gap-3">
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-lg">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-black tracking-wider text-slate-400">Tenaga PPPK</p>
                <h3 className="text-sm font-extrabold text-slate-800 mt-0.5">
                  {personelList.filter(p => p.statusKepegawaian === 'PPPK').length} Orang
                </h3>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-150/60 shadow-2xs flex items-center gap-3">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-black tracking-wider text-slate-400">Kontrak & Honor</p>
                <h3 className="text-sm font-extrabold text-slate-800 mt-0.5">
                  {personelList.filter(p => p.statusKepegawaian === 'Kontrak' || p.statusKepegawaian === 'Honor Daerah').length} Juru
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="personel-search"
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs text-slate-755"
                  placeholder="Cari nama, NIP, atau jabatan staf..."
                  value={personelSearch}
                  onChange={(e) => setPersonelSearch(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  id="personel-filter-status"
                  className="border border-slate-200 rounded-xl px-2.5 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 text-slate-600 bg-white"
                  value={personelFilterStatus}
                  onChange={(e: any) => setPersonelFilterStatus(e.target.value)}
                >
                  <option value="Semua">Semua Status</option>
                  <option value="PNS">Pegawai PNS</option>
                  <option value="PPPK">PPPK</option>
                  <option value="Honor Daerah">Honor Daerah</option>
                  <option value="Kontrak">Pegawai Kontrak</option>
                </select>
              </div>
            </div>

            {isEditable && (
              <button
                type="button"
                id="btn-add-personel"
                onClick={handleAddPersonelTrigger}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Pegawai Baru</span>
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    <th className="p-3 pl-6">Nama Pegawai / NIP</th>
                    <th className="p-3">Jabatan & Penugasan</th>
                    <th className="p-3">Golongan</th>
                    <th className="p-3">Status Pegawai</th>
                    <th className="p-3">Kontak Resmi</th>
                    {isEditable && <th className="p-3 text-right pr-6">Pemberhentian</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {filteredPersonel.length > 0 ? (
                    filteredPersonel.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/40 transition">
                        <td className="p-3 pl-6">
                          <p className="font-extrabold text-slate-800">{p.nama}</p>
                          <p className="text-[9.5px] text-slate-400 font-mono mt-0.5">NIP: {p.nip}</p>
                        </td>
                        <td className="p-3 font-semibold text-slate-700">{p.jabatan}</td>
                        <td className="p-3 text-slate-500 font-medium">{p.golongan}</td>
                        <td className="p-3">
                          <span className={`inline-flex px-2 py-0.5 text-[9.5px] font-extrabold rounded uppercase ${
                            p.statusKepegawaian === 'PNS' 
                              ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                              : p.statusKepegawaian === 'PPPK'
                              ? 'bg-purple-50 text-purple-700 border border-purple-100'
                              : 'bg-amber-50 text-amber-700 border border-amber-100'
                          }`}>
                            {p.statusKepegawaian}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600">
                          <div className="space-y-0.5 text-[10.5px]">
                            <p className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-400" /> {p.telepon}</p>
                            <p className="flex items-center gap-1 text-slate-500"><Mail className="w-3 h-3 text-slate-400" /> {p.email}</p>
                          </div>
                        </td>
                        {isEditable && (
                          <td className="p-3 text-right pr-6 whitespace-nowrap">
                            <div className="flex justify-end gap-1">
                              <button
                                onClick={() => handleEditPersonelClick(p)}
                                className="p-1 text-slate-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition"
                                title="Edit Pegawai"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeletePersonel(p.id)}
                                className="p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition"
                                title="Hapus Pegawai"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400">
                        <Users className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                        <p className="font-semibold text-slate-550">Tidak ada pegawai yang ditemukan.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- 3. VIEW ASET & INVENTARIS ----------------- */}
      {activeSubTab === 'aset' && (
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="aset-search"
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs text-slate-750"
                  placeholder="Cari nama aset, kode inventaris, atau lokasi..."
                  value={asetSearch}
                  onChange={(e) => setAsetSearch(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  id="aset-filter-kondisi"
                  className="border border-slate-200 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 text-slate-600 bg-white"
                  value={asetFilterKondisi}
                  onChange={(e: any) => setAsetFilterKondisi(e.target.value)}
                >
                  <option value="Semua">Semua Kondisi</option>
                  <option value="Baik">Fisik Baik</option>
                  <option value="Rusak Ringan">Rusak Ringan</option>
                  <option value="Rusak Berat">Rusak Berat</option>
                </select>
              </div>
            </div>

            {isEditable ? (
              <button
                type="button"
                id="btn-add-aset"
                onClick={handleAddAsetTrigger}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
              >
                <Plus className="w-4 h-4" />
                <span>Pencatatan Aset Baru</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-xl text-[10px] text-amber-800 border border-amber-100">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Operator: Akses terbatas (Read-Only)</span>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    <th className="p-3 pl-6">Kode Seri Aset</th>
                    <th className="p-3">Nama Inventaris</th>
                    <th className="p-3">Kelompok / Kategori</th>
                    <th className="p-3">Jumlah Volume</th>
                    <th className="p-3">Fisik Terakhir</th>
                    <th className="p-3">Gudang Penyimpanan</th>
                    {isEditable && <th className="p-3 text-right pr-6">Aksi</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {filteredAset.length > 0 ? (
                    filteredAset.map((aset) => (
                      <tr key={aset.id} className="hover:bg-slate-50/40 transition">
                        <td className="p-3 pl-6 font-mono font-bold text-slate-800 text-[10.5px]">
                          {aset.kodeAset}
                        </td>
                        <td className="p-3 font-bold text-slate-700">{aset.namaAset}</td>
                        <td className="p-3 text-slate-500 font-semibold">{aset.kategori}</td>
                        <td className="p-3 font-extrabold text-slate-800">{aset.jumlah} Unit</td>
                        <td className="p-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            aset.kondisi === 'Baik'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                              : aset.kondisi === 'Rusak Ringan'
                              ? 'bg-amber-50 text-amber-700 border border-amber-100'
                              : 'bg-rose-50 text-rose-700 border border-rose-100'
                          }`}>
                            {aset.kondisi}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600 font-semibold">{aset.lokasi}</td>
                        {isEditable && (
                          <td className="p-3 text-right pr-6 whitespace-nowrap">
                            <div className="flex justify-end gap-1">
                              <button
                                onClick={() => handleEditAsetClick(aset)}
                                className="p-1 text-slate-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition"
                                title="Edit Aset"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAset(aset.id)}
                                className="p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        <Database className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                        <p className="font-semibold text-slate-550">Tidak ada inventaris yang sesuai.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- 4. VIEW KEUANGAN (LEDGER) ----------------- */}
      {activeSubTab === 'keuangan' && (
        <div className="space-y-4">
          {/* Cash Ledger Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-150/60 shadow-2xs flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-black tracking-wider text-slate-400">Total Pemasukan (Kredit)</p>
                <h3 className="text-sm font-extrabold text-emerald-700 mt-0.5">{formatRupiah(totalMasuk)}</h3>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-150/60 shadow-2xs flex items-center gap-3">
              <div className="p-2.5 bg-rose-50 text-rose-600 rounded-lg">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-black tracking-wider text-slate-400">Total Belanja (Debit)</p>
                <h3 className="text-sm font-extrabold text-rose-700 mt-0.5">{formatRupiah(totalKeluar)}</h3>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-150/60 shadow-lg ring-1 ring-blue-500/10 flex items-center gap-3 bg-gradient-to-r from-blue-50/15 to-white">
              <div className="p-2.5 bg-blue-100 text-blue-700 rounded-lg shadow-2xs">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-black tracking-wider text-slate-500">Sisa Saldo Kas Sekarang</p>
                <h3 className="text-sm font-black text-blue-800 mt-0.5">{formatRupiah(saldoKas)}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="keuangan-search"
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs text-slate-755"
                  placeholder="Cari uraian transaksi, penanggung jawab, no bukti..."
                  value={keuanganSearch}
                  onChange={(e) => setKeuanganSearch(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <select
                  id="keuangan-filter-tipe"
                  className="border border-slate-200 rounded-xl px-2.5 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 text-slate-600 bg-white"
                  value={keuanganFilterTipe}
                  onChange={(e: any) => setKeuanganFilterTipe(e.target.value)}
                >
                  <option value="Semua">Semua Arus</option>
                  <option value="Masuk">Kas Masuk (Kredit)</option>
                  <option value="Keluar">Kas Beluar (Debit)</option>
                </select>
              </div>

              <select
                id="keuangan-filter-kategori"
                className="border border-slate-200 rounded-xl px-2.5 py-2 text-xs focus:ring-2 focus:ring-blue-500/20 text-slate-600 bg-white"
                value={keuanganFilterKategori}
                onChange={(e: any) => setKeuanganFilterKategori(e.target.value)}
              >
                <option value="Semua">Semua Kategori</option>
                <option value="Anggaran DIPA">Alokasi DIPA</option>
                <option value="Belanja Operasional">Belanja Ops</option>
                <option value="Pemeliharaan">Pemeliharaan</option>
                <option value="Honorarium">Honor Pegawai</option>
                <option value="Lain-lain">Lain-lain</option>
              </select>
            </div>

            {isEditable && (
              <button
                type="button"
                id="btn-add-keuangan"
                onClick={handleAddKeuanganTrigger}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
              >
                <Plus className="w-4 h-4" />
                <span>Catat Keuangan Baru</span>
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    <th className="p-3 pl-6">Nomor Bukti - Tanggal</th>
                    <th className="p-3">Uraian Keterangan Transaksi</th>
                    <th className="p-3">Kategori Rincian</th>
                    <th className="p-3">Arus Kas</th>
                    <th className="p-3">Jumlah (IDR)</th>
                    <th className="p-3">Penanggung Jawab</th>
                    {isEditable && <th className="p-3 text-right pr-6">Batalkan</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-xs">
                  {filteredKeuangan.length > 0 ? (
                    filteredKeuangan.map((k) => (
                      <tr key={k.id} className="hover:bg-slate-50/40 transition">
                        <td className="p-3 pl-6">
                          <p className="font-extrabold text-slate-800">{k.nomorBukti}</p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">{k.tanggal}</p>
                        </td>
                        <td className="p-3 font-semibold text-slate-700 truncate max-w-xs">{k.uraian}</td>
                        <td className="p-3 text-slate-500 font-medium">{k.kategori}</td>
                        <td className="p-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-[9.5px] font-extrabold rounded ${
                            k.tipe === 'Masuk' 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                              : 'bg-rose-50 text-rose-700 border border-rose-100'
                          }`}>
                            {k.tipe === 'Masuk' ? 'Uang Masuk' : 'Uang Keluar'}
                          </span>
                        </td>
                        <td className={`p-3 font-extrabold ${k.tipe === 'Masuk' ? 'text-emerald-700' : 'text-slate-850'}`}>
                          {k.tipe === 'Masuk' ? '+' : '-'} {formatRupiah(k.jumlah)}
                        </td>
                        <td className="p-3 text-slate-500 font-semibold">{k.penanggungJawab}</td>
                        {isEditable && (
                          <td className="p-3 text-right pr-6 whitespace-nowrap">
                            <div className="flex justify-end gap-1">
                              <button
                                onClick={() => handleEditKeuanganClick(k)}
                                className="p-1 text-slate-400 hover:text-blue-500 rounded-lg hover:bg-blue-50 transition"
                                title="Edit Keuangan"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteKeuangan(k.id)}
                                className="p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        <BookOpen className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                        <p className="font-semibold text-slate-550">Belum ada transaksi terdaftar.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ======================= OVERLAYS ======================= */}
      {/* ======================================================== */}

      {/* ADM UMUM MODAL (SURAT) */}
      {isSuratModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in font-sans">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className={`p-4 text-white flex justify-between items-center ${
              newSuratTipe === 'Masuk' ? 'bg-gradient-to-r from-emerald-800 to-emerald-700' : 'bg-gradient-to-r from-indigo-800 to-indigo-700'
            }`}>
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-2">
                  <FileText className="w-4.5 h-4.5 text-white/90" />
                  Arsip Baru: {newSuratTipe === 'Masuk' ? 'Surat Masuk Dinas' : 'Surat Keluar Dinas'}
                </h3>
                <p className="text-[10px] text-white/70 mt-0.5">Lengkapi parameters administrasi surat resmi sesuai ketetapan</p>
              </div>
              <span className="text-[10px] bg-white/20 border border-white/15 rounded-md px-2.5 py-0.5 uppercase font-black tracking-wider">
                {newSuratTipe}
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleAddSurat} className="p-5 space-y-4 overflow-y-auto max-h-[calc(90vh-100px)]">
              {/* Toggle to change between types inside the modal if user wants */}
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200/50">
                <button
                  type="button"
                  onClick={() => setNewSuratTipe('Masuk')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    newSuratTipe === 'Masuk'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Surat Masuk
                </button>
                <button
                  type="button"
                  onClick={() => setNewSuratTipe('Keluar')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    newSuratTipe === 'Keluar'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  Surat Keluar
                </button>
              </div>

              {newSuratTipe === 'Masuk' ? (
                /* ======================== FORM SURAT MASUK ======================== */
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Nomor Agenda *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: AGE-2026-0041"
                        className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none font-semibold text-slate-800"
                        value={newNomorAgenda}
                        onChange={(e) => setNewNomorAgenda(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Tanggal Agenda *</label>
                      <input
                        type="date"
                        required
                        className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none text-slate-700"
                        value={newTglAgenda}
                        onChange={(e) => setNewTglAgenda(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Nomor Surat *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: 005/124/UPTD-SDA/2026"
                        className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none font-semibold text-slate-750"
                        value={newSuratNo}
                        onChange={(e) => setNewSuratNo(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Tanggal Surat *</label>
                      <input
                        type="date"
                        required
                        className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none text-slate-700"
                        value={newSuratTanggal}
                        onChange={(e) => setNewSuratTanggal(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Asal Pengirim *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Dinas SDA Pemprov Sumut / GP3A"
                      className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none font-semibold text-slate-750"
                      value={newAsalPengirim}
                      onChange={(e) => setNewAsalPengirim(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                /* ======================== FORM SURAT KELUAR ======================== */
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Nomor Surat Keluar *</label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: 045/88/UPTD-SDA/2026"
                        className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none font-semibold text-slate-800"
                        value={newSuratNo}
                        onChange={(e) => setNewSuratNo(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Tanggal Surat Keluar *</label>
                      <input
                        type="date"
                        required
                        className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none text-slate-700"
                        value={newSuratTanggal}
                        onChange={(e) => setNewSuratTanggal(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Tujuan Surat Keluar *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Kepala Dinas Sumber Daya Air / Camat Simalungun"
                      className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:outline-none font-semibold text-slate-750"
                      value={newTujuanSurat}
                      onChange={(e) => setNewTujuanSurat(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Shared fields: Perihal, Tahap Administrasi, PDF Upload */}
              <div className="space-y-3.5 pt-1.5">
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Perihal & Urusan Kedinasan *</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Tuliskan uraian ringkas mengenai isi dan maksud kedinasan surat..."
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none resize-none font-semibold text-slate-700"
                    value={newSuratPerihal}
                    onChange={(e) => setNewSuratPerihal(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Tahap Administrasi Surat *</label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none font-bold text-slate-750"
                    value={newTahapAdministrasi}
                    onChange={(e) => setNewTahapAdministrasi(e.target.value)}
                  >
                    {newSuratTipe === 'Masuk' ? (
                      <>
                        <option value="Registrasi Baru">1. Registrasi & Agenda Baru</option>
                        <option value="Verifikasi Berkas">2. Verifikasi Kelengkapan Berkas</option>
                        <option value="Disposisi Kasubbag Tata Usaha">3. Disposisi Kasubbag Tata Usaha</option>
                        <option value="Disposisi Kepala UPTD">4. Disposisi Kepala UPTD PSA</option>
                        <option value="Selesai & Diarsipkan">5. Selesai & Ditindaklanjuti (Arsip)</option>
                      </>
                    ) : (
                      <>
                        <option value="Penyusunan Draft">1. Penyusunan Draft Surat</option>
                        <option value="Koreksi Kepala Sektor">2. Koreksi / Paraf Kepala Sektor</option>
                        <option value="Tandatangan Kepala UPTD">3. Tandatangan Kepala UPTD</option>
                        <option value="Terenregistrasi & Dikirim">4. Registrasi Nomor & Dikirim (Selesai)</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1">Upload Dokumen Pendukung (Format PDF) *</label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-4 text-center cursor-pointer bg-slate-50 hover:bg-blue-50/25 transition relative">
                    <input 
                      type="file" 
                      accept="application/pdf"
                      required={!newPdfName}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setNewPdfName(e.target.files[0].name);
                        }
                      }}
                    />
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <Download className={`w-5 h-5 ${newPdfName ? 'text-emerald-500 animate-bounce' : 'text-slate-400'}`} />
                      {newPdfName ? (
                        <div className="space-y-0.5">
                          <p className="text-xs font-black text-slate-800 line-clamp-1">{newPdfName}</p>
                          <p className="text-[9px] text-emerald-600 font-extrabold uppercase">File PDF Berhasil Dipilih</p>
                        </div>
                      ) : (
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-600">Seret file atau klik untuk memilih file PDF</p>
                          <p className="text-[9px] text-slate-400">Pastikan berkas berekstensi .pdf (Maks. 5MB)</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 bg-white sticky bottom-0">
                <button
                  type="button"
                  onClick={() => setIsSuratModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 text-white rounded-xl text-xs font-extrabold transition shadow-xs ${
                    newSuratTipe === 'Masuk' ? 'bg-emerald-700 hover:bg-emerald-600' : 'bg-indigo-700 hover:bg-indigo-600'
                  }`}
                >
                  Simpan & Arsipkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADM PERSONALIA MODAL */}
      {isPersonelModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in font-sans">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-100">
            <div className="bg-slate-900 text-slate-100 p-4">
              <h3 className="font-extrabold text-sm">Tambah Pegawai Internal</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Daftarkan personel baru ke database Kepegawaian</p>
            </div>

            <form onSubmit={handleAddPersonel} className="p-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">NIP Resmi (Jika Ada)</label>
                  <input
                    type="text"
                    placeholder="Misal: 1982..."
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    value={newPersNip}
                    onChange={(e) => setNewPersNip(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Status Kepegawaian</label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    value={newPersStatus}
                    onChange={(e: any) => setNewPersStatus(e.target.value)}
                  >
                    <option value="PNS">Aparatur PNS</option>
                    <option value="PPPK">Pegawai PPPK</option>
                    <option value="Honor Daerah">Honor Daerah</option>
                    <option value="Kontrak">Tenaga Kontrak/Lainnya</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sri Hartati, S.H."
                  className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                  value={newPersNama}
                  onChange={(e) => setNewPersNama(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Jabatan Pokok</label>
                  <input
                    type="text"
                    required
                    placeholder="Penata Keuangan, Ka Sub, dll."
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    value={newPersJabatan}
                    onChange={(e) => setNewPersJabatan(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Golongan Kedinasan</label>
                  <input
                    type="text"
                    placeholder="Misal: Penata / III-c"
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    value={newPersGolongan}
                    onChange={(e) => setNewPersGolongan(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Nomor Telepon Seluler</label>
                  <input
                    type="text"
                    placeholder="Misal: 0812-..."
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    value={newPersTelepon}
                    onChange={(e) => setNewPersTelepon(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">E-mail Pegawai</label>
                  <input
                    type="email"
                    placeholder="pegawai@sumutprov.go.id"
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    value={newPersEmail}
                    onChange={(e) => setNewPersEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsPersonelModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INVENTARIS ASET MODAL */}
      {isAsetModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in font-sans">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-100">
            <div className="bg-slate-900 text-slate-100 p-4">
              <h3 className="font-extrabold text-sm">Pencatatan Inventaris Aset</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Input data fisik milik UPTD PSA Bah Bolon</p>
            </div>

            <form onSubmit={handleAddAset} className="p-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Kode Registrasi Aset</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: SDA-AST-2026..."
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    value={newAsetKode}
                    onChange={(e) => setNewAsetKode(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Kelompok/Kategori</label>
                  <input
                    type="text"
                    placeholder="Contoh: Elektronik Kantor"
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    value={newAsetKategori}
                    onChange={(e) => setNewAsetKategori(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Nama Barang / Aset</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pompa Air Listrik Sanyo"
                  className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                  value={newAsetNama}
                  onChange={(e) => setNewAsetNama(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Kuantitas Unit (Volume)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    value={newAsetJumlah}
                    onChange={(e) => setNewAsetJumlah(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Kondisi Fisik</label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    value={newAsetKondisi}
                    onChange={(e: any) => setNewAsetKondisi(e.target.value)}
                  >
                    <option value="Baik">Fisik Baik (Siap)</option>
                    <option value="Rusak Ringan">Rusak Ringan</option>
                    <option value="Rusak Berat">Rusak Berat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Gudang / Lokasi Penyimpanan</label>
                <input
                  type="text"
                  required
                  placeholder="Gudang utama, Ruang rapat, dll."
                  className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                  value={newAsetLokasi}
                  onChange={(e) => setNewAsetLokasi(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAsetModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700"
                >
                  Simpan Aset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* KEUANGAN LEDGER MODAL */}
      {isKeuanganModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in font-sans">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-100">
            <div className="bg-slate-900 text-slate-100 p-4">
              <h3 className="font-extrabold text-sm">Catat Transaksi Kas Ledger</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Catat sirkulasi keuangan masuk atau belanja UPTD</p>
            </div>

            <form onSubmit={handleAddKeuangan} className="p-5 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">No. Bukti / Voucher</label>
                  <input
                    type="text"
                    required
                    placeholder="BKK-015/SDA/2026"
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    value={newKeuNoBukti}
                    onChange={(e) => setNewKeuNoBukti(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Tanggal Transaksi</label>
                  <input
                    type="date"
                    required
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    value={newKeuTanggal}
                    onChange={(e) => setNewKeuTanggal(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Uraian Ringkas Transaksi</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Belanja tinta printer Canon iP2770..."
                  className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                  value={newKeuUraian}
                  onChange={(e) => setNewKeuUraian(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Kategori Rincian</label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    value={newKeuKategori}
                    onChange={(e: any) => setNewKeuKategori(e.target.value)}
                  >
                    <option value="Anggaran DIPA">Alokasi Anggaran DIPA</option>
                    <option value="Belanja Operasional">Belanja Operasional</option>
                    <option value="Pemeliharaan">Pemeliharaan Pintu / Tanggul</option>
                    <option value="Honorarium">Honor Pegawai & Juru</option>
                    <option value="Lain-lain">Rincian Lain-lain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Arah Aliran Arus Kas</label>
                  <select
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none font-bold"
                    value={newKeuTipe}
                    onChange={(e: any) => setNewKeuTipe(e.target.value)}
                  >
                    <option value="Keluar">Uang Belanja / Keluar (Debit)</option>
                    <option value="Masuk">Uang Penerimaan / Masuk (Kredit)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Jumlah Nominal (IDR)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    placeholder="Contoh: 350000"
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none font-extrabold"
                    value={newKeuJumlah || ''}
                    onChange={(e) => setNewKeuJumlah(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Penanggung Jawab / Bendahara</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    value={newKeuPenanggung}
                    onChange={(e) => setNewKeuPenanggung(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsKeuanganModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700"
                >
                  Bukukan Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
