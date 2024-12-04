import { useDrawer } from "@/hooks/useDrawer";
import ImageDrawerCSS from "./ImageDrawer.module.css";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export function ImageDrawer(){
    const { drawerState, closeDrawer } = useDrawer();
    const drawerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = (e: Event) => {
            if (drawerRef.current && drawerRef.current.contains(e.target as Node)) {
                return; // Allow scrolling inside the drawer
            }
            e.preventDefault(); // Prevent scrolling outside the drawer
        };

        if (drawerState.open) {
            document.addEventListener("wheel", handleScroll, { passive: false });
            document.addEventListener("touchmove", handleScroll, { passive: false });
        } else {
            document.removeEventListener("wheel", handleScroll);
            document.removeEventListener("touchmove", handleScroll);
        }

        return () => {
            document.removeEventListener("wheel", handleScroll);
            document.removeEventListener("touchmove", handleScroll);
        };
    }, [drawerState.open]);


    if (!drawerState.open) return null;
    
    return(
        <div className="fixed top-0 left-0 w-screen h-screen bg-slate-800/25 flex items-end">
            <div className={`${ImageDrawerCSS.openAnimation} w-full min-h-[50vh] bg-backgroundColor border-t border-black pb-10`}>
                <div className="flex justify-between p-4">
                    <h1 className="first-letter:capitalize text-xl font-semibold">{drawerState.title}</h1>
                    <X 
                        onClick={closeDrawer}
                        className="cursor-pointer"
                        width={25} height={25}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                    <img src={drawerState.url} alt={drawerState.title} className="max-h-[80vh]" />
                    <span className="flex flex-col gap-2">
                        <button type="button" className="transition bg-slate-600 hover:bg-slate-800 px-6 py-1 text-white rounded-md">Download</button>
                        <button type="button" className="transition bg-slate-600 hover:bg-slate-800 px-6 py-1 text-white rounded-md">Open in a new tab</button>
                    </span>
                </div>
            </div>
        </div>
    )
}