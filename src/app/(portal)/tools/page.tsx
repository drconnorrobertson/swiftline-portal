'use client';
import { Wrench } from 'lucide-react';

export default function Page() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
          <Wrench className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tools</h1>
          <p className="text-sm text-gray-500">Additional tools and utilities for your business</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-400 mb-1">Tools</h3>
        <p className="text-sm text-gray-400">Additional tools and utilities for your business</p>
      </div>
    </div>
  );
}
