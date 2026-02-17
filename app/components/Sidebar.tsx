'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Settings, Phone, History, MessageSquare, ChevronLeft, ChevronRight, X, User, SidebarIcon } from 'lucide-react';
import clsx from 'clsx';
import { useSidebar } from '@/app/contexts/SidebarContext';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Active Call', href: '/call', icon: Phone },
  { name: 'Call History', href: '/history', icon: History },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar, isMobileOpen, toggleMobileSidebar } = useSidebar();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed left-0 top-0 z-40 h-screen flex flex-col bg-[#171717] border-r border-[#2f2f2f]',
          'transition-all duration-300 ease-in-out',
          // Mobile: show when isMobileOpen is true, hide otherwise
          isMobileOpen ? 'flex' : 'hidden',
          // Desktop: always visible
          'lg:flex',
          // Group for hover effects when collapsed
          isCollapsed && 'group'
        )}
        style={{
          width: isCollapsed ? '4rem' : '16rem',
        }}
      >
        {/* Header */}
        <div className={clsx(
          'flex items-center gap-3 px-4 py-4 border-b border-[#2f2f2f]',
          isCollapsed && 'justify-center px-2'
        )}>
          <div 
            className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 relative cursor-pointer"
            onClick={() => {
              // Expand sidebar when collapsed and icon area is clicked
              if (isCollapsed) {
                toggleSidebar();
              }
            }}
            title={isCollapsed ? 'Click to expand' : undefined}
          >
            {/* MessageSquare - visible when expanded, or when collapsed and not hovering */}
            <MessageSquare className={clsx(
              'w-5 h-5 text-white transition-opacity duration-200',
              isCollapsed ? 'opacity-100 group-hover:opacity-0' : 'opacity-100'
            )} />
            {/* ChevronRight - visible only when collapsed and hovering */}
            {isCollapsed && (
              <SidebarIcon className={clsx(
                'w-5 h-5 text-white absolute transition-opacity duration-200',
                'opacity-0 group-hover:opacity-100'
              )} />
            )}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-sm font-semibold text-white truncate">AI Assistant</h1>
                <p className="text-xs text-[#a0a0a0] truncate">Communication Tool</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleSidebar}
                  className="hidden lg:flex p-1.5 hover:bg-[#2a2a2a] rounded transition-colors cursor-pointer"
                  title="Collapse sidebar"
                >
                  <SidebarIcon className="w-4 h-4 text-[#a0a0a0]" />
                </button>
                <button
                  onClick={toggleMobileSidebar}
                  className="lg:hidden p-1 hover:bg-[#2a2a2a] rounded"
                >
                  <X className="w-4 h-4 text-[#a0a0a0]" />
                </button>
              </div>
            </div>
          )}
        </div>
        
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                      toggleMobileSidebar();
                    }
                  }}
                  className={clsx(
                    'group flex items-center gap-3 rounded-lg transition-all duration-200',
                    'text-sm font-medium',
                    isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5',
                    isActive
                      ? 'bg-[#2f2f2f] text-white shadow-sm'
                      : 'text-[#a0a0a0] hover:bg-[#2a2a2a] hover:text-white'
                  )}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className={clsx(
                    'w-5 h-5 transition-colors flex-shrink-0',
                    isActive ? 'text-white' : 'text-[#a0a0a0] group-hover:text-white'
                  )} />
                  {!isCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="px-2 py-2 border-t border-[#2f2f2f]">
          <button
            onClick={() => {
              if (isCollapsed) {
                toggleSidebar();
              }
            }}
            className={clsx(
              'w-full flex items-center gap-3 rounded-lg transition-all duration-200',
              'text-sm font-medium',
              isCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2.5',
              'text-[#a0a0a0] hover:bg-[#2a2a2a] hover:text-white',
              isCollapsed && 'cursor-pointer'
            )}
            title={isCollapsed ? 'Click to expand' : 'User Profile'}
          >
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium text-white truncate">Demo User</p>
                <p className="text-xs text-[#a0a0a0] truncate">demouser@gmail.com</p>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
