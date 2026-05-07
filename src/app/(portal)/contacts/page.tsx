'use client';
import { Users, Plus, Search, Mail, Phone, Building2 } from 'lucide-react';
import { contacts } from '@/lib/data';
import { useState } from 'react';

const typeColors: Record<string, string> = {
  Borrower: 'bg-blue-100 text-blue-700',
  Affiliate: 'bg-purple-100 text-purple-700',
  Lender: 'bg-emerald-100 text-emerald-700',
  Team: 'bg-amber-100 text-amber-700',
};

export default function ContactsPage() {
  const [search, setSearch] = useState('');
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center"><Users className="w-5 h-5 text-amber-600" /></div>
          <div><h1 className="text-2xl font-bold text-gray-900">Contacts</h1><p className="text-sm text-gray-500">Manage your borrowers, affiliates, and team</p></div>
        </div>
        <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-amber-600"><Plus className="w-4 h-4" /> Add Contact</button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 w-80">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contacts..." className="bg-transparent text-sm outline-none w-full" />
          </div>
        </div>
        <table className="w-full">
          <thead><tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
            <th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Phone</th><th className="px-4 py-3">Company</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Added</th>
          </tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{c.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600 flex items-center gap-1"><Mail className="w-3 h-3" /> {c.email}</td>
                <td className="px-4 py-3 text-sm text-gray-600"><Phone className="w-3 h-3 inline mr-1" />{c.phone}</td>
                <td className="px-4 py-3 text-sm text-gray-600"><Building2 className="w-3 h-3 inline mr-1" />{c.company}</td>
                <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full ${typeColors[c.type]}`}>{c.type}</span></td>
                <td className="px-4 py-3 text-sm text-gray-500">{c.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
