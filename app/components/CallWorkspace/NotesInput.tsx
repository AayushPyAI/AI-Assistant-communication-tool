'use client';

import { useState } from 'react';
import { useCallStore } from '@/app/store/callStore';
import { FileText, Send } from 'lucide-react';

export default function NotesInput() {
  const [note, setNote] = useState('');
  const { addNote } = useCallStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (note.trim()) {
      addNote({ content: note.trim() });
      setNote('');
    }
  };

  return (
    <div className="bg-white border border-blue-200/50 rounded-lg p-3 sm:p-4 shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="flex-1 relative">
          <FileText className="absolute left-2.5 sm:left-3 top-2.5 sm:top-3 w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add call notes or context..."
            className="w-full pl-9 sm:pl-10 pr-2.5 sm:pr-3 py-2 sm:py-2.5 text-sm border border-blue-200/50 rounded-lg bg-blue-50/30 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none shadow-sm transition-colors"
            rows={2}
          />
        </div>
        <button
          type="submit"
          className="self-center px-4 cursor-pointer sm:px-5 py-3 sm:py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 text-sm font-medium shadow-sm hover:shadow"
        >
          <Send className="w-4 h-4" />
          <span className="sm:inline">Add</span>
        </button>
      </form>
    </div>
  );
}
