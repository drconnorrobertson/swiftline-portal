'use client';
import { UserPlus, Plus, Search, TrendingUp, DollarSign, Users, Mail, Phone, MoreVertical, Star } from 'lucide-react';
import { useState } from 'react';

const affiliates = [
  { id: 'a1', name: 'Brett Watts', company: 'Swift Line Capital', email: 'brett@swiftlinecapital.com', phone: '(555) 555-0100', deals: 12, funded: 3, volume: 1850000, commission: 18500, tier: 'Gold', status: 'Active' },
  { id: 'a2', name: 'Mike Torres', company: 'Torres Realty Group', email: 'mike@torresrealty.com', phone: '(555) 555-0201', deals: 8, funded: 2, volume: 920000, commission: 9200, tier: 'Silver', status: 'Active' },
  { id: 'a3', name: 'Sarah Kim', company: 'Pacific Capital Advisors', email: 'sarah@pacificcap.com', phone: '(555) 555-0302', deals: 5, funded: 1, volume: 475000, commission: 4750, tier: 'Bronze', status: 'Active' },
  { id: 'a4', name: 'James Wright', company: 'Wright Investments', email: 'james@wrightinv.com', phone: '(555) 555-0403', deals: 2, funded: 0, volume: 0, commission: 0, tier: 'Bronze', status: 'Pending' },
];

const tierColors: Record<string, string> = { Gold: 'bg-amber-100 text-amber-700', Silver: 'bg-gray-100 text-gray-700', Bronze: 'bg-orange-100 text-orange-700' };

export default function AffiliatesPage() {
  const [search, setSearch] = useState('');
  const filtered = affiliates.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));
  const totalVolume = affiliates.reduce((s, a) => s + a.volume, 0);
  const totalCommission = affiliates.reduce((s, a) => s + a.commission, 0);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0"><UserPlus className="w-5 h-5 text-amber-600" /></div>
          <div><h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Affiliates</h1><p className="text-xs sm:text-sm text-gray-500">Manage your referral partners and track commissions</p></div>
        </div>
        <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-amber-600 self-start"><Plus className="w-4 h-4" /> Add Affiliate</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
          <div><p className="text-xs text-gray-500">Total Affiliates</p><p className="text-xl font-bold text-gray-900">{affiliates.length}</p></div>
          <Users className="w-8 h-8 text-amber-200" />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
          <div><p className="text-xs text-gray-500">Total Volume</p><p className="text-xl font-bold text-gray-900">${(totalVolume / 1000000).toFixed(1)}M</p></div>
          <TrendingUp className="w-8 h-8 text-emerald-200" />
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
          <div><p className="text-xs text-gray-500">Commissions Paid</p><p className="text-xl font-bold text-gray-900">${(totalCommission / 1000).toFixed(1)}K</p></div>
          <DollarSign className="w-8 h-8 text-purple-200" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-3 sm:p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search affiliates..." className="bg-transparent text-sm outline-none w-full min-w-0" />
          </div>
        </div>

        <div className="sm:hidden p-3 space-y-3">
          {filtered.map(a => (
            <div key={a.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-[10px] font-bold">{a.name.split(' ').map(n => n[0]).join('')}</div>
                  <div><p className="text-sm font-medium text-gray-900">{a.name}</p><p className="text-[10px] text-gray-500">{a.company}</p></div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${tierColors[a.tier]}`}>{a.tier}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div><p className="text-lg font-bold text-gray-900">{a.deals}</p><p className="text-[10px] text-gray-400">Deals</p></div>
                <div><p className="text-lg font-bold text-emerald-600">{a.funded}</p><p className="text-[10px] text-gray-400">Funded</p></div>
                <div><p className="text-lg font-bold text-amber-600">${(a.commission / 1000).toFixed(1)}K</p><p className="text-[10px] text-gray-400">Earned</p></div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead><tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th className="px-4 py-3">Affiliate</th><th className="px-4 py-3">Tier</th><th className="px-4 py-3 text-center">Deals</th><th className="px-4 py-3 text-center">Funded</th><th className="px-4 py-3 text-right">Volume</th><th className="px-4 py-3 text-right">Commission</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"></th>
            </tr></thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">{a.name.split(' ').map(n => n[0]).join('')}</div><div><p className="text-sm font-medium text-gray-900">{a.name}</p><p className="text-[10px] text-gray-500">{a.company}</p></div></div></td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full ${tierColors[a.tier]}`}><Star className="w-3 h-3 inline mr-1" />{a.tier}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-center font-medium">{a.deals}</td>
                  <td className="px-4 py-3 text-sm text-emerald-600 text-center font-medium">{a.funded}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 text-right">${(a.volume / 1000).toFixed(0)}K</td>
                  <td className="px-4 py-3 text-sm text-amber-600 text-right font-medium">${(a.commission / 1000).toFixed(1)}K</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full ${a.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{a.status}</span></td>
                  <td className="px-4 py-3"><button className="p-1 hover:bg-gray-100 rounded"><MoreVertical className="w-4 h-4 text-gray-400" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
