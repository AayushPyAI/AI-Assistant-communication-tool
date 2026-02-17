'use client';

import { useEffect } from 'react';
import { useCallStore } from '@/app/store/callStore';
import CallHeader from '@/app/components/CallWorkspace/CallHeader';
import LiveTranscript from '@/app/components/CallWorkspace/LiveTranscript';
import NotesInput from '@/app/components/CallWorkspace/NotesInput';
import PromptActions from '@/app/components/CallWorkspace/PromptActions';
import AIResponsePanel from '@/app/components/CallWorkspace/AIResponsePanel';
import ContextPanel from '@/app/components/CallWorkspace/ContextPanel';

export default function CallPage() {
  const { startCall, addTranscriptEntry, isCallActive } = useCallStore();

  useEffect(() => {
    if (!isCallActive) {
      startCall('Demo Client');
      
      const interval = setInterval(() => {
        const speakers: ('client' | 'agent')[] = ['client', 'agent'];
        const messages = [
          'Hello, I need help with my account.',
          'Of course, I can help you with that.',
          'I want to update my billing information.',
          'I can assist you with updating your billing information.',
          'What documents do I need to provide?',
          'You will need a valid ID and proof of address.',
          'Thank you for your help.',
          'You are welcome. Is there anything else I can help with?',
        ];
        
        const speaker = speakers[Math.floor(Math.random() * speakers.length)];
        const message = messages[Math.floor(Math.random() * messages.length)];
        
        addTranscriptEntry({ speaker, text: message });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isCallActive, startCall, addTranscriptEntry]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20">
      <div className="mx-auto max-w-full bg-white/80 backdrop-blur-sm min-h-screen shadow-sm">
        <CallHeader />
        
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 sm:p-6">
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 mb-4 lg:mb-6">
              <LiveTranscript />
            </div>
            <div className="space-y-3 sm:space-y-4">
              <NotesInput />
              <PromptActions />
            </div>
          </div>
          
          <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-4 lg:gap-6">
            <div className="flex-1 min-h-0 lg:min-h-[400px]">
              <AIResponsePanel />
            </div>
            <div className="h-64 sm:h-80">
              <ContextPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
