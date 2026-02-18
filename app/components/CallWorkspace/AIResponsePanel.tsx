'use client';

import { useCallStore } from '@/app/store/callStore';
import { Sparkles, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function AIResponsePanel() {
  const { aiResponses } = useCallStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-white border border-zinc-200 rounded-lg shadow-sm overflow-hidden">
      <div className="px-3 sm:px-4 lg:px-5 py-2 sm:py-3 lg:py-4 border-b border-zinc-200 bg-zinc-50/50 flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
        <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-lg bg-zinc-100 flex items-center justify-center">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-zinc-700" />
        </div>
        <h3 className="text-xs sm:text-sm font-semibold text-zinc-900">AI Responses</h3>
        {aiResponses.length > 0 && (
          <span className="ml-auto px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-zinc-200 text-zinc-700 rounded-full">
            {aiResponses.length}
          </span>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 sm:p-3 lg:p-4 space-y-2 sm:space-y-3 bg-zinc-50/30 min-h-0">
        {aiResponses.length === 0 ? (
          <div className="text-center text-zinc-500 py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-400" />
            </div>
            <p className="text-xs sm:text-sm font-medium">No AI responses yet</p>
            <p className="text-[10px] sm:text-xs text-zinc-400 mt-1">Use prompts to generate insights</p>
          </div>
        ) : (
          aiResponses.map((response) => (
            <div
              key={response.id}
              className="border border-zinc-200 rounded-lg p-3 sm:p-4 bg-white shadow-sm hover:shadow transition-shadow"
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-xs font-semibold text-zinc-700 mb-1 sm:mb-1.5 uppercase tracking-wide">
                    Prompt:
                  </p>
                  <p className="text-[10px] sm:text-xs text-zinc-600 italic mb-2 sm:mb-3 leading-relaxed truncate">
                    "{response.prompt}"
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(response.id, response.response)}
                  className="p-1 sm:p-1.5 hover:bg-zinc-100 rounded-md transition-colors flex-shrink-0 ml-2"
                  title="Copy response"
                >
                  {copiedId === response.id ? (
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600" />
                  ) : (
                    <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-500" />
                  )}
                </button>
              </div>
              
              <div className="mb-2 sm:mb-3">
                <p className="text-[10px] sm:text-xs font-semibold text-zinc-700 mb-1 sm:mb-2 uppercase tracking-wide">
                  Response:
                </p>
                <p className="text-xs sm:text-sm text-zinc-900 whitespace-pre-wrap leading-relaxed">
                  {response.response}
                </p>
              </div>
              
              {response.context && response.context.length > 0 && (
                <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-zinc-200">
                  <p className="text-[10px] sm:text-xs text-zinc-500 mb-1 sm:mb-2 font-medium">Context:</p>
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {response.context.map((ctx, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-zinc-100 rounded-md text-zinc-600 border border-zinc-200"
                      >
                        {ctx.substring(0, 20)}...
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="text-[10px] sm:text-xs text-zinc-400 mt-2 sm:mt-3">
                {response.timestamp.toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
