'use client';

import { Bell, Key, Zap, User } from 'lucide-react';
import SettingsSection from '@/app/components/Settings/SettingsSection';
import Field from '@/app/components/Settings/Field';
import Toggle from '@/app/components/Settings/Toggle';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-xl sm:text-2xl font-semibold text-zinc-900 mb-2 tracking-tight">
            Settings
          </h1>
          <p className="text-sm sm:text-base text-zinc-600">
            Manage your assistant preferences
          </p>
        </header>

        <div className="space-y-4 sm:space-y-6 max-w-4xl">
          <SettingsSection
            icon={Zap}
            title="AI Behavior"
            description="Control how responses are generated and structured"
          >
            <Field label="Response Style">
              <select className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-zinc-400 transition-all shadow-sm">
                <option>Professional</option>
                <option>Neutral</option>
                <option>Technical</option>
                <option>Casual</option>
              </select>
            </Field>

            <Field label="Response Length">
              <select className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-zinc-400 transition-all shadow-sm">
                <option>Balanced</option>
                <option>Concise</option>
                <option>Detailed</option>
              </select>
            </Field>

            <Field
              label="Context Window"
              hint="Number of recent messages included when generating replies (1-50)"
            >
              <input
                type="number"
                defaultValue={10}
                min={1}
                max={50}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-zinc-400 transition-all shadow-sm"
              />
            </Field>
          </SettingsSection>

          <SettingsSection
            icon={Bell}
            title="Notifications"
            description="Choose when the assistant should notify you"
          >
            <Toggle
              label="Real-time notifications"
              defaultChecked={true}
              description="Get notified immediately when new responses are generated"
            />
            <Toggle
              label="Sound alerts"
              defaultChecked={false}
              description="Play a sound when important events occur"
            />
            <Toggle
              label="Desktop notifications"
              defaultChecked={true}
              description="Show browser notifications for important updates"
            />
          </SettingsSection>

          <SettingsSection
            icon={Key}
            title="API Configuration"
            description="Secure access to external AI services"
          >
            <Field
              label="API Key"
              hint="Stored securely and never exposed on the client. Your API key is encrypted."
            >
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your API key"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 pr-12 text-sm border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-zinc-400 transition-all shadow-sm"
                />
                <button
                  type="button"
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-600 hover:text-zinc-900 font-medium"
                >
                  Show
                </button>
              </div>
            </Field>

            <Field label="API Endpoint">
              <input
                type="url"
                placeholder="https://api.example.com/v1"
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-zinc-400 transition-all shadow-sm"
              />
            </Field>

            <div className="pt-2">
              <button className="px-3 sm:px-4 py-2 text-sm border border-zinc-300 rounded-lg text-zinc-700 hover:bg-zinc-50 transition-all shadow-sm hover:shadow">
                Test Connection
              </button>
            </div>
          </SettingsSection>

          <SettingsSection
            icon={User}
            title="Preferences"
            description="Personalize your experience"
          >
            <Field label="Theme">
              <select className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-zinc-400 transition-all shadow-sm">
                <option>System</option>
                <option>Light</option>
                <option>Dark</option>
              </select>
            </Field>

            <Field
              label="Auto-save Interval"
              hint="How often to automatically save your work (in seconds)"
            >
              <input
                type="number"
                defaultValue={30}
                min={5}
                max={300}
                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border border-zinc-300 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-zinc-400 transition-all shadow-sm"
              />
            </Field>
          </SettingsSection>
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 flex justify-end">
          <button className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-all shadow-sm hover:shadow">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
