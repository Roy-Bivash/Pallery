import { useEffect, useState } from "react";

import { Folder } from "@/components/folder/Folder";
import { FoldersList } from "@/@types/Folder";
import { Search } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFoldersLayout } from "@/hooks/use-folders-layout";

import { List, LayoutGrid } from "lucide-react";

const TEST_DATA: FoldersList = [
    {
        id: 6354,
        name: "Folder 1"
    },
    {
        id: 3204,
        name: "Folder 2"
    },
    {
        id: 7752,
        name: "Folder 3"
    },
    {
        id: 422,
        name: "Folder 4"
    },
    {
        id: 843,
        name: "LoLorem ipsum dolor, sit amet consectetur adipisicing elit. Vero ab adipisci quos quia iste odio incidunt veniam amet non rerum. Laudantium, necessitatibus quis! Fuga cum ea, cupiditate vitae deleniti voluptas?rem"
    },
    {
        id: 75,
        name: "Folder 5"
    },
    {
        id: 923,
        name: "Folder 6"
    },
    {
        id: 198,
        name: "Folder 7"
    },
    {
        id: 24,
        name: "Folder 8"
    },
    {
        id: 45,
        name: "LoLorem ipsum dolor, sit amet consectetur adipisicing elit. Vero ab adipisci quos quia iste odio incidunt veniam amet non rerum. Laudantium, necessitatibus quis! Fuga cum ea, cupiditate vitae deleniti voluptas?rem"
    },
    {
        id: 176,
        name: "LoLorem ipsum dolor, sit amet consectetur adipisicing elit. Vero ab adipisci quos quia iste odio incidunt veniam amet non rerum. Laudantium, necessitatibus quis! Fuga cum ea, cupiditate vitae deleniti voluptas?rem"
    },
];

export function Folders(){
    const [searchInput, setSearchInput] = useState<string>("");
    const { folderLayout, setFolderLayout } = useFoldersLayout();

    function SearchSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(searchInput);
        // TODO
    }

    return(
        <div className="container mx-auto px-4">
            <div className="flex justify-end items-center gap-4 mt-3">
                <Tabs value={folderLayout} onValueChange={value => setFolderLayout(value as "list" | "grid")}>
                    <TabsList>
                        <TabsTrigger value="list">
                            <List size={18} />
                        </TabsTrigger>
                        <TabsTrigger value="grid">
                            <LayoutGrid size={18} />
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <form onSubmit={SearchSubmit} className="relative w-full sm:w-fit">
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
                </form>
            </div>
            <div className={`group/list grid grid-cols-1 my-5 ${(folderLayout === "grid") ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" : ""}`}>
                {TEST_DATA.map(item => (
                    <Folder 
                        key={item.id}
                        {...item}
                        layout={folderLayout}
                    />
                ))}
            </div>
        </div>
    )
}