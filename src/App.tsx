import React, { useState, useEffect } from 'react';
import { 
  DEFAULT_PROFILE, 
  DEFAULT_USERS, 
  DEFAULT_SURAT, 
  DEFAULT_INVENTARIS, 
  DEFAULT_OPERASIONAL, 
  DEFAULT_DEBIT, 
  DEFAULT_PEMBANGUNAN,
  DEFAULT_PERSONEL,
  DEFAULT_KEUANGAN,
  DEFAULT_INVENTARIS_DI,
  DEFAULT_USUL_OP,
  DEFAULT_USUL_PEMB,
  DEFAULT_PROGRES_LAPANGAN_PEMB,
  getFromStorage,
  saveToStorage 
} from './utils/storage';
import { ProfileSettings, User, Surat, InventarisAset, KegiatanOperasional, DebitAir, ProyekPembangunan, Personel, Keuangan, InventarisDI, UsulKegiatan, ProgresPembangunanLapangan } from './types';

// Importing Components
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Penatausahaan from './components/Penatausahaan';
import SeksiOperasional from './components/SeksiOperasional';
import SeksiPembangunan from './components/SeksiPembangunan';
import Pengaturan from './components/Pengaturan';
import { Droplet, HelpCircle, User as UserIcon, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Global States loaded dynamically from LocalStorage (or fallbacks)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    return getFromStorage<User | null>('sia_current_user', null);
  });

  const [profile, setProfile] = useState<ProfileSettings>(() => {
    return getFromStorage<ProfileSettings>('sia_profile_settings', DEFAULT_PROFILE);
  });

  const [users, setUsers] = useState<User[]>(() => {
    return getFromStorage<User[]>('sia_users_list', DEFAULT_USERS);
  });

  const [suratList, setSuratList] = useState<Surat[]>(() => {
    return getFromStorage<Surat[]>('sia_surat_list', DEFAULT_SURAT);
  });

  const [inventarisList, setInventarisList] = useState<InventarisAset[]>(() => {
    return getFromStorage<InventarisAset[]>('sia_inventaris_list', DEFAULT_INVENTARIS);
  });

  const [operasionalList, setOperasionalList] = useState<KegiatanOperasional[]>(() => {
    return getFromStorage<KegiatanOperasional[]>('sia_operasional_list', DEFAULT_OPERASIONAL);
  });

  const [debitList, setDebitList] = useState<DebitAir[]>(() => {
    return getFromStorage<DebitAir[]>('sia_debit_list', DEFAULT_DEBIT);
  });

  const [pembangunanList, setPembangunanList] = useState<ProyekPembangunan[]>(() => {
    return getFromStorage<ProyekPembangunan[]>('sia_pembangunan_list', DEFAULT_PEMBANGUNAN);
  });

  const [personelList, setPersonelList] = useState<Personel[]>(() => {
    return getFromStorage<Personel[]>('sia_personel_list', DEFAULT_PERSONEL);
  });

  const [keuanganList, setKeuanganList] = useState<Keuangan[]>(() => {
    return getFromStorage<Keuangan[]>('sia_keuangan_list', DEFAULT_KEUANGAN);
  });

  const [operasionalInventarisDiList, setOperasionalInventarisDiList] = useState<InventarisDI[]>(() => {
    return getFromStorage<InventarisDI[]>('sia_operasional_inventaris_di_list', DEFAULT_INVENTARIS_DI);
  });

  const [operasionalUsulKegiatanList, setOperasionalUsulKegiatanList] = useState<UsulKegiatan[]>(() => {
    return getFromStorage<UsulKegiatan[]>('sia_operasional_usul_kegiatan_list', DEFAULT_USUL_OP);
  });

  const [pembangunanUsulKegiatanList, setPembangunanUsulKegiatanList] = useState<UsulKegiatan[]>(() => {
    return getFromStorage<UsulKegiatan[]>('sia_pembangunan_usul_kegiatan_list', DEFAULT_USUL_PEMB);
  });

  const [pembangunanProgresLapanganList, setPembangunanProgresLapanganList] = useState<ProgresPembangunanLapangan[]>(() => {
    return getFromStorage<ProgresPembangunanLapangan[]>('sia_pembangunan_progres_lapangan_list', DEFAULT_PROGRES_LAPANGAN_PEMB);
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Sync state to local storage on edits
  const handleUpdateProfile = (newProfile: ProfileSettings) => {
    setProfile(newProfile);
    saveToStorage('sia_profile_settings', newProfile);
  };

  const handleUpdatePersonel = (newPersonelList: Personel[]) => {
    setPersonelList(newPersonelList);
    saveToStorage('sia_personel_list', newPersonelList);
  };

  const handleUpdateKeuangan = (newKeuanganList: Keuangan[]) => {
    setKeuanganList(newKeuanganList);
    saveToStorage('sia_keuangan_list', newKeuanganList);
  };

  const handleUpdateOperasionalInventarisDi = (newList: InventarisDI[]) => {
    setOperasionalInventarisDiList(newList);
    saveToStorage('sia_operasional_inventaris_di_list', newList);
  };

  const handleUpdateOperasionalUsulKegiatan = (newList: UsulKegiatan[]) => {
    setOperasionalUsulKegiatanList(newList);
    saveToStorage('sia_operasional_usul_kegiatan_list', newList);
  };

  const handleUpdatePembangunanUsulKegiatan = (newList: UsulKegiatan[]) => {
    setPembangunanUsulKegiatanList(newList);
    saveToStorage('sia_pembangunan_usul_kegiatan_list', newList);
  };

  const handleUpdatePembangunanProgresLapangan = (newList: ProgresPembangunanLapangan[]) => {
    setPembangunanProgresLapanganList(newList);
    saveToStorage('sia_pembangunan_progres_lapangan_list', newList);
  };

  const handleUpdateUsers = (newUsersList: User[]) => {
    setUsers(newUsersList);
    saveToStorage('sia_users_list', newUsersList);

    // If active user is updated/suspended/deleted, logout immediately
    if (currentUser) {
      const liveUser = newUsersList.find(u => u.id === currentUser.id);
      if (!liveUser || liveUser.status === 'nonaktif') {
        handleLogout();
      } else {
        setCurrentUser(liveUser);
        saveToStorage('sia_current_user', liveUser);
      }
    }
  };

  const handleUpdateSurat = (newSuratList: Surat[]) => {
    setSuratList(newSuratList);
    saveToStorage('sia_surat_list', newSuratList);
  };

  const handleUpdateInventaris = (newInventarisList: InventarisAset[]) => {
    setInventarisList(newInventarisList);
    saveToStorage('sia_inventaris_list', newInventarisList);
  };

  const handleUpdateOperasional = (newOperasionalList: KegiatanOperasional[]) => {
    setOperasionalList(newOperasionalList);
    saveToStorage('sia_operasional_list', newOperasionalList);
  };

  const handleUpdateDebit = (newDebitList: DebitAir[]) => {
    setDebitList(newDebitList);
    saveToStorage('sia_debit_list', newDebitList);
  };

  const handleUpdatePembangunan = (newPembangunanList: ProyekPembangunan[]) => {
    setPembangunanList(newPembangunanList);
    saveToStorage('sia_pembangunan_list', newPembangunanList);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    saveToStorage('sia_current_user', user);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    saveToStorage('sia_current_user', null);
  };

  // If user changes their own name or email we auto-recover
  useEffect(() => {
    if (currentUser) {
      const match = users.find(u => u.id === currentUser.id);
      if (match && (match.name !== currentUser.name || match.department !== currentUser.department)) {
        setCurrentUser(match);
        saveToStorage('sia_current_user', match);
      }
    }
  }, [users, currentUser]);

  // Render Login page if not authorized
  if (!currentUser) {
    return <Login onLogin={handleLogin} users={users} profile={profile} />;
  }

  // Choose the page layout active tab (highly clean modular sections)
  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            currentUser={currentUser} 
            profile={profile}
            users={users}
            suratList={suratList}
            operasionalList={operasionalList}
            debitList={debitList}
            pembangunanList={pembangunanList}
            personelList={personelList}
          />
        );
      case 'penatausahaan':
      case 'penatausahaan-umum':
      case 'penatausahaan-personalia':
      case 'penatausahaan-aset':
      case 'penatausahaan-keuangan': {
        const subTabMapping: Record<string, 'overview' | 'umum' | 'personalia' | 'aset' | 'keuangan'> = {
          'penatausahaan': 'overview',
          'penatausahaan-umum': 'umum',
          'penatausahaan-personalia': 'personalia',
          'penatausahaan-aset': 'aset',
          'penatausahaan-keuangan': 'keuangan',
        };
        const currentSubTab = subTabMapping[activeTab] || 'overview';
        return (
          <Penatausahaan 
            currentUser={currentUser}
            suratList={suratList}
            setSuratList={handleUpdateSurat}
            inventarisList={inventarisList}
            setInventarisList={handleUpdateInventaris}
            personelList={personelList}
            setPersonelList={handleUpdatePersonel}
            keuanganList={keuanganList}
            setKeuanganList={handleUpdateKeuangan}
            activeTabOverride={currentSubTab}
            onSubTabChange={(subTab) => {
              const tabIdMapping: Record<string, string> = {
                'umum': 'penatausahaan-umum',
                'personalia': 'penatausahaan-personalia',
                'aset': 'penatausahaan-aset',
                'keuangan': 'penatausahaan-keuangan',
              };
              setActiveTab(tabIdMapping[subTab] || 'penatausahaan-umum');
            }}
          />
        );
      }
      case 'operasional':
      case 'operasional-inventaris-di':
      case 'operasional-data-kegiatan':
      case 'operasional-progres-lapangan':
      case 'operasional-usul-kegiatan': {
        const subTabMapping: Record<string, 'inventaris-di' | 'data-kegiatan' | 'progres-lapangan' | 'usul-kegiatan'> = {
          'operasional': 'inventaris-di',
          'operasional-inventaris-di': 'inventaris-di',
          'operasional-data-kegiatan': 'data-kegiatan',
          'operasional-progres-lapangan': 'progres-lapangan',
          'operasional-usul-kegiatan': 'usul-kegiatan',
        };
        const currentSubTab = subTabMapping[activeTab] || 'inventaris-di';
        return (
          <SeksiOperasional 
            currentUser={currentUser}
            operasionalList={operasionalList}
            setOperasionalList={handleUpdateOperasional}
            debitList={debitList}
            setDebitList={handleUpdateDebit}
            activeTabOverride={currentSubTab}
            onSubTabChange={(subTab) => {
              setActiveTab(`operasional-${subTab}`);
            }}
            inventarisDiList={operasionalInventarisDiList}
            setInventarisDiList={handleUpdateOperasionalInventarisDi}
            usulKegiatanList={operasionalUsulKegiatanList}
            setUsulKegiatanList={handleUpdateOperasionalUsulKegiatan}
          />
        );
      }
      case 'pembangunan':
      case 'pembangunan-data-kegiatan':
      case 'pembangunan-progres-lapangan':
      case 'pembangunan-usul-kegiatan': {
        const subTabMapping: Record<string, 'data-kegiatan' | 'progres-lapangan' | 'usul-kegiatan'> = {
          'pembangunan': 'data-kegiatan',
          'pembangunan-data-kegiatan': 'data-kegiatan',
          'pembangunan-progres-lapangan': 'progres-lapangan',
          'pembangunan-usul-kegiatan': 'usul-kegiatan',
        };
        const currentSubTab = subTabMapping[activeTab] || 'data-kegiatan';
        return (
          <SeksiPembangunan 
            currentUser={currentUser}
            pembangunanList={pembangunanList}
            setPembangunanList={handleUpdatePembangunan}
            activeTabOverride={currentSubTab}
            onSubTabChange={(subTab) => {
              setActiveTab(`pembangunan-${subTab}`);
            }}
            usulKegiatanList={pembangunanUsulKegiatanList}
            setUsulKegiatanList={handleUpdatePembangunanUsulKegiatan}
            progresLapanganList={pembangunanProgresLapanganList}
            setProgresLapanganList={handleUpdatePembangunanProgresLapangan}
          />
        );
      }
      case 'pengaturan':
        return (
          <Pengaturan 
            currentUser={currentUser}
            profile={profile}
            setProfile={handleUpdateProfile}
            users={users}
            setUsers={handleUpdateUsers}
          />
        );
      default:
        return <div className="p-8 font-sans">Halaman tidak ditemukan.</div>;
    }
  };

  return (
    <div id="sia-app-shell" className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      {/* Sidebar navigation */}
      <Sidebar 
        currentUser={currentUser} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout}
        profile={profile}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Body viewports */}
      <div className="flex-1 flex flex-col justify-between overflow-x-hidden min-h-screen relative shadow-inner">
        
        {/* Upper Top Navbar containing active profile & context indicators */}
        <header className="h-16 border-b border-slate-200/50 bg-white/80 backdrop-blur-md sticky top-0 px-4 md:px-8 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-3">
            {/* Hamburger button on mobile */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg md:hidden flex items-center justify-center transition"
              id="btn-mobile-sidebar-toggle"
              aria-label="Buka Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wider">
              <span>SIA UPTD</span>
              <span>/</span>
              <span className="text-slate-700 capitalize">
                {activeTab === 'penatausahaan_umum' || activeTab === 'penatausahaan-umum' ? 'Penatausahaan / Adm Umum' :
                 activeTab === 'penatausahaan_personalia' || activeTab === 'penatausahaan-personalia' ? 'Penatausahaan / Personalia' :
                 activeTab === 'penatausahaan_aset' || activeTab === 'penatausahaan-aset' ? 'Penatausahaan / Aset & Inventaris' :
                 activeTab === 'penatausahaan_keuangan' || activeTab === 'penatausahaan-keuangan' ? 'Penatausahaan / Keuangan' :
                 activeTab === 'operasional-inventaris-di' ? 'Seksi Operasional / Inventaris DI' :
                 activeTab === 'operasional-data-kegiatan' ? 'Seksi Operasional / Data Kegiatan' :
                 activeTab === 'operasional-progres-lapangan' ? 'Seksi Operasional / Progres Lapangan' :
                 activeTab === 'operasional-usul-kegiatan' ? 'Seksi Operasional / Usul Kegiatan' :
                 activeTab}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* Quick Helper badge info */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Koneksi Server Online</span>
            </div>

            {/* Quick Profile capsule */}
            <div className="flex items-center gap-2 border-l border-slate-200 pl-4 py-1">
              <span className="text-xs font-bold text-slate-700 md:block hidden">{currentUser.name.split(',')[0]}</span>
              <div className="p-1.5 bg-slate-100 rounded-lg text-slate-600">
                <UserIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable central content */}
        <main className="p-4 md:p-8 flex-1 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {renderActiveComponent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Global Footer customised instantly by settings */}
        <footer className="bg-white border-t border-slate-100 p-6 shrink-0 text-center font-sans tracking-tight">
          <div className="max-w-7xl mx-auto space-y-2">
            <p className="text-slate-500 text-[11px] leading-relaxed max-w-3xl mx-auto">
              {profile.footerText}
            </p>
            <p className="text-slate-400 text-[10px] font-semibold">
              {profile.copyrightText}
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
