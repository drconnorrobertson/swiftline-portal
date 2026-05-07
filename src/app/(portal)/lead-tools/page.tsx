'use client';
import { Megaphone, Link2, Copy, QrCode, Code, Share2, FileText, ExternalLink, Check } from 'lucide-react';
import { useState } from 'react';

export default function LeadToolsPage() {
  const [copied, setCopied] = useState('');
  const portalUrl = 'https://swiftline-portal.vercel.app/client-portal';
  const dealUrl = 'https://swiftline-portal.vercel.app/add-new-deal';

  const copyLink = (url: string, key: string) => {
    navigator.clipboard.writeText(url);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0"><Megaphone className="w-5 h-5 text-amber-600" /></div>
        <div><h1 className="text-xl sm:text-2xl font-bold text-gray-900">Lead Tools</h1><p className="text-xs sm:text-sm text-gray-500">Generate and capture leads with shareable links and embeds</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Application Link */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3"><Link2 className="w-5 h-5 text-amber-500" /><h3 className="font-semibold text-gray-900">Application Link</h3></div>
          <p className="text-xs text-gray-500 mb-4">Share this link with borrowers to submit new deals directly</p>
          <div className="flex gap-2">
            <input type="text" readOnly value={dealUrl} className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 font-mono min-w-0" />
            <button onClick={() => copyLink(dealUrl, 'deal')} className="px-3 py-2 bg-amber-500 text-white rounded-lg text-xs flex items-center gap-1 hover:bg-amber-600 flex-shrink-0">
              {copied === 'deal' ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
            </button>
          </div>
        </div>

        {/* Client Portal Link */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3"><Share2 className="w-5 h-5 text-emerald-500" /><h3 className="font-semibold text-gray-900">Client Portal Link</h3></div>
          <p className="text-xs text-gray-500 mb-4">Borrowers can check their loan status with their 6-digit access code</p>
          <div className="flex gap-2">
            <input type="text" readOnly value={portalUrl} className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 font-mono min-w-0" />
            <button onClick={() => copyLink(portalUrl, 'portal')} className="px-3 py-2 bg-emerald-500 text-white rounded-lg text-xs flex items-center gap-1 hover:bg-emerald-600 flex-shrink-0">
              {copied === 'portal' ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Embed Code */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3"><Code className="w-5 h-5 text-blue-500" /><h3 className="font-semibold text-gray-900">Embed Application Form</h3></div>
          <p className="text-xs text-gray-500 mb-4">Add this code to your website to embed the loan application form</p>
          <div className="bg-gray-900 rounded-lg p-3 mb-3">
            <code className="text-xs text-emerald-400 break-all">{`<iframe src="${dealUrl}" width="100%" height="800" frameborder="0"></iframe>`}</code>
          </div>
          <button onClick={() => copyLink(`<iframe src="${dealUrl}" width="100%" height="800" frameborder="0"></iframe>`, 'embed')} className="px-3 py-2 bg-blue-500 text-white rounded-lg text-xs flex items-center gap-1 hover:bg-blue-600">
            {copied === 'embed' ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy Code</>}
          </button>
        </div>

        {/* QR Code */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-3"><QrCode className="w-5 h-5 text-purple-500" /><h3 className="font-semibold text-gray-900">QR Code Generator</h3></div>
          <p className="text-xs text-gray-500 mb-4">Generate a QR code for business cards, flyers, and print materials</p>
          <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center mb-3">
            <div className="w-32 h-32 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
              <QrCode className="w-16 h-16 text-gray-300" />
            </div>
          </div>
          <button className="w-full px-3 py-2 bg-purple-500 text-white rounded-lg text-xs hover:bg-purple-600">Generate QR Code</button>
        </div>
      </div>

      {/* Email Templates */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center gap-2 mb-4"><FileText className="w-5 h-5 text-amber-500" /><h3 className="font-semibold text-gray-900">Quick Email Templates</h3></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { title: 'Introduction Email', desc: 'Introduce Swift Line Capital to new prospects' },
            { title: 'Follow-Up Email', desc: 'Follow up with leads who havent responded' },
            { title: 'Rate Sheet Email', desc: 'Send current rates and loan programs' },
          ].map((t, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 hover:border-amber-400 cursor-pointer transition-colors">
              <h4 className="text-sm font-medium text-gray-900 mb-1">{t.title}</h4>
              <p className="text-xs text-gray-500 mb-3">{t.desc}</p>
              <button className="text-xs text-amber-600 flex items-center gap-1 hover:text-amber-700"><ExternalLink className="w-3 h-3" /> Use Template</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
