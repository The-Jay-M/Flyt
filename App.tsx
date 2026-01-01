
import React, { useState } from 'react';
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
  },
  {
    id: '3',
    title: 'Structural Engineering Handbook',
    author: 'Edwin H. Gaylord',
    coverUrl: 'https://picsum.photos/seed/eng/400/600',
    totalPages: 1200,
    currentPage: 890,
    lastRead: new Date(Date.now() - 172800000),
    size: '45.0 MB'
  }
];

const App: React.FC = () => {
  const [pdfs, setPdfs] = useState<PDFDocument[]>(MOCK_PDFS);
  const [settings, setSettings] = useState<ReaderSettings>({
    theme: ThemeMode.LIGHT,
    fontSize: 16,
    lineHeight: 1.5,
    brightness: 100,
    isRulerEnabled: false,
    isScrollingVertical: true
  });

  return (
    <Router>
      <div className="h-screen w-screen overflow-hidden">
        <Routes>
          <Route path="/" element={<Library pdfs={pdfs} />} />
          <Route 
            path="/reader/:id" 
            element={
              <Reader 
                pdfs={pdfs} 
                settings={settings} 
                onUpdateSettings={setSettings} 
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
