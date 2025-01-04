interface HomeProps {
    favorite?: boolean,
    inFolder?:boolean,
}

interface Image {
    id: number,
    url: string,
    title: string,
    favorite: boolean,
}


type ImagesList = Array<Image>;

export type {
    Image,
    HomeProps,
    ImagesList
}