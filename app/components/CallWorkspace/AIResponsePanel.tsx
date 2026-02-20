'use client';

import { useCallStore } from '@/app/store/callStore';
import { Sparkles, Copy, Check, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// Typewriter hook
function useTypewriter(text: string, speed = 18) {
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);
  const indexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayed('');
    setIsDone(false);
    indexRef.current = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setIsDone(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, speed]);

  return { displayed, isDone };
}

export default function AIResponsePanel() {
  const { aiResponses } = useCallStore();
  const [copied, setCopied] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [hasNewResponse, setHasNewResponse] = useState(false);
  const prevCountRef = useRef(0);

  const latest = aiResponses[aiResponses.length - 1] ?? null;
  const history = aiResponses.slice(0, -1).reverse();

  const { displayed, isDone } = useTypewriter(latest?.response ?? '');

  useEffect(() => {
    if (aiResponses.length > prevCountRef.current && prevCountRef.current !== 0) {
      setHasNewResponse(true);
      const t = setTimeout(() => setHasNewResponse(false), 2000);
      return () => clearTimeout(t);
    }
    prevCountRef.current = aiResponses.length;
  }, [aiResponses.length]);

  const handleCopy = () => {
    if (!latest) return;
    navigator.clipboard.writeText(latest.response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white">

      {/* Header — minimal */}
      <div className="px-8 py-4 border-b border-zinc-100 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-4 h-4 text-zinc-400" />
          <span className="text-sm font-medium text-zinc-700">AI Suggestion</span>
          {latest && (
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border transition-all duration-500 ${
              hasNewResponse
                ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                : 'bg-zinc-50 border-zinc-200 text-zinc-400'
            }`}>
              {hasNewResponse ? '● Updated' : latest.prompt}
            </span>
          )}
        </div>

        {latest && (
          <div className="flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-700 px-3 py-1.5 rounded-md hover:bg-zinc-50 transition-colors"
            >
              {copied
                ? <><Check className="w-3.5 h-3.5 text-emerald-500" /><span className="text-emerald-500">Copied</span></>
                : <><Copy className="w-3.5 h-3.5" /><span>Copy</span></>
              }
            </button>
          </div>
        )}
      </div>

      {/* Main suggestion — teleprompter */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {!latest ? (
          <div className="flex-1 flex flex-col items-center justify-center px-12 text-center">
            <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-zinc-300" />
            </div>
            <p className="text-sm text-zinc-400 font-medium">Waiting for the client to speak</p>
            <p className="text-xs text-zinc-300 mt-1.5">
              A suggestion will appear here automatically
            </p>
          </div>
        ) : (
          <>
            {/* The suggestion text — hero of the UI */}
            <div className="flex-1 px-8 py-8 overflow-y-auto">
              <p className="text-[22px] leading-[1.65] text-zinc-800 font-normal tracking-[-0.01em]">
                {displayed}
                {!isDone && (
                  <span className="inline-block w-0.5 h-5 bg-zinc-400 ml-0.5 align-middle animate-pulse" />
                )}
              </p>
            </div>

            {/* Footer — timestamp + history toggle */}
            <div className="px-8 py-3 border-t border-zinc-100 flex items-center justify-between flex-shrink-0">
              <span className="text-[11px] text-zinc-300">
                {latest.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>

              {history.length > 0 && (
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showHistory ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                  {showHistory ? 'Hide' : `${history.length} previous`}
                </button>
              )}
            </div>

            {/* History drawer — slides up from bottom */}
            {showHistory && (
              <div className="border-t border-zinc-100 max-h-48 overflow-y-auto bg-zinc-50/50">
                {history.map((r, i) => (
                  <div
                    key={r.id}
                    className="px-8 py-3 border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wide">
                          {r.prompt}
                        </span>
                        <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2 leading-relaxed">
                          {r.response}
                        </p>
                      </div>
                      <span className="text-[10px] text-zinc-300 flex-shrink-0 mt-0.5">
                        {r.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}