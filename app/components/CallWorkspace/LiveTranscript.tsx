'use client';

import { useCallStore } from '@/app/store/callStore';
import { User, Mic } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function LiveTranscript() {
  const { transcript } = useCallStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  return (
    <div className="flex flex-col h-full bg-white border border-blue-200/50 rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-blue-200/50 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border border-blue-200/50">
          <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
        </div>
        <h3 className="text-xs sm:text-sm font-semibold text-zinc-900">Live Transcript</h3>
      </div>
      
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4 bg-gradient-to-b from-blue-50/20 to-indigo-50/10 min-h-0"
      >
        {transcript.length === 0 ? (
          <div className="text-center text-zinc-500 py-12 sm:py-16">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-blue-200/50">
              <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>
            <p className="text-xs sm:text-sm font-medium">Waiting for transcript...</p>
            <p className="text-xs text-zinc-400 mt-1">Transcript will appear here once the call starts</p>
          </div>
        ) : (
          transcript.map((entry) => (
            <div
              key={entry.id}
              className={`flex gap-2 sm:gap-3 ${
                entry.speaker === 'client' ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div
                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                  entry.speaker === 'client'
                    ? 'bg-white border border-blue-200/50 text-blue-700'
                    : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white'
                }`}
              >
                <User className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
              </div>
              <div
                className={`flex-1 rounded-lg p-3 sm:p-4 max-w-[85%] sm:max-w-[80%] shadow-sm ${
                  entry.speaker === 'client'
                    ? 'bg-white border border-blue-200/50 text-left'
                    : 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-right'
                }`}
              >
                <p className="text-[10px] sm:text-xs font-semibold mb-1.5 sm:mb-2 opacity-80 uppercase tracking-wide">
                  {entry.speaker === 'client' ? 'Client' : 'You'}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed mb-1.5 sm:mb-2">{entry.text}</p>
                <p className="text-[10px] sm:text-xs opacity-60">
                  {entry.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
