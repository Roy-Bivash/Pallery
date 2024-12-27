import { Button } from "@/components/ui/button";
import { Hexagon, SearchX } from "lucide-react";
import { NavLink } from "react-router";

export function Error404(){
    return(
        <div className="flex flex-col min-h-[80vh] min-w-[80vw] items-center justify-center text-white">
            <div className="bg-red-400 p-5 min-w-[50vw] text-center">
                <div className="flex items-center justify-center gap-2">
                    <SearchX size={45} strokeWidth={0.75} />
                    <h1 className="text-3xl text-center">Error 404</h1>
                </div>
                <p>This page doesn't exist</p>
                <Button 
                    className="mt-4 text-white"
                    variant="link"
                    asChild
                >
                    <NavLink to='/'>
                        Go back to the home page
                    </NavLink>
                </Button>
            </div>
        </div>
    )
}