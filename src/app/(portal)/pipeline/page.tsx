'use client';
import { Plus, Search, Settings, Phone, MessageSquare, Mail, SlidersHorizontal } from 'lucide-react';
import { loanApplications, pipelineStages, formatCurrency } from '@/lib/data';

const stageMapping: Record<string, string> = {
  New: 'Quote Pending',
  Processing: 'Term Sheet Sent',
  Funded: 'Term Sheet Signed',
  Rejected: 'Quote Pending',
  Dead: 'Quote Pending',
};

export default function PipelinePage() {
  const dealsByStage = pipelineStages.map(stage => ({
    ...stage,
    deals: loanApplications.filter(l => {
      if (stage.name === 'Quote Pending') return l.status === 'New';
      if (stage.name === 'Term Sheet Requested') return false;
      if (stage.name === 'Term Sheet Sent') return l.status === 'Processing';
      if (stage.name === 'Term Sheet Signed') return l.status === 'Funded';
      return false;
    }),
  }));

  const totalDeals = loanApplications.filter(l => !['Dead', 'Rejected'].includes(l.status)).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pipeline Management</h1>
          <p className="text-sm text-gray-500">Organize and track your leads through every stage</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Sales Pipeline</span>
          <span className="text-sm text-gray-400">{totalDeals} Contacts</span>
          <button className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-sm flex items-center gap-1">
            <span>View</span>
          </button>
          <button className="px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg text-sm flex items-center gap-1">
            <Settings className="w-3 h-3" /> Settings
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 px-3 py-2 w-64">
          <Search className="w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search contacts..." className="bg-transparent text-sm outline-none w-full" />
        </div>
        <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm flex items-center gap-1">
          <Plus className="w-4 h-4" /> Add Stage
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className="w-3 h-3 rounded-full bg-amber-500" />
        <span className="text-sm font-medium text-gray-900">Sales Pipeline</span>
        <span className="text-xs text-gray-400">{pipelineStages.length} stages</span>
        <span className="text-xs text-gray-400 ml-auto">{totalDeals} total deals</span>
      </div>

      <div className="grid grid-cols-4 gap-4" style={{ gridTemplateColumns: `repeat(${pipelineStages.length + 1}, minmax(220px, 1fr))` }}>
        {dealsByStage.map((stage) => (
          <div key={stage.name} className="bg-white rounded-xl border border-gray-200 min-h-[300px]">
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: stage.color === '#FEF3C7' ? '#F59E0B' : stage.color === '#DBEAFE' ? '#3B82F6' : stage.color === '#D1FAE5' ? '#10B981' : '#8B5CF6' }} />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{stage.name}</h3>
                  <p className="text-xs text-gray-400">{stage.deals.length} deals</p>
                </div>
              </div>
            </div>
            <div className="p-2 space-y-2">
              {stage.deals.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-8">No deals</p>
              ) : (
                stage.deals.map(deal => (
                  <div key={deal.id} className="bg-gray-50 rounded-lg p-3 border border-gray-100 hover:shadow-sm transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{deal.borrower}</p>
                        <p className="text-[10px] text-gray-400 font-mono">{deal.id}</p>
                      </div>
                      <span className="text-sm font-semibold text-amber-600">{formatCurrency(deal.amount)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{deal.type}</p>
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                      <button className="p-1 hover:bg-white rounded"><Phone className="w-3 h-3 text-gray-400" /></button>
                      <button className="p-1 hover:bg-white rounded"><MessageSquare className="w-3 h-3 text-gray-400" /></button>
                      <button className="p-1 hover:bg-white rounded"><Mail className="w-3 h-3 text-gray-400" /></button>
                      <button className="p-1 hover:bg-white rounded ml-auto"><SlidersHorizontal className="w-3 h-3 text-gray-400" /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
        <div className="border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center min-h-[300px] cursor-pointer hover:border-amber-400 transition-colors">
          <div className="text-center">
            <Plus className="w-6 h-6 text-gray-300 mx-auto mb-1" />
            <p className="text-sm text-gray-400">Add Stage</p>
          </div>
        </div>
      </div>
    </div>
  );
}
