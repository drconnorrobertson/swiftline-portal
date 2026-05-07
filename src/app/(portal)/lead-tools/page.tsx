'use client';
import { Megaphone } from 'lucide-react';

export default function Page() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
          <Megaphone className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lead Tools</h1>
          <p className="text-sm text-gray-500">Generate and manage leads for your business</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <Megaphone className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-400 mb-1">Lead Tools</h3>
        <p className="text-sm text-gray-400">Generate and manage leads for your business</p>
      </div>
    </div>
  );
}
