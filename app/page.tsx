'use client';

import Link from 'next/link';
import { Phone, Settings, History, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20 px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12 md:mb-16 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-zinc-900 mb-2 sm:mb-3 tracking-tight">
            AI Communication Assistant
          </h1>
          <p className="text-sm sm:text-base text-blue-600/70">
            Real-time AI support for client conversations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12 md:mb-16">
          <ActionCard
            href="/call"
            icon={Phone}
            title="Start Call"
            description="Begin a live call with AI assistance"
          />
          <ActionCard
            href="/history"
            icon={History}
            title="Call History"
            description="Review past calls and AI insights"
          />
          <ActionCard
            href="/settings"
            icon={Settings}
            title="Settings"
            description="Manage preferences and configuration"
          />
        </div>

        <div className="bg-white border border-blue-200/50 rounded-lg p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4 sm:mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border border-blue-200/50">
              <Sparkles className="h-4 w-4 text-blue-600" />
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-zinc-900">
              Capabilities
            </h2>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 sm:gap-y-3 text-sm text-zinc-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-0.5 text-lg leading-none">•</span>
              <span className="leading-relaxed">Real-time transcript capture</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-0.5 text-lg leading-none">•</span>
              <span className="leading-relaxed">Context-aware AI responses</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-0.5 text-lg leading-none">•</span>
              <span className="leading-relaxed">Live notes and annotations</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-0.5 text-lg leading-none">•</span>
              <span className="leading-relaxed">Structured reply suggestions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-0.5 text-lg leading-none">•</span>
              <span className="leading-relaxed">Call history and analytics</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-500 mt-0.5 text-lg leading-none">•</span>
              <span className="leading-relaxed">Customizable AI behavior</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ActionCard({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group block bg-white border border-blue-200/50 rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200 flex items-center justify-center transition-colors border border-blue-200/50">
          <Icon className="h-5 w-5 text-blue-600 group-hover:text-blue-700" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-zinc-900 mb-1 sm:mb-1.5 group-hover:text-blue-700 transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
