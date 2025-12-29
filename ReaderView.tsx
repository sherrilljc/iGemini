
import React from 'react';
import { GeminiResponse } from '../types';
import { MODE_ICONS } from '../constants';
import { ChevronLeft, Share2, Copy } from 'lucide-react';

interface ReaderViewProps {
  response: GeminiResponse;
  onBack: () => void;
}

const ReaderView: React.FC<ReaderViewProps> = ({ response, onBack }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(response.processedText);
    alert('Copied to clipboard');
  };

  return (
    <div className="flex flex-col h-full bg-white animate-in zoom-in-95 duration-200">
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-50 sticky top-0 bg-white z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
           <div className="p-1.5 bg-gray-100 rounded-lg text-gray-500">
             {MODE_ICONS[response.mode]}
           </div>
           <span className="font-bold text-gray-800">iGemini {response.mode}</span>
        </div>
        <div className="flex gap-1">
           <button onClick={handleCopy} className="p-2 text-gray-400 hover:text-emerald-500 transition-colors">
             <Copy className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="p-8 space-y-8 overflow-y-auto">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Source Context
          </div>
          <blockquote className="border-l-4 border-gray-200 pl-6 italic text-lg text-gray-500 font-serif leading-relaxed">
            "{response.originalText}"
          </blockquote>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
            Gemini Analysis
          </div>
          <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
            {response.processedText}
          </div>
        </div>

        <div className="pt-12 border-t border-gray-50">
           <div className="text-center text-[10px] text-gray-300 font-medium italic">
             Generated on {new Date(response.timestamp).toLocaleString()}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReaderView;
