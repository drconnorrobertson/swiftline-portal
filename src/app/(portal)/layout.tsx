import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 ml-[200px]">
        <Header />
        <main className="pt-14 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
