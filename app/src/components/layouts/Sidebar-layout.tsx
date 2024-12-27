import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { SidebarNav } from "../sidebar/SidebarNav";

export default function SidebarLayout() {
  return (
    <SidebarProvider className="pb-8 sm:pb-0">
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background z-50 h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <SidebarNav />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
