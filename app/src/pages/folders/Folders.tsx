import { FoldersList } from "@/@types/Folder";

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
        id: 457,
        name: "Folder 5"
    },
];

export function Folders(){
    return(
        <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 my-5">
                
            </div>
        </div>
    )
}