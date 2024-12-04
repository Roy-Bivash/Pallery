import { useDrawer } from "@/hooks/useDrawer";
import { useEffect } from "react";
import ImageDrawerCSS from "./ImageDrawer.module.css";

import { X } from "lucide-react";

export function ImageDrawer(){
    const { drawerState, closeDrawer } = useDrawer();

    // useEffect(() => {
    //     console.log(drawerState);
    // }, [drawerState]);

    if (!drawerState.open) return null;
    
    return(
        <div className={`${ImageDrawerCSS.openAnimation} fixed bottom-0 left-0 w-full min-h-[50vh] bg-backgroundColor border-t border-black pb-10`}>
            <div className="flex justify-between p-4">
                <h1 className="first-letter:capitalize text-xl font-semibold">{drawerState.title}</h1>
                <X 
                    onClick={closeDrawer}
                    className="cursor-pointer"
                />
            </div>
            <div className="flex items-center justify-center">
                <img src={drawerState.url} alt={drawerState.title} className="max-h-[80vh]" />
            </div>
        </div>
    )
}