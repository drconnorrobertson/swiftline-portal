'use client';
import { useState } from 'react';
import { Zap, FileText, CheckCircle, Clock, XCircle, Download, FolderOpen, ArrowLeft, ShieldCheck } from 'lucide-react';
import { loanApplications, formatCurrency } from '@/lib/data';
import type { LoanApplication } from '@/lib/data';

const statusIcons: Record<string, typeof CheckCircle> = {
  New: Clock,
  Processing: Clock,
  Funded: CheckCircle,
  Rejected: XCircle,
  Dead: XCircle,
};

const statusColors: Record<string, string> = {
  New: 'text-emerald-600 bg-emerald-50',
  Processing: 'text-amber-600 bg-amber-50',
  Funded: 'text-blue-600 bg-blue-50',
  Rejected: 'text-red-600 bg-red-50',
  Dead: 'text-gray-600 bg-gray-50',
};

const statusMessages: Record<string, string> = {
  New: 'Your application has been received and is under initial review.',
  Processing: 'Your loan is currently being processed. A term sheet has been sent for your review.',
  Funded: 'Congratulations! Your loan has been funded.',
  Rejected: 'Unfortunately, your application was not approved at this time.',
  Dead: 'This deal is no longer active.',
};

export default function ClientPortalPage() {
  const [accessCode, setAccessCode] = useState('');
  const [deal, setDeal] = useState<LoanApplication | null>(null);
  const [error, setError] = useState('');
  const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newValues = [...inputValues];
    newValues[index] = value.toUpperCase();
    setInputValues(newValues);
    const code = newValues.join('');
    setAccessCode(code);
    if (value && index < 5) {
      const next = document.getElementById(`code-${index + 1}`);
      next?.focus();
    }
    if (code.length === 6) {
      const found = loanApplications.find(l => l.accessCode === code);
      if (found) {
        setDeal(found);
        setError('');
      } else {
        setError('Invalid access code. Please check your code and try again.');
        setDeal(null);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !inputValues[index] && index > 0) {
      const prev = document.getElementById(`code-${index - 1}`);
      prev?.focus();
    }
  };

  const reset = () => {
    setDeal(null);
    setAccessCode('');
    setInputValues(['', '', '', '', '', '']);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Swift Line Capital</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Client Portal</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto py-12 px-6">
        {!deal ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Your Loan File</h2>
            <p className="text-gray-500 mb-8">Enter your 6-digit access code to view your loan status and documents</p>

            <div className="flex justify-center gap-3 mb-6">
              {inputValues.map((val, i) => (
                <input
                  key={i}
                  id={`code-${i}`}
                  type="text"
                  maxLength={1}
                  value={val}
                  onChange={e => handleInputChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  className="w-14 h-16 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 uppercase"
                />
              ))}
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg inline-block">
                {error}
              </div>
            )}

            <p className="text-xs text-gray-400 mt-8">Your access code was provided by your loan officer. Contact Swift Line Capital if you need assistance.</p>
          </div>
        ) : (
          <div>
            <button onClick={reset} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
              <ArrowLeft className="w-4 h-4" /> Back to access code
            </button>

            {/* Status Banner */}
            <div className={`rounded-xl p-6 mb-6 ${statusColors[deal.status]}`}>
              <div className="flex items-center gap-3">
                {(() => { const Icon = statusIcons[deal.status]; return <Icon className="w-8 h-8" />; })()}
                <div>
                  <h3 className="text-lg font-semibold">Loan Status: {deal.status}</h3>
                  <p className="text-sm opacity-80">{statusMessages[deal.status]}</p>
                </div>
              </div>
            </div>

            {/* Loan Details */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Loan Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-400 uppercase">Loan ID</p><p className="text-sm font-mono font-medium text-gray-900">{deal.id}</p></div>
                <div><p className="text-xs text-gray-400 uppercase">Borrower</p><p className="text-sm font-medium text-gray-900">{deal.borrower}</p></div>
                <div><p className="text-xs text-gray-400 uppercase">Entity</p><p className="text-sm font-medium text-gray-900">{deal.entity}</p></div>
                <div><p className="text-xs text-gray-400 uppercase">Loan Amount</p><p className="text-sm font-medium text-gray-900">{formatCurrency(deal.amount)}</p></div>
                <div><p className="text-xs text-gray-400 uppercase">Property Address</p><p className="text-sm font-medium text-gray-900">{deal.address}</p></div>
                <div><p className="text-xs text-gray-400 uppercase">Loan Type</p><p className="text-sm font-medium text-gray-900">{deal.type}</p></div>
                <div><p className="text-xs text-gray-400 uppercase">Date Submitted</p><p className="text-sm font-medium text-gray-900">{deal.createdAt}</p></div>
                <div><p className="text-xs text-gray-400 uppercase">Access Code</p><p className="text-sm font-mono font-medium text-gray-900">{deal.accessCode}</p></div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Documents</h3>
              {deal.documents.length === 0 ? (
                <div className="text-center py-8">
                  <FolderOpen className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No documents available yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {deal.documents.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-amber-500" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-400">{doc.size} - Uploaded {doc.uploadedAt}</p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-200 rounded-lg">
                        <Download className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Progress Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Loan Progress</h3>
              <div className="space-y-4">
                {['Application Submitted', 'Under Review', 'Term Sheet Sent', 'Term Sheet Signed', 'Processing', 'Funded'].map((step, i) => {
                  const currentIndex = deal.status === 'New' ? 0 : deal.status === 'Processing' ? 2 : deal.status === 'Funded' ? 5 : -1;
                  const completed = i <= currentIndex;
                  const active = i === currentIndex;
                  return (
                    <div key={step} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${completed ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'} ${active ? 'ring-2 ring-amber-400 ring-offset-2' : ''}`}>
                        {completed ? <CheckCircle className="w-4 h-4" /> : <span className="text-xs">{i + 1}</span>}
                      </div>
                      <div>
                        <p className={`text-sm ${completed ? 'font-medium text-gray-900' : 'text-gray-400'}`}>{step}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-400">
        &copy; 2026 Swift Line Capital | All Rights Reserved
      </div>
    </div>
  );
}
