import { ProfileSettings, User, Surat, InventarisAset, KegiatanOperasional, DebitAir, ProyekPembangunan, Personel, Keuangan } from '../types';

// Default Profile Settings
export const DEFAULT_PROFILE: ProfileSettings = {
  instansiName: 'UPTD Pengelolaan Sumber Daya Air Bah Bolon',
  shortName: 'UPTD PSA Bah Bolon',
  address: 'Jl. Kartini No. 12, Pematangsiantar, Sumatera Utara',
  phone: '(0622) 21456',
  email: 'uptd.psabahbolon@sumutprov.go.id',
  logoTheme: 'bg-indigo-600',
  footerText: 'Sistem Informasi Administrasi (SIA) - UPTD Pengelolaan Sumber Daya Air Bah Bolon Dinas Sumber Daya Air, Cipta Karya dan Tata Ruang Provinsi Sumatera Utara.',
  copyrightText: '© 2026 UPTD PSA Bah Bolon. All Rights Reserved.'
};

// Default Users
export const DEFAULT_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Ir. H. Syahputra, M.Si',
    email: 'admin@bahbolon.go.id',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120&h=120',
    status: 'aktif',
    department: 'Kepala UPTD PSA Bah Bolon'
  },
  {
    id: 'usr-2',
    name: 'Budi Santoso, S.T.',
    email: 'user@bahbolon.go.id',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120',
    status: 'aktif',
    department: 'Staf Seksi Operasional & Pemeliharaan'
  },
  {
    id: 'usr-3',
    name: 'Rian Handoko, S.T.',
    email: 'rian@bahbolon.go.id',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120&h=120',
    status: 'aktif',
    department: 'Staf Seksi Pembangunan'
  }
];

// Default Letters logs
export const DEFAULT_SURAT: Surat[] = [
  {
    id: 'srt-1',
    nomorSurat: '005/124/UPTD-SDA/2026',
    perihal: 'Rapat Koordinasi Pengelolaan Debit Air Sungai Bah Bolon',
    pengirim: 'Dinas SDA, Cipta Karya dan Tata Ruang Provinsi',
    penerima: 'Kepala UPTD PSA Bah Bolon',
    tanggal: '2026-06-01',
    tipe: 'Masuk',
    status: 'Selesai',
    nomorAgenda: 'AGE-2026-0034',
    tglAgenda: '2026-06-02',
    tanggalSurat: '2026-06-01',
    tahapAdministrasi: 'Selesai & Diarsipkan',
    pdfName: 'Rapat_Koordinasi_SDA.pdf'
  },
  {
    id: 'srt-2',
    nomorSurat: '610/342/Seksi-Operasional/2026',
    perihal: 'Laporan Kerusakan Tanggul DI Karang Anyar',
    pengirim: 'Masyarakat Petani Pengguna Air (GP3A)',
    penerima: 'Seksi Operasional UPTD',
    tanggal: '2026-06-05',
    tipe: 'Masuk',
    status: 'Proses',
    nomorAgenda: 'AGE-2026-0035',
    tglAgenda: '2026-06-06',
    tanggalSurat: '2026-06-05',
    tahapAdministrasi: 'Disposisi Kepala Seksi',
    pdfName: 'Laporan_Kerusakan_Tanggul.pdf'
  },
  {
    id: 'srt-3',
    nomorSurat: '045/88/UPTD-SDA/2026',
    perihal: 'Surat Tugas Pemantauan Debit Air Bah Bolon Ulu',
    pengirim: 'UPTD PSA Bah Bolon',
    penerima: 'Petugas Ukur Debit Air',
    tanggal: '2026-06-08',
    tipe: 'Keluar',
    status: 'Selesai',
    tanggalSurat: '2026-06-08',
    tahapAdministrasi: 'Terenregistrasi & Dikirim',
    pdfName: 'Surat_Tugas_Pemantauan.pdf'
  },
  {
    id: 'srt-4',
    nomorSurat: '600/411/Seksi-Pembangunan/2026',
    perihal: 'Rencana Anggaran Biaya Rehabilitasi Bendung Bah Bolon',
    pengirim: 'UPTD PSA Bah Bolon',
    penerima: 'Kepala Dinas SDA Sumut',
    tanggal: '2026-06-09',
    tipe: 'Keluar',
    status: 'Pending',
    tanggalSurat: '2026-06-09',
    tahapAdministrasi: 'Penyusunan Draft Anggaran',
    pdfName: 'RAB_Rehabilitasi_Bendung.pdf'
  }
];

