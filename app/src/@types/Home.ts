interface HomeProps {
    favorite?: boolean
}

interface Image {
    id: number,
    url: string,
    titel: string
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