
export enum ThemeMode {
  LIGHT = 'light',
  SEPIA = 'sepia',
  EYE_CARE = 'eye_care',
  DARK = 'dark',
  AMOLED = 'amoled'
}

export interface PDFDocument {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  totalPages: number;
  currentPage: number;
  lastRead: Date;
  size: string;
}

export interface Bookmark {
  id: string;
  page: number;
  title: string;
  date: Date;
}

export interface ReaderSettings {
  theme: ThemeMode;
  fontSize: number;
  lineHeight: number;
  brightness: number;
  isRulerEnabled: boolean;
  isScrollingVertical: boolean;
}
