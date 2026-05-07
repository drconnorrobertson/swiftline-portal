'use client';
import { MessageSquare, Mail, Phone, Send, Zap, Settings } from 'lucide-react';
import { useState } from 'react';

export default function CommunicationPage() {
  const [activeTab, setActiveTab] = useState('messages');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center"><MessageSquare className="w-5 h-5 text-amber-600" /></div>
          <div><h1 className="text-2xl font-bold text-gray-900">Communication</h1><p className="text-sm text-gray-500">Manage messages, emails, and SMS communications</p></div>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {['messages', 'email', 'sms', 'ghl-integration'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-sm ${activeTab === tab ? 'bg-amber-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {tab === 'ghl-integration' ? 'GHL Integration' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'messages' && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-400 mb-1">No messages yet</h3>
          <p className="text-sm text-gray-400">Messages will appear here when someone contacts you</p>
        </div>
      )}

      {activeTab === 'email' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Send Email</h3>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">To</label><input type="email" placeholder="recipient@email.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Subject</label><input type="text" placeholder="Email subject" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Message</label><textarea rows={6} placeholder="Type your message..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400 resize-none" /></div>
            <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-amber-600"><Send className="w-4 h-4" /> Send Email</button>
          </div>
        </div>
      )}

      {activeTab === 'sms' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Send SMS</h3>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">To (Phone Number)</label><input type="tel" placeholder="+1 (555) 000-0000" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Message</label><textarea rows={4} placeholder="Type your SMS message..." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400 resize-none" /><p className="text-xs text-gray-400 mt-1">160 characters max per SMS segment</p></div>
            <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-amber-600"><Phone className="w-4 h-4" /> Send SMS</button>
          </div>
        </div>
      )}

      {activeTab === 'ghl-integration' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center"><Zap className="w-5 h-5 text-emerald-600" /></div>
              <div><h3 className="font-semibold text-gray-900">Go High Level Integration</h3><p className="text-xs text-gray-500">Connect your GHL account to enable automated SMS and email workflows</p></div>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">GHL API Key</label><input type="password" placeholder="Enter your Go High Level API key" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">GHL Location ID</label><input type="text" placeholder="Enter your GHL Location ID" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" /></div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600">Connect GHL</button>
                <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50">Test Connection</button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Automation Settings</h3>
            <div className="space-y-3">
              {[
                { label: 'Auto-send welcome SMS on new deal submission', key: 'welcome_sms' },
                { label: 'Auto-send term sheet email when status changes to Processing', key: 'term_sheet' },
                { label: 'Auto-send follow-up SMS after 48 hours of no response', key: 'followup_sms' },
                { label: 'Auto-notify borrower when documents are requested', key: 'doc_request' },
                { label: 'Auto-send closing notification email when deal is funded', key: 'closing' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
