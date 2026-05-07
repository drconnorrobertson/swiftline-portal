'use client';
import { Search, MapPin, DollarSign, Home, TrendingUp, Filter, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency } from '@/lib/data';

const marketplace = [
  { id: 'm1', title: '12-Unit Multifamily', address: '450 Collins Ave, Miami Beach, FL', amount: 2400000, arv: 3100000, type: 'Bridge', ltv: 77, rate: '10.5%', term: '24 months', status: 'Available' },
  { id: 'm2', title: 'Fix & Flip SFR', address: '1832 Elm St, Austin, TX', amount: 285000, arv: 420000, type: 'Fix & Flip', ltv: 68, rate: '11.0%', term: '12 months', status: 'Available' },
  { id: 'm3', title: 'Mixed-Use Retail', address: '780 Broadway, Nashville, TN', amount: 1150000, arv: 1600000, type: 'Bridge', ltv: 72, rate: '10.0%', term: '18 months', status: 'Under Review' },
  { id: 'm4', title: 'SFR Portfolio (4 homes)', address: 'Various - Pittsburgh, PA', amount: 620000, arv: 850000, type: 'DSCR', ltv: 73, rate: '9.5%', term: '30 years', status: 'Available' },
  { id: 'm5', title: 'Ground Up Duplex', address: '92 Cedar Ln, Charlotte, NC', amount: 540000, arv: 780000, type: 'Ground Up', ltv: 69, rate: '11.5%', term: '18 months', status: 'Available' },
  { id: 'm6', title: 'Townhome Flip', address: '3340 Peach Tree Rd, Atlanta, GA', amount: 195000, arv: 310000, type: 'Fix & Flip', ltv: 63, rate: '10.5%', term: '9 months', status: 'Funded' },
];

const statusColors: Record<string, string> = { Available: 'bg-emerald-100 text-emerald-700', 'Under Review': 'bg-amber-100 text-amber-700', Funded: 'bg-blue-100 text-blue-700' };

export default function BrowseDealsPage() {
  const [typeFilter, setTypeFilter] = useState('All');
  const filtered = marketplace.filter(d => typeFilter === 'All' || d.type === typeFilter);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0"><Search className="w-5 h-5 text-amber-600" /></div>
          <div><h1 className="text-xl sm:text-2xl font-bold text-gray-900">Browse Deals</h1><p className="text-xs sm:text-sm text-gray-500">Explore available deals in the marketplace</p></div>
        </div>
      </div>

      <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 mb-4">
        {['All', 'Fix & Flip', 'Bridge', 'DSCR', 'Ground Up'].map(t => (
          <button key={t} onClick={() => setTypeFilter(t)} className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap ${typeFilter === t ? 'bg-amber-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{t}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(deal => (
          <div key={deal.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
            <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
              <Home className="w-12 h-12 text-gray-300" />
              <span className={`absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full ${statusColors[deal.status]}`}>{deal.status}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-sm group-hover:text-amber-600 transition-colors">{deal.title}</h3>
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" />{deal.address}</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div><p className="text-[10px] text-gray-400">Loan Amount</p><p className="text-sm font-bold text-gray-900">{formatCurrency(deal.amount)}</p></div>
                <div><p className="text-[10px] text-gray-400">ARV</p><p className="text-sm font-bold text-emerald-600">{formatCurrency(deal.arv)}</p></div>
                <div><p className="text-[10px] text-gray-400">LTV</p><p className="text-sm font-medium text-gray-700">{deal.ltv}%</p></div>
                <div><p className="text-[10px] text-gray-400">Rate</p><p className="text-sm font-medium text-gray-700">{deal.rate}</p></div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">{deal.type}</span>
                <span className="text-xs text-gray-400">{deal.term}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
