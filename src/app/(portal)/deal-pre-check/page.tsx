'use client';
import { ShieldCheck, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

export default function DealPreCheckPage() {
  const [creditScore, setCreditScore] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [arv, setArv] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [experience, setExperience] = useState('');
  const [checked, setChecked] = useState(false);

  const runCheck = () => setChecked(true);

  const score = parseInt(creditScore) || 0;
  const ltv = arv ? (parseInt(loanAmount || '0') / parseInt(arv)) * 100 : 0;

  return (
    <div className="max-w-[800px] mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deal Pre Check</h1>
          <p className="text-sm text-gray-500">Quick eligibility screening before submitting a full application</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Borrower Credit Score *</label>
            <input type="number" value={creditScore} onChange={e => setCreditScore(e.target.value)} placeholder="300-850" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requested Loan Amount *</label>
            <input type="text" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} placeholder="$0" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">After Repair Value (ARV) *</label>
            <input type="text" value={arv} onChange={e => setArv(e.target.value)} placeholder="$0" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
            <select value={propertyType} onChange={e => setPropertyType(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400">
              <option value="">Select</option>
              <option value="SFR">Single Family</option>
              <option value="Multi">Multi-Family</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience (# projects completed)</label>
            <input type="number" value={experience} onChange={e => setExperience(e.target.value)} placeholder="0" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
          </div>
        </div>
        <button onClick={runCheck} className="w-full py-3 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600">
          Run Pre Check
        </button>
      </div>

      {checked && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Pre-Check Results</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              {score >= 660 ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : score >= 600 ? <AlertTriangle className="w-5 h-5 text-amber-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
              <div>
                <p className="text-sm font-medium text-gray-900">Credit Score: {score}</p>
                <p className="text-xs text-gray-500">{score >= 660 ? 'Meets minimum requirements' : score >= 600 ? 'Below preferred - may need additional documentation' : 'Below minimum threshold'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              {ltv <= 75 ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : ltv <= 85 ? <AlertTriangle className="w-5 h-5 text-amber-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
              <div>
                <p className="text-sm font-medium text-gray-900">LTV Ratio: {ltv.toFixed(1)}%</p>
                <p className="text-xs text-gray-500">{ltv <= 75 ? 'Within acceptable range' : ltv <= 85 ? 'Higher than preferred - review needed' : 'Exceeds maximum LTV'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              {parseInt(experience) >= 3 ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : parseInt(experience) >= 1 ? <AlertTriangle className="w-5 h-5 text-amber-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
              <div>
                <p className="text-sm font-medium text-gray-900">Experience: {experience || 0} projects</p>
                <p className="text-xs text-gray-500">{parseInt(experience) >= 3 ? 'Experienced borrower' : parseInt(experience) >= 1 ? 'Limited experience - additional review' : 'First-time borrower - may need co-signer'}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
