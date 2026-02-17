'use client';

import { useState } from 'react';

interface ToggleProps {
  label: string;
  defaultChecked?: boolean;
  description?: string;
}

export default function Toggle({ label, defaultChecked = false, description }: ToggleProps) {
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div className="flex items-start justify-between py-1">
      <div className="flex-1 pr-4">
        <label className="block text-sm font-normal text-zinc-700 cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-xs text-zinc-500 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked(!checked)}
        className={`
          relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border border-transparent
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-zinc-400 focus:ring-offset-1
          ${checked ? 'bg-zinc-900' : 'bg-zinc-400'}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm
            transition duration-200 ease-in-out
            ${checked ? 'translate-x-4' : 'translate-x-0.5'}
          `}
        />
      </button>
    </div>
  );
}
