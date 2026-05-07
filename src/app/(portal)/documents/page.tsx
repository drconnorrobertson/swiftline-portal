'use client';
import { FolderOpen, Upload, FileText, Download, Trash2, Eye, Search, Filter } from 'lucide-react';
import { loanApplications } from '@/lib/data';
import { useState } from 'react';

export default function DocumentsPage() {
  const [search, setSearch] = useState('');
  const allDocs = loanApplications.flatMap(l => l.documents.map(d => ({ ...d, borrower: l.borrower, loanId: l.id })));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
            <FolderOpen className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
            <p className="text-sm text-gray-500">Manage and organize all deal documents</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-amber-600">
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 flex-1">
            <Search className="w-4 h-4 text-gray-400" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents..." className="bg-transparent text-sm outline-none w-full" />
          </div>
          <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 flex items-center gap-1">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        {allDocs.length === 0 ? (
          <div className="p-12 text-center">
            <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-400 mb-1">No documents yet</h3>
            <p className="text-sm text-gray-400">Upload documents or they will appear here when borrowers submit them</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="px-4 py-3">Document</th>
                <th className="px-4 py-3">Borrower</th>
                <th className="px-4 py-3">Loan ID</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Uploaded</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {allDocs.map(doc => (
                <tr key={doc.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-gray-900">{doc.name}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{doc.borrower}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 font-mono">{doc.loanId}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{doc.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{doc.size}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{doc.uploadedAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="p-1 hover:bg-gray-100 rounded"><Eye className="w-4 h-4 text-gray-400" /></button>
                      <button className="p-1 hover:bg-gray-100 rounded"><Download className="w-4 h-4 text-gray-400" /></button>
                      <button className="p-1 hover:bg-gray-100 rounded"><Trash2 className="w-4 h-4 text-gray-400" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
