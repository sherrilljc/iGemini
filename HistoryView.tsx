
import React, { useState, useEffect } from 'react';
import { GeminiResponse } from '../types';
import { getHistory, deleteResponse } from '../utils/storage';
import { MODE_ICONS } from '../constants';
import { Trash2, ExternalLink, Calendar } from 'lucide-react';

interface HistoryViewProps {
  onSelect: (response: GeminiResponse) => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ onSelect }) => {
  const [history, setHistory] = useState<GeminiResponse[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteResponse(id);
    setHistory(getHistory());
  };

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (history.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center opacity-60">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Calendar className="w-10 h-10 text-gray-300" />
        </div>
        <h3 className="text-lg font-bold text-gray-800">No History Yet</h3>
        <p className="text-sm text-gray-500 mt-2">Your analyzed messages will appear here for 7 days.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 animate-in fade-in duration-300">
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">Recent Activity</h2>
      <div className="space-y-3">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 hover:border-emerald-200 transition-all cursor-pointer group active:scale-[0.98]"
          >
            <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center ${
              item.mode === 'Roast' ? 'bg-orange-50 text-orange-600' :
              item.mode === 'Fact-check' ? 'bg-blue-50 text-blue-600' :
              'bg-emerald-50 text-emerald-600'
            }`}>
              {MODE_ICONS[item.mode]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold uppercase tracking-tighter text-gray-400">{item.mode}</span>
                <span className="text-[10px] text-gray-400">{formatDate(item.timestamp)}</span>
              </div>
              <p className="text-sm font-semibold text-gray-800 line-clamp-1 mb-1">{item.originalText}</p>
              <p className="text-xs text-gray-500 line-clamp-2">{item.processedText}</p>
            </div>
            <button
              onClick={(e) => handleDelete(e, item.id)}
              className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all rounded-lg hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
