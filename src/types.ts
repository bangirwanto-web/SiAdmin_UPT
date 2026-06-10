export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  status: 'aktif' | 'nonaktif';
  department: string;
}

export interface ProfileSettings {
  instansiName: string;
  shortName: string;
  address: string;
  phone: string;
  email: string;
  logoTheme: string; // Tailwind bg color preset e.g. "bg-emerald-600"
  footerText: string;
  copyrightText: string;
  logoUrl?: string; // Base64 or standard URL for custom agency logo
}

export interface Surat {
  id: string;
  nomorSurat: string;
  perihal: string;
  pengirim: string;
  penerima: string;
  tanggal: string;
  tipe: 'Masuk' | 'Keluar';
  status: 'Pending' | 'Proses' | 'Selesai';
  // New customized fields
  nomorAgenda?: string;
  tglAgenda?: string;
  tanggalSurat?: string;
  tahapAdministrasi?: string;
  pdfName?: string;
}

export interface InventarisAset {
  id: string;
  namaAset: string;
  kodeAset: string;
  kategori: string;
  jumlah: number;
  kondisi: 'Baik' | 'Rusak Ringan' | 'Rusak Berat';
  lokasi: string;
}

export interface KegiatanOperasional {
  id: string;
  namaKegiatan: string;
  lokasi: string;
  petugas: string;
  tanggalMulai: string;
  status: 'Rencana' | 'Jalan' | 'Selesai';
  progres: number; // 0 - 100
}

export interface DebitAir {
  id: string;
  lokasiPos: string;
  tinggiMukaAir: number; // dalam cm/meter
  status: 'Normal' | 'Waspada' | 'Siaga' | 'Awas';
  waktuTerakhir: string;
}

export interface ProyekPembangunan {
  id: string;
  namaProyek: string;
  lokasi: string;
  kontraktor: string;
  anggaran: number;
  realisasi: number;
  progres: number; // percentage
  targetSelesai: string;
  status: 'Perencanaan' | 'Konstruksi' | 'Selesai';
}

export interface Personel {
  id: string;
  nip: string;
  nama: string;
  jabatan: string;
  golongan: string;
  statusKepegawaian: 'PNS' | 'PPPK' | 'Honor Daerah' | 'Kontrak';
  telepon?: string;
  email?: string;
  foto?: string;
}

export interface Keuangan {
  id: string;
  nomorBukti: string;
  tanggal: string;
  uraian: string;
  kategori: 'Anggaran DIPA' | 'Belanja Operasional' | 'Pemeliharaan' | 'Honorarium' | 'Lain-lain';
  tipe: 'Masuk' | 'Keluar';
  jumlah: number;
  penanggungJawab: string;
}

