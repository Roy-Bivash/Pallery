interface FolderInterface {
    id: number,
    name: string,
}

type FoldersList = Array<FolderInterface>;
interface FolderProps extends FolderInterface {}

export type {
    FolderInterface,
    FoldersList,
    FolderProps
}