import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { useNavigate } from "react-router";

import { FolderProps } from "@/@types/Folder";
import { Folder as FolderIcon } from "lucide-react";

export function Folder({ id, name, layout } : FolderProps){
    const navigate = useNavigate();

    if(layout == "grid"){
        return(
            <Card onClick={() => navigate(`/folder/${id}`)} className="transition cursor-pointer hover:bg-slate-300/20">
                <CardHeader>
                    <CardTitle className="sr-only">{name}</CardTitle>
                    <FolderIcon 
                        size={50}
                    />
                </CardHeader>
                <CardContent>
                    <p className="truncate">{name}</p>
                </CardContent>
            </Card>
        )
    }
    if(layout == "list"){
        return(
            <div onClick={() => navigate(`/folder/${id}`)} className="w-full flex gap-2 border-b pb-2">
                <FolderIcon 
                    size={20}
                />
                <p className="truncate">{name}</p>
            </div>
        )
    }
}