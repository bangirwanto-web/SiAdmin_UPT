import React from 'react';
import { 
  BarChart3, 
  FolderLock, 
  Droplet, 
  Wrench, 
  HardHat, 
  Settings, 
  LogOut, 
  ChevronRight, 
  User as UserIcon,
  ShieldCheck,
  ShieldAlert,
  X,
  Layers
} from 'lucide-react';
import { User, ProfileSettings } from '../types';

interface SidebarProps {
  currentUser: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  profile: ProfileSettings;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ currentUser, activeTab, setActiveTab, onLogout, profile, isOpen = false, onClose }: SidebarProps) {
  
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      roleRequired: 'user', // both roles
      badge: null
    },
    {
      id: 'penatausahaan',
      label: 'Penatausahaan',
      icon: FolderLock,
      roleRequired: 'user',
      badge: 'Surat & Aset'
    },
    {
      id: 'operasional',
      label: 'Seksi Operasional',
      icon: Wrench,
      roleRequired: 'user',
      badge: 'Debit Air'
    },
    {
      id: 'pembangunan',
      label: 'Seksi Pembangunan',
      icon: HardHat,
      roleRequired: 'user',
      badge: 'Proyek'
    },
    {
      id: 'pengaturan',
      label: 'Pengaturan Sistem',
      icon: Settings,
      roleRequired: 'admin', // admin only
      badge: 'Admin Only'
    }
  ];

  return (
    <>
      {/* Backdrop overlay for mobile viewport */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
        />
      )}

      <aside 
        id="sidebar-navigation" 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-950 text-blue-100 flex flex-col justify-between shrink-0 h-screen font-sans border-r border-blue-900/70 transition-transform duration-300 ease-in-out md:sticky md:top-0 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Upper Brand Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5 min-w-0">
              {profile.logoUrl ? (
                <img 
                  referrerPolicy="no-referrer"
                  src={profile.logoUrl} 
                  alt="Logo Instansi" 
                  className="w-8.5 h-8.5 rounded-lg object-cover bg-white p-0.5 shadow-md shrink-0 border border-blue-800/50"
                />
              ) : (
                <div className={`p-2 rounded-lg ${profile.logoTheme || 'bg-blue-600'} text-white shadow-md flex items-center justify-center shrink-0`}>
                  <Droplet className="w-4.5 h-4.5 text-blue-200 fill-blue-200" />
                </div>
              )}
              <div className="min-w-0">
                <h1 className="text-xs font-bold text-blue-50 line-clamp-1">{profile.shortName}</h1>
                <p className="text-[9px] text-blue-300 font-medium uppercase tracking-wider">SIA UPTD PSDA</p>
              </div>
            </div>
            
            {/* Close button on mobile views */}
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 h-7 w-7 flex items-center justify-center text-blue-300 hover:text-white hover:bg-blue-900/80 rounded-md md:hidden transition"
                aria-label="Tutup Sidebar"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            )}
          </div>

          {/* Current User Card */}
          <div className="flex items-center gap-2.5 bg-blue-900/40 p-2.5 rounded-lg border border-blue-900/50 mb-4">
            {currentUser.avatar ? (
              <img 
                referrerPolicy="no-referrer"
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-8.5 h-8.5 rounded-full border border-blue-800 object-cover"
              />
            ) : (
              <div className="w-8.5 h-8.5 rounded-full bg-blue-800 flex items-center justify-center text-blue-100 font-bold text-xs shrink-0">
                {currentUser.name.charAt(0)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-blue-50 truncate leading-tight">{currentUser.name}</p>
              <p className="text-[9px] text-blue-300 truncate mt-0.5">{currentUser.department}</p>
              
              <div className="flex items-center gap-1 mt-1">
                {currentUser.role === 'admin' ? (
                  <span className="flex items-center text-[8px] font-semibold bg-emerald-550/10 text-emerald-400 px-1 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest gap-0.5 leading-none">
                    <ShieldCheck className="w-2.5 h-2.5" /> Admin
                  </span>
                ) : (
                  <span className="flex items-center text-[8px] font-semibold bg-sky-500/10 text-sky-400 px-1 py-0.5 rounded border border-sky-500/20 uppercase tracking-widest gap-0.5 leading-none">
                    <UserIcon className="w-2.5 h-2.5" /> Staf
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-1">
            <p className="text-[9px] font-bold text-blue-400/80 uppercase tracking-wider mb-2 px-2">
              Menu Kepengurusan
            </p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isAccessible = item.roleRequired === 'user' || currentUser.role === 'admin';
              const isTabActive = activeTab === item.id || 
                                  (item.id === 'penatausahaan' && activeTab.startsWith('penatausahaan-')) ||
                                  (item.id === 'operasional' && activeTab.startsWith('operasional-')) ||
                                  (item.id === 'pembangunan' && activeTab.startsWith('pembangunan-'));
              
              return (
                <React.Fragment key={item.id}>
                  <button
                    id={`btn-nav-${item.id}`}
                    disabled={!isAccessible}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (onClose) onClose();
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs font-medium transition-all group ${
                      !isAccessible 
                        ? 'opacity-40 cursor-not-allowed text-blue-300 hover:bg-transparent'
                        : isTabActive 
                        ? 'bg-blue-900/70 text-blue-50 shadow-sm border border-blue-800/40' 
                        : 'text-blue-200/90 hover:text-white hover:bg-blue-900/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                        isTabActive ? 'text-sky-305 text-sky-300' : 'text-blue-300'
                      }`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {item.badge && !isTabActive && (
                        <span className="text-[7.5px] font-semibold bg-blue-900 text-blue-200 px-1 py-0.5 rounded uppercase tracking-wider scale-95 group-hover:bg-blue-800">
                          {item.badge.split(' ')[0]}
                        </span>
                      )}
                      {isAccessible ? (
                        <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all ${
                          isTabActive ? 'opacity-100 rotate-90 text-sky-400' : 'text-blue-400'
                        }`} />
                      ) : (
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" title="Akses Terbatas: Hanya untuk Admin" />
                      )}
                    </div>
                  </button>
                  
                  {/* Sub-pages list nested directly below Seksi Operasional */}
                  {item.id === 'operasional' && isAccessible && (
                    <div className="mt-1 mb-1 ml-4 border-l border-blue-900/60 pl-2.5 space-y-1 animate-fade-in-down">
                      {[
                        { id: 'operasional-inventaris-di', label: 'Inventaris DI' },
                        { id: 'operasional-data-kegiatan', label: 'Data Kegiatan' },
                        { id: 'operasional-progres-lapangan', label: 'Progres Lapangan' },
                        { id: 'operasional-usul-kegiatan', label: 'Usul Kegiatan' }
                      ].map((sub) => {
                        const isSubActive = activeTab === sub.id;
                        return (
                          <button
                            key={sub.id}
                            id={`btn-nav-sub-${sub.id}`}
                            onClick={() => {
                              setActiveTab(sub.id);
                              if (onClose) onClose();
                            }}
                            className={`w-full flex items-center justify-between py-1 px-2 rounded text-[11px] font-medium transition-all text-left ${
                              isSubActive 
                                ? 'text-sky-300 bg-blue-900/50 font-bold' 
                                : 'text-blue-200/85 hover:text-white hover:bg-blue-900/15'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-1 h-1 rounded-full ${isSubActive ? 'bg-sky-450 bg-sky-400 scale-125' : 'bg-blue-800'}`}></span>
                              <span>{sub.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Sub-pages list nested directly below Seksi Pembangunan */}
                  {item.id === 'pembangunan' && isAccessible && (
                    <div className="mt-1 mb-1 ml-4 border-l border-blue-900/60 pl-2.5 space-y-1 animate-fade-in-down">
                      {[
                        { id: 'pembangunan-data-kegiatan', label: 'Data Kegiatan' },
                        { id: 'pembangunan-progres-lapangan', label: 'Progres Lapangan' },
                        { id: 'pembangunan-usul-kegiatan', label: 'Usul Kegiatan' }
                      ].map((sub) => {
                        const isSubActive = activeTab === sub.id;
                        return (
                          <button
                            key={sub.id}
                            id={`btn-nav-sub-${sub.id}`}
                            onClick={() => {
                              setActiveTab(sub.id);
                              if (onClose) onClose();
                            }}
                            className={`w-full flex items-center justify-between py-1 px-2 rounded text-[11px] font-medium transition-all text-left ${
                              isSubActive 
                                ? 'text-sky-300 bg-blue-900/50 font-bold' 
                                : 'text-blue-200/85 hover:text-white hover:bg-blue-900/15'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-1 h-1 rounded-full ${isSubActive ? 'bg-sky-450 bg-sky-400 scale-125' : 'bg-blue-800'}`}></span>
                              <span>{sub.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Sub-pages list nested directly below Penatausahaan */}
                  {item.id === 'penatausahaan' && isAccessible && (
                    <div className="mt-1 mb-1 ml-4 border-l border-blue-900/60 pl-2.5 space-y-1">
                      {[
                        { id: 'penatausahaan-umum', label: 'Adm Umum' },
                        { id: 'penatausahaan-personalia', label: 'Personalia' },
                        { id: 'penatausahaan-aset', label: 'Aset & Inventaris' },
                        { id: 'penatausahaan-keuangan', label: 'Keuangan' }
                      ].map((sub) => {
                        const isSubActive = activeTab === sub.id;
                        return (
                          <button
                            key={sub.id}
                            id={`btn-nav-sub-${sub.id}`}
                            onClick={() => {
                              setActiveTab(sub.id);
                              if (onClose) onClose();
                            }}
                            className={`w-full flex items-center justify-between py-1 px-2 rounded text-[11px] font-medium transition-all text-left ${
                              isSubActive 
                                ? 'text-sky-300 bg-blue-900/50 font-bold' 
                                : 'text-blue-200/85 hover:text-white hover:bg-blue-900/15'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-1 h-1 rounded-full ${isSubActive ? 'bg-sky-450 bg-sky-400 scale-125' : 'bg-blue-800'}`}></span>
                              <span>{sub.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Logout & Footer */}
        <div className="p-4 border-t border-blue-900/40 bg-blue-950/80">
          <button
            onClick={() => {
              onLogout();
              if (onClose) onClose();
            }}
            id="btn-logout"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/25 hover:border-rose-500/40 text-rose-400 rounded-lg text-xs font-semibold transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Keluar Unit</span>
          </button>

          <p className="text-[8px] text-blue-400/50 text-center mt-3">
            SIA-PSA v1.0 &bull; Bah Bolon
          </p>
        </div>
      </aside>
    </>
  );
}
