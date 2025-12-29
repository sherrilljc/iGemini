
import React from 'react';
import { ShieldCheck, Flame, Search, History, Settings, PlusCircle, Share2, Copy, Trash2, ChevronLeft } from 'lucide-react';
import { Mode } from './types';

export const MODE_ICONS: Record<Mode, React.ReactNode> = {
  [Mode.FACT_CHECK]: <ShieldCheck className="w-4 h-4" />,
  [Mode.ROAST]: <Flame className="w-4 h-4" />,
  [Mode.ANALYSIS]: <Search className="w-4 h-4" />,
};

export const NAV_ITEMS = [
  { id: 'compose', label: 'Compose', icon: <PlusCircle className="w-6 h-6" /> },
  { id: 'history', label: 'History', icon: <History className="w-6 h-6" /> },
  { id: 'settings', label: 'Settings', icon: <Settings className="w-6 h-6" /> },
];

export const APP_PRIMARY = '#10a37f'; // Gemini-inspired branding
