
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PDFDocument } from '../types';
import { Search, MoreVertical, FileText, Grid, List as ListIcon, Plus, BookOpen } from 'lucide-react';

interface LibraryProps {
  pdfs: PDFDocument[];
}

const Library: React.FC<LibraryProps> = ({ pdfs }) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Top Header */}
      <header className="px-4 py-4 flex items-center justify-between border-b dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <BookOpen size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight dark:text-white">Flyt</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-400">
            <Search size={20} />
          </button>
          <button 
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-400"
          >
            {viewMode === 'grid' ? <ListIcon size={20} /> : <Grid size={20} />}
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-600 dark:text-slate-400">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 scroll-smooth">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Recent</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {pdfs.slice(0, 3).map(pdf => (
              <div 
                key={pdf.id}
                onClick={() => navigate(`/reader/${pdf.id}`)}
                className="flex-shrink-0 w-32 cursor-pointer group"
              >
                <div className="aspect-[2/3] w-full rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all mb-2 relative">
                  <img src={pdf.coverUrl} alt={pdf.title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div 
                      className="h-full bg-blue-600" 
                      style={{ width: `${(pdf.currentPage / pdf.totalPages) * 100}%` }}
                    />
                  </div>
                </div>
                <h3 className="text-xs font-semibold truncate dark:text-white">{pdf.title}</h3>
                <p className="text-[10px] text-slate-500">{pdf.author}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">All Documents</h2>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {pdfs.map(pdf => (
                <div 
                  key={pdf.id}
                  onClick={() => navigate(`/reader/${pdf.id}`)}
                  className="flex flex-col gap-2 cursor-pointer group"
                >
                  <div className="aspect-[2/3] w-full bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all relative border dark:border-slate-700">
                    <img src={pdf.coverUrl} alt={pdf.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-black/40 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={14} className="dark:text-white" />
                    </div>
                  </div>
                  <div className="px-1">
                    <h3 className="text-sm font-medium leading-tight truncate dark:text-white">{pdf.title}</h3>
                    <p className="text-xs text-slate-500 mt-1">{pdf.size}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {pdfs.map(pdf => (
                <div 
                  key={pdf.id}
                  onClick={() => navigate(`/reader/${pdf.id}`)}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors border border-transparent dark:border-slate-800"
                >
                  <div className="w-12 h-16 rounded overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={pdf.coverUrl} alt={pdf.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold truncate dark:text-white">{pdf.title}</h3>
                    <p className="text-xs text-slate-500">{pdf.author} • {pdf.size}</p>
                  </div>
                  <div className="text-slate-400">
                    <MoreVertical size={18} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
        <Plus size={28} />
      </button>

      {/* Bottom Nav */}
      <nav className="border-t dark:border-slate-800 px-6 py-2 flex justify-between items-center bg-white dark:bg-slate-900">
        <div className="flex flex-col items-center text-blue-600">
          <BookOpen size={20} />
          <span className="text-[10px] font-bold mt-1">Library</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <FileText size={20} />
          <span className="text-[10px] font-medium mt-1">Recent</span>
        </div>
        <div className="flex flex-col items-center text-slate-400">
          <Search size={20} />
          <span className="text-[10px] font-medium mt-1">Explore</span>
        </div>
      </nav>
    </div>
  );
};

export default Library;
