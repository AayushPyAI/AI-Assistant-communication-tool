'use client';

import { useCallStore } from '@/app/store/callStore';
import { PhoneOff, Pause, Play, Circle } from 'lucide-react';

export default function CallHeader() {
  const { currentSession, isCallActive, pauseCall, resumeCall, endCall } = useCallStore();

  if (!currentSession) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200/50 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
        <p className="text-sm text-zinc-600">No active call</p>
      </div>
    );
  }

  return (
    <header className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200/50 px-4 sm:px-6 py-3 sm:py-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-300/50 flex items-center justify-center">
              <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="currentColor" />
            </div>
            {currentSession.status === 'active' && (
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-base font-semibold text-zinc-900 truncate">{currentSession.clientName}</h2>
            <p className="text-xs text-blue-600/70 mt-0.5">
              Started {currentSession.startTime.toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {currentSession.status === 'active' ? (
            <button
              onClick={pauseCall}
              className="p-2 sm:p-2.5 rounded-lg border cursor-pointer border-blue-300/50 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all shadow-sm"
              title="Pause call"
            >
              <Pause className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={resumeCall}
              className="p-2 sm:p-2.5 rounded-lg border cursor-pointer border-blue-300/50 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-400 transition-all shadow-sm"
              title="Resume call"
            >
              <Play className="w-4 h-4" />
            </button>
          )}
          
          <button
            onClick={endCall}
            className="p-2 sm:p-2.5 rounded-lg bg-red-600 cursor-pointer text-white hover:bg-red-700 transition-all shadow-sm hover:shadow"
            title="End call"
          >
            <PhoneOff className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