// Default Inventaris Aset
export const DEFAULT_INVENTARIS: InventarisAset[] = [
  {
    id: 'ast-1',
    namaAset: 'Alat Ukur Tinggi Air (Current Meter)',
    kodeAset: 'SDA-AST-2024-001',
    kategori: 'Alat Ukur Teknis',
    jumlah: 3,
    kondisi: 'Baik',
    lokasi: 'Gudang Kantor UPTD'
  },
  {
    id: 'ast-2',
    namaAset: 'Pompa Air Diesel 3 Inch',
    kodeAset: 'SDA-AST-2023-014',
    kategori: 'Peralatan O&M',
    jumlah: 2,
    kondisi: 'Baik',
    lokasi: 'Pos Siaga Banjir'
  },
  {
    id: 'ast-3',
    namaAset: 'Laptop Kerja Lenovo ThinkBook',
    kodeAset: 'SDA-AST-2025-009',
    kategori: 'Elektronik Kantor',
    jumlah: 5,
    kondisi: 'Baik',
    lokasi: 'Ruang Staf Penatausahaan'
  },
  {
    id: 'ast-4',
    namaAset: 'Motor Yamaha WR155R O&M',
    kodeAset: 'SDA-AST-2024-032',
    kategori: 'Kendaraan Dinas',
    jumlah: 4,
    kondisi: 'Rusak Ringan',
    lokasi: 'Garasi UPTD Bah Bolon'
  }
];

// Default Kegiatan Operasional
export const DEFAULT_OPERASIONAL: KegiatanOperasional[] = [
  {
    id: 'op-1',
    namaKegiatan: 'Pembersihan Sedimen Sampah Pintu Air DI Karang Anyar',
    lokasi: 'Bendung DI Karang Anyar',
    petugas: 'Supardi & Tim Juru Pengairan',
    tanggalMulai: '2026-06-10',
    status: 'Jalan',
    progres: 45
  },
  {
    id: 'op-2',
    namaKegiatan: 'Lubrikasi Pengarah Pintu Air Bendung Simalungun',
    lokasi: 'Bah Bolon Tengah',
    petugas: 'Slamet Handoyo',
    tanggalMulai: '2026-06-12',
    status: 'Rencana',
    progres: 0
  },
  {
    id: 'op-3',
    namaKegiatan: 'Babat Rumpun Liar Saluran Sekunder Kali Bah Bolon',
    lokasi: 'Saluran Irigasi Kanan Km. 2-4',
    petugas: 'Masyarakat Petani & Juru Pengairan',
    tanggalMulai: '2026-06-03',
    status: 'Selesai',
    progres: 100
  },
  {
    id: 'op-4',
    namaKegiatan: 'Penyusunan Jadwal Gilir Giring Air Musim Tanam II',
    lokasi: 'Kantor UPTD',
    petugas: 'Budi Santoso, S.T.',
    tanggalMulai: '2026-06-08',
    status: 'Selesai',
    progres: 100
  }
];

// Default Debit Air Monitoring
export const DEFAULT_DEBIT: DebitAir[] = [
  {
    id: 'deb-1',
    lokasiPos: 'Pos Bah Bolon Hulu (Siantar)',
    tinggiMukaAir: 120, // 1.2 m
    status: 'Normal',
    waktuTerakhir: '10 Juni 2026, 12:00 WIB'
  },
  {
    id: 'deb-2',
    lokasiPos: 'Pos Bah Bolon Tengah (Kerasaan)',
    tinggiMukaAir: 185, // 1.85 m
    status: 'Waspada',
    waktuTerakhir: '10 Juni 2026, 12:15 WIB'
  },
  {
    id: 'deb-3',
    lokasiPos: 'Pos Bah Bolon Ilir (Perdagangan)',
    tinggiMukaAir: 320, // 3.2 m (Critical level might be higher)
    status: 'Siaga',
    waktuTerakhir: '10 Juni 2026, 12:05 WIB'
  }
];

// Default Kegiatan Pembangunan
export const DEFAULT_PEMBANGUNAN: ProyekPembangunan[] = [
  {
    id: 'pem-1',
    namaProyek: 'Rehabilitasi Jaringan Irigasi D.I. Bah Bolon Kanan Simalungun',
    lokasi: 'Kec. Tanah Jawa, Simalungun',
    kontraktor: 'PT. Karya Cipta Sumut',
    anggaran: 2450000000, // Rp 2.45 M
    realisasi: 1890000000,
    progres: 78,
    targetSelesai: '2026-10-15',
    status: 'Konstruksi'
  },
  {
    id: 'pem-2',
    namaProyek: 'Pembangunan Bronjong Penahan Tebing Sungai Bah Bolon (Ruas Siantar Kota)',
    lokasi: 'Pematangsiantar',
    kontraktor: 'CV. Fajar Pratama',
    anggaran: 850000000, // Rp 850 Jt
    realisasi: 850000000,
    progres: 100,
    targetSelesai: '2026-05-20',
    status: 'Selesai'
  },
  {
    id: 'pem-3',
    namaProyek: 'Pengerukan Embung Penampung Air dan Pembuatan Spillway DI Karang Anyar',
    lokasi: 'Kec. Gunung Malela',
    kontraktor: 'PT. Tirta Mas Lestari',
    anggaran: 1200000000, // Rp 1.2 M
    realisasi: 120000000,
    progres: 10,
    targetSelesai: '2026-12-01',
    status: 'Perencanaan'
  }
];

