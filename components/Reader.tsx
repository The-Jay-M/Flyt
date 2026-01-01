
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PDFDocument, ThemeMode, ReaderSettings } from '../types';
import { 
  ChevronLeft, 
  Settings, 
  Type, 
  Moon, 
  Sun, 
  Search, 
  Bookmark as BookmarkIcon,
  Menu,
  Maximize2,
  Minimize2,
  X,
  Layout,
  AlignLeft,
  BookOpen
} from 'lucide-react';

interface ReaderProps {
  pdfs: PDFDocument[];
  settings: ReaderSettings;
  onUpdateSettings: (settings: ReaderSettings) => void;
}

const Reader: React.FC<ReaderProps> = ({ pdfs, settings, onUpdateSettings }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const pdf = pdfs.find(p => p.id === id);

  const [showControls, setShowControls] = useState(false);
  const [currentPage, setCurrentPage] = useState(pdf?.currentPage || 1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pdf) navigate('/');
  }, [pdf, navigate]);

  const toggleControls = () => setShowControls(!showControls);

  const themeClasses = {
    [ThemeMode.LIGHT]: 'bg-[#fcfcfc] text-[#1a1a1a]',
    [ThemeMode.SEPIA]: 'bg-[#f4ecd8] text-[#5b4636]',
    [ThemeMode.EYE_CARE]: 'bg-[#cce8cf] text-[#2d4a2d]',
    [ThemeMode.DARK]: 'bg-[#1a1a1a] text-[#e0e0e0]',
    [ThemeMode.AMOLED]: 'bg-black text-[#888888]'
  };

  const pageColor = {
    [ThemeMode.LIGHT]: '#ffffff',
    [ThemeMode.SEPIA]: '#fbf5e6',
    [ThemeMode.EYE_CARE]: '#e3f3e6',
    [ThemeMode.DARK]: '#242424',
    [ThemeMode.AMOLED]: '#121212'
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= (pdf?.totalPages || 1)) {
      setCurrentPage(newPage);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!pdf) return null;

  return (
    <div 
      ref={containerRef}
      className={`h-full w-full relative transition-colors duration-500 ease-in-out ${themeClasses[settings.theme]} select-none overflow-hidden`}
      style={{ filter: `brightness(${settings.brightness}%)` }}
    >
      {/* Immersive Page Content */}
      <div 
        className="h-full w-full flex flex-col items-center justify-start overflow-y-auto no-scrollbar pt-12 pb-24 px-6 md:px-0"
        onClick={toggleControls}
      >
        <div className="w-full max-w-2xl flex flex-col gap-12">
          {/* Mock Pages */}
          {[currentPage, currentPage + 1].map((pNum) => (
            <div 
              key={pNum} 
              className="w-full aspect-[1/1.4] shadow-2xl rounded-sm p-12 transition-all duration-300 relative flex flex-col"
              style={{ backgroundColor: pageColor[settings.theme] }}
            >
              {/* Ruler Overlay */}
              {settings.isRulerEnabled && (
                <div className="absolute top-1/2 left-0 right-0 h-10 bg-blue-500/10 border-y border-blue-500/30 pointer-events-none z-10 flex items-center justify-center">
                   <div className="w-full h-[1px] bg-blue-500/20" />
                </div>
              )}
              
              <div className="flex justify-between items-center mb-8 opacity-40 text-[10px] font-semibold tracking-widest uppercase">
                <span>{pdf.title}</span>
                <span>Page {pNum}</span>
              </div>
              
              <div className="flex-1 font-serif text-justify space-y-6" style={{ fontSize: `${settings.fontSize}px`, lineHeight: settings.lineHeight }}>
                <h1 className="text-2xl font-bold mb-8">Chapter {Math.ceil(pNum / 10)}</h1>
                <p>
                  The silhouette of the great structure loomed against the twilight sky. It was a testament to the ambitions of an era long since passed into legend. Everywhere one looked, there were intricate carvings that whispered secrets of a bygone age, if only one knew how to listen.
                </p>
                <p>
                  As I stood there, the cool evening air began to settle. The world seemed to hold its breath. This was the moment I had waited for—the culmination of years of study and sacrifice. The heavy tome in my satchel felt suddenly light, its weight replaced by the anticipation of discovery.
                </p>
                <p>
                  Wait until you see what lies within the hidden chambers. Scholars had debated their existence for centuries, but here I was, the first to find the key. The silver-etched surface of the portal glimmered under my touch, feeling cold and ancient.
                </p>
                <p>
                  "Are you sure about this?" a voice echoed from the darkness behind me. It was Kaelen, always the cautious one. I didn't need to turn around to know the expression on his face—one part concern, two parts skepticism. 
                </p>
              </div>

              <div className="mt-8 text-center opacity-30 text-xs">
                {pNum}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Overlay UI (Anybooks style) */}
      <div className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300 transform ${showControls ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="bg-white/90 dark:bg-black/80 backdrop-blur-lg border-b dark:border-white/10 px-4 h-16 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => { e.stopPropagation(); navigate('/'); }}
              className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft size={24} className="dark:text-white" />
            </button>
            <div className="flex flex-col">
              <span className="text-sm font-bold dark:text-white truncate max-w-[150px]">{pdf.title}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Reading</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors dark:text-white">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors dark:text-white">
              <BookmarkIcon size={20} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowSettingsModal(true); }}
              className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors dark:text-white"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Overlay UI (Anybooks style) */}
      <div className={`absolute bottom-0 left-0 right-0 z-50 transition-all duration-300 transform ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="bg-white/90 dark:bg-black/80 backdrop-blur-lg border-t dark:border-white/10 px-6 pt-4 pb-8 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-medium dark:text-slate-400">P. {currentPage}</span>
            <input 
              type="range"
              min="1"
              max={pdf.totalPages}
              value={currentPage}
              onChange={(e) => handlePageChange(parseInt(e.target.value))}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 h-1 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none accent-blue-600"
            />
            <span className="text-xs font-medium dark:text-slate-400">{pdf.totalPages}</span>
          </div>
          
          <div className="flex justify-between items-center px-4">
            <button className="flex flex-col items-center gap-1 dark:text-slate-400 hover:text-blue-600 transition-colors">
              <Menu size={20} />
              <span className="text-[10px] font-semibold">TOC</span>
            </button>
            <button 
               onClick={(e) => {
                 e.stopPropagation();
                 onUpdateSettings({ ...settings, isRulerEnabled: !settings.isRulerEnabled });
               }}
               className={`flex flex-col items-center gap-1 transition-colors ${settings.isRulerEnabled ? 'text-blue-600' : 'dark:text-slate-400 hover:text-blue-600'}`}
            >
              <Layout size={20} />
              <span className="text-[10px] font-semibold">Ruler</span>
            </button>
            <button 
               onClick={(e) => {
                 e.stopPropagation();
                 toggleFullscreen();
               }}
               className="flex flex-col items-center gap-1 dark:text-slate-400 hover:text-blue-600 transition-colors"
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              <span className="text-[10px] font-semibold">{isFullscreen ? 'Exit' : 'Full'}</span>
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowSettingsModal(true);
              }}
              className="flex flex-col items-center gap-1 dark:text-slate-400 hover:text-blue-600 transition-colors"
            >
              <Type size={20} />
              <span className="text-[10px] font-semibold">Format</span>
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal (Overlay) */}
      {showSettingsModal && (
        <div 
          className="absolute inset-0 z-[100] bg-black/40 backdrop-blur-sm flex flex-col justify-end"
          onClick={() => setShowSettingsModal(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 rounded-t-3xl p-8 space-y-8 animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold dark:text-white">Reading Settings</h3>
              <button 
                onClick={() => setShowSettingsModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full dark:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Brightness */}
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Brightness</span>
                <span>{settings.brightness}%</span>
              </div>
              <div className="flex items-center gap-4">
                <Sun size={18} className="text-slate-400" />
                <input 
                  type="range"
                  min="20"
                  max="100"
                  value={settings.brightness}
                  onChange={(e) => onUpdateSettings({ ...settings, brightness: parseInt(e.target.value) })}
                  className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none accent-blue-600"
                />
                <Sun size={24} className="text-slate-400" />
              </div>
            </div>

            {/* Themes */}
            <div className="space-y-4">
               <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Appearance</h4>
               <div className="flex justify-between gap-4">
                  {[ThemeMode.LIGHT, ThemeMode.SEPIA, ThemeMode.EYE_CARE, ThemeMode.DARK, ThemeMode.AMOLED].map(mode => (
                    <button 
                      key={mode}
                      onClick={() => onUpdateSettings({ ...settings, theme: mode })}
                      className={`w-12 h-12 rounded-full border-2 transition-all transform hover:scale-110 ${settings.theme === mode ? 'border-blue-600 scale-110' : 'border-transparent'}`}
                      style={{ 
                        backgroundColor: mode === ThemeMode.AMOLED ? '#000' : mode === ThemeMode.DARK ? '#333' : mode === ThemeMode.EYE_CARE ? '#cce8cf' : mode === ThemeMode.SEPIA ? '#f4ecd8' : '#fff' 
                      }}
                    />
                  ))}
               </div>
            </div>

            {/* Font Control */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Typography</h4>
              <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                <button 
                  onClick={() => onUpdateSettings({ ...settings, fontSize: Math.max(12, settings.fontSize - 1) })}
                  className="text-2xl font-bold dark:text-white w-10"
                >A-</button>
                <span className="font-bold dark:text-white">{settings.fontSize}px</span>
                <button 
                  onClick={() => onUpdateSettings({ ...settings, fontSize: Math.min(32, settings.fontSize + 1) })}
                  className="text-2xl font-bold dark:text-white w-10"
                >A+</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => onUpdateSettings({ ...settings, lineHeight: 1.2 })}
                  className={`py-3 rounded-xl border flex flex-center gap-2 items-center justify-center font-bold ${settings.lineHeight === 1.2 ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-slate-200 dark:border-slate-800 dark:text-white'}`}
                >
                  <AlignLeft size={16} /> Tight
                </button>
                <button 
                   onClick={() => onUpdateSettings({ ...settings, lineHeight: 1.8 })}
                   className={`py-3 rounded-xl border flex flex-center gap-2 items-center justify-center font-bold ${settings.lineHeight === 1.8 ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-slate-200 dark:border-slate-800 dark:text-white'}`}
                >
                  <AlignLeft size={16} /> Loose
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Tap Gestures Overlay (Invisible zones) */}
      <div className="absolute inset-0 pointer-events-none flex">
        <div 
          className="w-1/4 h-full pointer-events-auto" 
          onClick={(e) => { e.stopPropagation(); handlePageChange(currentPage - 1); }}
        />
        <div 
          className="w-2/4 h-full pointer-events-auto" 
          onClick={toggleControls}
        />
        <div 
          className="w-1/4 h-full pointer-events-auto" 
          onClick={(e) => { e.stopPropagation(); handlePageChange(currentPage + 1); }}
        />
      </div>
    </div>
  );
};

export default Reader;
