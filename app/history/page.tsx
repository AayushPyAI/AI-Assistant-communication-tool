'use client';

import { History, Calendar, Clock, User, ChevronRight } from 'lucide-react';

export default function HistoryPage() {
  const callHistory = [
    {
      id: '1',
      clientName: 'John Doe',
      date: new Date('2024-01-15'),
      duration: '15:32',
      status: 'completed',
      summary: 'Discussed account updates and billing questions',
    },
    {
      id: '2',
      clientName: 'Jane Smith',
      date: new Date('2024-01-14'),
      duration: '22:15',
      status: 'completed',
      summary: 'Product inquiry and pricing discussion',
    },
    {
      id: '3',
      clientName: 'Bob Johnson',
      date: new Date('2024-01-13'),
      duration: '8:45',
      status: 'completed',
      summary: 'Technical support and troubleshooting',
    },
    {
      id: '4',
      clientName: 'Sarah Williams',
      date: new Date('2024-01-12'),
      duration: '12:20',
      status: 'completed',
      summary: 'Account setup and onboarding assistance',
    },
    {
      id: '5',
      clientName: 'Michael Brown',
      date: new Date('2024-01-11'),
      duration: '18:45',
      status: 'completed',
      summary: 'Feature request and product roadmap discussion',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/20 px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12">
      <div className="max-w-full mx-auto">
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center border border-blue-200/50">
              <History className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <h1 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight">Call History</h1>
          </div>
          <p className="text-sm sm:text-base text-blue-600/70 mt-2 sm:ml-13">
            View past call sessions and insights
          </p>
        </div>

        <div className="space-y-3">
          {callHistory.map((call) => (
            <div
              key={call.id}
              className="border border-blue-200/50 rounded-lg bg-white p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200/50 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    </div>
                    <h3 className="text-sm sm:text-base font-semibold text-zinc-900 truncate">
                      {call.clientName}
                    </h3>
                    <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs font-medium bg-green-50 text-green-700 rounded-full border border-green-200">
                      {call.status}
                    </span>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-zinc-600 mb-3 sm:mb-4 ml-0 sm:ml-13 leading-relaxed">
                    {call.summary}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-blue-600/70 ml-0 sm:ml-13">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{call.date.toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{call.duration}</span>
                    </div>
                  </div>
                </div>
                
                <button className="w-full sm:w-auto px-3 sm:px-4 py-2 text-sm border cursor-pointer border-blue-300 rounded-lg text-blue-700 bg-blue-50/50 hover:bg-blue-100 hover:border-blue-400 transition-all flex items-center justify-center gap-2 flex-shrink-0 shadow-sm hover:shadow">
                  <span>View</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {callHistory.length === 0 && (
          <div className="text-center py-12 sm:py-16 bg-white border border-blue-200/50 rounded-lg shadow-sm">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mx-auto mb-4 border border-blue-200/50">
              <History className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
            </div>
            <p className="text-sm font-medium text-zinc-900 mb-1">No call history yet</p>
            <p className="text-xs text-zinc-500">
              Start a call to see it appear here
            </p>
          </div>
        )}

        {callHistory.length > 0 && (
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-blue-200/50 flex justify-center">
            <button className="px-4 sm:px-5 py-2 sm:py-2.5 text-sm border border-blue-300 rounded-lg text-blue-700 bg-blue-50/50 hover:bg-blue-100 hover:border-blue-400 transition-all shadow-sm hover:shadow">
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
