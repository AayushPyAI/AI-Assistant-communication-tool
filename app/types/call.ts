export interface CallSession {
  id: string;
  clientName: string;
  startTime: Date;
  status: 'active' | 'paused' | 'ended';
}

export interface TranscriptEntry {
  id: string;
  timestamp: Date;
  speaker: 'client' | 'agent';
  text: string;
}

export interface AIResponse {
  id: string;
  timestamp: Date;
  prompt: string;
  response: string;
  context?: string[];
  confidence?: number;
}

export interface CallNote {
  id: string;
  timestamp: Date;
  content: string;
  tags?: string[];
}
