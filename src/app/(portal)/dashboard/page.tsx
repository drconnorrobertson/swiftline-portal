'use client';
import { DollarSign, Clock, CheckCircle, Eye, ExternalLink, BarChart3, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
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

  const avgLoanSize = totalSubmitted > 0 ? totalAmount / totalSubmitted : 0;
  const conversionRate = totalSubmitted > 0 ? ((fundedCount / totalSubmitted) * 100).toFixed(1) : '0';

  const chartData = [
    { day: '5/1', count: 2 }, { day: '5/2', count: 1 }, { day: '5/3', count: 3 },
    { day: '5/4', count: 5 }, { day: '5/5', count: 4 }, { day: '5/6', count: 3 }, { day: '5/7', count: 2 },
  ];
  const maxCount = Math.max(...chartData.map(d => d.count));

  // Recent activity feed
  const recentActivity = [
    { action: 'New deal submitted', detail: 'Elijah Bloom - $490,000 Fix & Flip', time: '2 hours ago', type: 'new' },
    { action: 'Term sheet sent', detail: 'Rick Katinger - $457,800', time: '1 day ago', type: 'processing' },
    { action: 'Deal rejected', detail: 'Nick Jenkins - $220,430', time: '1 day ago', type: 'rejected' },
    { action: 'Documents uploaded', detail: 'Rick Katinger - Insurance Binder', time: '2 days ago', type: 'doc' },
  ];

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <BarChart3 className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-500">Monitor your loans and track performance</p>
        </div>
      </div>

      {/* KPI Cards - stack on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm text-gray-500">Submitted Loans</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalSubmitted}</p>
            <p className="text-xs sm:text-sm text-gray-400">{formatCurrency(totalAmount)}</p>
          </div>
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-5 h-5 text-amber-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm text-gray-500">Processing</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{processing.length}</p>
            <p className="text-xs sm:text-sm text-gray-400">{formatCurrency(processingAmount)}</p>
          </div>
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm text-gray-500">Closed Loans</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{funded.length}</p>
            <p className="text-xs sm:text-sm text-gray-400">{formatCurrency(fundedAmount)}</p>
          </div>
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm text-gray-500">Avg Loan Size</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatCurrency(avgLoanSize)}</p>
            <p className="text-xs sm:text-sm text-gray-400">{conversionRate}% close rate</p>
          </div>
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Pipeline Snapshot */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-gray-500" />
            <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Deal Pipeline Snapshot</h2>
          </div>
          <span className="text-xs sm:text-sm text-gray-500">{pipelineTotal} total</span>
        </div>
        <div className="w-full h-3 rounded-full overflow-hidden flex mb-4">
          <div className="bg-emerald-400 h-full" style={{ width: `${(salesCount / pipelineTotal) * 100}%` }} />
          <div className="bg-blue-400 h-full" style={{ width: `${(processingCount / pipelineTotal) * 100}%` }} />
          <div className="bg-amber-400 h-full" style={{ width: `${(fundedCount / pipelineTotal) * 100}%` }} />
          <div className="bg-red-300 h-full" style={{ width: `${(deadCount / pipelineTotal) * 100}%` }} />
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-4">
          <div className="bg-emerald-50 rounded-lg p-2 sm:p-3 text-center">
            <p className="text-lg sm:text-2xl font-bold text-emerald-600">{salesCount}</p>
            <p className="text-[10px] sm:text-xs text-emerald-600">Sales</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-2 sm:p-3 text-center">
            <p className="text-lg sm:text-2xl font-bold text-blue-600">{processingCount}</p>
            <p className="text-[10px] sm:text-xs text-blue-600">Processing</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-2 sm:p-3 text-center">
            <p className="text-lg sm:text-2xl font-bold text-amber-600">{fundedCount}</p>
            <p className="text-[10px] sm:text-xs text-amber-600">Funded</p>
          </div>
          <div className="bg-red-50 rounded-lg p-2 sm:p-3 text-center">
            <p className="text-lg sm:text-2xl font-bold text-red-500">{deadCount}</p>
            <p className="text-[10px] sm:text-xs text-red-500">Dead</p>
          </div>
        </div>
      </div>

      {/* Chart + Activity Feed - stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Loans Submitted</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{totalSubmitted}</p>
            </div>
            <div className="flex gap-1">
              {['Day', 'Week', 'Month'].map(period => (
                <button key={period} className={`px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-md ${period === 'Day' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-1 sm:gap-2 h-32 sm:h-40">
            {chartData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-gray-800 rounded-t-sm min-h-[4px]" style={{ height: `${(d.count / maxCount) * 120}px` }} />
                <span className="text-[8px] sm:text-[10px] text-gray-400">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed (replaces empty communication widget) */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
          <h3 className="font-semibold text-gray-900 text-sm mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  item.type === 'new' ? 'bg-emerald-500' : item.type === 'processing' ? 'bg-amber-500' : item.type === 'rejected' ? 'bg-red-500' : 'bg-blue-500'
                }`} />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-900">{item.action}</p>
                  <p className="text-[10px] text-gray-500 truncate">{item.detail}</p>
                  <p className="text-[10px] text-gray-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions (new feature) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <Link href="/add-new-deal" className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:border-amber-400 hover:shadow-sm transition-all group">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-amber-200">
            <DollarSign className="w-5 h-5 text-amber-600" />
          </div>
          <p className="text-xs font-medium text-gray-700">New Deal</p>
        </Link>
        <Link href="/deal-pre-check" className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:border-amber-400 hover:shadow-sm transition-all group">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-emerald-200">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-xs font-medium text-gray-700">Pre Check</p>
        </Link>
        <Link href="/documents" className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:border-amber-400 hover:shadow-sm transition-all group">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-200">
            <AlertCircle className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-xs font-medium text-gray-700">Documents</p>
        </Link>
        <Link href="/pipeline" className="bg-white rounded-xl border border-gray-200 p-4 text-center hover:border-amber-400 hover:shadow-sm transition-all group">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-200">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-xs font-medium text-gray-700">Pipeline</p>
        </Link>
      </div>

      {/* Recent Loan Applications - card layout on mobile, table on desktop */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-gray-900 text-sm sm:text-base">Loan Applications</h2>
            <p className="text-xs sm:text-sm text-gray-500">Manage Loan Applications Effortlessly</p>
          </div>
          <Link href="/loan-applications" className="text-amber-600 hover:text-amber-700 text-xs sm:text-sm">View All &rarr;</Link>
        </div>

        {/* Mobile card view */}
        <div className="sm:hidden space-y-3">
          {loanApplications.slice(0, 5).map(loan => (
            <Link key={loan.id} href={`/loan-applications/${loan.id}`} className="block bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-sm font-medium text-gray-900">{loan.borrower}</p>
                  <p className="text-[10px] text-gray-400 font-mono">{loan.id}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[loan.status]}`}>{loan.status}</span>
              </div>
              <p className="text-xs text-gray-500 truncate mb-1">{loan.address}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">{loan.type}</span>
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(loan.amount)}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop table view */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider">
                <th className="pb-3">Loan ID</th>
                <th className="pb-3">Borrower</th>
                <th className="pb-3 hidden lg:table-cell">Entity</th>
                <th className="pb-3 hidden xl:table-cell">Address</th>
                <th className="pb-3">Type</th>
                <th className="pb-3 text-right">Amount</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 hidden lg:table-cell">Affiliate</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {loanApplications.slice(0, 5).map(loan => (
                <tr key={loan.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="py-3 text-sm text-gray-700 font-mono">{loan.id}</td>
                  <td className="py-3 text-sm text-gray-900 font-medium">{loan.borrower}</td>
                  <td className="py-3 text-sm text-gray-600 max-w-[140px] truncate hidden lg:table-cell">{loan.entity}</td>
                  <td className="py-3 text-sm text-gray-600 max-w-[160px] truncate hidden xl:table-cell">{loan.address}</td>
                  <td className="py-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700">{loan.type}</span>
                  </td>
                  <td className="py-3 text-sm text-gray-900 font-medium text-right">{formatCurrency(loan.amount)}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${statusColors[loan.status]}`}>{loan.status}</span>
                  </td>
                  <td className="py-3 text-sm text-gray-500 hidden lg:table-cell">{loan.affiliate}</td>
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
    </div>
  );
}
