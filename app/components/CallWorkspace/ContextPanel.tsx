'use client';

import { useCallStore } from '@/app/store/callStore';
import { FileText, MessageSquare, Clock } from 'lucide-react';

export default function ContextPanel() {
  const { notes, transcript } = useCallStore();

  const recentNotes = notes.slice(-5).reverse();
  const recentTranscript = transcript.slice(-5).reverse();

  return (
    <div className="flex flex-col h-full bg-white border border-zinc-200 rounded-lg shadow-sm">
      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-zinc-200 bg-zinc-50/50">
        <h3 className="text-xs sm:text-sm font-semibold text-zinc-900">Context & History</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 sm:space-y-5 bg-zinc-50/30">
        <div>           
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-zinc-100 flex items-center justify-center">
              <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-700" />
            </div>
            <h4 className="text-[10px] sm:text-xs font-semibold text-zinc-700 uppercase tracking-wide">Recent Notes</h4>
          </div>
          {recentNotes.length === 0 ? (
            <p className="text-[10px] sm:text-xs text-zinc-500 ml-7 sm:ml-8">No notes yet</p>
          ) : (
            <div className="space-y-1.5 sm:space-y-2">
              {recentNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-2 sm:p-3 bg-white rounded-lg border border-zinc-200 shadow-sm hover:shadow transition-shadow"
                >
                  <p className="text-[10px] sm:text-xs text-zinc-900 leading-relaxed">
                    {note.content}
                  </p>
                  <p className="text-[10px] sm:text-xs text-zinc-400 mt-1.5 sm:mt-2 flex items-center gap-1 sm:gap-1.5">
                    <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    {note.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-zinc-100 flex items-center justify-center">
              <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-700" />
            </div>
            <h4 className="text-[10px] sm:text-xs font-semibold text-zinc-700 uppercase tracking-wide">Recent Conversation</h4>
          </div>
          {recentTranscript.length === 0 ? (
            <p className="text-[10px] sm:text-xs text-zinc-500 ml-7 sm:ml-8">No transcript yet</p>
          ) : (
            <div className="space-y-1.5 sm:space-y-2">
              {recentTranscript.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-2 sm:p-2.5 rounded-lg text-[10px] sm:text-xs border shadow-sm ${
                    entry.speaker === 'client'
                      ? 'bg-white border-zinc-200'
                      : 'bg-zinc-100 border-zinc-200'
                  }`}
                >
                  <p className="font-semibold mb-0.5 sm:mb-1 text-zinc-700 uppercase tracking-wide text-[9px] sm:text-[10px]">
                    {entry.speaker === 'client' ? 'Client' : 'Agent'}
                  </p>
                  <p className="text-zinc-600 leading-relaxed">
                    {entry.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
