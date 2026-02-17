import { ReactNode } from 'react';

interface FieldProps {
  label: string;
  hint?: string;
  children: ReactNode;
}

export default function Field({ label, hint, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-normal text-zinc-700">
        {label}
      </label>
      <div>{children}</div>
      {hint && (
        <p className="text-xs text-zinc-500 mt-1">{hint}</p>
      )}
    </div>
  );
}
