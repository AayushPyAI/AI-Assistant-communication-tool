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

const conversationScript = [
  { speaker: 'client' as const, text: 'Hello, I need help with my account.' },
  { speaker: 'agent' as const, text: "Hello! I'd be happy to help you today. What can I assist you with?" },
  { speaker: 'client' as const, text: 'I want to update my billing information.' },
  { speaker: 'agent' as const, text: 'Of course! I can help you update your billing information. What specifically would you like to change?' },
  { speaker: 'client' as const, text: 'I need to change my credit card on file.' },
  { speaker: 'agent' as const, text: "I can help you with that. For security purposes, I'll need to verify your identity first. Can you provide me with the last four digits of your current card?" },
  { speaker: 'client' as const, text: "Sure, it's 4532." },
  { speaker: 'agent' as const, text: "Thank you. I've verified your account. How can I help with the new card?" },
  { speaker: 'client' as const, text: 'What documents do I need to provide?' },
  { speaker: 'agent' as const, text: "You'll need the new card number, expiration date, CVV, and billing address. You can do this securely through our portal or I can guide you through it now." },
  { speaker: 'client' as const, text: "I'd prefer to do it through the portal. Can you send me a link?" },
  { speaker: 'agent' as const, text: "Absolutely! I'll send you a secure link via email right now. You should receive it within a few minutes." },
  { speaker: 'client' as const, text: 'Perfect, thank you so much for your help!' },
  { speaker: 'agent' as const, text: "You're very welcome! Is there anything else I can help you with today?" },
  { speaker: 'client' as const, text: "No, that's all. Have a great day!" },
  { speaker: 'agent' as const, text: 'You too! Thank you for choosing our service.' },
];

const generateDemoAIResponse = (transcript: TranscriptEntry[]): { prompt: string; response: string; context: string[] } => {
  const recentMessages = transcript.slice(-6);
  const context = recentMessages.map(t => t.text);
  const conversationText = recentMessages.map(t => `${t.speaker}: ${t.text}`).join(' ').toLowerCase();

  let prompt = '';
  let response = '';

  if (conversationText.includes('great day') || conversationText.includes("that's all")) {
    prompt = 'Closing';
    response = "Wrap up warmly. Recap what was done: billing update initiated, secure link sent to their email. Let them know the update will reflect within 24 hours. Wish them a great day and invite them to reach out anytime.";
  } else if (conversationText.includes('link') || conversationText.includes('portal')) {
    prompt = 'Portal link request';
    response = "Send the secure portal link to their registered email now. Let them know the link expires in 24 hours and they should complete the update in one session. Offer to stay on the line while they do it.";
  } else if (conversationText.includes('document') || conversationText.includes('provide')) {
    prompt = 'Document inquiry';
    response = "They only need: new card number, expiration date, CVV, and billing address. Recommend the portal over verbal — it's more secure and they'll get a confirmation receipt automatically.";
  } else if (conversationText.includes('4532') || conversationText.includes('verif')) {
    prompt = 'Identity verified';
    response = "Identity confirmed. Proceed with the billing update. Ask them whether they'd prefer to update through the secure portal or walk through it together on the call right now.";
  } else if (conversationText.includes('credit card') || conversationText.includes('change my')) {
    prompt = 'Card update request';
    response = "Before making any changes, verify their identity — ask for the last four digits of the card currently on file. Do not proceed until verification is confirmed.";
  } else if (conversationText.includes('billing')) {
    prompt = 'Billing topic detected';
    response = "Ask them specifically what they'd like to update — card number, billing address, or payment method. Getting clarity now will save back-and-forth later.";
  } else if (conversationText.includes('help') || conversationText.includes('account')) {
    prompt = 'Opening';
    response = "Greet them and ask one clear open-ended question: what brings them in today? Let them fully explain before jumping to solutions. Listen for keywords: billing, access, account, or technical issue.";
  } else {
    prompt = 'Listening...';
    response = "Stay attentive. Let the client finish speaking before responding. Ask one focused follow-up question to understand the core issue before taking any action.";
  }

  return { prompt, response, context };
};

export default function CallPage() {
  const { startCall, addTranscriptEntry, addAIResponse, isCallActive, currentSession } = useCallStore();
  const conversationIndexRef = useRef(0);
  const transcriptIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const aiDebounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isCallActive && !currentSession) {
      startCall('Demo Client');
      conversationIndexRef.current = 0;
    }
  }, [isCallActive, currentSession, startCall]);

  useEffect(() => {
    if (currentSession?.status === 'ended') {
      if (transcriptIntervalRef.current) clearInterval(transcriptIntervalRef.current);
      if (aiDebounceRef.current) clearTimeout(aiDebounceRef.current);
    }
  }, [currentSession?.status]);

  useEffect(() => {
    if (!currentSession || currentSession.status !== 'active') {
      if (transcriptIntervalRef.current) clearInterval(transcriptIntervalRef.current);
      return;
    }

    transcriptIntervalRef.current = setInterval(() => {
      if (conversationIndexRef.current < conversationScript.length) {
        const message = conversationScript[conversationIndexRef.current];
        addTranscriptEntry({ speaker: message.speaker, text: message.text });

        // Only trigger AI after client speaks
        if (message.speaker === 'client') {
          if (aiDebounceRef.current) clearTimeout(aiDebounceRef.current);
          aiDebounceRef.current = setTimeout(() => {
            const { transcript } = useCallStore.getState();
            if (transcript.length >= 1) {
              const aiData = generateDemoAIResponse(transcript);
              addAIResponse(aiData);
            }
          }, 2000);
        }

        conversationIndexRef.current++;
      } else {
        if (transcriptIntervalRef.current) clearInterval(transcriptIntervalRef.current);
      }
    }, 3500);

    return () => {
      if (transcriptIntervalRef.current) clearInterval(transcriptIntervalRef.current);
      if (aiDebounceRef.current) clearTimeout(aiDebounceRef.current);
    };
  }, [currentSession?.status, addTranscriptEntry, addAIResponse]);

  return (
    <div className="h-screen bg-white overflow-hidden">
      <div className="h-full flex flex-col">
        <CallHeader />

        <div className="flex gap-0 flex-1 min-h-0 overflow-hidden divide-x divide-zinc-100">

          {/* LEFT — Live Transcript */}
          <div className="w-64 xl:w-72 flex-shrink-0 flex flex-col min-h-0">
            <div className="flex-1 min-h-0">
              <LiveTranscript />
            </div>
            <div className="flex-shrink-0 border-t border-zinc-100">
              <NotesInput />
            </div>
          </div>

          {/* CENTER — AI Suggestion (dominant) */}
          <div className="flex-1 min-w-0 min-h-0">
            <AIResponsePanel />
          </div>

          {/* RIGHT — Context + Actions */}
          <div className="w-56 xl:w-64 flex-shrink-0 flex flex-col min-h-0 divide-y divide-zinc-100">
            <div className="flex-1 min-h-0">
              <ContextPanel />
            </div>
            <div className="flex-shrink-0">
              <PromptActions />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}