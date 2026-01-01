
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Library from './components/Library';
import Reader from './components/Reader';
import { PDFDocument, ThemeMode, ReaderSettings } from './types';

const MOCK_PDFS: PDFDocument[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverUrl: 'https://picsum.photos/seed/gatsby/400/600',
    totalPages: 180,
    currentPage: 12,
    lastRead: new Date(),
    size: '1.2 MB'
  },
  {
    id: '2',
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    coverUrl: 'https://picsum.photos/seed/data/400/600',
    totalPages: 611,
    currentPage: 45,
    lastRead: new Date(Date.now() - 86400000),
    size: '14.5 MB'
  }
];

const App: React.FC = () => {
  const [pdfs, setPdfs] = useState<PDFDocument[]>(() => {
    const saved = localStorage.getItem('flyt_library');
    // Note: Blob URLs don't persist across refreshes, so we only persist mock data and session-only real PDFs are added fresh
    return saved ? JSON.parse(saved).map((p: any) => ({...p, lastRead: new Date(p.lastRead)})) : MOCK_PDFS;
  });

  const [settings, setSettings] = useState<ReaderSettings>({
    theme: ThemeMode.LIGHT,
    fontSize: 18,
    lineHeight: 1.6,
    brightness: 100,
    isRulerEnabled: false,
    isScrollingVertical: true
  });

  const handleAddPdf = (newPdf: PDFDocument) => {
    setPdfs(prev => [newPdf, ...prev]);
  };

  const handleUpdatePdf = (id: string, updates: Partial<PDFDocument>) => {
    setPdfs(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  useEffect(() => {
    // We only save metadata to localStorage, not the blob URLs as they die on refresh
    const metadataOnly = pdfs.filter(p => !p.fileUrl);
    localStorage.setItem('flyt_library', JSON.stringify(metadataOnly));
  }, [pdfs]);

  return (
    <Router>
      <div className="h-screen w-screen overflow-hidden">
        <Routes>
          <Route path="/" element={<Library pdfs={pdfs} onAddPdf={handleAddPdf} />} />
          <Route 
            path="/reader/:id" 
            element={
              <Reader 
                pdfs={pdfs} 
                settings={settings} 
                onUpdateSettings={setSettings} 
                onUpdatePdf={handleUpdatePdf}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
