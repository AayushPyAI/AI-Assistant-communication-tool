'use client';

import { useSidebar } from '@/app/contexts/SidebarContext';
import clsx from 'clsx';
import { Menu } from 'lucide-react';

export default function SidebarMainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed, toggleMobileSidebar } = useSidebar();

  return (
    <>
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#171717] text-white rounded-lg shadow-lg hover:bg-[#2a2a2a] transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <main
        className={clsx(
          'flex-1 overflow-y-auto transition-all duration-300 ease-in-out',
          'w-full',
          'lg:ml-0',
          isCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        )}
      >
        <div className="lg:pt-0 pt-16">
          {children}
        </div>
      </main>
    </>
  );
}
