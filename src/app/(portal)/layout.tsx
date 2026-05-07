import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-[220px]">
        <Header />
        <main className="pt-16 p-3 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
