
import React, { useState } from 'react';
import { GeminiResponse } from '../types';
import { MODE_ICONS } from '../constants';
import { Copy, Share2, MessageSquare, ChevronLeft, CheckCircle2 } from 'lucide-react';

interface ResultProps {
  response: GeminiResponse;
  onBack: () => void;
}

const Result: React.FC<ResultProps> = ({ response, onBack }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(response.processedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDeepLink = () => {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}#/view/${response.id}`;
  };

  const getPreviewText = () => {
    const truncated = response.processedText.length > 140 
      ? response.processedText.substring(0, 140) + '...' 
      : response.processedText;
    return `iGemini: ${truncated}\n\nView full: ${getDeepLink()}`;
  };

  const handleSharePreview = async () => {
    const text = getPreviewText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `iGemini ${response.mode}`,
          text: text,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Preview text copied to clipboard (Share API not supported on this browser)');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 animate-in slide-in-from-right-8 duration-300">
      <div className="px-6 py-4 bg-white flex items-center gap-3 sticky top-0 z-10 border-b border-gray-100">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
           <span className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
             {MODE_ICONS[response.mode]}
           </span>
           <span className="font-bold text-gray-800">{response.mode} Result</span>
        </div>
      </div>

      <div className="p-6 flex-1 space-y-6 overflow-y-auto">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Analysis Result</label>
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-[15px]">
            {response.processedText}
          </div>
        </div>

        <div className="bg-gray-100/50 p-4 rounded-2xl border border-dashed border-gray-200">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Original Text</label>
          <p className="text-gray-500 italic text-sm line-clamp-3">
            "{response.originalText}"
          </p>
        </div>
      </div>

      <div className="p-6 bg-white border-t border-gray-100 grid grid-cols-2 gap-3 pb-24">
        <button 
          onClick={handleCopy}
          className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-2xl transition-all border border-gray-100 active:scale-95"
        >
          {copied ? <CheckCircle2 className="w-6 h-6 text-emerald-500 mb-1" /> : <Copy className="w-6 h-6 mb-1" />}
          <span className="text-[11px] font-bold">{copied ? 'Copied!' : 'Copy Text'}</span>
        </button>
        <button 
          onClick={handleSharePreview}
          className="flex flex-col items-center justify-center p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
        >
          <Share2 className="w-6 h-6 mb-1" />
          <span className="text-[11px] font-bold">Share Preview</span>
        </button>
      </div>
    </div>
  );
};

export default Result;
