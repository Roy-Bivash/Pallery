import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "../providers/theme-provider"; 

import { Moon, SunMoon, Sun } from "lucide-react";

const themeIcons = {
    light: <Moon size={18} />,
    dark: <Sun size={18} />,
    system: <SunMoon size={18} />,
};

export function DarkModeSwitch(){
    const { setTheme, theme } = useTheme();
    const themesPossible: Array<"light" | "dark" | "system"> = ["light", "dark"];

    function changeTheme(){
        const currentIndex = themesPossible.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themesPossible.length;
        setTheme(themesPossible[nextIndex]);
    }

    return(
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button 
                        type="button" 
                        onClick={changeTheme} 
                        aria-label={`Switch theme to ${themesPossible[(themesPossible.indexOf(theme) + 1) % themesPossible.length]}`}
                    >
                        {themeIcons[theme]}
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{themesPossible[(themesPossible.indexOf(theme) + 1) % themesPossible.length]}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}