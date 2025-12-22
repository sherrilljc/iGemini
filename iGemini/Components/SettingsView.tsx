
import React from 'react';
import { clearAllHistory } from '../utils/storage';
import { Trash2, Shield, Info, Smartphone, ChevronRight } from 'lucide-react';

const SettingsView: React.FC = () => {
  const handleClear = () => {
    if (confirm('Are you sure you want to clear all history? This cannot be undone.')) {
      clearAllHistory();
      window.location.reload();
    }
  };

  return (
    <div className="p-6 space-y-8 animate-in slide-in-from-bottom-4">
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">App Configuration</h2>
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
           <div className="p-4 flex items-center justify-between border-b border-gray-50 hover:bg-gray-50 cursor-pointer group">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-gray-800">Auto-Detect Shared Text</p>
                    <p className="text-[11px] text-gray-500">Currently active via Share Sheet</p>
                 </div>
              </div>
              <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
                 <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
           </div>
           
           <div className="p-4 flex items-center justify-between border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-gray-800">Privacy Mode</p>
                    <p className="text-[11px] text-gray-500">No data is stored on our servers</p>
                 </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-300" />
           </div>

           <button 
             onClick={handleClear}
             className="w-full p-4 flex items-center gap-3 hover:bg-red-50 text-red-500 transition-all"
           >
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                 <Trash2 className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold">Clear All Local Data</p>
           </button>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">About iGemini</h2>
        <div className="bg-white rounded-3xl border border-gray-100 p-5 space-y-4 shadow-sm">
           <div className="flex items-start gap-4">
              <div className="p-3 bg-gray-50 rounded-2xl">
                 <Info className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-2">
                 <p className="text-xs text-gray-600 leading-relaxed">
                   iGemini is a mobile-first AI workflow tool designed for speed and simplicity. 
                   We leverage the Gemini API to provide instant analysis of shared text content.
                 </p>
                 <p className="text-[10px] text-gray-400">Version 1.0.2 (Beta)</p>
              </div>
           </div>
        </div>
      </div>
      
      <div className="mt-auto pt-8 flex justify-center opacity-40">
        <div className="flex items-center gap-1.5 grayscale">
          <span className="text-xs font-medium">Powered by</span>
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" alt="Gemini" className="h-4" />
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
