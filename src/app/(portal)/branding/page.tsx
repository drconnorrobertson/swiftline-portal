'use client';
import { Palette, Upload, Eye, Zap } from 'lucide-react';
import { useState } from 'react';

export default function BrandingPage() {
  const [primaryColor, setPrimaryColor] = useState('#D97706');
  const [companyName, setCompanyName] = useState('Swift Line Capital');

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0"><Palette className="w-5 h-5 text-amber-600" /></div>
        <div><h1 className="text-xl sm:text-2xl font-bold text-gray-900">Branding</h1><p className="text-xs sm:text-sm text-gray-500">Customize your portal branding and white-label settings</p></div>
      </div>

      <div className="space-y-4">
        {/* Logo */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Company Logo</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-32 h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center mx-auto mb-2"><Zap className="w-7 h-7 text-white" /></div>
                <p className="text-[10px] text-gray-400">Current Logo</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-3">Upload your company logo. Recommended size: 200x60px. Formats: PNG, SVG, JPG.</p>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 flex items-center gap-1 hover:bg-gray-50"><Upload className="w-4 h-4" /> Upload New Logo</button>
            </div>
          </div>
        </div>

        {/* Colors & Name */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Brand Settings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Brand Color</label>
              <div className="flex gap-2">
                <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer" />
                <input type="text" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono outline-none focus:border-amber-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input type="text" defaultValue="Fast. Flexible. Funded." className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
              <input type="email" defaultValue="support@swiftlinecapital.com" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400" />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Preview</h3>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 flex items-center gap-1"><Eye className="w-3 h-3" /> Preview Portal</button>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="h-12 flex items-center px-4 gap-2" style={{ backgroundColor: primaryColor + '15', borderBottom: `2px solid ${primaryColor}` }}>
              <div className="w-6 h-6 rounded flex items-center justify-center" style={{ backgroundColor: primaryColor }}><Zap className="w-4 h-4 text-white" /></div>
              <span className="text-sm font-bold" style={{ color: primaryColor }}>{companyName}</span>
            </div>
            <div className="p-4 bg-gray-50">
              <div className="h-4 w-48 rounded" style={{ backgroundColor: primaryColor + '30' }} />
              <div className="h-3 w-32 bg-gray-200 rounded mt-2" />
              <div className="flex gap-2 mt-4">
                <div className="h-8 w-20 rounded text-white text-[10px] flex items-center justify-center" style={{ backgroundColor: primaryColor }}>Button</div>
                <div className="h-8 w-20 rounded border text-[10px] flex items-center justify-center" style={{ borderColor: primaryColor, color: primaryColor }}>Outline</div>
              </div>
            </div>
          </div>
        </div>

        <button className="px-6 py-2.5 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600">Save Branding</button>
      </div>
    </div>
  );
}
