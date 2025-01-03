import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";

import { logOut } from "@/lib/current";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { CustomFetch } from "@/lib/customFetch";
import { NavUserType } from "@/@types/NavUser";

export function NavUser() {
    const { isMobile } = useSidebar()
    const navigate = useNavigate();

    const [navUserInfos, setNavUserInfos] = useState<NavUserType>({ email: "", name: "", profile_picture: null });

    useEffect(() => {
        async function getNavUserInfos() {
            const { response, error } = await CustomFetch('/user/nav');
            if (error || !response?.success) return;
            
            setNavUserInfos(response.user);
        }

        getNavUserInfos();
    },[])

    async function logOutPlayer(){
        const res = await logOut();

        if(!res){
            return toast("Error", {
                description: "Internal server error",
            });
        }
        navigate('/login');
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={navUserInfos.profile_picture || ""} alt={navUserInfos.name} />
                                <AvatarFallback className="rounded-lg">{navUserInfos.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{navUserInfos.name}</span>
                                <span className="truncate text-xs">{navUserInfos.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={navUserInfos.profile_picture || ""} alt={navUserInfos.name} />
                                    <AvatarFallback className="rounded-lg">{navUserInfos.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{navUserInfos.name}</span>
                                    <span className="truncate text-xs">{navUserInfos.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem disabled>
                                <Sparkles />
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                                <NavLink to="/account" className="cursor-pointer">
                                    <BadgeCheck />
                                    Account
                                </NavLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                            onClick={logOutPlayer}
                            className="cursor-pointer"
                        >
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}