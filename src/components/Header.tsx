'use client';
import { Search, Moon, QrCode, Link2, Bell, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 left-[200px] right-0 z-30">
      <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 w-[340px]">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, address, email, loan ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
        />
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Dark Mode">
          <Moon className="w-4 h-4 text-gray-500" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="QR Code">
          <QrCode className="w-4 h-4 text-gray-500" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Share Link">
          <Link2 className="w-4 h-4 text-gray-500" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative" title="Notifications">
          <Bell className="w-4 h-4 text-gray-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2 ml-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-xs font-bold">
            BW
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900 leading-tight">Brett Watts</p>
            <p className="text-[10px] text-gray-500 leading-tight">Broker</p>
          </div>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
