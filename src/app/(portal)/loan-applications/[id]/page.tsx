'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft, FileText, Upload, Download, Eye, Trash2, Send,
  Clock, CheckCircle, XCircle, MessageSquare, Phone, Mail,
  Copy, ExternalLink, User, Building2, MapPin, DollarSign, StickyNote
} from 'lucide-react';
import { loanApplications, formatCurrency } from '@/lib/data';

const statusColors: Record<string, string> = {
  New: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Processing: 'bg-amber-100 text-amber-700 border-amber-200',
  Funded: 'bg-blue-100 text-blue-700 border-blue-200',
  Rejected: 'bg-red-100 text-red-700 border-red-200',
  Dead: 'bg-gray-100 text-gray-600 border-gray-200',
};

export default function LoanDetailPage() {
  const params = useParams();
  const loan = loanApplications.find(l => l.id === params.id);
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState(loan?.notes || []);
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  if (!loan) {
    return (
      <div className="text-center py-12">
        <h2 className="text-lg font-medium text-gray-400">Loan not found</h2>
        <Link href="/loan-applications" className="text-amber-600 text-sm mt-2 inline-block">Back to Loan Applications</Link>
      </div>
    );
  }

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote('');
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(loan.accessCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <Link href="/loan-applications" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Loan Applications
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">{loan.borrower}</h1>
              <span className={`text-xs px-2 py-1 rounded-full border ${statusColors[loan.status]}`}>{loan.status}</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-mono mt-1">{loan.id}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs sm:text-sm flex items-center gap-1 hover:bg-amber-600">
              <Phone className="w-3 h-3" /> Call
            </button>
            <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm flex items-center gap-1 hover:bg-gray-50">
              <Mail className="w-3 h-3" /> Email
            </button>
            <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm flex items-center gap-1 hover:bg-gray-50">
              <MessageSquare className="w-3 h-3" /> SMS
            </button>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-[10px] text-gray-400 uppercase">Loan Amount</p>
            <p className="text-sm sm:text-base font-bold text-gray-900">{formatCurrency(loan.amount)}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-[10px] text-gray-400 uppercase">Type</p>
            <p className="text-sm sm:text-base font-medium text-gray-900">{loan.type}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-[10px] text-gray-400 uppercase">Scott Lender</p>
            <p className={`text-sm sm:text-base font-medium ${loan.scottLender ? 'text-emerald-600' : 'text-gray-500'}`}>{loan.scottLender ? 'Yes - Visible' : 'No'}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gray-400 uppercase">Client Access Code</p>
                <p className="text-sm sm:text-base font-mono font-bold text-gray-900">{loan.accessCode}</p>
              </div>
              <button onClick={copyCode} className="p-1 hover:bg-gray-200 rounded" title="Copy code">
                <Copy className={`w-3 h-3 ${copied ? 'text-emerald-500' : 'text-gray-400'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {['overview', 'documents', 'notes', 'timeline'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${activeTab === tab ? 'bg-amber-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><User className="w-4 h-4" /> Borrower Details</h3>
            <div className="space-y-3">
              <div><p className="text-xs text-gray-400">Full Name</p><p className="text-sm text-gray-900">{loan.borrower}</p></div>
              <div><p className="text-xs text-gray-400">Entity</p><p className="text-sm text-gray-900">{loan.entity}</p></div>
              <div><p className="text-xs text-gray-400">Affiliate</p><p className="text-sm text-gray-900">{loan.affiliate || 'None'}</p></div>
              <div><p className="text-xs text-gray-400">Submitted</p><p className="text-sm text-gray-900">{loan.createdAt}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><MapPin className="w-4 h-4" /> Property Details</h3>
            <div className="space-y-3">
              <div><p className="text-xs text-gray-400">Address</p><p className="text-sm text-gray-900">{loan.address}</p></div>
              <div><p className="text-xs text-gray-400">Loan Type</p><p className="text-sm text-gray-900">{loan.type}</p></div>
              <div><p className="text-xs text-gray-400">Amount</p><p className="text-sm font-semibold text-gray-900">{formatCurrency(loan.amount)}</p></div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Documents</h3>
            <button className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs sm:text-sm flex items-center gap-1 hover:bg-amber-600">
              <Upload className="w-3 h-3" /> Upload
            </button>
          </div>
          {loan.documents.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
              <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No documents yet. Upload or drag files here.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {loan.documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                      <p className="text-xs text-gray-400">{doc.size} - {doc.uploadedAt}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button className="p-1 hover:bg-gray-200 rounded"><Eye className="w-4 h-4 text-gray-400" /></button>
                    <button className="p-1 hover:bg-gray-200 rounded"><Download className="w-4 h-4 text-gray-400" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><StickyNote className="w-4 h-4" /> Notes & Activity</h3>
          <div className="flex gap-2 mb-4">
            <input type="text" value={newNote} onChange={e => setNewNote(e.target.value)} onKeyDown={e => e.key === 'Enter' && addNote()} placeholder="Add a note..." className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-400 min-w-0" />
            <button onClick={addNote} className="px-3 py-2 bg-amber-500 text-white rounded-lg text-sm flex-shrink-0 hover:bg-amber-600">
              <Send className="w-4 h-4" />
            </button>
          </div>
          {notes.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No notes yet. Add your first note above.</p>
          ) : (
            <div className="space-y-2">
              {notes.map((note, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-[10px] font-bold text-amber-600 flex-shrink-0 mt-0.5">BW</div>
                  <div>
                    <p className="text-sm text-gray-900">{note}</p>
                    <p className="text-[10px] text-gray-400 mt-1">Just now</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Loan Timeline</h3>
          <div className="space-y-4">
            {[
              { step: 'Application Submitted', date: loan.createdAt, done: true },
              { step: 'Under Review', date: loan.status !== 'New' ? loan.createdAt : '', done: loan.status !== 'New' },
              { step: 'Term Sheet Sent', date: loan.status === 'Processing' ? 'In Progress' : '', done: loan.status === 'Processing' || loan.status === 'Funded' },
              { step: 'Term Sheet Signed', date: '', done: loan.status === 'Funded' },
              { step: 'Processing & Underwriting', date: '', done: loan.status === 'Funded' },
              { step: 'Funded & Closed', date: '', done: loan.status === 'Funded' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                  {item.done ? <CheckCircle className="w-4 h-4" /> : <span className="text-xs">{i + 1}</span>}
                </div>
                <div className="flex-1">
                  <p className={`text-sm ${item.done ? 'font-medium text-gray-900' : 'text-gray-400'}`}>{item.step}</p>
                  {item.date && <p className="text-[10px] text-gray-400">{item.date}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
