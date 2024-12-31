import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { SidebarNav } from "../sidebar/SidebarNav";
import { useEffect } from "react";
import { checkLoginStatus } from "@/lib/current";

import { useNavigate } from "react-router";

export default function SidebarLayout() {
  const navigate = useNavigate();


  async function verifyLogin(){
    const data = await checkLoginStatus();
    if(!data){
      navigate('/login');
    }
  }

  useEffect(() => {
    // Verify if the user is loged in
    verifyLogin();
  }, [])
  
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
