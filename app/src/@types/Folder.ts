interface FolderInterface {
    id: number,
    name: string,
}

type FoldersList = Array<FolderInterface>;
interface FolderProps extends FolderInterface {
    layout: "list" | "grid"
}

export type {
    FolderInterface,
    FoldersList,
    FolderProps
}