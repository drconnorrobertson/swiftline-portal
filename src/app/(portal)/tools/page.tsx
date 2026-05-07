'use client';
import { Wrench, Calculator, FileSpreadsheet, DollarSign, TrendingUp, Percent, Building2, Calendar } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency } from '@/lib/data';

export default function ToolsPage() {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [rate, setRate] = useState('10.5');
  const [term, setTerm] = useState('12');
  const [points, setPoints] = useState('2');

  const amount = parseFloat(loanAmount) || 0;
  const monthlyRate = (parseFloat(rate) || 0) / 100 / 12;
  const months = parseInt(term) || 12;
  const originationFee = amount * ((parseFloat(points) || 0) / 100);
  const monthlyInterest = amount * monthlyRate;
  const totalInterest = monthlyInterest * months;
  const totalCost = totalInterest + originationFee;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0"><Wrench className="w-5 h-5 text-amber-600" /></div>
        <div><h1 className="text-xl sm:text-2xl font-bold text-gray-900">Tools</h1><p className="text-xs sm:text-sm text-gray-500">Calculators and utilities for your lending business</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Loan Calculator */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4"><Calculator className="w-5 h-5 text-amber-500" /><h3 className="font-semibold text-gray-900">Loan Cost Calculator</h3></div>
          <div className="space-y-3 mb-6">
            <div><label className="block text-xs font-medium text-gray-700 mb-1">Loan Amount</label><input type="text" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400" /></div>
            <div className="grid grid-cols-3 gap-3">
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Rate (%)</label><input type="text" value={rate} onChange={e => setRate(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Term (mo)</label><input type="text" value={term} onChange={e => setTerm(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400" /></div>
              <div><label className="block text-xs font-medium text-gray-700 mb-1">Points</label><input type="text" value={points} onChange={e => setPoints(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400" /></div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Monthly Interest</span><span className="font-medium text-gray-900">{formatCurrency(monthlyInterest)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Origination Fee ({points} pts)</span><span className="font-medium text-gray-900">{formatCurrency(originationFee)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Total Interest ({term} mo)</span><span className="font-medium text-gray-900">{formatCurrency(totalInterest)}</span></div>
            <div className="flex justify-between text-sm pt-2 border-t border-gray-200"><span className="text-gray-900 font-semibold">Total Loan Cost</span><span className="font-bold text-amber-600 text-lg">{formatCurrency(totalCost)}</span></div>
          </div>
        </div>

        {/* Quick Tools Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: 'LTV Calculator', desc: 'Calculate loan-to-value ratio', icon: Percent, color: 'bg-blue-100 text-blue-600' },
              { title: 'ROI Estimator', desc: 'Estimate return on investment', icon: TrendingUp, color: 'bg-emerald-100 text-emerald-600' },
              { title: 'DSCR Calculator', desc: 'Debt service coverage ratio', icon: DollarSign, color: 'bg-purple-100 text-purple-600' },
              { title: 'Amortization', desc: 'Full amortization schedule', icon: Calendar, color: 'bg-amber-100 text-amber-600' },
              { title: 'Comp Finder', desc: 'Find comparable properties', icon: Building2, color: 'bg-red-100 text-red-600' },
              { title: 'Rate Sheets', desc: 'Current loan programs', icon: FileSpreadsheet, color: 'bg-cyan-100 text-cyan-600' },
            ].map((tool, i) => {
              const Icon = tool.icon;
              return (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 hover:border-amber-400 hover:shadow-sm cursor-pointer transition-all">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${tool.color}`}><Icon className="w-4 h-4" /></div>
                  <h4 className="text-sm font-medium text-gray-900">{tool.title}</h4>
                  <p className="text-[10px] text-gray-500">{tool.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
