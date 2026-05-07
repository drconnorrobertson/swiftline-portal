'use client';
import { DollarSign, Clock, CheckCircle, Eye, ExternalLink, BarChart3 } from 'lucide-react';
import { loanApplications, formatCurrency } from '@/lib/data';
import Link from 'next/link';

const statusColors: Record<string, string> = {
  New: 'bg-emerald-100 text-emerald-700',
  Processing: 'bg-amber-100 text-amber-700',
  Funded: 'bg-blue-100 text-blue-700',
  Rejected: 'bg-red-100 text-red-700',
  Dead: 'bg-gray-100 text-gray-600',
};

export default function DashboardPage() {
  const totalSubmitted = loanApplications.length;
  const totalAmount = loanApplications.reduce((sum, l) => sum + l.amount, 0);
  const processing = loanApplications.filter(l => l.status === 'Processing');
  const processingAmount = processing.reduce((sum, l) => sum + l.amount, 0);
  const funded = loanApplications.filter(l => l.status === 'Funded');
  const fundedAmount = funded.reduce((sum, l) => sum + l.amount, 0);

  const salesCount = loanApplications.filter(l => ['New', 'Processing'].includes(l.status)).length;
  const processingCount = processing.length;
  const fundedCount = funded.length;
  const deadCount = loanApplications.filter(l => l.status === 'Dead').length;
  const pipelineTotal = salesCount + processingCount + fundedCount + deadCount;

  const chartData = [
    { day: '5/1', count: 2 }, { day: '5/2', count: 1 }, { day: '5/3', count: 3 },
    { day: '5/4', count: 5 }, { day: '5/5', count: 4 }, { day: '5/6', count: 3 }, { day: '5/7', count: 2 },
  ];
  const maxCount = Math.max(...chartData.map(d => d.count));

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Monitor your loans and track performance</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Submitted Loans</p>
            <p className="text-2xl font-bold text-gray-900">{totalSubmitted} Loans</p>
            <p className="text-sm text-gray-400">{formatCurrency(totalAmount)}</p>
          </div>
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-amber-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Current Processing</p>
            <p className="text-2xl font-bold text-gray-900">{processing.length} Loans</p>
            <p className="text-sm text-gray-400">{formatCurrency(processingAmount)}</p>
          </div>
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Closed Loans</p>
            <p className="text-2xl font-bold text-gray-900">{funded.length} Loans</p>
            <p className="text-sm text-gray-400">{formatCurrency(fundedAmount)}</p>
          </div>
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* Pipeline Snapshot */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-gray-500" />
            <h2 className="font-semibold text-gray-900">Deal Pipeline Snapshot</h2>
          </div>
          <span className="text-sm text-gray-500">{pipelineTotal} total</span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden flex mb-4">
          <div className="bg-emerald-400 h-full" style={{ width: `${(salesCount / pipelineTotal) * 100}%` }} />
          <div className="bg-blue-400 h-full" style={{ width: `${(processingCount / pipelineTotal) * 100}%` }} />
          <div className="bg-amber-400 h-full" style={{ width: `${(fundedCount / pipelineTotal) * 100}%` }} />
          <div className="bg-red-300 h-full" style={{ width: `${(deadCount / pipelineTotal) * 100}%` }} />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-emerald-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-emerald-600">{salesCount}</p>
            <p className="text-xs text-emerald-600">Sales</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-blue-600">{processingCount}</p>
            <p className="text-xs text-blue-600">Processing</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-amber-600">{fundedCount}</p>
            <p className="text-xs text-amber-600">Funded</p>
          </div>
          <div className="bg-red-50 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-red-500">{deadCount}</p>
            <p className="text-xs text-red-500">Dead</p>
          </div>
        </div>
      </div>

      {/* Chart + Communication */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Loans Submitted</p>
              <p className="text-3xl font-bold text-gray-900">{totalSubmitted}</p>
            </div>
            <div className="flex gap-1">
              {['Day', 'Week', 'Month'].map(period => (
                <button key={period} className={`px-3 py-1 text-xs rounded-md ${period === 'Day' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-2 h-40">
            {chartData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-gray-800 rounded-t-sm min-h-[4px]"
                  style={{ height: `${(d.count / maxCount) * 140}px` }}
                />
                <span className="text-[10px] text-gray-400">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-400 mb-1">Communication</h3>
          <p className="text-xs text-gray-400">Your message will appear here once someone contacts you.</p>
        </div>
      </div>

      {/* Recent Loan Applications */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-gray-900">Loan Applications</h2>
            <p className="text-sm text-gray-500">Manage Loan Applications Effortlessly</p>
          </div>
          <Link href="/loan-applications" className="text-amber-600 hover:text-amber-700 text-sm">View All &rarr;</Link>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
              <th className="pb-3">Loan ID</th>
              <th className="pb-3">Borrower</th>
              <th className="pb-3">Entity</th>
              <th className="pb-3">Address</th>
              <th className="pb-3">Type</th>
              <th className="pb-3 text-right">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Affiliate</th>
              <th className="pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {loanApplications.slice(0, 5).map(loan => (
              <tr key={loan.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="py-3 text-sm text-gray-700 font-mono">{loan.id}</td>
                <td className="py-3 text-sm text-gray-900 font-medium">{loan.borrower}</td>
                <td className="py-3 text-sm text-gray-600 max-w-[140px] truncate">{loan.entity}</td>
                <td className="py-3 text-sm text-gray-600 max-w-[160px] truncate">{loan.address}</td>
                <td className="py-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">{loan.type}</span>
                </td>
                <td className="py-3 text-sm text-gray-900 font-medium text-right">{formatCurrency(loan.amount)}</td>
                <td className="py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${statusColors[loan.status]}`}>{loan.status}</span>
                </td>
                <td className="py-3 text-sm text-gray-500">{loan.affiliate}</td>
                <td className="py-3">
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
  );
}
