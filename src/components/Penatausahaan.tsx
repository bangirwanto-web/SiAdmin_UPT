import React, { useState, useMemo } from 'react';
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
  Edit,
  Image,
  Upload,
  Check,
  User as UserIcon
} from 'lucide-react';
import { User, Surat, InventarisAset, Personel, Keuangan, RiwayatKepangkatan, RiwayatKgb, RiwayatPendidikan, RiwayatOrangTua, RiwayatPasangan, RiwayatAnak } from '../types';

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
  activeTabOverride?: 'overview' | 'umum' | 'personalia' | 'aset' | 'keuangan';
  onSubTabChange?: (tab: 'overview' | 'umum' | 'personalia' | 'aset' | 'keuangan') => void;
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
  activeTabOverride = 'overview',
  onSubTabChange
}: PenatausahaanProps) {

  const activeSubTab = activeTabOverride;
  const setActiveSubTab = (tab: 'overview' | 'umum' | 'personalia' | 'aset' | 'keuangan') => {
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
  const [newPersFoto, setNewPersFoto] = useState('');
  
  // Custom Detail Fields for editing
  const [newPersTempatLahir, setNewPersTempatLahir] = useState('');
  const [newPersTanggalLahir, setNewPersTanggalLahir] = useState('');
  const [newPersJenisKelamin, setNewPersJenisKelamin] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [newPersAgama, setNewPersAgama] = useState('');
  const [newPersAlamat, setNewPersAlamat] = useState('');
  
  // Custom History Arrays
  const [newPersRiwayatKepangkatan, setNewPersRiwayatKepangkatan] = useState<RiwayatKepangkatan[]>([]);
  const [newPersRiwayatKgb, setNewPersRiwayatKgb] = useState<RiwayatKgb[]>([]);
  const [newPersRiwayatPendidikan, setNewPersRiwayatPendidikan] = useState<RiwayatPendidikan[]>([]);
  const [newPersRiwayatOrangTua, setNewPersRiwayatOrangTua] = useState<RiwayatOrangTua[]>([]);
  const [newPersRiwayatPasangan, setNewPersRiwayatPasangan] = useState<RiwayatPasangan[]>([]);
  const [newPersRiwayatAnak, setNewPersRiwayatAnak] = useState<RiwayatAnak[]>([]);

  // Sub-tab tracking inside personnel modal
  const [activeModalSubTab, setActiveModalSubTab] = useState<'profil' | 'kepangkatan' | 'kgb' | 'pendidikan' | 'orangtua' | 'pasangan' | 'anak'>('profil');

  // Temporary fields for adding single sub-history details
  const [tempKepangkatanGolongan, setTempKepangkatanGolongan] = useState('III-a');
  const [tempKepangkatanPangkat, setTempKepangkatanPangkat] = useState('');
  const [tempKepangkatanTmt, setTempKepangkatanTmt] = useState('');
  const [tempKepangkatanNoSk, setTempKepangkatanNoSk] = useState('');

  const [tempKgbGaji, setTempKgbGaji] = useState<number>(0);
  const [tempKgbTmt, setTempKgbTmt] = useState('');
  const [tempKgbNoSk, setTempKgbNoSk] = useState('');

  const [tempPendidikanTingkat, setTempPendidikanTingkat] = useState('S1');
  const [tempPendidikanInstitusi, setTempPendidikanInstitusi] = useState('');
  const [tempPendidikanJurusan, setTempPendidikanJurusan] = useState('');
  const [tempPendidikanTahun, setTempPendidikanTahun] = useState('');

  const [tempOrangTuaNama, setTempOrangTuaNama] = useState('');
  const [tempOrangTuaHubungan, setTempOrangTuaHubungan] = useState<'Ayah' | 'Ibu'>('Ayah');
  const [tempOrangTuaPekerjaan, setTempOrangTuaPekerjaan] = useState('');

  const [tempPasanganNama, setTempPasanganNama] = useState('');
  const [tempPasanganTglMenikah, setTempPasanganTglMenikah] = useState('');
  const [tempPasanganPekerjaan, setTempPasanganPekerjaan] = useState('');

  const [tempAnakNama, setTempAnakNama] = useState('');
  const [tempAnakTglLahir, setTempAnakTglLahir] = useState('');
  const [tempAnakJenisKelamin, setTempAnakJenisKelamin] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [tempAnakPendidikan, setTempAnakPendidikan] = useState('');

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

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPersFoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
    setNewPersFoto(pers.foto || '');
    
    // Custom sub-fields
    setNewPersTempatLahir(pers.tempatLahir || '');
    setNewPersTanggalLahir(pers.tanggalLahir || '');
    setNewPersJenisKelamin(pers.jenisKelamin || 'Laki-laki');
    setNewPersAgama(pers.agama || '');
    setNewPersAlamat(pers.alamat || '');
    setNewPersRiwayatKepangkatan(pers.riwayatKepangkatan || []);
    setNewPersRiwayatKgb(pers.riwayatKgb || []);
    setNewPersRiwayatPendidikan(pers.riwayatPendidikan || []);
    setNewPersRiwayatOrangTua(pers.riwayatOrangTua || []);
    setNewPersRiwayatPasangan(pers.riwayatPasangan || []);
    setNewPersRiwayatAnak(pers.riwayatAnak || []);
    
    setActiveModalSubTab('profil');
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
    setNewPersFoto('');
    
    // Custom sub-fields
    setNewPersTempatLahir('');
    setNewPersTanggalLahir('');
    setNewPersJenisKelamin('Laki-laki');
    setNewPersAgama('');
    setNewPersAlamat('');
    setNewPersRiwayatKepangkatan([]);
    setNewPersRiwayatKgb([]);
    setNewPersRiwayatPendidikan([]);
    setNewPersRiwayatOrangTua([]);
    setNewPersRiwayatPasangan([]);
    setNewPersRiwayatAnak([]);
    
    setActiveModalSubTab('profil');
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
      email: newPersEmail || '-',
      foto: newPersFoto || '',
      tempatLahir: newPersTempatLahir || '-',
      tanggalLahir: newPersTanggalLahir || '-',
      jenisKelamin: newPersJenisKelamin,
      agama: newPersAgama || '-',
      alamat: newPersAlamat || '-',
      riwayatKepangkatan: newPersRiwayatKepangkatan,
      riwayatKgb: newPersRiwayatKgb,
      riwayatPendidikan: newPersRiwayatPendidikan,
      riwayatOrangTua: newPersRiwayatOrangTua,
      riwayatPasangan: newPersRiwayatPasangan,
      riwayatAnak: newPersRiwayatAnak
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
    setNewPersFoto('');
    setNewPersTempatLahir('');
    setNewPersTanggalLahir('');
    setNewPersJenisKelamin('Laki-laki');
    setNewPersAgama('');
    setNewPersRiwayatKepangkatan([]);
    setNewPersRiwayatKgb([]);
    setNewPersRiwayatPendidikan([]);
    setNewPersRiwayatOrangTua([]);
    setNewPersRiwayatPasangan([]);
    setNewPersRiwayatAnak([]);
  };

  const handleDeletePersonel = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus pegawai ini dari data Kepegawaian internal?')) {
      setPersonelList(personelList.filter(p => p.id !== id));
    }
  };

  // Append helpers for Personnel sub tabs
  const addKepangkatanRow = () => {
    if (!tempKepangkatanPangkat) {
      alert("Mohon masukkan nama pangkat.");
      return;
    }
    const newRow: RiwayatKepangkatan = {
      id: `kep-${Date.now()}`,
      golongan: tempKepangkatanGolongan,
      pangkat: tempKepangkatanPangkat,
      tmt: tempKepangkatanTmt || '-',
      noSk: tempKepangkatanNoSk || '-'
    };
    setNewPersRiwayatKepangkatan([...newPersRiwayatKepangkatan, newRow]);
    setTempKepangkatanPangkat('');
    setTempKepangkatanTmt('');
    setTempKepangkatanNoSk('');
  };

  const addKgbRow = () => {
    if (tempKgbGaji <= 0) {
      alert("Mohon masukkan nominal Gaji Pokok.");
      return;
    }
    const newRow: RiwayatKgb = {
      id: `kgb-${Date.now()}`,
      gajiPokok: Number(tempKgbGaji),
      tmt: tempKgbTmt || '-',
      noSk: tempKgbNoSk || '-'
    };
    setNewPersRiwayatKgb([...newPersRiwayatKgb, newRow]);
    setTempKgbGaji(0);
    setTempKgbTmt('');
    setTempKgbNoSk('');
  };

  const addPendidikanRow = () => {
    if (!tempPendidikanInstitusi) {
      alert("Mohon masukkan nama institusi/sekolah.");
      return;
    }
    const newRow: RiwayatPendidikan = {
      id: `edu-${Date.now()}`,
      tingkat: tempPendidikanTingkat,
      institusi: tempPendidikanInstitusi,
      jurusan: tempPendidikanJurusan || '-',
      tahunLulus: tempPendidikanTahun || '-'
    };
    setNewPersRiwayatPendidikan([...newPersRiwayatPendidikan, newRow]);
    setTempPendidikanInstitusi('');
    setTempPendidikanJurusan('');
    setTempPendidikanTahun('');
  };

  const addOrangTuaRow = () => {
    if (!tempOrangTuaNama) {
      alert("Mohon masukkan nama orang tua.");
      return;
    }
    const newRow: RiwayatOrangTua = {
      id: `ortu-${Date.now()}`,
      nama: tempOrangTuaNama,
      hubungan: tempOrangTuaHubungan,
      pekerjaan: tempOrangTuaPekerjaan || '-'
    };
    setNewPersRiwayatOrangTua([...newPersRiwayatOrangTua, newRow]);
    setTempOrangTuaNama('');
    setTempOrangTuaPekerjaan('');
  };

  const addPasanganRow = () => {
    if (!tempPasanganNama) {
      alert("Mohon masukkan nama pasangan.");
      return;
    }
    const newRow: RiwayatPasangan = {
      id: `pas-${Date.now()}`,
      nama: tempPasanganNama,
      tglMenikah: tempPasanganTglMenikah || '-',
      pekerjaan: tempPasanganPekerjaan || '-'
    };
    setNewPersRiwayatPasangan([...newPersRiwayatPasangan, newRow]);
    setTempPasanganNama('');
    setTempPasanganTglMenikah('');
    setTempPasanganPekerjaan('');
  };

  const addAnakRow = () => {
    if (!tempAnakNama) {
      alert("Mohon masukkan nama anak.");
      return;
    }
    const newRow: RiwayatAnak = {
      id: `ank-${Date.now()}`,
      nama: tempAnakNama,
      tglLahir: tempAnakTglLahir || '-',
      jenisKelamin: tempAnakJenisKelamin,
      pendidikan: tempAnakPendidikan || '-'
    };
    setNewPersRiwayatAnak([...newPersRiwayatAnak, newRow]);
    setTempAnakNama('');
    setTempAnakTglLahir('');
    setTempAnakPendidikan('');
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

  // Group employee grade (golongan) data sorted by standard rank
  const golonganCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    personelList.forEach(p => {
      const g = p.golongan || 'Non-Eselon';
      counts[g] = (counts[g] || 0) + 1;
    });

    const getGolonganRank = (gName: string): number => {
      const norm = gName.toLowerCase();
      if (norm.includes('iv-e') || norm.includes('iv/e')) return 18;
      if (norm.includes('iv-d') || norm.includes('iv/d')) return 17;
      if (norm.includes('iv-c') || norm.includes('iv/c')) return 16;
      if (norm.includes('iv-b') || norm.includes('iv/b')) return 15;
      if (norm.includes('iv-a') || norm.includes('iv/a')) return 14;
      if (norm.includes('iii-d') || norm.includes('iii/d')) return 13;
      if (norm.includes('iii-c') || norm.includes('iii/c')) return 12;
      if (norm.includes('iii-b') || norm.includes('iii/b')) return 11;
      if (norm.includes('iii-a') || norm.includes('iii/a')) return 10;
      if (norm.includes('ii-d') || norm.includes('ii/d')) return 9;
      if (norm.includes('ii-c') || norm.includes('ii/c')) return 8;
      if (norm.includes('ii-b') || norm.includes('ii/b')) return 7;
      if (norm.includes('ii-a') || norm.includes('ii/a')) return 6;
      if (norm.includes('i-d') || norm.includes('i/d')) return 5;
      if (norm.includes('i-c') || norm.includes('i/c')) return 4;
      if (norm.includes('i-b') || norm.includes('i/b')) return 3;
      if (norm.includes('i-a') || norm.includes('i/a')) return 2;
      if (norm.includes('non-eselon') || norm.includes('non-asn') || norm.includes('tanpa')) return 1;
      return 0;
    };

    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
        rank: getGolonganRank(name)
      }))
      .sort((a, b) => b.rank - a.rank);
  }, [personelList]);

  const maxGolonganCount = useMemo(() => {
    if (golonganCounts.length === 0) return 1;
    return Math.max(...golonganCounts.map(item => item.count));
  }, [golonganCounts]);

  const genderCounts = useMemo(() => {
    const counts: { [key: string]: number } = { 'Laki-laki': 0, 'Perempuan': 0 };
    personelList.forEach(p => {
      const key = p.jenisKelamin || 'Laki-laki';
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      rank: name === 'Laki-laki' ? 2 : 1
    }));
  }, [personelList]);

  const agamaCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    personelList.forEach(p => {
      const key = p.agama || 'Tidak Terdata';
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({
        name,
        count,
        rank: name === 'Islam' ? 6 : name.includes('Kristen') ? 5 : name === 'Katolik' ? 4 : name === 'Hindu' ? 3 : name === 'Buddha' ? 2 : 1
      }))
      .sort((a, b) => b.count - a.count);
  }, [personelList]);

  const pendidikanCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    
    const getHighestPendidikan = (p: Personel): string => {
      if (!p.riwayatPendidikan || p.riwayatPendidikan.length === 0) {
        return 'Tidak Terdata';
      }
      const ranks: { [key: string]: number } = {
        'S3': 9,
        'S2': 8,
        'S1': 7,
        'D4': 6,
        'D3': 5,
        'D1': 4,
        'SMA': 3,
        'SMP': 2,
        'SD': 1
      };
      let highest = p.riwayatPendidikan[0];
      let highestRank = ranks[highest.tingkat] || 0;
      p.riwayatPendidikan.forEach(edu => {
        const r = ranks[edu.tingkat] || 0;
        if (r > highestRank) {
          highestRank = r;
          highest = edu;
        }
      });
      return highest.tingkat;
    };

    personelList.forEach(p => {
      const key = getHighestPendidikan(p);
      counts[key] = (counts[key] || 0) + 1;
    });

    const educationRank = (eduName: string): number => {
      const ranks: { [key: string]: number } = {
        'S3': 9,
        'S2': 8,
        'S1': 7,
        'D4': 6,
        'D3': 5,
        'D1': 4,
        'SMA': 3,
        'SMP': 2,
        'SD': 1,
        'Tidak Terdata': 0
      };
      return ranks[eduName] || 0;
    };

    return Object.entries(counts)
      .map(([name, count]) => ({ name, count, rank: educationRank(name) }))
      .sort((a, b) => b.rank - a.rank);
  }, [personelList]);



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
      </div>

      {/* ----------------- 0. MAIN DASHBOARD OVERVIEW ----------------- */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Summary Indicator Banner */}
          <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Dashboard Penatausahaan</p>
              <h2 className="text-lg font-black tracking-tight mt-0.5">Ringkasan Tata Kelola & Administrasi</h2>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Rekapitulasi data kepegawaian, surat dinas masuk/keluar, logistika aset operasional, serta realisasi pembukuan anggaran internal.
              </p>
            </div>
            <div className="bg-blue-950/80 px-4 py-2.5 rounded-xl border border-blue-800/45 text-right font-mono self-stretch sm:self-center flex flex-col justify-center">
              <span className="text-[9px] text-blue-300 uppercase font-black tracking-widest block">Update Terakhir</span>
              <span className="text-xs font-bold text-white mt-0.5">Hari Ini, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-3.5">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Users className="w-5.5 h-5.5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-black tracking-wider text-slate-400">Total Pegawai</p>
                <h3 className="text-base font-extrabold text-slate-800 mt-0.5">{personelList.length} Personel</h3>
                <p className="text-[9.5px] text-slate-400 mt-0.5">
                  {personelList.filter(p => p.statusKepegawaian === 'PNS').length} PNS &bull; {personelList.filter(p => p.statusKepegawaian === 'PPPK').length} PPPK
                </p>
              </div>
            </div>

            <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-3.5">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <Mail className="w-5.5 h-5.5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-black tracking-wider text-slate-400">Arsip Surat</p>
                <h3 className="text-base font-extrabold text-slate-800 mt-0.5">{suratList.length} Berkas</h3>
                <p className="text-[9.5px] text-slate-400 mt-0.5">
                  {suratList.filter(s => s.tipe === 'Masuk').length} Masuk &bull; {suratList.filter(s => s.tipe === 'Keluar').length} Keluar
                </p>
              </div>
            </div>

            <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-3.5">
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                <Database className="w-5.5 h-5.5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-black tracking-wider text-slate-400">Inventaris Aset</p>
                <h3 className="text-base font-extrabold text-slate-800 mt-0.5">
                  {inventarisList.reduce((sum, item) => sum + item.jumlah, 0)} Unit
                </h3>
                <p className="text-[9.5px] text-slate-400 mt-0.5">
                  {inventarisList.filter(item => item.kondisi === 'Baik').length} Kondisi Baik
                </p>
              </div>
            </div>

            <div className="bg-white p-4.5 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-3.5">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <DollarSign className="w-5.5 h-5.5" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-black tracking-wider text-slate-400">Kas Internal</p>
                <h3 className="text-base font-extrabold text-slate-800 mt-0.5">{formatRupiah(saldoKas)}</h3>
                <p className="text-[9.5px] text-slate-400 mt-0.5 font-mono">
                  Sisa Saldo Anggaran
                </p>
              </div>
            </div>
          </div>

          {/* 4 Kolom Grafik / Chart Pegawai */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4 w-full">
            {/* 1. Golongan / Pangkat Chart */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-50">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800">Pangkat & Golongan</h3>
                    <p className="text-[10px] text-slate-400">Distribusi kepangkatan pegawai</p>
                  </div>
                </div>

                {golonganCounts.length > 0 ? (
                  <div className="h-44 flex items-end justify-between gap-1.5 pt-6 pb-2 border-b border-dashed border-slate-100">
                    {golonganCounts.slice(0, 7).map((item) => {
                      const percentage = Math.round((item.count / personelList.length) * 100);
                      const heightPercent = `${(item.count / maxGolonganCount) * 100}%`;
                      let barColor = 'bg-blue-500 hover:bg-blue-600';
                      if (item.rank >= 14) barColor = 'bg-indigo-500 hover:bg-indigo-600';
                      else if (item.rank >= 10) barColor = 'bg-emerald-500 hover:bg-emerald-600';
                      else if (item.rank >= 6) barColor = 'bg-purple-500 hover:bg-purple-600';
                      else if (item.rank >= 2) barColor = 'bg-amber-500 hover:bg-amber-600';
                      else barColor = 'bg-slate-400 hover:bg-slate-500';

                      return (
                        <div key={item.name} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                          {/* Tooltip */}
                          <div className="absolute bottom-full mb-1.5 bg-slate-800 text-white text-[9px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center whitespace-nowrap shadow-md">
                            <span className="font-extrabold block">{item.name}</span>
                            <span>{item.count} Org ({percentage}%)</span>
                          </div>
                          {/* Column Bar Area */}
                          <div className="w-full max-w-[24px] sm:max-w-[28px] bg-slate-50/50 hover:bg-slate-50 rounded-t-lg transition-colors flex items-end h-[115px] p-0.5">
                            <div 
                              className={`w-full ${barColor} rounded-t-md transition-all duration-500 cursor-pointer relative flex justify-center`}
                              style={{ height: heightPercent || '4%' }}
                            >
                              <span className="absolute -top-5 text-center text-[10px] font-extrabold text-slate-700">
                                {item.count}
                              </span>
                            </div>
                          </div>
                          {/* Label below */}
                          <span className="text-[9px] font-black text-slate-500 mt-1 truncate max-w-full text-center" title={item.name}>
                            {item.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    Belum ada data golongan.
                  </div>
                )}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-50 text-[9.5px] text-slate-400">
                Total Kategori: <span className="font-extrabold text-slate-600">{golonganCounts.length} Kategori</span>
              </div>
            </div>

            {/* 2. Jenis Kelamin Chart */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-50">
                  <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800">Jenis Kelamin</h3>
                    <p className="text-[10px] text-slate-400">Rasio gender - donut chart</p>
                  </div>
                </div>

                {genderCounts.length > 0 ? (
                  (() => {
                    const totalGender = genderCounts.reduce((sum, g) => sum + g.count, 0) || 1;
                    const maleCount = genderCounts.find(g => g.name === 'Laki-laki')?.count || 0;
                    const femaleCount = genderCounts.find(g => g.name === 'Perempuan')?.count || 0;
                    const malePercent = Math.round((maleCount / totalGender) * 100);
                    const femalePercent = Math.round((femaleCount / totalGender) * 100);
                    const r = 32;
                    const circumference = 2 * Math.PI * r;
                    const maleStroke = (circumference * maleCount) / totalGender;
                    const femaleStroke = (circumference * femaleCount) / totalGender;

                    return (
                      <div className="h-44 flex items-center justify-between gap-4 pt-4 pb-2 border-b border-dashed border-slate-100">
                        {/* Donut circle representation */}
                        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full transform -rotate-90 origin-center" viewBox="0 0 100 100">
                            {/* Track */}
                            <circle 
                              cx="50" 
                              cy="50" 
                              r={r} 
                              fill="transparent" 
                              stroke="#f1f5f9" 
                              strokeWidth="8" 
                            />
                            {/* Male Arc */}
                            {maleCount > 0 && (
                              <circle 
                                cx="50" 
                                cy="50" 
                                r={r} 
                                fill="transparent" 
                                stroke="#0ea5e9" 
                                strokeWidth="10" 
                                strokeDasharray={`${maleStroke} ${circumference}`} 
                                strokeDashoffset={0} 
                                strokeLinecap={femaleCount > 0 ? 'butt' : 'round'}
                                className="transition-all duration-700 ease-out"
                              />
                            )}
                            {/* Female Arc */}
                            {femaleCount > 0 && (
                              <circle 
                                cx="50" 
                                cy="50" 
                                r={r} 
                                fill="transparent" 
                                stroke="#f43f5e" 
                                strokeWidth="10" 
                                strokeDasharray={`${femaleStroke} ${circumference}`} 
                                strokeDashoffset={-maleStroke} 
                                strokeLinecap={maleCount > 0 ? 'butt' : 'round'}
                                className="transition-all duration-700 ease-out"
                              />
                            )}
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-sm font-black text-slate-800 leading-none">{totalGender}</span>
                            <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Pegawai</span>
                          </div>
                        </div>

                        {/* Legends with detail */}
                        <div className="flex-1 flex flex-col justify-center gap-3">
                          <div className="bg-sky-50/50 rounded-lg p-2 border border-sky-100/40 flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />
                            <div className="min-w-0">
                              <span className="text-[9px] font-extrabold text-slate-500 block uppercase tracking-wider">Pria</span>
                              <span className="text-xs font-black text-slate-800 font-mono">{maleCount} Org ({malePercent}%)</span>
                            </div>
                          </div>
                          
                          <div className="bg-rose-50/50 rounded-lg p-2 border border-rose-100/40 flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                            <div className="min-w-0">
                              <span className="text-[9px] font-extrabold text-slate-500 block uppercase tracking-wider">Wanita</span>
                              <span className="text-xs font-black text-slate-800 font-mono">{femaleCount} Org ({femalePercent}%)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    Belum ada data gender.
                  </div>
                )}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-50 text-[9.5px] text-slate-400">
                Pria: <span className="font-extrabold text-sky-600">{personelList.filter(p => p.jenisKelamin === 'Laki-laki').length}</span> &bull; 
                Wanita: <span className="font-extrabold text-rose-600">{personelList.filter(p => p.jenisKelamin === 'Perempuan').length}</span>
              </div>
            </div>

            {/* 3. Latar Belakang Agama Chart */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-50">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800">Agama / Kepercayaan</h3>
                    <p className="text-[10px] text-slate-400">Ragam keyakinan staf - pie chart</p>
                  </div>
                </div>

                {agamaCounts.length > 0 ? (
                  (() => {
                    const totalAgama = personelList.length || 1;
                    const colors: { [key: string]: string } = {
                      'Islam': '#10b981', 
                      'Kristen Protestan': '#6366f1', 
                      'Katolik': '#3b82f6', 
                      'Hindu': '#f59e0b', 
                      'Buddha': '#ec4899', 
                      'Kristen': '#818cf8', 
                      'Konghucu': '#ef4444', 
                      'Tidak Terdata': '#94a3b8'
                    };
                    const defaultColors = ['#10b981', '#6366f1', '#3b82f6', '#f59e0b', '#ec4899', '#94a3b8'];
                    
                    let accumulated = 0;
                    const parts = agamaCounts.map((item, idx) => {
                      const percentage = (item.count / totalAgama) * 100;
                      const start = accumulated;
                      accumulated += percentage;
                      const color = colors[item.name] || defaultColors[idx % defaultColors.length];
                      return `${color} ${start}% ${accumulated}%`;
                    });
                    const conicGradientString = parts.length > 0 ? `conic-gradient(${parts.join(', ')})` : 'conic-gradient(#cbd5e1 0% 100%)';

                    return (
                      <div className="h-44 flex items-center justify-between gap-4 pt-4 pb-2 border-b border-dashed border-slate-100">
                        {/* Conic Gradient Pie circle */}
                        <div className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-md shrink-0 transition-transform hover:scale-105"
                             style={{ background: conicGradientString }}>
                          {/* Mini cutout to look extra clean */}
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-xs border border-slate-100/50">
                            <span className="text-[8px] font-black text-slate-400">Pie</span>
                          </div>
                        </div>

                        {/* Legends with detail (limit top 4) */}
                        <div className="flex-1 flex flex-col justify-center gap-1.5 min-w-0">
                          {agamaCounts.slice(0, 4).map((item, idx) => {
                            const percentVal = Math.round((item.count / totalAgama) * 100);
                            const markerColor = colors[item.name] || defaultColors[idx % defaultColors.length];
                            return (
                              <div key={item.name} className="flex items-center gap-1.5 text-[10px] min-w-0">
                                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: markerColor }} />
                                <div className="flex justify-between w-full min-w-0">
                                  <span className="text-slate-600 font-extrabold truncate mr-1 block leading-tight">{item.name}</span>
                                  <span className="text-slate-500 font-bold font-mono shrink-0">{item.count} ({percentVal}%)</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    Belum ada data agama.
                  </div>
                )}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-50 text-[9.5px] text-slate-400">
                Mayoritas: <span className="font-extrabold text-slate-600">{agamaCounts[0]?.name || '-'}</span>
              </div>
            </div>

            {/* 4. Kualifikasi Pendidikan Chart */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xs p-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-50">
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800">Tingkat Pendidikan</h3>
                    <p className="text-[10px] text-slate-400">Kualifikasi akademik tertinggi</p>
                  </div>
                </div>

                {pendidikanCounts.length > 0 ? (
                  <div className="h-44 flex flex-col justify-center gap-3 pt-3 pb-2 border-b border-dashed border-slate-100">
                    {pendidikanCounts.slice(0, 4).map((item) => {
                      const percentage = Math.round((item.count / personelList.length) * 100);
                      const maxPendidikanLocal = Math.max(...pendidikanCounts.map(g => g.count), 1);
                      const widthPercent = `${(item.count / maxPendidikanLocal) * 100}%`;
                      let barColor = 'bg-purple-500 hover:bg-purple-600';
                      if (item.rank >= 7) barColor = 'bg-purple-500 hover:bg-purple-600';
                      else if (item.rank >= 4) barColor = 'bg-cyan-500 hover:bg-cyan-600';
                      else barColor = 'bg-amber-500 hover:bg-amber-600';

                      return (
                        <div key={item.name} className="space-y-1 group">
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className="text-slate-700 font-extrabold">{item.name}</span>
                            <span className="text-slate-500 font-bold font-mono">{item.count} Org ({percentage}%)</span>
                          </div>
                          <div className="h-2 w-full bg-slate-50 rounded-lg overflow-hidden border border-slate-100/50">
                            <div 
                              className={`h-full ${barColor} rounded-r-lg transition-all duration-500`}
                              style={{ width: widthPercent }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    Belum ada data pendidikan.
                  </div>
                )}
              </div>
              <div className="mt-4 pt-3 border-t border-slate-50 text-[9.5px] text-slate-400">
                Pendidikan S1+: <span className="font-extrabold text-slate-600">{
                  personelList.filter(p => p.riwayatPendidikan?.some(edu => ['S1', 'S2', 'S3'].includes(edu.tingkat))).length
                } orang</span>
              </div>
            </div>
          </div>
        </div>
      )}

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

          {/* Data table controls & list */}
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
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                              {p.foto ? (
                                <img
                                  referrerPolicy="no-referrer"
                                  src={p.foto}
                                  alt={p.nama}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <UserIcon className="w-4 h-4 text-slate-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-extrabold text-slate-800">{p.nama}</p>
                              <p className="text-[9.5px] text-slate-400 font-mono mt-0.5">NIP: {p.nip}</p>
                            </div>
                          </div>
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden border border-slate-100 flex flex-col md:flex-row h-[85vh] md:h-[700px]">
            
            {/* LEFT PROFILE SIDEBAR / CATEGORY SWITCHER */}
            <div className="w-full md:w-64 bg-slate-900 text-slate-100 flex flex-col justify-between shrink-0 border-r border-slate-800">
              <div className="p-4.5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-blue-750 rounded-lg text-white">
                    <Users className="w-4 h-4 text-sky-450" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs tracking-tight">
                      {editingPersonelId ? 'Ubah Rincian Pegawai' : 'Tambah Pegawai Baru'}
                    </h3>
                    <p className="text-[9px] text-slate-400">Pemberkasan Arsip Kepegawaian</p>
                  </div>
                </div>

                {/* Vertical Tabs navigation */}
                <nav className="space-y-1">
                  {[
                    { id: 'profil', label: 'Profil Pegawai', desc: 'Identitas & Biodata', icon: UserIcon, count: null },
                    { id: 'kepangkatan', label: 'Riwayat Kepangkatan', desc: 'Jenjang Golongan/Pangkat', icon: Award, count: newPersRiwayatKepangkatan.length },
                    { id: 'kgb', label: 'Riwayat KGB', desc: 'Kenaikan Gaji Berkala', icon: TrendingUp, count: newPersRiwayatKgb.length },
                    { id: 'pendidikan', label: 'Riwayat Pendidikan', desc: 'Riwayat Studi Akademik', icon: BookOpen, count: newPersRiwayatPendidikan.length },
                    { id: 'orangtua', label: 'Riwayat Orang Tua', desc: 'Data Orang Tua Kandung', icon: Users, count: newPersRiwayatOrangTua.length },
                    { id: 'pasangan', label: 'Riwayat Pasangan', desc: 'Pernikahan / Suami / Istri', icon: CheckCircle, count: newPersRiwayatPasangan.length },
                    { id: 'anak', label: 'Riwayat Anak', desc: 'Detail Anak / Tanggungan', icon: Plus, count: newPersRiwayatAnak.length },
                  ].map((tab) => {
                    const IconComp = tab.icon;
                    const isActive = activeModalSubTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveModalSubTab(tab.id as any)}
                        className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-all group ${
                          isActive 
                            ? 'bg-blue-600 text-white font-bold shadow-xs' 
                            : 'text-slate-400 hover:text-slate-150 hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                          <div className="truncate">
                            <span className="block text-[11px] leading-tight font-bold">{tab.label}</span>
                            <span className="block text-[8px] group-hover:text-slate-300 truncate mt-0.5" style={{ color: isActive ? '#93c5fd' : '#94a3b8' }}>
                              {tab.desc}
                            </span>
                          </div>
                        </div>
                        {tab.count !== null && tab.count > 0 && (
                          <span className={`px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}`}>
                            {tab.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Informative footer */}
              <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 text-[9px] text-slate-400 leading-relaxed font-mono">
                Klik tombol "Simpan Perubahan" di pojok kanan bawah setelah selesai mengubah seluruh bagian.
              </div>
            </div>

            {/* RIGHT SCROLLABLE CONTENT SECTION */}
            <div className="flex-1 flex flex-col bg-slate-50 min-w-0 h-full">
              <div className="flex-1 overflow-y-auto p-6">
                
                {activeModalSubTab === 'profil' && (
                  /* ================= TAB 1: PROFIL PEGAWAI ================= */
                  <div className="space-y-5 animate-fade-in">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-800">Profil & Identitas Pegawai</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Informasi fundamental identitas kedinasan dan kepribadian</p>
                    </div>

                    {/* Foto Profil Upload */}
                    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                        {newPersFoto ? (
                          <img src={newPersFoto} alt="Preview Foto" className="w-full h-full object-cover" />
                        ) : (
                          <UserIcon className="w-7 h-7 text-slate-400" />
                        )}
                        {newPersFoto && (
                          <button
                            type="button"
                            onClick={() => setNewPersFoto('')}
                            className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[9px] font-bold"
                          >
                            Hapus
                          </button>
                        )}
                      </div>
                      <div className="space-y-1">
                        <span className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Unggah Foto Resmi</span>
                        <p className="text-[9px] text-slate-400 leading-normal">Gunakan pasfoto berlatar belakang merah / biru (tipe JPG/PNG up to 2MB)</p>
                        <div className="flex items-center gap-2 mt-1">
                          <label className="cursor-pointer bg-slate-50 hover:bg-slate-100 border border-slate-200 shadow-sm px-2.5 py-1 text-[11px] font-bold text-slate-700 rounded-lg transition flex items-center gap-1.5">
                            <Image className="w-3.5 h-3.5 text-slate-500" />
                            <span>Pilih Foto</span>
                            <input 
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handlePhotoUpload}
                            />
                          </label>
                          {newPersFoto && (
                            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> Berhasil Dimuat
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Nama Lengkap & Gelar *</label>
                        <input
                          type="text"
                          required
                          placeholder="Nama lengkap beserta gelar akademik"
                          className="w-full border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-800"
                          value={newPersNama}
                          onChange={(e) => setNewPersNama(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Nomor Induk Pegawai (NIP/NIPPPK) *</label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: 198208172009121003 atau '-'"
                          className="w-full border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-800"
                          value={newPersNip}
                          onChange={(e) => setNewPersNip(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Status Pegawai *</label>
                        <select
                          className="w-full border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-bold focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-800"
                          value={newPersStatus}
                          onChange={(e: any) => setNewPersStatus(e.target.value)}
                        >
                          <option value="PNS">Aparatur PNS</option>
                          <option value="PPPK">Pegawai PPPK</option>
                          <option value="Honor Daerah">Honor Daerah</option>
                          <option value="Kontrak">Tenaga Kontrak/Lainnya</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Golongan Kedinasan *</label>
                        <select
                          className="w-full border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-bold focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-800"
                          value={newPersGolongan}
                          onChange={(e) => setNewPersGolongan(e.target.value)}
                        >
                          <option value="Non-Eselon">Non-ASN / Tanpa Golongan</option>
                          <option value="I-a">Golongan I/a - Juru Muda</option>
                          <option value="I-b">Golongan I/b - Juru Muda Tk. I</option>
                          <option value="I-c">Golongan I/c - Juru</option>
                          <option value="I-d">Golongan I/d - Juru Tk. I</option>
                          <option value="II-a">Golongan II/a - Pengatur Muda</option>
                          <option value="II-b">Golongan II/b - Pengatur Muda Tk. I</option>
                          <option value="II-c">Golongan II/c - Pengatur</option>
                          <option value="II-d">Golongan II/d - Pengatur Tk. I</option>
                          <option value="III-a">Golongan III/a - Penata Muda</option>
                          <option value="III-b">Golongan III/b - Penata Muda Tk. I</option>
                          <option value="III-c">Golongan III/c - Penata</option>
                          <option value="III-d">Golongan III/d - Penata Tk. I</option>
                          <option value="IV-a">Golongan IV/a - Pembina</option>
                          <option value="IV-b">Golongan IV/b - Pembina Tk. I</option>
                          <option value="IV-c">Golongan IV/c - Pembina Utama Muda</option>
                          <option value="IV-d">Golongan IV/d - Pembina Utama Madya</option>
                          <option value="IV-e">Golongan IV/e - Pembina Utama</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Jabatan Pokok *</label>
                        <input
                          type="text"
                          required
                          placeholder="Contoh: Ka Subbag Tata Usaha"
                          className="w-full border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-800"
                          value={newPersJabatan}
                          onChange={(e) => setNewPersJabatan(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">No. Telepon Aktif</label>
                        <input
                          type="text"
                          placeholder="Contoh: 081234567890"
                          className="w-full border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-800"
                          value={newPersTelepon}
                          onChange={(e) => setNewPersTelepon(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Alamat Email Resmi</label>
                        <input
                          type="email"
                          placeholder="Contoh: nama@sumutprov.go.id"
                          className="w-full border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-800"
                          value={newPersEmail}
                          onChange={(e) => setNewPersEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* NEW FIELDS REQUESTED: profil pegawai (tempat lahir, tgl lahir, jenis kelamin, agama) */}
                    <div className="border-t border-slate-200 pt-4">
                      <h5 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">Informasi Biodata Profil Pribadi</h5>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Tempat Lahir</label>
                          <input
                            type="text"
                            placeholder="Contoh: Medan / Pematangsiantar"
                            className="w-full border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-800"
                            value={newPersTempatLahir}
                            onChange={(e) => setNewPersTempatLahir(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Tanggal Lahir</label>
                          <input
                            type="date"
                            className="w-full border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-700"
                            value={newPersTanggalLahir}
                            onChange={(e) => setNewPersTanggalLahir(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Jenis Kelamin</label>
                          <select
                            className="w-full border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-bold focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-800"
                            value={newPersJenisKelamin}
                            onChange={(e: any) => setNewPersJenisKelamin(e.target.value)}
                          >
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Agama</label>
                          <select
                            className="w-full border border-slate-200 bg-white rounded-xl px-3 py-1.5 text-xs font-bold focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-800"
                            value={newPersAgama}
                            onChange={(e) => setNewPersAgama(e.target.value)}
                          >
                            <option value="">-- Pilih Agama --</option>
                            <option value="Islam">Islam</option>
                            <option value="Kristen Protestan">Kristen Protestan</option>
                            <option value="Katolik">Katolik</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Buddha">Buddha</option>
                            <option value="Khonghucu">Khonghucu</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Alamat Tempat Tinggal</label>
                        <textarea
                          placeholder="Masukkan alamat lengkap rumah tinggal saat ini"
                          className="w-full border border-slate-200 bg-white rounded-xl px-3 py-2 text-xs font-semibold focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-slate-800 h-20 resize-none leading-relaxed"
                          value={newPersAlamat}
                          onChange={(e) => setNewPersAlamat(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeModalSubTab === 'kepangkatan' && (
                  /* ================= TAB 2: RIWAYAT KEPANGKATAN ================= */
                  <div className="space-y-5 animate-fade-in">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-800">Riwayat Kepangkatan</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Daftar kenaikan pangkat dan golongan resmi Surat Keputusan (SK)</p>
                    </div>

                    {/* Array List */}
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden text-xs">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 font-extrabold text-[9px] uppercase tracking-wider text-left border-b border-slate-150">
                            <th className="py-2.5 px-3">Golongan</th>
                            <th className="py-2.5 px-3">Nama Pangkat</th>
                            <th className="py-2.5 px-3">TMT</th>
                            <th className="py-2.5 px-3">Nomor SK</th>
                            <th className="py-2.5 px-3 text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                          {newPersRiwayatKepangkatan.length > 0 ? (
                            newPersRiwayatKepangkatan.map((row) => (
                              <tr key={row.id} className="hover:bg-slate-50/50">
                                <td className="py-2 px-3 font-mono text-blue-600 font-bold">{row.golongan}</td>
                                <td className="py-2 px-3">{row.pangkat}</td>
                                <td className="py-2 px-3 font-mono text-slate-500">{row.tmt}</td>
                                <td className="py-2 px-3 max-w-[125px] truncate text-slate-600">{row.noSk}</td>
                                <td className="py-2 px-3 text-center">
                                  <button
                                    type="button"
                                    onClick={() => setNewPersRiwayatKepangkatan(newPersRiwayatKepangkatan.filter(item => item.id !== row.id))}
                                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="py-6 text-center text-slate-400 font-medium">
                                Belum ada riwayat kepangkatan yang terdaftar.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Add Inline Form */}
                    <div className="bg-slate-100/70 p-4 rounded-xl border border-slate-200/55 space-y-3">
                      <span className="block text-[10px] font-black text-blue-800 uppercase tracking-widest">Tambah Riwayat Kepangkatan Baru</span>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Golongan</label>
                          <select
                            className="w-full border border-slate-200 bg-white rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none"
                            value={tempKepangkatanGolongan}
                            onChange={(e) => setTempKepangkatanGolongan(e.target.value)}
                          >
                            <option value="I-a">I-a - Juru Muda</option>
                            <option value="I-b">I-b - Juru Muda Tk. I</option>
                            <option value="I-c">I-c - Juru</option>
                            <option value="I-d">I-d - Juru Tk. I</option>
                            <option value="II-a">II-a - Pengatur Muda</option>
                            <option value="II-b">II-b - Pengatur Muda Tk. I</option>
                            <option value="II-c">II-c - Pengatur</option>
                            <option value="II-d">II-d - Pengatur Tk. I</option>
                            <option value="III-a">III-a - Penata Muda</option>
                            <option value="III-b">III-b - Penata Muda Tk. I</option>
                            <option value="III-c">III-c - Penata</option>
                            <option value="III-d">III-d - Penata Tk. I</option>
                            <option value="IV-a">IV-a - Pembina</option>
                            <option value="IV-b">IV-b - Pembina Tk. I</option>
                            <option value="IV-c">IV-c - Pembina Utama Muda</option>
                            <option value="IV-d">IV-d - Pembina Utama Madya</option>
                            <option value="IV-e">IV-e - Pembina Utama</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Pangkat / Gelar</label>
                          <input
                            type="text"
                            placeholder="Contoh: Penata Muda"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs text-slate-800"
                            value={tempKepangkatanPangkat}
                            onChange={(e) => setTempKepangkatanPangkat(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">TMT (Terhitung Mulai Tanggal)</label>
                          <input
                            type="date"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs text-slate-700"
                            value={tempKepangkatanTmt}
                            onChange={(e) => setTempKepangkatanTmt(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor SK Resmi</label>
                          <input
                            type="text"
                            placeholder="Contoh: 821.2/121/UPTD-SDA/2026"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs text-slate-800"
                            value={tempKepangkatanNoSk}
                            onChange={(e) => setTempKepangkatanNoSk(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={addKepangkatanRow}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all"
                        >
                          <Plus className="w-4 h-4 text-white" />
                          <span>Tambahkan ke Daftar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeModalSubTab === 'kgb' && (
                  /* ================= TAB 3: RIWAYAT KGB ================= */
                  <div className="space-y-5 animate-fade-in">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-800">Riwayat Kenaikan Gaji Berkala (KGB)</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Catatan surat keputusan KGB penyesuaian nominal gaji pokok staf</p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden text-xs">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 font-extrabold text-[9px] uppercase tracking-wider text-left border-b border-slate-150">
                            <th className="py-2.5 px-3">Gaji Pokok</th>
                            <th className="py-2.5 px-3">TMT KGB</th>
                            <th className="py-2.5 px-3">Nomor Surat SK KGB</th>
                            <th className="py-2.5 px-3 text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                          {newPersRiwayatKgb.length > 0 ? (
                            newPersRiwayatKgb.map((row) => (
                              <tr key={row.id} className="hover:bg-slate-50/50">
                                <td className="py-2 px-3 text-emerald-600 font-bold">{formatRupiah(row.gajiPokok)}</td>
                                <td className="py-2 px-3 font-mono text-slate-500">{row.tmt}</td>
                                <td className="py-2 px-3 truncate max-w-[155px] text-slate-600">{row.noSk}</td>
                                <td className="py-2 px-3 text-center">
                                  <button
                                    type="button"
                                    onClick={() => setNewPersRiwayatKgb(newPersRiwayatKgb.filter(item => item.id !== row.id))}
                                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="py-6 text-center text-slate-400 font-medium">
                                Belum ada riwayat KGB yang terdaftar.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-slate-100/70 p-4 rounded-xl border border-slate-200/55 space-y-3">
                      <span className="block text-[10px] font-black text-blue-800 uppercase tracking-widest">Tambah Riwayat KGB Baru</span>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-1">
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Gaji Pokok Baru (Rp)</label>
                          <input
                            type="number"
                            placeholder="Contoh: 3400000"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-slate-800"
                            value={tempKgbGaji || ''}
                            onChange={(e) => setTempKgbGaji(Number(e.target.value))}
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">TMT Gaji Berkala</label>
                          <input
                            type="date"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs text-slate-700"
                            value={tempKgbTmt}
                            onChange={(e) => setTempKgbTmt(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor SK KGB</label>
                          <input
                            type="text"
                            placeholder="Contoh: 800/KGB-1241/2026"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs text-slate-800"
                            value={tempKgbNoSk}
                            onChange={(e) => setTempKgbNoSk(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={addKgbRow}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all"
                        >
                          <Plus className="w-4 h-4 text-white" />
                          <span>Tambahkan KGB</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeModalSubTab === 'pendidikan' && (
                  /* ================= TAB 4: RIWAYAT PENDIDIKAN ================= */
                  <div className="space-y-5 animate-fade-in">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-800">Riwayat Pendidikan</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Pendidikan formal terakhir, penyesuaian ijazah dan kualifikasi</p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden text-xs">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 font-extrabold text-[9px] uppercase tracking-wider text-left border-b border-slate-150">
                            <th className="py-2.5 px-3">Jenjang</th>
                            <th className="py-2.5 px-3">Nama Lembaga Pendidikan</th>
                            <th className="py-2.5 px-3">Jurusan / Bidang Studi</th>
                            <th className="py-2.5 px-3">Tahun Lulus</th>
                            <th className="py-2.5 px-3 text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                          {newPersRiwayatPendidikan.length > 0 ? (
                            newPersRiwayatPendidikan.map((row) => (
                              <tr key={row.id} className="hover:bg-slate-50/50">
                                <td className="py-2 px-3 font-black text-slate-800">{row.tingkat}</td>
                                <td className="py-2 px-3">{row.institusi}</td>
                                <td className="py-2 px-3 text-slate-500">{row.jurusan}</td>
                                <td className="py-2 px-3 font-mono text-center text-slate-600">{row.tahunLulus}</td>
                                <td className="py-2 px-3 text-center">
                                  <button
                                    type="button"
                                    onClick={() => setNewPersRiwayatPendidikan(newPersRiwayatPendidikan.filter(item => item.id !== row.id))}
                                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="py-6 text-center text-slate-400 font-medium">
                                Belum ada riwayat pendidikan studi yang terdaftar.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-slate-100/70 p-4 rounded-xl border border-slate-200/55 space-y-3">
                      <span className="block text-[10px] font-black text-blue-800 uppercase tracking-widest">Tambah Riwayat Pendidikan Baru</span>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tingkat</label>
                          <select
                            className="w-full border border-slate-200 bg-white rounded-lg px-2 py-1 text-xs font-bold text-slate-800"
                            value={tempPendidikanTingkat}
                            onChange={(e) => setTempPendidikanTingkat(e.target.value)}
                          >
                            <option value="SD">SD</option>
                            <option value="SMP">SMP / MTs</option>
                            <option value="SMA">SMA / MA / SMK</option>
                            <option value="D1">Diploma I (D1)</option>
                            <option value="D3">Diploma III (D3)</option>
                            <option value="D4">Diploma IV (D4)</option>
                            <option value="S1">Sarjana (S1)</option>
                            <option value="S2">Magister (S2)</option>
                            <option value="S3">Doktor (S3)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Institusi / Kampus</label>
                          <input
                            type="text"
                            placeholder="Contoh: USU Medan"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs text-slate-800"
                            value={tempPendidikanInstitusi}
                            onChange={(e) => setTempPendidikanInstitusi(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Jurusan / Studi</label>
                          <input
                            type="text"
                            placeholder="Contoh: S-1 Teknik Sipil"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs text-slate-800"
                            value={tempPendidikanJurusan}
                            onChange={(e) => setTempPendidikanJurusan(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tahun Lulus</label>
                          <input
                            type="text"
                            placeholder="Contoh: 2018"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs text-center font-mono text-slate-800"
                            value={tempPendidikanTahun}
                            onChange={(e) => setTempPendidikanTahun(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={addPendidikanRow}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all"
                        >
                          <Plus className="w-4 h-4 text-white" />
                          <span>Tambahkan Pendidikan</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeModalSubTab === 'orangtua' && (
                  /* ================= TAB 5: RIWAYAT ORANG TUA ================= */
                  <div className="space-y-5 animate-fade-in">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-800">Riwayat & Data Orang Tua Kandung</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Informasi garis keturunan bapak dan ibu pegawai</p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden text-xs">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 font-extrabold text-[9px] uppercase tracking-wider text-left border-b border-slate-150">
                            <th className="py-2.5 px-3">Hubungan Keluarga</th>
                            <th className="py-2.5 px-3">Nama Lengkap Orang Tua</th>
                            <th className="py-2.5 px-3">Profesi / Pekerjaan</th>
                            <th className="py-2.5 px-3 text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                          {newPersRiwayatOrangTua.length > 0 ? (
                            newPersRiwayatOrangTua.map((row) => (
                              <tr key={row.id} className="hover:bg-slate-50/50">
                                <td className="py-2 px-3 font-bold text-slate-600">
                                  <span className={`px-2 py-0.5 text-[10px] rounded-full font-black ${
                                    row.hubungan === 'Ayah' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'
                                  }`}>
                                    {row.hubungan}
                                  </span>
                                </td>
                                <td className="py-2 px-3">{row.nama}</td>
                                <td className="py-2 px-3 text-slate-500">{row.pekerjaan}</td>
                                <td className="py-2 px-3 text-center">
                                  <button
                                    type="button"
                                    onClick={() => setNewPersRiwayatOrangTua(newPersRiwayatOrangTua.filter(item => item.id !== row.id))}
                                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="py-6 text-center text-slate-400 font-medium">
                                Belum ada riwayat data orang tua yang diinput.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-slate-100/70 p-4 rounded-xl border border-slate-200/55 space-y-3">
                      <span className="block text-[10px] font-black text-blue-800 uppercase tracking-widest">Tambah Data Orang Tua</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Hubungan</label>
                          <select
                            className="w-full border border-slate-200 bg-white rounded-lg px-2 py-1 text-xs font-bold text-slate-800"
                            value={tempOrangTuaHubungan}
                            onChange={(e: any) => setTempOrangTuaHubungan(e.target.value)}
                          >
                            <option value="Ayah">Ayah Kandung</option>
                            <option value="Ibu">Ibu Kandung</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Lengkap</label>
                          <input
                            type="text"
                            placeholder="Contoh: H. Ahmad"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs text-slate-800"
                            value={tempOrangTuaNama}
                            onChange={(e) => setTempOrangTuaNama(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pekerjaan</label>
                          <input
                            type="text"
                            placeholder="Contoh: Pensiunan PNS / RT"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs text-slate-800"
                            value={tempOrangTuaPekerjaan}
                            onChange={(e) => setTempOrangTuaPekerjaan(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={addOrangTuaRow}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all"
                        >
                          <Plus className="w-4 h-4 text-white" />
                          <span>Daftarkan Orang Tua</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeModalSubTab === 'pasangan' && (
                  /* ================= TAB 6: RIWAYAT PASANGAN ================= */
                  <div className="space-y-5 animate-fade-in">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-805">Riwayat Pasangan (Suami / Istri)</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Data pasangan sah pernikahan berekstensi tunjangan keluarga pegawai</p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden text-xs">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 font-extrabold text-[9px] uppercase tracking-wider text-left border-b border-slate-150">
                            <th className="py-2.5 px-3">Nama Lengkap Pasangan</th>
                            <th className="py-2.5 px-3">Tanggal Pernikahan</th>
                            <th className="py-2.5 px-3">Profesi / Pekerjaan</th>
                            <th className="py-2.5 px-3 text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                          {newPersRiwayatPasangan.length > 0 ? (
                            newPersRiwayatPasangan.map((row) => (
                              <tr key={row.id} className="hover:bg-slate-50/50">
                                <td className="py-2 px-3 font-bold text-slate-800">{row.nama}</td>
                                <td className="py-2 px-3 font-mono text-slate-500">{row.tglMenikah}</td>
                                <td className="py-2 px-3 text-slate-500">{row.pekerjaan}</td>
                                <td className="py-2 px-3 text-center">
                                  <button
                                    type="button"
                                    onClick={() => setNewPersRiwayatPasangan(newPersRiwayatPasangan.filter(item => item.id !== row.id))}
                                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="py-6 text-center text-slate-400 font-medium">
                                Belum ada riwayat pasangan terdaftar.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-slate-100/70 p-4 rounded-xl border border-slate-200/55 space-y-3">
                      <span className="block text-[10px] font-black text-blue-800 uppercase tracking-widest">Tambah Riwayat Marital Pasangan</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Suami / Istri</label>
                          <input
                            type="text"
                            placeholder="Contoh: Fatmawati"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs text-slate-800"
                            value={tempPasanganNama}
                            onChange={(e) => setTempPasanganNama(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tanggal Pernikahan</label>
                          <input
                            type="date"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs text-slate-700"
                            value={tempPasanganTglMenikah}
                            onChange={(e) => setTempPasanganTglMenikah(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pekerjaan Pasangan</label>
                          <input
                            type="text"
                            placeholder="Contoh: Swasta / Wiraswasta"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs text-slate-800"
                            value={tempPasanganPekerjaan}
                            onChange={(e) => setTempPasanganPekerjaan(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={addPasanganRow}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all"
                        >
                          <Plus className="w-4 h-4 text-white" />
                          <span>Hubungkan Pasangan</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeModalSubTab === 'anak' && (
                  /* ================= TAB 7: RIWAYAT ANAK ================= */
                  <div className="space-y-5 animate-fade-in">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-805">Riwayat & Data Anak / Tanggungan</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Daftar anak kandung / anak angkat resmi masuk dalam sistem payroll/tanggungan</p>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden text-xs">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 font-extrabold text-[9px] uppercase tracking-wider text-left border-b border-slate-150">
                            <th className="py-2.5 px-3">Nama Lengkap Anak</th>
                            <th className="py-2.5 px-3">Tanggal Lahir</th>
                            <th className="py-2.5 px-3">Jenis Kelamin</th>
                            <th className="py-2.5 px-3">Pendidikan Terakhir</th>
                            <th className="py-2.5 px-3 text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                          {newPersRiwayatAnak.length > 0 ? (
                            newPersRiwayatAnak.map((row) => (
                              <tr key={row.id} className="hover:bg-slate-50/50">
                                <td className="py-2 px-3 font-bold text-slate-800">{row.nama}</td>
                                <td className="py-2 px-3 font-mono text-slate-500">{row.tglLahir}</td>
                                <td className="py-2 px-3 text-slate-600">{row.jenisKelamin}</td>
                                <td className="py-2 px-3 text-slate-500">{row.pendidikan}</td>
                                <td className="py-2 px-3 text-center">
                                  <button
                                    type="button"
                                    onClick={() => setNewPersRiwayatAnak(newPersRiwayatAnak.filter(item => item.id !== row.id))}
                                    className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="py-6 text-center text-slate-400 font-medium">
                                Belum ada riwayat anak yang terdaftar.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-slate-100/70 p-4 rounded-xl border border-slate-200/55 space-y-3">
                      <span className="block text-[10px] font-black text-blue-800 uppercase tracking-widest">Tambah Detail Anak (Dapat ditambahkan bila lebih dari satu)</span>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Lengkap Anak</label>
                          <input
                            type="text"
                            placeholder="Nama Anak"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs text-slate-800"
                            value={tempAnakNama}
                            onChange={(e) => setTempAnakNama(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tanggal Lahir</label>
                          <input
                            type="date"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs text-slate-700"
                            value={tempAnakTglLahir}
                            onChange={(e) => setTempAnakTglLahir(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Jenis Kelamin</label>
                          <select
                            className="w-full border border-slate-200 bg-white rounded-lg px-2 py-1 text-xs font-bold text-slate-800"
                            value={tempAnakJenisKelamin}
                            onChange={(e: any) => setTempAnakJenisKelamin(e.target.value)}
                          >
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pendidikan / Status</label>
                          <input
                            type="text"
                            placeholder="Contoh: SD Kelas VI"
                            className="w-full border border-slate-200 bg-white rounded-lg px-2.5 py-1 text-xs text-slate-800"
                            value={tempAnakPendidikan}
                            onChange={(e) => setTempAnakPendidikan(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={addAnakRow}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all"
                        >
                          <Plus className="w-4 h-4 text-white" />
                          <span>Daftarkan Anak</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* STICKY ACTION FOOTER */}
              <div className="bg-white border-t border-slate-150 p-4 shrink-0 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 font-bold hidden sm:inline">
                  Drafting: {newPersNama || 'Pegawai Baru'} &bull; {newPersRiwayatKepangkatan.length} Kepangkatan
                </span>
                
                <div className="flex gap-2 ml-auto p-1.5">
                  <button
                    type="button"
                    onClick={() => setIsPersonelModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={handleAddPersonel}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-black shadow-sm transition"
                  >
                    {editingPersonelId ? 'Simpan Perubahan' : 'Proses & Daftarkan'}
                  </button>
                </div>
              </div>

            </div>

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
