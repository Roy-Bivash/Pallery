import { DarkModeSwitch } from "../darkModeSwitch/DarkModeSwitch";

export function SidebarNav(){

    return(
        <div className="w-full flex items-center justify-end sm:px-4">
            <DarkModeSwitch />
        </div>
    )
}