'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, Kanban, FileText, PlusCircle, ShieldCheck,
  FolderOpen, UserPlus, UsersRound, Megaphone, Palette, Wrench,
  MessageSquare, Building2, Search, Settings, Zap
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/contacts', label: 'Contacts', icon: Users },
  { href: '/pipeline', label: 'Pipeline', icon: Kanban },
  { href: '/loan-applications', label: 'Loan Applications', icon: FileText },
  { href: '/add-new-deal', label: 'Add New Deal', icon: PlusCircle },
  { href: '/deal-pre-check', label: 'Deal Pre Check', icon: ShieldCheck },
  { divider: true },
  { href: '/documents', label: 'Documents', icon: FolderOpen },
  { href: '/affiliates', label: 'My Affiliates', icon: UserPlus },
  { href: '/team', label: 'My Team', icon: UsersRound },
  { href: '/lead-tools', label: 'Lead Tools', icon: Megaphone },
  { href: '/branding', label: 'Branding', icon: Palette },
  { href: '/tools', label: 'Tools', icon: Wrench },
  { href: '/communication', label: 'Communication', icon: MessageSquare },
  { href: '/listings', label: 'My Listings', icon: Building2 },
  { href: '/browse-deals', label: 'Browse Deals', icon: Search },
  { divider: true },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[200px] min-h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 leading-tight">Swift Line</h1>
            <p className="text-[10px] text-gray-500 leading-tight tracking-wider uppercase">Capital</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 py-2 overflow-y-auto">
        {navItems.map((item, i) => {
          if ('divider' in item) {
            return <div key={i} className="my-2 border-t border-gray-100" />;
          }
          const Icon = item.icon!;
          const active = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={`flex items-center gap-2.5 px-4 py-2 text-[13px] transition-all ${
                active
                  ? 'bg-amber-50 text-amber-700 font-medium border-r-2 border-amber-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
