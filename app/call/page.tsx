'use client';

import { useEffect, useRef } from 'react';
import { useCallStore } from '@/app/store/callStore';
import CallHeader from '@/app/components/CallWorkspace/CallHeader';
import LiveTranscript from '@/app/components/CallWorkspace/LiveTranscript';
import NotesInput from '@/app/components/CallWorkspace/NotesInput';
import PromptActions from '@/app/components/CallWorkspace/PromptActions';
import AIResponsePanel from '@/app/components/CallWorkspace/AIResponsePanel';
import ContextPanel from '@/app/components/CallWorkspace/ContextPanel';
import { TranscriptEntry } from '@/app/types/call';

// Pre-defined conversation script
const conversationScript = [
  { speaker: 'client' as const, text: 'Hello, I need help with my account.' },
  { speaker: 'agent' as const, text: 'Hello! I\'d be happy to help you today. What can I assist you with?' },
  { speaker: 'client' as const, text: 'I want to update my billing information.' },
  { speaker: 'agent' as const, text: 'Of course! I can help you update your billing information. What specifically would you like to change?' },
  { speaker: 'client' as const, text: 'I need to change my credit card on file.' },
  { speaker: 'agent' as const, text: 'I can help you with that. For security purposes, I\'ll need to verify your identity first. Can you provide me with the last four digits of your current card?' },
  { speaker: 'client' as const, text: 'Sure, it\'s 4532.' },
  { speaker: 'agent' as const, text: 'Thank you. I\'ve verified your account. Now, what documents do I need to provide for the new card?' },
  { speaker: 'client' as const, text: 'What documents do I need to provide?' },
  { speaker: 'agent' as const, text: 'You\'ll need to provide the new card number, expiration date, CVV, and billing address. You can do this securely through our portal or I can guide you through it now.' },
  { speaker: 'client' as const, text: 'I\'d prefer to do it through the portal. Can you send me a link?' },
  { speaker: 'agent' as const, text: 'Absolutely! I\'ll send you a secure link via email right now. You should receive it within the next few minutes.' },
  { speaker: 'client' as const, text: 'Perfect, thank you so much for your help!' },
  { speaker: 'agent' as const, text: 'You\'re very welcome! Is there anything else I can help you with today?' },
  { speaker: 'client' as const, text: 'No, that\'s all. Have a great day!' },
  { speaker: 'agent' as const, text: 'You too! Thank you for choosing our service.' },
];

// Demo AI Response Generation
const generateDemoAIResponse = (transcript: TranscriptEntry[]): { prompt: string; response: string; context: string[] } => {
  const recentMessages = transcript.slice(-5);
  const context = recentMessages.map(t => t.text);
  
  const conversationText = recentMessages.map(t => `${t.speaker}: ${t.text}`).join(' ');
  
  let prompt = '';
  let response = '';
  
  if (conversationText.toLowerCase().includes('billing') || conversationText.toLowerCase().includes('card')) {
    prompt = 'Summarize the billing conversation';
    response = `The client is requesting to update their billing information, specifically their credit card. They've been verified using the last four digits (4532) and prefer to complete the update through the secure portal. The agent has agreed to send a secure link via email. This is a standard billing update request that should be completed within the next few minutes.`;
  } else if (conversationText.toLowerCase().includes('help') || conversationText.toLowerCase().includes('assist')) {
    prompt = 'Key action items from this conversation';
    response = `1. Verify client identity (completed - last 4 digits: 4532)
2. Send secure portal link for billing update (in progress)
3. Confirm receipt of email link (pending)
4. Follow up if client needs additional assistance (optional)`;
  } else if (conversationText.toLowerCase().includes('document') || conversationText.toLowerCase().includes('provide')) {
    prompt = 'Client concerns and requirements';
    response = `The client needs to update their credit card information. They've asked about required documents and prefer using the secure portal method rather than providing details over the phone. This indicates a security-conscious client who values privacy. The agent should ensure the portal link is sent promptly and is easy to use.`;
  } else {
    prompt = 'Conversation summary';
    response = `The conversation is progressing well. The client has a clear request and the agent is providing helpful guidance. The interaction is professional and solution-oriented. Both parties are working towards completing the billing update efficiently.`;
  }
  
  return { prompt, response, context };
};

export default function CallPage() {
  const { startCall, addTranscriptEntry, addAIResponse, isCallActive, currentSession } = useCallStore();
  const conversationIndexRef = useRef(0);
  const transcriptIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const aiResponseIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isCallActive && !currentSession) {
      startCall('Demo Client');
      conversationIndexRef.current = 0;
    }
  }, [isCallActive, currentSession, startCall]);

  useEffect(() => {
    if (currentSession?.status === 'ended') {
      if (transcriptIntervalRef.current) {
        clearInterval(transcriptIntervalRef.current);
        transcriptIntervalRef.current = null;
      }
      if (aiResponseIntervalRef.current) {
        clearInterval(aiResponseIntervalRef.current);
        aiResponseIntervalRef.current = null;
      }
    }
  }, [currentSession?.status]);
  useEffect(() => {
    if (!currentSession || currentSession.status !== 'active') {
      if (transcriptIntervalRef.current) {
        clearInterval(transcriptIntervalRef.current);
        transcriptIntervalRef.current = null;
      }
      return;
    }
    transcriptIntervalRef.current = setInterval(() => {
      if (conversationIndexRef.current < conversationScript.length) {
        const message = conversationScript[conversationIndexRef.current];
        addTranscriptEntry({ speaker: message.speaker, text: message.text });
        conversationIndexRef.current++;
      } else {
        if (transcriptIntervalRef.current) {
          clearInterval(transcriptIntervalRef.current);
          transcriptIntervalRef.current = null;
        }
      }
    }, 2000);

    return () => {
      if (transcriptIntervalRef.current) {
        clearInterval(transcriptIntervalRef.current);
        transcriptIntervalRef.current = null;
      }
    };
  }, [currentSession?.status, addTranscriptEntry]);

  useEffect(() => {
    if (!currentSession || currentSession.status !== 'active') {
      if (aiResponseIntervalRef.current) {
        clearInterval(aiResponseIntervalRef.current);
        aiResponseIntervalRef.current = null;
      }
      return;
    }

    aiResponseIntervalRef.current = setInterval(() => {
      const { transcript } = useCallStore.getState();
      
      if (transcript.length >= 2) {
        const aiData = generateDemoAIResponse(transcript);
        addAIResponse(aiData);
      }
    }, 15000);

    return () => {
      if (aiResponseIntervalRef.current) {
        clearInterval(aiResponseIntervalRef.current);
        aiResponseIntervalRef.current = null;
      }
    };
  }, [currentSession?.status, addAIResponse]);

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20 overflow-hidden">
      <div className="mx-auto max-w-full bg-white/80 backdrop-blur-sm h-full shadow-sm flex flex-col">
        <CallHeader />
        
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-6 p-3 sm:p-4 lg:p-6 flex-1 min-h-0 overflow-hidden">
          <div className="flex-1 flex flex-col min-w-0 min-h-0">
            <div className="flex-1 mb-3 sm:mb-4 lg:mb-6 min-h-0">
              <LiveTranscript />
            </div>
            <div className="space-y-2 sm:space-y-3 lg:space-y-4 flex-shrink-0">
              <NotesInput />
              <PromptActions />
            </div>
          </div>
          
          <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 flex flex-col gap-3 sm:gap-4 lg:gap-6 min-h-0">
            <div className="flex-1 min-h-0 basis-0">
              <AIResponsePanel />
            </div>
            <div className="flex-1 min-h-0 basis-0">
              <ContextPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
