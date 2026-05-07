'use client';
import { Settings, User, Shield, Bell, Palette, Key, Zap } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [scottEnabled, setScottEnabled] = useState(true);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center"><Settings className="w-5 h-5 text-amber-600" /></div>
        <div><h1 className="text-2xl font-bold text-gray-900">Settings</h1><p className="text-sm text-gray-500">Manage your account settings and preferences</p></div>
      </div>

      <div className="flex gap-6">
        <div className="w-48 space-y-1">
          {[
            { id: 'general', label: 'General', icon: Settings },
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'lender-access', label: 'Lender Access', icon: Key },
            { id: 'integrations', label: 'Integrations', icon: Zap },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left ${activeTab === tab.id ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                <Icon className="w-4 h-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6">
          {activeTab === 'general' && (
            <div><h3 className="font-semibold text-gray-900 mb-4">General Settings</h3>
              <div className="space-y-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label><input type="text" defaultValue="Swift Line Capital" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Company Email</label><input type="email" defaultValue="info@swiftlinecapital.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Company Phone</label><input type="tel" defaultValue="(555) 555-0100" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" /></div>
                <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'lender-access' && (
            <div><h3 className="font-semibold text-gray-900 mb-4">Scott Lender Access Control</h3>
              <p className="text-sm text-gray-500 mb-4">Control whether Scott Lender has access to view deal files. When enabled globally, individual deals can still be toggled on or off.</p>
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 mb-6">
                <div className="flex items-center justify-between">
                  <div><h4 className="font-medium text-gray-900">Global Scott Lender Access</h4><p className="text-xs text-gray-500">Enable or disable Scott Lender file visibility across all deals</p></div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={scottEnabled} onChange={e => setScottEnabled(e.target.checked)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500" />
                  </label>
                </div>
              </div>
              <div className="space-y-3">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Scott Lender Email</label><input type="email" defaultValue="scott@lendingpartner.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Scott Lender Phone</label><input type="tel" defaultValue="(555) 555-0200" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" /></div>
                <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600">Save Lender Settings</button>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div><h3 className="font-semibold text-gray-900 mb-4">Integrations</h3>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3"><div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center"><Zap className="w-5 h-5 text-emerald-600" /></div><div><p className="font-medium text-gray-900">Go High Level</p><p className="text-xs text-gray-500">SMS, Email, and workflow automation</p></div></div>
                  <button className="px-3 py-1.5 border border-emerald-500 text-emerald-600 rounded-lg text-sm hover:bg-emerald-50">Configure</button>
                </div>
              </div>
            </div>
          )}

          {!['general', 'lender-access', 'integrations'].includes(activeTab) && (
            <div className="text-center py-12">
              <Settings className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-400 mb-1">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</h3>
              <p className="text-sm text-gray-400">Configure your {activeTab} preferences here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
