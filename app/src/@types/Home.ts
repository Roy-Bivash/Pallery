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

type HomeParams = {
    id?: string;
};

type ImagesList = Array<Image>;

export type {
    HomeProps,
    HomeParams,
    ImagesList
}