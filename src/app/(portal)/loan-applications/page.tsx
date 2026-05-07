'use client';
import { Eye, ExternalLink, Search, Filter, Download, Plus } from 'lucide-react';
import { loanApplications, formatCurrency } from '@/lib/data';
import Link from 'next/link';
import { useState } from 'react';

const statusColors: Record<string, string> = {
  New: 'bg-emerald-100 text-emerald-700',
  Processing: 'bg-amber-100 text-amber-700',
  Funded: 'bg-blue-100 text-blue-700',
  Rejected: 'bg-red-100 text-red-700',
  Dead: 'bg-gray-100 text-gray-600',
};

export default function LoanApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = loanApplications.filter(l => {
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    const matchesSearch = search === '' || l.borrower.toLowerCase().includes(search.toLowerCase()) || l.id.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Loan Applications</h1>
          <p className="text-sm text-gray-500">Manage Loan Applications Effortlessly</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 flex items-center gap-1 hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export
          </button>
          <Link href="/add-new-deal" className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-amber-600">
            <Plus className="w-4 h-4" /> Add New Deal
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-3 sm:p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by name or loan ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm outline-none w-full min-w-0"
            />
          </div>
          <div className="flex gap-1 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'New', 'Processing', 'Funded', 'Rejected', 'Dead'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 text-xs rounded-lg whitespace-nowrap ${statusFilter === status ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile card view */}
        <div className="sm:hidden p-3 space-y-3">
          {filtered.map(loan => (
            <Link key={loan.id} href={`/loan-applications/${loan.id}`} className="block bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex items-start justify-between mb-1">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900">{loan.borrower}</p>
                  <p className="text-[10px] text-gray-400 font-mono">{loan.id}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 ${statusColors[loan.status]}`}>{loan.status}</span>
              </div>
              <p className="text-xs text-gray-500 truncate mb-2">{loan.address}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">{loan.type}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${loan.scottLender ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-50 text-gray-400'}`}>
                    Scott: {loan.scottLender ? 'Yes' : 'No'}
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(loan.amount)}</span>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between">
                <code className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-mono">{loan.accessCode}</code>
                <span className="text-[10px] text-gray-400">{loan.affiliate}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th className="px-4 py-3">Loan ID</th>
              <th className="px-4 py-3">Borrower</th>
              <th className="px-4 py-3">Entity</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Scott Lender</th>
              <th className="px-4 py-3">Access Code</th>
              <th className="px-4 py-3">Affiliate</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(loan => (
              <tr key={loan.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-700 font-mono">{loan.id}</td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium">{loan.borrower}</td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-[140px] truncate">{loan.entity}</td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-[160px] truncate">{loan.address}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">{loan.type}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 font-medium text-right">{formatCurrency(loan.amount)}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[loan.status]}`}>{loan.status}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${loan.scottLender ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                    {loan.scottLender ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">{loan.accessCode}</code>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{loan.affiliate}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Link href={`/loan-applications/${loan.id}`} className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </Link>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
