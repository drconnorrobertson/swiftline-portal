'use client';
import { UsersRound, Plus, Mail, Phone, Shield, MoreVertical } from 'lucide-react';

const team = [
  { id: 't1', name: 'Brett Watts', role: 'Owner / Broker', email: 'brett@swiftlinecapital.com', phone: '(555) 555-0100', status: 'Active', avatar: 'BW', access: 'Admin', deals: 32 },
  { id: 't2', name: 'Connor Davis', role: 'Loan Officer', email: 'connor@swiftlinecapital.com', phone: '(555) 555-0101', status: 'Active', avatar: 'CD', access: 'Manager', deals: 18 },
  { id: 't3', name: 'Alicia Martinez', role: 'Processor', email: 'alicia@swiftlinecapital.com', phone: '(555) 555-0102', status: 'Active', avatar: 'AM', access: 'Staff', deals: 0 },
  { id: 't4', name: 'Jake Solomon', role: 'Sales Associate', email: 'jake@swiftlinecapital.com', phone: '(555) 555-0103', status: 'Active', avatar: 'JS', access: 'Staff', deals: 7 },
];

const accessColors: Record<string, string> = { Admin: 'bg-red-100 text-red-700', Manager: 'bg-blue-100 text-blue-700', Staff: 'bg-gray-100 text-gray-600' };
const avatarColors = ['from-amber-400 to-amber-600', 'from-blue-400 to-blue-600', 'from-emerald-400 to-emerald-600', 'from-purple-400 to-purple-600'];

export default function TeamPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0"><UsersRound className="w-5 h-5 text-amber-600" /></div>
          <div><h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Team</h1><p className="text-xs sm:text-sm text-gray-500">Manage team members and their access levels</p></div>
        </div>
        <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-amber-600 self-start"><Plus className="w-4 h-4" /> Invite Member</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {team.map((member, i) => (
          <div key={member.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white font-bold text-sm`}>
                {member.avatar}
              </div>
              <button className="p-1 hover:bg-gray-100 rounded"><MoreVertical className="w-4 h-4 text-gray-400" /></button>
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">{member.name}</h3>
            <p className="text-xs text-gray-500 mb-3">{member.role}</p>
            <div className="flex gap-2 mb-3">
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${accessColors[member.access]}`}><Shield className="w-2.5 h-2.5 inline mr-0.5" />{member.access}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{member.status}</span>
            </div>
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-500"><Mail className="w-3 h-3" /><span className="truncate">{member.email}</span></div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500"><Phone className="w-3 h-3" />{member.phone}</div>
            </div>
            {member.deals > 0 && (
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">Deals Submitted</p>
                <p className="text-lg font-bold text-gray-900">{member.deals}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
