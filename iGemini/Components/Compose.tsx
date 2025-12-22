
import React, { useState, useEffect } from 'react';
import { Mode, GeminiResponse } from '../types';
import { MODE_ICONS } from '../constants';
import { generateGeminiResponse } from '../services/geminiService';
import { saveResponse } from '../utils/storage';
import { Loader2, Send, AlertCircle } from 'lucide-react';

interface ComposeProps {
  onGenerated: (response: GeminiResponse) => void;
  initialText?: string;
  clearInitial?: () => void;
}

const Compose: React.FC<ComposeProps> = ({ onGenerated, initialText, clearInitial }) => {
  const [text, setText] = useState('');
  const [mode, setMode] = useState<Mode>(Mode.ANALYSIS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialText) {
      setText(initialText);
      if (clearInitial) clearInitial();
    }
  }, [initialText, clearInitial]);

  const handleGenerate = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const resultText = await generateGeminiResponse(text, mode);
      const newResponse: GeminiResponse = {
        id: crypto.randomUUID(),
        originalText: text,
        processedText: resultText,
        mode: mode,
        timestamp: Date.now()
      };
      saveResponse(newResponse);
      onGenerated(newResponse);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMockShare = () => {
    const mockStrings = [
      "Check out this cool new React framework that just dropped!",
      "I think the earth is flat because I can't see the curve.",
      "The new AI model from Google is actually insane."
    ];
    setText(mockStrings[Math.floor(Math.random() * mockStrings.length)]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Source Text</label>
        <div className="relative group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste text here to analyze, roast, or fact-check..."
            className="w-full h-48 p-4 rounded-2xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none text-gray-700 leading-relaxed"
          />
          {text && (
             <button 
                onClick={() => setText('')}
                className="absolute top-3 right-3 text-gray-300 hover:text-gray-500 text-sm font-medium"
             >
                Clear
             </button>
          )}
        </div>
        {!text && (
          <button 
            onClick={handleMockShare}
            className="text-xs text-emerald-600 hover:underline font-medium px-1"
          >
            Try a sample text (Mock Share)
          </button>
        )}
      </div>

      <div className="space-y-3">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Processing Mode</label>
        <div className="grid grid-cols-3 gap-3">
          {(Object.values(Mode) as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all border-2 ${
                mode === m 
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-md' 
                  : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200 shadow-sm'
              }`}
            >
              <div className={`p-2 rounded-lg mb-1 ${mode === m ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                {MODE_ICONS[m]}
              </div>
              <span className="text-[11px] font-bold">{m}</span>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-700 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={isLoading || !text.trim()}
        className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 disabled:cursor-not-allowed text-white font-bold shadow-lg shadow-emerald-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing with Gemini...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Generate Response</span>
          </>
        )}
      </button>

      <p className="text-[10px] text-center text-gray-400 px-8">
        By tapping generate, you agree that this text will be sent to Google Gemini for processing.
      </p>
    </div>
  );
};

export default Compose;
