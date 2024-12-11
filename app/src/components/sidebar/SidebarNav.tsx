import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";
  
import { useTheme } from "../providers/theme-provider"; 
import { Moon, SunMoon, Sun } from "lucide-react";

export function SidebarNav(){
    const { setTheme, theme } = useTheme();
    const themesPossible = ["light", "dark", "system"];

    function changeTheme(){
        const currentIndex = themesPossible.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themesPossible.length;
        // @ts-ignore
        setTheme(themesPossible[nextIndex]);
    }

    return(
        <div className="w-full flex items-center justify-end sm:px-4">
            <TooltipProvider delayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button type="button" onClick={() => changeTheme()}>
                            {theme == "light" && (
                                <Moon size={18} />
                            )}
                            {theme == "dark" && (
                                <Sun size={18} />
                            )}
                            {theme == "system" && (
                                <SunMoon size={18} />
                            )}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{theme}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </div>
    )
}