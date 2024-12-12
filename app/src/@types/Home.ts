interface HomeProps {
    favorite?: boolean
}

interface Image {
    id: number,
    url: string,
    title: string,
    favorite: boolean,
}

type HomeParams = {
    folder?: string;
};

type ImagesList = Array<Image>;

export type {
    HomeProps,
    HomeParams,
    ImagesList
}