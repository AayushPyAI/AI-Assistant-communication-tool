import { create } from 'zustand';
import { CallSession, TranscriptEntry, AIResponse, CallNote } from '@/app/types/call';

interface CallStore {
  currentSession: CallSession | null;
  isCallActive: boolean;
  callDuration: number; 
  
  transcript: TranscriptEntry[];
  addTranscriptEntry: (entry: Omit<TranscriptEntry, 'id' | 'timestamp'>) => void;
  
  aiResponses: AIResponse[];
  addAIResponse: (response: Omit<AIResponse, 'id' | 'timestamp'>) => void;
  
  notes: CallNote[];
  addNote: (note: Omit<CallNote, 'id' | 'timestamp'>) => void;
  
  startCall: (clientName: string) => void;
  endCall: () => void;
  pauseCall: () => void;
  resumeCall: () => void;
  incrementDuration: () => void;
  
  selectedPanel: 'transcript' | 'notes' | 'responses';
  setSelectedPanel: (panel: 'transcript' | 'notes' | 'responses') => void;
}

export const useCallStore = create<CallStore>((set) => ({
  currentSession: null,
  isCallActive: false,
  callDuration: 0,
  transcript: [],
  aiResponses: [],
  notes: [],
  selectedPanel: 'transcript',
  
  addTranscriptEntry: (entry) => set((state) => ({
    transcript: [...state.transcript, {
      ...entry,
      id: `transcript-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    }],
  })),
  
  addAIResponse: (response) => set((state) => ({
    aiResponses: [...state.aiResponses, {
      ...response,
      id: `response-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    }],
  })),
  
  addNote: (note) => set((state) => ({
    notes: [...state.notes, {
      ...note,
      id: `note-${Date.now()}-${Math.random()}`,
      timestamp: new Date(),
    }],
  })),
  
  startCall: (clientName) => set({
    currentSession: {
      id: `call-${Date.now()}`,
      clientName,
      startTime: new Date(),
      status: 'active',
    },
    isCallActive: true,
    callDuration: 0,
    transcript: [],
    aiResponses: [],
    notes: [],
  }),
  
  endCall: () => set((state) => ({
    currentSession: state.currentSession ? {
      ...state.currentSession,
      status: 'ended',
    } : null,
    isCallActive: false,
  })),
  
  pauseCall: () => set((state) => ({
    currentSession: state.currentSession ? {
      ...state.currentSession,
      status: 'paused',
    } : null,
  })),
  
  resumeCall: () => set((state) => ({
    currentSession: state.currentSession ? {
      ...state.currentSession,
      status: 'active',
    } : null,
    isCallActive: true,
  })),
  
  incrementDuration: () => set((state) => ({
    callDuration: state.callDuration + 1,
  })),
  
  setSelectedPanel: (panel) => set({ selectedPanel: panel }),
}));
