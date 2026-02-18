'use client';

import { useEffect } from 'react';
import { useCallStore } from '@/app/store/callStore';
import { PhoneOff, Pause, Play, Circle } from 'lucide-react';

export default function CallHeader() {
  const { currentSession, isCallActive, pauseCall, resumeCall, endCall, callDuration, incrementDuration } = useCallStore();

  useEffect(() => {
    if (!currentSession || currentSession.status !== 'active') return;
    
    const interval = setInterval(() => {
      incrementDuration();
    }, 1000);
    
    return () => clearInterval(interval);
  }, [currentSession?.status, incrementDuration]);

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentSession) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200/50 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
        <p className="text-sm text-zinc-600">No active call</p>
      </div>
    );
  }

  return (
    <header className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200/50 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 shadow-sm flex-shrink-0">
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-300/50 flex items-center justify-center">
              <Circle className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 text-blue-600" fill="currentColor" />
            </div>
            {currentSession.status === 'active' && (
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xs sm:text-sm lg:text-base font-semibold text-zinc-900 truncate">{currentSession.clientName}</h2>
            <p className="text-[10px] sm:text-xs text-blue-600/70 mt-0.5 break-words">
              <span className="hidden sm:inline">Started {currentSession.startTime.toLocaleTimeString()} • </span>
              <span>Duration: {formatDuration(callDuration)}</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 flex-shrink-0">
          {currentSession.status === 'active' ? (
            <button
              onClick={pauseCall}
              className="p-1.5 sm:p-2 lg:p-2.5 rounded-lg border cursor-pointer border-blue-300/50 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all shadow-sm"
              title="Pause call"
            >
              <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          ) : (
            <button
              onClick={resumeCall}
              className="p-1.5 sm:p-2 lg:p-2.5 rounded-lg border cursor-pointer border-blue-300/50 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all shadow-sm"
              title="Resume call"
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}
          
          <button
            onClick={endCall}
            className="p-1.5 sm:p-2 lg:p-2.5 rounded-lg bg-red-600 cursor-pointer text-white hover:bg-red-700 transition-all shadow-sm hover:shadow"
            title="End call"
          >
            <PhoneOff className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
