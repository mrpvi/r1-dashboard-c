import { ReactNode } from 'react';
import DashbordHeader from "@/components/dashboard/organisms/DashbordHeader";
import { Sidebar } from "@/components/dashboard/organisms/Sidebar";
interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    
  return (
    <div className="min-h-screen bg-neutral-bg2-default">
      <DashbordHeader />
      <div className="flex min-h-[calc(100vh-85px)]">
        <Sidebar />
        <div className="w-full p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
