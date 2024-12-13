import { FolderProps } from "@/@types/Folder";

export function Folder({ id, name} : FolderProps){
    return(
        <div>
            { name }
        </div>
    )
}