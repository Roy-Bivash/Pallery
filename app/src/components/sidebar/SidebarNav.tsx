import { DarkModeSwitch } from "../darkModeSwitch/DarkModeSwitch";
// import { Search } from "lucide-react"
// import { Label } from "@/components/ui/label"
// import { Input } from "../ui/input";
import { useState } from "react";


export function SidebarNav(){
    // const [searchInput, setSearchInput] = useState<string>("");

    // function SearchSubmit(e:React.FormEvent<HTMLFormElement>){
    //     e.preventDefault();
    //     console.log(searchInput);
    //     // TODO
    // }

    return(
        <div className="w-full flex items-center justify-between sm:px-4">
            {/* <form onSubmit={e => SearchSubmit(e)} className="relative w-full sm:w-fit mr-3 sm:mr-8">
                <Label htmlFor="search" className="sr-only">
                    Search
                </Label>
                <Input 
                    id="search"
                    name="search"
                    onChange={e => setSearchInput(e.target.value)}
                    placeholder="Search the images..."
                    className="pl-9 rounded-full"
                />
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </form> */}
            <span></span>
            <h3 className="md:hidden text-xl font-semibold">Pallery</h3>
            <DarkModeSwitch />
        </div>
    )
}