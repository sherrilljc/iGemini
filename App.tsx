
import React, { useState, useEffect } from 'react';
import { ViewState, Mode, GeminiResponse } from './types';
import { NAV_ITEMS } from './constants';
import Compose from './components/Compose';
import Result from './components/Result';
import HistoryView from './components/HistoryView';
import SettingsView from './components/SettingsView';
import ReaderView from './components/ReaderView';
import { getResponseById } from './utils/storage';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('compose');
  const [activeResponse, setActiveResponse] = useState<GeminiResponse | null>(null);
  const [sharedText, setSharedText] = useState('');

  useEffect(() => {
    const handleIncomingData = () => {
      // 1. Check URL Parameters (Web Share Target API)
      const params = new URLSearchParams(window.location.search);
      const textParam = params.get('text') || params.get('title') || params.get('url');
      
      if (textParam) {
        setSharedText(textParam);
        setCurrentView('compose');
        // Clean URL to prevent re-processing on refresh
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }

      // 2. Check Hash Routing (Deep Links)
      const hash = window.location.hash;
      if (hash.startsWith('#/view/')) {
        const id = hash.replace('#/view/', '');
        const response = getResponseById(id);
        if (response) {
          setActiveResponse(response);
          setCurrentView('viewer');
        }
      } else if (hash.startsWith('#/share/')) {
        const text = decodeURIComponent(hash.replace('#/share/', ''));
        setSharedText(text);
        setCurrentView('compose');
      }
    };

    handleIncomingData();
    window.addEventListener('hashchange', handleIncomingData);
    return () => window.removeEventListener('hashchange', handleIncomingData);
  }, []);

  const navigateTo = (view: ViewState, response?: GeminiResponse) => {
    if (response) setActiveResponse(response);
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'compose':
        return <Compose onGenerated={(res) => navigateTo('result', res)} initialText={sharedText} clearInitial={() => setSharedText('')} />;
      case 'result':
        return activeResponse ? <Result response={activeResponse} onBack={() => setCurrentView('compose')} /> : <Compose onGenerated={(res) => navigateTo('result', res)} />;
      case 'history':
        return <HistoryView onSelect={(res) => navigateTo('viewer', res)} />;
      case 'settings':
        return <SettingsView />;
      case 'viewer':
        return activeResponse ? <ReaderView response={activeResponse} onBack={() => setCurrentView('history')} /> : <HistoryView onSelect={(res) => navigateTo('viewer', res)} />;
      default:
        return <Compose onGenerated={(res) => navigateTo('result', res)} />;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden">
      {/* App Header */}
      <header className="px-6 py-4 border-b bg-white/80 backdrop-blur-md flex justify-between items-center sticky top-0 z-20 safe-area-top">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold italic">
            iG
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">iGemini</h1>
        </div>
        {currentView === 'compose' && (
          <div className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wider">
            Prototype
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 bg-gray-50">
        {renderView()}
      </main>

      {/* Persistent Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-xl border-t border-gray-100 flex justify-around items-center px-4 py-3 safe-area-bottom z-50">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id as ViewState)}
            className={`flex flex-col items-center gap-1 transition-all ${
              currentView === item.id || 
              (currentView === 'result' && item.id === 'compose') || 
              (currentView === 'viewer' && item.id === 'history')
                ? 'text-emerald-500 transform scale-110 font-semibold'
                : 'text-gray-400'
            }`}
          >
            {item.icon}
            <span className="text-[10px]">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
