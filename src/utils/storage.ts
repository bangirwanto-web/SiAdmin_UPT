import { ProfileSettings, User, Surat, InventarisAset, KegiatanOperasional, DebitAir, ProyekPembangunan, Personel, Keuangan, InventarisDI, UsulKegiatan, ProgresPembangunanLapangan, KodeRekening, SpjRutin, Bapp } from '../types';

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
    id: 'ast-a1',
    namaAset: 'Tanah Lokasi Kantor UPTD Pengairan Bah Bolon',
    kodeAset: 'SDA-KIB.A-1998-001',
    kategori: 'Tanah',
    jumlah: 1,
    kondisi: 'Baik',
    lokasi: 'Kec. Siantar Marimbun, Pematangsiantar',
    kib: 'A'
  },
  {
    id: 'ast-1',
    namaAset: 'Alat Ukur Tinggi Air (Current Meter)',
    kodeAset: 'SDA-KIB.B-2024-001',
    kategori: 'Alat Ukur Teknis',
    jumlah: 3,
    kondisi: 'Baik',
    lokasi: 'Gudang Kantor UPTD',
    kib: 'B'
  },
  {
    id: 'ast-2',
    namaAset: 'Pompa Air Diesel 3 Inch',
    kodeAset: 'SDA-KIB.B-2023-014',
    kategori: 'Peralatan O&M',
    jumlah: 2,
    kondisi: 'Baik',
    lokasi: 'Pos Siaga Banjir',
    kib: 'B'
  },
  {
    id: 'ast-3',
    namaAset: 'Laptop Kerja Lenovo ThinkBook',
    kodeAset: 'SDA-KIB.B-2025-009',
    kategori: 'Elektronik Kantor',
    jumlah: 5,
    kondisi: 'Baik',
    lokasi: 'Ruang Staf Penatausahaan',
    kib: 'B'
  },
  {
    id: 'ast-4',
    namaAset: 'Motor Yamaha WR155R O&M',
    kodeAset: 'SDA-KIB.B-2024-032',
    kategori: 'Kendaraan Dinas',
    jumlah: 4,
    kondisi: 'Rusak Ringan',
    lokasi: 'Garasi UPTD Bah Bolon',
    kib: 'B'
  },
  {
    id: 'ast-c1',
    namaAset: 'Gedung Kantor Utama Dinas Pengairan UPTD Bah Bolon',
    kodeAset: 'SDA-KIB.C-2005-001',
    kategori: 'Gedung & Bangunan',
    jumlah: 1,
    kondisi: 'Baik',
    lokasi: 'Jl. Asahan Km 4.5, Pematangsiantar',
    kib: 'C'
  },
  {
    id: 'ast-c2',
    namaAset: 'Rumah Dinas Penjaga Bendung DI Karang Anyar',
    kodeAset: 'SDA-KIB.C-2010-003',
    kategori: 'Gedung & Bangunan',
    jumlah: 1,
    kondisi: 'Baik',
    lokasi: 'Kompleks Bendung Karang Anyar',
    kib: 'C'
  },
  {
    id: 'ast-d1',
    namaAset: 'Saluran Irigasi Kanan DI Bah Bolon Km. 0 - Km. 5',
    kodeAset: 'SDA-KIB.D-1981-002',
    kategori: 'Jalan, Irigasi & Jaringan',
    jumlah: 1,
    kondisi: 'Baik',
    lokasi: 'DI Bah Bolon Utama',
    kib: 'D'
  },
  {
    id: 'ast-d2',
    namaAset: 'Pintu Air Sorong Spindel Elektrik Bendung Utama',
    kodeAset: 'SDA-KIB.D-2018-011',
    kategori: 'Jalan, Irigasi & Jaringan',
    jumlah: 4,
    kondisi: 'Baik',
    lokasi: 'Bendung Utama Bah Bolon',
    kib: 'D'
  },
  {
    id: 'ast-e1',
    namaAset: 'Dokumen Peta Detail Desain Bendung (DED Bah Bolon 1999)',
    kodeAset: 'SDA-KIB.E-1999-001',
    kategori: 'Aset Tetap Lainnya',
    jumlah: 3,
    kondisi: 'Baik',
    lokasi: 'Ruang Arsip Teknis',
    kib: 'E'
  },
  {
    id: 'ast-e2',
    namaAset: 'Sertifikat Hak Pakai Tanah Negara UPTD Pengairan',
    kodeAset: 'SDA-KIB.E-2002-005',
    kategori: 'Aset Tetap Lainnya',
    jumlah: 12,
    kondisi: 'Baik',
    lokasi: 'Brankas Kantor UPTD',
    kib: 'E'
  },
  {
    id: 'ast-f1',
    namaAset: 'Rehabilitasi Tanggul Pagar Pintu Air Sekunder Km 4.2',
    kodeAset: 'SDA-KIB.F-2026-003',
    kategori: 'Konstruksi Dalam Pengerjaan',
    jumlah: 1,
    kondisi: 'Rusak Ringan',
    lokasi: 'DI Bah Bolon Sekunder (On Progress)',
    kib: 'F'
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

// Default Inventaris Daerah Irigasi (DI)
export const DEFAULT_INVENTARIS_DI: InventarisDI[] = [
  {
    id: 'di-1',
    namaDI: 'D.I. Bah Bolon Utama',
    luasAreal: 2450,
    panjangSaluran: 42.5,
    jumlahBangunan: 18,
    statusKewenangan: 'Provinsi',
    keterangan: 'Kondisi suplesi air stabil sepanjang tahun dari Bendung Utama.',
    bangunanPendukung: [
      {
        id: 'b-1-1',
        nama: 'Pintu Air Sadap Sekunder Kanan',
        kategori: 'Pintu Air',
        kondisi: 'Baik',
        latitude: 2.955401,
        longitude: 99.062304,
        fotoList: []
      },
      {
        id: 'b-1-2',
        nama: 'Kantor Pengamat Bendung Utama',
        kategori: 'Lainnya',
        kondisi: 'Baik',
        latitude: 2.951230,
        longitude: 99.051120,
        fotoList: []
      }
    ]
  },
  {
    id: 'di-2',
    namaDI: 'D.I. Karang Anyar',
    luasAreal: 1250,
    panjangSaluran: 18.2,
    jumlahBangunan: 9,
    statusKewenangan: 'Provinsi',
    keterangan: 'Saluran sekunder memerlukan pengerukan sedimen berkala.',
    bangunanPendukung: [
      {
        id: 'b-2-1',
        nama: 'Bendung Pelimpah Karang Anyar',
        kategori: 'Bendung / Intake',
        kondisi: 'Rusak Ringan',
        latitude: 2.981120,
        longitude: 99.081120,
        fotoList: []
      }
    ]
  },
  {
    id: 'di-3',
    namaDI: 'D.I. Kerasaan',
    luasAreal: 1980,
    panjangSaluran: 28.4,
    jumlahBangunan: 15,
    statusKewenangan: 'Provinsi',
    keterangan: 'Sistem giliran air diatur ketat saat musim kemarau.',
    bangunanPendukung: [
      {
        id: 'b-3-1',
        nama: 'Alat ukur debit Cipoletti Kerasaan',
        kategori: 'Alat Ukur Debit',
        kondisi: 'Baik',
        latitude: 3.012110,
        longitude: 99.123512,
        fotoList: []
      }
    ]
  }
];

// Default Usulan Kegiatan Hari Ini (Seksi Operasional O&M)
export const DEFAULT_USUL_OP: UsulKegiatan[] = [
  {
    id: 'uop-1',
    namaPekerjaan: 'Babat Semak Liar & Pembersihan Tanggul Sekunder',
    lokasi: 'D.I. Bah Bolon Kanan Km 3.5',
    estimasiBiaya: 18500000,
    skalaPrioritas: 'Sedang',
    diusulkanOleh: 'GP3A Sinar Tani Bah Bolon',
    tanggalUsulan: '2026-06-12',
    keterangan: 'Semak belukar menutupi jalan inspeksi patroli sungai.',
    statusAproval: 'Ditinjau'
  },
  {
    id: 'uop-2',
    namaPekerjaan: 'Pelumasan Spindel Roda Gigi Pintu Air Sekunder',
    lokasi: 'Pintu Sadap Karang Anyar No 4',
    estimasiBiaya: 6500000,
    skalaPrioritas: 'Tinggi',
    diusulkanOleh: 'Juru Pengairan Karang Anyar',
    tanggalUsulan: '2026-06-15',
    keterangan: 'Pintu sorong sulit diputar manual oleh petugas pintu air.',
    statusAproval: 'Disetujui'
  }
];

// Default Usulan Konstruksi Baru (Seksi Pembangunan)
export const DEFAULT_USUL_PEMB: UsulKegiatan[] = [
  {
    id: 'upb-1',
    namaPekerjaan: 'Pemasangan Bronjong Batu Kali Kawat PVC Penahan Longsor',
    lokasi: 'Sempadan Kali Bah Bolon Kec. Tanah Jawa',
    estimasiBiaya: 450000000,
    skalaPrioritas: 'Tinggi',
    diusulkanOleh: 'Camat Tanah Jawa & Juru Pengairan',
    tanggalUsulan: '2026-06-08',
    keterangan: 'Tebing sungai longsor selebar 12 meter mendekati pemukiman.',
    statusAproval: 'Ditinjau'
  },
  {
    id: 'upb-2',
    namaPekerjaan: 'Pembangunan Saluran Pasangan Batu Kali (Lining Beton)',
    lokasi: 'Saluran Tersier Blok C D.I. Kerasaan',
    estimasiBiaya: 320000000,
    skalaPrioritas: 'Sedang',
    diusulkanOleh: 'Seksi Pembangunan Internal',
    tanggalUsulan: '2026-06-14',
    keterangan: 'Saluran tanah sering jebol dan bocor menggenangi kebun sawit warga.',
    statusAproval: 'Ditinjau'
  }
];

// Default Progres Lapangan Milestones (Seksi Pembangunan)
export const DEFAULT_PROGRES_LAPANGAN_PEMB: ProgresPembangunanLapangan[] = [
  {
    id: 'prg-1',
    proyekId: 'pem-1',
    namaProyek: 'Rehabilitasi Jaringan Irigasi D.I. Bah Bolon Kanan Simalungun',
    uraianPekerjaanDetail: 'Pemasangan precast beton U-Ditch K-350 sepanjang 150 meter',
    targetFisikMingguIni: 'Pencapaian target layout section 3A sampai selesai',
    kendalaLapangan: 'Hujan deras pada sore hari menghentikan proses pengangkatan lifting crane.',
    cuacaKondisi: 'Hujan Ringan',
    tanggalUpdate: '2026-06-16'
  },
  {
    id: 'prg-2',
    proyekId: 'pem-2',
    namaProyek: 'Pembangunan Bronjong Penahan Tebing Sungai Bah Bolon (Ruas Siantar Kota)',
    uraianPekerjaanDetail: 'Pekerjaan perapihan top capping kawat bronjong baris teratas',
    targetFisikMingguIni: 'Finishing & serah terima pekerjaan sementara awal (PHO)',
    kendalaLapangan: 'Tidak ada kendala berarti, penataan estetika bantaran aman.',
    cuacaKondisi: 'Cerah',
    tanggalUpdate: '2026-06-14'
  }
];

// Default Kode Rekening / Daftar Anggaran
export const DEFAULT_KODE_REKENING: KodeRekening[] = [
  {
    id: 'kr-1',
    kode: '5.1.01.01.0001',
    nama: 'Belanja Gaji Pokok PNS',
    pagu: 850000000,
    realisasi: 420000000,
    keterangan: 'Pagu alokasi belanja pegawai UPTD rutin bulanan Dinas SDA',
    program: 'Program Penunjang Urusan Pemerintahan Daerah Provinsi',
    kegiatan: 'Administrasi Keuangan Perangkat Daerah',
    subKegiatan: 'Penyediaan Gaji dan Tunjangan ASN'
  },
  {
    id: 'kr-2',
    kode: '5.1.02.01.0012',
    nama: 'Belanja Alat Tulis Kantor (ATK) & Office Supplies',
    pagu: 45000000,
    realisasi: 18450000,
    keterangan: 'Pemenuhan kebutuhan alat tulis kantor pada Tata Usaha, O&M, Pembangunan, dan Humas',
    program: 'Program Penunjang Urusan Pemerintahan Daerah Provinsi',
    kegiatan: 'Administrasi Umum Perangkat Daerah',
    subKegiatan: 'Penyediaan Peralatan dan Perlengkapan Kantor'
  },
  {
    id: 'kr-3',
    kode: '5.1.02.01.0024',
    nama: 'Belanja Jasa Tenaga Teknik Operasional Pengairan',
    pagu: 320000000,
    realisasi: 160000000,
    keterangan: 'Honorarium bulanan para juru, penjaga pintu air (PPA), dan pengamat wilayah Bah Bolon',
    program: 'Program Pengelolaan Sumber Daya Air (SDA)',
    kegiatan: 'Operasi dan Pemeliharaan Jaringan Irigasi',
    subKegiatan: 'Pemeliharaan Rutin Jaringan Irigasi (Honorarium Tenaga Teknik)'
  },
  {
    id: 'kr-4',
    kode: '5.2.02.01.0005',
    nama: 'Belanja Pemeliharaan Jaringan Irigasi & Bangunan Air',
    pagu: 1200000000,
    realisasi: 450000000,
    keterangan: 'Rehabilitasi berkala jaringan irigasi sekunder/primer yang mengalami penurunan debit suplesi',
    program: 'Program Pengelolaan Sumber Daya Air (SDA)',
    kegiatan: 'Pengembangan dan Pengelolaan Sistem Irigasi',
    subKegiatan: 'Rehabilitasi Jaringan Irigasi Permukaan'
  }
];

// Default SPJ Rutin (Surat Pertanggungjawaban)
export const DEFAULT_SPJ_RUTIN: SpjRutin[] = [
  {
    id: 'spj-1',
    nomorSpj: '012/SPJ/RUTIN-SDA/VI/2026',
    tanggal: '2026-06-03',
    kodeRekeningId: 'kr-2',
    namaKegiatan: 'Pembelian Kertas HVS, Tinta Printer, dan Map Arsip Semester I',
    jumlah: 3250000,
    berkasUrlList: [],
    status: 'Disetujui',
    keterangan: 'Lengkap dengan kuitansi toko ATK Merdeka dan dokumentasi fisik serah terima'
  },
  {
    id: 'spj-2',
    nomorSpj: '013/SPJ/RUTIN-SDA/VI/2026',
    tanggal: '2026-06-10',
    kodeRekeningId: 'kr-3',
    namaKegiatan: 'Penyaluran Insentif Bulanan Juru Pengairan & PPA Periode Mei 2026',
    jumlah: 24000000,
    berkasUrlList: [],
    status: 'Disetujui',
    keterangan: 'Daftar hadir penandatanganan insentif 18 juru irigasi se-UPTD PSA Bah Bolon'
  },
  {
    id: 'spj-3',
    nomorSpj: '014/SPJ/RUTIN-SDA/VI/2026',
    tanggal: '2026-06-15',
    kodeRekeningId: 'kr-4',
    namaKegiatan: 'Perbaikan Darurat Tanggul Saluran Pembuang D.I. Kerasaan',
    jumlah: 15400000,
    berkasUrlList: [],
    status: 'Diajukan',
    keterangan: 'Nota pembelian semen, pasir, sewa molen, dan upah tukang lokal'
  }
];

// Default BAPP (Berita Acara Pembayaran & Penyerahan Pekerjaan)
export const DEFAULT_BAPP: Bapp[] = [
  {
    id: 'bapp-1',
    nomorBapp: '142/BAPP/PEMB-SDA/V/2026',
    tanggal: '2026-05-20',
    namaPekerjaan: 'Normalisasi Hulu Aliran Sungai Bah Bolon (Sektor Asupan Suplesi Pematangsiantar)',
    nilaiKontrak: 450000000,
    namaPenyedia: 'PT. Bah Bolon Karya Mandiri',
    progresFisik: 100,
    realisasiPembayaran: 450000000,
    nomorSpk: '602.1/SPK-DI/UPTD-SDA/IV/2026',
    fotoList: [],
    status: 'Selesai',
    keterangan: 'Serah terima pekerjaan PHO berjalan sukses, sedimentasi berhasil dikeruk sedalam 1.2 meter'
  },
  {
    id: 'bapp-2',
    nomorBapp: '178/BAPP/PEMB-SDA/VI/2026',
    tanggal: '2026-06-12',
    namaPekerjaan: 'Rehabilitasi Saluran Pasangan Batu D.I. Bah Bolon Kiri (Pemasangan U-Ditch 400M)',
    nilaiKontrak: 720000000,
    namaPenyedia: 'CV. Sinar Tani Jaya',
    progresFisik: 75,
    realisasiPembayaran: 540000000,
    nomorSpk: '602.1/SPK-DI/UPTD-SDA/V/2026',
    fotoList: [],
    status: 'Dalam Proses',
    keterangan: 'Sisa pembayaran 25% ditangguhkan menunggu pemasangan cap penutup beton tuntas dikerjakan'
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