export const DEFAULT_PERSONEL: Personel[] = [
  {
    id: 'per-1',
    nip: '19740512 200212 1 003',
    nama: 'Ir. H. Syahputra, M.Si',
    jabatan: 'Kepala UPTD PSA Bah Bolon',
    golongan: 'Pembina / IV-a',
    statusKepegawaian: 'PNS',
    telepon: '0812-6455-9011',
    email: 'syahputra@sumutprov.go.id'
  },
  {
    id: 'per-2',
    nip: '19820817 201001 1 005',
    nama: 'Budi Santoso, S.T.',
    jabatan: 'Kepala Seksi Operasional & Pemeliharaan',
    golongan: 'Penata / III-c',
    statusKepegawaian: 'PNS',
    telepon: '0821-4456-1182',
    email: 'budi.santoso@sumutprov.go.id'
  },
  {
    id: 'per-3',
    nip: '19890215 201602 1 002',
    nama: 'Rian Handoko, S.T.',
    jabatan: 'Kepala Seksi Pembangunan',
    golongan: 'Penata Muda / III-b',
    statusKepegawaian: 'PNS',
    telepon: '0813-7722-4467',
    email: 'rian.handoko@sumutprov.go.id'
  },
  {
    id: 'per-4',
    nip: '19930411 201903 2 004',
    nama: 'Sri Wahyuni, A.Md.',
    jabatan: 'Bendahara UPTD UPTD PSA',
    golongan: 'Penata Muda / III-a',
    statusKepegawaian: 'PPPK',
    telepon: '0852-9900-5412',
    email: 'sri.wahyuni@sumutprov.go.id'
  },
  {
    id: 'per-5',
    nip: '-',
    nama: 'Joko Purwanto',
    jabatan: 'Petugas Juru Pengairan & Pintu Air',
    golongan: 'Non-Eselon',
    statusKepegawaian: 'Kontrak',
    telepon: '0878-1122-3344',
    email: 'joko.purwanto@gmail.com'
  }
];

export const DEFAULT_KEUANGAN: Keuangan[] = [
  {
    id: 'keu-1',
    nomorBukti: 'BKM-001/DIPA-SDA/2026',
    tanggal: '2026-01-10',
    uraian: 'Penerimaan Alokasi Dana DIPA TA 2026',
    kategori: 'Anggaran DIPA',
    tipe: 'Masuk',
    jumlah: 3500000000,
    penanggungJawab: 'Sri Wahyuni, A.Md.'
  },
  {
    id: 'keu-2',
    nomorBukti: 'BKK-012/UPTD-SDA/2026',
    tanggal: '2026-06-02',
    uraian: 'Pembayaran Honorarium Tenaga Ahli Pemetaan Hidrologi',
    kategori: 'Honorarium',
    tipe: 'Keluar',
    jumlah: 24000000,
    penanggungJawab: 'Sri Wahyuni, A.Md.'
  },
  {
    id: 'keu-3',
    nomorBukti: 'BKK-013/UPTD-SDA/2026',
    tanggal: '2026-06-05',
    uraian: 'Belanja ATK (Alat Tulis Kantor) & Konsumsi Rapat Koordinasi',
    kategori: 'Belanja Operasional',
    tipe: 'Keluar',
    jumlah: 3250000,
    penanggungJawab: 'Sri Wahyuni, A.Md.'
  },
  {
    id: 'keu-4',
    nomorBukti: 'BKK-014/Seksi-OP/2026',
    tanggal: '2026-06-08',
    uraian: 'Rehabilitasi Darurat Pintu Sorong Air DI Karang Anyar',
    kategori: 'Pemeliharaan',
    tipe: 'Keluar',
    jumlah: 45000000,
    penanggungJawab: 'Budi Santoso, S.T.'
  }
];

// Helper to interact with LocalStorage
const isClient = typeof window !== 'undefined';

export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (!isClient) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading key ${key} from storage:`, error);
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, data: T): void {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing key ${key} to storage:`, error);
  }
}
