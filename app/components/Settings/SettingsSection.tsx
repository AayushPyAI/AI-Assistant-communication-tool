import { ReactNode, ElementType } from 'react';

interface SettingsSectionProps {
  icon: ElementType;
  title: string;
  description: string;
  children: ReactNode;
}

export default function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
}: SettingsSectionProps) {
  return (
    <section className="bg-white border border-zinc-200 rounded-lg p-6 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-lg bg-zinc-100 flex items-center justify-center">
            <Icon className="h-4.5 w-4.5 text-zinc-700" />
          </div>
          <h2 className="text-base font-semibold text-zinc-900">
            {title}
          </h2>
        </div>
        <p className="text-sm text-zinc-600 ml-12">
          {description}
        </p>
      </div>

      <div className="space-y-6">{children}</div>
    </section>
  );
}
